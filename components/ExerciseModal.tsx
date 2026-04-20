import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Exercise } from "@/data/workoutData";

interface Props {
  exercise: Exercise | null;
  onClose: () => void;
}

export default function ExerciseModal({ exercise, onClose }: Props) {
  return (
    <AnimatePresence>
      {exercise && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl z-50 overflow-hidden shadow-2xl"
          >
            <div className="relative h-64 bg-slate-100 dark:bg-slate-800 w-full">
              <img
                src={exercise.image}
                alt={exercise.name}
                className="w-full h-full object-cover opacity-90 dark:opacity-80"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/50 dark:bg-slate-900/80 p-2 rounded-full text-slate-900 dark:text-white hover:bg-orange-500 dark:hover:bg-orange-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-500 bg-orange-100 dark:bg-orange-500/10 px-2 py-1 rounded">
                  {exercise.type}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {exercise.target_muscle}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {exercise.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {exercise.description}
              </p>

              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex items-center justify-between border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  Suggested Reps/Time
                </span>
                <span className="text-slate-900 dark:text-white font-bold">
                  {exercise.reps_or_time}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}