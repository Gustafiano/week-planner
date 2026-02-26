import { Injectable, signal, computed } from '@angular/core';
import type { Recipe } from '../models/recipe';
import type { Ingredient } from '../models/ingredient';

interface AggregatedIngredient extends Ingredient {
  quantity?: string;
  unit?: string;
  recipes: number[]; // Track which recipes this ingredient comes from
}

@Injectable({ providedIn: 'root' })
export class SelectionService {
  private selectedSignal = signal<Recipe[]>([]);
  readonly selected = this.selectedSignal;

  private customIngredientsSignal = signal<Ingredient[]>([]);
  readonly customIngredients = this.customIngredientsSignal;
  
  readonly ingredients = computed(() => {
    const recipes = this.selectedSignal();
    const aggregated = new Map<string, AggregatedIngredient>();

    recipes.forEach(recipe => {
      recipe.ingredients?.forEach(ing => {
        const key = ing.name.toLowerCase();
        if (aggregated.has(key)) {
          const existing = aggregated.get(key)!;
          // Add quantities if both have numeric quantities
          if (existing.quantity && ing.quantity && !isNaN(Number(existing.quantity)) && !isNaN(Number(ing.quantity))) {
            existing.quantity = String(Number(existing.quantity) + Number(ing.quantity));
          }
          existing.recipes.push(recipe.id);
        } else {
          aggregated.set(key, {
            name: ing.name,
            quantity: ing.quantity,
            unit: ing.unit,
            recipes: [recipe.id]
          });
        }
      });
    });

    return Array.from(aggregated.values());
  });

  readonly optionalIngredients = computed(() => {
    const recipes = this.selectedSignal();
    const aggregated = new Map<string, AggregatedIngredient>();

    recipes.forEach(recipe => {
      recipe.optional_ingredients?.forEach(ing => {
        const key = ing.name.toLowerCase();
        if (aggregated.has(key)) {
          const existing = aggregated.get(key)!;
          // Add quantities if both have numeric quantities
          if (existing.quantity && ing.quantity && !isNaN(Number(existing.quantity)) && !isNaN(Number(ing.quantity))) {
            existing.quantity = String(Number(existing.quantity) + Number(ing.quantity));
          }
          existing.recipes.push(recipe.id);
        } else {
          aggregated.set(key, {
            name: ing.name,
            quantity: ing.quantity,
            unit: ing.unit,
            recipes: [recipe.id]
          });
        }
      });
    });

    return Array.from(aggregated.values());
  });

  add(recipe: Recipe) {
    if (!this.selectedSignal().find((r) => r.id === recipe.id)) {
      this.selectedSignal.set([...this.selectedSignal(), recipe]);
    }
  }

  remove(recipe: Recipe) {
    this.selectedSignal.set(this.selectedSignal().filter((r) => r.id !== recipe.id));
  }

  isSelected(recipe: Recipe) {
    return this.selectedSignal().some((r) => r.id === recipe.id);
  }

  addCustomIngredient(ingredient: Ingredient) {
    this.customIngredientsSignal.set([...this.customIngredientsSignal(), ingredient]);
  }

  removeCustomIngredient(ingredient: Ingredient) {
    this.customIngredientsSignal.set(this.customIngredientsSignal().filter((ing) => ing.name !== ingredient.name));
  }

  // addIngredient(ingredient: Ingredient) {
  //   const newIngredient: AggregatedIngredient = { ...ingredient, recipes: [] };
  //   const existing = this.ingredients().find(ing => ing.name.toLowerCase() === ingredient.name.toLowerCase());
  //   if (existing) {
  //     if (existing.quantity && ingredient.quantity && !isNaN(Number(existing.quantity)) && !isNaN(Number(ingredient.quantity))) {
  //       existing.quantity = String(Number(existing.quantity) + Number(ingredient.quantity));
  //     }
  //   }
  //   this.ingredients().push(newIngredient);
  // }


}