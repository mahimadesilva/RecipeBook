// import { EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>()
  recipeListUpdated = new Subject<void>();
  isRecipesResolved = false;

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Test Recipe Title 1 ',
  //     'Test Recipe Description 1',
  //     'https://momentmag.com/wp-content/uploads/2010/11/sweet-potatoe-latke.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('Cheese', 2)]
  //   ),
  //   new Recipe(
  //     'Test Recipe Title 2 ',
  //     'Test Recipe Description 2',
  //     'https://www.simplyrecipes.com/thmb/JWjdE8YwikAae0KZuyy6ZJW7Utw=/3000x2001/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg',
  //     [new Ingredient('Meat', 2), new Ingredient('Buns', 2)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeListUpdated.next();
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipeByIndex(index: number) {
    return this.recipes.slice()[index];
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeListUpdated.next();
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeListUpdated.next();
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeListUpdated.next();
  }
}
