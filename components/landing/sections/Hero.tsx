"use client";

import CurrencyFloats from "../CurrencyFloats";
import FloatingCard from "../FloatingCard";
import FeatureCarousel from "../FeatureCarousel";

export function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-green-50 via-white to-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6 sm:mb-8 inline-block">
            <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-full px-4 sm:px-6 py-2 sm:py-2.5">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-primary/90">
                Welcome to GreenPenny
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 sm:mb-8 text-balance leading-tight px-2">
            Take Control of{" "}
            <span className="text-green-900">Every Penny Spent</span>
          </h1>

          <div className="my-8 sm:my-12 lg:my-16">
            <CurrencyFloats />
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-12 sm:mb-16 lg:mb-20 max-w-2xl mx-auto text-balance leading-relaxed px-4">
            Modern financial management should not be complex. GreenPenny gives
            you clarity on your spending, growth, and financial goals with a
            beautiful, intuitive interface.
          </p>

          <FeatureCarousel />
        </div>
      </div>

      <FloatingCard />
    </section>
  );
}
