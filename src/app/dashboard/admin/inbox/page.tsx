"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Trash2, Mail, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminInboxPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-contacts", page],
    queryFn: async () => {
      const res = await api.get(`/contacts?page=${page}&limit=${limit}`);
      return res as any;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await api.delete(`/contacts/${id}`);
      toast.success("Message deleted");
      refetch();
    } catch (error: any) {
      toast.error("Failed to delete message");
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await api.patch(`/contacts/${id}`, { status: "read" });
      toast.success("Marked as read");
      refetch();
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) {
    return (
      <Card className="border-border/50 shadow-sm animate-in fade-in">
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>Manage contact requests and support messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const messages = data?.data || [];
  const meta = data?.meta || { totalPages: 1, page: 1 };

  const totalPages = meta.totalPages || 1;
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inbox</h2>
          <p className="text-muted-foreground">Contact requests and support messages.</p>
        </div>
      </div>

      <Card className="border-border/50 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardContent className="p-0">
          <div className="rounded-md border-0 bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead>Sender</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((msg: any) => (
                  <TableRow key={msg.id} className={msg.status === "unread" ? "bg-primary/5" : ""}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className={`font-medium ${msg.status === "unread" ? "text-foreground" : "text-muted-foreground"}`}>
                          {msg.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{msg.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className={msg.status === "unread" ? "font-medium" : "text-muted-foreground"}>
                      {msg.subject}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={msg.status === "unread" ? "default" : "secondary"}>
                        {msg.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {msg.status === "unread" && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-primary hover:bg-primary/10 hover:text-primary"
                            onClick={() => handleMarkRead(msg.id)}
                            title="Mark as read"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        )}
                        <Dialog>
                          <DialogTrigger render={
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" />
                          }>
                            <Mail className="h-4 w-4" />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{msg.subject}</DialogTitle>
                              <DialogDescription>From: {msg.name} ({msg.email})</DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 p-4 bg-muted/30 rounded-lg text-sm border whitespace-pre-wrap">
                              {msg.message}
                            </div>
                            <div className="flex justify-end mt-4">
                              {msg.status === "unread" && (
                                <Button onClick={() => handleMarkRead(msg.id)}>Mark as Read</Button>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDelete(msg.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {messages.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      Inbox is empty.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t bg-muted/20">
              <p className="text-sm text-muted-foreground order-2 sm:order-1">
                Showing <span className="font-medium text-foreground">{messages.length}</span> of{" "}
                <span className="font-medium text-foreground">{meta.total || 0}</span> messages
                <span className="mx-2">•</span>
                Page {page} of {totalPages}
              </p>
              
              <div className="flex items-center gap-1.5 order-1 sm:order-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum, idx) =>
                    pageNum === "..." ? (
                      <span key={`dots-${idx}`} className="px-1 text-muted-foreground">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(pageNum as number)}
                        className={cn(
                          "h-8 w-8 p-0 text-xs",
                          page === pageNum && "pointer-events-none"
                        )}
                      >
                        {pageNum}
                      </Button>
                    )
                  )}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
