"use client";

import { useRef } from "react";
import { Hero } from "./sections/Hero";
import { WhyFinanceMatters } from "./sections/Why";
import { Testimonials } from "./sections/Testimonials";
import { FinanceNews } from "./sections/FinanceNews";
import { Footer } from "./sections/Footer";
import { LandingNavbar } from "./LandingNavbar";
import { CurrencyFloats } from "./CurrencyFloats";

interface LandingPageProps {
  onGetStarted: () => void;
  isLoggedIn: boolean;
  onSignIn: () => void;
  onDashboard: () => void;
  onLogout: () => void;
}

export function LandingPage({
  onGetStarted,
  isLoggedIn,
  onSignIn,
  onDashboard,
  onLogout,
}: LandingPageProps) {
  const newsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full pt-20">
      <LandingNavbar
        isLoggedIn={isLoggedIn}
        onSignIn={onSignIn}
        onDashboard={onDashboard}
        onLogout={onLogout}
      />

      <Hero onGetStarted={onGetStarted} />
      <WhyFinanceMatters />
      <Testimonials />
      <FinanceNews ref={newsRef} />
      <Footer />
    </div>
  );
}
