"use client";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-10">
      <div className="relative h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=500&fit=crop"
          alt="Modern skyscrapers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30" />

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-5 w-fit">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-xs font-medium">
              Markets are open
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 max-w-lg leading-tight">
            Elevate Your Investment Strategy
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-md mb-8 leading-relaxed">
            Unlock the potential of your investments with WealthPath&apos;s
            advanced performance analysis tools and data-driven insights.
          </p>
          <div className="flex flex-wrap gap-3">
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
