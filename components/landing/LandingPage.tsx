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
      <LandingNavbar />
      <main className="w-full pt-16 ">
        <Hero onGetStarted={onGetStarted} />
        <WhyFinanceMatters />
        <Testimonials />
        <FinanceNews ref={newsRef} />
        <Footer />
      </main>
    </div>
  );
}
