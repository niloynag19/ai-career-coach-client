"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Briefcase, 
  Map, 
  Bot, 
  TrendingUp, 
  Activity 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "ADMIN" || user?.role === "MANAGER";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await api.get("/users/stats");
      return (res as any).data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
        <div className="p-4 bg-red-100 text-red-500 rounded-full">
          <Activity className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Failed to load dashboard</h3>
          <p className="text-muted-foreground">There was an error fetching your statistics.</p>
        </div>
      </div>
    );
  }

  // --- ADMIN DASHBOARD ---
  if (isAdmin) {
    const stats = data as {
      totalUsers: number;
      totalResumes: number;
      totalInterviews: number;
      totalContacts: number;
      recentUsers: any[];
      roleDistribution: { role: string; count: number }[];
      monthlyData: { month: string; users: number }[];
    };

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="text-primary" bgColor="bg-primary/10" />
          <StatCard title="Resumes Analyzed" value={stats.totalResumes} icon={FileText} color="text-secondary" bgColor="bg-secondary/10" />
          <StatCard title="Mock Interviews" value={stats.totalInterviews} icon={Briefcase} color="text-purple-500" bgColor="bg-purple-500/10" />
          <StatCard title="Messages" value={stats.totalContacts} icon={MessageSquare} color="text-amber-500" bgColor="bg-amber-500/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>New registrations over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, fill: "hsl(var(--primary))" }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest signups on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentUsers?.map((u: any) => (
                  <div key={u.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                      {u.image ? (
                        <img src={u.image} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <Users className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-medium truncate">{u.name}</span>
                      <span className="text-xs text-muted-foreground truncate">{u.email}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/admin/users" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full mt-6")}>
                View All Users
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // --- USER DASHBOARD ---
  const stats = data as {
    resumeCount: number;
    interviewCount: number;
    roadmapCount: number;
    chatCount: number;
    latestResume: any;
    latestInterview: any;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name?.split(' ')[0]}!</h2>
        <p className="text-muted-foreground">Here is an overview of your career progression.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Resumes Analyzed" value={stats.resumeCount} icon={FileText} color="text-primary" bgColor="bg-primary/10" />
        <StatCard title="Interviews Practiced" value={stats.interviewCount} icon={Briefcase} color="text-secondary" bgColor="bg-secondary/10" />
        <StatCard title="Roadmaps Created" value={stats.roadmapCount} icon={Map} color="text-amber-500" bgColor="bg-amber-500/10" />
        <StatCard title="AI Coaching Chats" value={stats.chatCount} icon={Bot} color="text-purple-500" bgColor="bg-purple-500/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Resume Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.latestResume ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded shadow-sm border">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{stats.latestResume.fileName}</p>
                      <p className="text-xs text-muted-foreground">{new Date(stats.latestResume.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold">{stats.latestResume.atsScore}%</span>
                    <span className="text-xs text-muted-foreground">ATS Match</span>
                  </div>
                </div>
                <Link href="/dashboard/resumes" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                  View All Resumes
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-4">You haven't analyzed any resumes yet.</p>
                <Link href="/ai-tools/resume" className={cn(buttonVariants({ size: "sm" }))}>
                  Upload Resume
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" />
              Latest Interview Practice
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.latestInterview ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded shadow-sm border">
                      <Briefcase className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm capitalize">{stats.latestInterview.role}</p>
                      <p className="text-xs text-muted-foreground">{new Date(stats.latestInterview.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold">{stats.latestInterview.score ? `${stats.latestInterview.score}%` : "Pending"}</span>
                    <span className="text-xs text-muted-foreground">Score</span>
                  </div>
                </div>
                <Link href="/dashboard/interviews" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                  View All Interviews
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <Briefcase className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-4">You haven't taken any mock interviews.</p>
                <Link href="/ai-tools/interview" className={cn(buttonVariants({ size: "sm" }))}>
                  Start Interview Prep
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bgColor }: any) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
        </div>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", bgColor)}>
          <Icon className={cn("w-6 h-6", color)} />
        </div>
      </CardContent>
    </Card>
  );
}
