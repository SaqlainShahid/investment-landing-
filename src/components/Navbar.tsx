"use client";

export default function Navbar() {
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 w-full">
      <div className="px-2 sm:px-6 py-3 sm:py-4 flex items-center justify-between w-full">
        <div className="text-xl font-bold text-gray-900 tracking-tight">InvestPro</div>
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors min-h-[44px] flex items-center px-2">Strategies</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors min-h-[44px] flex items-center px-2">Performance</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors min-h-[44px] flex items-center px-2">Simulator</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors min-h-[44px] flex items-center px-2">Compare</a>
        </div>
        <button className="bg-blue-600 text-white px-4 sm:px-5 py-2.5 rounded-full font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-200 min-h-[44px]">Get Started</button>
      </div>
    </nav>
  );
}
