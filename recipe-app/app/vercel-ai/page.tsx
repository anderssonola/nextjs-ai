"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/recipe-card";

import { ZodRecipeSchema } from "@/src/recipeSchema";
import Loader from "@/components/loader";

export default function VercelAiPage() {
  const [prompt, setPrompt] = useState("");
  const { object, submit, isLoading } = useObject({
    schema: ZodRecipeSchema,
    api: "/vercel-ai/api",
    initialValue: {
      name: "",
      ingredients: [],
      steps: [],
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={prompt}
        disabled={isLoading}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submit({ prompt });
            setPrompt("");
          }
        }}
        placeholder="What recipe do you want?"
      />
      {isLoading && <Loader />}
      <RecipeCard recipe={object as any} />
    </div>
  );
}