import { MAX_CACHE, TIME_FOR_CACHE } from "../constans";
import { instance } from "./instance";
import { LRUCache } from "lru-cache";

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

const cache = new LRUCache({
  max: MAX_CACHE,
  ttl: TIME_FOR_CACHE,
});

export const fetchRecipes = async (
  query: string,
  cuisine: string,
  maxTime: string,
) => {
  const CACHE_KEY = `recipes-${query}-${cuisine}-${maxTime}`;

  if (cache.has(CACHE_KEY)) {
    return cache.get(CACHE_KEY);
  }

  try {
    const response = await instance.get(`/complexSearch`, {
      params: {
        query,
        cuisine,
        maxReadyTime: maxTime,
        number: 10,
        apiKey: API_KEY,
      },
    });

    cache.set(CACHE_KEY, response.data.results || []);

    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
