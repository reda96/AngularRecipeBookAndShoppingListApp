import * as RecipesActions from './recipes.actions';
import { Recipe } from '../recipe.model';
export interface State {
  recipes: Recipe[];
}
const initialState: State = {
  recipes: [],
};

export function recipesReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return { ...state, recipes: [...action.payload] };
    case RecipesActions.ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      };
      const newRecipes = [...state.recipes];
      newRecipes[action.payload.index] = updatedRecipe;
      return { ...state, recipes: newRecipes };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe, index) => index !== action.payload
        ),
      };

    default:
      return state;
  }
}
