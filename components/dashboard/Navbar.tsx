"use client";

import Image from "next/image";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="sticky top-0  mx-4 sm:mx-6 mt-4 rounded-xl sm:rounded-2xl backdrop-blur-lg bg-linear-to-br from-primary/20 to-primary/10 border-white/50 shadow-xl shadow-black/5 p-3 sm:p-4 flex items-center justify-between z-20">
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-white/30 rounded-lg transition-colors border border-white/20 hover:border-white/40"
          aria-label="Toggle menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground sm:w-6 sm:h-6"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Title */}
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
          Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 sm:gap-3">
        {/* Notifications Button */}
        <button
          className="p-2 sm:p-2.5 hover:bg-white/30 rounded-lg transition-colors border border-white/20 hover:border-white/40"
          aria-label="Notifications"
        >
          <div className="relative w-10 h-10 backdrop-blur-md bg-linear-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src="/assets/notifications.png"
              alt="User Logo"
              width={30}
              height={30}
              className="object-contain"
              priority
              quality={75}
            />
          </div>
          {/*<svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground sm:w-5 sm:h-5"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>*/}
        </button>

        {/* Settings Button - Hidden on mobile */}
        <button
          className=" sm:flex p-2.5 hover:bg-white/30 rounded-lg transition-colors border border-white/20 hover:border-white/40"
          aria-label="Settings"
        >
          <div className="relative w-10 h-10 backdrop-blur-md bg-linear-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src="/assets/avatar.png"
              alt="User Logo"
              width={30}
              height={30}
              className="object-contain"
              priority
              quality={75}
            />
          </div>
        </button>

        {/* User Avatar */}
      </div>
    </nav>
  );
}
