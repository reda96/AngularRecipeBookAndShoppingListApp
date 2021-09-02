import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
@Injectable()
export class RecipeService implements OnInit {
  private Recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {}

  onAddIngredients(ings: Ingredient[]) {
    // this.slService.onAddIngredients(ings);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ings));
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
