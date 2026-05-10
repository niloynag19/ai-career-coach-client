"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function TrustBadgesSection() {
  const companies = [
    { name: "Microsoft", font: "font-serif" },
    { name: "Google", font: "font-sans" },
    { name: "Amazon", font: "italic" },
    { name: "Meta", font: "font-mono" },
    { name: "Netflix", font: "font-sans font-bold" },
    { name: "Apple", font: "font-sans" },
    { name: "Tesla", font: "font-serif tracking-widest" },
    { name: "Spotify", font: "font-bold" },
  ];

  return (
    <section className="py-16 border-y bg-muted/20 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="container px-4 md:px-6 mx-auto mb-10 relative z-20">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <p className="text-sm md:text-base font-medium text-muted-foreground tracking-wider">
            TRUSTED BY OVER <span className="text-foreground font-bold">50,000+</span> PROFESSIONALS HIRED AT TOP TECH COMPANIES
          </p>
        </div>
      </div>

      <div className="flex flex-nowrap w-max relative z-0">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex items-center gap-16 md:gap-24 opacity-60 grayscale pr-16 md:pr-24"
        >
          {/* Double array for seamless loop */}
          {[...companies, ...companies].map((company, index) => (
            <div 
              key={index} 
              className={`text-2xl md:text-3xl font-bold whitespace-nowrap text-foreground/80 hover:text-primary hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${company.font}`}
            >
              {company.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
