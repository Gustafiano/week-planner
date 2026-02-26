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
  optionalIngredients;

  constructor(private selection: SelectionService) {
    this.ingredients = this.selection.ingredients;
    this.optionalIngredients = this.selection.optionalIngredients;
  }
}
