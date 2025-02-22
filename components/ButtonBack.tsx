"use client";

import { useRouter } from 'next/navigation';

export const ButtonBack = () => {

  const router = useRouter();
  return (
    <button
    className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
    onClick={() => router.back()}
  >
    🔙 Back to Recipes
  </button>
  )
}