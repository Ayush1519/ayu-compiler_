import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, action, code, language } = await req.json();
    console.log(`AI Assistant request - Action: ${action}`);

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Build system prompt based on action
    let systemPrompt = "You are Ayu AI, an expert coding assistant built into AyuCompiler. ";
    
    switch (action) {
      case 'explain':
        systemPrompt += "Explain the provided code clearly and concisely, breaking down what each part does and its purpose.";
        break;
      case 'fix':
        systemPrompt += "Analyze the code for errors, bugs, or issues. Provide corrected code with explanations of what was wrong and how you fixed it.";
        break;
      case 'comment':
        systemPrompt += "Add clear, helpful comments to the code. Use inline comments for complex logic and docstring comments for functions/classes.";
        break;
      case 'optimize':
        systemPrompt += "Analyze the code for performance improvements, better algorithms, or cleaner patterns. Provide optimized code with explanations.";
        break;
      case 'test':
        systemPrompt += "Generate comprehensive test cases for the provided code. Include edge cases, normal cases, and error cases.";
        break;
      case 'convert':
        systemPrompt += "Convert the provided code to the target language while maintaining the same functionality and logic.";
        break;
      case 'chat':
        systemPrompt += "Answer questions about the code, provide guidance, and help with coding challenges. Be helpful, clear, and concise.";
        break;
      default:
        systemPrompt += "Help the user with their coding needs. Be clear, helpful, and concise.";
    }

    // Add context about current code if provided
    let contextMessage = '';
    if (code && language) {
      contextMessage = `\n\nCurrent code context (${language}):\n\`\`\`${language}\n${code}\n\`\`\``;
    }

    // Build messages array
    const aiMessages = [
      { role: 'system', content: systemPrompt + contextMessage },
      ...messages
    ];

    // Call Lovable AI Gateway with streaming
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: aiMessages,
        stream: true,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI usage quota exceeded. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI Gateway error: ${response.status}`);
    }

    // Stream the response back to the client
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Error in ayu-ai function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
