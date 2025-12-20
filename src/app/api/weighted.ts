import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'performance.json');
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const { strategies } = JSON.parse(raw);
    const weighted = strategies.find((s: any) => s.strategyName === 'Weighted');
    if (!weighted) throw new Error('Not found');
    return NextResponse.json(weighted);
  } catch (e) {
    return NextResponse.json({
      strategyName: 'Weighted',
      riskLevel: 3,
      monthlyPerformance: [],
      yearlyPerformance: null,
      sinceInception: null,
      maxDrawdown: null,
      volatility: null,
      sharpeRatio: null
    });
  }
}
