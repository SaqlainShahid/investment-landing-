"use client";

import { useState, useMemo } from "react";
import { monthlyReturns, strategies, calculateCumulativeReturns } from "@/data/strategies";

type StrategyKey = keyof typeof monthlyReturns;

export default function InvestmentSimulator() {
  const [amount, setAmount] = useState(10000);
  const [strategy, setStrategy] = useState<StrategyKey>("Strategy A");
  const [duration, setDuration] = useState(60); // months

  const results = useMemo(() => {
    const data = monthlyReturns[strategy].slice(0, duration);
    const cumulativeReturns = calculateCumulativeReturns(data);
    
    const growthData = cumulativeReturns.map((cum, i) => ({
      month: i + 1,
      value: (amount * cum) / 100,
    }));

    const finalValue = growthData[growthData.length - 1]?.value || amount;
    const profit = finalValue - amount;
    const percentReturn = ((finalValue - amount) / amount) * 100;
    const annualizedReturn = Math.pow(finalValue / amount, 12 / duration) - 1;

    return { growthData, finalValue, profit, percentReturn, annualizedReturn };
  }, [amount, strategy, duration]);

  const activeStrategy = strategies.find(s => s.name === strategy);
  const activeColor = activeStrategy?.color || "#3B82F6";

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

  // Mini chart
  const renderGrowthChart = () => {
    const data = results.growthData;
    if (data.length === 0) return null;

    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value), amount);
    const range = maxValue - minValue || 1;

    const points = data.map((d, i) => ({
      x: (i / (data.length - 1)) * 280,
      y: 80 - ((d.value - minValue) / range) * 70,
    }));

    const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const areaD = `${pathD} L 280 85 L 0 85 Z`;

    return (
      <svg viewBox="0 0 280 100" className="w-full h-24">
        <defs>
          <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={activeColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={activeColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#growthGradient)" />
        <path d={pathD} fill="none" stroke={activeColor} strokeWidth="2" />
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="4" fill={activeColor} />
      </svg>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-6">Configure Your Simulation</h3>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[1000, 5000, 10000, 50000].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                    amount === val
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  ${val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Strategy
            </label>
            <div className="space-y-2">
              {(Object.keys(monthlyReturns) as StrategyKey[]).map((s) => {
                const strat = strategies.find(st => st.name === s);
                return (
                  <button
                    key={s}
                    onClick={() => setStrategy(s)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      strategy === s
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: strat?.color }} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{s}</p>
                        <p className="text-xs text-gray-500">{strat?.title}</p>
                      </div>
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                        strat?.risk === "High" ? "bg-red-50 text-red-600" :
                        strat?.risk === "Moderate" ? "bg-amber-50 text-amber-600" :
                        "bg-emerald-50 text-emerald-600"
                      }`}>
                        {strat?.risk}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration: <span className="text-blue-600">{Math.floor(duration / 12)} years {duration % 12} months</span>
            </label>
            <input
              type="range"
              min="12"
              max="60"
              step="12"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 year</span>
              <span>3 years</span>
              <span>5 years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: activeColor }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40" />
        
        <div className="relative z-10 p-6 h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/70 text-sm">Simulation Results</p>
              <p className="text-white font-semibold">{strategy}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-1.5">
              <p className="text-white text-xs">{Math.floor(duration / 12)}Y {duration % 12}M</p>
            </div>
          </div>

          {/* Growth Chart */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-4">
            <p className="text-white/70 text-xs mb-2">Portfolio Growth</p>
            {renderGrowthChart()}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-white/60 text-xs">Initial</p>
              <p className="text-white font-bold text-lg">{formatCurrency(amount)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-white/60 text-xs">Profit</p>
              <p className="text-emerald-300 font-bold text-lg">+{formatCurrency(results.profit)}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-5 mt-auto">
            <p className="text-white/60 text-xs mb-1">Final Portfolio Value</p>
            <div className="flex items-end justify-between">
              <p className="text-white font-bold text-4xl">{formatCurrency(results.finalValue)}</p>
              <div className="text-right">
                <p className="text-emerald-300 font-bold text-xl">+{results.percentReturn.toFixed(1)}%</p>
                <p className="text-white/60 text-xs">{(results.annualizedReturn * 100).toFixed(1)}% annualized</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
