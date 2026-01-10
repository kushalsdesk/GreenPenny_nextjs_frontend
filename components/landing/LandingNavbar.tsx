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
          <div className="glass-logo-container">
            <Image
              src="/assets/logo.png"
              alt="GreenPenny Logo"
              width={65}
              height={65}
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
              className="glass-button-primary py-1 px-3 text-white hover:text-primary font-bold text-md"
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
              <span className="accent-corner" />
            </button>
          ) : (
            // Show "Sign In" button when not logged in
            <button
              onClick={handleSignInClick}
              className="glass-button-primary py-1 px-3 text-primary hover:text-white font-bold text-md"
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
                <p>Get In</p>
              </span>
              <span className="accent-corner" />
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="menu-toggle-btn"
          aria-label="Toggle menu"
        >
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
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu absolute top-full left-0 right-0 z-40 md:hidden rounded-b-3xl">
            <div className="flex flex-col gap-2 p-4">
              {isAuthenticated ? (
                // Show "Go to Dashboard" in mobile menu when logged in
                <button
                  onClick={() => {
                    handleDashboardClick();
                    setIsOpen(false);
                  }}
                  className="menu-item w-full"
                >
                  <span className="menu-label-mobile">
                    <Image
                      src="/assets/dashboard.png"
                      alt="Get In"
                      width={50}
                      height={50}
                      className="object-contain"
                      priority
                      quality={75}
                    />
                    Dashboard
                  </span>
                </button>
              ) : (
                // Show "Sign In" in mobile menu when not logged in
                <button
                  onClick={handleSignInClick}
                  className="menu-item w-full"
                >
                  <span className="menu-label-mobile">
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
              <button className="menu-item w-full">
                <span className="menu-label-mobile">
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
