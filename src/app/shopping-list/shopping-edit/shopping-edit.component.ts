import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: true }) nameInput: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInput: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @Output() ingredientDeleted = new EventEmitter<Ingredient>();
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}
  onAddIngredient() {
    const ingredient = new Ingredient(
      this.nameInput.nativeElement.value,
      this.amountInput.nativeElement.value
    );
    this.shoppingListService.onAddIngredient(ingredient);
  }
  onDeleteIngredient() {
    this.ingredientDeleted.emit({
      name: this.nameInput.nativeElement.value,
      amount: this.amountInput.nativeElement.value,
    });
  }
}
