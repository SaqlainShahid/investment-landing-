"use client";


import { useState } from "react";
import { useStrategiesData } from "@/data/useStrategiesData";

type StrategyKey = 'Conservative' | 'Weighted' | 'Aggressive';

export default function PerformanceChart() {
  // Fetch strategies data
  const { conservative, weighted, aggressive, loading, error } = useStrategiesData();
  const [activeTab, setActiveTab] = useState<StrategyKey>('Conservative');
  const [viewMode, setViewMode] = useState<'cumulative' | 'yearly'>('cumulative');

  // Build strategies array and lookup tables
  const strategies = [
    conservative && { name: 'Conservative', color: '#10B981', ...conservative },
    weighted && { name: 'Weighted', color: '#8B5CF6', ...weighted },
    aggressive && { name: 'Aggressive', color: '#3B82F6', ...aggressive },
  ].filter(Boolean) as Array<{ name: StrategyKey; color: string } & typeof conservative>;

  const monthlyReturns: Record<StrategyKey, number[]> = {
    Conservative: conservative?.monthlyPerformance?.map(mp => mp.value) ?? [],
    Weighted: weighted?.monthlyPerformance?.map(mp => mp.value) ?? [],
    Aggressive: aggressive?.monthlyPerformance?.map(mp => mp.value) ?? [],
  };
  const years: string[] = conservative?.monthlyPerformance?.map(mp => mp.month).filter((_, i) => i % 12 === 0) ?? [];
  const yearlyReturns: number[] = conservative?.monthlyPerformance
    ? Array.from({ length: 5 }, (_, y) => {
        return monthlyReturns['Conservative'].slice(y * 12, (y + 1) * 12).reduce((a: number, b: number) => a + b, 0);
      })
    : [];

  // Find active strategy
  const activeStrategy = strategies.find((st) => st.name === activeTab);
  const activeColor = activeStrategy?.color || '#10B981';

  // Calculate stats
  const data = monthlyReturns[activeTab] || [];
  const totalReturn = data.reduce((acc: number, val: number) => acc * (1 + val / 100), 1) - 1;
  const avgMonthly = data.length ? data.reduce((a: number, b: number) => a + b, 0) / data.length : 0;
  const volatility = data.length ? Math.sqrt(data.map((x: number) => Math.pow(x - avgMonthly, 2)).reduce((a: number, b: number) => a + b, 0) / data.length) : 0;
  const maxMonth = data.length ? Math.max(...data) : 0;
  const minMonth = data.length ? Math.min(...data) : 0;
  const positiveMonths = data.filter((x: number) => x > 0).length;

  // Render chart functions (placeholders)
  const renderCumulativeChart = () => null;
  const renderYearlyChart = () => null;
  // ...existing code...

  return (
    <div className="space-y-6 overflow-x-auto">
      {/* Strategy Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        {(Object.keys(monthlyReturns) as StrategyKey[]).map((strategy) => {
          const s = strategies.find(st => st.name === strategy);
          return (
            <button
              key={strategy}
              onClick={() => setActiveTab(strategy)}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === strategy
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s?.color }} />
                {strategy}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Left Stats */}
        <div className="col-span-1 lg:col-span-3 space-y-4">
          <div 
            className="rounded-2xl p-5 border"
            style={{ 
              background: `linear-gradient(135deg, ${activeColor}15 0%, ${activeColor}05 100%)`,
              borderColor: `${activeColor}30`
            }}
          >
            <p className="text-sm text-gray-600 mb-1">5-Year Total Return</p>
            <p className="text-4xl font-bold text-gray-900">+{totalReturn.toFixed(1)}%</p>
            <p className="text-sm text-gray-500 mt-2">
              $10,000 → ${(10000 * (1 + totalReturn / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Avg Monthly</p>
              <p className="text-lg font-bold text-gray-900">+{avgMonthly.toFixed(2)}%</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Volatility</p>
              <p className="text-lg font-bold text-gray-900">{volatility.toFixed(2)}%</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Best Month</p>
              <p className="text-lg font-bold text-emerald-600">+{maxMonth.toFixed(1)}%</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Worst Month</p>
              <p className="text-lg font-bold text-red-500">{minMonth.toFixed(1)}%</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Positive Months</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ width: `${(positiveMonths / 60) * 100}%`, backgroundColor: activeColor }}
                />
              </div>
              <span className="text-sm font-bold">{positiveMonths}/60</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="col-span-1 lg:col-span-9 mt-6 lg:mt-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
              <div>
                <h3 className="font-semibold text-gray-900">{activeStrategy?.name}</h3>
              </div>
              <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setViewMode("cumulative")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    viewMode === "cumulative" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
                  }`}
                >
                  Cumulative
                </button>
                <button
                  onClick={() => setViewMode("yearly")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    viewMode === "yearly" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>

            {viewMode === "cumulative" ? renderCumulativeChart() : renderYearlyChart()}

            {/* Yearly breakdown table */}
            <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-3">YEARLY BREAKDOWN</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {yearlyReturns.map((ret, i) => (
                  <div key={i} className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">{years[i]}</p>
                    <p className={`text-sm font-bold ${ret >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {ret >= 0 ? "+" : ""}{ret.toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

