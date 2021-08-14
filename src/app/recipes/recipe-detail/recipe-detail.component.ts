import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeDetail: Recipe;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}
  onAddIngToShoppingList() {
    this.recipeService.onAddIngredients(this.recipeDetail.ingredients);
  }
}
