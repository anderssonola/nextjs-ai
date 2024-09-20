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

  const result = await model.generateContentStream(`Recipe for ${prompt}`);

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        controller.enqueue(new TextEncoder().encode(chunkText));
      }
      controller.close();
    },
  });


  return new NextResponse(stream, { 
    headers: {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked",
    },
  });
}
