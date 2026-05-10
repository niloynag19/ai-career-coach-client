"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, MessageCircleQuestion, Mail, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    q: "Is CareerPilot really free to use?",
    a: "Yes! You can sign up and access our core AI tools for free, including resume analysis, interview prep, and career coaching. We offer premium plans for advanced features and unlimited usage.",
  },
  {
    q: "How accurate is the AI resume analysis?",
    a: "Our AI uses the same parsing algorithms that Fortune 500 companies use in their ATS systems. It provides feedback with over 95% accuracy on keyword matching, formatting, and ATS compatibility.",
  },
  {
    q: "Can the AI really help me prepare for interviews?",
    a: "Absolutely! Our AI generates role-specific interview questions based on the actual job description and your experience level. It then provides detailed feedback on your answers, helping you refine your responses.",
  },
  {
    q: "How is my data protected?",
    a: "We take data privacy very seriously. All your documents are encrypted at rest and in transit. We never share your personal information with third parties, and you can delete your data at any time.",
  },
  {
    q: "What makes CareerPilot different from other career tools?",
    a: "CareerPilot combines multiple AI-powered tools into one unified platform. Instead of using separate tools for resume review, interview prep, and career planning, you get everything in one place with personalized recommendations that connect across all your career goals.",
  },
];

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Heading & Support Info */}
          <div className="flex-1 lg:max-w-md sticky top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-6 bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
                <MessageCircleQuestion className="h-3 w-3 mr-2" />
                Support & FAQs
              </Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                Got questions? <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">We've got answers.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Everything you need to know about CareerPilot and how our AI can accelerate your career growth.
              </p>

              {/* Support Metric Card */}
              <div className="bg-card/50 backdrop-blur-md border rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-2">Still need help?</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Can't find the answer you're looking for? Our career support team is here to help you out.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className={cn(buttonVariants({ variant: "default" }), "w-full sm:w-auto")}>
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-muted/50 px-3 py-2 rounded-lg border">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    Replies in &lt; 2 hrs
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Accordion */}
          <div className="flex-[1.5] space-y-4">
            {faqs.map((faq, index) => {
              const isActive = activeIndex === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={cn(
                    "border rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-sm",
                    isActive 
                      ? "bg-card border-primary/30 shadow-lg shadow-primary/5" 
                      : "bg-card/40 border-border/50 hover:border-primary/20 hover:bg-card/60"
                  )}
                >
                  <button
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="flex items-start md:items-center justify-between w-full p-5 md:p-6 text-left group"
                  >
                    <span className={cn(
                      "font-bold text-base md:text-lg transition-colors duration-300 pr-8",
                      isActive ? "text-primary" : "text-foreground group-hover:text-primary/80"
                    )}>
                      {faq.q}
                    </span>
                    <div className={cn(
                      "flex-shrink-0 mt-1 md:mt-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                      isActive 
                        ? "bg-primary text-primary-foreground rotate-180" 
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    )}>
                      {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 md:p-6 pt-0 text-muted-foreground leading-relaxed border-t border-border/10 mt-2">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
