"use client";

import { HeroSection } from "@/components/home/hero-section";
import { TrustBadgesSection } from "@/components/home/trust-badges-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { StatsSection } from "@/components/home/stats-section";
import { AudienceSection } from "@/components/home/audience-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustBadgesSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <AudienceSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
