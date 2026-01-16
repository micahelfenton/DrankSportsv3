
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestionData } from "../types";

export async function generateSportsQuiz(sport: string): Promise<QuizQuestionData> {
  // Create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a challenging but fun trivia question about ${sport}. Include 4 options and mark the correct one.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Array of exactly 4 options"
            },
            correctAnswer: { 
              type: Type.INTEGER,
              description: "0-indexed index of the correct option"
            }
          },
          required: ["text", "options", "correctAnswer"]
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    return {
      text: data.text || "Which team has the most championships?",
      options: data.options || ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: data.correctAnswer ?? 0,
      penalty: "2 SIPS"
    };
  } catch (error) {
    console.error("Gemini failed to generate quiz:", error);
    // Fallback static question
    return {
      text: `Which ${sport} player is considered the 'G.O.A.T' by many fans?`,
      options: ["The Veteran", "The Rookie", "The Legend", "The Phenom"],
      correctAnswer: 2,
      penalty: "2 SIPS"
    };
  }
}
