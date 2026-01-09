"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CurrencyFloats } from "../CurrencyFloats";

export function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-green-50 via-white to-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Welcome Badge */}
          <div className="mb-6 sm:mb-8 inline-block">
            <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-full px-4 sm:px-6 py-2 sm:py-2.5">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-primary/90">
                Welcome to FinFlow
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 sm:mb-8 text-balance leading-tight px-2">
            Take Control of Your{" "}
            <span className="text-green-900">Financial Flow</span>
          </h1>

          {/* Currency Floats Animation */}
          <div className="my-8 sm:my-12 lg:my-16">
            <CurrencyFloats />
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-12 sm:mb-16 lg:mb-20 max-w-2xl mx-auto text-balance leading-relaxed px-4">
            Modern financial management should not be complex. FinFlow gives you
            clarity on your spending, growth, and financial goals with a
            beautiful, intuitive interface.
          </p>

          {/* Feature Cards */}
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {/* Dashboard Preview Card */}
            <div className="backdrop-blur-xl bg-white/40 border border-white/50 rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 p-6 sm:p-8 lg:p-10 max-w-2xl mx-auto">
              <div className="h-48 sm:h-56 lg:h-64 bg-linear-to-br from-primary/10 to-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <svg
                  className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 text-primary/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    strokeWidth={1}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground mt-4 sm:mt-6 text-sm sm:text-base">
                Real-time dashboard with AI-powered insights
              </p>
            </div>

            {/* Analytics Preview Card */}
            <div className="backdrop-blur-xl bg-white/40 border border-white/50 rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 p-6 sm:p-8 lg:p-10 max-w-2xl mx-auto">
              <div className="h-48 sm:h-56 lg:h-64 bg-linear-to-br from-primary/10 to-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <svg
                  className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 text-primary/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    strokeWidth={1}
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground mt-4 sm:mt-6 text-sm sm:text-base">
                Advanced analytics and spending patterns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Debit Card - Responsive Positioning */}
      <FloatingCard />
    </section>
  );
}

const FloatingCard = () => {
  return (
    <motion.div
      className="absolute -right-1/12 top-12 md:top-20 md:-right-20 lg:right-0 lg:top-1/4 lg:translate-y-1/3 pointer-events-none z-0"
      initial={{
        x: 200,
        opacity: 0,
        rotate: 10,
      }}
      animate={{
        x: 0,
        opacity: 1,
        rotate: -15,
      }}
      transition={{
        duration: 1.5,
        delay: 0.3,
        type: "spring",
        stiffness: 60,
        damping: 15,
      }}
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [15, 18, 15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-48 sm:w-80 lg:w-[400px] xl:w-[500px]"
      >
        <Image
          src="/assets/card_view.png"
          alt="Debit Card"
          width={1000}
          height={630}
          className="w-full h-auto drop-shadow-2xl"
          priority
          unoptimized
          quality={100}
        />
      </motion.div>
    </motion.div>
  );
};

