import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import AppLayout from "@/components/layout/app-layout";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ScrollToTop } from "@/components/scroll-to-top";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareerPilot AI | Your Personal Career Coach",
  description: "AI-powered career coaching platform with resume analysis, interview preparation, and career roadmaps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <SmoothScrollProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </SmoothScrollProvider>
          <Toaster />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
