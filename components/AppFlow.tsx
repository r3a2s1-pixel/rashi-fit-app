"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Flame,
  Activity,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { workoutData, WorkoutDay, Exercise } from "@/data/workoutData";

type Step = 1 | 2 | 3 | 4;
type WorkoutType = "warmup" | "stretch" | null;

export default function AppFlow() {
  const [step, setStep] = useState<Step>(1);
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
  const [selectedType, setSelectedType] = useState<WorkoutType>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [selectedExerciseIndex, setSelectedExerciseIndex] =
    useState<number>(0);
  const [completedIndices, setCompletedIndices] = useState<Set<number>>(
    new Set()
  );

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedDay(null);
      setSelectedType(null);
      setSelectedExercise(null);
      setSelectedExerciseIndex(0);
      setCompletedIndices(new Set());
    } else if (step === 3) {
      setStep(2);
      setSelectedType(null);
      setSelectedExercise(null);
      setSelectedExerciseIndex(0);
      setCompletedIndices(new Set());
    } else if (step === 4) {
      setStep(3);
      setSelectedExercise(null);
    }
  };

  const handleDaySelect = (day: WorkoutDay) => {
    setSelectedDay(day);
    setSelectedType(null);
    setSelectedExercise(null);
    setSelectedExerciseIndex(0);
    setCompletedIndices(new Set());
    setStep(2);
  };

  const handleTypeSelect = (type: WorkoutType) => {
    setSelectedType(type);
    setSelectedExercise(null);
    setSelectedExerciseIndex(0);
    setCompletedIndices(new Set());
    setStep(3);
  };

  const getCurrentExerciseList = () => {
    if (!selectedDay || !selectedType) return [];

    return selectedType === "warmup"
      ? selectedDay.warmups
      : selectedDay.stretches;
  };

  const handleExerciseSelect = (exercise: Exercise, index: number) => {
    setSelectedExercise(exercise);
    setSelectedExerciseIndex(index);
    setStep(4);
  };

  const handleDoneNext = () => {
    const currentList = getCurrentExerciseList();

    setCompletedIndices((prev) => {
      const next = new Set(prev);
      next.add(selectedExerciseIndex);
      return next;
    });

    if (selectedExerciseIndex < currentList.length - 1) {
      const nextIndex = selectedExerciseIndex + 1;
      setSelectedExercise(currentList[nextIndex]);
      setSelectedExerciseIndex(nextIndex);
    } else {
      setStep(3);
      setSelectedExercise(null);
    }
  };

  const currentList = getCurrentExerciseList();
  const completedCount = completedIndices.size;
  const progressPercent =
    currentList.length > 0 ? (completedCount / currentList.length) * 100 : 0;

  return (
    <div className="w-full pb-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))]">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="w-full space-y-4"
          >
            <div className="mb-6">
              <p className="text-orange-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                Gym plan
              </p>
              <h2 className="text-3xl font-black tracking-tight">
                Select your workout day
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Choose the muscle group you want to focus on today
              </p>
            </div>

            <div className="space-y-3">
              {workoutData.map((day) => (
                <button
                  key={day.dayNumber}
                  type="button"
                  onClick={() => handleDaySelect(day)}
                  className="w-full flex items-center justify-between p-5 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-sm active:scale-[0.98] transition-all text-left shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
                >
                  <div>
                    <h3 className="text-2xl font-black text-white">
                      {day.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {day.muscleGroup}
                    </p>
                  </div>

                  <ChevronRight className="text-slate-500" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && selectedDay && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            className="w-full space-y-5"
          >
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 text-slate-400 text-sm px-4 py-2 rounded-2xl bg-slate-900/50 border border-white/5"
            >
              <ChevronLeft size={18} /> Back
            </button>

            <div>
              <p className="text-orange-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                {selectedDay.muscleGroup}
              </p>
              <h2 className="text-3xl font-black">{selectedDay.title}</h2>
              <p className="text-slate-400 text-sm mt-2">
                Choose what you want to do before or after your workout
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button
                type="button"
                onClick={() => handleTypeSelect("warmup")}
                className="w-full p-7 rounded-4xl bg-gradient-to-br from-orange-600 to-orange-400 text-white shadow-[0_20px_50px_rgba(249,115,22,0.25)] active:scale-95 transition-transform text-left"
              >
                <Flame className="mb-5 w-10 h-10" />
                <span className="text-3xl font-black block">Warmup</span>
                <span className="text-orange-100 text-sm mt-2 block">
                  {selectedDay.warmups.length} exercises before training
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTypeSelect("stretch")}
                className="w-full p-7 rounded-4xl bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-[0_20px_50px_rgba(59,130,246,0.25)] active:scale-95 transition-transform text-left"
              >
                <Activity className="mb-5 w-10 h-10" />
                <span className="text-3xl font-black block">Stretch</span>
                <span className="text-blue-100 text-sm mt-2 block">
                  {selectedDay.stretches.length} exercises after training
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && selectedDay && selectedType && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            className="w-full space-y-4"
          >
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 text-slate-400 text-sm px-4 py-2 rounded-2xl bg-slate-900/50 border border-white/5"
            >
              <ChevronLeft size={18} /> Back
            </button>

            <div className="mb-2">
              <p className="text-orange-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                {selectedDay.title}
              </p>
              <h2 className="text-3xl font-black capitalize">
                {selectedType} list
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Tap any exercise to view the image and details
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/75 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Progress
                </p>
                <p className="text-xs font-bold text-orange-400">
                  {completedCount} of {currentList.length} completed
                </p>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {currentList.map((exercise, index) => {
                const isCompleted = completedIndices.has(index);

                return (
                  <button
                    key={exercise.id}
                    type="button"
                    onClick={() => handleExerciseSelect(exercise, index)}
                    className={`w-full flex items-center gap-4 p-4 rounded-3xl border active:scale-[0.98] transition-all text-left ${
                      isCompleted
                        ? "bg-emerald-500/10 border-emerald-500/30"
                        : "bg-slate-900/80 border-white/10"
                    }`}
                  >
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-white/10">
                      <img
                        src={exercise.image}
                        alt={exercise.name}
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          isCompleted ? "opacity-55" : "opacity-100"
                        }`}
                      />

                      {isCompleted && (
                        <div className="absolute inset-0 flex items-center justify-center bg-emerald-950/45 backdrop-blur-[1px]">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400 text-slate-950 shadow-[0_0_18px_rgba(52,211,153,0.45)]">
                            <CheckCircle2 size={18} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-bold text-lg leading-tight ${
                          isCompleted ? "text-emerald-300" : "text-white"
                        }`}
                      >
                        {exercise.name}
                      </h4>
                      <p
                        className={`text-sm font-semibold mt-1 ${
                          isCompleted ? "text-emerald-400" : "text-orange-400"
                        }`}
                      >
                        {exercise.reps_or_time}
                      </p>
                    </div>

                    {isCompleted ? (
                      <CheckCircle2
                        className="text-emerald-400 shrink-0"
                        size={20}
                      />
                    ) : (
                      <ChevronRight
                        className="text-slate-500 shrink-0"
                        size={18}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 4 && selectedExercise && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            style={{
              position: "fixed",
              top: "136px",
              bottom: "max(0px, env(safe-area-inset-bottom, 0px))",
              left: "1rem",
              right: "1rem",
            }}
            className="z-40 flex flex-col"
          >
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 text-slate-400 text-xs px-3 py-1.5 rounded-2xl bg-slate-900/50 border border-white/5 self-start mb-2 shrink-0"
            >
              <ChevronLeft size={16} /> Back
            </button>

            <div className="flex-1 min-h-0 rounded-[26px] overflow-hidden border border-white/10 bg-slate-900/85 shadow-[0_18px_50px_rgba(0,0,0,0.28)] flex flex-col">
              <div className="flex-1 min-h-0 bg-white overflow-hidden">
                <img
                  src={selectedExercise.image}
                  alt={selectedExercise.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-3.5 flex flex-col shrink-0">
                <p className="text-orange-400 text-[9px] font-semibold uppercase tracking-[0.18em] mb-1">
                  Exercise detail
                </p>

                <p className="text-slate-400 text-xs mb-1">
                  Exercise {selectedExerciseIndex + 1} of{" "}
                  {currentList.length}
                </p>

                <h2 className="text-[24px] font-black mb-1 leading-[1.05] line-clamp-2">
                  {selectedExercise.name}
                </h2>

                <p className="text-slate-400 text-sm mb-2 leading-snug line-clamp-2">
                  {selectedExercise.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="bg-slate-800/70 p-3 rounded-2xl border border-white/5 flex flex-col justify-center min-h-[72px]">
                    <span className="text-slate-500 text-[8px] uppercase font-bold block mb-1 tracking-[0.14em] shrink-0">
                      Target
                    </span>
                    <span className="font-bold text-white text-sm leading-tight wrap-break-word">
                      {selectedExercise.target_muscle}
                    </span>
                  </div>

                  <div className="bg-orange-500/10 p-3 rounded-2xl border border-orange-500/20 flex flex-col justify-center min-h-[72px]">
                    <span className="text-orange-400 text-[8px] uppercase font-bold block mb-1 tracking-[0.14em] shrink-0">
                      Time / Reps
                    </span>
                    <span className="font-bold text-orange-400 text-sm leading-tight wrap-break-word">
                      {selectedExercise.reps_or_time}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDoneNext}
                  className="w-full mt-2.5 py-3 rounded-2xl bg-white text-black font-black flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <CheckCircle2 size={18} />
                  {selectedExerciseIndex < currentList.length - 1
                    ? "Next Exercise"
                    : "Done"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}