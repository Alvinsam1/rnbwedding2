import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateRsvp, getListRsvpsQueryKey } from "@workspace/api-client-react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import branchArt from "@assets/Adobe_Express_-_file_1783254795689.png";
import goldDivider from "@/assets/floral/8.png";
import flowerAccent from "@/assets/floral/6.png";
import { PetalShower } from "@/components/PetalShower";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Please enter your full name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  attending: z.enum(["yes", "no"]),
  guestCount: z.coerce.number().min(1).max(10),
  message: z.string().optional(),
});

export function RSVP() {
  const queryClient = useQueryClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const createRsvp = useCreateRsvp();
  const mutateRef = useRef(createRsvp.mutate);
  mutateRef.current = createRsvp.mutate;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      attending: "yes",
      guestCount: 1,
      message: "",
    },
  });

  const isAttending = form.watch("attending") === "yes";

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutateRef.current({
      data: {
        ...values,
        attending: values.attending === "yes",
      }
    }, {
      onSuccess: () => {
        setIsSuccess(true);
        queryClient.invalidateQueries({ queryKey: getListRsvpsQueryKey() });
      }
    });
  }

  return (
    <section id="rsvp" className="py-32 relative bg-secondary/10">
      <div className="absolute bottom-0 left-0 w-64 opacity-20 pointer-events-none">
        <img src={branchArt} alt="" className="w-full h-auto" />
      </div>
      <img
        src={flowerAccent}
        alt=""
        className="absolute top-8 right-8 w-24 md:w-32 opacity-20 pointer-events-none hidden sm:block"
      />

      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">RSVP</h2>
          <img src={goldDivider} alt="" className="h-6 mx-auto opacity-90 mb-6" />
          <p className="font-sans text-sm tracking-[0.2em] text-foreground/60 uppercase">
            Kindly respond by September 1st, 2026
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center border border-primary/20 bg-background/50 backdrop-blur-sm"
              >
                <PetalShower />
                <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center mx-auto mb-6 text-primary text-2xl">
                  ✓
                </div>
                <h3 className="font-serif text-3xl text-primary mb-4">Thank You</h3>
                <p className="font-sans text-foreground/70 font-light">
                  Your response has been graciously received. We look forward to celebrating with you.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 md:p-12 border border-primary/10 bg-background/50 backdrop-blur-sm"
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-sans text-xs tracking-widest uppercase text-foreground/70">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="M. & Mme. Dupont" className="bg-transparent border-b border-primary/20 border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 font-serif text-lg" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs text-destructive" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-sans text-xs tracking-widest uppercase text-foreground/70">Email</FormLabel>
                            <FormControl>
                              <Input placeholder="contact@example.com" type="email" className="bg-transparent border-b border-primary/20 border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 font-serif text-lg" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs text-destructive" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="attending"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel className="font-sans text-xs tracking-widest uppercase text-foreground/70">Will you attend?</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="yes" className="border-primary text-primary" />
                                </FormControl>
                                <FormLabel className="font-serif text-lg font-normal cursor-none">
                                  Joyfully accept
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="no" className="border-primary text-primary" />
                                </FormControl>
                                <FormLabel className="font-serif text-lg font-normal cursor-none">
                                  Regretfully decline
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-xs text-destructive" />
                        </FormItem>
                      )}
                    />

                    <AnimatePresence>
                      {isAttending && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-8 overflow-hidden"
                        >
                          <FormField
                            control={form.control}
                            name="guestCount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-sans text-xs tracking-widest uppercase text-foreground/70">Number of Guests</FormLabel>
                                <FormControl>
                                  <Input type="number" min={1} max={10} className="bg-transparent border-b border-primary/20 border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 font-serif text-lg w-24" {...field} />
                                </FormControl>
                                <FormMessage className="text-xs text-destructive" />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-xs tracking-widest uppercase text-foreground/70">Message for the couple</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any dietary restrictions or a note of love..." 
                              className="bg-transparent border-b border-primary/20 border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 font-serif text-lg resize-none min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-destructive" />
                        </FormItem>
                      )}
                    />

                    <div className="pt-4 text-center">
                      <button
                        type="submit"
                        disabled={createRsvp.isPending}
                        className="inline-block px-12 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 font-sans text-xs tracking-[0.2em] uppercase disabled:opacity-50"
                      >
                        {createRsvp.isPending ? "Sending..." : "Submit RSVP"}
                      </button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
