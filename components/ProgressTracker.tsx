"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface Props {
  completedCount: number;
  total: number;
}

export default function ProgressTracker({ completedCount, total }: Props) {
  const percentage = Math.round((completedCount / total) * 100);

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xl">
      <div className="flex justify-between items-end mb-4">
        <div className="text-left">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Weekly Progress
          </p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {percentage}% Completed
          </h3>
        </div>
        <Activity className="text-orange-500 w-8 h-8 opacity-80" />
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-orange-400 to-red-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}