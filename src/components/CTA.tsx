"use client";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="px-4 text-center w-full">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-blue-400 text-sm font-medium">
            Start investing in minutes
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Start Growing Your Investment Today
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          Join over 48,000 investors who trust WealthPath to help them achieve
          their financial goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
            Create Free Account
          </button>
          <button className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20">
            Schedule a Demo
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-6">
          No credit card required • Free 30-day trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}
