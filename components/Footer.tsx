import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-10 mt-16 border-t border-white/10 bg-slate-950/60">
      <div className="max-w-md mx-auto px-4 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-slate-400">
          <Dumbbell size={16} className="text-orange-500" />
          <span className="font-semibold">Rash Fit App</span>
        </div>
        <p className="text-slate-600 text-xs text-center">
          Built for your gym routine, recovery, and VO₂ max training
        </p>
      </div>
    </footer>
  );
}