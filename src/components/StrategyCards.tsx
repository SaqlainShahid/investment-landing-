"use client";

import { strategies, monthlyReturns, calculateTotalReturn } from "@/data/strategies";

type StrategyKey = keyof typeof monthlyReturns;

const images = [
	"https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop",
	"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop",
	"https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&h=300&fit=crop",
];

const riskColors: Record<string, string> = {
	High: "bg-red-50 text-red-600 border-red-100",
	Moderate: "bg-amber-50 text-amber-600 border-amber-100",
	Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

export default function StrategyCards() {
	return (
		<div className="grid md:grid-cols-3 gap-6">
			{strategies.map((strategy, index) => {
				const totalReturn = calculateTotalReturn(
					monthlyReturns[strategy.name as StrategyKey]
				);

				return (
					<div
						key={strategy.id}
						className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
					>
						<div className="h-44 overflow-hidden relative">
							<img
								src={images[index]}
								alt={strategy.title}
								className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							/>
							<div className="absolute top-3 right-3">
								<span
									className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${riskColors[strategy.risk]}`}
								>
									{strategy.risk} Risk
								</span>
							</div>
						</div>
						<div className="p-5">
							<div className="flex items-start justify-between mb-2">
								<div>
									<h3 className="font-bold text-gray-900">
										{strategy.name}
									</h3>
									<p className="text-sm text-gray-500">
										{strategy.title}
									</p>
								</div>
								<span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded">
									+{totalReturn.toFixed(1)}%
								</span>
							</div>
							<p className="text-gray-500 text-sm leading-relaxed mb-4">
								{strategy.description}
							</p>
							<div className="flex items-center gap-2">
								<div
									className="w-3 h-3 rounded-full"
									style={{ backgroundColor: strategy.color }}
								/>
								<span className="text-xs text-gray-400">
									5-Year Performance
								</span>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
