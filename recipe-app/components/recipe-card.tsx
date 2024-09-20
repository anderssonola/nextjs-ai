import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ZodRecipeSchema } from "@/src/recipeSchema";
import Markdown from "react-markdown";
import { z } from "zod";

type RecipeCardProps = { recipe?: z.infer<typeof ZodRecipeSchema> };

export function RecipeCard({ recipe }: RecipeCardProps) {
  if (!recipe || !recipe.name) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-background">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-3xl font-serif text-center">
          {recipe.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid  gap-6">
          <div className="space-y-4">
            {recipe.ingredients?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold border-b border-border pb-2">
                  Ingredients
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.ingredient}>
                      {ingredient.quantity} {ingredient.ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {recipe.steps?.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold border-b border-border pb-2">
                Steps
              </h3>
              <ol className="list-inside space-y-2">
                {recipe.steps.map((step) => (
                  <li key={step}>
                    <Markdown>{step}</Markdown>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
