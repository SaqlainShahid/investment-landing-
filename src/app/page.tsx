"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StrategyCards from "@/components/StrategyCards";
import PerformanceChart from "@/components/PerformanceChart";
import InvestmentSimulator from "@/components/InvestmentSimulator";
import ComparisonTable from "@/components/ComparisonTable";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <Hero />

      <section id="strategies" className="max-w-7xl mx-auto px-4 py-14 scroll-mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Strategies
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Explore our top-performing investment portfolios
            </p>
          </div>
          <a
            href="#"
            className="text-blue-600 text-sm font-medium hover:text-blue-700"
          >
            View all →
          </a>
        </div>
        <StrategyCards />
      </section>

      <section id="performance" className="bg-white border-y border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                5-Year Monthly Performance
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Track historical returns across different strategies
              </p>
            </div>
          </div>
          <PerformanceChart />
        </div>
      </section>

      <section id="simulator" className="max-w-7xl mx-auto px-4 py-14 scroll-mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Investment Simulator
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Calculate potential returns on your investment
            </p>
          </div>
        </div>
        <InvestmentSimulator />
      </section>

      <section id="comparison" className="bg-white border-y border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Strategy Comparison
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Compare key metrics across all strategies
              </p>
            </div>
          </div>
          <ComparisonTable />
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
