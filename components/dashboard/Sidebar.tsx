"use client";

import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface MenuItem {
  icon: string;
  label: string;
  active: boolean;
}

const menuItems: MenuItem[] = [
  { icon: "dashboard", label: "Dashboard", active: true },
  { icon: "transactions", label: "Transactions", active: false },
  { icon: "insights", label: "Insights", active: false },
  { icon: "settings", label: "Settings", active: false },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { logout, clearError } = useAuthStore();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      // if true logout, AppContainer will detect isAuthenticated=false
    } catch (error) {
      console.error("Logout failed:", error);
      // Optional: Show error toast/alert
      alert("Failed to logout. Please try again.");
    }
  };
  return (
    <>
      {/* Desktop Sidebar - Always visible on md+ */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col bg-linear-to-br from-primary/20 to-primary/10 border-r border-white/40 shadow-xl shadow-black/5 z-40">
        <div className="p-6 flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-12 h-12 backdrop-blur-md bg-linear-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg flex items-center justify-center overflow-hidden">
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

          {/* Navigation Menu */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`group w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  item.active
                    ? "bg-white/30 border border-white/40 text-foreground font-medium shadow-sm"
                    : "text-foreground hover:bg-white/20 hover:border hover:border-white/30 hover:shadow-sm"
                }`}
              >
                {/* Icon Image */}

                <div className="relative w-10 h-10 backdrop-blur-md bg-linear-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg flex justify-center items-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={`/assets/${item.icon}.png`}
                    alt={`${item.label} icon`}
                    width={30}
                    height={30}
                    className="object-fit"
                    quality={70}
                  />
                </div>

                {/* Label */}
                <span className="flex-1 text-left text-sm lg:text-base">
                  {item.label}
                </span>
                {/* Active Indicator */}
                {item.active && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-red-50/30 transition-all duration-300 font-medium border border-red-200/30 hover:border-red-200/50 hover:shadow-sm"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className="text-sm lg:text-base">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar - Slides in from left */}
      <aside
        className={`md:hidden fixed left-0 top-0 h-screen w-64 flex-col backdrop-blur-md bg-linear-to-br from-primary/20 to-white/50 border-r border-white/40 shadow-xl shadow-black/5 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Logo Section with Close Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex justify-center items-center gap-3">
              <div className="relative w-12 h-12 backdrop-blur-md bg-linear-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/logo.png"
                  alt="FinFlow Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                  quality={90}
                />
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={onToggle}
                className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  item.active
                    ? "bg-white/30 border border-white/40 text-foreground font-medium shadow-sm"
                    : "text-foreground hover:bg-white/20 hover:border hover:border-white/30 hover:shadow-sm"
                }`}
              >
                {/* Icon Image */}
                <div className="relative w-10 h-10 flex items-center backdrop-blur-md bg-linear-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={`/assets/${item.icon}.png`}
                    alt={`${item.label} icon`}
                    width={30}
                    height={30}
                    className="object-contain"
                    quality={70}
                  />
                </div>

                {/* Label */}
                <span className="flex-1 text-left">{item.label}</span>

                {/* Active Indicator */}
                {item.active && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/30 shadow-sm text-destructive hover:bg-red-50/30 transition-all duration-300 font-medium border border-red-200/30 hover:border-red-200/50 hover:shadow-sm"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
