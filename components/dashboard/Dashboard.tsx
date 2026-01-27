"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Settings from "./sections/SettingsSection";
import DashboardHome from "./sections/DashboardHome";
import Transactions from "./sections/TransactionsSection";
import Insights from "./sections/InsightsSection";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-linear-to-br from-green-50 via-white to-slate-50">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col min-h-screen w-full md:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {currentSection === "dashboard" && <DashboardHome />}
            {currentSection === "transactions" && <Transactions />}
            {currentSection === "insights" && <Insights />}
            {currentSection === "settings" && <Settings />}
          </div>
        </div>
      </main>
    </div>
  );
}
export default Dashboard
