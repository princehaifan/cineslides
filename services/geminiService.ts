
import { GoogleGenAI } from "@google/genai";

// Ensure API_KEY is available in the environment.
// The build tool (e.g., Vite, Create React App) needs to be configured
// to replace process.env.API_KEY with the actual key at build time.
// For example, using Vite, you would name the variable VITE_API_KEY.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  // A console error is better for production than throwing an error,
  // as the app can still function without the AI feature.
  console.error("API_KEY for Gemini is not configured. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const suggestQuote = async (): Promise<string> => {
  if (!apiKey) {
    return "API key not configured. Please add it to your environment variables.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Suggest a short, inspiring, cinematic quote suitable for an Instagram post. The quote should be impactful and no more than 15 words. Do not wrap it in quotes.",
      config: {
        // Disable thinking for faster, more creative responses suitable for this use case
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating quote from Gemini:", error);
    return "Could not generate a quote at this time.";
  }
};
