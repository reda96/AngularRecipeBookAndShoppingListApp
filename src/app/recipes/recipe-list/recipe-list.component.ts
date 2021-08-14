import { Component, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
  // onRecipeSelected(recipe: Recipe) {
  //   // console.log('onRecipeSelected');
  //   // console.log(recipe);

  //   this.recipeWasSelected.emit(recipe);
  // }
}
