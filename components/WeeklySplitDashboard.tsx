"use client";

import { useState, useEffect } from "react";
import { workoutData, WorkoutDay, Exercise } from "@/data/workoutData";
import DayCard from "./DayCard";
import DayDetail from "./DayDetail";
import ExerciseModal from "./ExerciseModal";
import ProgressTracker from "./ProgressTracker";

export default function WeeklySplitDashboard() {
  const [selectedDay, setSelectedDay] = useState<WorkoutDay>(workoutData[0]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [isLoadingDay, setIsLoadingDay] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("fitness_progress");
    if (saved) setCompletedDays(JSON.parse(saved));
  }, []);

  const toggleDayCompletion = (dayNumber: number) => {
    const updated = completedDays.includes(dayNumber)
      ? completedDays.filter((d) => d !== dayNumber)
      : [...completedDays, dayNumber];

    setCompletedDays(updated);
    localStorage.setItem("fitness_progress", JSON.stringify(updated));
  };

  const handleSelectDay = (day: WorkoutDay) => {
    if (day.dayNumber === selectedDay.dayNumber) return;
    setIsLoadingDay(true);
    setSelectedDay(day);
    setTimeout(() => setIsLoadingDay(false), 300);
  };

  return (
    <section id="dashboard" className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <ProgressTracker completedCount={completedDays.length} total={7} />
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Your 7-Day Split
          </h2>
          {workoutData.map((day) => (
            <DayCard
              key={day.dayNumber}
              day={day}
              isSelected={selectedDay.dayNumber === day.dayNumber}
              isCompleted={completedDays.includes(day.dayNumber)}
              onClick={() => handleSelectDay(day)}
            />
          ))}
        </div>

        <div className="lg:col-span-8">
          <DayDetail
            day={selectedDay}
            isCompleted={completedDays.includes(selectedDay.dayNumber)}
            onToggleComplete={() => toggleDayCompletion(selectedDay.dayNumber)}
            onExerciseClick={setSelectedExercise}
            isLoading={isLoadingDay}
          />
        </div>
      </div>

      <ExerciseModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </section>
  );
}