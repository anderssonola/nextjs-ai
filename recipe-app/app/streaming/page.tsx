"use client";

import Loader from "@/components/loader";
import { RecipeCard } from "@/components/recipe-card";
import { Input } from "@/components/ui/input";
import { ZodRecipeSchema } from "@/src/recipeSchema";
import { parse } from "partial-json";
import { useState } from "react";
import { z } from "zod";

export default function SyncPage() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<z.infer<typeof ZodRecipeSchema>>();

  async function handleSubmit() {
    setPrompt("");
    setIsLoading(true);
    setRecipe(undefined);

    const res = await fetch("/streaming/api", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const reader = res.body?.getReader();

    if (!reader) {
      return {};
    }

    const decoder = new TextDecoder();
    let data = "";
    let parsed = {};
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      data += decoder.decode(value);
      parsed = parse(data);
      setRecipe(parsed as z.infer<typeof ZodRecipeSchema>);
    }

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={prompt}
        disabled={isLoading}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        placeholder="What recipe do you want?"
      />
      {isLoading && <Loader />}
      <RecipeCard recipe={recipe} />
    </div>
  );
}
