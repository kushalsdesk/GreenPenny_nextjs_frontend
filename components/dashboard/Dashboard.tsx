"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { AccountCards } from "./AccountCards";
import { SpendingGraph } from "./SpendingGraph";
import { TransactionList } from "./TransactionList";
import { Sidebar } from "./Sidebar";

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-linear-to-br from-green-50 via-white to-slate-50">
      {/* Sidebar - Hidden on mobile, toggle on click */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Overlay for mobile when sidebar is open */}
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
            {/* Account Cards */}
            <AccountCards />

            {/* Spending Graph */}
            <SpendingGraph />

            {/* Transaction List */}
            <TransactionList />
          </div>
        </div>
      </main>
    </div>
  );
}
