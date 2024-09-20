import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";

import { ZodRecipeSchema } from "@/src/recipeSchema";

const googleModelName = "gemini-1.5-flash";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const { object } = await generateObject({
    model: google(googleModelName),
    schema: ZodRecipeSchema,
    prompt: `Recipe for ${prompt}`,
  });

  return NextResponse.json(object);
}
