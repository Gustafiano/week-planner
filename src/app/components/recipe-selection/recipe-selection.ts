import { Component, OnInit } from '@angular/core';
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

  constructor(private selection: SelectionService) {}

  get selectedPortionTotal() {
    return this.selection.selected().reduce((sum, r) => sum + r.portions, 0);
  }

  ngOnInit(): void {
    this.recipes = recipes.recipes;
    this.selected = this.selection.selected;
  }

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
