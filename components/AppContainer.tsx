"use client";

import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { Dashboard } from "./dashboard/Dashboard";
import { LoginCard } from "./auth/LoginCard";
import { LandingPage } from "./landing/LandingPage";
import Image from "next/image";

const AppContainer = () => {
  const {
    isAuthenticated,
    isLoading,
    showLogin,
    setShowLogin,
    checkSession,
    error: authError,
  } = useAuthStore();

  interface OAuthStatus {
    type: "success" | "failed" | null;
    message?: string;
  }

  const [initialCheckDone, setInitialCheckDone] = useState<boolean>(false);
  const [oauthStatus, setOauthStatus] = useState<OAuthStatus>({ type: null });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authStatus = params.get("auth");
    const errMsg = params.get("error");

    if (authStatus === "success") {
      setOauthStatus({ type: "success" });
      checkSession().then(() => {
        window.history.replaceState({}, "", window.location.pathname);
        setInitialCheckDone(true);
      });
    } else if (authStatus === "failed") {
      setOauthStatus({
        type: "failed",
        message: errMsg
          ? decodeURIComponent(errMsg)
          : "OAuth authentication failed",
      });
      window.history.replaceState({}, "", window.location.pathname);
      setInitialCheckDone(true);
    } else {
      checkSession().finally(() => {
        setInitialCheckDone(true);
      });
    }
  }, [checkSession]);

  useEffect(() => {
    if (oauthStatus.type === "failed" && oauthStatus.message) {
      alert(`Login failed: ${oauthStatus.message}`);
      setOauthStatus({ type: null });
    }
  }, [oauthStatus]);

  if (!initialCheckDone || isLoading) {
    return (
      <div className="loading-container">
        <div className="text-center space-y-4">
          <div className="logo-spinner-container">
            <Image
              src="/assets/logo.png"
              alt="GreenPenny Logo"
              width={86}
              height={86}
              className="logo-spinner object-contain"
              priority
              quality={90}
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
