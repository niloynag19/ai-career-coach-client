"use client";

import { motion } from "framer-motion";
import { FileText, Target, Users, Star, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function StatsSection() {
  const { data: stats } = useQuery({
    queryKey: ["public-stats"],
    queryFn: async () => {
      const res = await api.get("/users/public-stats");
      return (res as any).data;
    },
  });

  const statsList = [
    { 
      value: stats?.totalResumes ? `${stats.totalResumes.toLocaleString()}+` : "3,500+", 
      label: "Resumes Analyzed", 
      icon: FileText,
      trend: "+24% this month",
      trendPositive: true,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    { 
      value: stats?.totalInterviews ? `${stats.totalInterviews.toLocaleString()}+` : "850+", 
      label: "Mock Interviews", 
      icon: Target,
      trend: "Top 1% industry average",
      trendPositive: true,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    { 
      value: stats?.totalUsers ? `${stats.totalUsers.toLocaleString()}+` : "1,200+", 
      label: "Careers Transformed", 
      icon: Users,
      trend: "Across 150+ industries",
      trendPositive: true,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    { 
      value: "4.9/5", 
      label: "Average Rating", 
      icon: Star,
      trend: "Based on 3,000+ reviews",
      trendPositive: true,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        
        {/* Massive Premium Container */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-card border border-border shadow-xl p-8 md:p-16">
          
          {/* Background Effects inside container */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 max-w-3xl"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
                The numbers speak for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">themselves.</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Our AI-powered platform isn't just theory—it's actively helping tens of thousands of professionals across the globe land their dream jobs faster.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {statsList.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="relative group p-6 rounded-3xl bg-muted/50 border border-border hover:bg-muted transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner", stat.bg, stat.color)}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-slate-500 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                    </div>
                    
                    <div className="mb-2">
                      <h3 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">{stat.value}</h3>
                    </div>
                    
                    <p className="text-lg font-medium text-muted-foreground mb-4">{stat.label}</p>
                    
                    <div className="mt-auto pt-4 border-t border-border">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                        {stat.trendPositive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
