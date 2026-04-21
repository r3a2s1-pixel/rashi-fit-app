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

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedDay(null);
    } else if (step === 3) {
      setStep(2);
      setSelectedType(null);
    } else if (step === 4) {
      setStep(3);
      setSelectedExercise(null);
    }
  };

  const handleDaySelect = (day: WorkoutDay) => {
    setSelectedDay(day);
    setStep(2);
  };

  const handleTypeSelect = (type: WorkoutType) => {
    setSelectedType(type);
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

    if (selectedExerciseIndex < currentList.length - 1) {
      const nextIndex = selectedExerciseIndex + 1;
      setSelectedExercise(currentList[nextIndex]);
      setSelectedExerciseIndex(nextIndex);
    } else {
      setStep(3);
      setSelectedExercise(null);
    }
  };

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
                onClick={() => handleTypeSelect("warmup")}
                className="w-full p-7 rounded-4xl bg-linear-to-br from-orange-600 to-orange-400 text-white shadow-[0_20px_50px_rgba(249,115,22,0.25)] active:scale-95 transition-transform text-left"
              >
                <Flame className="mb-5 w-10 h-10" />
                <span className="text-3xl font-black block">Warmup</span>
                <span className="text-orange-100 text-sm mt-2 block">
                  {selectedDay.warmups.length} exercises before training
                </span>
              </button>

              <button
                onClick={() => handleTypeSelect("stretch")}
                className="w-full p-7 rounded-4xl bg-linear-to-br from-blue-600 to-blue-400 text-white shadow-[0_20px_50px_rgba(59,130,246,0.25)] active:scale-95 transition-transform text-left"
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

            <div className="space-y-3">
              {getCurrentExerciseList().map((exercise, index) => (
                <button
                  key={exercise.id}
                  onClick={() => handleExerciseSelect(exercise, index)}
                  className="w-full flex items-center gap-4 p-4 rounded-3xl bg-slate-900/80 border border-white/10 active:scale-[0.98] transition-all text-left"
                >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-white/10">
                    <img
                      src={exercise.image}
                      alt={exercise.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-lg leading-tight">
                      {exercise.name}
                    </h4>
                    <p className="text-orange-400 text-sm font-semibold mt-1">
                      {exercise.reps_or_time}
                    </p>
                  </div>

                  <ChevronRight className="text-slate-500 shrink-0" size={18} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && selectedExercise && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="w-full space-y-5 pb-6"
          >
            <button
              onClick={goBack}
              className="inline-flex items-center gap-2 text-slate-400 text-sm px-4 py-2 rounded-2xl bg-slate-900/50 border border-white/5"
            >
              <ChevronLeft size={18} /> Back
            </button>

            <div className="rounded-[36px] overflow-hidden border border-white/10 bg-slate-900/85 shadow-[0_22px_60px_rgba(0,0,0,0.32)] flex flex-col">
              <div className="w-full aspect-4/3 bg-slate-800 shrink-0">
                <img
                  src={selectedExercise.image}
                  alt={selectedExercise.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-orange-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                  Exercise detail
                </p>

                <p className="text-slate-400 text-sm mb-3">
                  Exercise {selectedExerciseIndex + 1} of{" "}
                  {getCurrentExerciseList().length}
                </p>

                <h2 className="text-3xl font-black mb-3">
                  {selectedExercise.name}
                </h2>

                <p className="text-slate-400 mb-6 leading-relaxed">
                  {selectedExercise.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-slate-800/70 p-4 rounded-2xl border border-white/5 flex flex-col justify-center h-full">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1 tracking-[0.15em] shrink-0">
                      Target
                    </span>
                    <span className="font-bold text-white text-base leading-tight wrap-break-word">
                      {selectedExercise.target_muscle}
                    </span>
                  </div>

                  <div className="bg-orange-500/10 p-4 rounded-2xl border border-orange-500/20 flex flex-col justify-center h-full">
                    <span className="text-orange-400 text-[10px] uppercase font-bold block mb-1 tracking-[0.15em] shrink-0">
                      Time / Reps
                    </span>
                    <span className="font-bold text-orange-400 text-base leading-tight wrap-break-word">
                      {selectedExercise.reps_or_time}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleDoneNext}
                  className="w-full mt-auto pt-6 py-4 rounded-2xl bg-white text-black font-black flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <CheckCircle2 size={20} />
                  {selectedExerciseIndex < getCurrentExerciseList().length - 1
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