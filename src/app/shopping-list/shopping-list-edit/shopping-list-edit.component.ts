import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  indexSubscription: Subscription;

  @ViewChild('f', {static: false}) ingForm: NgForm;
  constructor(public shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.indexSubscription = this.shoppingListService.editingItemIndexSubject.subscribe(
      index => {
        const ing = this.shoppingListService.getIngredientByIndex(index);
        this.ingForm.form.patchValue({
          amount: ing.amount,
          name: ing.name
        });
        this.shoppingListService.editingIndex = index;
        this.shoppingListService.ingEditMode = true;
      }
    );
  }
  onAdd() {
    const ingredient = new Ingredient(this.ingForm.value.name, this.ingForm.value.amount)
    
    if(this.shoppingListService.ingEditMode){
      this.shoppingListService.updateIngredient(this.shoppingListService.editingIndex, ingredient);
    }else{
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClear()
  }

  onClear(){
    this.ingForm.reset();
    this.shoppingListService.ingEditMode = false;
  }
  onDelete(){
    this.shoppingListService.deleteIngredient(this.shoppingListService.editingIndex);
    this.onClear();
  }
  

  ngOnDestroy(): void {
    this.indexSubscription.unsubscribe();
  }
}
