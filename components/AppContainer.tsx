"use client";

import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { Dashboard } from "./dashboard/Dashboard";
import { LoginCard } from "./auth/LoginCard";
import { LandingPage } from "./landing/LandingPage";
import Image from "next/image";

const AppContainer = () => {
  const { isAuthenticated, isLoading, showLogin, setShowLogin, checkSession } =
    useAuthStore();

  const [initialCheckDone, setInitialCheckDone] = useState<boolean>(false);

  useEffect(() => {
    checkSession().finally(() => {
      setInitialCheckDone(true);
    });
  }, [checkSession]);

  if (!initialCheckDone || isLoading) {
    return (
      <div className="loading-container">
        <div className="text-center space-y-4">
          <div className="logo-spinner-container">
            <Image
              src="/assets/logo.png"
              alt="GreenPenny Logo"
              width={46}
              height={46}
              className="logo-spinner object-contain"
              priority
              quality={75}
            />
          </div>
          <p className="text-muted-foreground text-lg">Loading GreenPenny...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Dashboard />;
  }

  if (showLogin) {
    return <LoginCard />;
  }

  return <LandingPage onGetStarted={() => setShowLogin(true)} />;
};

export default AppContainer;
