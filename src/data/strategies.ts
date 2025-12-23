// 60 months of monthly returns for each strategy (5 years)
export const monthlyReturns = {
  // Aggressive: 50–80% annualized
  "Strategy A": [
    4.5, 5.2, 3.8, 6.1, 5.0, 4.7, 6.3, 3.9, 5.8, 4.6, 6.0, 4.2,
    5.1, 6.0, 4.3, 5.7, 5.4, 4.8, 6.2, 4.1, 5.9, 5.3, 6.1, 4.7,
    5.8, 5.2, 4.9, 6.4, 5.0, 5.7, 6.0, 4.5, 6.3, 5.1, 5.6, 5.8,
    6.2, 5.4, 4.8, 6.1, 5.9, 4.9, 6.5, 5.2, 5.7, 6.0, 5.3, 5.9,
    5.8, 6.1, 4.7, 6.6, 5.4, 6.0, 5.9, 5.2, 6.4, 5.7, 6.2, 5.3,
  ],
  // Weighted: 18–25% annualized
  "Strategy B": [
    2.2, 2.8, 1.5, 3.1, 2.7, 2.3, 3.0, 1.8, 2.9, 2.4, 3.2, 2.0,
    2.7, 3.1, 1.9, 2.8, 2.6, 2.2, 3.1, 1.7, 2.8, 2.5, 3.0, 2.3,
    2.9, 2.6, 2.1, 3.3, 2.4, 2.8, 3.0, 2.0, 3.2, 2.7, 2.5, 2.9,
    3.1, 2.8, 2.3, 3.0, 2.9, 2.4, 3.2, 2.5, 2.8, 3.1, 2.6, 2.9,
    2.8, 3.0, 2.1, 3.3, 2.7, 3.0, 2.9, 2.4, 3.1, 2.8, 3.2, 2.5,
  ],
  // Conservative: 12–15% annualized
  "Strategy C": [
    1.1, 1.4, 0.8, 1.6, 1.3, 1.0, 1.5, 0.9, 1.4, 1.2, 1.6, 1.0,
    1.3, 1.5, 1.0, 1.4, 1.3, 1.1, 1.5, 1.0, 1.4, 1.3, 1.5, 1.1,
    1.4, 1.3, 1.1, 1.6, 1.2, 1.4, 1.5, 1.0, 1.5, 1.3, 1.4, 1.5,
    1.5, 1.4, 1.1, 1.5, 1.4, 1.2, 1.6, 1.3, 1.4, 1.5, 1.2, 1.4,
    1.4, 1.5, 1.0, 1.6, 1.3, 1.5, 1.4, 1.2, 1.5, 1.4, 1.5, 1.3,
  ],
};

export const strategies = [
  {
    id: "a",
    name: "Strategy A",
    title: "Tech Titans Portfolio",
    description: "High-growth technology stocks with aggressive returns",
    risk: "High",
    color: "#3B82F6",
  },
  {
    id: "b",
    name: "Strategy B",
    title: "Balanced Growth Fund",
    description: "Mix of stocks and bonds for steady growth",
    risk: "Moderate",
    color: "#8B5CF6",
  },
  {
    id: "c",
    name: "Strategy C",
    title: "Conservative Income",
    description: "Low-risk bonds and dividend stocks",
    risk: "Low",
    color: "#10B981",
  },
];

// Calculate cumulative returns
export const calculateCumulativeReturns = (monthlyData: number[]) => {
  let cumulative = 100;
  return monthlyData.map((monthly) => {
    cumulative = cumulative * (1 + monthly / 100);
    return cumulative;
  });
};

// Calculate total return
export const calculateTotalReturn = (monthlyData: number[]) => {
  const cumulative = calculateCumulativeReturns(monthlyData);
  return ((cumulative[cumulative.length - 1] - 100) / 100) * 100;
};

// Calculate yearly returns
export const calculateYearlyReturns = (monthlyData: number[]) => {
  const yearlyReturns = [];
  for (let year = 0; year < 5; year++) {
    const yearData = monthlyData.slice(year * 12, (year + 1) * 12);
    let yearReturn = 1;
    yearData.forEach((m) => (yearReturn *= 1 + m / 100));
    yearlyReturns.push((yearReturn - 1) * 100);
  }
  return yearlyReturns;
};

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const years = ["2019", "2020", "2021", "2022", "2023"];
