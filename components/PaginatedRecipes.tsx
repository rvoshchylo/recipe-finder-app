"use client";

import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

interface PaginatedRecipesProps {
  recipes: Recipe[];
}

const RECIPES_PER_PAGE = 6;

export default function PaginatedRecipes({ recipes }: PaginatedRecipesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);

  const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
  const visibleRecipes = recipes.slice(startIndex, startIndex + RECIPES_PER_PAGE);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleRecipes.map((recipe) => (
          <Link key={recipe.id} className="cursor-pointer bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-xl transition-all flex flex-col items-center" href={`/recipes/${recipe.id}`}>
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={300}
              height={200}
              className="rounded-md object-cover h-[200px] w-full"
            />
            <h2 className="text-xl font-semibold mt-3 text-center h-[60px] flex items-center justify-center">
              {recipe.title}
            </h2>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="px-4 py-2 bg-white border rounded-lg">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
