import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipes.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-42ded-default-rtdb.firebaseio.com/recipes.json',
        recipes,
      )
      .subscribe((res) => console.log(res));
    
  }
  fetchRecipes() {
    // let token = null;
    // this.authService.user.pipe(take(1)).subscribe(user => {token = user?.token})
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-42ded-default-rtdb.firebaseio.com/recipes.json',
        // {params: new HttpParams().set('auth', token || 'unauthorized')}

      )
      .pipe(
        tap((res) => {
          this.recipeService.setRecipes(res);
        })
      );
  }
}

// rxjs operators
// take(1) => automatically unsubscribes after observable get 1 value
