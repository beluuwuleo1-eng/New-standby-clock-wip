
import { GoogleGenAI, Type } from "@google/genai";
import { DailyInsight } from "../types";

export const fetchDailyInsight = async (): Promise<DailyInsight | null> => {
  try {
    // Fix: Updated initialization to use process.env.API_KEY directly as specified in the SDK guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a daily insight for a productive desktop clock app. Include an inspiring quote, a short focus tip, and a surprising historical fact for today.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: { type: Type.STRING },
            author: { type: Type.STRING },
            focus: { type: Type.STRING },
            fact: { type: Type.STRING }
          },
          required: ["quote", "author", "focus", "fact"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as DailyInsight;
  } catch (error) {
    console.error("Error fetching daily insight:", error);
    return null;
  }
};
