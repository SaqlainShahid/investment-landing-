"use client";

export default function ResultCard() {
  return (
    <div className="relative rounded-xl shadow-xl overflow-hidden h-full min-h-[380px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=600')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-indigo-900/80" />

      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
            Projected Results
          </h3>
          <p className="text-white/60 text-sm">
            Based on historical performance
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-white/70 text-sm mb-1">Initial Investment</p>
            <p className="text-white text-2xl font-semibold">$10,000</p>
          </div>

          <div>
            <p className="text-white/70 text-sm mb-1">Final Value (5 Years)</p>
            <p className="text-white text-5xl font-bold">$29,842</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex-1">
              <p className="text-white/70 text-xs mb-1">Total Return</p>
              <p className="text-green-400 text-lg font-bold">+198.4%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex-1">
              <p className="text-white/70 text-xs mb-1">Yearly Avg</p>
              <p className="text-green-400 text-lg font-bold">+24.5%</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-white text-blue-900 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
          Start Investing Now
        </button>
      </div>
    </div>
  );
}
