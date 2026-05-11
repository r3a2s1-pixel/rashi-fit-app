"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface Phase {
  name: string;
  speed: string;
  duration: number;
}

type ScreenWakeLockSentinel = {
  release: () => Promise<void>;
};

type NavigatorWithWakeLock = Navigator & {
  wakeLock?: {
    request: (type: "screen") => Promise<ScreenWakeLockSentinel>;
  };
};

// ─── Phase theme system ──────────────────────────────────────────────────────

interface PhaseTheme {
  /** Outer wrapper: border + background gradient on the main phase card */
  cardBorder: string;
  cardBg: string;
  /** Coloured glow shadow on the main phase card */
  cardShadow: string;
  /** Phase name text colour */
  nameColor: string;
  /** Status label ("Running" / "Ready") colour */
  statusColor: string;
  /** Timer digit glow/colour */
  timerColor: string;
  /** Total-remaining banner: solid bg + shadow */
  bannerBg: string;
  bannerShadow: string;
  bannerText: string;
}

const THEMES: Record<"warm" | "run" | "recovery" | "cool", PhaseTheme> = {
  warm: {
    cardBorder: "border-amber-500/70",
    cardBg:
      "bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.18),_transparent_65%),_rgba(15,23,42,0.85)]",
    cardShadow:
      "shadow-[0_0_0_1px_rgba(251,191,36,0.15),_0_20px_60px_rgba(251,191,36,0.22)]",
    nameColor: "text-amber-300",
    statusColor: "text-amber-400/80",
    timerColor: "text-amber-100",
    bannerBg: "bg-gradient-to-r from-amber-600 to-orange-500",
    bannerShadow: "shadow-[0_12px_40px_rgba(245,158,11,0.40)]",
    bannerText: "text-amber-50",
  },
  run: {
    cardBorder: "border-emerald-500/70",
    cardBg:
      "bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.20),_transparent_65%),_rgba(15,23,42,0.85)]",
    cardShadow:
      "shadow-[0_0_0_1px_rgba(16,185,129,0.18),_0_20px_60px_rgba(16,185,129,0.28)]",
    nameColor: "text-emerald-300",
    statusColor: "text-emerald-400/80",
    timerColor: "text-emerald-100",
    bannerBg: "bg-gradient-to-r from-emerald-600 to-teal-500",
    bannerShadow: "shadow-[0_12px_40px_rgba(16,185,129,0.40)]",
    bannerText: "text-emerald-50",
  },
  recovery: {
    cardBorder: "border-cyan-500/70",
    cardBg:
      "bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.18),_transparent_65%),_rgba(15,23,42,0.85)]",
    cardShadow:
      "shadow-[0_0_0_1px_rgba(6,182,212,0.15),_0_20px_60px_rgba(6,182,212,0.24)]",
    nameColor: "text-cyan-300",
    statusColor: "text-cyan-400/80",
    timerColor: "text-cyan-100",
    bannerBg: "bg-gradient-to-r from-blue-600 to-cyan-500",
    bannerShadow: "shadow-[0_12px_40px_rgba(6,182,212,0.38)]",
    bannerText: "text-cyan-50",
  },
  cool: {
    cardBorder: "border-violet-500/70",
    cardBg:
      "bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.18),_transparent_65%),_rgba(15,23,42,0.85)]",
    cardShadow:
      "shadow-[0_0_0_1px_rgba(139,92,246,0.15),_0_20px_60px_rgba(139,92,246,0.26)]",
    nameColor: "text-violet-300",
    statusColor: "text-violet-400/80",
    timerColor: "text-violet-100",
    bannerBg: "bg-gradient-to-r from-violet-600 to-purple-500",
    bannerShadow: "shadow-[0_12px_40px_rgba(139,92,246,0.38)]",
    bannerText: "text-violet-50",
  },
};

