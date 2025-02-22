import { fetchRecipeDetails } from "@/lib/api/recipeDetails";
import { Ingredient } from '@/types/Ingradient';
import { InstructionStep } from '@/types/InstructionSteps';
import Image from "next/image";

interface RecipeDetailsContentProps {
  id: string;
}

export default async function RecipeDetailsContent({ id }: RecipeDetailsContentProps) {
  const recipe = await fetchRecipeDetails(id);

  if (!recipe) {
    return <p className="text-red-500 text-center">Failed to load recipe details.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
        {recipe.title}
      </h1>

      {recipe.image ? (
        <div className="flex justify-center">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      ) : (
        <p className="text-gray-500 text-center">No image available</p>
      )}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-gray-100 rounded-lg">
          <span className="text-gray-600">⏳ Ready in</span>
          <p className="text-xl font-semibold">{recipe.readyInMinutes || "N/A"} min</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg">
          <span className="text-gray-600">🍽 Servings</span>
          <p className="text-xl font-semibold">{recipe.servings || "N/A"}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg">
          <span className="text-gray-600">💰 Price per serving</span>
          <p className="text-xl font-semibold">${(recipe.pricePerServing / 100).toFixed(2)}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8">🛒 Ingredients</h2>
      <ul className="mt-4 space-y-2">
        {recipe.extendedIngredients ? (
          recipe.extendedIngredients.map((ingredient: Ingredient, index: number) => (
            <li key={`${ingredient.id}-${index}`} className="flex items-center space-x-4">
              <Image
                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                alt={ingredient.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-lg text-gray-800">
                {ingredient.amount} {ingredient.unit} - {ingredient.name}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No ingredient data available</p>
        )}
      </ul>

      <h2 className="text-2xl font-bold mt-8">📖 Instructions</h2>
      {recipe.analyzedInstructions.length > 0 ? (
        <ol className="list-decimal list-inside mt-4 space-y-3">
          {recipe.analyzedInstructions[0].steps.map((step: InstructionStep) => (
            <li key={step.number} className="text-gray-700">
              {step.step}
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-gray-500">No instructions available.</p>
      )}

      <div className="mt-8 text-center">
        <a
          href={recipe.spoonacularSourceUrl}
          target="_blank"
          className="text-blue-600 hover:underline font-medium text-lg"
        >
          📌 View full recipe on Spoonacular
        </a>
      </div>
    </div>
  );
}
