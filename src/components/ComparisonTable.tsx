"use client";

import { useStrategiesData } from "@/data/useStrategiesData";

export default function ComparisonTable() {
  const { conservative, weighted, aggressive, loading, error } = useStrategiesData();
  const strategies = [conservative, weighted, aggressive];
  // Helper for color and risk
  const colorMap = ["#10B981", "#8B5CF6", "#3B82F6"];
  const riskMap: Record<number, string> = { 1: "Low", 3: "Moderate", 5: "High" };
  // Calculate metrics for each strategy
  const strategyMetrics = strategies
    .map((s, i) => {
      if (!s) return null;
      const data = s.monthlyPerformance.map(m => m.value);
      const totalReturn = s.yearlyPerformance ?? 0;
      const avgMonthly = data.length ? data.reduce((a, b) => a + b, 0) / data.length : 0;
      const volatility = data.length ? Math.sqrt(data.reduce((sum, val) => sum + Math.pow(val - avgMonthly, 2), 0) / data.length) : 0;
      const sharpe = volatility ? avgMonthly / volatility : 0;
      const maxDrawdown = data.length ? Math.min(...data) : 0;
      return {
        name: s.strategyName,
        title: '',
        color: colorMap[i],
        risk: riskMap[s.riskLevel],
        totalReturn,
        yearlyReturns: [totalReturn],
        avgMonthly,
        volatility,
        sharpe,
        maxDrawdown,
        finalValue: 10000 * (1 + totalReturn / 100),
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  // Sort by total return for ranking
  const ranked = [...strategyMetrics].filter(Boolean).sort((a, b) => {
    if (!a || !b) return 0;
    return b.totalReturn - a.totalReturn;
  });
  const bestStrategy = ranked.length > 0 ? ranked[0] : null;

  const riskStyles: Record<string, string> = {
    High: "bg-red-50 text-red-600 border-red-100",
    Moderate: "bg-amber-50 text-amber-600 border-amber-100",
    Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  if (loading) return <div className="text-center py-10">Loading performance table...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!bestStrategy) return null;

  return (
    <>
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
              <p className="text-sm text-gray-500">Best Performing Strategy (2025)</p>
              <p className="text-xl font-bold text-gray-900">{bestStrategy.name}</p>
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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="min-w-[600px] w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">Rank</th>
                  <th className="text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">Strategy</th>
                  <th className="text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">2025 Return</th>
                  <th className="text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">Avg Monthly</th>
                  <th className="text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      Volatility
                      <span className="relative group">
                        <svg className="w-3.5 h-3.5 text-gray-400 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="Volatility info"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor">?</text></svg>
                        <span className="absolute left-1/2 -translate-x-1/2 top-6 z-20 w-48 bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs text-gray-700 hidden group-hover:block group-focus:block" role="tooltip">
                          Volatility measures how much returns fluctuate. Higher values mean more ups and downs.
                        </span>
                      </span>
                    </span>
                  </th>
                  <th className="text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      Sharpe
                      <span className="relative group">
                        <svg className="w-3.5 h-3.5 text-gray-400 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-label="Sharpe ratio info"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor">?</text></svg>
                        <span className="absolute left-1/2 -translate-x-1/2 top-6 z-20 w-48 bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs text-gray-700 hidden group-hover:block group-focus:block" role="tooltip">
                          Sharpe ratio shows risk-adjusted return. Higher is better (more return per unit of risk).
                        </span>
                      </span>
                    </span>
                  </th>
                  <th className="text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ranked.map((s, i) => s && (
                  <tr key={s.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 sm:px-6 py-3 sm:py-5">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                        i === 0 ? "bg-yellow-100 text-yellow-700" :
                        i === 1 ? "bg-gray-100 text-gray-600" :
                        "bg-orange-50 text-orange-600"
                      }`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-2 sm:px-6 py-3 sm:py-5">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                        <div>
                          <p className="font-semibold text-gray-900">{s.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-6 py-3 sm:py-5">
                      <span className="text-emerald-600 font-bold">+{s.totalReturn.toFixed(1)}%</span>
                    </td>
                    <td className="px-2 sm:px-6 py-3 sm:py-5 text-gray-700">+{s.avgMonthly.toFixed(2)}%</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-5 text-gray-700">{s.volatility.toFixed(2)}%</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-5 text-gray-700">{s.sharpe.toFixed(2)}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-5">
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
        <p className="text-xs text-gray-400 mt-4 max-w-2xl">
          <span className="font-semibold">How to interpret:</span> <br />
          <span className="font-medium text-emerald-600">Higher Sharpe</span> = better risk-adjusted returns. <span className="font-medium text-amber-600">Higher volatility</span> = more ups and downs. Compare all metrics before investing.
        </p>
      </>
  );
}
