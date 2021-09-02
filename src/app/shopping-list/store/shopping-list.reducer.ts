import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';
import * as ShoppingListAction from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 6)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};
export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListAction.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
      break;
    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
      break;
    case ShoppingListAction.UPDATE_INGREDIENT:
      const newIngs = [...state.ingredients];
      newIngs[state.editedIngredientIndex] = action.payload;
      return {
        ...state,
        ingredients: [...newIngs],
      };
      break;
    case ShoppingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ing, index) => index !== state.editedIngredientIndex
        ),
      };
      break;
    case ShoppingListAction.START_EDIT:
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload,
      };
      break;
    case ShoppingListAction.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
      break;

    default:
      return state;
  }
}
