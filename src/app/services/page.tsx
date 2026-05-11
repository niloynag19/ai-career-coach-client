"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Search, SlidersHorizontal, ChevronLeft, ChevronRight, X, Filter, FileText, Bot, MessageSquare, Map, Target, BarChart3, Briefcase, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useCallback, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const ITEMS_PER_PAGE = 6;

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";

  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search, 500); // 500ms debounce
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Sync with URL params if they change
  useEffect(() => {
    if (initialSearch && initialSearch !== search) {
      setSearch(initialSearch);
    }
    if (initialCategory && initialCategory !== category) {
      setCategory(initialCategory);
    }
  }, [initialSearch, initialCategory]);

  const { data: servicesResponse, isLoading } = useQuery({
    queryKey: ["services", debouncedSearch, category, sortBy, page],
    queryFn: () =>
      api.get("/services", {
        params: {
          search: debouncedSearch || undefined,
          category: category !== "all" ? category : undefined,
          sortBy,
          page,
          limit: ITEMS_PER_PAGE,
        },
      }),
  });

  const { data: categories } = useQuery({
    queryKey: ["service-categories"],
    queryFn: () => api.get("/services/categories"),
  });

  const { data: statsResponse } = useQuery({
    queryKey: ["public-stats"],
    queryFn: () => api.get("/users/public-stats"),
  });

  const stats = statsResponse?.data;
  const services = servicesResponse?.data?.data || servicesResponse?.data || [];
  const meta = servicesResponse?.data?.meta || { page: 1, totalPages: 1, total: 0 };

  // Reset to page 1 when filters change
  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleCategoryChange = useCallback((val: string) => {
    setCategory(val);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((val: string) => {
    setSortBy(val);
    setPage(1);
  }, []);

  const clearAllFilters = () => {
    setSearch("");
    setCategory("all");
    setSortBy("newest");
    setPage(1);
  };

  const hasActiveFilters = search || category !== "all" || sortBy !== "newest";

  // Pagination helpers
  const totalPages = meta.totalPages || 1;
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
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

  // Map category to icon + gradient
  const categoryMeta: Record<string, { icon: any; gradient: string; bg: string }> = {
    RESUME:    { icon: FileText,      gradient: "from-blue-500 to-blue-700",    bg: "bg-blue-500/10" },
    COACHING:  { icon: Bot,           gradient: "from-purple-500 to-purple-700", bg: "bg-purple-500/10" },
    INTERVIEW: { icon: MessageSquare, gradient: "from-pink-500 to-rose-600",    bg: "bg-pink-500/10" },
    ROADMAP:   { icon: Map,           gradient: "from-amber-500 to-orange-600", bg: "bg-amber-500/10" },
    ATS:       { icon: Target,        gradient: "from-emerald-500 to-teal-600", bg: "bg-emerald-500/10" },
    SKILLS:    { icon: BarChart3,     gradient: "from-rose-500 to-red-600",     bg: "bg-rose-500/10" },
    JOB:       { icon: Briefcase,     gradient: "from-cyan-500 to-sky-600",     bg: "bg-cyan-500/10" },
    DEFAULT:   { icon: Zap,           gradient: "from-primary to-primary/70",   bg: "bg-primary/10" },
  };

  const getCategoryMeta = (category: string) => {
    const key = Object.keys(categoryMeta).find(k => category?.toUpperCase().includes(k));
    return categoryMeta[key || "DEFAULT"];
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
        
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6"
          >
            <Zap className="w-3 h-3 fill-primary" />
            AI-Powered Career Services
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
          >
            Empower Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Career Journey</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Explore our suite of AI-powered career tools designed to help you land your dream job with real data-driven insights.
          </motion.p>

          {/* Live Platform Stats — Replacing demo data with Dashboard-style stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-4 md:gap-12 mb-12"
          >
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-foreground">
                {stats?.totalUsers ? stats.totalUsers.toLocaleString() : "1,200"}+
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Active Users</span>
            </div>
            <div className="w-px h-10 bg-border hidden md:block" />
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-foreground">
                {stats?.totalResumes ? stats.totalResumes.toLocaleString() : "3,500"}+
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Resumes Analyzed</span>
            </div>
            <div className="w-px h-10 bg-border hidden md:block" />
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-foreground">
                {stats?.totalInterviews ? stats.totalInterviews.toLocaleString() : "850"}+
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Mock Interviews</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Filters */}
      <div className="container mx-auto px-4 -mt-6 relative z-10 max-w-6xl">
        <Card className="p-4 md:p-6">
          {/* Primary Filters Row */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                className="pl-10"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <Select value={category} onValueChange={(val) => handleCategoryChange(val || "all")}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.data?.map((cat: string) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(val) => handleSortChange(val || "newest")}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-primary-foreground" />
              )}
            </Button>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-border/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Results Per Page */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">Results Info</Label>
                      <p className="text-sm text-muted-foreground">
                        Showing <span className="font-semibold text-foreground">{services.length}</span> of{" "}
                        <span className="font-semibold text-foreground">{meta.total || 0}</span> services
                      </p>
                      {meta.total > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Page {meta.page} of {totalPages}
                        </p>
                      )}
                    </div>

                    {/* Clear Filters */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">Actions</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        disabled={!hasActiveFilters}
                        className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-4 h-4" />
                        Clear All Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
              {search && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  Search: &quot;{search}&quot;
                  <button onClick={() => handleSearchChange("")} className="ml-1 hover:bg-muted rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {category !== "all" && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  Category: {category}
                  <button onClick={() => handleCategoryChange("all")} className="ml-1 hover:bg-muted rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {sortBy !== "newest" && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  Sort: {sortBy === "rating" ? "Highest Rated" : "Newest"}
                  <button onClick={() => handleSortChange("newest")} className="ml-1 hover:bg-muted rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Service Grid */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : services?.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-semibold mb-2">No services found</h3>
            <p className="mb-6">Try adjusting your search or filters.</p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearAllFilters} className="gap-2">
                <X className="w-4 h-4" /> Clear All Filters
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services?.map((service: any, idx: number) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="group overflow-hidden h-full flex flex-col hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                    {/* Card Media Area */}
                    <div className="relative h-44 overflow-hidden bg-muted flex items-center justify-center">
                      {service.image ? (
                        <div className="absolute inset-0">
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ) : (
                        <div className={cn(
                          "absolute inset-0 bg-gradient-to-br flex items-center justify-center",
                          getCategoryMeta(service.category).gradient
                        )}>
                          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                          {/* Large initial letter */}
                          <span className="absolute right-4 bottom-2 text-[6rem] font-black text-white/10 leading-none select-none">
                            {service.title?.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      {/* Frosted Icon Overlay (Always show icon for branding, or only on fallback? Let's show on top of image for a premium look) */}
                      {(() => { const Icon = getCategoryMeta(service.category).icon; return (
                        <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      ); })()}
                      
                      <Badge className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border-white/10 text-white text-[10px] py-0 px-2 h-5">
                        {service.category}
                      </Badge>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>

                    </CardHeader>

                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                    </CardContent>

                    <CardFooter className="flex justify-between items-center pt-0 border-t border-border/50 mt-2">
                      <div />
                      <Link
                        href={`/services/${service.id}`}
                        className={cn(buttonVariants({ size: "sm" }), "rounded-full gap-1.5")}
                      >
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum, idx) =>
                    pageNum === "..." ? (
                      <span key={`dots-${idx}`} className="px-2 text-muted-foreground">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(pageNum as number)}
                        className={cn(
                          "w-9 h-9 p-0",
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
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading services...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
