"use client";

import { useState } from "react";
import { LoginCard } from "@/components/auth/LoginCard";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { LandingPage } from "@/components/landing/LandingPage";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(false);
  };

  if (!showLogin && !isLoggedIn) {
    return (
      <LandingPage
        onGetStarted={() => setShowLogin(true)}
        isLoggedIn={isLoggedIn}
        onSignIn={() => setShowLogin(true)}
        onDashboard={() => {
          /* navigate to dashboard */
        }}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-slate-50">
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <LoginCard onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </main>
  );
}
