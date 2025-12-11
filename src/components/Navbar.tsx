"use client";

export default function Navbar() {
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-gray-900 tracking-tight">
          InvestPro
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Strategies
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Performance
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Simulator
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Compare
          </a>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-200">
          Get Started
        </button>
      </div>
    </nav>
  );
}
