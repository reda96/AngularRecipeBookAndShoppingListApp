import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgModel, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput', { static: true }) nameInput: ElementRef;
  editSub: Subscription;
  @ViewChild('f', { static: true }) slForm: NgForm;
  editMode = false;
  editedItem = null;
  editedItemIndex: number;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @Output() ingredientDeleted = new EventEmitter<Ingredient>();
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.editSub = this.shoppingListService.startEditing.subscribe((index) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }
  onAddIngredient(form: NgForm) {
    const ingredient = new Ingredient(form.value.name, form.value.amount);
    if (!this.editMode) {
      this.shoppingListService.onAddIngredient(ingredient);
    } else {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        ingredient
      );
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  ngOnDestroy() {
    this.editSub.unsubscribe();
  }
  onDelete() {
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }
}
