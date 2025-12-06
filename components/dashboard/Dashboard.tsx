"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { AccountCards } from "./AccountCards";
import { SpendingGraph } from "./SpendingGraph";
import { TransactionList } from "./TransactionList";
import { Sidebar } from "./Sidebar";

/* Updated dashboard layout with fixed sidebar and scrollable right content */
export function Dashboard() {
  const [sidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-linear-to-br from-green-50 via-white to-slate-50">
      {/* Fixed Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => {}} />

      {/* Main Content - scrollable only on right side */}
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Navbar onMenuClick={() => {}} />

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 space-y-6 pb-8">
            {/* Account Cards with individual charts */}
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
