"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
}

const features: Feature[] = [
  {
    id: 0,
    title: "AI-Powered Dashboard",
    description:
      "Real-time dashboard with AI-powered insights to understand your spending patterns instantly.",
    image: "/images/1.jpg",
    bgColor: "from-emerald-100 to-green-50",
    borderColor: "border-emerald-500",
    accentColor: "rgb(34, 197, 94)",
  },
  {
    id: 1,
    title: "Flexible Payment Support",
    description:
      "Support for multiple payment methods and seamless integration with your banking partners.",
    image: "/images/2.jpeg",
    bgColor: "from-teal-100 to-cyan-50",
    borderColor: "border-teal-600",
    accentColor: "rgb(13, 148, 136)",
  },
  {
    id: 2,
    title: "Smart Spending Tracking",
    description:
      "Advanced spending mapping and visualization to see exactly where your money goes.",
    image: "/images/3.jpg",
    bgColor: "from-lime-100 to-green-100",
    borderColor: "border-lime-500",
    accentColor: "rgb(132, 204, 22)",
  },
];

export function FeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);

  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutoPlayEnabled) return;

    const interval = setInterval(() => {
      setAnimationProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isAutoPlayEnabled]);

  useEffect(() => {
    if (animationProgress < 100) return;

    setActiveIndex((current) => (current + 1) % features.length);
    setAnimationProgress(0);
  }, [animationProgress]);

  const handleFeatureClick = (featureId: number) => {
    setActiveIndex(featureId);
    setAnimationProgress(0);
    setIsAutoPlayEnabled(false);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoPlayEnabled(true);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const activeFeature = features[activeIndex];

  return (
    <div className="space-y-12 sm:space-y-16">
      <div className="relative max-w-3xl sm:max-w-4xl lg:max-w-5xl mx-auto w-full">
        <div
          className="absolute inset-0 "
          style={{
            background: `conic-gradient(from 0deg, ${activeFeature.accentColor} 0%, ${activeFeature.accentColor} ${animationProgress}%, rgb(229, 231, 235) ${animationProgress}%, rgb(229, 231, 235) 100%)`,
            transition: "background 0.04s linear",
          }}
        />

        <div className="relative backdrop-blur-xl bg-white/80 border border-white/40  transition-all duration-300 shadow-2xl shadow-green-500/5">
          <div className="h-72 sm:h-96 md:h-112 lg:h-128 xl:h-144 rounded-[1.375rem] sm:rounded-[1.625rem] overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={activeFeature.image}
                alt={activeFeature.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.id}
            onClick={() => handleFeatureClick(feature.id)}
            className="group cursor-pointer transition-all duration-500"
          >
            <div
              className={`backdrop-blur-xl bg-white/60 rounded-2xl sm:rounded-3xl transition-all duration-300 p-6 sm:p-8 h-full ${
                activeIndex === feature.id
                  ? `border-2 ${feature.borderColor} shadow-lg`
                  : "border border-white/30 hover:border-white/50"
              }`}
            >
              <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">
                {feature.title}
              </h4>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
