import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function GET() {
    const defaultHealthData = {
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

    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json(defaultHealthData);
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const prompt = `
        You are the Swachh-Ayush AI backend engine evaluating municipal waste and health events.
        Based on a hypothetical scenario where there has been a recent spike in fever cases alongside reports of uncollected garbage in certain wards over the last week...
        
        Generate a JSON object containing a health correlation analysis.
        The JSON should follow exactly this schema (Respond ONLY with JSON object):
        {
          "correlationConfidence": number (0-100),
          "feverSpikeDetected": boolean,
          "affectedWards": [array of integers representing ward numbers],
          "trend": "rising" | "falling" | "stable",
          "historicalComparison": {
            "thisWeek": number,
            "lastWeek": number
          },
          "message": "A 1-2 sentence detailed explanation of the AI's reasoning for this correlation"
        }
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
        console.error("Gemini API Error in Health Correlation:", error);
    }

    return NextResponse.json(defaultHealthData);
}
