"use client";

import { useState, useEffect, useRef } from "react";
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
      Math.floor(Math.max(0, ints - numIntervals * (runMin + 1)) / numIntervals);

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

    const p = recalcPhases(min);
    setPhases(p);
    setCurrentIndex(0);
    setTimeLeft(p[0].duration * 60);
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
    if (n.includes("warm")) return "border-orange-500 bg-orange-500/10";
    if (n.includes("run")) return "border-emerald-500 bg-emerald-500/10";
    if (n.includes("recovery")) return "border-blue-500 bg-blue-500/10";
    return "border-purple-500 bg-purple-500/10";
  };

  return (
    <div className="w-full">
      {screen === "setup" ? (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <h3 className="text-xl font-bold mb-4">Workout Duration</h3>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[10, 15, 20].map((m) => (
                <button
                  key={m}
                  onClick={() => startSetup(m)}
                  className="p-4 bg-slate-800 rounded-2xl hover:bg-orange-500 transition-colors"
                >
                  <span className="block text-xl font-bold">{m}</span>
                  <span className="text-[10px] uppercase text-slate-400">
                    Min
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Custom Min"
                value={customMin}
                onChange={(e) => setCustomMin(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2"
              />
              <button
                onClick={() => startSetup(parseInt(customMin))}
                className="bg-orange-500 px-6 py-2 rounded-xl font-bold"
              >
                Set
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-bold">Alerts</p>
              <p className="text-xs text-slate-400">Vibrate & Sound</p>
            </div>
            <button
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              className={`p-3 rounded-full transition-colors ${
                alertsEnabled ? "bg-emerald-500" : "bg-slate-700"
              }`}
            >
              {alertsEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-600 p-6 rounded-3xl text-center shadow-lg">
            <p className="text-xs uppercase font-bold text-blue-200">
              Total Remaining
            </p>
            <p className="text-4xl font-black">{getTotalRemaining()}</p>
          </div>

          <div
            className={`p-8 rounded-[2rem] border-2 transition-colors text-center ${getPhaseColor(
              phases[currentIndex]?.name || ""
            )}`}
          >
            <p className="text-sm uppercase font-bold opacity-60 mb-2 tracking-widest">
              {isActive ? "Running" : "Ready"}
            </p>
            <h2 className="text-4xl font-black mb-1">
              {phases[currentIndex]?.name}
            </h2>
            <p className="text-lg opacity-80 mb-6">
              {phases[currentIndex]?.speed}
            </p>
            <p className="text-6xl font-mono font-bold">{formatTime(timeLeft)}</p>
          </div>

          <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800">
            <p className="text-xs font-bold text-slate-500 uppercase mb-3">
              Up Next
            </p>
            {phases[currentIndex + 1] ? (
              <div className="flex justify-between items-center gap-4">
                <p className="font-bold text-lg">
                  {phases[currentIndex + 1].name}
                </p>
                <p className="text-slate-400 text-right text-sm">
                  {phases[currentIndex + 1].duration} min •{" "}
                  {phases[currentIndex + 1].speed}
                </p>
              </div>
            ) : (
              <p className="text-emerald-500 font-bold">Finish 🎉</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={toggleTimer}
              className="flex-1 py-5 rounded-full bg-white text-black font-black flex justify-center items-center gap-2"
            >
              {isActive ? (
                <>
                  <Pause /> Pause
                </>
              ) : (
                <>
                  <Play /> Start
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              className="p-5 rounded-full bg-slate-800 text-white font-black"
            >
              <RotateCcw />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}