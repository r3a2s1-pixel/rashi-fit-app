import { Calendar } from "lucide-react";

export default function WeeklyCalendar() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="text-orange-500 w-6 h-6" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Plan Your Week
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((day, idx) => (
          <div
            key={day}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex flex-col items-center"
          >
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">
              {day}
            </span>
            <span className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Day {idx + 1}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}