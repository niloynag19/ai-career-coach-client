"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Send, Bot, User, MessageSquare, Plus, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { format } from "date-fns";

export default function AIChatPage() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [message, setMessage] = useState("");
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: sessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ["chat-sessions"],
    queryFn: () => api.get("/ai/chat-sessions"),
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["chat-messages", activeSessionId],
    queryFn: () => api.get(`/ai/chat-sessions/${activeSessionId}/messages`),
    enabled: !!activeSessionId,
  });

  // Local state for optimistic UI updates during send
  const [localMessages, setLocalMessages] = useState<any[]>([]);

  useEffect(() => {
    if (messages?.data) {
      setLocalMessages(messages.data);
      scrollToBottom();
    } else {
      setLocalMessages([]);
    }
  }, [messages?.data]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  const chatMutation = useMutation({
    mutationFn: async (data: { message: string; sessionId?: string }) => {
      const response = await api.post("/ai/chat", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (!activeSessionId) {
        setActiveSessionId(data.sessionId);
        queryClient.invalidateQueries({ queryKey: ["chat-sessions"] });
      } else {
        // Add AI response to local messages
        setLocalMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
        scrollToBottom();
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to send message");
      // Remove the optimistic user message if failed
      setLocalMessages((prev) => prev.slice(0, -1));
    },
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || chatMutation.isPending) return;

    const currentMessage = message;
    setMessage("");

    // Optimistic UI update
    setLocalMessages((prev) => [
      ...prev,
      { role: "user", content: currentMessage },
    ]);
    scrollToBottom();

    chatMutation.mutate({
      message: currentMessage,
      sessionId: activeSessionId || undefined,
    });
  };

  const startNewSession = () => {
    setActiveSessionId(null);
    setLocalMessages([]);
    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-4 w-full max-w-6xl mx-auto overflow-hidden">
      {/* Sidebar - Sessions */}
      <Card className="w-1/3 hidden md:flex flex-col overflow-hidden bg-muted/20 border-r-0 rounded-r-none">
        <div className="p-4 border-b">
          <Button onClick={startNewSession} className="w-full justify-start" variant="secondary">
            <Plus className="w-4 h-4 mr-2" />
            New Conversation
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-3" data-lenis-prevent="true">
          {sessionsLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : sessions?.data?.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-sm">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p>No previous conversations.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {sessions?.data?.map((session: any) => (
                <div
                  key={session.id}
                  onClick={() => setActiveSessionId(session.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    activeSessionId === session.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <p className="font-medium text-sm truncate">{session.title || "New Conversation"}</p>
                  <p className={`text-xs mt-1 ${activeSessionId === session.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {format(new Date(session.updatedAt), "MMM d, h:mm a")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden border-l-0 md:rounded-l-none rounded-xl relative">
        <div className="p-4 border-b bg-card z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary">
                <Bot className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg leading-none">CareerPilot Coach</h2>
              <p className="text-xs text-muted-foreground mt-1">AI Career Advisor</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={startNewSession}>
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        <div 
          className="flex-1 overflow-y-auto p-4 space-y-6 bg-muted/10"
          ref={scrollRef}
          data-lenis-prevent="true"
        >
          {localMessages.length === 0 && !chatMutation.isPending && !messagesLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">How can I help your career today?</h3>
              <p className="text-muted-foreground">
                Ask me about resume tips, interview preparation, salary negotiation, or general career guidance.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["Review my resume", "Prepare for a technical interview", "How to ask for a raise?"].map((suggestion, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setMessage(suggestion);
                    }}
                    className="rounded-full"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {localMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-4 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    {msg.role === "user" ? (
                      <>
                        <AvatarImage src={user?.image} />
                        <AvatarFallback className="bg-secondary text-secondary-foreground"><User className="w-4 h-4" /></AvatarFallback>
                      </>
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-4 h-4" /></AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-card border rounded-tl-sm shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {chatMutation.isPending && (
                <div className="flex gap-4 max-w-[85%] mr-auto">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-4 h-4" /></AvatarFallback>
                  </Avatar>
                  <div className="p-4 rounded-2xl bg-card border rounded-tl-sm shadow-sm flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-4 bg-card border-t z-10">
          <form onSubmit={handleSend} className="relative flex items-center max-w-4xl mx-auto">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="pr-12 py-6 rounded-full bg-muted/50 border-primary/20 focus-visible:ring-primary/30"
              disabled={chatMutation.isPending}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1.5 rounded-full w-9 h-9"
              disabled={!message.trim() || chatMutation.isPending}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">CareerPilot AI Coach can make mistakes. Consider verifying important information.</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
