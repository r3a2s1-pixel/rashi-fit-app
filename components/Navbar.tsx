"use client";

import { Dumbbell, LogOut } from "lucide-react";

interface NavbarProps {
  showLogout?: boolean;
  onLogout?: () => void;
}

export default function Navbar({
  showLogout = false,
  onLogout,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500/25 to-orange-400/5 border border-orange-400/20 flex items-center justify-center">
            <Dumbbell className="text-orange-500" size={20} />
          </div>
          <div className="leading-tight">
            <p className="text-white font-black text-lg tracking-tight">
              Rashi <span className="text-orange-500">Fit</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Personal Training
            </p>
          </div>
        </div>

        {showLogout && onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-slate-300 px-3 py-2 rounded-xl bg-slate-800/90 border border-white/10 active:scale-95 transition-transform hover:bg-slate-700"
          >
            <LogOut size={16} />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}