"use client";

import { motion } from "framer-motion";
import { Bot, CheckCircle2, TrendingUp, Clock, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Build Your Career Profile",
    description: "Upload your existing resume or LinkedIn profile. Our AI extracts your core skills and experience instantly.",
    icon: Zap,
    stat: "Takes < 2 minutes",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "AI Analysis & Gap Detection",
    description: "We compare your profile against real-time job market data to identify missing keywords and critical skill gaps.",
    icon: TrendingUp,
    stat: "Analyzes 10M+ Jobs",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Hyper-Targeted Preparation",
    description: "Run voice or text-based mock interviews tailored exactly to the companies and roles you're applying for.",
    icon: Clock,
    stat: "Saves 15+ Hours",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "Land the Dream Job",
    description: "Apply with a 98% ATS-compliant resume, ace the interviews, and use our AI to negotiate your best salary offer.",
    icon: CheckCircle2,
    stat: "3x Higher Success",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Premium Background styling */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:32px]" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Timeline */}
          <div className="flex-1 space-y-10">
            <div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground mb-4">
                The CareerPilot Method
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                From application to <span className="text-primary">offer letter.</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We've engineered a seamless, data-driven pipeline that removes the guesswork from your job search.
              </p>
            </div>
            
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                  className="relative flex items-start gap-6"
                >
                  <div className={cn("relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border shadow-sm bg-background", step.color, "border-" + step.color.split('-')[1] + "-200")}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full", step.bgColor, step.color)}>
                        {step.stat}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right Side: Interactive Mock UI */}
          <div className="flex-1 w-full relative perspective-1000">
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 md:-left-12 z-20 bg-background/80 backdrop-blur-md border shadow-xl rounded-2xl p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">ATS Match Score</p>
                <p className="text-lg font-extrabold text-foreground">98.5%</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -right-6 md:-right-8 z-20 bg-background/80 backdrop-blur-md border shadow-xl rounded-2xl p-4 flex items-center gap-4"
            >
               <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Interview Ready</p>
                <p className="text-sm font-bold text-foreground">All skills verified</p>
              </div>
            </motion.div>

            {/* Main Chat Interface */}
            <motion.div 
              initial={{ opacity: 0, rotateY: 15, x: 20 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-primary/20 bg-card/40 backdrop-blur-xl p-2"
            >
              <div className="w-full h-full rounded-2xl bg-card border shadow-inner flex flex-col relative z-10 overflow-hidden">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <Bot className="text-primary w-5 h-5" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full"></span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">CareerPilot AI</h4>
                      <p className="text-xs text-emerald-500 font-medium">Online & Analyzing</p>
                    </div>
                  </div>
                </div>

                {/* Chat Body */}
                <div className="flex-1 p-5 space-y-4 overflow-hidden flex flex-col bg-grid-black/[0.01] dark:bg-grid-white/[0.01]">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-muted p-3.5 rounded-2xl rounded-tl-sm w-[85%] text-sm shadow-sm"
                  >
                    I've cross-referenced your resume against 500+ recent <strong>Senior React Developer</strong> roles.
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="bg-primary text-primary-foreground p-3.5 rounded-2xl rounded-tr-sm w-[75%] text-sm self-end shadow-md"
                  >
                    What are the critical gaps?
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    className="bg-muted p-3.5 rounded-2xl rounded-tl-sm w-[90%] text-sm shadow-sm space-y-2"
                  >
                    <p>You're missing a few high-value keywords:</p>
                    <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                      <li><span className="text-foreground font-medium">Next.js App Router</span> (in 82% of JDs)</li>
                      <li><span className="text-foreground font-medium">Tailwind CSS</span> (in 65% of JDs)</li>
                    </ul>
                    <div className="pt-2 mt-2 border-t">
                      <span className="text-primary font-medium cursor-pointer hover:underline">Auto-rewrite my experience section &rarr;</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
