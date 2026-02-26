import { Component, signal } from '@angular/core';
import { RecipeSelection } from "./components/recipe-selection/recipe-selection";
import { DatePicker } from "./components/date-picker/date-picker";
import { IngredientList } from "./components/ingredient-list/ingredient-list";

@Component({
  selector: 'app-root',
  imports: [RecipeSelection, DatePicker, IngredientList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('week-planner');
}
