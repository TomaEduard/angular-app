import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://ng-recipe-book-15758.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipesWithoutTransformationData() {
        this.http
            .get<Recipe[]>('https://ng-recipe-book-15758.firebaseio.com/recipes.json')
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes);
            });
    }

    fetchRecipes() {
        return this.http
          .get<Recipe[]>(
            'https://ng-recipe-book-15758.firebaseio.com/recipes.json'
          )
          // this map is a rxjs operator
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
