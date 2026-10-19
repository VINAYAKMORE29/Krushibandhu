import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const route = {
    Home: "/",
  dashboard: "/Dashboard",
  soil: "/soil",
  marketplace: "/marketplace",
  expenses: "/expenses",
  learn: "/learn",
  profile: "/profile",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      query,
      language = "en",
    } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        {
          type: "NONE",
          title: "Search",
          description: "Please enter something to search.",
          results: [],
        },
        { status: 400 }
      );
    }

    const languageName =
      language === "hi"
        ? "Hindi"
        : language === "mr"
          ? "Marathi"
          : "English";

    const prompt = `
You are the universal search AI for KrushiBandhu, an agricultural application.

Understand what the user is searching for.

User search:
"${query}"

Available application pages:

- Home: /
- Dashboard: /Dashboard
- Soil Study: /soil
- Marketplace: /marketplace
- Expenses: /expenses
- Learn: /learn

Your job is to identify the user's intent and return a search result.

Possible types:

NAVIGATION
CROP
SCHEME
GENERAL

Rules:

1. If the user wants to open a specific application page,
   return NAVIGATION.

2. If the user searches for a crop such as wheat, rice,
   cotton, soybean, tomato, sugarcane, etc.,
   return CROP.

3. If the user searches for a government agricultural scheme,
   return SCHEME.

4. If the search is general agriculture information,
   return GENERAL.

5. Understand English, Hindi and Marathi.

6. Understand natural language.
   For example:
   "I want to check my soil"
   means Soil Study.

7. Never invent an application route.

8. Only use these routes:
   ${Object.values(route).join(", ")}

9. If there is no suitable application page,
   do not invent a route.

10. Respond in ${languageName}.

11. Return ONLY valid JSON.
Do not use markdown.
Do not use code blocks.

JSON format:

{
  "type": "NAVIGATION | CROP | SCHEME | GENERAL",
  "title": "short result title",
  "description": "short useful description",
  "route": "valid route or null",
  "results": [
    {
      "title": "result title",
      "description": "result description",
      "route": "valid route or null"
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",

      contents: prompt,

      config: {
        maxOutputTokens: 400,
        temperature: 0.2,
      },
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    // Remove markdown if Gemini accidentally adds it
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleanText);

    return NextResponse.json(result);

  } catch (error) {
    console.error("Universal Search AI Error:", error);

    return NextResponse.json(
      {
        type: "GENERAL",
        title: "Search Error",
        description:
          "Unable to process your search right now.",
        results: [],
      },
      { status: 500 }
    );
  }
}