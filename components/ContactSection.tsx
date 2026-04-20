export default function ContactSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-3xl shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Ready to level up your fitness?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Join the community and share your progress with us on socials.
        </p>
        <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
          Get Started For Free
        </button>
      </div>
    </section>
  );
}