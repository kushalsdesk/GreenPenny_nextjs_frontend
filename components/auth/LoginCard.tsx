"use client";

import Image from "next/image";
import type React from "react";
import { useState } from "react";

interface LoginCardProps {
  onLoginSuccess: () => void;
}

export function LoginCard({ onLoginSuccess }: LoginCardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    onLoginSuccess();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md animate-in fade-in duration-500">
        <div className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-3xl p-8 shadow-lg shadow-green-500/5">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3">
              <div className="relative w-150 h-fit backdrop-blur-md bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/logo.png"
                  alt="FinFlow Logo"
                  width={150}
                  height={150}
                  className="object-contain"
                  priority
                  quality={75}
                />
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Track your activity with grace
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 backdrop-blur-md bg-white/40 border border-white/40 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/50 focus:border-white/60 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/40 border border-white/40 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/50 focus:border-white/60 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 relative overflow-hidden backdrop-blur-md bg-gradient-to-br from-white/50 to-primary/5 border border-primary/30 rounded-xl py-3 px-6 font-medium text-primary hover:from-white/60 hover:to-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative flex flexflex-row justify-between items-center">
                <Image
                  src="/assets/signin.png"
                  alt="FinFlow Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                  priority
                  quality={75}
                />
                {isLoading ? "Signing in..." : "Sign In"}
              </span>
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-gradient-to-b from-primary to-transparent rounded-br-xl opacity-1" />
            </button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Do not have an account?{" "}
              <button className="text-primary hover:underline font-medium">
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
