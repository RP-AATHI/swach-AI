import { NextResponse } from 'next/server';

export async function GET() {
    const telemetryData = [
        { id: 'TRK-042', ward: 7, status: 'deviated', driver: 'Raj K.', compliance: '68%', coordinates: { lat: 28.6139, lng: 77.2090 } },
        { id: 'TRK-105', ward: 12, status: 'active', driver: 'Suresh M.', compliance: '98%', coordinates: { lat: 28.6250, lng: 77.2100 } },
        { id: 'TRK-018', ward: 3, status: 'active', driver: 'Amit p.', compliance: '100%', coordinates: { lat: 28.6300, lng: 77.2150 } },
    ];

    return NextResponse.json(telemetryData);
}
