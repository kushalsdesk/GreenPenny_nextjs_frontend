'use client';

import { useState, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

interface HealthScore {
  score: number;
  status: string;
  color: string;
}

interface KeyMetrics {
  income: number;
  expenses: number;
  netSavings: number;
  savingsRate: number;
  savingsRateChange: number;
  topCategory: string;
  topCategoryAmount: number;
  comparison: string;
}

interface Insight {
  id: string;
  type: 'alert' | 'achievement' | 'opportunity' | 'reminder';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  suggestion?: string;
  amount?: string;
  action?: string;
  details?: string[];
}

interface AccountData {
  health: HealthScore;
  metrics: KeyMetrics;
  insights: Insight[];
}

const mockAccountData: Record<string, AccountData> = {
  all: {
    health: { score: 78, status: 'Good', color: 'oklch(0.75 0.15 70)' },
    metrics: {
      income: 4200,
      expenses: 2800,
      netSavings: 1400,
      savingsRate: 33,
      savingsRateChange: 5,
      topCategory: 'Food',
      topCategoryAmount: 450,
      comparison: 'Above average',
    },
    insights: [
      {
        id: '1',
        type: 'alert',
        priority: 'high',
        title: 'Alert: Overspending on Dining',
        description: 'You spent $345 on dining this month',
        suggestion: 'Try meal prepping 2x/week',
        amount: '$120/month',
        action: 'Set Budget',
        details: ["That's 45% above your 3-month average", 'Potential savings: $120/month'],
      },
      {
        id: '2',
        type: 'achievement',
        priority: 'high',
        title: 'Achievement: Excellent Savings Month!',
        description: 'You saved $1,400 this month (33% of income)',
        details: [
          "That's your best month this year!",
          'Keep it up! At this rate, you\'ll hit your $15,000 savings goal by October',
        ],
      },
      {
        id: '3',
        type: 'opportunity',
        priority: 'medium',
        title: 'Opportunity: Optimize Your Cash',
        description: 'You have $2,500 in checking',
        details: ['High-yield savings offer: 4.5% APY', 'Potential earnings: $112.50/year'],
      },
      {
        id: '4',
        type: 'reminder',
        priority: 'medium',
        title: 'Reminder: Upcoming Bills',
        description: 'Consider having proper balance within account',
        details: ['Internet ($79.99) - Due in 3 days', 'Electric ($89.99) - Due in 5 days', 'Total: $169.98', '✓ Sufficient funds available'],
      },
      {
        id: '5',
        type: 'opportunity',
        priority: 'low',
        title: 'Investment Opportunity',
        description: 'Consider diversifying your savings',
        details: ['Current rate: 0.5% APY', 'Market opportunity: 4.5% APY'],
      },
    ],
  },
  checking: {
    health: { score: 65, status: 'Good', color: 'oklch(0.75 0.15 70)' },
    metrics: {
      income: 4200,
      expenses: 2650,
      netSavings: 1550,
      savingsRate: 37,
      savingsRateChange: 8,
      topCategory: 'Dining',
      topCategoryAmount: 345,
      comparison: 'Above average',
    },
    insights: [
      {
        id: '1',
        type: 'alert',
        priority: 'high',
        title: 'Alert: High Dining Expenses',
        description: 'Dining costs are trending upward',
        details: ['Current: $345/month', 'Last month: $310/month', 'Increase: 11%'],
      },
      {
        id: '2',
        type: 'achievement',
        priority: 'high',
        title: 'Great Job on Savings!',
        description: 'Your savings rate improved to 37%',
        details: ['Previous month: 29%', 'Improvement: 8%'],
      },
    ],
  },
  savings: {
    health: { score: 92, status: 'Excellent', color: 'oklch(0.65 0.15 142)' },
    metrics: {
      income: 45.3,
      expenses: 150,
      netSavings: -104.7,
      savingsRate: 0,
      savingsRateChange: 0,
      topCategory: 'Health',
      topCategoryAmount: 150,
      comparison: 'On track',
    },
    insights: [
      {
        id: '1',
        type: 'achievement',
        priority: 'high',
        title: 'Excellent Savings Account!',
        description: 'Your balance of $45,230 is excellent',
        details: ['Interest earned: $45.30 this month', 'Annual projection: $543.60'],
      },
      {
        id: '2',
        type: 'opportunity',
        priority: 'medium',
        title: 'Maximize Interest Earnings',
        description: 'Consider a high-yield option',
        details: ['Current rate: 4.5% APY', 'Annual earnings: $2,035'],
      },
    ],
  },
};

const spendingBreakdownData = [
  { name: 'Food', value: 32, amount: 450 },
  { name: 'Utilities', value: 25, amount: 350 },
  { name: 'Dining', value: 18, amount: 250 },
  { name: 'Transport', value: 15, amount: 210 },
  { name: 'Other', value: 10, amount: 140 },
];

const budgetData = [
  { category: 'Food', spent: 450, budget: 500, percentage: 90 },
  { category: 'Dining', spent: 345, budget: 300, percentage: 115 },
  { category: 'Utilities', spent: 250, budget: 400, percentage: 63 },
  { category: 'Transport', spent: 210, budget: 250, percentage: 84 },
];

const trendData = [
  { month: 'Jan', savings: 1200 },
  { month: 'Feb', savings: 1150 },
  { month: 'Mar', savings: 1300 },
  { month: 'Apr', savings: 1250 },
  { month: 'May', savings: 1350 },
  { month: 'Jun', savings: 1400 },
];

const chartColors = ['oklch(0.65 0.15 142)', 'oklch(0.75 0.15 70)', 'oklch(0.55 0.2 25)', 'oklch(0.6 0.18 200)', 'oklch(0.7 0.12 50)'];

// Circular Progress Component
function CircularProgress({ score, status, color }: HealthScore) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
          {/* Progress circle */}
          <circle cx="60" cy="60" r="45" fill="none" stroke={color} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-500" />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl sm:text-3xl font-bold text-foreground">{score}</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{status}</p>
        </div>
      </div>
    </div>
  );
}

