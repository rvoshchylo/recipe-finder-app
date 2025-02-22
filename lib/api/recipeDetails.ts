import { MAX_CACHE, TIME_FOR_CACHE } from "../constans";
import { instance } from "./instance";
import { LRUCache } from "lru-cache";

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

const cache = new LRUCache({
  max: TIME_FOR_CACHE,
  ttl: MAX_CACHE,
});

export const fetchRecipeDetails = async (id: string) => {
  const CACHE_KEY = `recipe-${id}`;

  if (cache.has(CACHE_KEY)) {
    return cache.get(CACHE_KEY);
  }

  try {
    const response = await instance.get(`/${id}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });

    cache.set(CACHE_KEY, response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};