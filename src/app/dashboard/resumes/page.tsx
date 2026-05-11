"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FileText, Upload, CheckCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default function ResumesPage() {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [activeAnalysis, setActiveAnalysis] = useState<any>(null);
  const [activeAts, setActiveAts] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("analyzer");

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["resumes-history"],
    queryFn: () => api.get("/ai/resumes"),
  });

  const analyzeMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await api.post("/ai/resume-analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Resume analyzed successfully!");
      setActiveAnalysis(data);
      setActiveTab("analyzer");
      queryClient.invalidateQueries({ queryKey: ["resumes-history"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to analyze resume");
    },
  });

  const atsMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await api.post("/ai/ats-score", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("ATS Score checked successfully!");
      setActiveAts(data);
      setActiveTab("ats");
      queryClient.invalidateQueries({ queryKey: ["resumes-history"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to check ATS score");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Only PDF files are allowed");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a resume PDF to analyze");
      return;
    }
    const formData = new FormData();
    formData.append("resume", file);
    if (targetRole) {
      formData.append("targetRole", targetRole);
    }
    analyzeMutation.mutate(formData);
  };

  const handleATSCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a resume PDF");
      return;
    }
    if (!jobDescription) {
      toast.error("Job description is required for ATS check");
      return;
    }
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);
    atsMutation.mutate(formData);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resume & ATS Tools</h1>
        <p className="text-muted-foreground mt-2">
          Upload your resume and get AI-powered feedback to land your dream job.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl mb-8">
          <TabsTrigger value="analyzer">Resume Analyzer</TabsTrigger>
          <TabsTrigger value="ats">ATS Checker</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="analyzer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyze Resume</CardTitle>
              <CardDescription>
                Get detailed feedback on your resume's structure, content, and impact.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAnalyze} className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="resume">Upload Resume (PDF only)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    {file && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="targetRole">Target Role (Optional)</Label>
                  <Input
                    id="targetRole"
                    placeholder="e.g., Senior Frontend Developer"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Adding a target role helps tailor the feedback.
                  </p>
                </div>
                <Button type="submit" disabled={analyzeMutation.isPending || !file} className="w-full sm:w-auto">
                  {analyzeMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Analyze Resume
                </Button>
              </form>
            </CardContent>
          </Card>

          {activeAnalysis && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Overall Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">{activeAnalysis.overallScore}/100</p>
                      <p className="text-sm text-muted-foreground">Resume Score</p>
                    </div>
                    <Progress value={activeAnalysis.overallScore} className="w-1/2 h-4" />
                  </div>
                  <p className="text-muted-foreground">{activeAnalysis.summary}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {activeAnalysis.strengths?.map((str: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-500 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Areas to Improve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {activeAnalysis.improvements?.map((imp: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="ats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ATS Score Checker</CardTitle>
              <CardDescription>
                See how well your resume matches a specific job description.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleATSCheck} className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="ats-resume">Upload Resume (PDF only)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="ats-resume"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    {file && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste the full job description here..."
                    className="min-h-[150px]"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={atsMutation.isPending || !file || !jobDescription} className="w-full sm:w-auto">
                  {atsMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Calculate ATS Score
                </Button>
              </form>
            </CardContent>
          </Card>

          {activeAts && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-muted/20" />
                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent"
                          strokeDasharray={440}
                          strokeDashoffset={440 - (440 * ((activeAts.atsScore || 0))) / 100}
                          className="text-primary transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold">{(activeAts.atsScore || 0)}%</span>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Match</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Match Summary</h3>
                      <p className="text-muted-foreground">{activeAts.overallFeedback}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Matched Keywords</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {activeAts.matchedKeywords?.length ? (
                    activeAts.matchedKeywords.map((kw: string, i: number) => (
                      <Badge key={i} variant="secondary" className="bg-green-500/10 text-green-600 hover:bg-green-500/20">{kw}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No matching keywords found.</span>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Missing Keywords</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {activeAts.missingKeywords?.length ? (
                    activeAts.missingKeywords.map((kw: string, i: number) => (
                      <Badge key={i} variant="secondary" className="bg-destructive/10 text-destructive hover:bg-destructive/20">{kw}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">Great job! No major keywords missing.</span>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
              <CardDescription>Your previous resume analyses and ATS checks.</CardDescription>
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
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No resume history found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history?.data?.map((item: any) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => {
                        const status = item.status?.toUpperCase();
                        if (status === "ANALYZED") {
                          setActiveAnalysis(item.analysis || item);
                          setActiveTab("analyzer");
                        } else {
                          setActiveAts(item.analysis || item);
                          setActiveTab("ats");
                        }
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium flex items-center gap-2">
                          {item.fileName}
                          <Badge variant="outline" className="text-[10px] uppercase">
                            {item.status.replace("-", " ")}
                          </Badge>
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(item.createdAt), "MMM d, yyyy 'at' h:mm a")}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold">
                          {item.atsScore || item.analysis?.overallScore || item.analysis?.atsScore || 0}%
                        </span>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Score</p>
                      </div>
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
