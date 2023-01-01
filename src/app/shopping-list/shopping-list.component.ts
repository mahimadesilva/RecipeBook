import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingSubscription: Subscription;
  constructor(public shoppingListService: ShoppingListService) {
    this.ingSubscription = shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }
  ngOnDestroy(): void {
    this.ingSubscription.unsubscribe();
  }
  
  onEditItem(index: number){
    this.shoppingListService.editingItemIndexSubject.next(index);
  }
}
