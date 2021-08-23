import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService implements OnInit {
  private Recipes: Recipe[] = [
    // new Recipe(
    //   'Big Tasty',
    //   'mcdonalds big tasty compo',
    //   `https://www.mcdonalds.eg/Cms_Data/Contents/En/Media/images/Menu/large-Image/Double-Big-Tasty.png`,
    //   [new Ingredient('Meat', 2), new Ingredient('French fries', 20)]
    // ),
    // new Recipe(
    //   'Chicken breast',
    //   'delicious boneless skinless grilled chicken breast',
    //   `https://diethood.com/wp-content/uploads/2019/09/Air-Fryer-Chicken-Breasts-6.jpg`,
    //   [
    //     new Ingredient('skinless chicken breasts', 4),
    //     new Ingredient('teaspoon salt', 1),
    //   ]
    // ),
  ];
  recipesChanged = new Subject<Recipe[]>();
  constructor(private slService: ShoppingListService) {}

  ngOnInit() {}

  onAddIngredients(ings: Ingredient[]) {
    this.slService.onAddIngredients(ings);
  }
  getRecipes() {
    return this.Recipes.slice();
  }
  setRecipes(recipes: Recipe[]) {
    this.Recipes = recipes;
    this.recipesChanged.next(this.Recipes.slice());
  }
  getRecipe(index) {
    return this.Recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.Recipes.push(recipe);
    this.recipesChanged.next(this.Recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.Recipes[index] = recipe;
    this.recipesChanged.next(this.Recipes.slice());
  }
  deleteRecipe(index: number) {
    this.Recipes.splice(index, 1);
    this.recipesChanged.next(this.Recipes.slice());
  }
}
