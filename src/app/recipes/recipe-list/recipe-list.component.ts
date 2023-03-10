import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recepe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesChangedSubscription: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    
    this.recipesChangedSubscription = this.recipeService.recipeListUpdated.subscribe(() => {
      this.recipes = this.recipeService.getRecipes();
    })
  }

  ngOnDestroy(): void {
    this.recipesChangedSubscription.unsubscribe();
  }

}
