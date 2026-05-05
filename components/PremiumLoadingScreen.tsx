"use client";

import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";

export default function PremiumLoadingScreen() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden selection:bg-orange-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.15),_transparent_40%),radial-gradient(circle_at_center,_rgba(30,41,59,0.5),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.1),_transparent_40%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex items-center justify-center mb-6"
        >
          <div className="absolute inset-0 bg-orange-500/40 blur-3xl rounded-full animate-pulse" />

          <div className="relative w-24 h-24 rounded-[2rem] bg-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.2)]">
            <Dumbbell className="text-orange-500 w-12 h-12" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-black tracking-tight text-white">
            Rash<span className="text-orange-500">Fit</span>
          </h1>
          <p className="text-slate-400 text-xs mt-2 uppercase tracking-[0.25em] font-bold">
            Optimize Your Routine
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="w-56 h-1.5 bg-slate-800/80 rounded-full overflow-hidden relative backdrop-blur-sm border border-white/5"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{
              duration: 2.2,
              ease: "easeInOut",
            }}
            className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-500 rounded-full"
          />
        </motion.div>
      </div>
    </main>
  );
}