"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface Phase {
  name: string;
  speed: string;
  duration: number;
}

export default function Vo2MaxFlow() {
  const [screen, setScreen] = useState<"setup" | "dash">("setup");
  const [customMin, setCustomMin] = useState("");
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
    if (!isActive) playBeep();
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    const sure = window.confirm("Reset workout?");
    if (!sure) return;

    setIsActive(false);
    setScreen("setup");
    setPhases([]);
    setCurrentIndex(0);
    setTimeLeft(0);
    setCustomMin("");
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
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

  const getPhaseColor = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("warm")) return "border-orange-500/60 bg-orange-500/10";
    if (n.includes("run")) return "border-emerald-500/60 bg-emerald-500/10";
    if (n.includes("recovery")) return "border-blue-500/60 bg-blue-500/10";
    return "border-purple-500/60 bg-purple-500/10";
  };

  return (
    <div className="w-full pb-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))]">
      {screen === "setup" ? (
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
        <div className="w-full max-w-xl mx-auto space-y-4">
          <div className="rounded-[2rem] bg-blue-600 p-6 text-center shadow-[0_18px_50px_rgba(37,99,235,0.35)]">
            <p className="text-xs uppercase font-bold tracking-[0.2em] text-blue-100 mb-2">
              Total Remaining
            </p>
            <p className="text-5xl font-black">{getTotalRemaining()}</p>
          </div>

          <div
            className={`rounded-[2rem] border-2 p-7 text-center shadow-[0_18px_50px_rgba(0,0,0,0.28)] ${getPhaseColor(
              phases[currentIndex]?.name || ""
            )}`}
          >
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-slate-300 mb-3">
              {isActive ? "Running" : "Ready"}
            </p>

            <h2 className="text-4xl font-black mb-2">
              {phases[currentIndex]?.name}
            </h2>

            <p className="text-lg text-slate-300 mb-6">
              {phases[currentIndex]?.speed}
            </p>

            <p className="text-7xl font-black tracking-tight">
              {formatTime(timeLeft)}
            </p>
          </div>

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

          <div className="flex gap-3 pt-2">
            <button
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
              onClick={resetTimer}
              className="px-5 rounded-[2rem] bg-slate-800 text-white border border-white/10 active:scale-95 transition-transform flex items-center justify-center"
            >
              <RotateCcw size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}