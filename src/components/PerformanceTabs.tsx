"use client";


import { useState } from "react";
import { useStrategiesData } from "@/data/useStrategiesData";

export default function PerformanceTabs() {
  const { conservative, weighted, aggressive, loading, error } = useStrategiesData();
  const strategies = [
    conservative && { key: "Conservative", data: conservative },
    weighted && { key: "Weighted", data: weighted },
    aggressive && { key: "Aggressive", data: aggressive },
  ].filter(Boolean) as Array<{ key: string; data: any }>;
  const [activeTab, setActiveTab] = useState(strategies[0]?.key || "Conservative");
  const strategy = strategies.find((s) => s.key === activeTab)?.data;
  const data = strategy?.monthlyPerformance?.map((mp: { value: number }) => mp.value) ?? [];
  const maxValue = data.length ? Math.max(...data) : 1;

  if (loading) return <div className="text-center py-10">Loading performance...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
      <div className="flex gap-1 mb-8 border-b border-gray-200">
        {strategies.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-2 -mb-px ${
              activeTab === tab.key
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:text-blue-600 hover:border-gray-300"
            }`}
          >
            {tab.key}
          </button>
        ))}
      </div>

      <div className="h-64 flex items-end gap-3">
        {data.map((value: number, index: number) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
              style={{ height: `${(value / maxValue) * 100}%` }}
            />
            <span className="text-xs text-gray-500 font-medium">
              {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][index]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
        <span className="text-gray-600 text-sm">Monthly returns over the past year</span>
        <span className="text-green-600 font-semibold">
          +{data.reduce((a: number, b: number) => a + b, 0)}% Total
        </span>
      </div>
    </div>
  );
}
