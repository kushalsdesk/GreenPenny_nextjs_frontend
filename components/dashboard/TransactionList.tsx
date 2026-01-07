"use client";

const transactions = [
  {
    id: 1,
    title: "Grocery Store",
    category: "Food",
    amount: "-$156.50",
    icon: "shopping",
    type: "expense",
    time: "Today",
  },
  {
    id: 2,
    title: "Salary Deposit",
    category: "Income",
    amount: "+$4,200.00",
    icon: "trending",
    type: "income",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "Electric Bill",
    category: "Utilities",
    amount: "-$89.99",
    icon: "zap",
    type: "expense",
    time: "2 days ago",
  },
  {
    id: 4,
    title: "Internet Bill",
    category: "Utilities",
    amount: "-$59.99",
    icon: "wifi",
    type: "expense",
    time: "3 days ago",
  },
  {
    id: 5,
    title: "Coffee Shop",
    category: "Dining",
    amount: "-$12.50",
    icon: "coffee",
    type: "expense",
    time: "1 week ago",
  },
];

const getIcon = (iconType: string) => {
  const iconProps = {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
  };

  switch (iconType) {
    case "shopping":
      return (
        <svg {...iconProps}>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "trending":
      return (
        <svg {...iconProps}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case "zap":
      return (
        <svg {...iconProps}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "wifi":
      return (
        <svg {...iconProps}>
          <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.94 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      );
    case "coffee":
      return (
        <svg {...iconProps}>
          <path d="M18 8h1a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-10a4 4 0 0 1 4-4h1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v5zM10 5v3M14 5v3" />
        </svg>
      );
    default:
      return null;
  }
};

export function TransactionList() {
  return (
    <div className="glass-card-glow p-4 sm:p-6">
      {/* Header */}
      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">
        Recent Transactions
      </h2>

      {/* Transaction List */}
      <div className="space-y-2 sm:space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-white/30 transition-all border border-white/10 hover:border-white/30"
          >
            {/* Icon */}
            <div
              className={`p-2 sm:p-3 rounded-lg border shrink-0 ${
                transaction.type === "income"
                  ? "bg-green-100/40 text-primary border-green-200/30"
                  : "bg-red-100/40 text-destructive border-red-200/30"
              }`}
            >
              {getIcon(transaction.icon)}
            </div>

            {/* Transaction Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate text-sm sm:text-base">
                {transaction.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {transaction.time}
              </p>
            </div>

            {/* Amount */}
            <div
              className={`text-right font-bold shrink-0 text-sm sm:text-base ${
                transaction.type === "income"
                  ? "text-primary"
                  : "text-destructive"
              }`}
            >
              {transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
