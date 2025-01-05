import React from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { StarIcon } from 'lucide-react';

interface FeedbackSystemProps {
  onFeedbackSubmit?: (feedback: { rating: number; comment: string }) => void;
}

export function FeedbackSystem({ onFeedbackSubmit }: FeedbackSystemProps) {
  const [rating, setRating] = React.useState<number>(0);
  const [comment, setComment] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSubmit = () => {
    if (onFeedbackSubmit) {
      onFeedbackSubmit({ rating, comment });
    }
    setIsDialogOpen(false);
    setRating(0);
    setComment('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Appointment Feedback</h3>
      <p className="text-sm text-gray-500">
        Your feedback helps us improve our services. Please take a moment to rate your experience.
      </p>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Leave Feedback</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Your Experience</DialogTitle>
            <DialogDescription>
              Please rate your experience and leave any additional comments.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-1 rounded-full transition-colors ${
                    rating >= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <StarIcon className="h-8 w-8" />
                </button>
              ))}
            </div>

            <Textarea
              placeholder="Share your experience (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={rating === 0}>
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

