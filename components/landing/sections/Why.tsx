"use client";

import React from "react";
import Image from "next/image";

interface Reason {
  icon: string;
  title: string;
  description: string;
}

const FINANCIAL_REASONS: readonly Reason[] = [
  {
    icon: "/assets/clear_goals.png",
    title: "Set Clear Goals",
    description:
      "Define your financial targets and track progress in real-time with actionable insights.",
  },
  {
    icon: "/assets/top_ideas.png",
    title: "Make Smart Decisions",
    description:
      "Data-driven recommendations help you optimize spending and maximize savings potential.",
  },
  {
    icon: "/assets/secure_future.png",
    title: "Secure Your Future",
    description:
      "Build wealth systematically with automated tracking and comprehensive financial overview.",
  },
  {
    icon: "/assets/growth_factor.png",
    title: "Watch Growth",
    description:
      "Visualize your financial progress with beautiful charts and detailed analytics.",
  },
] as const;

export function WhyFinanceMatters() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-green-900 text-balance leading-tight">
            Why Financial Management Matters
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Taking control of your finances is one of the most important steps
            toward building wealth and achieving your dreams.
          </p>
        </header>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {FINANCIAL_REASONS.map((reason, index) => (
            <ReasonCard
              key={reason.title}
              reason={reason}
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ReasonCardProps {
  reason: Reason;
  priority?: boolean;
}

function ReasonCard({ reason, priority = false }: ReasonCardProps) {
  return (
    <article className="group relative overflow-hidden backdrop-blur-xl bg-white/80 border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50 transition-all duration-500 md:hover:shadow-2xl md:hover:shadow-primary/20 md:hover:border-primary/40 md:hover:-translate-y-1 p-8 min-h-[240px]">
      {/* Gradient Overlay - Always visible on mobile, only on hover for desktop */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      {/* Icon - Mobile: centered & large, Desktop: top-right small, grows on hover */}
      <div className="absolute top-1/2 -translate-y-1/2 right-8 w-40 h-40 rotate-6 scale-110 transition-all duration-700 ease-out md:top-8 md:translate-y-0 md:right-10 md:w-25 md:h-25 md:rotate-0 md:scale-100 md:group-hover:top-1/2 md:group-hover:-translate-y-1/2 md:group-hover:right-8 md:group-hover:w-48 md:group-hover:h-48 md:group-hover:scale-110 md:group-hover:rotate-6">
        {/* Glow Effect - Always visible on mobile, only on hover for desktop */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/15 rounded-xl blur-2xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700" />

        {/* Image */}
        <div className="relative w-full h-full">
          <Image
            src={reason.icon}
            alt={`${reason.title} icon`}
            width={1024}
            height={1024}
            className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-700"
            priority={priority}
            quality={75}
          />
        </div>
      </div>

      {/* Content Container - Mobile: padding for large image, Desktop: no padding initially, padding on hover */}
      <div className="relative z-10 pr-44 transition-all duration-700 md:pr-0 md:group-hover:pr-52">
        {/* Spacer for icon in normal state - Only on desktop */}
        <div className="hidden md:block h-20 mb-4 transition-all duration-700 md:group-hover:h-0 md:group-hover:mb-0" />

        {/* Text Content */}
        <div className="transition-all duration-700">
          {/* Title - Always primary color on mobile, transitions on desktop hover */}
          <h3 className="text-xl font-semibold text-green-900 mb-3 transition-colors duration-500 relative md:text-foreground md:group-hover:text-primary">
            {reason.title}
          </h3>

          {/* Description - Always prominent on mobile, transitions on desktop hover */}
          <p className="text-foreground/90 leading-relaxed transition-all duration-700 md:text-muted-foreground md:group-hover:text-foreground/90">
            {reason.description}
          </p>
        </div>
      </div>

      {/* Corner Accent - Always visible on mobile, only on hover for desktop */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shine Effect - Only on desktop hover */}
      <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 md:group-hover:left-full transition-all duration-1000 delay-100" />
      </div>
    </article>
  );
}
