"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Menu, User as UserIcon, Home } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isLoading && !isAuthenticated) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b bg-background/80 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Toggle */}
            <Sheet>
              <SheetTrigger render={
                <Button variant="ghost" size="icon" className="md:hidden" />
              }>
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <Sidebar className="border-r-0" />
              </SheetContent>
            </Sheet>

            <h1 className="font-semibold text-lg capitalize hidden sm:block">
              {pathname === "/dashboard" 
                ? "Overview" 
                : pathname.split("/").pop()?.replace(/-/g, " ")}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2 hidden sm:flex">
              <span className="text-sm font-medium leading-none">{user?.name}</span>
              <span className="text-xs text-muted-foreground mt-1 capitalize">{user?.role.toLowerCase()}</span>
            </div>
            <Avatar className="h-9 w-9 border">
              <AvatarImage src={user?.image || ""} alt={user?.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user?.name?.charAt(0) || <UserIcon className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-muted/10" data-lenis-prevent>
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
