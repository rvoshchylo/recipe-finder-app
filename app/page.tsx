"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomSelect from "@/components/CustomSelect";

export default function Home() {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query && !cuisine && !maxTime) return;

    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (cuisine) params.append("cuisine", cuisine);
    if (maxTime) params.append("maxTime", maxTime);

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Find Your Recipe 🍽️
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Enter a recipe (e.g., pasta)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <CustomSelect
            options={["Italian", "Mexican", "Chinese"]}
            value={cuisine}
            onChange={setCuisine}
            placeholder="Select Cuisine"
          />

          <input
            type="number"
            placeholder="Max prep time (minutes)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none text-black"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
          />

          <button
            type="submit"
            className={`w-full p-3 rounded-lg text-white font-semibold text-lg select-none transition-all ${
              query && cuisine && maxTime
                ? "bg-blue-600 hover:bg-blue-700 shadow-md"
                : "bg-gray-300 cursor-not-allowed pointer-events-none"
            }`}
            disabled={!query && !cuisine && !maxTime}
          >
            Find Recipes
          </button>
        </form>
      </div>
    </div>
  );
}
