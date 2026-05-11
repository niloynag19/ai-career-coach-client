"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Target, Users, Zap, Shield, Heart, Globe, Award, 
  Sparkles, BrainCircuit, Rocket, LineChart, CheckCircle2, 
  Briefcase, MessageSquare, Cpu
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const stats = [
  { label: "Active Professionals", value: "125K+", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Resumes Optimized", value: "2.5M+", icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Mock Interviews", value: "850K+", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Career Transitions", value: "45K+", icon: Award, color: "text-purple-500", bg: "bg-purple-500/10" },
];

const values = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Precision",
    description: "We utilize advanced natural language processing and generative models to provide insights that are deeply personalized to your specific industry and role.",
  },
  {
    icon: Shield,
    title: "Uncompromising Privacy",
    description: "Your career data, resumes, and personal information are secured with enterprise-grade encryption. We are firmly committed to never selling your data.",
  },
  {
    icon: Heart,
    title: "Radical Accessibility",
    description: "Premium career coaching shouldn't be a luxury. Our tiered approach ensures everyone has access to top-tier career advancement tools regardless of their budget.",
  },
  {
    icon: Globe,
    title: "Global Intelligence",
    description: "Our AI continuously learns from global market trends, ensuring you receive advice that is highly relevant whether you're in Silicon Valley, London, or Tokyo.",
  },
];

const features = [
  {
    title: "Intelligent Resume Parsing",
    description: "Our system breaks down your experience and maps it against millions of successful job applications to find gaps and opportunities.",
    icon: Briefcase,
  },
  {
    title: "Predictive Market Analysis",
    description: "We analyze current market demands to suggest the most valuable skills you should acquire for your next career jump.",
    icon: LineChart,
  },
  {
    title: "Conversational Interview Prep",
    description: "Practice with our voice-enabled AI that mimics real recruiters from top tech companies, providing instant feedback.",
    icon: MessageSquare,
  },
  {
    title: "Algorithmic Matching",
    description: "Our proprietary engine matches your deep skill profile with emerging opportunities before they even hit the mainstream job boards.",
    icon: Cpu,
  },
];

const team = [
  { name: "Dr. Sarah Chen", role: "CEO & Co-Founder", exp: "Ex-Google AI", avatar: "SC", color: "from-blue-500/20 to-cyan-500/20" },
  { name: "Marcus Johnson", role: "CTO & Co-Founder", exp: "Ex-Stripe Eng", avatar: "MJ", color: "from-purple-500/20 to-pink-500/20" },
  { name: "Aisha Patel", role: "Head of Machine Learning", exp: "Ph.D. Stanford", avatar: "AP", color: "from-emerald-500/20 to-teal-500/20" },
  { name: "David Kim", role: "VP of Product Design", exp: "Ex-Apple", avatar: "DK", color: "from-amber-500/20 to-orange-500/20" },
  { name: "Elena Rodriguez", role: "Director of Career Science", exp: "15yrs Exec Coaching", avatar: "ER", color: "from-rose-500/20 to-red-500/20" },
  { name: "James Wilson", role: "Lead Platform Engineer", exp: "AWS Certified", avatar: "JW", color: "from-indigo-500/20 to-blue-500/20" },
];

