import { jsonSchema } from "ai";
import { z } from "zod";

export const ZodRecipeSchema = z.object({
  name: z.string().describe("Name of the recipe"),
  ingredients: z
    .array(
      z.object({
        quantity: z.string().describe("quantity of the ingredient"),
        ingredient: z
          .string()
          .describe("name of the ingredient, exclude the quantity"),
      })
    )
    .describe("List of ingredients"),
  steps: z
    .array(z.string().describe("markdown content to describe the recipe step"))
    .describe("steps of the recipe"),
});

export const GeminiRecipeSchema = jsonSchema<{
  recipe: z.infer<typeof ZodRecipeSchema>;
}>({
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Name of the recipe",
    },
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          quantity: {
            type: "string",
            description: "quantity of the ingredient",
          },
          ingredient: {
            type: "string",
            description: "name of the ingredient, exclude the quantity",
          },
        },
        required: ["quantity", "ingredient"],
      },
      description: "List of ingredients",
    },
    steps: {
      type: "array",
      items: {
        type: "string",
        description: "markdown content to describe the recipe step",
      },
      description: "steps of the recipe",
    },
  },
  required: ["name", "ingredients", "steps"],
});
