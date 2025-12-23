"use client";

export default function Hero() {
  return (
    <section className="px-2 sm:px-4 py-6 sm:py-8 md:py-10 w-full">
      <div className="relative h-[320px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=500&fit=crop"
          alt="Modern skyscrapers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30" />

        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-14">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-5 w-fit">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-xs font-medium">
              Markets are open
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5 max-w-lg leading-tight text-center sm:text-left">
            Elevate Your Investment Strategy
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-md mb-2 leading-relaxed text-center sm:text-left">
            Access <span className="font-semibold text-white">Conservative</span>, <span className="font-semibold text-white">Weighted</span>, and <span className="font-semibold text-white">Aggressive</span> investment strategies—each designed for a different risk profile and financial goal.
          </p>
          <p className="text-gray-200 text-xs sm:text-sm max-w-md mb-6 sm:mb-8 leading-relaxed tracking-wide text-center sm:text-left">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" title="Low Risk" /> Low Risk
              <span className="mx-2 text-gray-400">•</span>
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400" title="Balanced" /> Balanced
              <span className="mx-2 text-gray-400">•</span>
              <span className="inline-block w-2 h-2 rounded-full bg-red-400" title="High Risk / Leverage" /> High Risk / Leverage
            </span>
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <a
              href="#strategies"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#strategies")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-600 text-white text-sm px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Explore Strategies
            </a>
            <a
              href="#simulator"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#simulator")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white/10 backdrop-blur-sm text-white text-sm px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-all border border-white/20"
            >
              Try Simulator
            </a>
          </div>
        </div>

        <div className="absolute bottom-5 right-5 md:bottom-6 md:right-6 flex gap-3">
          <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
            <p className="text-white/60 text-xs">Total AUM</p>
            <p className="text-white font-bold text-lg">$2.4B</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
            <p className="text-white/60 text-xs">Active Users</p>
            <p className="text-white font-bold text-lg">48K+</p>
          </div>
        </div>
      </div>
    </section>
  );
}
