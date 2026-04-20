import { motion } from "framer-motion";
import { Exercise } from "@/data/workoutData";

interface Props {
  exercise: Exercise;
  onClick: (exercise: Exercise) => void;
}

export default function ExerciseCard({ exercise, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(exercise)}
      className="group flex gap-4 cursor-pointer bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-3 rounded-xl hover:border-orange-500/50 transition-all overflow-hidden relative"
    >
      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-900">
        <img
          src={exercise.image}
          alt={exercise.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col justify-center flex-1">
        <h4 className="text-slate-900 dark:text-slate-100 font-semibold mb-1 leading-tight">
          {exercise.name}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
          {exercise.reps_or_time}
        </p>
        <span className="inline-block text-xs font-medium bg-slate-200 dark:bg-slate-900 text-sky-600 dark:text-sky-400 px-2 py-1 rounded-md w-fit">
          {exercise.target_muscle}
        </span>
      </div>
    </motion.div>
  );
}