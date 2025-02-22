export interface IngredientMeasure {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface Ingredient {
  id: number;
  aisle: string;
  image: string;
  consistency: "SOLID" | "LIQUID";
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: IngredientMeasure;
    metric: IngredientMeasure;
  };
}