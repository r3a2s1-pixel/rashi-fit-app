import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { WorkoutDay } from "@/data/workoutData";

interface Props {
  day: WorkoutDay;
  isSelected: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export default function DayCard({
  day,
  isSelected,
  isCompleted,
  onClick,
}: Props) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
        isSelected
          ? "bg-slate-100 dark:bg-slate-800 border-orange-500 shadow-md"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
      }`}
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-orange-600 dark:text-orange-500 uppercase">
            Day {day.dayNumber}
          </span>
          {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
        </div>

        <h3
          className={`font-bold ${
            isSelected
              ? "text-slate-900 dark:text-white"
              : "text-slate-600 dark:text-slate-300"
          }`}
        >
          {day.title}
        </h3>
      </div>

      <ChevronRight
        className={`w-5 h-5 ${
          isSelected ? "text-orange-500" : "text-slate-400 dark:text-slate-600"
        }`}
      />
    </motion.button>
  );
}