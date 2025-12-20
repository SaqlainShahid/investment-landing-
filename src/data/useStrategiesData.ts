import { useEffect, useState } from "react";

export type StrategyApi = {
  strategyName: string;
  riskLevel: number;
  monthlyPerformance: { month: string; value: number }[];
  yearlyPerformance: number | null;
  sinceInception: number | null;
  maxDrawdown: number | null;
  volatility: number | null;
  sharpeRatio: number | null;
};

export function useStrategiesData() {
  const [data, setData] = useState<{
    conservative?: StrategyApi;
    weighted?: StrategyApi;
    aggressive?: StrategyApi;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("/api/conservative").then(r => r.json()),
      fetch("/api/weighted").then(r => r.json()),
      fetch("/api/aggressive").then(r => r.json()),
    ])
      .then(([conservative, weighted, aggressive]) => {
        setData({ conservative, weighted, aggressive });
        setLoading(false);
      })
      .catch((e) => {
        setError("Failed to load strategy data");
        setLoading(false);
      });
  }, []);

  return { ...data, loading, error };
}
