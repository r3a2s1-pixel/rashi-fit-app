"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Timer, Sparkles, ChevronRight } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppFlow from "@/components/AppFlow";
import Vo2MaxFlow from "@/components/Vo2MaxFlow";
import PremiumLoadingScreen from "@/components/PremiumLoadingScreen";

type AppMode = "loading" | "menu" | "gym" | "vo2";

export default function Home() {
  const [mode, setMode] = useState<AppMode>("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMode("menu");
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const goToMenu = () => {
    setMode("menu");
  };

  const goToGym = () => {
    setMode("gym");
  };

  const goToVo2 = () => {
    setMode("vo2");
  };

  if (mode === "loading") {
    return <PremiumLoadingScreen />;
  }

  return (
    <main className="min-h-dvh flex flex-col bg-slate-950 text-white selection:bg-orange-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.22),_transparent_38%),radial-gradient(circle_at_center,_rgba(30,41,59,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.16),_transparent_38%),linear-gradient(to_bottom,_#020617,_#081028,_#020617)] pointer-events-none" />

      <div className="relative min-h-dvh flex flex-col">
        <Navbar />

        <div className="relative flex-1 w-full px-4 py-4 min-h-0">
          {mode === "menu" && (
            <motion.section
              key="mode-menu"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="min-h-[calc(100dvh-180px)] flex flex-col justify-center max-w-xl mx-auto"
            >
              <div className="text-center mb-7">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-xs font-bold mb-5">
                  <Sparkles size={15} />
                  Ready to train
                </div>

                <h1 className="text-4xl font-black tracking-tight leading-[1.05]">
                  Choose your{" "}
                  <span className="text-orange-500 block">
                    training mode
                  </span>
                </h1>

                <p className="text-slate-400 text-base mt-5 leading-relaxed max-w-sm mx-auto">
                  Pick your gym routine warmups and stretches, or start a
                  focused VO₂ max session.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={goToGym}
                  className="w-full flex items-center gap-5 p-5 rounded-[2rem] bg-slate-900/80 border border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.25)] active:scale-[0.98] transition-all text-left"
                >
                  <div className="w-20 h-20 rounded-[1.6rem] bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(249,115,22,0.14)]">
                    <Dumbbell className="w-10 h-10 text-orange-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-black text-white leading-tight">
                      Gym Routine
                    </h2>
                    <p className="text-slate-400 text-sm mt-1 leading-snug">
                      Warmups and stretches for every training day
                    </p>
                  </div>

                  <ChevronRight className="text-slate-500 shrink-0" size={20} />
                </button>

                <button
                  type="button"
                  onClick={goToVo2}
                  className="w-full flex items-center gap-5 p-5 rounded-[2rem] bg-slate-900/80 border border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.25)] active:scale-[0.98] transition-all text-left"
                >
                  <div className="w-20 h-20 rounded-[1.6rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(59,130,246,0.14)]">
                    <Timer className="w-10 h-10 text-blue-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-black text-white leading-tight">
                      VO₂ Max
                    </h2>
                    <p className="text-slate-400 text-sm mt-1 leading-snug">
                      Interval training with timer and alerts
                    </p>
                  </div>

                  <ChevronRight className="text-slate-500 shrink-0" size={20} />
                </button>
              </div>
            </motion.section>
          )}

          {mode === "gym" && (
            <div className="w-full">
              <button
                type="button"
                onClick={goToMenu}
                className="mb-4 inline-flex items-center gap-2 text-slate-400 text-sm px-4 py-2 rounded-2xl bg-slate-900/50 border border-white/5"
              >
                ← Modes
              </button>

              <AppFlow />
            </div>
          )}

          {mode === "vo2" && (
            <div className="w-full">
              <button
                type="button"
                onClick={goToMenu}
                className="mb-4 inline-flex items-center gap-2 text-slate-400 text-sm px-4 py-2 rounded-2xl bg-slate-900/50 border border-white/5"
              >
                ← Modes
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