import { Component, OnInit, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '..//../recipes.service';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  // @Output() recipeSelected = new EventEmitter<void>();
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}
  onSelected() {
    // console.log('onSelected');

    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
