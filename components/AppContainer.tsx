"use client";

import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import { LoginCard } from "./auth/LoginCard";
import { LandingPage } from "./landing/LandingPage";
import { EmailVerificationOverlay } from "./auth/EmailVerficationOverlay";
import { useToast } from "./auth/ToastProvider";
import Image from "next/image";

const AppContainer = () => {
  const {
    isAuthenticated,
    isLoading,
    showLogin,
    setShowLogin,
    checkSession,
    isVerifying,
    verificationEmail,
    clearVerifying,
  } = useAuthStore();

  const { showToast } = useToast();
  const [initialCheckDone, setInitialCheckDone] = useState<boolean>(false);

  useEffect(() => {
    // Check for auth status in URL params (from OAuth callback)
    const params = new URLSearchParams(window.location.search);
    const authStatus = params.get("auth");
    const errorMsg = params.get("error");

    if (authStatus === "success") {
      // Clear verification state if it exists
      clearVerifying();

      // Check session to update auth state
      checkSession().then(() => {
        showToast(
          "Welcome to GreenPenny!",
          "Your account has been verified successfully.",
          "success"
        );
        // Clean up URL
        window.history.replaceState({}, "", window.location.pathname);
        setInitialCheckDone(true);
      });
    } else if (authStatus === "failed") {
      showToast(
        "Authentication Failed",
        errorMsg ? decodeURIComponent(errorMsg) : "Something went wrong during authentication.",
        "error"
      );
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);
      setInitialCheckDone(true);
    } else {
      // Normal session check
      checkSession().finally(() => {
        setInitialCheckDone(true);
      });
    }
  }, [checkSession, clearVerifying, showToast]);

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

  // Show verification overlay if user is in verification state
  if (isVerifying && verificationEmail) {
    return (
      <>
        <LoginCard />
        <EmailVerificationOverlay
          email={verificationEmail}
          onClose={() => {
            clearVerifying();
          }}
        />
      </>
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
