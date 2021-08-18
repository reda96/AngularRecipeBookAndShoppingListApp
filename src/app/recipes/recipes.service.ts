import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService {
  private Recipes: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'Test dESCRIPTION',
      'https://www.simplyrecipes.com/thmb/OCi18J2V8OeKDFV3FxoeKvgq74E=/1423x1067/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-a-1600-7c8292daa98e4020b447f0dc97a45cb7.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French fries', 20)]
    ),
    new Recipe(
      'Test Recipe',
      'Test dESCRIPTION',
      'https://www.simplyrecipes.com/thmb/OCi18J2V8OeKDFV3FxoeKvgq74E=/1423x1067/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-a-1600-7c8292daa98e4020b447f0dc97a45cb7.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French fries', 20)]
    ),
  ];
  recipeSelected = new EventEmitter<Recipe>();
  constructor(private slService: ShoppingListService) {}

  onAddIngredients(ings: Ingredient[]) {
    this.slService.onAddIngredients(ings);
  }
  getRecipes() {
    return this.Recipes.slice();
  }
  onAddNewRecipe(recipe: Recipe) {
    //  this.Recipes.push(recipe);
  }
}