// Insight Card Component with proper gradients
function InsightCard({ insight }: { insight: Insight }) {
  const typeStyles: Record<string, { gradient: string; icon: string; borderColor: string }> = {
    alert: {
      gradient: 'bg-gradient-to-br from-red-50/80 via-red-50/40 to-transparent',
      icon: '🔴',
      borderColor: 'border-red-300/50'
    },
    achievement: {
      gradient: 'bg-gradient-to-br from-green-50/80 via-green-50/40 to-transparent',
      icon: '🟢',
      borderColor: 'border-green-300/50'
    },
    opportunity: {
      gradient: 'bg-gradient-to-br from-blue-50/80 via-blue-50/40 to-transparent',
      icon: '💡',
      borderColor: 'border-blue-300/50'
    },
    reminder: {
      gradient: 'bg-gradient-to-br from-yellow-50/80 via-yellow-50/40 to-transparent',
      icon: '📅',
      borderColor: 'border-yellow-300/50'
    },
  };

  const style = typeStyles[insight.type];

  return (
    <div
      className={`
        backdrop-blur-lg ${style.gradient} 
        border ${style.borderColor} 
        rounded-2xl p-4 sm:p-6 
        shadow-lg hover:shadow-xl 
        hover:scale-[1.02] transition-all duration-300 
        cursor-pointer
        ${insight.priority === 'high' ? 'md:col-span-2 md:row-span-1' : ''}
      `}
    >
      <div className="flex gap-3 mb-3">
        <span className="text-2xl">{style.icon}</span>
        <div className="flex-1">
          <h3 className="font-bold text-foreground text-sm sm:text-base">
            {insight.title}
          </h3>
        </div>
      </div>

      {insight.description && (
        <p className="text-xs sm:text-sm text-muted-foreground mb-2">
          {insight.description}
        </p>
      )}

      {insight.details && (
        <ul className="space-y-1 mb-3">
          {insight.details.map((detail, i) => (
            <li key={i} className="text-xs text-muted-foreground">
              • {detail}
            </li>
          ))}
        </ul>
      )}

      {insight.suggestion && (
        <p className="text-xs sm:text-sm text-foreground mb-3 bg-white/30 backdrop-blur-sm rounded-lg p-2 border border-white/40">
          💭 <span className="font-medium">Suggestion:</span> {insight.suggestion}
        </p>
      )}

      {(insight.action || insight.type !== 'reminder') && (
        <button className="mt-3 px-4 py-2 text-xs sm:text-sm rounded-xl bg-white/50 hover:bg-white/70 backdrop-blur-md text-foreground font-medium transition-all border border-white/60 hover:border-white/80 shadow-sm hover:shadow-md">
          {insight.action || 'View Details'}
        </button>
      )}
    </div>
  );
}

// Budget Progress Bar Component
function BudgetProgressBar({ category, spent, budget, percentage }: (typeof budgetData)[0]) {
  let bgColor = 'bg-green-500';
  if (percentage >= 90 && percentage < 100) bgColor = 'bg-yellow-500';
  else if (percentage >= 100) bgColor = 'bg-red-500';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">{category}</p>
        <p className="text-xs text-muted-foreground">
          ${spent} / ${budget}
        </p>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2">
        <div className={`h-full rounded-full ${bgColor} transition-all`} style={{ width: `${Math.min(percentage, 100)}%` }} />
      </div>
      <p className="text-xs text-muted-foreground">{percentage}% used</p>
    </div>
  );
}

