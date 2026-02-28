import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function GET() {
    const defaultAlerts = [
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

    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json(defaultAlerts);
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const prompt = `
        You are the Swachh-Ayush AI backend engine evaluating municipal waste and health events.
        Based on the current scenario where Ward 15 has had skipped collection for 2 days, and recent light rainfall has occurred, generate a JSON array of 2 active alerts.
        
        The JSON should follow exactly this schema (Respond ONLY with JSON array):
        [
          {
            "id": "ALT-XXXX",
            "timestamp": "ISO Date String",
            "type": "CRITICAL" | "WARNING" | "INFO",
            "message": "Descriptive message about the alert",
            "actionRecommended": "The automated action that should be taken",
            "status": "pending" | "action_triggered"
          }
        ]
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const textResponse = response.text;
        if (textResponse) {
            const parsedResponse = JSON.parse(textResponse);
            return NextResponse.json(parsedResponse);
        }
    } catch (error) {
        console.error("Gemini API Error in Alerts:", error);
    }

    // Fallback if AI fails or returns empty
    return NextResponse.json(defaultAlerts);
}
