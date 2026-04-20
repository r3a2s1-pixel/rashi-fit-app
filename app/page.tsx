"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppFlow from "@/components/AppFlow";
import Vo2MaxFlow from "@/components/Vo2MaxFlow";
import LoginScreen from "@/components/LoginScreen";
import { Dumbbell, Timer, Sparkles } from "lucide-react";

type AppMode = "selection" | "gym" | "vo2";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mode, setMode] = useState<AppMode>("selection");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem("rashi-fit-auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("rashi-fit-auth");
    setIsAuthenticated(false);
    setMode("selection");
  };

  if (isCheckingAuth) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onSuccess={handleLoginSuccess} />;
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.14),_transparent_30%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.10),_transparent_30%)] pointer-events-none" />

      <div className="relative min-h-screen flex flex-col">
        <Navbar showLogout onLogout={handleLogout} />

        <div className="flex-grow w-full max-w-md mx-auto p-4 flex flex-col justify-center">
          {mode === "selection" && (
            <div className="space-y-6">
              <div className="text-center mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-400/20 bg-orange-500/10 text-orange-300 text-xs font-semibold mb-4">
                  <Sparkles size={14} />
                  Ready to train
                </div>

                <h1 className="text-3xl font-black tracking-tight">
                  Choose your
                  <span className="text-orange-500"> training mode</span>
                </h1>

                <p className="text-slate-400 text-sm mt-3 max-w-[280px] mx-auto">
                  Pick your gym routine warmups and stretches, or start a focused
                  VO₂ max session.
                </p>
              </div>

              <button
                onClick={() => setMode("gym")}
                className="w-full p-7 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.35)] active:scale-95 transition-transform text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center mb-5">
                      <Dumbbell className="text-orange-500 w-7 h-7" />
                    </div>

                    <h2 className="text-2xl font-black">Gym Routine</h2>
                    <p className="text-slate-400 text-sm mt-2">
                      Warmups, stretches, and exercise guidance for each muscle
                      day
                    </p>
                  </div>

                  <div className="text-orange-400 text-sm font-semibold">
                    Open
                  </div>
                </div>
              </button>

              <button
                onClick={() => setMode("vo2")}
                className="w-full p-7 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.35)] active:scale-95 transition-transform text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center mb-5">
                      <Timer className="text-blue-400 w-7 h-7" />
                    </div>

                    <h2 className="text-2xl font-black">VO₂ Max Training</h2>
                    <p className="text-slate-400 text-sm mt-2">
                      Timer-based interval training with simple controls and
                      alerts
                    </p>
                  </div>

                  <div className="text-blue-400 text-sm font-semibold">
                    Open
                  </div>
                </div>
              </button>
            </div>
          )}

          {mode === "gym" && (
            <div>
              <button
                onClick={() => setMode("selection")}
                className="mb-5 text-slate-400 text-sm flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/70 border border-white/10"
              >
                ← Back to modes
              </button>
              <AppFlow />
            </div>
          )}

          {mode === "vo2" && (
            <div>
              <button
                onClick={() => setMode("selection")}
                className="mb-5 text-slate-400 text-sm flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/70 border border-white/10"
              >
                ← Back to modes
              </button>
              <Vo2MaxFlow />
            </div>
          )}
        </div>

        <Footer />
      </div>
    </main>
  );
}