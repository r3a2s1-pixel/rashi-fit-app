export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Alex R.",
      role: "Powerlifter",
      text: "The warmup routines changed the game for my shoulder health. Premium feel!",
    },
    {
      name: "Sarah M.",
      role: "Fitness Enthusiast",
      text: "I love tracking my completion. The dark mode UI is gorgeous on my phone at the gym.",
    },
  ];

  return (
    <section className="bg-slate-100 dark:bg-slate-900/50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">
          Trusted by Athletes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <p className="text-slate-600 dark:text-slate-300 italic mb-6">
                "{r.text}"
              </p>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {r.name}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {r.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}