export function Insight() {
  const [selectedAccount, setSelectedAccount] = useState<'all' | 'checking' | 'savings'>('all');

  const currentData = mockAccountData[selectedAccount];
  const health = currentData.health;
  const metrics = currentData.metrics;
  const insights = currentData.insights;

  // Sort insights by priority for responsive layout
  const sortedInsights = useMemo(() => {
    return [...insights].sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [insights]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Financial Insights</h1>
        <p className="text-sm text-muted-foreground">AI-powered analysis of your finances</p>
      </div>

      {/* Account Selector & Health Score */}
      <div className="glass-card-glow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Account Selector */}
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-foreground mb-2">Select Account</label>
            <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value as 'all' | 'checking' | 'savings')} className="w-full sm:w-48 px-4 py-2 bg-white/30 border border-white/40 rounded-lg text-foreground font-medium focus:outline-none focus:border-white/60 transition-all">
              <option value="all">All Accounts</option>
              <option value="checking">Checking Account</option>
              <option value="savings">Savings Account</option>
            </select>
          </div>

          {/* Health Score */}
          <div className="flex flex-col items-center">
            <p className="text-sm font-medium text-foreground mb-4">Financial Health Score</p>
            <CircularProgress score={health.score} status={health.status} color={health.color} />
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* This Month Summary */}
        <div className="glass-card-glow p-4 sm:p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">This Month Summary</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Income</p>
              <p className="text-xl sm:text-2xl font-bold text-foreground">${metrics.income.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Expenses</p>
              <p className="text-xl sm:text-2xl font-bold text-destructive">${metrics.expenses.toLocaleString()}</p>
            </div>
            <div className="pt-2 border-t border-white/20">
              <p className="text-xs text-muted-foreground mb-1">Net Savings</p>
              <div className="flex items-center gap-2">
                <p className="text-lg sm:text-xl font-bold text-green-500">+${metrics.netSavings.toLocaleString()}</p>
                <span className="text-xs text-green-500">↑</span>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="glass-card-glow p-4 sm:p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Savings Rate</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Rate</p>
              <p className="text-3xl sm:text-4xl font-bold text-foreground">{metrics.savingsRate}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">vs Last Month</p>
              <p className="text-sm text-green-500 font-medium">↑ {metrics.savingsRateChange}%</p>
            </div>
            <p className="text-xs text-green-500 pt-2 border-t border-white/20">Excellent!</p>
          </div>
        </div>

        {/* Top Spending Category */}
        <div className="glass-card-glow p-4 sm:p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Top Spending Category</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Category</p>
              <p className="text-xl sm:text-2xl font-bold text-foreground">{metrics.topCategory}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Amount Spent</p>
              <p className="text-lg sm:text-xl font-bold text-destructive">${metrics.topCategoryAmount.toLocaleString()}</p>
            </div>
            <p className="text-xs text-muted-foreground pt-2 border-t border-white/20">{metrics.comparison}</p>
          </div>
        </div>
      </div>

      {/* AI Insights - Asymmetric Grid */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">AI Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>

      {/* Spending Breakdown - Enhanced Pie */}
      <div className="glass-card-glow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6">
          Spending Breakdown
        </h2>
        <div className="w-full h-72 sm:h-96 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <defs>
                {spendingBreakdownData.map((entry, index) => (
                  <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={chartColors[index]} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={chartColors[index]} stopOpacity={0.4} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={spendingBreakdownData}
                cx="50%"
                cy="50%"
                innerRadius="45%"
                outerRadius="75%"
                paddingAngle={3}
                dataKey="value"
                label={({ name, value, cx, cy, midAngle, outerRadius }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 25;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="currentColor"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      className="text-xs sm:text-sm font-medium"
                    >
                      {`${name}: ${value}%`}
                    </text>
                  );
                }}
              >
                {spendingBreakdownData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#gradient-${index})`}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '12px',
                  padding: '8px 12px',
                }}
                formatter={(value, name, props) => [
                  `$${props.payload.amount} (${value}%)`,
                  name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend - Manual for better control */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/20">
          {spendingBreakdownData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${chartColors[index]}, ${chartColors[index]}80)`
                }}
              />
              <span className="text-xs sm:text-sm text-foreground">
                {item.name} <span className="text-muted-foreground">(${item.amount})</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Progress Bars */}
      <div className="glass-card-glow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6">Budget Progress</h2>
        <div className="space-y-6">
          {budgetData.map((item) => (
            <BudgetProgressBar key={item.category} {...item} />
          ))}
        </div>
      </div>

      {/* Trend Predictions */}
      <div className="glass-card-glow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">Trend Predictions</h2>
        <div className="space-y-4 mb-6">
          <p className="text-sm text-foreground">
            At this rate, you'll save <span className="font-bold text-green-500">$16,800</span> by year-end
          </p>
          <p className="text-sm text-foreground">
            Your spending is trending <span className="font-bold">upward by 12%</span>
          </p>
        </div>
        <div className="w-full h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.15 142)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.65 0.15 142)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="currentColor" opacity={0.6} />
              <YAxis stroke="currentColor" opacity={0.6} />
              <Tooltip contentStyle={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="savings" stroke="oklch(0.65 0.15 142)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
