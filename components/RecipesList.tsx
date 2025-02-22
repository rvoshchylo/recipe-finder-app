import { fetchRecipes } from "@/lib/api/recipes";
import PaginatedRecipes from './PaginatedRecipes';
interface RecipesListProps {
  searchParams: { query?: string; cuisine?: string; maxTime?: string };
}

export default async function RecipesList({ searchParams }: RecipesListProps) {
  const { query = "", cuisine = "", maxTime = "" } = searchParams;
  const recipes = await fetchRecipes(query, cuisine, maxTime);

  return <PaginatedRecipes recipes={recipes} />;
}
