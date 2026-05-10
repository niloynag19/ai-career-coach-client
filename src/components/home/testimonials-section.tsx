"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, TrendingUp } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer @ Google",
    quote: "CareerPilot's AI resume analyzer helped me optimize my resume perfectly. I went from zero callbacks to 5 interviews in two weeks!",
    avatar: "SC",
    color: "bg-blue-500",
    metric: "Hired in 14 days",
  },
  {
    name: "James Rodriguez",
    role: "Product Manager @ Meta",
    quote: "The mock interview feature is incredible. The AI gave me feedback that was more detailed than any human coach I've worked with.",
    avatar: "JR",
    color: "bg-purple-500",
    metric: "Passed 5 interview rounds",
  },
  {
    name: "Emily Watson",
    role: "Data Scientist @ Amazon",
    quote: "The career roadmap feature mapped out exactly what skills I needed. Within 6 months, I landed my dream role with a massive compensation bump.",
    avatar: "EW",
    color: "bg-amber-500",
    metric: "+40% Salary Increase",
  },
  {
    name: "David Kim",
    role: "Frontend Dev @ Netflix",
    quote: "I was stuck in tutorial hell. The AI Career Coach guided me on building exactly what recruiters at FAANG were looking for.",
    avatar: "DK",
    color: "bg-rose-500",
    metric: "Transitioned from Non-Tech",
  },
  {
    name: "Anita Patel",
    role: "UX Designer @ Apple",
    quote: "The ATS Score Checker is a game changer. It flagged formatting issues I didn't even know were getting my resume auto-rejected.",
    avatar: "AP",
    color: "bg-emerald-500",
    metric: "99% ATS Match Score",
  },
  {
    name: "Michael Chang",
    role: "Backend Engineer @ Stripe",
    quote: "Negotiating salary is terrifying. The AI gave me a script based on market data, and I successfully negotiated an extra $20k base.",
    avatar: "MC",
    color: "bg-cyan-500",
    metric: "+$20k Base Salary",
  },
];

// Split testimonials into two rows for dual marquee effect
const row1 = [...testimonials.slice(0, 3), ...testimonials.slice(0, 3)];
const row2 = [...testimonials.slice(3, 6), ...testimonials.slice(3, 6)];

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Gradient Masks for smooth scroll fade out */}
      <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-20 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 font-medium text-sm mb-6 border border-amber-500/20">
            <Star className="w-4 h-4 fill-current" />
            Loved by 50,000+ users
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Don't just take our word for it.
          </h2>
          <p className="text-lg text-muted-foreground">
            See how professionals are leveraging CareerPilot AI to negotiate higher salaries and land roles at the world's top companies.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 relative z-0">
        {/* Row 1 - Scrolling Left */}
        <div className="flex flex-nowrap w-max">
          <motion.div
            animate={{ x: [0, -1032] }} // Approximate width of 3 cards + gap
            transition={{
              x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" },
            }}
            className="flex items-center gap-6 pr-6"
          >
            {row1.map((testimonial, index) => (
              <TestimonialCard key={`r1-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Scrolling Right */}
        <div className="flex flex-nowrap w-max -ml-[500px]">
          <motion.div
            animate={{ x: [0, 1032] }} 
            transition={{
              x: { repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" },
            }}
            className="flex items-center gap-6 pr-6"
          >
            {row2.map((testimonial, index) => (
              <TestimonialCard key={`r2-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <Card className="w-[320px] md:w-[400px] shrink-0 bg-background/80 backdrop-blur-xl border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 group relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        <Quote className="w-24 h-24 rotate-12" />
      </div>
      <CardContent className="p-8 flex flex-col h-full relative z-10">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          {/* Data Metric Badge */}
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
            <TrendingUp className="w-3 h-3" />
            {testimonial.metric}
          </div>
        </div>

        <p className="text-foreground/90 mb-8 flex-1 italic leading-relaxed text-[15px]">
          "{testimonial.quote}"
        </p>
        
        <div className="flex items-center gap-4 pt-5 border-t border-border/50">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-inner", testimonial.color)}>
            {testimonial.avatar}
          </div>
          <div>
            <p className="font-bold text-sm text-foreground">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground font-medium">{testimonial.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
