"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  History, 
  FileText, 
  Briefcase, 
  Map, 
  User, 
  Mail, 
  Calendar,
  Search,
  ExternalLink
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

export default function AdminHistoryPage() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "resumes";
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(defaultTab);

  const { data: resumes, isLoading: resumesLoading } = useQuery({
    queryKey: ["admin-resumes"],
    queryFn: () => api.get("/ai/admin/resumes").then(res => (res as any).data),
  });

  const { data: interviews, isLoading: interviewsLoading } = useQuery({
    queryKey: ["admin-interviews"],
    queryFn: () => api.get("/ai/admin/interviews").then(res => (res as any).data),
  });

  const { data: roadmaps, isLoading: roadmapsLoading } = useQuery({
    queryKey: ["admin-roadmaps"],
    queryFn: () => api.get("/ai/admin/roadmaps").then(res => (res as any).data),
  });

  const filterData = (data: any[]) => {
    if (!data) return [];
    if (!searchTerm) return data;
    return data.filter(item => 
      item.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.targetRole?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System History</h1>
          <p className="text-muted-foreground mt-2">
            Monitor all AI-powered activities across the platform.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by user or role..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-xl mb-8">
          <TabsTrigger value="resumes" className="flex items-center gap-2">
            <FileText className="w-4 h-4" /> Resumes
          </TabsTrigger>
          <TabsTrigger value="interviews" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Interviews
          </TabsTrigger>
          <TabsTrigger value="roadmaps" className="flex items-center gap-2">
            <Map className="w-4 h-4" /> Roadmaps
          </TabsTrigger>
        </TabsList>

        {/* ================= RESUMES TABLE ================= */}
        <TabsContent value="resumes">
          <Card>
            <CardHeader>
              <CardTitle>Resume Analyses</CardTitle>
              <CardDescription>All user resume uploads and ATS match results.</CardDescription>
            </CardHeader>
            <CardContent>
              {resumesLoading ? (
                <LoadingSkeleton />
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">User</th>
                        <th className="px-4 py-3 text-left font-semibold">File Name</th>
                        <th className="px-4 py-3 text-left font-semibold">Status</th>
                        <th className="px-4 py-3 text-left font-semibold">Score</th>
                        <th className="px-4 py-3 text-left font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filterData(resumes).length === 0 ? (
                        <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No records found.</td></tr>
                      ) : (
                        filterData(resumes).map((item: any) => (
                          <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-4">
                              <div className="flex flex-col">
                                <span className="font-medium">{item.user?.name}</span>
                                <span className="text-xs text-muted-foreground">{item.user?.email}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 font-mono text-xs">{item.fileName}</td>
                            <td className="px-4 py-4">
                              <Badge variant="secondary" className="uppercase text-[10px]">{item.status}</Badge>
                            </td>
                            <td className="px-4 py-4">
                              <span className="font-bold">{item.atsScore || item.analysis?.overallScore || 0}%</span>
                            </td>
                            <td className="px-4 py-4 text-muted-foreground">
                              {format(new Date(item.createdAt), "MMM d, h:mm a")}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= INTERVIEWS TABLE ================= */}
        <TabsContent value="interviews">
          <Card>
            <CardHeader>
              <CardTitle>Mock Interview Sessions</CardTitle>
              <CardDescription>Generated questions and user evaluation history.</CardDescription>
            </CardHeader>
            <CardContent>
              {interviewsLoading ? (
                <LoadingSkeleton />
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">User</th>
                        <th className="px-4 py-3 text-left font-semibold">Target Role</th>
                        <th className="px-4 py-3 text-left font-semibold">Difficulty</th>
                        <th className="px-4 py-3 text-left font-semibold">Score</th>
                        <th className="px-4 py-3 text-left font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filterData(interviews).length === 0 ? (
                        <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No records found.</td></tr>
                      ) : (
                        filterData(interviews).map((item: any) => (
                          <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-4">
                              <div className="flex flex-col">
                                <span className="font-medium">{item.user?.name}</span>
                                <span className="text-xs text-muted-foreground">{item.user?.email}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 capitalize">{item.role}</td>
                            <td className="px-4 py-4">
                              <Badge variant="outline" className="capitalize">{item.difficulty}</Badge>
                            </td>
                            <td className="px-4 py-4 font-bold">{item.score || 0}%</td>
                            <td className="px-4 py-4 text-muted-foreground">
                              {format(new Date(item.createdAt), "MMM d, h:mm a")}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= ROADMAPS TABLE ================= */}
        <TabsContent value="roadmaps">
          <Card>
            <CardHeader>
              <CardTitle>Career Roadmaps</CardTitle>
              <CardDescription>Generated career paths and roadmap progression.</CardDescription>
            </CardHeader>
            <CardContent>
              {roadmapsLoading ? (
                <LoadingSkeleton />
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">User</th>
                        <th className="px-4 py-3 text-left font-semibold">Path</th>
                        <th className="px-4 py-3 text-left font-semibold">Timeline</th>
                        <th className="px-4 py-3 text-left font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filterData(roadmaps).length === 0 ? (
                        <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No records found.</td></tr>
                      ) : (
                        filterData(roadmaps).map((item: any) => (
                          <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-4">
                              <div className="flex flex-col">
                                <span className="font-medium">{item.user?.name}</span>
                                <span className="text-xs text-muted-foreground">{item.user?.email}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span className="font-medium">{item.currentRole || "Entry"}</span>
                              <span className="mx-2 text-muted-foreground">→</span>
                              <span className="font-bold text-primary">{item.targetRole}</span>
                            </td>
                            <td className="px-4 py-4">
                              <Badge variant="secondary">{item.timeline || "N/A"}</Badge>
                            </td>
                            <td className="px-4 py-4 text-muted-foreground">
                              {format(new Date(item.createdAt), "MMM d, h:mm a")}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-12 w-full rounded-md" />
      ))}
    </div>
  );
}
