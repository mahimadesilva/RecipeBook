import { Component, Input, OnInit} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipes.service';

@Component({
  selector: 'app-recepe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(
    // private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
  }
  onRecipe(){
    // this.recipeService.recipeSelected.emit(this.recipe);
  }

}
