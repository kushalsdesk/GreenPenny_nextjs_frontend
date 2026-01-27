"use client";

import { useState, useMemo } from "react";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  category: string;
  account: string;
  type: "income" | "expense";
  amount: number;
}

interface FilterState {
  account: string;
  dateRange: string;
  transactionType: string;
  category: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: new Date(2024, 0, 15),
    description: "Salary Deposit",
    category: "Income",
    account: "Checking Account",
    type: "income",
    amount: 4200.0,
  },
  {
    id: "2",
    date: new Date(2024, 0, 14),
    description: "Grocery Store",
    category: "Food",
    account: "Checking Account",
    type: "expense",
    amount: 156.5,
  },
  {
    id: "3",
    date: new Date(2024, 0, 13),
    description: "Electric Bill",
    category: "Utilities",
    account: "Checking Account",
    type: "expense",
    amount: 89.99,
  },
  {
    id: "4",
    date: new Date(2024, 0, 12),
    description: "Interest Payment",
    category: "Income",
    account: "Savings Account",
    type: "income",
    amount: 45.3,
  },
  {
    id: "5",
    date: new Date(2024, 0, 11),
    description: "Coffee Shop",
    category: "Dining",
    account: "Checking Account",
    type: "expense",
    amount: 5.75,
  },
  {
    id: "6",
    date: new Date(2024, 0, 10),
    description: "Gas Station",
    category: "Transport",
    account: "Checking Account",
    type: "expense",
    amount: 62.4,
  },
  {
    id: "7",
    date: new Date(2024, 0, 9),
    description: "Movie Ticket",
    category: "Entertainment",
    account: "Checking Account",
    type: "expense",
    amount: 18.0,
  },
  {
    id: "8",
    date: new Date(2024, 0, 8),
    description: "Amazon Purchase",
    category: "Shopping",
    account: "Checking Account",
    type: "expense",
    amount: 79.99,
  },
  {
    id: "9",
    date: new Date(2024, 0, 7),
    description: "Doctor Visit",
    category: "Health",
    account: "Savings Account",
    type: "expense",
    amount: 150.0,
  },
  {
    id: "10",
    date: new Date(2024, 0, 6),
    description: "Restaurant",
    category: "Dining",
    account: "Checking Account",
    type: "expense",
    amount: 85.5,
  },
  {
    id: "11",
    date: new Date(2024, 0, 5),
    description: "Internet Bill",
    category: "Utilities",
    account: "Checking Account",
    type: "expense",
    amount: 79.99,
  },
  {
    id: "12",
    date: new Date(2024, 0, 4),
    description: "Freelance Payment",
    category: "Income",
    account: "Checking Account",
    type: "income",
    amount: 850.0,
  },
  {
    id: "13",
    date: new Date(2024, 0, 3),
    description: "Grocery Shopping",
    category: "Food",
    account: "Checking Account",
    type: "expense",
    amount: 127.65,
  },
  {
    id: "14",
    date: new Date(2024, 0, 2),
    description: "Gym Membership",
    category: "Health",
    account: "Checking Account",
    type: "expense",
    amount: 49.99,
  },
  {
    id: "15",
    date: new Date(2024, 0, 1),
    description: "Uber Trip",
    category: "Transport",
    account: "Checking Account",
    type: "expense",
    amount: 24.3,
  },
  {
    id: "16",
    date: new Date(2023, 11, 31),
    description: "Department Store",
    category: "Shopping",
    account: "Savings Account",
    type: "expense",
    amount: 245.75,
  },
  {
    id: "17",
    date: new Date(2023, 11, 30),
    description: "Salary Deposit",
    category: "Income",
    account: "Checking Account",
    type: "income",
    amount: 4200.0,
  },
  {
    id: "18",
    date: new Date(2023, 11, 29),
    description: "Coffee & Breakfast",
    category: "Dining",
    account: "Checking Account",
    type: "expense",
    amount: 12.5,
  },
  {
    id: "19",
    date: new Date(2023, 11, 28),
    description: "Water Bill",
    category: "Utilities",
    account: "Checking Account",
    type: "expense",
    amount: 45.0,
  },
  {
    id: "20",
    date: new Date(2023, 11, 27),
    description: "Concert Tickets",
    category: "Entertainment",
    account: "Checking Account",
    type: "expense",
    amount: 150.0,
  },
  {
    id: "21",
    date: new Date(2023, 11, 26),
    description: "Pharmacy",
    category: "Health",
    account: "Checking Account",
    type: "expense",
    amount: 35.99,
  },
  {
    id: "22",
    date: new Date(2023, 11, 25),
    description: "Tax Refund",
    category: "Income",
    account: "Savings Account",
    type: "income",
    amount: 1250.0,
  },
  {
    id: "23",
    date: new Date(2023, 11, 24),
    description: "Lunch Meeting",
    category: "Dining",
    account: "Checking Account",
    type: "expense",
    amount: 42.75,
  },
  {
    id: "24",
    date: new Date(2023, 11, 23),
    description: "Gas Station",
    category: "Transport",
    account: "Checking Account",
    type: "expense",
    amount: 58.2,
  },
  {
    id: "25",
    date: new Date(2023, 11, 22),
    description: "Bookstore",
    category: "Shopping",
    account: "Checking Account",
    type: "expense",
    amount: 65.99,
  },
];

const IncomeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="text-primary"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
    <polyline points="23 6 23 12" />
  </svg>
);

const ExpenseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="text-destructive"
  >
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

const getFoodIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="9" cy="21" r="1" />
    <path d="M6 8h12M6 8c-1-2-2-4-2-6 0-1 1-2 2-2s2 1 2 2M18 8c1-2 2-4 2-6 0-1-1-2-2-2s-2 1-2 2" />
  </svg>
);

const getUtilitiesIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const getDiningIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17 8h.01M12 20c4.418 0 8-1.79 8-4s-3.582-4-8-4-8 1.79-8 4 3.582 4 8 4z" />
    <path d="M12 12c4.418 0 8-1.79 8-4s-3.582-4-8-4-8 1.79-8 4 3.582 4 8 4z" />
  </svg>
);

const getTransportIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 8h1a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-10a4 4 0 0 1 4-4h1M7 4h10a2 2 0 0 1 2 2v2H5V6a2 2 0 0 1 2-2z" />
    <circle cx="7.5" cy="15.5" r="1.5" />
    <circle cx="16.5" cy="15.5" r="1.5" />
  </svg>
);

const getEntertainmentIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);

const getShoppingIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const getHealthIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const getIncomeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="1" />
    <path d="M12 1v6m0 6v4" />
  </svg>
);

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Food":
      return getFoodIcon();
    case "Utilities":
      return getUtilitiesIcon();
    case "Dining":
      return getDiningIcon();
    case "Transport":
      return getTransportIcon();
    case "Entertainment":
      return getEntertainmentIcon();
    case "Shopping":
      return getShoppingIcon();
    case "Health":
      return getHealthIcon();
    case "Income":
      return getIncomeIcon();
    default:
      return null;
  }
};

