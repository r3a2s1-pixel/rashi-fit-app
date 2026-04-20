"use client";

import { useState } from "react";
import { Lock, Delete, ShieldCheck } from "lucide-react";

interface LoginScreenProps {
  onSuccess: () => void;
}

const CORRECT_PIN = "5810";

export default function LoginScreen({ onSuccess }: LoginScreenProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleNumberClick = (num: string) => {
    if (pin.length >= 4) return;

    const newPin = pin + num;
    setPin(newPin);
    setError("");

    if (newPin.length === 4) {
      if (newPin === CORRECT_PIN) {
        localStorage.setItem("rashi-fit-auth", "true");
        setTimeout(() => onSuccess(), 150);
      } else {
        setTimeout(() => {
          setError("Wrong PIN. Try again.");
          setPin("");
        }, 200);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError("");
  };

  const handleClear = () => {
    setPin("");
    setError("");
  };

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="h-[100dvh] w-full bg-slate-950 text-white relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_30%)] pointer-events-none" />

      {/* Top Section: Flex-1 pushes the keypad to the bottom but scales to fit small screens */}
      <div className="relative flex-1 w-full px-4 flex flex-col items-center justify-center pt-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500/20 to-orange-400/5 border border-orange-400/20 flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(249,115,22,0.15)]">
          <Lock className="text-orange-500 w-8 h-8" />
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white leading-tight">
          Welcome to
        </h1>
        <h2 className="text-3xl font-black tracking-tight leading-tight">
          Rash <span className="text-orange-500">Fit App</span>
        </h2>

        <p className="text-slate-400 text-sm mt-3 max-w-[260px] text-center">
          Enter your PIN to unlock your training dashboard
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
          <ShieldCheck size={14} />
          Private access
        </div>
      </div>

      {/* Bottom Section: Keypad optimized for Safari safe areas */}
      <div 
        className="relative w-full px-4" 
        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        <div className="flex justify-center gap-4 mb-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 ${
                pin.length > i
                  ? "bg-orange-500 border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.5)]"
                  : "border-slate-600 bg-slate-800"
              }`}
            />
          ))}
        </div>

        <div className="text-center h-6 mb-4">
          {error ? (
            <p className="text-red-400 text-sm font-medium">{error}</p>
          ) : (
            <p className="text-slate-500 text-sm font-medium">PIN required</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 w-full">
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="h-[60px] rounded-2xl border border-white/10 bg-slate-800/90 text-2xl font-bold text-white active:scale-95 transition-all hover:bg-slate-700"
            >
              {num}
            </button>
          ))}

          <button
            onClick={handleClear}
            className="h-[60px] rounded-2xl border border-white/10 bg-slate-800/90 text-sm font-bold text-slate-300 active:scale-95 transition-all hover:bg-slate-700 uppercase tracking-wider"
          >
            Clear
          </button>

          <button
            onClick={() => handleNumberClick("0")}
            className="h-[60px] rounded-2xl border border-white/10 bg-slate-800/90 text-2xl font-bold text-white active:scale-95 transition-all hover:bg-slate-700"
          >
            0
          </button>

          <button
            onClick={handleDelete}
            className="h-[60px] rounded-2xl border border-white/10 bg-slate-800/90 flex items-center justify-center text-slate-300 active:scale-95 transition-all hover:bg-slate-700"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}