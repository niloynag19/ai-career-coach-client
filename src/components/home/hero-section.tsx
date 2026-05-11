"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Sparkles, TrendingUp, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const searchTerms = [keyword, location].filter(Boolean).join(" ");
    if (searchTerms) {
      router.push(`/services?search=${encodeURIComponent(searchTerms)}`);
    } else {
      router.push("/services");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 hero-gradient-bg -z-30" />
      
      {/* Mesh Gradient / Animated Blobs Layer */}
      <div className="absolute inset-0 overflow-hidden -z-20 pointer-events-none opacity-50 dark:opacity-40">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, 80, 40, 0],
            rotate: [0, 45, -45, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-primary/30 rounded-full blur-[100px] md:blur-[150px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 60, 0],
            y: [0, -60, -100, 0],
            rotate: [0, -60, 60, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-blue-500/30 rounded-full blur-[100px] md:blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[80px] md:blur-[120px]"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear_gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.2] dark:opacity-[0.1] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />
      
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
          <div className="flex flex-col md:flex-row items-center bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-3xl md:rounded-full overflow-hidden p-2 group transition-all duration-300 hover:border-primary/50 hover:shadow-primary/5">
            <div className="flex items-center flex-1 w-full px-4 py-2 border-b md:border-b-0 md:border-r border-border">
              <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-base placeholder:text-muted-foreground focus:ring-0"
                placeholder="Job title, keywords, or company"
              />
            </div>
            <div className="flex items-center flex-1 w-full px-4 py-2 mt-2 md:mt-0">
              <MapPin className="w-5 h-5 text-muted-foreground mr-3 shrink-0 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-base placeholder:text-muted-foreground focus:ring-0"
                placeholder="City, state, or remote"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="w-full md:w-auto mt-4 md:mt-0 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-2xl md:rounded-full font-medium transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group/btn"
            >
              <span>Find Jobs</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
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
          <TrendingUp className="w-4 h-4 mr-1 text-primary" />
          <span className="mr-2">Popular:</span>
          {["Software Engineer", "Product Manager", "Data Scientist", "Remote"].map((term) => (
            <Link key={term} href={`/services?search=${encodeURIComponent(term)}`} className="px-3 py-1 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all">
              {term}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
