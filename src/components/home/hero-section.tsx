"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Sparkles, TrendingUp, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 bg-background -z-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear_gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
      
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 mix-blend-screen" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] -z-10 mix-blend-screen" />
      
      <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary font-medium text-sm mb-6 border border-primary/10"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Discover your next career move</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto mb-6 leading-tight text-foreground"
        >
          Find the job that fits your life with <br className="hidden md:block" />
          <span className="text-primary">
            CareerPilot AI
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Explore thousands of job opportunities, get AI-powered resume feedback, and prepare for interviews all in one place.
        </motion.p>
        
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-3xl mx-auto mb-8 relative"
        >
          <div className="flex flex-col md:flex-row items-center bg-background/95 backdrop-blur-sm border border-border shadow-lg rounded-3xl md:rounded-full overflow-hidden p-2">
            <div className="flex items-center flex-1 w-full px-4 py-2 border-b md:border-b-0 md:border-r border-border">
              <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
              <input
                type="text"
                className="w-full bg-transparent border-none outline-none text-base placeholder:text-foreground focus:ring-0"
                placeholder="Job title, keywords, or company"
              />
            </div>
            <div className="flex items-center flex-1 w-full px-4 py-2 mt-2 md:mt-0">
              <MapPin className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
              <input
                type="text"
                className="w-full bg-transparent border-none outline-none text-base placeholder:text-foreground focus:ring-0"
                placeholder="City, state, or remote"
              />
            </div>
            <button className="w-full md:w-auto mt-4 md:mt-0 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-2xl md:rounded-full font-medium transition-colors shadow-sm">
              Find Jobs
            </button>
          </div>
        </motion.div>

        {/* Popular Searches */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="mr-2">Popular:</span>
          {["Software Engineer", "Product Manager", "Data Scientist", "Remote"].map((term) => (
            <Link key={term} href={`/services`} className="px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors">
              {term}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
