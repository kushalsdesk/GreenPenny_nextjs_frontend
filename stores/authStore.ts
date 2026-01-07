import { create } from "zustand";
import { persist } from "zustand/middleware";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  showLogin: boolean;

  setShowLogin: (show: boolean) => void;
  clearError: () => void;

  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      //Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      showLogin: false,

      // UI actions
      setShowLogin: (show: boolean) => {
        set({ showLogin: show, error: null });
      },
      clearError: () => {
        set({ error: null });
      },

      //Signup
      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`${BACKEND_URL}/api/v1/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password, name }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "SignUp failed");
          }
          set({ isLoading: false, error: null });
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : "Signup Failed";
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      //Login
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`${BACKEND_URL}/api/v1/login`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Login failed");
          }

          await get().checkSession();
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : "Login Failed";
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      //Google Auth Login
      loginWithGoogle: () => {
        set({ error: null });
        window.location.href = `${BACKEND_URL}/api/v1/oauth`;
      },

      //check current session
      checkSession: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${BACKEND_URL}/api/v1/user`, {
            method: "GET",
            credentials: "include",
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Session checking failed");
          }

          set({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
            showLogin: false,
          });
        } catch (error: unknown) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      //logout
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${BACKEND_URL}/api/v1/logout`, {
            method: "GET",
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Logout failed");
          }

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            showLogin: false,
          });
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : "Logout Failed";
          set({ isLoading: false, error: message });
          throw error;
        }
      },
    }),
    {
      name: "green-plant-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
