import { Ingredient } from "./ingredient";

export interface Recipe {
  id: number;
  name: string;
  portions: number;
  ingredients: Ingredient[];
  optional_ingredients?: Ingredient[];
}