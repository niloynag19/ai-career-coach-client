"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Eye, Clock, User, Tag, ExternalLink } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { use } from "react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => api.get(`/blogs/${slug}`),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-muted/10">
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="h-72 w-full rounded-xl mb-8" />
          <div className="grid lg:grid-cols-[1fr_320px] gap-10">
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const post = blog?.data;
  const readingTime = Math.max(1, Math.ceil((post?.content?.length || 0) / 1200));

  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderLine = (line: string, idx: number) => {
    const trimmed = line.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("## ")) {
      return <h2 key={idx} className="text-2xl font-bold mt-10 mb-4 text-foreground">{trimmed.replace("## ", "")}</h2>;
    }
    if (trimmed.startsWith("### ")) {
      return <h3 key={idx} className="text-xl font-semibold mt-8 mb-3 text-foreground">{trimmed.replace("### ", "")}</h3>;
    }
    if (trimmed.startsWith("- [ ] ")) {
      return (
        <div key={idx} className="flex items-start gap-3 my-2 p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
          <div className="w-5 h-5 rounded border border-primary/40 flex-shrink-0 mt-0.5 bg-background shadow-sm" />
          <span className="text-muted-foreground leading-snug text-sm">{trimmed.replace("- [ ] ", "")}</span>
        </div>
      );
    }
    if (trimmed.startsWith("- [x] ") || trimmed.startsWith("- [X] ")) {
      return (
        <div key={idx} className="flex items-start gap-3 my-2 p-3 rounded-lg border border-primary/20 bg-primary/5">
          <div className="w-5 h-5 rounded border border-primary bg-primary flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-muted-foreground line-through opacity-80 leading-snug text-sm">{trimmed.replace(/- \[x\] /i, "")}</span>
        </div>
      );
    }
    if (trimmed.startsWith("- ")) {
      return (
        <div key={idx} className="flex items-start gap-3 my-2 ml-1">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0 mt-2" />
          <span className="text-muted-foreground leading-relaxed">{trimmed.replace("- ", "")}</span>
        </div>
      );
    }
    return <p key={idx} className="mb-5 text-muted-foreground leading-relaxed">{renderText(trimmed)}</p>;
  };

  return (
    <div className="min-h-screen bg-muted/10">
      {/* Cover Image */}
      {post?.coverImage && (
        <div className="relative h-80 md:h-[28rem] overflow-hidden">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        </div>
      )}

      <div className="container max-w-6xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 items-start">

          {/* LEFT — Main Content */}
          <article>
            {/* Tags */}
            {post?.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag: string, i: number) => (
                  <Badge key={i} variant="secondary">{tag}</Badge>
                ))}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 leading-tight">
              {post?.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
              {post?.author && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {post.author.name?.charAt(0)}
                  </div>
                  <span className="font-medium text-foreground">{post.author.name}</span>
                </div>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post?.createdAt ? format(new Date(post.createdAt), "MMMM d, yyyy") : ""}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readingTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                {post?.views || 0} views
              </span>
            </div>

            {/* Content */}
            <div className="prose dark:prose-invert max-w-none">
              {post?.content?.split("\n").map((line: string, idx: number) => renderLine(line, idx))}
            </div>

            <Separator className="my-10" />

            {/* Footer CTA */}
            <div className="text-center py-8 px-6 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border">
              <h3 className="text-2xl font-bold mb-3">Ready to supercharge your career?</h3>
              <p className="text-muted-foreground mb-6">Try our AI-powered tools for free — no credit card required.</p>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
              >
                Get Started Free
              </Link>
            </div>
          </article>

          {/* RIGHT — Sticky Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24">

            {/* Author Card */}
            {post?.author && (
              <Card>
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Author
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                      {post.author.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">{post.author.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Post Stats */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Article Info</p>
                {[
                  { icon: Calendar, label: "Published", value: post?.createdAt ? format(new Date(post.createdAt), "MMM d, yyyy") : "—" },
                  { icon: Clock, label: "Reading Time", value: `${readingTime} min` },
                  { icon: Eye, label: "Views", value: post?.views || 0 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <item.icon className="w-3.5 h-3.5" /> {item.label}
                    </span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tags */}
            {post?.tags && post.tags.length > 0 && (
              <Card>
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string, i: number) => (
                      <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
              <CardContent className="p-5 text-center">
                <p className="font-bold text-lg mb-1">Try CareerPilot AI</p>
                <p className="text-sm opacity-80 mb-4">Land your dream job with AI-powered tools.</p>
                <Link href="/register" className="inline-flex items-center gap-1.5 bg-white text-primary rounded-full px-5 py-2 text-sm font-semibold hover:bg-white/90 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> Get Started
                </Link>
              </CardContent>
            </Card>

          </aside>
        </div>
      </div>
    </div>
  );
}
