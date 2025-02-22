import RecipesList from '@/components/RecipesList';
import { Suspense } from "react";

export default function RecipesPage({ searchParams }: { searchParams: { query?: string; cuisine?: string; maxTime?: string } }) {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Recipe Results 🍽️
        </h1>

        <Suspense fallback={<p className="text-center text-gray-500">Loading recipes...</p>}>
          <RecipesList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
