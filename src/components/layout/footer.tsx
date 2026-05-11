import Link from "next/link";
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope } from "react-icons/hi2";
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram } from "react-icons/fa6";
import { RiCompassDiscoverLine } from "react-icons/ri";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <RiCompassDiscoverLine className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">CareerPilot</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Your AI-powered career coach. Optimize your resume, ace your interviews, and chart a path to your dream job with advanced AI.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors p-2 bg-background rounded-full border border-border shadow-sm">
                <FaLinkedin className="w-4 h-4" />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors p-2 bg-background rounded-full border border-border shadow-sm">
                <FaTwitter className="w-4 h-4" />
              </Link>
              <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors p-2 bg-background rounded-full border border-border shadow-sm">
                <FaGithub className="w-4 h-4" />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors p-2 bg-background rounded-full border border-border shadow-sm">
                <FaInstagram className="w-4 h-4" />
              </Link>
            </div>
          </div>
          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">AI Career Tools</h3>
            <ul className="space-y-3">
              <li><Link href="/dashboard/resumes" className="text-sm text-muted-foreground hover:text-primary transition-colors">Resume Optimizer</Link></li>
              <li><Link href="/dashboard/resumes" className="text-sm text-muted-foreground hover:text-primary transition-colors">ATS Intelligence</Link></li>
              <li><Link href="/dashboard/interviews" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Mock Interviews</Link></li>
              <li><Link href="/dashboard/roadmaps" className="text-sm text-muted-foreground hover:text-primary transition-colors">Smart Roadmaps</Link></li>
              <li><Link href="/dashboard/chat" className="text-sm text-muted-foreground hover:text-primary transition-colors">Career AI Chat</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About CareerPilot</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Career Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Get in Touch</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy & Terms</Link></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiOutlineMapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Level-4, 34, Awal Centre, Banani, Dhaka</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">+880 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineEnvelope className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">support@careerpilot.ai</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CareerPilot AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
