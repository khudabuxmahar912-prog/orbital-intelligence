import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { question, locationData } = await req.json();
    const activeData = locationData || { name: "Selected Location", region: "Global", country: "Earth" };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        answer: `[DEMO MODE - SENTINEL AI ANALYST]
        
OBSERVATION: Analyzing selected geographic zone (${activeData.name}, ${activeData.region}). Active NDVI is ${activeData.ndvi?.avg || 0.58} with ${activeData.landCover?.agriculture || 50}% agricultural land cover.

INFERENCE: Environmental indicators (${activeData.weather?.tempC || 25}°C, ${activeData.water?.soilMoisture || 0.22} m³/m³ soil moisture) present suitable agro-climatic conditions.

LIMITATION: High-resolution field sensor verification recommended for exact localized boundaries.`
      });
    }

    const prompt = `You are SENTINEL AI ANALYST for NASA Space Apps Challenge 2026.
Analyze ONLY the following location data for the query:

LOCATION EVIDENCE:
${JSON.stringify(activeData, null, 2)}

USER QUESTION: ${question}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis generated.";

    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate AI analysis." }, { status: 500 });
  }
}