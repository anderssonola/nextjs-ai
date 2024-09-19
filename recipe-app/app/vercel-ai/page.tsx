"use client";
import { Input } from "@/components/ui/input";
import { RecipeSchema } from "@/src/recipeSchema";
import { experimental_useObject as useObject } from "ai/react";
import { useState } from "react";
import { set } from "zod";

export default function VercelAiPage() {
  const [prompt, setPrompt] = useState("Spagetti Carbonara");
  const { object, submit, isLoading } = useObject({
    schema: RecipeSchema,
    api: "/vercel-ai/api",
    initialValue: { name: "", ingredients: [], steps: [] },
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
        placeholder="What recipe do you want"
      />
      {/* {isLoading && <Loading/>} */}
      <div>{JSON.stringify(object)}</div>
    </div>
  );
}
