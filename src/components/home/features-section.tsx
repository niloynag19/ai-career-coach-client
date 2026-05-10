"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bot, FileText, Target, MessageSquare, Map, BarChart3, ArrowRight, Sparkles, TrendingUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "AI Resume Analyzer",
    description: "Get instant, actionable feedback on your resume. Our AI checks for ATS compatibility, keyword optimization, and formatting.",
    icon: FileText,
    href: "/dashboard/resumes",
    color: "bg-blue-500/10 text-blue-500",
    metric: "+300%",
    metricLabel: "Interview Rate",
    colSpan: "md:col-span-2 lg:col-span-2",
    badge: "Most Popular",
    subFeatures: ["ATS Keyword Matching", "Action Verb Optimization", "Formatting Analysis"]
  },
  {
    title: "24/7 AI Career Coach",
    description: "Chat with your personal career coach anytime. Get advice on salary negotiation and career decisions.",
    icon: Bot,
    href: "/dashboard/chat",
    color: "bg-primary/10 text-primary",
    metric: "< 2s",
    metricLabel: "Response Time",
    colSpan: "md:col-span-1 lg:col-span-1",
    subFeatures: ["Salary Negotiation", "Career Pivots"]
  },
  {
    title: "AI Interview Prep",
    description: "Practice with our AI interviewer. Get customized questions based on your target role and instant feedback on your answers.",
    icon: MessageSquare,
    href: "/dashboard/interviews",
    color: "bg-purple-500/10 text-purple-500",
    metric: "10,000+",
    metricLabel: "Mock Interviews",
    colSpan: "md:col-span-1 lg:col-span-1",
    subFeatures: ["Behavioral Q&A", "Technical Screens"]
  },
  {
    title: "Career Roadmap",
    description: "Generate a step-by-step personalized plan to transition into your dream role, complete with resources and timelines.",
    icon: Map,
    href: "/dashboard/roadmaps",
    color: "bg-amber-500/10 text-amber-500",
    metric: "95%",
    metricLabel: "Goal Achievement",
    colSpan: "md:col-span-2 lg:col-span-2",
    subFeatures: ["Step-by-step Milestones", "Curated Resources", "Timeline Estimation"]
  },
  {
    title: "ATS Score Checker",
    description: "Compare your resume against specific job descriptions to see your match percentage and missing keywords.",
    icon: Target,
    href: "/dashboard/resumes",
    color: "bg-emerald-500/10 text-emerald-500",
    metric: "85+",
    metricLabel: "Avg. Target Score",
    colSpan: "md:col-span-2 lg:col-span-2",
    subFeatures: ["Job Match Percentage", "Missing Keywords", "Industry Benchmarks"]
  },
  {
    title: "Skill Gap Analyzer",
    description: "Identify exactly what skills you're missing for your target roles and get a plan to acquire them quickly.",
    icon: BarChart3,
    href: "/dashboard/roadmaps",
    color: "bg-rose-500/10 text-rose-500",
    metric: "500+",
    metricLabel: "Skills Tracked",
    colSpan: "md:col-span-1 lg:col-span-1",
    subFeatures: ["Market Demand", "Learning Paths"]
  },
];

export function FeaturesSection() {
  return (
    <section className="py-6 md:py-8 relative overflow-hidden bg-background">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-20 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/30 blur-[120px]" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 opacity-20 pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[100px]" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
            <Sparkles className="h-3 w-3 mr-2" />
            AI-Powered Arsenal
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">land the job</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            A comprehensive suite of intelligent tools designed to optimize your profile, ace your interviews, and accelerate your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 auto-rows-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className={cn(feature.colSpan)}
            >
              <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group bg-card/40 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-5 flex flex-col h-full relative z-10">
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner", feature.color)}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    {feature.badge && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-snug">
                    {feature.description}
                  </p>

                  {/* Sub-features list */}
                  <ul className="space-y-1 mb-4">
                    {feature.subFeatures.map((sub, i) => (
                      <li key={i} className="flex items-center text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2" />
                        {sub}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-background rounded-lg px-3 py-1.5 flex items-center gap-2 border shadow-sm">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span className="font-bold text-foreground">{feature.metric}</span>
                        <span className="text-xs text-muted-foreground">{feature.metricLabel}</span>
                      </div>
                    </div>
                    <Link href={feature.href} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
