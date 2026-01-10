"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type React from "react";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export function LoginCard() {
  // Local form state (UI only)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  // Auth store
  const {
    login,
    signup,
    loginWithGoogle,
    isLoading,
    error,
    clearError,
    setShowLogin,
    checkSession,
  } = useAuthStore();

  // Clear error when switching between login/signup
  useEffect(() => {
    clearError();
  }, [isSignupMode, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);
    clearError();

    try {
      if (isSignupMode) {
        await signup(email, password, name);
        await checkSession();
        setIsSignupMode(false);
        setName("");
        setPassword("");
      } else {
        await login(email, password);
        // If true, AppContainer will handle navigation to Dashboard
      }
    } catch (err) {
      // Error is already set in store
      console.error("Auth error:", err);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    clearError();
    loginWithGoogle();
  };

  const toggleMode = () => {
    setIsSignupMode(!isSignupMode);
    setName("");
    setPassword("");
    setEmail("");
    clearError();
  };

  const handleBackToLanding = () => {
    setShowLogin(false);
    clearError();
  };

  const isFormLoading = isLoading || localLoading;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      {/* Floating Debit Card - Responsive Positioning */}
      <FloatingCard />
      <div className="w-full max-w-md animate-in fade-in duration-500">
        <div className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-3xl p-8 shadow-md drop-shadow-2xl shadow-primary">
          {/* Back button */}
          <button
            onClick={handleBackToLanding}
            className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3">
              <div className="relative w-150 h-fit backdrop-blur-md bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/logo.png"
                  alt="GreenPenny Logo"
                  width={150}
                  height={200}
                  className="object-contain"
                  priority
                  quality={75}
                />
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-2">
              {isSignupMode
                ? "Create your account"
                : "Track your activity with grace"}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field - only in signup mode */}
            {isSignupMode && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/40 border border-white/40 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/50 focus:border-white/60 transition-all"
                  required
                />
              </div>
            )}

            {/* Email field */}
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

            {/* Password field */}
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
                  minLength={8}
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

            {/* Submit button */}
            <button
              type="submit"
              disabled={isFormLoading}
              className="w-full mt-6 relative overflow-hidden backdrop-blur-md bg-linear-to-br from-white/50 to-primary/5 border border-primary/30 rounded-xl py-3 px-6 font-medium text-primary hover:from-white/60 hover:to-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative flex flex-row justify-between items-center">
                <Image
                  src={
                    isSignupMode ? "/assets/signup.png" : "/assets/signin.png"
                  }
                  alt="Sign In Icon"
                  width={50}
                  height={50}
                  className="object-contain"
                  priority
                  quality={75}
                />
                {isFormLoading
                  ? isSignupMode
                    ? "Creating account..."
                    : "Signing in..."
                  : isSignupMode
                    ? "Create Account"
                    : "Sign In"}
              </span>
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-gradient-to-b from-primary to-transparent rounded-br-xl opacity-1" />
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/40" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/50 text-muted-foreground">
                  OR
                </span>
              </div>
            </div>

            {/* Google OAuth button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isFormLoading}
              className="max-w-fit mx-auto mt-6 relative flex flex-row justify-center items-center overflow-hidden backdrop-blur-md bg-gradient-to-br from-white/50 to-primary/5 border border-primary/30 rounded-xl py-3 px-6 font-medium text-primary hover:from-white/60 hover:to-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Toggle between login/signup */}
            <p className="text-center text-lg text-muted-foreground mt-4">
              {isSignupMode
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-primary hover:underline font-medium"
              >
                {isSignupMode ? "Sign in" : "Sign up"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
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
