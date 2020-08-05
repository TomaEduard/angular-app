

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take, exhaustMap, map, tap } from 'rxjs/operators';

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
        'https://ng-recipe-book-15758.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
        return this.http.get<Recipe[]>(
          'https://ng-recipe-book-15758.firebaseio.com/recipes.json',
        )
      .pipe(
        map(recipes => {
          // this map is a normal js map and allow us to transform the recipe intos an array
          // it will be executed for every element of array recipes
          // tslint:disable-next-line:no-shadowed-variable
          return recipes.map(recipe => {
            // if the element of array have ingredients it will be saved with his value
            // if the element of array DON'T have ingredients we'll be create an empty array for it
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        //  tab operator allow to execute some code without final operator
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
