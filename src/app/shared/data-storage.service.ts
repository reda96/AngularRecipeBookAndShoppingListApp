import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as recipesActions from '../recipes/store/recipes.actions';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put(
        'https://recipebook-849e9-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchRecipes() {
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    return this.http
      .get<Recipe[]>(
        'https://recipebook-849e9-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredient: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.store.dispatch(new recipesActions.SetRecipes(recipes));
          // this.recipeService.setRecipes(recipes);
        })
      );
  }
}
