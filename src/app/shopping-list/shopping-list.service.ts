import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 6),
  ];
  ingredientAdded = new EventEmitter<Ingredient[]>();
  ingredientsAddedFromShoppingList = new EventEmitter<Ingredient[]>();
  getIngredients() {
    return this.ingredients.slice();
  }

  onAddIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsAddedFromShoppingList.emit(this.ingredients.slice());
  }
  onAddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
