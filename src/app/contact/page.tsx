"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Send, Loader2, Mail, MapPin, Phone, Clock, 
  CheckCircle, MessageSquare, Globe2, Sparkles, 
  HelpCircle, Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  { 
    icon: Mail, 
    label: "Email Us", 
    value: "support@careerpilot.ai", 
    description: "Our friendly team is here to help.",
    href: "mailto:support@careerpilot.ai",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  { 
    icon: MapPin, 
    label: "Visit Us", 
    value: "Level 4, 34, Awal Centre, Banani, Dhaka", 
    description: "Come say hello at our HQ.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  { 
    icon: Phone, 
    label: "Call Us", 
    value: "+880 1322-901105", 
    description: "Mon-Fri from 9am to 6pm.",
    href: "tel:+8801322901105",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  { 
    icon: Globe2, 
    label: "Global Support", 
    value: "Available 24/7", 
    description: "For Enterprise customers.",
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
];

const faqs = [
  {
    q: "How fast can I expect a response?",
    a: "For general inquiries, our team typically responds within 24 hours. Enterprise customers receive priority support with a 2-hour SLA."
  },
  {
    q: "Do you offer technical support for the AI integrations?",
    a: "Yes! Our technical team is available to assist you with API integrations and advanced resume parsing configuration."
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Absolutely. You can upgrade or downgrade your subscription at any time from your account settings page."
  },
  {
    q: "Where can I find API documentation?",
    a: "Our developer documentation is available at docs.careerpilot.ai, which covers all REST endpoints and webhook configurations."
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.1 }
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await api.post("/contacts", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Message sent! We'll get back to you soon.");
      setSubmitted(true);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to send message. Please try again.");
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent h-[400px] blur-3xl -z-10" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear_gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
        
        <div className="container relative mx-auto px-4 text-center max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm">
              <MessageSquare className="w-4 h-4" />
              We're here to help
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Get in touch with our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                Support Team
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Have a question about CareerPilot AI? Need help with your account or want to explore enterprise options? We're just a message away.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            
            {/* Contact Info */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-3">Chat with us</h2>
                <p className="text-lg text-muted-foreground">Speak to our friendly team via email, or drop by our office if you're in the neighborhood.</p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <motion.div key={info.label} variants={fadeUp}>
                    <Card className="bg-card/50 backdrop-blur-sm border-transparent hover:border-border transition-colors hover:shadow-sm">
                      <CardContent className="p-6 flex items-start gap-5">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", info.bg)}>
                          <info.icon className={cn("w-6 h-6", info.color)} />
                        </div>
                        <div>
                          <p className="text-base font-bold text-foreground">{info.label}</p>
                          <p className="text-sm text-muted-foreground mb-1">{info.description}</p>
                          {info.href ? (
                            <a href={info.href} className="text-sm font-semibold text-primary hover:underline transition-colors">
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-sm font-semibold text-foreground">{info.value}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="lg:col-span-3">
              <Card className="shadow-2xl border-primary/10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <CardHeader className="pb-8 pt-10 px-8 md:px-10 relative z-10">
                  <CardTitle className="text-3xl font-bold">Send us a Message</CardTitle>
                  <CardDescription className="text-base mt-2">Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent className="px-8 md:px-10 pb-10 relative z-10">
                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16 space-y-6"
                    >
                      <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                        <div className="absolute inset-0 border-4 border-green-500/20 rounded-full animate-ping" />
                        <CheckCircle className="w-12 h-12 text-green-500" />
                      </div>
                      <h3 className="text-3xl font-bold">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground text-lg max-w-md mx-auto">
                        Thank you for reaching out. A member of our support team will review your message and respond shortly.
                      </p>
                      <Button variant="outline" size="lg" onClick={() => setSubmitted(false)} className="mt-8 rounded-full px-8">
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="e.g. John Doe"
                            {...register("name")}
                            className={cn("h-12 bg-muted/50 focus:bg-background transition-colors", errors.name && "border-destructive focus-visible:ring-destructive")}
                          />
                          {errors.name && <p className="text-xs font-medium text-destructive">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="e.g. john@example.com"
                            {...register("email")}
                            className={cn("h-12 bg-muted/50 focus:bg-background transition-colors", errors.email && "border-destructive focus-visible:ring-destructive")}
                          />
                          {errors.email && <p className="text-xs font-medium text-destructive">{errors.email.message}</p>}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="subject" className="text-sm font-semibold">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="How can we help you today?"
                          {...register("subject")}
                          className={cn("h-12 bg-muted/50 focus:bg-background transition-colors", errors.subject && "border-destructive focus-visible:ring-destructive")}
                        />
                        {errors.subject && <p className="text-xs font-medium text-destructive">{errors.subject.message}</p>}
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="message" className="text-sm font-semibold">Your Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your inquiry..."
                          className={cn("min-h-[180px] bg-muted/50 focus:bg-background transition-colors resize-y", errors.message && "border-destructive focus-visible:ring-destructive")}
                          {...register("message")}
                        />
                        {errors.message && <p className="text-xs font-medium text-destructive">{errors.message.message}</p>}
                      </div>
                      <Button type="submit" disabled={mutation.isPending} size="lg" className="w-full sm:w-auto min-w-[200px] h-14 rounded-full text-base">
                        {mutation.isPending ? (
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        ) : (
                          <Send className="w-5 h-5 mr-2" />
                        )}
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Find quick answers to common questions about our platform.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full bg-card/50 hover:bg-card transition-colors">
                  <CardContent className="p-8">
                    <h4 className="font-bold text-lg mb-3 leading-snug">{faq.q}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
