"use client";

import { motion } from "framer-motion";
import { Flame, Clock, Target, Trophy } from "lucide-react";

export default function StatsCards() {
  const stats = [
    { label: "Active Users", value: "10K+", icon: Flame, color: "text-orange-500" },
    { label: "Avg Workout", value: "60 Min", icon: Clock, color: "text-sky-500" },
    { label: "Completion Rate", value: "94%", icon: Target, color: "text-emerald-500" },
    { label: "Workouts Logged", value: "1M+", icon: Trophy, color: "text-purple-500" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm"
          >
            <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}