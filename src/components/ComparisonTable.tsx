"use client";

import { monthlyReturns, strategies, calculateTotalReturn, calculateYearlyReturns, years } from "@/data/strategies";

type StrategyKey = keyof typeof monthlyReturns;

export default function ComparisonTable() {
  // Calculate all metrics
  const strategyMetrics = (Object.keys(monthlyReturns) as StrategyKey[]).map((key) => {
    const data = monthlyReturns[key];
    const totalReturn = calculateTotalReturn(data);
    const yearlyReturns = calculateYearlyReturns(data);
    const avgMonthly = data.reduce((a, b) => a + b, 0) / data.length;
    const volatility = Math.sqrt(data.reduce((sum, val) => sum + Math.pow(val - avgMonthly, 2), 0) / data.length);
    const sharpe = avgMonthly / volatility;
    const maxDrawdown = Math.min(...data);
    const strategy = strategies.find(s => s.name === key);

    return {
      name: key,
      title: strategy?.title || "",
      color: strategy?.color || "#3B82F6",
      risk: strategy?.risk || "Moderate",
      totalReturn,
      yearlyReturns,
      avgMonthly,
      volatility,
      sharpe,
      maxDrawdown,
      finalValue: 10000 * (1 + totalReturn / 100),
    };
  });

  // Sort by total return for ranking
  const ranked = [...strategyMetrics].sort((a, b) => b.totalReturn - a.totalReturn);
  const bestStrategy = ranked[0];

  const riskStyles: Record<string, string> = {
    High: "bg-red-50 text-red-600 border-red-100",
    Moderate: "bg-amber-50 text-amber-600 border-amber-100",
    Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <div className="space-y-6">
      {/* Winner Card */}
      <div 
        className="rounded-2xl p-6 border-2"
        style={{ 
          background: `linear-gradient(135deg, ${bestStrategy.color}10 0%, ${bestStrategy.color}05 100%)`,
          borderColor: `${bestStrategy.color}40`
        }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: bestStrategy.color }}
          >
            🏆
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Best Performing Strategy (5 Years)</p>
            <p className="text-xl font-bold text-gray-900">{bestStrategy.name} - {bestStrategy.title}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold" style={{ color: bestStrategy.color }}>
              +{bestStrategy.totalReturn.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500">
              $10,000 → ${bestStrategy.finalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Rank</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Strategy</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">5Y Return</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Avg Monthly</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Volatility</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Sharpe</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ranked.map((s, i) => (
                <tr key={s.name} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                      i === 0 ? "bg-yellow-100 text-yellow-700" :
                      i === 1 ? "bg-gray-100 text-gray-600" :
                      "bg-orange-50 text-orange-600"
                    }`}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                      <div>
                        <p className="font-semibold text-gray-900">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-emerald-600 font-bold">+{s.totalReturn.toFixed(1)}%</span>
                  </td>
                  <td className="px-6 py-5 text-gray-700">+{s.avgMonthly.toFixed(2)}%</td>
                  <td className="px-6 py-5 text-gray-700">{s.volatility.toFixed(2)}%</td>
                  <td className="px-6 py-5 text-gray-700">{s.sharpe.toFixed(2)}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${riskStyles[s.risk]}`}>
                      {s.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Year-by-Year Comparison */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Year-by-Year Performance Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase py-3">Strategy</th>
                {years.map((year) => (
                  <th key={year} className="text-center text-xs font-semibold text-gray-500 uppercase py-3">{year}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {strategyMetrics.map((s) => (
                <tr key={s.name}>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="font-medium text-gray-900 text-sm">{s.name}</span>
                    </div>
                  </td>
                  {s.yearlyReturns.map((ret, i) => {
                    const isMax = ret === Math.max(...strategyMetrics.map(st => st.yearlyReturns[i]));
                    return (
                      <td key={i} className="text-center py-4">
                        <span className={`px-2 py-1 rounded text-sm font-semibold ${
                          isMax ? "bg-emerald-50 text-emerald-700" : "text-gray-700"
                        }`}>
                          +{ret.toFixed(1)}%
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
