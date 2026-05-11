"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { 
  HiBars3, 
  HiOutlineSquares2X2, 
  HiOutlineUsers, 
  HiOutlineDocumentText, 
  HiOutlineBriefcase, 
  HiOutlineCog6Tooth, 
  HiOutlineArrowRightOnRectangle,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMap
} from "react-icons/hi2";
import { RiCompassDiscoverLine, RiRobot2Line } from "react-icons/ri";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();

  const handleLogout = async () => {
    await authClient.signOut();
    await fetchUser();
    router.push("/");
  };

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: HiOutlineSquares2X2 },
    { name: "My Resumes", href: "/dashboard/resumes", icon: HiOutlineDocumentText },
    { name: "Interviews", href: "/dashboard/interviews", icon: HiOutlineBriefcase },
    { name: "Career Roadmap", href: "/dashboard/roadmaps", icon: HiOutlineMap },
    { name: "AI Coach", href: "/dashboard/chat", icon: RiRobot2Line },
    { name: "Profile", href: "/dashboard/settings", icon: HiOutlineCog6Tooth },
  ];

  const adminItems = [
    { name: "Manage Users", href: "/dashboard/admin/users", icon: HiOutlineUsers },
    { name: "Manage Services", href: "/dashboard/admin/services", icon: HiOutlineBriefcase },
    { name: "Manage Blogs", href: "/dashboard/admin/blogs", icon: HiOutlineDocumentText },
    { name: "Inbox", href: "/dashboard/admin/inbox", icon: HiOutlineChatBubbleLeftRight },
  ];

  return (
    <div className={cn("flex flex-col h-full bg-muted/30 border-r", className)}>
      <div className="p-6 border-b">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:scale-105 transition-transform">
            <RiCompassDiscoverLine className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight">CareerPilot</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider px-2">Menu</p>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard")
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {user?.role === "ADMIN" && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider px-2">Admin Panel</p>
            <nav className="space-y-1">
              {adminItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    pathname.startsWith(item.href)
                      ? "bg-secondary text-secondary-foreground shadow-sm shadow-secondary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      <div className="p-4 border-t flex items-center justify-between">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <HiOutlineArrowRightOnRectangle className="w-4 h-4" />
          Logout
        </button>
        <div className="ml-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
