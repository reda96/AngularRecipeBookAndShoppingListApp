import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipeDetail: Recipe;
  recipeDetail: Recipe;
  id: number;
  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const recipes = this.recipeService.getRecipes();
    // this.recipeDetail = recipes[this.route.snapshot.params['id']];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      const recipes = this.recipeService.getRecipes();
      this.recipeDetail = recipes[this.id];
    });
  }
  onAddIngToShoppingList() {
    this.recipeService.onAddIngredients(this.recipeDetail.ingredients);
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
