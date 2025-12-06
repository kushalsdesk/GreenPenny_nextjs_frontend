"use client";

import { CurrencyFloats } from "../CurrencyFloats";

export function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-linear-to-br from-green-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 inline-block">
          <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-full px-4 py-2 mb-4">
            <span className="text-md font-medium text-primary/90">
              Welcome to FinFlow
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
          Take Control of Your{" "}
          <span className="text-primary">Financial Life</span>
        </h1>

        <CurrencyFloats />

        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
          Modern financial management should not be complex. FinWallet gives you
          clarity on your spending, growth, and financial goals with a
          beautiful, intuitive interface.
        </p>

        <div className="mt-20 backdrop-blur-xl bg-white/40 border border-white/50 rounded-3xl  transition-all duration-300 shadow-xl shadow-primary/20 p-8 max-w-2xl mx-auto">
          <div className="h-64 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
            <svg
              className="w-32 h-32 text-primary/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-muted-foreground mt-4 text-sm">
            Real-time dashboard with AI-powered insights
          </p>
        </div>

        <div className="mt-20 backdrop-blur-xl bg-white/40 border border-white/50 rounded-3xl  transition-all duration-300 shadow-xl shadow-primary/20 p-8 max-w-2xl mx-auto">
          <div className="h-64 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
            <svg
              className="w-32 h-32 text-primary/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-muted-foreground mt-4 text-sm">
            Real-time dashboard with AI-powered insights
          </p>
        </div>
      </div>
    </section>
  );
}