export function TransactionsSection() {
  const [filters, setFilters] = useState<FilterState>({
    account: "all",
    dateRange: "all",
    transactionType: "all",
    category: "all",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((transaction) => {
      if (
        filters.account !== "all" &&
        transaction.account !== filters.account
      ) {
        return false;
      }

      if (filters.dateRange !== "all") {
        const now = new Date();
        const transactionDate = transaction.date;
        const daysDifference = Math.floor(
          (now.getTime() - transactionDate.getTime()) / (1000 * 3600 * 24),
        );

        switch (filters.dateRange) {
          case "7days":
            if (daysDifference > 7) return false;
            break;
          case "30days":
            if (daysDifference > 30) return false;
            break;
          case "90days":
            if (daysDifference > 90) return false;
            break;
          case "year":
            if (transactionDate.getFullYear() !== now.getFullYear())
              return false;
            break;
        }
      }

      if (
        filters.transactionType !== "all" &&
        transaction.type !== filters.transactionType
      ) {
        return false;
      }

      if (
        filters.category !== "all" &&
        transaction.category !== filters.category
      ) {
        return false;
      }

      if (
        searchQuery &&
        !transaction.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [filters, searchQuery]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      account: "all",
      dateRange: "all",
      transactionType: "all",
      category: "all",
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-foreground">Transactions</h2>
          <div className="px-3 py-1 rounded-full bg-white/40 backdrop-blur-md border border-white/40 text-sm font-medium text-foreground">
            {filteredTransactions.length} transactions
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Track all your financial activities
        </p>
      </div>

      <div className="glass-card-glow p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted-foreground mb-2">
              Account
            </label>
            <select
              value={filters.account}
              onChange={(e) => handleFilterChange("account", e.target.value)}
              className="px-3 py-2 rounded-xl bg-white/20 border border-white/40 backdrop-blur-md text-foreground text-sm focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all"
            >
              <option value="all">All Accounts</option>
              <option value="Checking Account">Checking Account</option>
              <option value="Savings Account">Savings Account</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted-foreground mb-2">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="px-3 py-2 rounded-xl bg-white/20 border border-white/40 backdrop-blur-md text-foreground text-sm focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all"
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted-foreground mb-2">
              Type
            </label>
            <select
              value={filters.transactionType}
              onChange={(e) =>
                handleFilterChange("transactionType", e.target.value)
              }
              className="px-3 py-2 rounded-xl bg-white/20 border border-white/40 backdrop-blur-md text-foreground text-sm focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted-foreground mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="px-3 py-2 rounded-xl bg-white/20 border border-white/40 backdrop-blur-md text-foreground text-sm focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all"
            >
              <option value="all">All Categories</option>
              <option value="Food">Food</option>
              <option value="Utilities">Utilities</option>
              <option value="Income">Income</option>
              <option value="Dining">Dining</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted-foreground mb-2">
              Search
            </label>
            <div className="relative">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/20 border border-white/40 backdrop-blur-md text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all"
              />
            </div>
          </div>
        </div>

        {(Object.values(filters).some((v) => v !== "all") || searchQuery) && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="hidden sm:block">
        {paginatedTransactions.length > 0 ? (
          <div className="glass-card-glow overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Account
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Type
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-white/10 hover:bg-white/20 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-foreground whitespace-nowrap">
                      <div className="flex flex-col">
                        <span>{formatDate(transaction.date)}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(transaction.date)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-white/30 border border-white/40">
                          {getCategoryIcon(transaction.category)}
                        </div>
                        <span>{transaction.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 rounded-full bg-white/30 border border-white/40 text-foreground text-xs font-medium">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {transaction.account}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-1">
                        {transaction.type === "income" ? (
                          <IncomeIcon />
                        ) : (
                          <ExpenseIcon />
                        )}
                        <span className="capitalize">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-bold">
                      <span
                        className={
                          transaction.type === "income"
                            ? "text-primary"
                            : "text-destructive"
                        }
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="glass-card-glow p-12 text-center space-y-4">
            <div className="flex justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-muted-foreground/50"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="9" x2="15" y2="9" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground mb-1">
                No transactions found
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-white/30 hover:bg-white/40 border border-white/40 text-foreground text-sm font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <div className="sm:hidden space-y-3">
        {paginatedTransactions.length > 0 ? (
          paginatedTransactions.map((transaction) => (
            <div key={transaction.id} className="glass-card-glow p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-white/30 border border-white/40 shrink-0">
                    {getCategoryIcon(transaction.category)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.category}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className={`text-base font-bold ${
                      transaction.type === "income"
                        ? "text-primary"
                        : "text-destructive"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <span>{formatDate(transaction.date)}</span>
                  <span>•</span>
                  <span>{transaction.account}</span>
                </div>
                <div className="flex items-center gap-1">
                  {transaction.type === "income" ? (
                    <IncomeIcon />
                  ) : (
                    <ExpenseIcon />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-card-glow p-8 text-center space-y-4">
            <div className="flex justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-muted-foreground/50"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="9" x2="15" y2="9" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold text-foreground mb-1">
                No transactions found
              </p>
              <p className="text-xs text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-white/30 hover:bg-white/40 border border-white/40 text-foreground text-sm font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {paginatedTransactions.length > 0 && (
        <div className="glass-card-glow p-4 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(
              currentPage * ITEMS_PER_PAGE,
              filteredTransactions.length,
            )}{" "}
            of {filteredTransactions.length} transactions
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-white/30 hover:bg-white/40 disabled:opacity-50 disabled:cursor-not-allowed border border-white/40 text-foreground text-sm font-medium transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-white/40 border border-white/60 text-foreground"
                        : "bg-white/20 hover:bg-white/30 border border-white/40 text-muted-foreground"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-white/30 hover:bg-white/40 disabled:opacity-50 disabled:cursor-not-allowed border border-white/40 text-foreground text-sm font-medium transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
