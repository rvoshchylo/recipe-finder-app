import { Suspense } from "react";
import RecipeDetailsContent from '@/components/RecipeDetailsContent';
import { ButtonBack } from '@/components/ButtonBack';

export default async function RecipeDetails({ params }: { params: { id: string } }) {

  const { id } = params;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <Suspense fallback={<p className="text-center text-gray-500">Loading recipe details...</p>}>
          <RecipeDetailsContent id={id}/>
        </Suspense>

        <ButtonBack />
      </div>
    </div>
  );
}