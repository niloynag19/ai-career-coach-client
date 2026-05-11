"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Map, Loader2, ArrowRight, BookOpen, Award, ExternalLink, Target, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export default function RoadmapsPage() {
  const queryClient = useQueryClient();
  const [targetRole, setTargetRole] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("mid-level");
  const [timeline, setTimeline] = useState("6 months");
  const [jobDescription, setJobDescription] = useState("");

  const [activeRoadmap, setActiveRoadmap] = useState<any>(null);
  const [activeSkillGap, setActiveSkillGap] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("roadmap");

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["roadmaps-history"],
    queryFn: () => api.get("/ai/roadmaps"),
  });

  const roadmapMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post("/ai/career-roadmap", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Career roadmap generated!");
      setActiveRoadmap(data);
      setActiveTab("roadmap");
      queryClient.invalidateQueries({ queryKey: ["roadmaps-history"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to generate roadmap");
    },
  });

  const skillGapMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post("/ai/skill-gap", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Skill gap analysis complete!");
      setActiveSkillGap(data);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to analyze skill gap");
    },
  });

  const handleGenerateRoadmap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole) {
      toast.error("Target role is required");
      return;
    }
    const skillsArray = currentSkills.split(",").map(s => s.trim()).filter(Boolean);
    roadmapMutation.mutate({
      targetRole,
      currentRole,
      currentSkills: skillsArray,
      experienceLevel,
      timeline,
    });
  };

  const handleAnalyzeSkillGap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole) {
      toast.error("Target role is required");
      return;
    }
    const skillsArray = currentSkills.split(",").map(s => s.trim()).filter(Boolean);
    if (skillsArray.length === 0) {
      toast.error("Please enter your current skills");
      return;
    }
    skillGapMutation.mutate({
      targetRole,
      currentSkills: skillsArray,
      jobDescription: jobDescription || undefined,
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Career Roadmap & Skills</h1>
        <p className="text-muted-foreground mt-2">
          Plan your career trajectory and identify the skills you need to learn.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl mb-8">
          <TabsTrigger value="roadmap">Career Roadmap</TabsTrigger>
          <TabsTrigger value="skillgap">Skill Gap Analyzer</TabsTrigger>
          <TabsTrigger value="history">Saved Roadmaps</TabsTrigger>
        </TabsList>

        {/* ===================== CAREER ROADMAP TAB ===================== */}
        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Career Roadmap</CardTitle>
              <CardDescription>Get a personalized step-by-step plan to reach your target role.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerateRoadmap} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="targetRole">Target Role *</Label>
                      <Input id="targetRole" placeholder="e.g., Senior Full Stack Engineer" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="currentRole">Current Role</Label>
                      <Input id="currentRole" placeholder="e.g., Junior Developer" value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="experienceLevel">Experience Level</Label>
                      <Select value={experienceLevel} onValueChange={(val) => setExperienceLevel(val || "mid-level")}>
                        <SelectTrigger id="experienceLevel"><SelectValue placeholder="Select level" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry-level">Entry Level (0-2 yrs)</SelectItem>
                          <SelectItem value="mid-level">Mid Level (3-5 yrs)</SelectItem>
                          <SelectItem value="senior">Senior (5+ yrs)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="timeline">Desired Timeline</Label>
                      <Select value={timeline} onValueChange={(val) => setTimeline(val || "6 months")}>
                        <SelectTrigger id="timeline"><SelectValue placeholder="Select timeline" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3 months">3 Months</SelectItem>
                          <SelectItem value="6 months">6 Months</SelectItem>
                          <SelectItem value="12 months">12 Months</SelectItem>
                          <SelectItem value="2+ years">2+ Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currentSkills">Current Skills (comma separated)</Label>
                  <Input id="currentSkills" placeholder="e.g., React, Node.js, TypeScript" value={currentSkills} onChange={(e) => setCurrentSkills(e.target.value)} />
                </div>
                <Button type="submit" disabled={roadmapMutation.isPending} className="w-full sm:w-auto">
                  {roadmapMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Generate Roadmap
                </Button>
              </form>
            </CardContent>
          </Card>

          {activeRoadmap && (
            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-left">
                    <div>
                      <h3 className="text-2xl font-bold">{activeRoadmap.currentRole || "Start"}</h3>
                      <p className="text-sm text-muted-foreground">Current</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center min-w-[100px]">
                      <div className="h-[2px] bg-primary/30 w-full relative">
                        <ArrowRight className="absolute -right-2 -top-3 w-6 h-6 text-primary" />
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-primary whitespace-nowrap bg-background/80 px-2 py-0.5 rounded-full">{activeRoadmap.estimatedTimeline}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{activeRoadmap.targetRole}</h3>
                      <p className="text-sm text-muted-foreground">Target</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-background rounded-lg border text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">Career Advisor Note:</p>
                    {activeRoadmap.overallAdvice}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <h3 className="text-xl font-bold mb-4">Your Roadmap Phases</h3>
                  <div className="relative border-l-2 border-primary/20 ml-3 md:ml-4 space-y-8 pb-4">
                    {activeRoadmap.phases?.map((phase: any, idx: number) => (
                      <div key={idx} className="relative pl-6 md:pl-8">
                        <div className="absolute w-6 h-6 bg-primary rounded-full -left-[13px] top-0 flex items-center justify-center ring-4 ring-background">
                          <span className="text-[10px] font-bold text-primary-foreground">{phase.phase}</span>
                        </div>
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{phase.title}</CardTitle>
                                <CardDescription>{phase.duration}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm">{phase.description}</p>
                            
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Focus Skills</p>
                              <div className="flex flex-wrap gap-2">
                                {phase.skills.map((skill: string, i: number) => (
                                  <Badge key={i} variant="secondary">{skill}</Badge>
                                ))}
                              </div>
                            </div>

                            {phase.resources && phase.resources.length > 0 && (
                              <div className="bg-muted/50 rounded-lg p-3">
                                <p className="text-xs font-semibold uppercase tracking-wider mb-2">Recommended Resources</p>
                                <ul className="space-y-2">
                                  {phase.resources.map((res: any, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                      <BookOpen className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                                      <span>
                                        <span className="font-medium">{res.name}</span>
                                        <span className="text-muted-foreground"> ({res.type})</span>
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Target className="w-5 h-5 text-primary" /> Key Skills to Acquire
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {activeRoadmap.keySkillsToAcquire?.map((skill: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-sm border-b pb-2 last:border-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {activeRoadmap.certifications?.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Award className="w-5 h-5 text-amber-500" /> Certifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {activeRoadmap.certifications?.map((cert: string, i: number) => (
                            <li key={i} className="bg-muted/50 p-2 rounded-md">{cert}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                  
                  {activeRoadmap.projectIdeas?.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <BookOpen className="w-5 h-5 text-teal-500" /> Project Ideas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-sm list-disc list-inside text-muted-foreground">
                          {activeRoadmap.projectIdeas?.map((proj: string, i: number) => (
                            <li key={i}>{proj}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* ===================== SKILL GAP ANALYZER TAB ===================== */}
        <TabsContent value="skillgap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyze Skill Gap</CardTitle>
              <CardDescription>Compare your current skills against your target role or a specific job description.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAnalyzeSkillGap} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="sg-targetRole">Target Role *</Label>
                    <Input id="sg-targetRole" placeholder="e.g., Data Scientist" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sg-currentSkills">Your Current Skills *</Label>
                    <Input id="sg-currentSkills" placeholder="e.g., Python, SQL, Excel" value={currentSkills} onChange={(e) => setCurrentSkills(e.target.value)} required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sg-jobDescription">Specific Job Description (Optional but recommended)</Label>
                  <Textarea id="sg-jobDescription" placeholder="Paste the job description to get highly tailored skill gap analysis..." className="min-h-[120px]" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                </div>
                <Button type="submit" disabled={skillGapMutation.isPending} className="w-full sm:w-auto">
                  {skillGapMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Analyze Skill Gap
                </Button>
              </form>
            </CardContent>
          </Card>

          {activeSkillGap && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-1 border-primary/20 bg-primary/5 flex flex-col items-center justify-center p-6 text-center">
                  <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted/20" />
                      <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent"
                        strokeDasharray={351.8}
                        strokeDashoffset={351.8 - (351.8 * (activeSkillGap.overallReadiness || 0)) / 100}
                        className={activeSkillGap.overallReadiness >= 70 ? "text-green-500" : activeSkillGap.overallReadiness >= 40 ? "text-orange-500" : "text-red-500"}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">{activeSkillGap.overallReadiness}%</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold">Overall Readiness</h3>
                  <p className="text-sm text-muted-foreground mt-2">{activeSkillGap.summary}</p>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Skill Categories Readiness</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(activeSkillGap.skillCategories || {}).map(([category, data]: [string, any]) => (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-end">
                          <span className="text-sm font-semibold capitalize">{category} Skills</span>
                          <span className="text-sm font-medium">{data.score}%</span>
                        </div>
                        <Progress value={data.score} className="h-2" />
                        <div className="flex flex-wrap gap-1 mt-2">
                          {data.skills.map((s: string, i: number) => <span key={i} className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground">{s}</span>)}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Existing Relevent Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {activeSkillGap.existingSkills?.map((skill: any, i: number) => (
                        <li key={i} className="flex justify-between items-center border-b pb-2 last:border-0 text-sm">
                          <span className="font-medium">{skill.name}</span>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-[10px]">{skill.relevance} relevance</Badge>
                            <Badge variant="secondary" className="text-[10px]">{skill.proficiencyNeeded} needed</Badge>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-500 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" /> Missing Skills to Acquire
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {activeSkillGap.missingSkills?.map((skill: any, i: number) => (
                        <li key={i} className="text-sm border-b pb-3 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-bold">{skill.name}</span>
                            <Badge variant={skill.priority === 'critical' ? 'destructive' : 'secondary'} className="text-[10px] uppercase">
                              {skill.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">Est. Time: {skill.estimatedLearningTime}</p>
                          {skill.resources && skill.resources.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {skill.resources.map((r: string, idx: number) => (
                                <span key={idx} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{r}</span>
                              ))}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        {/* ===================== HISTORY TAB ===================== */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
              <CardDescription>Your previously generated roadmaps.</CardDescription>
            </CardHeader>
            <CardContent>
              {historyLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : history?.data?.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  <Map className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No roadmap history found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history?.data?.map((item: any) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => {
                        setActiveRoadmap(item.roadmapData || item);
                        setActiveTab("roadmap");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium flex items-center gap-2">
                          {item.currentRole || "Entry"} → {item.targetRole}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(item.createdAt), "MMM d, yyyy 'at' h:mm a")}
                        </span>
                      </div>
                      <Badge variant="secondary">{item.timeline || "N/A"}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
