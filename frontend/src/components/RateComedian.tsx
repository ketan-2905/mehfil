
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui-components/Button";
import { toast } from "sonner";
import { useDataStore, Comedian } from '@/services/DataService';
import { Star } from 'lucide-react';

const formSchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface RateComedianProps {
  comedian: Comedian;
  triggerComponent?: React.ReactNode;
}

const RateComedian = ({ comedian, triggerComponent }: RateComedianProps) => {
  const [open, setOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const rateComedian = useDataStore(state => state.rateComedian);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      review: "",
    },
  });

  const onSubmit = (data: FormData) => {
    rateComedian(comedian.id, data.rating, data.review);
    toast.success("Rating submitted successfully!");
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerComponent || <Button size="sm">Rate Comedian</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-comedy-darker border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl">Rate {comedian.name}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center space-x-2 py-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={32}
                          className={`cursor-pointer transition-colors ${
                            (hoverRating || field.value) >= star
                              ? 'fill-comedy-orange text-comedy-orange'
                              : 'text-muted-foreground'
                          }`}
                          onClick={() => field.onChange(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your thoughts about this comedian" 
                      className="bg-white/5 border-white/10 min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={form.getValues().rating === 0}
              >
                Submit Rating
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RateComedian;
