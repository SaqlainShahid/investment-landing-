"use client";

import { useState } from "react";

export default function Simulator() {
  const [investment, setInvestment] = useState(10000);
  const [years, setYears] = useState(5);
  const [strategy, setStrategy] = useState("growth");

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Configure Your Investment
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Investment
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800"
              placeholder="10000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Period:{" "}
            <span className="text-blue-600 font-semibold">{years} years</span>
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 year</span>
            <span>30 years</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Strategy
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 bg-white"
          >
            <option value="growth">Growth Portfolio (+24.5%)</option>
            <option value="balanced">Balanced Fund (+12.8%)</option>
            <option value="income">Income Strategy (+8.2%)</option>
          </select>
        </div>

        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
          Calculate Returns
        </button>
      </div>
    </div>
  );
}