function getTheme(phaseName: string): PhaseTheme {
  const n = phaseName.toLowerCase();
  if (n.includes("warm")) return THEMES.warm;
  if (n.includes("run")) return THEMES.run;
  if (n.includes("recovery")) return THEMES.recovery;
  return THEMES.cool; // Cool Down + fallback
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Vo2MaxFlow() {
  const [screen, setScreen] = useState<"setup" | "dash">("setup");
  const [customMin, setCustomMin] = useState("");
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const wakeLockRef = useRef<ScreenWakeLockSentinel | null>(null);

  const requestWakeLock = async () => {
    try {
      const nav = navigator as NavigatorWithWakeLock;

      if (!nav.wakeLock) {
        console.log("Screen Wake Lock API is not supported on this browser.");
        return;
      }

      if (!wakeLockRef.current) {
        wakeLockRef.current = await nav.wakeLock.request("screen");
        console.log("Screen wake lock enabled");
      }
    } catch (error) {
      console.error("Wake lock failed:", error);
    }
  };

  const releaseWakeLock = async () => {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        console.log("Screen wake lock released");
      }
    } catch (error) {
      console.error("Wake lock release failed:", error);
    }
  };

  const playBeep = () => {
    if (!alertsEnabled) return;

    const AudioCtx =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioCtx) return;

    const context = new AudioCtx();
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.connect(gain);
    gain.connect(context.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, context.currentTime);
    gain.gain.setValueAtTime(0.1, context.currentTime);

    osc.start();
    osc.stop(context.currentTime + 0.2);
  };

  const recalcPhases = (totalMinutes: number) => {
    const warm = Math.round(totalMinutes * 0.1);
    const ints = Math.round(totalMinutes * 0.8);
    const cool = Math.round(totalMinutes * 0.1);
    const runMin = 4;

    let numIntervals = Math.floor(ints / (runMin + 1));
    if (numIntervals < 1) numIntervals = 1;
    if (numIntervals > 4) numIntervals = 4;

    const baseRecovery =
      1 +
      Math.floor(
        Math.max(0, ints - numIntervals * (runMin + 1)) / numIntervals
      );

    const list: Phase[] = [];

    if (warm > 0) {
      list.push({ name: "Warm-Up", speed: "5–7 km/h", duration: warm });
    }

    for (let i = 1; i <= numIntervals; i++) {
      list.push({ name: `Run ${i}`, speed: "8–10 km/h", duration: runMin });
      list.push({
        name: `Recovery ${i}`,
        speed: "4–6 km/h",
        duration: baseRecovery,
      });
    }

    if (cool > 0) {
      list.push({ name: "Cool Down", speed: "4–5 km/h", duration: cool });
    }

    return list;
  };

  const startSetup = (min: number) => {
    if (!min || Number.isNaN(min) || min <= 0) return;

    const newPhases = recalcPhases(min);
    setPhases(newPhases);
    setCurrentIndex(0);
    setTimeLeft(newPhases[0].duration * 60);
    setIsActive(false);
    setScreen("dash");
  };

  const toggleTimer = () => {
    if (!isActive) {
      playBeep();
      requestWakeLock();
    } else {
      releaseWakeLock();
    }

    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setShowResetConfirm(true);
  };

  const confirmResetTimer = () => {
    releaseWakeLock();
    setIsActive(false);
    setScreen("setup");
    setPhases([]);
    setCurrentIndex(0);
    setTimeLeft(0);
    setCustomMin("");
    setShowResetConfirm(false);
  };

  const cancelResetTimer = () => {
    setShowResetConfirm(false);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      requestWakeLock();

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive && phases.length > 0) {
      if (currentIndex + 1 < phases.length) {
        if (navigator.vibrate) navigator.vibrate(300);
        playBeep();

        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        setTimeLeft(phases[nextIdx].duration * 60);
      } else {
        releaseWakeLock();
        setIsActive(false);
        if (navigator.vibrate) navigator.vibrate(500);
        playBeep();
        window.alert("Workout Complete! 🙌");
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, currentIndex, phases]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isActive) {
        requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      releaseWakeLock();
    };
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const getTotalRemaining = () => {
    let total = timeLeft;
    for (let i = currentIndex + 1; i < phases.length; i++) {
      total += phases[i].duration * 60;
    }
    return formatTime(total);
  };

  // Derive the current theme once so every styled element reads from it
  const theme = getTheme(phases[currentIndex]?.name ?? "");

  return (
    <div className="w-full pb-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))]">
      {screen === "setup" ? (
        /* ── Setup screen — unchanged styling ─────────────────────────────── */
        <div className="w-full max-w-xl mx-auto space-y-4">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 backdrop-blur-md p-6 shadow-[0_18px_50px_rgba(0,0,0,0.32)]">
            <p className="text-orange-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
              VO₂ Max Setup
            </p>

            <h2 className="text-3xl font-black mb-2">Choose duration</h2>

            <p className="text-slate-400 text-sm mb-6">
              Pick a quick preset or enter your own session length.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[10, 15, 20].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => startSetup(m)}
                  className="rounded-2xl border border-white/10 bg-slate-800/90 px-4 py-5 text-center active:scale-95 transition-all hover:bg-slate-700"
                >
                  <span className="block text-2xl font-black">{m}</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
                    minutes
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Custom minutes"
                value={customMin}
                onChange={(e) => setCustomMin(e.target.value)}
                className="flex-1 rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() => startSetup(parseInt(customMin))}
                className="rounded-2xl bg-orange-500 px-5 py-3 font-black text-black active:scale-95 transition-transform"
              >
                Start
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 backdrop-blur-md p-5 flex items-center justify-between shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
            <div>
              <p className="font-bold">Alerts</p>
              <p className="text-xs text-slate-400">Sound and vibration</p>
            </div>

            <button
              type="button"
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              className={`p-3 rounded-2xl transition-colors ${
                alertsEnabled
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/20"
                  : "bg-slate-800 text-slate-300 border border-white/10"
              }`}
            >
              {alertsEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>
      ) : (
        /* ── Dashboard screen — phase-reactive styling ─────────────────────── */
        <div className="w-full max-w-xl mx-auto space-y-4">

          {/* Total remaining banner — tinted to phase colour */}
          <div
            className={`
              rounded-[2rem] p-6 text-center
              transition-all duration-500
              ${theme.bannerBg} ${theme.bannerShadow}
            `}
          >
            <p className={`text-xs uppercase font-bold tracking-[0.2em] mb-2 ${theme.bannerText} opacity-75`}>
              Total Remaining
            </p>
            <p className={`text-5xl font-black ${theme.bannerText}`}>
              {getTotalRemaining()}
            </p>
          </div>

          {/* Main phase card */}
          <div
            className={`
              rounded-[2rem] border-2 p-7 text-center backdrop-blur-sm
              transition-all duration-500
              ${theme.cardBorder} ${theme.cardBg} ${theme.cardShadow}
            `}
          >
            {/* Status label */}
            <p className={`text-xs uppercase tracking-[0.25em] font-bold mb-3 transition-colors duration-500 ${theme.statusColor}`}>
              {isActive ? "Running" : "Ready"}
            </p>

            {/* Phase name */}
            <h2 className={`text-4xl font-black mb-2 transition-colors duration-500 ${theme.nameColor}`}>
              {phases[currentIndex]?.name}
            </h2>

            {/* Speed */}
            <p className="text-lg text-slate-300 mb-6">
              {phases[currentIndex]?.speed}
            </p>

            {/* Timer */}
            <p className={`text-7xl font-black tracking-tight transition-colors duration-500 ${theme.timerColor}`}>
              {formatTime(timeLeft)}
            </p>
          </div>

          {/* Up Next card — unchanged styling */}
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 backdrop-blur-md p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500 mb-3">
              Up Next
            </p>

            {phases[currentIndex + 1] ? (
              <div className="flex items-center justify-between gap-4">
                <p className="text-2xl font-black">
                  {phases[currentIndex + 1].name}
                </p>

                <p className="text-slate-400 text-right text-sm">
                  {phases[currentIndex + 1].duration} min •{" "}
                  {phases[currentIndex + 1].speed}
                </p>
              </div>
            ) : (
              <p className="text-emerald-400 font-bold text-lg">Finish 🎉</p>
            )}
          </div>

          {/* Controls — unchanged */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={toggleTimer}
              className="flex-1 py-5 rounded-[2rem] bg-white text-black font-black text-xl flex justify-center items-center gap-3 active:scale-95 transition-transform"
            >
              {isActive ? (
                <>
                  <Pause size={24} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={24} />
                  Start
                </>
              )}
            </button>

            <button
              type="button"
              onClick={resetTimer}
              className="px-5 rounded-[2rem] bg-slate-800 text-white border border-white/10 active:scale-95 transition-transform flex items-center justify-center"
            >
              <RotateCcw size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Reset confirmation modal — unchanged */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.65)]">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-orange-500/30 bg-orange-500/10 shadow-[0_0_35px_rgba(249,115,22,0.18)]">
              <RotateCcw className="h-8 w-8 text-orange-400" />
            </div>

            <div className="text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-400">
                Reset workout
              </p>

              <h3 className="text-2xl font-black text-white">Start over?</h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                This will stop the current VO₂ Max session and return you to
                setup. Your current timer progress will be cleared.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={cancelResetTimer}
                className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-4 text-sm font-black text-white active:scale-95 transition-transform"
              >
                Keep Going
              </button>

              <button
                type="button"
                onClick={confirmResetTimer}
                className="rounded-2xl bg-orange-500 px-4 py-4 text-sm font-black text-black shadow-[0_12px_30px_rgba(249,115,22,0.28)] active:scale-95 transition-transform"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}