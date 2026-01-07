"use client";

import { useRef } from "react";
import { Hero } from "./sections/Hero";
import { WhyFinanceMatters } from "./sections/Why";
import { Testimonials } from "./sections/Testimonials";
import { FinanceNews } from "./sections/FinanceNews";
import { Footer } from "./sections/Footer";
import { LandingNavbar } from "./LandingNavbar";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const newsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Navbar - Fixed with proper z-index */}
      <LandingNavbar />

      {/* Main Content - Proper spacing for fixed navbar */}
      <main className="w-full pt-16 sm:pt-20">
        {/* Hero Section */}
        <Hero onGetStarted={onGetStarted} />

        {/* Why Finance Matters Section */}
        <WhyFinanceMatters />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Finance News Section */}
        <FinanceNews ref={newsRef} />

        {/* Footer Section */}
        <Footer />
      </main>
    </div>
  );
}
