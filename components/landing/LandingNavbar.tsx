"use client";

import { useState } from "react";
import Image from "next/image";

interface LandingNavbarProps {
  isLoggedIn: boolean;
  onSignIn: () => void;
  onDashboard: () => void;
  onLogout: () => void;
}

export function LandingNavbar({
  isLoggedIn,
  onSignIn,
  onDashboard,
  onLogout,
}: LandingNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/40 border-b border-white/50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
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
          <span className="text-xl font-bold text-foreground">Finflowww</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={onDashboard}
                className="backdrop-blur-md bg-white/30 border border-white/40 rounded-xl py-2 px-4 font-medium text-foreground hover:bg-white/40 hover:border-white/50 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/30 hover:bg-gradient-to-br hover:from-white/40 hover:to-primary/5 transition-all duration-300 text-sm"
              >
                Dashboard
              </button>
              <button
                onClick={onLogout}
                className="backdrop-blur-md bg-white/40 border border-white/50 rounded-full p-3 text-foreground hover:bg-white/60 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 text-sm px-4 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onSignIn}
              className="relative overflow-hidden backdrop-blur-md bg-gradient-to-br from-primary/50 to-primary/5 border border-primary/30 rounded-xl py-1 px-3 text-primary/90 font-bold text-md hover:from-white/60 hover:to-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              {/*<div className="relative w-fit h-fit backdrop-blur-md bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg flex items-center justify-center overflow-hidden">*/}
              <Image
                src="/assets/signin.png"
                alt="FinFlow Logo"
                width={50}
                height={50}
                className="object-contain"
                priority
                quality={75}
              />
              {/*</div>*/}
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
          <div className="absolute top-full left-0 right-0 backdrop-blur-2xl bg-white/50 border-t border-white/60 md:hidden rounded-b-3xl shadow-lg">
            <div className="flex flex-col gap-2 p-4">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      onDashboard();
                      setIsOpen(false);
                    }}
                    className="backdrop-blur-md bg-white/30 border border-white/40 rounded-xl py-3 px-4 font-medium text-foreground hover:bg-white/40 hover:border-white/50 transition-all duration-300 w-full text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="backdrop-blur-sm bg-white/40 border border-white/50 rounded-xl py-3 px-4 text-foreground hover:bg-white/60 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onSignIn();
                    setIsOpen(false);
                  }}
                  className="relative overflow-hidden backdrop-blur-sm opacity-95 bg-gradient-to-br from-primary/40 to-primary/20 border border-primary/30 rounded-xl py-3 px-4 text-primary/90 font-bold hover:from-white/60 hover:to-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 w-full"
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
                    {"Sign In"}
                  </span>
                  <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-linear-to-b from-primary to-transparent rounded-br-xl" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
