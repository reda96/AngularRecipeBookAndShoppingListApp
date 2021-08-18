import { Component, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  // onRecipeSelected(recipe: Recipe) {
  //   // console.log('onRecipeSelected');
  //   // console.log(recipe);

  //   this.recipeWasSelected.emit(recipe);
  // }
}
