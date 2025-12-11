// 60 months of monthly returns for each strategy (5 years)
export const monthlyReturns = {
  "Strategy A": [
    // Year 1
    2.1, 3.4, -1.2, 4.5, 2.8, 1.9, 3.2, -0.8, 4.1, 2.5, 3.8, 1.6,
    // Year 2
    2.8, 4.2, 0.5, 3.9, 3.1, 2.4, 4.5, 1.2, 3.6, 2.9, 4.1, 2.2,
    // Year 3
    3.5, 2.8, 1.8, 5.2, 2.1, 3.8, 2.9, 0.4, 4.8, 3.2, 2.6, 3.1,
    // Year 4
    4.2, 3.1, 2.4, 3.8, 4.5, 1.9, 5.1, 2.8, 3.4, 4.2, 2.1, 3.6,
    // Year 5
    3.8, 4.5, 1.2, 5.8, 3.2, 4.1, 3.5, 2.9, 5.2, 3.8, 4.6, 2.8,
  ],
  "Strategy B": [
    // Year 1
    1.8, 2.5, 0.8, 3.2, 2.1, 1.5, 2.8, 0.5, 3.1, 1.9, 2.6, 1.2,
    // Year 2
    2.2, 3.1, 1.2, 2.8, 2.5, 1.8, 3.2, 0.9, 2.9, 2.1, 3.0, 1.5,
    // Year 3
    2.6, 2.2, 1.5, 3.5, 1.8, 2.9, 2.4, 0.7, 3.4, 2.5, 2.1, 2.3,
    // Year 4
    3.0, 2.4, 1.8, 2.9, 3.2, 1.5, 3.6, 2.1, 2.6, 3.1, 1.7, 2.8,
    // Year 5
    2.8, 3.2, 1.0, 4.1, 2.4, 3.0, 2.6, 2.2, 3.8, 2.9, 3.4, 2.1,
  ],
  "Strategy C": [
    // Year 1
    1.2, 1.8, 0.5, 2.1, 1.5, 1.0, 1.9, 0.3, 2.0, 1.3, 1.7, 0.8,
    // Year 2
    1.5, 2.1, 0.8, 1.9, 1.7, 1.2, 2.2, 0.6, 1.8, 1.4, 2.0, 1.0,
    // Year 3
    1.8, 1.5, 1.0, 2.4, 1.2, 1.9, 1.6, 0.4, 2.3, 1.7, 1.4, 1.5,
    // Year 4
    2.0, 1.6, 1.2, 1.9, 2.2, 1.0, 2.4, 1.4, 1.7, 2.1, 1.1, 1.8,
    // Year 5
    1.9, 2.2, 0.7, 2.8, 1.6, 2.0, 1.7, 1.5, 2.5, 1.9, 2.3, 1.4,
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
