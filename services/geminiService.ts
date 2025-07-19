import { GoogleGenAI } from "@google/genai";

// Ensure the API_KEY is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

export const generateBio = async (persona: string): Promise<string> => {
  const prompt = `Generate a short, creative, and edgy musician bio for an independent artist from the Pacific Northwest who goes by the name ${persona}. The bio should be under 75 words and capture a unique vibe. For "Raw B", think gritty, urban hip-hop. For "Mr Sletner", think introspective, acoustic folk. For "Dookie Trackshoes", think quirky, experimental lo-fi beats. For "III Kings", think confident, regal hip-hop group.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
        maxOutputTokens: 150,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating bio with Gemini API:", error);
    return "Failed to generate bio. The creative sparks aren't flying right now.";
  }
};
