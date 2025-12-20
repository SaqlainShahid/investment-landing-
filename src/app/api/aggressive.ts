import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'performance.json');
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const { strategies } = JSON.parse(raw);
    const aggressive = strategies.find((s: any) => s.strategyName === 'Aggressive');
    if (!aggressive) throw new Error('Not found');
    return NextResponse.json(aggressive);
  } catch (e) {
    return NextResponse.json({
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
