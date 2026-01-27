
"use client";

import React from "react";
import { useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

interface ConnectedAccount {
  id: number;
  bank: string;
  type: string;
  accountNumber: string;
  balance: number;
}

interface LoginActivity {
  device: string;
  location: string;
  time: string;
}

interface Preferences {
  emailNotifications: boolean;
  weeklyInsights: boolean;
  pushNotifications: boolean;
  monthlyReports: boolean;
  currency: string;
  dateFormat: string;
  firstDayOfWeek: string;
  theme: "light" | "dark";
}

const mockUserProfile: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "JD",
};

const mockAccounts: ConnectedAccount[] = [
  {
    id: 1,
    bank: "Chase",
    type: "Checking",
    accountNumber: "****1234",
    balance: 12458.5,
  },
  {
    id: 2,
    bank: "Bank of America",
    type: "Savings",
    accountNumber: "****5678",
    balance: 45230.0,
  },
];

const mockLoginActivity: LoginActivity[] = [
  { device: "Chrome on Mac", location: "New York, US", time: "2 hours ago" },
  { device: "Safari on iPhone", location: "New York, US", time: "Yesterday" },
  { device: "Chrome on Mac", location: "New York, US", time: "3 days ago" },
];

const Settings = () => {
  const [profile, setProfile] = useState(mockUserProfile);
  const [preferences, setPreferences] = useState<Preferences>({
    emailNotifications: true,
    weeklyInsights: true,
    pushNotifications: false,
    monthlyReports: true,
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    firstDayOfWeek: "Sunday",
    theme: "light",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [editingProfileName, setEditingProfileName] = useState(false);

  const handleProfileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, name: e.target.value });
  };

  const handleSaveProfile = () => {
    console.log("[Settings] Profile saved:", profile);
    setEditingProfileName(false);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("[Settings] Password updated");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    alert("Password updated successfully");
  };

  const handleToggle = (key: keyof Preferences) => {
    const newPrefs = { ...preferences, [key]: !preferences[key] };
    setPreferences(newPrefs);
    console.log("[Settings] Preference toggled:", key, newPrefs[key]);
  };

  const handlePreferenceChange = (key: keyof Preferences, value: string) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    console.log("[Settings] Preference changed:", key, value);
  };

  const handleExportData = () => {
    const mockData = {
      profile,
      accounts: mockAccounts,
      preferences,
      exportDate: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(mockData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `greenpenny-export-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    console.log("[Settings] Data exported");
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === "DELETE") {
      setDeleteModalOpen(false);
      setDeleteConfirmation("");
      console.log("[Settings] Account deletion confirmed");
      alert("Account deletion initiated. You will be logged out.");
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <div className="glass-card-glow p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6">
            Profile Settings
          </h2>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-lg border-2 border-primary/40 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-3xl font-bold text-primary">
                  {profile.avatar}
                </span>
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={handleProfileNameChange}
                  disabled={!editingProfileName}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-muted-foreground cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed for security reasons
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                {!editingProfileName ? (
                  <button
                    onClick={() => setEditingProfileName(true)}
                    className="px-6 py-3 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl text-foreground hover:bg-white/70 hover:shadow-md transition-all font-medium"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all font-medium"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setProfile(mockUserProfile);
                        setEditingProfileName(false);
                      }}
                      className="px-6 py-3 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl text-foreground hover:bg-white/70 transition-all font-medium"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card-glow p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6">
            Connected Accounts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {mockAccounts.map((account) => (
              <div
                key={account.id}
                className="backdrop-blur-lg bg-white/40 border border-white/50 rounded-2xl p-5 hover:bg-white/50 hover:border-white/70 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 flex items-center justify-center shadow-md">
                    <span className="text-xl font-bold text-primary">
                      {account.bank[0]}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => console.log("Edit account", account.id)}
                      className="p-2.5 hover:bg-white/40 rounded-lg transition-all border border-white/30 hover:border-white/50 hover:shadow-sm group"
                      aria-label="Edit account"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-foreground group-hover:text-primary transition-colors"
                      >
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => console.log("Delete account", account.id)}
                      className="p-2.5 hover:bg-red-50/40 rounded-lg transition-all border border-white/30 hover:border-red-300/50 hover:shadow-sm group"
                      aria-label="Delete account"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-foreground group-hover:text-destructive transition-colors"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-foreground text-lg mb-1">
                    {account.bank}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    {account.type}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4 font-mono">
                    {account.accountNumber}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    $
                    {account.balance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={() => console.log("Open Add Account Modal")}
              className="backdrop-blur-lg bg-white/30 border-2 border-dashed border-primary/50 rounded-2xl p-5 hover:bg-white/40 hover:border-primary/70 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[240px] group"
            >
              <div className="p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-primary/30 group-hover:bg-white/40 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-foreground mb-1">
                  Add New Account
                </p>
                <p className="text-xs text-muted-foreground">
                  Connect up to 3 accounts
                </p>
              </div>
            </button>
          </div>
        </div>

        <div className="glass-card-glow p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-8">
            Security Settings
          </h2>

          <div className="space-y-6 pb-8 border-b border-white/20">
            <h3 className="text-base font-semibold text-foreground">
              Change Password
            </h3>

            <form onSubmit={handleUpdatePassword} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-3 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showCurrentPassword ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showNewPassword ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-blue-50/50 backdrop-blur-sm border border-blue-200/50 rounded-xl">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Password requirements:
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={
                        newPassword.length >= 8
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    At least 8 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={
                        /[A-Z]/.test(newPassword)
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    One uppercase letter
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={
                        /[0-9]/.test(newPassword)
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    One number
                  </li>
                </ul>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all font-medium"
              >
                Update Password
              </button>
            </form>
          </div>

          <div className="space-y-4 pt-8">
            <h3 className="text-base font-semibold text-foreground">
              Recent Login Activity
            </h3>
            <div className="space-y-3">
              {mockLoginActivity.map((activity, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/40 border border-white/40 rounded-xl p-4 hover:bg-white/50 hover:border-white/60 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      {activity.device.includes("iPhone") ||
                        activity.device.includes("Safari") ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-primary"
                        >
                          <rect x="5" y="2" width="14" height="20" rx="2" />
                          <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-primary"
                        >
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                        {activity.device}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{activity.time}</span>
                        <span>•</span>
                        <span>{activity.location}</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <div className="px-3 py-1 bg-green-100/80 backdrop-blur-sm border border-green-200/50 rounded-full flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-green-700">
                          Success
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card-glow p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-8">
            Preferences
          </h2>

          <div className="space-y-6 pb-8 border-b border-white/20">
            <h3 className="text-base font-semibold text-foreground">
              Notification Settings
            </h3>
            <div className="space-y-3">
              {[
                {
                  key: "emailNotifications",
                  label: "Email notifications for bills",
                  description: "Get notified when bills are due",
                },
                {
                  key: "weeklyInsights",
                  label: "Weekly insights emails",
                  description: "Receive financial insights every Monday",
                },
                {
                  key: "pushNotifications",
                  label: "Push notifications",
                  description: "Browser notifications for important updates",
                },
                {
                  key: "monthlyReports",
                  label: "Monthly reports",
                  description: "Detailed financial summary each month",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 backdrop-blur-md bg-white/40 border border-white/40 rounded-xl hover:bg-white/50 hover:border-white/60 transition-all group"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <label className="text-sm font-medium text-foreground block cursor-pointer">
                      {item.label}
                    </label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key as keyof Preferences)}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 flex-shrink-0 ${preferences[item.key as keyof Preferences]
                      ? "bg-primary shadow-md shadow-primary/30"
                      : "bg-gray-300"
                      }`}
                    aria-label={`Toggle ${item.label}`}
                  >
                    <div
                      className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${preferences[item.key as keyof Preferences]
                        ? "translate-x-7"
                        : "translate-x-0.5"
                        }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 py-8 border-b border-white/20">
            <h3 className="text-base font-semibold text-foreground">
              Display Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={preferences.currency}
                  onChange={(e) =>
                    handlePreferenceChange("currency", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Format
                </label>
                <select
                  value={preferences.dateFormat}
                  onChange={(e) =>
                    handlePreferenceChange("dateFormat", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Day of Week
                </label>
                <select
                  value={preferences.firstDayOfWeek}
                  onChange={(e) =>
                    handlePreferenceChange("firstDayOfWeek", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-8">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                Theme
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose your preferred color scheme
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handlePreferenceChange("theme", "light")}
                className={`relative p-5 rounded-2xl border-2 transition-all duration-300 group ${preferences.theme === "light"
                  ? "border-primary bg-white/60 shadow-lg shadow-primary/20"
                  : "border-white/50 bg-white/30 hover:bg-white/40 hover:border-white/70"
                  }`}
              >
                <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 border border-gray-200 shadow-sm">
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 via-white to-gray-100 p-3 space-y-2">
                    <div className="h-2 w-3/4 bg-gray-300 rounded" />
                    <div className="h-2 w-1/2 bg-gray-200 rounded" />
                    <div className="h-8 bg-white rounded border border-gray-200 mt-3" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Light Theme</p>
                    <p className="text-xs text-muted-foreground">
                      Default mode
                    </p>
                  </div>
                  {preferences.theme === "light" && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>

              <div className="relative p-5 rounded-2xl border-2 border-white/40 bg-white/20 opacity-60 cursor-not-allowed">
                <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 border border-gray-600 shadow-sm">
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black p-3 space-y-2">
                    <div className="h-2 w-3/4 bg-gray-600 rounded" />
                    <div className="h-2 w-1/2 bg-gray-700 rounded" />
                    <div className="h-8 bg-gray-800 rounded border border-gray-700 mt-3" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Dark Theme</p>
                    <p className="text-xs text-muted-foreground">
                      Easier on eyes
                    </p>
                  </div>
                </div>

                <div className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-full shadow-sm">
                  <span className="text-xs font-semibold text-yellow-800">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-red-50/80 to-red-50/40 border-2 border-red-300/60 rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                #dc2626 10px,
                #dc2626 20px
              )`,
              }}
            />
          </div>

          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-red-100 border border-red-200 rounded-xl flex-shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-destructive"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-destructive mb-1">
                  Danger Zone
                </h2>
                <p className="text-sm text-red-700">
                  These actions are permanent and cannot be undone
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      Export Your Data
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Download all your financial data as JSON
                    </p>
                  </div>
                  <button
                    onClick={handleExportData}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium shadow-sm hover:shadow-md whitespace-nowrap"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Export Data
                  </button>
                </div>
              </div>

              <div className="p-4 bg-red-100/60 backdrop-blur-sm border border-red-200 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-semibold text-destructive mb-1">
                      Delete Account
                    </p>
                    <p className="text-sm text-red-700">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <button
                    onClick={() => setDeleteModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-destructive text-white rounded-xl hover:bg-destructive/90 shadow-lg shadow-destructive/30 hover:shadow-xl hover:shadow-destructive/40 transition-all font-medium whitespace-nowrap"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {deleteModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 animate-in fade-in duration-200"
            onClick={() => {
              setDeleteModalOpen(false);
              setDeleteConfirmation("");
            }}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-red-100 rounded-xl">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-destructive"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Delete Account?
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    This action cannot be undone. All your data will be
                    permanently deleted.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type{" "}
                  <span className="font-bold text-destructive">DELETE</span> to
                  confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="Type DELETE"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-destructive/50 focus:border-destructive transition-all"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setDeleteConfirmation("");
                  }}
                  className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-200 hover:border-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmation !== "DELETE"}
                  className="flex-1 px-4 py-3 bg-destructive text-white rounded-xl font-medium hover:bg-destructive/90 shadow-lg shadow-destructive/20 hover:shadow-xl hover:shadow-destructive/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
