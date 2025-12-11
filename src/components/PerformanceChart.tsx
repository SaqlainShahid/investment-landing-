"use client";

import { useState } from "react";
import { 
  monthlyReturns, 
  strategies, 
  calculateCumulativeReturns, 
  calculateTotalReturn,
  calculateYearlyReturns,
  years 
} from "@/data/strategies";

type StrategyKey = keyof typeof monthlyReturns;

export default function PerformanceChart() {
  const [activeTab, setActiveTab] = useState<StrategyKey>("Strategy A");
  const [viewMode, setViewMode] = useState<"cumulative" | "monthly" | "yearly">("cumulative");
  
  const data = monthlyReturns[activeTab];
  const cumulativeData = calculateCumulativeReturns(data);
  const totalReturn = calculateTotalReturn(data);
  const yearlyReturns = calculateYearlyReturns(data);
  const activeStrategy = strategies.find(s => s.name === activeTab);
  const activeColor = activeStrategy?.color || "#3B82F6";

  // Calculate stats
  const avgMonthly = data.reduce((a, b) => a + b, 0) / data.length;
  const maxMonth = Math.max(...data);
  const minMonth = Math.min(...data);
  const positiveMonths = data.filter(d => d > 0).length;
  const volatility = Math.sqrt(data.reduce((sum, val) => sum + Math.pow(val - avgMonthly, 2), 0) / data.length);

  // Chart rendering
  const renderCumulativeChart = () => {
    const maxValue = Math.max(...cumulativeData);
    const minValue = Math.min(...cumulativeData, 100);
    const range = maxValue - minValue;
    
    const points = cumulativeData.map((value, i) => ({
      x: 50 + (i / (cumulativeData.length - 1)) * 520,
      y: 140 - ((value - minValue) / range) * 120,
      value,
    }));

    const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const areaD = `${pathD} L ${points[points.length - 1].x} 145 L ${points[0].x} 145 Z`;

    return (
      <svg viewBox="0 0 600 180" className="w-full h-72">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={activeColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={activeColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line x1="50" y1={20 + i * 30} x2="570" y2={20 + i * 30} stroke="#F3F4F6" strokeWidth="1" />
            <text x="40" y={25 + i * 30} fontSize="9" fill="#9CA3AF" textAnchor="end">
              {Math.round(maxValue - (i / 4) * range)}%
            </text>
          </g>
        ))}

        {/* Year labels */}
        {years.map((year, i) => (
          <text key={year} x={50 + i * 130} y="165" fontSize="10" fill="#6B7280">
            {year}
          </text>
        ))}

        <path d={areaD} fill="url(#areaGradient)" />
        <path d={pathD} fill="none" stroke={activeColor} strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Start and end points */}
        <circle cx={points[0].x} cy={points[0].y} r="4" fill={activeColor} />
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="5" fill={activeColor} />
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="3" fill="white" />
      </svg>
    );
  };

  const renderYearlyChart = () => {
    const maxValue = Math.max(...yearlyReturns) * 1.2;

    return (
      <svg viewBox="0 0 600 180" className="w-full h-72">
        {/* Grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="50" y1={20 + i * 35} x2="570" y2={20 + i * 35} stroke="#F3F4F6" strokeWidth="1" />
        ))}

        {/* Bars */}
        {yearlyReturns.map((value, i) => {
          const barHeight = (value / maxValue) * 140;
          const x = 80 + i * 105;
          return (
            <g key={i}>
              <rect
                x={x}
                y={160 - barHeight}
                width="60"
                height={barHeight}
                fill={activeColor}
                rx="4"
                className="hover:opacity-80 transition-opacity"
              />
              <text x={x + 30} y={150 - barHeight} textAnchor="middle" fontSize="11" fill="#374151" fontWeight="600">
                +{value.toFixed(1)}%
              </text>
              <text x={x + 30} y="175" textAnchor="middle" fontSize="10" fill="#6B7280">
                {years[i]}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-12 gap-6">
        {/* Left Stats */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
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
        <div className="col-span-12 lg:col-span-9">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{activeStrategy?.title}</h3>
                <p className="text-xs text-gray-500">{activeStrategy?.description}</p>
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
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-3">YEARLY BREAKDOWN</p>
              <div className="grid grid-cols-5 gap-2">
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
