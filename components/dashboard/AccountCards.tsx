"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AccountCardProps {
  id: number;
  name: string;
  balance: string;
  currency: string;
  type: "primary" | "secondary" | "tertiary";
}

const accounts: AccountCardProps[] = [
  {
    id: 1,
    name: "Checking Account",
    balance: "12,458.50",
    currency: "USD",
    type: "primary",
  },
  {
    id: 2,
    name: "Savings Account",
    balance: "45,230.00",
    currency: "USD",
    type: "secondary",
  },
  {
    id: 3,
    name: "Investment Account",
    balance: "78,900.25",
    currency: "USD",
    type: "tertiary",
  },
];

const chartData = [
  { month: "Jan", value: 8000 },
  { month: "Feb", value: 9200 },
  { month: "Mar", value: 8800 },
  { month: "Apr", value: 10500 },
  { month: "May", value: 12200 },
  { month: "Jun", value: 12458 },
];

export function AccountCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in duration-500">
      {accounts.map((account) => (
        <div key={account.id} className="glass-card-glow p-6  overflow-hidden">
          {/* Header with balance */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <p className="text-muted-foreground text-sm mb-1">
                {account.name}
              </p>
              <h3 className="text-3xl font-bold text-primary">
                ${account.balance}
              </h3>
            </div>
            <div className="p-3 bg-white/30 backdrop-blur-md rounded-xl border border-white/40">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-6 -mx-6 px-2">
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id={`gradient-${account.id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="oklch(0.65 0.15 142)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.65 0.15 142)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="white/10" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  stroke="currentColor"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="currentColor" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    borderRadius: "8px",
                  }}
                  cursor={{ stroke: "currentColor", opacity: 0.3 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="oklch(0.65 0.15 142)"
                  strokeWidth={2}
                  fill={`url(#gradient-${account.id})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Footer with stats */}
          <div className="space-y-3 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Last Transaction</p>
              <p className="text-sm font-medium text-foreground">
                Interest Deposit
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary text-xs font-semibold">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              <span>+2.5% this month</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
