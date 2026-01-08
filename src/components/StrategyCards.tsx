"use client";

import { useStrategiesData } from "@/data/useStrategiesData";
import { useState } from "react";
import Modal from "@/components/Modal";

const images = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&h=300&fit=crop",
];

const riskColors: Record<1 | 3 | 5, string> = {
  1: "bg-emerald-50 text-emerald-600 border-emerald-100",
  3: "bg-amber-50 text-amber-600 border-amber-100",
  5: "bg-red-50 text-red-600 border-red-100",
};

export default function StrategyCards() {
  const { conservative, weighted, aggressive, loading, error } =
    useStrategiesData();

  const strategies = [conservative, weighted, aggressive];

  const [modalOpen, setModalOpen] = useState<number | null>(null);

  if (loading) {
    return <div className="text-center py-10">Loading strategies...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">{error}</div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {strategies.map((strategy, index) => {
          if (!strategy) return null;

          const totalReturn = strategy.yearlyPerformance ?? 0;
          const data = strategy.monthlyPerformance?.map((m: any) => m.value) ?? [];
          const volatility = strategy.volatility ?? (data.length ? Math.sqrt(data.reduce((sum: number, val: number) => sum + Math.pow(val - (data.reduce((a: number, b: number) => a + b, 0) / data.length), 2), 0) / data.length) : 0);
          const sharpe = strategy.sharpeRatio ?? (volatility ? ((data.reduce((a: number, b: number) => a + b, 0) / data.length) / volatility) : 0);
          const maxDrawdown = strategy.maxDrawdown ?? (data.length ? Math.min(...data) : 0);

          return (
            <div
              key={strategy.strategyName}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group relative"
            >
              {/* Image */}
              <div className="h-36 sm:h-44 overflow-hidden relative w-full">
                <img
                  src={images[index]}
                  alt={strategy.strategyName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Risk badge */}
                <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      riskColors[strategy.riskLevel as 1 | 3 | 5]
                    }`}
                  >
                    Risk {strategy.riskLevel}
                  </span>
                  {/* Risk scale dots */}
                  <span className="flex gap-0.5 mt-1" aria-label={`Risk level: ${strategy.riskLevel} out of 5`}>
                    {[1,2,3,4,5].map((lvl) => (
                      <span key={lvl} className={`w-2 h-2 rounded-full border ${lvl <= strategy.riskLevel ? (lvl === 1 ? 'bg-emerald-400 border-emerald-400' : lvl === 3 ? 'bg-amber-400 border-amber-400' : lvl === 5 ? 'bg-red-400 border-red-400' : 'bg-gray-300 border-gray-300') : 'bg-gray-100 border-gray-200'}`}/>
                    ))}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                    {strategy.strategyName}
                  </h3>

                  <span className="text-emerald-600 font-bold text-xs sm:text-sm bg-emerald-50 px-2 py-0.5 rounded">
                    +{totalReturn.toFixed(1)}%
                  </span>
                </div>

                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  Professionally managed crypto strategy focused on
                  risk-adjusted returns.
                </p>

                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ["#10B981", "#8B5CF6", "#3B82F6"][index],
                    }}
                  />
                  <span className="text-xs text-gray-400">
                    2025 Performance
                  </span>
                </div>

                {/* Modal trigger */}
                <div className="relative overflow-visible">
                  <button
                    className="text-xs text-blue-600 underline hover:no-underline focus:outline-none min-h-[44px] z-30 relative block w-full text-left"
                    tabIndex={0}
                    aria-haspopup="true"
                    aria-expanded={modalOpen === index}
                    style={{ zIndex: 30, position: 'relative' }}
                    onClick={() => setModalOpen(index)}
                  >
                    View risk metrics
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Modal for risk metrics */}
      <Modal open={modalOpen !== null} onClose={() => setModalOpen(null)}>
        {modalOpen !== null && (() => {
          const strategy = strategies[modalOpen];
          if (!strategy) return null;
          const data = strategy.monthlyPerformance?.map((m: any) => m.value) ?? [];
          const volatility = strategy.volatility ?? (data.length ? Math.sqrt(data.reduce((sum: number, val: number) => sum + Math.pow(val - (data.reduce((a: number, b: number) => a + b, 0) / data.length), 2), 0) / data.length) : 0);
          const sharpe = strategy.sharpeRatio ?? (volatility ? ((data.reduce((a: number, b: number) => a + b, 0) / data.length) / volatility) : 0);
          const maxDrawdown = strategy.maxDrawdown ?? (data.length ? Math.min(...data) : 0);
          return (
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-900">{strategy.strategyName} – Risk Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between"><span>Max Drawdown:</span><span className="font-semibold">{maxDrawdown.toFixed(2)}%</span></div>
                <div className="flex justify-between"><span>Volatility:</span><span className="font-semibold">{volatility.toFixed(2)}%</span></div>
                <div className="flex justify-between"><span>Sharpe Ratio:</span><span className="font-semibold">{sharpe.toFixed(2)}</span></div>
              </div>
            </div>
          );
        })()}
      </Modal>
    </>
  );
}
