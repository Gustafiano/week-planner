import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionService } from '../../services/selection-service';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredient-list.html',
  styleUrls: ['./ingredient-list.scss'],
})
export class IngredientList {
  ingredients;
  customIngredients;
  optionalIngredients;
  
  constructor(public selection: SelectionService) {
    this.ingredients = this.selection.ingredients;
    this.customIngredients = this.selection.customIngredients;
    this.optionalIngredients = this.selection.optionalIngredients;
  }

  public onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      const value = input.value.trim();
      if (value) {
        this.selection.addCustomIngredient({ name: value, quantity: '', unit: '' });
        input.value = '';
      }
    }
  }

  public removeCustomIngredient(ingredient: any) {
    this.selection.removeCustomIngredient(ingredient);
  }
}
