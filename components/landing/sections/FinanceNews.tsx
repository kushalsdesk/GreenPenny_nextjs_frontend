"use client";

import { forwardRef, useState } from "react";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "5 Financial Habits of Millionaires",
    excerpt:
      "Learn the proven strategies that wealthy individuals use to build and maintain their wealth over time.",
    category: "Finance",
    date: "Nov 7, 2025",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "The Impact of Inflation on Your Savings",
    excerpt:
      "Understanding how inflation affects your purchasing power and what you can do to protect your savings.",
    category: "Economics",
    date: "Nov 6, 2025",
    readTime: "4 min read",
  },
  {
    id: "3",
    title: "Smart Investment Strategies for 2025",
    excerpt:
      "Expert insights on how to optimize your investment portfolio for the upcoming year.",
    category: "Investment",
    date: "Nov 5, 2025",
    readTime: "6 min read",
  },
];

export const FinanceNews = forwardRef<HTMLDivElement>(
  function FinanceNews(props, ref) {
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
      null,
    );

    return (
      <section ref={ref} className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">
              Finance News & Insights
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay informed with the latest financial tips and market updates
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
              <button
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="
                  backdrop-blur-xl bg-white/50 border rounded-2xl
                  shadow-lg shadow-slate-300/10 transition-all duration-300
                  p-6 text-left cursor-pointer group

                  /* DEFAULT (mobile + tablet) active effects */
                  border-white/30
                  bg-linear-to-br from-white/60 to-primary/10

                  /* Desktop hover effects */
                  hover:shadow-xl hover:shadow-primary/25
                  hover:border-primary/30
                  hover:bg-linear-to-br
                  hover:from-white/60 hover:to-primary/10
                "
              >
                <div className="mb-4">
                  <span className="inline-block backdrop-blur-md bg-white/30 border border-white/40 rounded-full px-3 py-1 text-xs font-semibold text-primary">
                    {article.category}
                  </span>
                </div>

                <h3
                  className="text-lg font-semibold  mb-3
                    group-hover:text-primary transition-colors
                    text-green-900   /* default mobile behavior */
                  "
                >
                  {article.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4">
                  {article.excerpt}
                </p>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Article Modal */}
          {selectedArticle && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedArticle(null)}
            >
              <div
                className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-3xl max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block backdrop-blur-md bg-white/30 border border-white/40 rounded-full px-3 py-1 text-xs font-semibold text-primary mb-4">
                      {selectedArticle.category}
                    </span>
                    <h2 className="text-3xl font-bold text-foreground">
                      {selectedArticle.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-2xl"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className="flex gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-white/20">
                  <span>{selectedArticle.date}</span>
                  <span>â€¢</span>
                  <span>{selectedArticle.readTime}</span>
                </div>

                <p className="text-lg text-foreground leading-relaxed">
                  {selectedArticle.excerpt}
                </p>

                <div className="mt-8 p-6 backdrop-blur-md bg-white/30 border border-white/40 rounded-xl">
                  <p className="text-muted-foreground">
                    Full article content would appear here. This is a preview of
                    the FinWallet news system.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  },
);
