import { NextResponse } from 'next/server';

export async function GET() {
    const alerts = [
        {
            id: "ALT-8921",
            timestamp: new Date().toISOString(),
            type: "CRITICAL",
            message: "Ward 7: High fever correlation (84%) with missed waste collection",
            actionRecommended: "Auto-Dispatch Vector Fogging Team",
            status: "action_triggered"
        },
        {
            id: "ALT-8920",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            type: "WARNING",
            message: "Ward 12: Vehicle TRK-221 delayed by 2 hours",
            actionRecommended: "Notify Ward Supervisor",
            status: "pending"
        }
    ];

    return NextResponse.json(alerts);
}
