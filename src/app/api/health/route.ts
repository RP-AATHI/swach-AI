import { NextResponse } from 'next/server';

export async function GET() {
    const healthData = {
        correlationConfidence: 84,
        feverSpikeDetected: true,
        affectedWards: [7, 12],
        trend: 'rising',
        historicalComparison: {
            thisWeek: 120,
            lastWeek: 45
        },
        message: 'AI Model detected 84% correlation between missed waste collection and rising fever cases in Ward 7.'
    };

    return NextResponse.json(healthData);
}
