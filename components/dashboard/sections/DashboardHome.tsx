"use client";

import AccountCards from "../home/AccountCards";
import SpendingGraph from "../home/SpendingGraph";
import TransactionList from "../home/TransactionList";

const DashboardHome = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <AccountCards />
      <SpendingGraph />
      <TransactionList />
    </div>
  );
}

export default DashboardHome
