import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GeminiRecipeSchema } from "@/src/recipeSchema";

const googleModelName = "gemini-1.5-flash";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

  const model = genAI.getGenerativeModel({
    model: googleModelName,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: GeminiRecipeSchema.jsonSchema,
    },
  });

  const result = await model.generateContent(`
    Recipe for ${prompt}`);

  return NextResponse.json(JSON.parse(result.response.text() || ""));
}
