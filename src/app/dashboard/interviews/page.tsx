"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Briefcase, Loader2, MessageSquare, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export default function InterviewsPage() {
  const queryClient = useQueryClient();
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [activeInterview, setActiveInterview] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, any>>({});
  const [evaluatingId, setEvaluatingId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("practice");

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["interviews-history"],
    queryFn: () => api.get("/ai/interviews"),
  });

  const generateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post("/ai/interview-generate", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Interview questions generated!");
      setActiveInterview(data);
      setActiveTab("practice");
      setAnswers({});
      setFeedback({});
      queryClient.invalidateQueries({ queryKey: ["interviews-history"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to generate interview");
    },
  });

  const evaluateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post("/ai/interview-feedback", data);
      return { id: data.questionId, feedback: response.data };
    },
    onSuccess: ({ id, feedback: data }) => {
      toast.success("Answer evaluated!");
      setFeedback((prev) => ({ ...prev, [id]: data }));
      setEvaluatingId(null);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to evaluate answer");
      setEvaluatingId(null);
    },
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      toast.error("Target role is required");
      return;
    }
    generateMutation.mutate({ role, company, difficulty, count: 5 });
  };

  const handleEvaluate = (q: any) => {
    const answer = answers[q.id];
    if (!answer || answer.trim().length < 20) {
      toast.error("Please provide a more detailed answer (at least 20 characters) to get meaningful feedback.");
      return;
    }
    setEvaluatingId(q.id);
    evaluateMutation.mutate({
      questionId: q.id,
      question: q.question,
      answer: answer,
      role: activeInterview.role,
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Interview Prep</h1>
        <p className="text-muted-foreground mt-2">
          Generate realistic interview questions and get real-time feedback on your answers.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
          <TabsTrigger value="practice">Practice Area</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="practice" className="space-y-6">
          {!activeInterview ? (
            <Card>
              <CardHeader>
                <CardTitle>Generate New Interview</CardTitle>
                <CardDescription>Configure your target role and difficulty to start practicing.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerate} className="space-y-6 max-w-xl">
                  <div className="grid gap-2">
                    <Label htmlFor="role">Target Role *</Label>
                    <Input
                      id="role"
                      placeholder="e.g., Full Stack Engineer"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company">Target Company (Optional)</Label>
                    <Input
                      id="company"
                      placeholder="e.g., Google"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select value={difficulty} onValueChange={(val) => setDifficulty(val || "medium")}>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy / Junior</SelectItem>
                        <SelectItem value="medium">Medium / Mid-Level</SelectItem>
                        <SelectItem value="hard">Hard / Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" disabled={generateMutation.isPending} className="w-full sm:w-auto">
                    {generateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Start Interview
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-primary" />
                    {activeInterview.role} {activeInterview.company && activeInterview.company !== "General" ? `at ${activeInterview.company}` : ""}
                  </h2>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="capitalize">{activeInterview.difficulty}</Badge>
                    <Badge variant="secondary">{Array.isArray(activeInterview.questions) ? activeInterview.questions.length : 0} Questions</Badge>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setActiveInterview(null)}>Start New Session</Button>
              </div>

              {activeInterview.generalTips && activeInterview.generalTips?.length > 0 && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      General Tips for this Role
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                      {activeInterview.generalTips?.map((tip: string, i: number) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-8">
                {Array.isArray(activeInterview.questions) && activeInterview.questions.map((q: any, index: number) => (
                  <Card key={q.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/30 border-b">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-primary font-semibold tracking-wide uppercase">Question {index + 1}</p>
                          <CardTitle className="text-lg leading-tight">{q.question}</CardTitle>
                        </div>
                        <Badge variant={q.difficulty === 'hard' ? 'destructive' : q.difficulty === 'easy' ? 'secondary' : 'default'} className="capitalize shrink-0">
                          {q.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Category: <span className="capitalize">{q.category}</span></p>
                    </CardHeader>
                    
                    <CardContent className="pt-6 space-y-4">
                      {!feedback[q.id] ? (
                        <>
                          <div className="grid gap-2">
                            <Label htmlFor={`answer-${q.id}`}>Your Answer</Label>
                            <Textarea
                              id={`answer-${q.id}`}
                              placeholder="Type your detailed answer here as if you were speaking to the interviewer..."
                              className="min-h-[150px] resize-y"
                              value={answers[q.id] || ""}
                              onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                            />
                          </div>
                          <Button 
                            onClick={() => handleEvaluate(q)} 
                            disabled={evaluatingId === q.id || !answers[q.id]}
                          >
                            {evaluatingId === q.id ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <MessageSquare className="w-4 h-4 mr-2" />}
                            Evaluate Answer
                          </Button>
                        </>
                      ) : (
                        <div className="space-y-6">
                          <div className="p-4 bg-muted/50 rounded-lg border">
                            <p className="text-sm font-medium mb-2 text-muted-foreground">Your Answer:</p>
                            <p className="text-sm">{answers[q.id]}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${feedback[q.id].score >= 80 ? 'bg-green-100 text-green-700' : feedback[q.id].score >= 60 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                                  <span className="text-lg font-bold">{feedback[q.id].score}</span>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Score</h4>
                                  <p className="text-xs text-muted-foreground">Out of 100</p>
                                </div>
                              </div>
                              <p className="text-sm">{feedback[q.id].feedback}</p>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-semibold flex items-center gap-2 mb-2 text-green-600">
                                  <CheckCircle2 className="w-4 h-4" /> Strengths
                                </h4>
                                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                                  {feedback[q.id].strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold flex items-center gap-2 mb-2 text-orange-500">
                                  <AlertCircle className="w-4 h-4" /> Areas to Improve
                                </h4>
                                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                                  {feedback[q.id].improvements.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <h4 className="text-sm font-semibold text-primary mb-2">Ideal Answer Example:</h4>
                            <p className="text-sm text-muted-foreground">{feedback[q.id].sampleAnswer}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
              <CardDescription>Your previous interview practice sessions.</CardDescription>
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
                  <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No interview history found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history?.data?.map((item: any) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => {
                        // The history item stores the full interview object in the 'questions' field
                        const interviewData = item.questions && typeof item.questions === "object" ? item.questions : item;
                        setActiveInterview(interviewData);
                        setActiveTab("practice");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium flex items-center gap-2">
                          {item.role} {item.company ? `at ${item.company}` : ""}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(item.createdAt), "MMM d, yyyy 'at' h:mm a")}
                        </span>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <Badge variant="outline" className="capitalize">{item.difficulty}</Badge>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
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
