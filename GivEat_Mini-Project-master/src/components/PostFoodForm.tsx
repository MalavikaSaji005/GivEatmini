"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoiceInput } from "./VoiceInput";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  location: z.string().min(2, { message: "Location is required." }),
  expiry: z.string().min(2, { message: "Expiry time is required." }),
  price: z.coerce.number().optional(),
  image: z.any().optional(),
});

type PostFoodFormProps = {
  formType: 'donate' | 'sell';
};

export function PostFoodForm({ formType }: PostFoodFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      expiry: "",
    },
  });

  const { setValue } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Success!",
      description: `Your ${formType === 'donate' ? 'donation' : 'item'} has been posted.`,
    });
    router.push(formType === 'donate' ? '/donate' : '/sell');
  }

  const voiceFieldNames = ["name", "description", "location", "expiry"];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-headline text-primary">
          {formType === 'donate' ? 'Post a New Donation' : 'Sell Your Homemade Food'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Name</FormLabel>
                  <FormControl>
                    <VoiceInput placeholder="e.g., Fresh Lasagna" {...field} setValue={setValue} fieldNames={voiceFieldNames} />
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
                     <Textarea placeholder="Tell us a little bit about the food" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <VoiceInput placeholder="e.g., City Center" {...field} setValue={setValue} fieldNames={voiceFieldNames} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="expiry"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Expiry Time</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., 2 days" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                {formType === 'sell' && (
                    <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 12.50" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                )}
            </div>
            <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                    <Button type="button" variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Choose a file
                    </Button>
                </FormControl>
                <FormMessage />
            </FormItem>
            
            <Button type="submit" size="lg" className="w-full font-bold">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
