"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Get auth state and actions from Zustand store
  const { isAuthenticated, setShowLogin } = useAuthStore();

  const handleSignInClick = () => {
    setShowLogin(true);
    setIsOpen(false); // Close mobile menu after click
  };

  const handleDashboardClick = () => {
    // User is already logged in, AppContainer will automatically show Dashboard
    // We can just reload or let the AppContainer handle it
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/40 border-b border-white/50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="relative w-fit h-fit backdrop-blur-md bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src="/assets/logo.png"
              alt="FinFlow Logo"
              width={50}
              height={50}
              className="object-contain"
              priority
              quality={75}
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            // Show "Go to Dashboard" button when logged in
            <button
              onClick={handleDashboardClick}
              className="relative overflow-hidden backdrop-blur-md bg-gradient-to-br from-primary/50 to-primary/5 border border-primary/30 rounded-xl py-2 px-4 text-primary/90 font-bold text-md hover:from-white/60 hover:to-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Dashboard
              </span>
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-gradient-to-b from-primary to-transparent rounded-br-xl" />
            </button>
          ) : (
            // Show "Sign In" button when not logged in
            <button
              onClick={handleSignInClick}
              className="relative overflow-hidden backdrop-blur-md bg-gradient-to-br from-primary/50 to-primary/5 border border-primary/30 rounded-xl py-1 px-3 text-primary/90 font-bold text-md hover:from-white/60 hover:to-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Image
                  src="/assets/signin.png"
                  alt="Sign In"
                  width={35}
                  height={35}
                  className="object-contain"
                  priority
                  quality={75}
                />
                Get In
              </span>
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-gradient-to-b from-primary to-transparent rounded-br-xl" />
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden backdrop-blur-md rounded-full p-3 text-foreground hover:bg-white/60 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <div className="relative w-10 h-10 backdrop-blur-md bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg flex items-center justify-center overflow-hidden">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {isOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </div>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-40 backdrop-blur-2xl bg-linear-to-br from-green-900/50 to-primary/30 border-white/50 shadow-xl shadow-black/5 border-t md:hidden rounded-b-3xl ">
            <div className="flex flex-col gap-2 p-4">
              {isAuthenticated ? (
                // Show "Go to Dashboard" in mobile menu when logged in
                <button
                  onClick={() => {
                    handleDashboardClick();
                    setIsOpen(false);
                  }}
                  className="relative overflow-hidden backdrop-blur-sm bg-linear-to-br from-green-950/60 to-primary/20 border border-primary/30 rounded-xl py-3 px-4 text-primary/90 font-bold hover:from-white/60 hover:to-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 w-full"
                >
                  <span className="relative flex flex-row justify-between items-center text-white text-xl">
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="object-contain"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    Dashboard
                  </span>
                </button>
              ) : (
                // Show "Sign In" in mobile menu when not logged in
                <button
                  onClick={handleSignInClick}
                  className="relative overflow-hidden  backdrop-blur-lg bg-linear-to-br from-green-950/60 to-primary/20 border border-primary/30 rounded-xl py-3 px-4 text-primary/90 font-bold hover:from-white/60 hover:to-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 w-full"
                >
                  <span className="relative flex flex-row justify-between items-center text-white text-xl">
                    <Image
                      src="/assets/signin.png"
                      alt="Get In"
                      width={50}
                      height={50}
                      className="object-contain"
                      priority
                      quality={75}
                    />
                    Get In
                  </span>
                </button>
              )}

              {/* News Button (kept from original) */}
              <button className="relative overflow-hidden backdrop-blur-lg bg-linear-to-br from-green-950/60 to-primary/20 border border-primary/30 rounded-xl py-3 px-4 text-primary/90 font-bold hover:from-white/60 hover:to-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 w-full">
                <span className="relative flex flex-row justify-between items-center text-white text-xl">
                  <Image
                    src="/assets/sidebar.png"
                    alt="News"
                    width={50}
                    height={50}
                    className="object-contain"
                    priority
                    quality={75}
                  />
                  News
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
