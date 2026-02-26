import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Recipe } from '../../models/recipe';
import recipes from "../../../assets/recipes.json"
import { SelectionService } from '../../services/selection-service';

@Component({
  selector: 'app-recipe-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-selection.html',
  styleUrls: ['./recipe-selection.scss'],
})
export class RecipeSelection implements OnInit {
  recipes: Recipe[] = [];
  selected!: any;

  // --- Add these lines ---
  searchTerm = signal('');
  private searchTimeout: any;
  filteredRecipes = computed(() =>
    this.recipes.filter(r =>
      r.name.toLowerCase().includes(this.searchTerm().toLowerCase()) || r.category.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );
  // -----------------------

  constructor(private selection: SelectionService) {}

  get selectedPortionTotal() {
    return this.selection.selected().reduce((sum, r) => sum + r.portions, 0);
  }

  ngOnInit(): void {
    this.recipes = recipes.recipes;
    this.selected = this.selection.selected;
  }

  // --- Add this method ---
  onSearchInput(value: string) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchTerm.set(value);
    }, 10);
  }
  // ----------------------

  add(recipe: Recipe): void {
    this.selection.add(recipe);
  }

  remove(recipe: Recipe): void {
    this.selection.remove(recipe);
  }

  isSelected(recipe: Recipe): boolean {
    return this.selection.isSelected(recipe);
  }
}
