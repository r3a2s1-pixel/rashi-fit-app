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
      <main className="min-h-dvh bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onSuccess={handleLoginSuccess} />;
  }

  return (
    <main className="min-h-dvh flex flex-col bg-slate-950 text-white selection:bg-orange-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.22),_transparent_38%),radial-gradient(circle_at_center,_rgba(30,41,59,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.16),_transparent_38%),linear-gradient(to_bottom,_#020617,_#081028,_#020617)] pointer-events-none" />

      <div className="relative min-h-dvh flex flex-col">
        <Navbar showLogout onLogout={handleLogout} />

        <div className="relative flex-grow w-full px-4 py-6">
          {mode === "selection" && (
            <div className="w-full space-y-6">
              <div className="text-center pt-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-400/20 bg-orange-500/10 text-orange-300 text-xs font-semibold mb-4">
                  <Sparkles size={14} />
                  Ready to train
                </div>

                <h1 className="text-4xl font-black tracking-tight leading-tight">
                  Choose your
                  <br />
                  <span className="text-orange-500">training mode</span>
                </h1>

                <p className="text-slate-400 text-sm mt-3 max-w-[290px] mx-auto">
                  Pick your gym routine warmups and stretches, or start a focused
                  VO₂ max session.
                </p>
              </div>

              <div className="grid gap-4">
                <button
                  onClick={() => setMode("gym")}
                  className="w-full p-7 rounded-[2.3rem] border border-white/10 bg-slate-900/80 backdrop-blur-sm active:scale-[0.98] transition-transform text-left shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-3xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center shrink-0">
                      <Dumbbell className="text-orange-500 w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black">Gym Routine</h2>
                      <p className="text-slate-400 text-sm mt-1">
                        Warmups and stretches for every training day
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setMode("vo2")}
                  className="w-full p-7 rounded-[2.3rem] border border-white/10 bg-slate-900/80 backdrop-blur-sm active:scale-[0.98] transition-transform text-left shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center shrink-0">
                      <Timer className="text-blue-400 w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black">VO₂ Max</h2>
                      <p className="text-slate-400 text-sm mt-1">
                        Interval training with timer and alerts
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {mode === "gym" && <AppFlow />}

          {mode === "vo2" && <Vo2MaxFlow />}
        </div>

        <Footer />
      </div>
    </main>
  );
}