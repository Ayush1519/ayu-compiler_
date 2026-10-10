import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Send, MessageSquare } from 'lucide-react';

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FeedbackModal = ({ open, onOpenChange }: FeedbackModalProps) => {
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('feature');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter your feedback message.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Thank you! Your feedback has been received.');
      setEmail('');
      setMessage('');
      onOpenChange(false);
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <DialogTitle className="text-xl font-bold">Send Feedback</DialogTitle>
          </div>
          <DialogDescription className="text-[15px] leading-relaxed">
            Help us improve AyuCompiler! Share bugs, suggestions, or ideas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="feedback-email" className="text-[13.5px] font-medium">Your Email (optional)</Label>
            <Input
              id="feedback-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 text-[14.5px]"
            />
          </div>

          <div>
            <Label htmlFor="feedback-type" className="text-[13.5px] font-medium">Topic</Label>
            <select
              id="feedback-type"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-[14.5px] focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="feature">Feature Request</option>
              <option value="bug">Bug Report</option>
              <option value="compiler">Compiler / Execution Question</option>
              <option value="ui">Design & Usability</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <Label htmlFor="feedback-message" className="text-[13.5px] font-medium">Your Message *</Label>
            <Textarea
              id="feedback-message"
              placeholder="Describe what you experienced or what feature you would love to see..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
              className="mt-1 text-[14.5px] resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="text-[14.5px]">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary text-primary-foreground text-[14.5px] font-medium">
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Sending...' : 'Submit Feedback'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};


