"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, CheckCircle2, ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:32px]" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-[2.5rem] overflow-hidden bg-card border border-border shadow-xl p-8 md:p-16 lg:p-20 text-center"
        >
          {/* Internal glowing effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-primary/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
            
            {/* Social Proof Avatars */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex -space-x-3">
                {[
                  "https://i.pravatar.cc/100?img=1",
                  "https://i.pravatar.cc/100?img=2",
                  "https://i.pravatar.cc/100?img=3",
                  "https://i.pravatar.cc/100?img=4",
                  "https://i.pravatar.cc/100?img=5",
                ].map((img, i) => (
                  <img 
                    key={i} 
                    src={img} 
                    alt="User Avatar" 
                    className="w-10 h-10 rounded-full border-2 border-border object-cover"
                  />
                ))}
              </div>
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">
                  Trusted by <span className="text-foreground font-bold">50,000+</span> pros
                </p>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
              Ready to land your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-300% animate-gradient">dream job faster?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
              Stop guessing what recruiters want. Let our AI optimize your resume, prepare you for interviews, and build your roadmap to success.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
              <Link 
                href="/register" 
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }), 
                  "w-full sm:w-auto h-14 px-8 text-base rounded-full group relative overflow-hidden transition-transform hover:scale-105 active:scale-95"
                )}
              >
                <span className="relative z-10 flex items-center">
                  Start Your Free Trial
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
                {/* Shiny sweep effect */}
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </Link>
              
              <Link 
                href="/services" 
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }), 
                  "w-full sm:w-auto h-14 px-8 text-base rounded-full bg-transparent border-border hover:bg-muted transition-all"
                )}
              >
                Explore Features
              </Link>
            </div>

            {/* Micro-copy Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Cancel anytime
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                14-day free trial
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
