import { Quote } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-4">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
        <Quote className="absolute top-4 left-4 w-24 h-24 text-white/10" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
          "Consistency is the bridge between goals and accomplishment."
        </h2>
        <p className="text-orange-100 text-lg relative z-10">
          AuraFit isn't just about logging sets. It's about priming your body
          with proper warmups, executing with precision, and recovering
          optimally.
        </p>
      </div>
    </section>
  );
}