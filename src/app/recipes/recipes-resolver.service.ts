import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolver implements Resolve<Recipe[] | void> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.recipeService.isRecipesResolved) {
      return undefined;
    }
    this.recipeService.isRecipesResolved = true;
    return this.dataStorageService.fetchRecipes();
  }
}
