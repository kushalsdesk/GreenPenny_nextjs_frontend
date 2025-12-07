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

const data = [
  { month: "Jan", spending: 2400, income: 4200 },
  { month: "Feb", spending: 2210, income: 4100 },
  { month: "Mar", spending: 2290, income: 4300 },
  { month: "Apr", spending: 2000, income: 4500 },
  { month: "May", spending: 2181, income: 4200 },
  { month: "Jun", spending: 2500, income: 4800 },
];

export function SpendingGraph() {
  return (
    <div className="glass-card-glow p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">
          Spending vs Income
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Last 6 months overview
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-64 sm:h-80 lg:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="oklch(0.55 0.2 25)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="oklch(0.55 0.2 25)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
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
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="month"
              stroke="currentColor"
              opacity={0.6}
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              stroke="currentColor"
              opacity={0.6}
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                borderRadius: "12px",
                color: "currentColor",
                fontSize: "14px",
              }}
              cursor={{ stroke: "currentColor", opacity: 0.3 }}
            />
            <Area
              type="monotone"
              dataKey="spending"
              stroke="oklch(0.55 0.2 25)"
              strokeWidth={2}
              fill="url(#spendingGradient)"
              name="Spending"
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="oklch(0.65 0.15 142)"
              strokeWidth={2}
              fill="url(#incomeGradient)"
              name="Income"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400 rounded" />
          <span className="text-xs sm:text-sm text-muted-foreground">
            Spending
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span className="text-xs sm:text-sm text-muted-foreground">
            Income
          </span>
        </div>
      </div>
    </div>
  );
}
