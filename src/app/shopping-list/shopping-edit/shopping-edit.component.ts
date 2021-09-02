import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgModel, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  editSub: Subscription;
  @ViewChild('f', { static: true }) slForm: NgForm;
  editMode = false;
  editedItem = null;
  @Output() ingredientDeleted = new EventEmitter<Ingredient>();
  constructor(private store: Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
    this.editSub = this.store.select('shoppingList').subscribe((stateData) => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onAddIngredient(form: NgForm) {
    const ingredient = new Ingredient(form.value.name, form.value.amount);
    if (!this.editMode) {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
      // this.shoppingListService.onAddIngredient(ingredient);
    } else {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
      // this.shoppingListService.updateIngredient(
      //   this.editedItemIndex,
      //   ingredient
      // );
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  ngOnDestroy() {
    this.editSub.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }
}
