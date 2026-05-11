"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, RefreshCw, Users, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const audiences = [
  {
    title: "Recent Graduates",
    description: "Bridge the gap between education and employment. Build a professional resume from scratch and practice entry-level interviews.",
    icon: GraduationCap,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    points: ["Entry-level resume optimization", "First interview confidence", "Career path discovery"]
  },
  {
    title: "Experienced Professionals",
    description: "Take the next step in your career. Optimize your resume for senior roles and ace high-stakes technical or management interviews.",
    icon: Briefcase,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    points: ["Executive level optimization", "Senior management prep", "Salary negotiation tactics"]
  },
  {
    title: "Career Changers",
    description: "Pivot to a new industry with confidence. Identify transferable skills and generate a custom roadmap for your transition.",
    icon: RefreshCw,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    points: ["Transferable skill mapping", "Industry transition roadmaps", "New field interview prep"]
  }
];

export function AudienceSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-foreground to-transparent" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-foreground to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-foreground to-transparent" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Users className="w-3.5 h-3.5" />
            Designed for you
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
          >
            Built for every stage of your <span className="text-primary">career journey.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Whether you're just starting out or looking to lead, our AI tools adapt to your unique experience and goals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card border border-border/50 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2"
            >
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500", item.bg, item.color)}>
                <item.icon className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {item.description}
              </p>

              <div className="space-y-3 pt-6 border-t border-border/50">
                {item.points.map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className={cn("w-5 h-5 shrink-0", item.color)} />
                    <span className="text-sm font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 p-8 md:p-12 rounded-[3rem] bg-foreground text-background overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Not sure where to start?</h3>
              <p className="text-background/70 text-lg">
                Join 10,000+ professionals who have accelerated their careers with AI. Our free tools help you find your footing in minutes.
              </p>
            </div>
            <div className="shrink-0">
              <Link href="/dashboard">
                <button className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                  Start Your Journey Now
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
