"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StrategyCards from "@/components/StrategyCards";
import PerformanceChart from "@/components/PerformanceChart";
import MonthlyPerformanceTable from "@/components/MonthlyPerformanceTable";
import InvestmentSimulator from "@/components/InvestmentSimulator";
import ComparisonTable from "@/components/ComparisonTable";
import CTA from "@/components/CTA";
import WhyStrategyWorks from "@/components/WhyStrategyWorks";
import RiskDisclaimer from "@/components/RiskDisclaimer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      <Header />
      <Hero />

      <section id="strategies" className="container max-w-7xl mx-auto px-2 sm:px-4 py-10 sm:py-14 scroll-mt-20">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Featured Strategies
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Explore our top-performing investment portfolios
            </p>
          </div>
          <a
            href="#"
            className="text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-700 min-h-[44px] flex items-center"
          >
            View all →
          </a>
        </div>
        <StrategyCards />
      </section>

      {/* Real 2025 performance section */}
      <MonthlyPerformanceTable />

      {/* Simulated/backtested performance section */}
      <section id="performance" className="bg-white border-y border-gray-100 scroll-mt-20">
        <div className="container max-w-7xl mx-auto px-2 sm:px-4 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Simulated / Backtested Performance (5-Year)
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Track simulated and historical returns across different strategies
              </p>
            </div>
          </div>
          <PerformanceChart />
        </div>
      </section>

      <section id="simulator" className="container max-w-7xl mx-auto px-2 sm:px-4 py-10 sm:py-14 scroll-mt-20">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Investment Simulator
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Calculate potential returns on your investment
            </p>
          </div>
        </div>
        <InvestmentSimulator />
      </section>

      <section id="comparison" className="bg-white border-y border-gray-100 scroll-mt-20">
        <div className="container max-w-7xl mx-auto px-2 sm:px-4 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Strategy Comparison
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Compare key metrics across all strategies
              </p>
            </div>
          </div>
          <ComparisonTable />
        </div>
      </section>

      <WhyStrategyWorks />
      <RiskDisclaimer />
      <CTA />
      <Footer />
    </div>
  );
}
