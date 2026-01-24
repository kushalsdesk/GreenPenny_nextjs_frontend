"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { AccountCards } from "./AccountCards";
import { SpendingGraph } from "./SpendingGraph";
import { TransactionList } from "./TransactionList";
import { TransactionsSection } from "./TransactionsSection";
import { Sidebar } from "./Sidebar";

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-linear-to-br from-green-50 via-white to-slate-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen w-full md:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Conditional Section Rendering */}
            {currentSection === "dashboard" && (
              <>
                <AccountCards />
                <SpendingGraph />
                <TransactionList />
              </>
            )}

            {currentSection === "transactions" && <TransactionsSection />}

            {currentSection === "insights" && (
              <div className="glass-card-glow p-12 text-center">
                <p className="text-xl font-bold text-foreground">Insights Section</p>
                <p className="text-sm text-muted-foreground mt-2">Coming soon...</p>
              </div>
            )}

            {currentSection === "settings" && (
              <div className="glass-card-glow p-12 text-center">
                <p className="text-xl font-bold text-foreground">Settings Section</p>
                <p className="text-sm text-muted-foreground mt-2">Coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