const milestones = [
  { year: "2022", title: "The Inception", description: "CareerPilot AI was founded in a small garage in San Francisco with a simple prototype for resume parsing." },
  { year: "2023", title: "Seed Funding & Growth", description: "Secured $5M in seed funding and launched our beta platform to the first 10,000 users." },
  { year: "2024", title: "AI Interviewer Launch", description: "Introduced our groundbreaking conversational AI for real-time interview preparation." },
  { year: "2025", title: "Global Expansion", description: "Reached 100,000 active users and expanded our database to support 15 languages and global markets." },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.1 }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden hero-gradient-bg">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="container relative mx-auto px-4 text-center max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 text-primary rounded-full px-3.5 py-1 text-[10px] uppercase tracking-wider font-bold mb-5 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3 h-3" />
              Empowering the Future of Work
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-[1.15]">
              Elevating Careers with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[size:200%] animate-gradient">
                Human-Centric AI
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-7 font-medium">
              We bridge the gap between human potential and algorithmic intelligence to build the most advanced career optimization platform on the planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              <Link href="/register" className={cn(buttonVariants({ size: "default" }), "rounded-full px-7 h-11 text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all")}>
                Get Started Now
              </Link>
              <Link href="#our-story" className={cn(buttonVariants({ size: "default", variant: "outline" }), "rounded-full px-7 h-11 text-sm backdrop-blur-sm bg-background/20")}>
                Explore Our Vision
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Impact Stats */}
      <section className="py-12 border-y bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center group"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 duration-300", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1 tracking-tight">{stat.value}</h3>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-4xl font-bold tracking-tight mb-8">Democratizing Access to <span className="text-primary">Career Excellence</span></h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Historically, elite career coaching and precise market insights were locked behind expensive paywalls or exclusive networks. We saw this massive inequity and decided to rewrite the rules.
                </p>
                <p>
                  By training specialized LLMs on millions of successful career trajectories, resumes, and interview patterns, we've created an intelligence engine that provides top-tier guidance at a fraction of the cost.
                </p>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 mt-8">
                  <CheckCircle2 className="w-8 h-8 text-primary shrink-0" />
                  <p className="text-foreground font-medium text-base m-0">Our ultimate vision is a world where talent is never limited by a lack of guidance or opportunity visibility.</p>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-purple-500/20 to-transparent blur-3xl -z-10 rounded-full" />
              <div className="relative rounded-3xl overflow-hidden border bg-card/50 backdrop-blur-sm p-8 shadow-2xl">
                <div className="grid gap-6">
                  {features.map((feature, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section id="our-story" className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Journey So Far</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">How we evolved from a simple idea to a comprehensive AI career platform.</p>
          </motion.div>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
            {milestones.map((milestone, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Marker */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary/20 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Target className="w-4 h-4" />
                </div>
                
                {/* Content */}
                <Card className="w-[calc(100%-3rem)] md:w-[calc(50%-3rem)] hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">{milestone.year}</span>
                      <h4 className="font-bold text-lg">{milestone.title}</h4>
                    </div>
                    <p className="text-muted-foreground text-sm">{milestone.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">The principles that dictate how we build products and serve our community.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <motion.div key={value.title} {...fadeUp} transition={{ delay: idx * 0.1 }}>
                <Card className="h-full hover:border-primary/50 transition-colors duration-300 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-2xl mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Meet The Innovators</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A diverse team of AI researchers, career experts, and product designers.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div key={member.name} {...fadeUp} transition={{ delay: idx * 0.1 }}>
                <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-transparent hover:border-border">
                  <div className={cn("h-32 bg-gradient-to-br w-full", member.color)} />
                  <CardContent className="p-6 relative text-center pt-0">
                    <div className="w-24 h-24 mx-auto rounded-full border-4 border-background bg-card shadow-lg flex items-center justify-center text-3xl font-bold text-foreground -mt-12 mb-4 group-hover:scale-105 transition-transform">
                      {member.avatar}
                    </div>
                    <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                    <div className="inline-flex items-center justify-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {member.exp}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary text-primary-foreground" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear_gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <motion.div {...fadeUp}>
            <Rocket className="w-16 h-16 mx-auto mb-8 text-primary-foreground/80" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to Accelerate Your Career?</h2>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Join thousands of professionals who are landing their dream roles faster with CareerPilot AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "rounded-full px-8 h-14 text-base font-semibold")}>
                Create Free Account
              </Link>
              <Link href="/services" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full px-8 h-14 text-base bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground")}>
                Explore Features
              </Link>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/60">No credit card required for the basic tier.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
