import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 6),
  ];
  ingredientAdded = new Subject<Ingredient[]>();
  ingredientsAddedFromShoppingList = new Subject<Ingredient[]>();
  getIngredients() {
    return this.ingredients.slice();
  }

  onAddIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsAddedFromShoppingList.next(this.ingredients.slice());
  }
  onAddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
