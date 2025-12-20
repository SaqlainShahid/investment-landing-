"use client";

import { useStrategiesData } from "@/data/useStrategiesData";

const monthOrder = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October"
];

export default function MonthlyPerformanceTable() {
  const { conservative, weighted, aggressive, loading, error } = useStrategiesData();

  if (loading) return <div className="text-center py-10">Loading real 2025 performance...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!conservative || !weighted || !aggressive) return null;

  // Build row data for each month
  const rows = monthOrder.map((month, i) => ({
    month,
    conservative: conservative.monthlyPerformance[i]?.value ?? null,
    weighted: weighted.monthlyPerformance[i]?.value ?? null,
    aggressive: aggressive.monthlyPerformance[i]?.value ?? null,
  }));

  return (
    <section className="max-w-4xl mx-auto px-2 sm:px-4 py-8 sm:py-12" aria-labelledby="real-performance-title">
      <h2 id="real-performance-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center sm:text-left">2025 Monthly Performance (Real Results)</h2>
      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 text-center sm:text-left">Actual monthly returns for each strategy. <span className="font-medium text-green-600">Green</span> = positive, <span className="font-medium text-red-500">Red</span> = negative.</p>
      <div className="overflow-x-auto rounded-2xl shadow border border-gray-100 bg-white">
        <table className="min-w-[500px] w-full text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-500 whitespace-nowrap">Month</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-gray-700 whitespace-nowrap">Conservative</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-gray-700 whitespace-nowrap">Weighted</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold text-gray-700 whitespace-nowrap">Aggressive</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.month} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-2 sm:px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{row.month}</td>
                {["conservative", "weighted", "aggressive"].map((key) => {
                  const val = row[key as keyof typeof row];
                  if (typeof val !== "number" || isNaN(val)) {
                    return (
                      <td key={key} className="px-2 sm:px-4 py-2 text-center font-mono font-semibold text-gray-300 whitespace-nowrap">—</td>
                    );
                  }
                  return (
                    <td
                      key={key}
                      className={`px-2 sm:px-4 py-2 text-center font-mono font-semibold whitespace-nowrap ${val >= 0 ? "text-emerald-600" : "text-red-500"}`}
                    >
                      {`${val > 0 ? "+" : ""}${val.toFixed(2)}%`}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center sm:text-left">Source: Real 2025 results. For simulated/backtested data, see below.</p>
    </section>
  );
}
