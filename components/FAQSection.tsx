export default function FAQSection() {
  const faqs = [
    {
      q: "Do I need equipment for the warmups?",
      a: "Most warmups are bodyweight, but a resistance band is highly recommended.",
    },
    {
      q: "How does the progress tracker work?",
      a: "It saves locally to your browser, so no account is required.",
    },
  ];

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6"
          >
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">
              {faq.q}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}