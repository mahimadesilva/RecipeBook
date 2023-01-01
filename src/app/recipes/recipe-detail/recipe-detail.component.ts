import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  // @Input() recipe: Recipe;
  id: number;
  recipe: Recipe;
  isDropdownOpen = false;
  
  constructor(
    private shoppingListService: ShoppingListService,
    private recipesService: RecipeService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.recipe = this.recipesService.getRecipeByIndex(this.id);
      }
    )
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onToShoppingList() {
    // for(let ingredient of this.recipe.ingredients){
    //   this.shoppingListService.addIngredient(ingredient);
    // }
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
  onDeleteRecipe(){
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy(): void {
    
  }
}
