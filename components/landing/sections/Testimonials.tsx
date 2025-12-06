"use client";

import { useRef } from "react";

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Entrepreneur",
      content:
        "FinWallet completely changed how I manage my business finances. The insights are invaluable.",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Freelancer",
      content:
        "I finally understand where my money goes. The interface is so clean and easy to use.",
      avatar: "MC",
    },
    {
      name: "Emma Davis",
      role: "Investor",
      content:
        "Best financial tracking tool I've used. The charts and analytics are spot-on.",
      avatar: "ED",
    },
    {
      name: "David Wilson",
      role: "CEO",
      content:
        "FinWallet gives us the financial clarity we needed to scale our operations efficiently.",
      avatar: "DW",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How FinWallet Helped Others
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of users who've transformed their finances
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-96 backdrop-blur-xl bg-white/50 border border-white/50 rounded-2xl shadow-lg shadow-slate-300/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:border-primary/30 hover:bg-gradient-to-br hover:from-white/60 hover:to-primary/10 p-8 snap-center"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 backdrop-blur-md bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-full flex items-center justify-center text-sm font-bold text-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-foreground italic">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>

          {/* Carousel controls */}
          <div className="flex gap-2 md:gap-4 mt-8 justify-center flex-wrap">
            <button
              onClick={() => scroll("left")}
              className="backdrop-blur-md bg-white/40 border border-white/50 rounded-full p-3 text-foreground hover:bg-white/60 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              aria-label="Scroll left"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="backdrop-blur-md bg-white/40 border border-white/50 rounded-full p-3 text-foreground hover:bg-white/60 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              aria-label="Scroll right"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
