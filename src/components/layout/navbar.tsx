"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { HiBars3, HiXMark, HiOutlineUser, HiOutlineSquares2X2, HiOutlineCog6Tooth, HiOutlineShieldCheck, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, fetchUser, isLoading } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    await fetchUser();
    router.push("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-primary/[0.03] backdrop-blur-xl border-primary/10 shadow-sm py-3"
          : (pathname.startsWith("/services/") && pathname !== "/services") || (pathname.startsWith("/blog/") && pathname !== "/blog")
            ? "bg-primary/[0.03] backdrop-blur-xl border-primary/10 shadow-sm py-5"
            : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:scale-105 transition-transform">
            <RiCompassDiscoverLine className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight">CareerPilot</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
                pathname === link.href ? "text-primary after:scale-x-100" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {isLoading ? (
            <div className="flex items-center gap-2 px-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className={cn(buttonVariants({ variant: "ghost" }), "relative h-10 w-10 rounded-full p-0")}>
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarImage src={user?.image || ""} alt={user?.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.name?.charAt(0) || <HiOutlineUser className="w-5 h-5" />}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
                {/* User Header */}
                <div className="p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/20 flex-shrink-0">
                      <AvatarImage src={user?.image || ""} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {user?.name?.charAt(0) || <HiOutlineUser className="w-5 h-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <p className="font-semibold text-sm truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      {user?.role === "ADMIN" && (
                        <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5 w-fit">
                          <HiOutlineShieldCheck className="w-2.5 h-2.5" /> Admin
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <div className="p-1">
                  <DropdownMenuItem className="rounded-lg cursor-pointer p-0">
                    <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 w-full">
                      <HiOutlineSquares2X2 className="w-4 h-4 text-muted-foreground" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg cursor-pointer p-0">
                    <Link href="/dashboard/settings" className="flex items-center gap-2.5 px-3 py-2 w-full">
                      <HiOutlineCog6Tooth className="w-4 h-4 text-muted-foreground" />
                      <span>Profile Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "ADMIN" && (
                    <DropdownMenuItem className="rounded-lg cursor-pointer p-0">
                      <Link href="/dashboard/admin/users" className="flex items-center gap-2.5 px-3 py-2 w-full">
                        <HiOutlineShieldCheck className="w-4 h-4 text-muted-foreground" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                </div>

                <DropdownMenuSeparator />

                <div className="p-1">
                  <DropdownMenuItem
                    className="rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 flex items-center gap-2.5 px-3 py-2"
                    onClick={handleLogout}
                  >
                    <HiOutlineArrowRightOnRectangle className="w-4 h-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
                Log in
              </Link>
              <Link href="/register" className={cn(buttonVariants({ variant: "default" }), "rounded-full shadow-lg shadow-primary/20")}>
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <HiXMark className="w-6 h-6" /> : <HiBars3 className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "p-3 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-border my-2" />
          {isLoading ? (
            <div className="flex justify-center p-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : isAuthenticated ? (
            <>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="p-3 text-sm font-medium rounded-lg hover:bg-muted">
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="p-3 text-sm font-medium text-destructive rounded-lg hover:bg-destructive/10 text-left"
              >
                Log out
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                Log in
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className={cn(buttonVariants({ variant: "default" }), "w-full")}>
                Get Started
              </Link>
            </div>
          )}
          <div className="flex justify-center mt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
