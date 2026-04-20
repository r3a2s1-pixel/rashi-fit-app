import { CheckCircle2 } from "lucide-react";
import { WorkoutDay, Exercise } from "@/data/workoutData";
import ExerciseCard from "./ExerciseCard";

interface Props {
  day: WorkoutDay;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onExerciseClick: (ex: Exercise) => void;
  isLoading: boolean;
}

export default function DayDetail({
  day,
  isCompleted,
  onToggleComplete,
  onExerciseClick,
  isLoading,
}: Props) {
  const difficultyColors = {
    Beginner: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    Intermediate: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    Advanced: "text-red-500 bg-red-500/10 border-red-500/20",
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 animate-pulse h-[600px]">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-2/3 mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden transition-colors">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              {day.estimatedTime}
            </span>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                difficultyColors[day.difficulty]
              }`}
            >
              {day.difficulty}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            Day {day.dayNumber} — {day.title}
          </h2>
          <p className="text-sky-600 dark:text-sky-400 font-medium">
            Focus: {day.muscleGroup}
          </p>
        </div>

        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            isCompleted
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
              : "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20"
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          {isCompleted ? "Completed" : "Mark Complete"}
        </button>
      </div>

      <div className="space-y-12 relative z-10">
        {day.warmups.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              Before-Gym Warmup
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {day.warmups.map((ex) => (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  onClick={onExerciseClick}
                />
              ))}
            </div>
          </div>
        )}

        {day.stretches.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              After-Gym Stretches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {day.stretches.map((ex) => (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  onClick={onExerciseClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}