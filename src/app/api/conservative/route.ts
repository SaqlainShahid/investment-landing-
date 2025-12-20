import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'performance.json');
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const { strategies } = JSON.parse(raw);
    const conservative = strategies.find((s: any) => s.strategyName === 'Conservative');
    if (!conservative) throw new Error('Not found');
    return NextResponse.json(conservative);
  } catch (e) {
    return NextResponse.json({
      strategyName: 'Conservative',
      riskLevel: 1,
      monthlyPerformance: [],
      yearlyPerformance: null,
      sinceInception: null,
      maxDrawdown: null,
      volatility: null,
      sharpeRatio: null
    });
  }
}
