"use client";

import { Dumbbell, LogOut } from "lucide-react";

interface NavbarProps {
  showLogout?: boolean;
  onLogout?: () => void;
}

export default function Navbar({ showLogout, onLogout }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="w-full px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
            <Dumbbell className="text-orange-500" size={20} />
          </div>
          <span className="font-black text-lg tracking-tight">
            Rash<span className="text-orange-500">Fit</span>
          </span>
        </div>

        {showLogout && (
          <button
            onClick={onLogout}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </header>
  );
}