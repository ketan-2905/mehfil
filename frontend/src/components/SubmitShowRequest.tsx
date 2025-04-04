
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui-components/Button";
import { toast } from "sonner";
import { useDataStore } from "@/services/DataService";
import { Plus } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  venueName: z.string().min(1, "Venue is required"),
});

type FormData = z.infer<typeof formSchema>;

const SubmitShowRequest = () => {
  const [open, setOpen] = useState(false);
  const addShowRequest = useDataStore(state => state.addShowRequest);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      venueName: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // Submit the request
    addShowRequest({
      performerId: 1, // Mock performer ID
      performerName: "Current Performer", // Mock performer name
      venueId: 1, // Mock venue ID based on venue name
      venueName: data.venueName,
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      status: "pending",
    });
    
    toast.success("Show request submitted successfully!");
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus size={16} className="mr-2" />
          Propose New Show
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-comedy-darker border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl">Submit Show Request</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Show Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter show title" className="bg-white/5 border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your show" 
                      className="bg-white/5 border-white/10 min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="bg-white/5 border-white/10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" className="bg-white/5 border-white/10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="venueName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-comedy-orange"
                      {...field}
                    >
                      <option value="">Select a venue</option>
                      <option value="The Laughing Pint">The Laughing Pint</option>
                      <option value="Comedy Cellar">Comedy Cellar</option>
                      <option value="Chuckles Comedy Club">Chuckles Comedy Club</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Submit Request
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitShowRequest;
