"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy & Terms</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are committed to protecting your personal information and your right to privacy. Here's a transparent overview of how we handle your data.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Section 1 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-card border shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We collect personal information that you voluntarily provide to us when you register on the CareerPilot AI platform, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-foreground">Personal Details:</strong> Names, phone numbers, email addresses, mailing addresses, usernames, and passwords.</li>
                <li><strong className="text-foreground">Professional Data:</strong> Resumes, employment history, education, and career preferences used for AI analysis.</li>
                <li><strong className="text-foreground">Payment Data:</strong> We may collect data necessary to process your payment if you make purchases.</li>
              </ul>
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-card border shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent. Specifically, we use your data to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide our AI-driven resume analysis and coaching features.</li>
                <li>Facilitate account creation and authentication and otherwise manage user accounts.</li>
                <li>Send administrative information to you, such as updates to terms, conditions, and policies.</li>
                <li>Protect our Services (e.g., fraud monitoring and prevention).</li>
              </ul>
            </div>
          </motion.section>

          {/* Section 3 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-card border shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">3. Terms of Service</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                By accessing and using CareerPilot AI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
              <p>
                Our AI-driven recommendations are provided "as is" and should be used as supplementary guidance in your career journey. While we strive for high accuracy using advanced LLMs, we cannot guarantee specific employment outcomes.
              </p>
              <p className="pt-4 border-t mt-4 text-sm">
                Last updated: May 10, 2026. For any privacy-related inquiries, please contact us at <a href="mailto:privacy@careerpilot.com" className="text-primary hover:underline">privacy@careerpilot.com</a>.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
