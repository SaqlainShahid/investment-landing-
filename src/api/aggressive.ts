import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  try {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'performance.json');
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const { strategies } = JSON.parse(raw);
    const aggressive = strategies.find((s: any) => s.strategyName === 'Aggressive');
    if (!aggressive) throw new Error('Not found');
    res.status(200).json(aggressive);
  } catch (e) {
    res.status(200).json({
      strategyName: 'Aggressive',
      riskLevel: 5,
      monthlyPerformance: [],
      yearlyPerformance: null,
      sinceInception: null,
      maxDrawdown: null,
      volatility: null,
      sharpeRatio: null
    });
  }
}
