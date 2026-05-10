"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  ArrowLeft,
  Send,
  Loader2,
  CheckCircle,
  Clock,
  Users,
  Shield,
  Zap,
  Share2,
  Heart,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, use } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: () => api.get(`/services/${id}`),
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => api.get(`/reviews/service/${id}`),
  });

  const reviewMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post("/reviews", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Review submitted!");
      setComment("");
      setRating(5);
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
      queryClient.invalidateQueries({ queryKey: ["service", id] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to submit review");
    },
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to submit a review.");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a review.");
      return;
    }
    reviewMutation.mutate({ serviceId: id, rating, comment });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        {/* Skeleton Hero */}
        <div className="relative h-72 md:h-96">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="container max-w-6xl mx-auto px-4 -mt-20 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card className="p-8">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-6" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </Card>
            </div>
            <div>
              <Card className="p-6">
                <Skeleton className="h-10 w-32 mx-auto mb-4" />
                <Skeleton className="h-12 w-full mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const svc = service?.data;
  const reviewList = reviews?.data || [];
  const avgRating = svc?.rating || 0;
  const totalReviews = svc?.totalReviews || svc?._count?.reviews || 0;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviewList.filter((r: any) => r.rating === star).length;
    const percentage = reviewList.length > 0 ? (count / reviewList.length) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Hero Banner */}
      <div className="relative h-80 md:h-[28rem] overflow-hidden">
        {/* Background Layers */}
        {svc?.image ? (
          <img
            src={svc.image}
            alt={svc.title}
            className="w-full h-full object-cover scale-105"
          />
        ) : (
          <>
            {/* Rich gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/90 to-indigo-900" />

            {/* Decorative grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Animated floating shapes */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-16 right-[15%] w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
            />
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-28 right-[35%] w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 rotate-12"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-24 right-[10%] w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
            />
            <motion.div
              animate={{ y: [0, 12, 0], x: [0, -5, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-20 left-[8%] w-24 h-24 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 -rotate-6"
            />

            {/* Large service initial letter */}
            <div className="absolute right-[8%] top-1/2 -translate-y-1/2 select-none pointer-events-none">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[12rem] md:text-[16rem] font-black text-white/[0.04] leading-none"
              >
                {svc?.title?.charAt(0)}
              </motion.span>
            </div>

            {/* Radial glow */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-indigo-500/15 rounded-full blur-[100px]" />
          </>
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

        {/* Back Button */}
        <div className="absolute top-24 left-0 right-0 z-20">
          <div className="container max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm transition-all backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-full px-5 py-2.5 border border-white/20 shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Services
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Title on Hero */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 z-10">
          <div className="container max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl"
            >
              <Badge className="mb-4 bg-white/15 text-white border-white/25 backdrop-blur-md text-xs font-semibold uppercase tracking-wider px-3 py-1">
                {svc?.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">
                {svc?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-1.5 backdrop-blur-sm bg-white/10 rounded-full px-3 py-1.5 border border-white/15">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.round(avgRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-white/30"
                      )}
                    />
                  ))}
                  <span className="ml-1 font-semibold text-white">{avgRating.toFixed(1)}</span>
                </div>
                <span className="backdrop-blur-sm bg-white/10 rounded-full px-3 py-1.5 border border-white/15">
                  {totalReviews} reviews
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 -mt-6 relative z-10 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column — Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-4">About This Service</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {svc?.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Info Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Zap, label: "Instant Results", desc: "AI-Powered" },
                  { icon: Shield, label: "Data Secure", desc: "Encrypted" },
                  { icon: Clock, label: "24/7 Access", desc: "Anytime" },
                  { icon: Users, label: "10K+ Users", desc: "Trusted" },
                ].map((item, i) => (
                  <Card key={i} className="text-center p-4 hover:border-primary/30 transition-colors">
                    <item.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Features Card */}
            {svc?.features && svc.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      What&apos;s Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {svc.features.map((f: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-lg bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Reviews & Ratings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Rating Summary */}
                  <div className="flex flex-col md:flex-row gap-8 p-6 rounded-xl bg-muted/30 border border-border/50">
                    {/* Big Average */}
                    <div className="text-center md:text-left flex-shrink-0">
                      <div className="text-5xl font-bold text-primary">{avgRating.toFixed(1)}</div>
                      <div className="flex items-center gap-1 justify-center md:justify-start mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i < Math.round(avgRating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted"
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {totalReviews} total reviews
                      </p>
                    </div>
                    {/* Distribution Bars */}
                    <div className="flex-1 space-y-2">
                      {ratingDistribution.map((item) => (
                        <div key={item.star} className="flex items-center gap-3">
                          <span className="text-sm font-medium w-8 text-right">{item.star}★</span>
                          <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full transition-all duration-500"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-8">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review List */}
                  {reviewsLoading ? (
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <Skeleton key={i} className="h-28 w-full rounded-lg" />
                      ))}
                    </div>
                  ) : reviewList.length === 0 ? (
                    <div className="text-center py-10">
                      <Star className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                      <p className="text-muted-foreground font-medium">No reviews yet</p>
                      <p className="text-sm text-muted-foreground">Be the first to share your experience!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reviewList.map((review: any) => (
                        <div
                          key={review.id}
                          className="p-5 rounded-xl border border-border/50 bg-background hover:border-border transition-colors"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={review.user?.image} />
                                <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                                  {review.user?.name?.charAt(0) || "?"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-sm">
                                  {review.user?.name || "Anonymous"}
                                </p>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={cn(
                                        "w-3 h-3",
                                        i < review.rating
                                          ? "fill-amber-400 text-amber-400"
                                          : "text-muted"
                                      )}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(review.createdAt), "MMM d, yyyy")}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed pl-[52px]">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Write Review Form */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Write a Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitReview} className="space-y-5">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Your Rating</Label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoveredStar(star)}
                              onMouseLeave={() => setHoveredStar(0)}
                              className="p-1 transition-transform hover:scale-110"
                            >
                              <Star
                                className={cn(
                                  "w-8 h-8 cursor-pointer transition-colors",
                                  star <= (hoveredStar || rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted hover:text-amber-300"
                                )}
                              />
                            </button>
                          ))}
                          <span className="ml-3 self-center text-sm text-muted-foreground font-medium">
                            {rating === 1 && "Poor"}
                            {rating === 2 && "Fair"}
                            {rating === 3 && "Good"}
                            {rating === 4 && "Very Good"}
                            {rating === 5 && "Excellent"}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="comment" className="text-sm font-semibold">Your Review</Label>
                        <Textarea
                          id="comment"
                          placeholder="Share your experience with this service..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="min-h-[120px] resize-none"
                        />
                      </div>
                      <Button type="submit" disabled={reviewMutation.isPending} size="lg" className="rounded-full px-8">
                        {reviewMutation.isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        Submit Review
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Right Column — Sticky Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <Card className="sticky top-24 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-center text-primary-foreground">
                  <p className="text-2xl font-extrabold">Get Started</p>
                  <p className="text-sm opacity-80 mt-1">Access all AI-powered tools</p>
                </div>

                <CardContent className="p-6 space-y-5">
                  {/* CTA Button */}
                  <Link href={user ? "/dashboard" : "/login"} className="block">
                    <Button className="w-full rounded-full h-12 text-base font-semibold shadow-lg shadow-primary/20" size="lg">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Get Started Now
                    </Button>
                  </Link>

                  <Separator />

                  {/* Service Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                      Service Details
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: "Category", value: svc?.category },
                        { label: "Rating", value: `${avgRating.toFixed(1)} / 5.0` },
                        { label: "Reviews", value: `${totalReviews} reviews` },
                        { label: "Access", value: "Instant" },
                        { label: "Support", value: "24/7 AI" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full gap-2"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Link copied!");
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full gap-2"
                      onClick={() => toast.success("Added to favorites!")}
                    >
                      <Heart className="w-4 h-4" />
                      Save
                    </Button>
                  </div>

                  {/* Trust badges */}
                  <div className="pt-2 space-y-2">
                    {[
                      "✓ Secure & Encrypted",
                      "✓ AI-Powered Analysis",
                      "✓ Cancel Anytime",
                    ].map((badge, i) => (
                      <p key={i} className="text-xs text-muted-foreground text-center">
                        {badge}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
