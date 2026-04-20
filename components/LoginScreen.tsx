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
        setTimeout(() => {
          onSuccess();
        }, 150);
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
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_30%)]" />

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-slate-900/85 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-6">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-orange-500/20 to-orange-400/5 border border-orange-400/20 flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(249,115,22,0.15)]">
              <Lock className="text-orange-500 w-9 h-9" />
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white">
              Welcome to
            </h1>
            <h2 className="text-3xl font-black tracking-tight mt-1">
              Rashi <span className="text-orange-500">Fit App</span>
            </h2>

            <p className="text-slate-400 text-sm mt-3 max-w-[240px]">
              Enter your PIN to unlock your training dashboard
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
              <ShieldCheck size={14} />
              Private access
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  pin.length > i
                    ? "bg-orange-500 border-orange-500 shadow-[0_0_16px_rgba(249,115,22,0.5)]"
                    : "border-slate-600 bg-slate-800"
                }`}
              />
            ))}
          </div>

          <div className="text-center min-h-[20px] mb-5">
            {error ? (
              <p className="text-red-400 text-sm">{error}</p>
            ) : (
              <p className="text-slate-500 text-xs">PIN required</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {numbers.map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                className="h-16 rounded-2xl border border-white/10 bg-slate-800/90 text-xl font-bold text-white shadow-sm active:scale-95 transition-all hover:bg-slate-700"
              >
                {num}
              </button>
            ))}

            <button
              onClick={handleClear}
              className="h-16 rounded-2xl border border-white/10 bg-slate-800/90 text-sm font-bold text-slate-300 active:scale-95 transition-all hover:bg-slate-700"
            >
              Clear
            </button>

            <button
              onClick={() => handleNumberClick("0")}
              className="h-16 rounded-2xl border border-white/10 bg-slate-800/90 text-xl font-bold text-white active:scale-95 transition-all hover:bg-slate-700"
            >
              0
            </button>

            <button
              onClick={handleDelete}
              className="h-16 rounded-2xl border border-white/10 bg-slate-800/90 flex items-center justify-center text-slate-300 active:scale-95 transition-all hover:bg-slate-700"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}