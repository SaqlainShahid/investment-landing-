"use client";

import { useState } from "react";

const tabs = ["Growth Portfolio", "Balanced Fund", "Income Strategy"];

const mockData = {
  "Growth Portfolio": [12, 15, 10, 18, 22, 19, 25, 28, 24, 30, 27, 32],
  "Balanced Fund": [8, 10, 9, 11, 12, 11, 13, 14, 13, 15, 14, 16],
  "Income Strategy": [5, 6, 5, 7, 6, 7, 8, 7, 8, 9, 8, 9],
};

export default function PerformanceTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const data = mockData[activeTab as keyof typeof mockData];
  const maxValue = Math.max(...data);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
      <div className="flex gap-1 mb-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-2 -mb-px ${
              activeTab === tab
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:text-blue-600 hover:border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="h-64 flex items-end gap-3">
        {data.map((value, index) => (
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
          +{data.reduce((a, b) => a + b, 0)}% Total
        </span>
      </div>
    </div>
  );
}
