"use client"

interface NavbarProps {
  onMenuClick: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 glass-card mx-6 mt-4 rounded-2xl border-white/50 shadow-xl shadow-black/5 p-4 flex items-center justify-between animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-white/30 rounded-lg transition-colors border border-white/20 hover:border-white/40"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2.5 hover:bg-white/30 rounded-lg transition-colors border border-white/20 hover:border-white/40">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <button className="p-2.5 hover:bg-white/30 rounded-lg transition-colors border border-white/20 hover:border-white/40">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m3.08-3.08l4.24-4.24" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-green-500 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/40">
          U
        </div>
      </div>
    </nav>
  )
}
