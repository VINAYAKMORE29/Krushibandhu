import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      message,
      soilData,
      crop,
      language = "en",
      image,
    } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    if (!soilData) {
      return NextResponse.json(
        { error: "Soil data is required." },
        { status: 400 }
      );
    }

    const languageName =
      language === "hi"
        ? "Hindi"
        : language === "mr"
          ? "Marathi"
          : "English";

    const systemInstruction = `
You are KrushiBandhu AI, a helpful agricultural assistant for farmers.

You can answer:
- greetings and casual conversation
- questions about crops
- questions about soil
- fertilizer questions
- irrigation questions
- pH, N, P, K and EC questions
- crop selection questions
- plant/soil problem questions
- questions about the current sensor readings

IMPORTANT RULES:

1. Understand what the farmer is actually asking.

2. If the user is simply greeting you, respond naturally to the greeting.
   Do NOT give an unnecessary soil report.

3. If the user asks a general agriculture or crop question,
   answer that question directly.

4. If the user asks about their soil or current soil condition,
   use the supplied sensor readings.

5. If a crop is provided, use it when relevant.
   Do NOT force crop-specific advice into unrelated questions.

6. If no crop is provided and crop information is genuinely necessary,
   ask the farmer which crop they are growing.

7. Do NOT repeatedly ask for the crop if it is not necessary.

8. Answer in ${languageName}.

9. Keep answers simple, practical and easy to understand for a farmer.

10. Never pretend that a sensor reading exists if it was not provided.

11. Never change, invent or guess sensor values.

12. Clearly distinguish between actual sensor readings and general agricultural advice.

13. Do not provide universal fertilizer doses. If fertilizer quantity depends on
    crop, soil test, field size or local recommendations, explain that.

14. Do not introduce yourself unless the farmer asks who you are.

15. Do not give a complete soil report unless the farmer asks for one.

CURRENT SOIL SENSOR DATA:

Moisture: ${soilData.moisture}%
Temperature: ${soilData.temperature} °C
pH: ${soilData.ph}
Nitrogen: ${soilData.nitrogen}
Phosphorus: ${soilData.phosphorus}
Potassium: ${soilData.potassium}
Electrical Conductivity: ${soilData.ec} mS/cm
Sensor: ${soilData.connected ? "Connected" : "Disconnected"}

CROP PROVIDED BY FARMER:
${crop || "Not provided"}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",

      contents: `
${message}

Give a complete, practical and easy-to-understand answer.
Start directly with the problem and solution.
Do not introduce yourself.
`,

      config: {
        systemInstruction,
        maxOutputTokens: 300,
        temperature: 0.3,
      },
    });

    const answer = response.text;

    if (!answer) {
      throw new Error("Gemini returned an empty response.");
    }

    return NextResponse.json({
      answer,
    });

  } catch (error) {
    console.error("Gemini Soil Chat Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to get a response from Gemini.",
      },
      { status: 500 }
    );
  }
}