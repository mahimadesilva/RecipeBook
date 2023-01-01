import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  ingFormArray: FormArray;

  constructor(
    private actRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(
    (params: Params) => {
      this.id = +params['id'];
      this.editMode = (params['id'] ? true: false);
      this.initForm();
    }
    
    )
    
  }

  private initForm(){
    let name = '';
    let description = '';
    let imagePath = '';
    let ingredients: Ingredient[] = [];
    
    
    if(this.editMode){
      let recipe = this.recipeService.getRecipeByIndex(this.id);
      name = recipe.name;
      description = recipe.description;
      imagePath = recipe.imagePath;
      ingredients = recipe.ingredients;
    }
    
    this.recipeForm = new FormGroup({
      "name": new FormControl(name, Validators.required),
      "description": new FormControl(description, Validators.required),
      "imagePath": new FormControl(imagePath, Validators.required),
      "ingredients": new FormArray(ingredients?.map(
        ing => new FormGroup({
          "name": new FormControl(ing.name, Validators.required),
          "amount": new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[0-9]*$/)])
        })
      ))
    });
    this.ingFormArray = <FormArray>this.recipeForm.get('ingredients');
  }
  
  onSubmit(){
    const newRecipe = this.recipeForm.value;
    if(!newRecipe.ingredients) newRecipe.ingredients = [];
    console.log(newRecipe);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe);
    }else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(['../'], {relativeTo: this.actRoute});
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.actRoute});
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      "name": new FormControl(null, Validators.required),
      "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]*$/)])
    }));
  }
  onX(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy(): void {
  }
}
