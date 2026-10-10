import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Judge0 Language ID Mapping
const JUDGE0_LANGUAGE_MAP: Record<string, number> = {
  javascript: 63,
  typescript: 74,
  python: 71,
  java: 62,
  c: 50,
  cpp: 54,
  csharp: 51,
  go: 60,
  swift: 83,
  ruby: 72,
  rust: 73,
  php: 68,
  html: -1,
  css: -1
};

const JUDGE0_API_KEY = Deno.env.get('JUDGE0_API_KEY');
const JUDGE0_API_HOST = Deno.env.get('JUDGE0_API_HOST') || 'judge0-ce.p.rapidapi.com';
const USE_RAPIDAPI = !!JUDGE0_API_KEY;

const JUDGE0_BASE_URL = USE_RAPIDAPI 
  ? `https://${JUDGE0_API_HOST}`
  : 'https://ce.judge0.com';

async function executeWithJudge0(language: string, code: string, stdin: string): Promise<any> {
  const languageId = JUDGE0_LANGUAGE_MAP[language];
  
  if (languageId === undefined) {
    return {
      stdout: '',
      stderr: `Language "${language}" is not supported yet.`,
      compileError: '',
      executionTime: 0,
      success: false
    };
  }

  if (languageId === -1) {
    return {
      stdout: 'HTML/CSS preview available in the Preview panel →',
      stderr: '',
      compileError: '',
      executionTime: 0,
      success: true
    };
  }

  const startTime = Date.now();

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (USE_RAPIDAPI && JUDGE0_API_KEY) {
      headers['X-RapidAPI-Key'] = JUDGE0_API_KEY;
      headers['X-RapidAPI-Host'] = JUDGE0_API_HOST;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    // Helper function to safely decode base64
    const safeBase64Decode = (str: string | null | undefined): string => {
      if (!str) return '';
      try {
        return atob(str);
      } catch (e) {
        console.error('Base64 decode error:', e);
        return '';
      }
    };

    try {
      const submissionResponse = await fetch(`${JUDGE0_BASE_URL}/submissions?base64_encoded=true&wait=true`, {
        method: 'POST',
        headers,
        signal: controller.signal,
        body: JSON.stringify({
          source_code: btoa(code),
          language_id: languageId,
          stdin: btoa(stdin || ''),
          cpu_time_limit: 5,
          wall_time_limit: 10,
          memory_limit: 128000
        })
      });

      clearTimeout(timeoutId);

      if (!submissionResponse.ok) {
        const errorText = await submissionResponse.text();
        console.error('Judge0 error:', errorText);
        return {
          stdout: '',
          stderr: `API Error: ${submissionResponse.status}. Please try again.`,
          compileError: '',
          executionTime: Date.now() - startTime,
          success: false
        };
      }

      const submission = await submissionResponse.json();
      console.log('Judge0 response:', JSON.stringify(submission));

      const stdout = safeBase64Decode(submission.stdout);
      const stderr = safeBase64Decode(submission.stderr);
      const compileOutput = safeBase64Decode(submission.compile_output);

      let statusMessage = '';
      
      if (submission.status?.id === 3) {
        statusMessage = `✔ Execution Finished (${(submission.time || 0)}s)`;
      } else if (submission.status?.id === 6) {
        statusMessage = `❌ Compile Error`;
      } else if (submission.status?.id === 5) {
        statusMessage = `⏱ Time Limit Exceeded`;
      } else if (submission.status?.id === 11 || submission.status?.id === 12) {
        statusMessage = `❌ Runtime Error`;
      } else {
        statusMessage = `Status: ${submission.status?.description || 'Unknown'}`;
      }

      return {
        stdout,
        stderr,
        compileError: compileOutput,
        statusMessage,
        executionTime: Date.now() - startTime,
        success: submission.status?.id === 3
      };
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        return {
          stdout: '',
          stderr: 'Execution timeout (15s). Please optimize your code.',
          compileError: '',
          executionTime: Date.now() - startTime,
          success: false
        };
      }
      
      return {
        stdout: '',
        stderr: `Network error: ${error.message}`,
        compileError: '',
        executionTime: Date.now() - startTime,
        success: false
      };
    }
  } catch (error: any) {
    return {
      stdout: '',
      stderr: `Execution failed: ${error.message}`,
      compileError: '',
      executionTime: Date.now() - startTime,
      success: false
    };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { language, code, input } = await req.json();

    if (language === 'javascript') {
      const startTime = Date.now();
      let stdout = '';
      let stderr = '';

      try {
        const logs: string[] = [];
        const originalLog = console.log;
        const originalError = console.error;
        
        console.log = (...args: any[]) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };
        
        console.error = (...args: any[]) => {
          stderr += args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ') + '\n';
        };

        eval(code);

        console.log = originalLog;
        console.error = originalError;
        
        stdout = logs.join('\n');
      } catch (error: any) {
        stderr = error.message || String(error);
      }

      return new Response(
        JSON.stringify({
          stdout,
          stderr,
          compileError: '',
          statusMessage: stderr ? '❌ Runtime Error' : `✔ Execution Finished`,
          executionTime: Date.now() - startTime,
          success: !stderr
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await executeWithJudge0(language, code, input || '');

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({
        stderr: `Server error: ${error.message}`,
        stdout: '',
        executionTime: 0,
        success: false
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
