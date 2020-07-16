import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  
  recipesChanged = new Subject<Recipe[]>();

// private recipes: Recipe[] = [
    //     new Recipe(
    //         'Tasty Schnitzel',
    //         'A super-tasty Schnitzel - just awesome!',
    //         'https://cdn.pixabay.com/photo/2017/11/10/15/04/steak-2936531_1280.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20),
    //         ]
    //     ),
    //     new Recipe(
    //         'Big Fat Burger',
    //         'What else you need to say?',
    //         'https://cdn.pixabay.com/photo/2015/04/20/13/25/burger-731298_1280.jpg',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Bacon', 2),
    //             new Ingredient('Cheese', 1),
    //         ]
    //         ),
    //     new Recipe(
    //         'A Test Recipe3',
    //         'This is simply a test',
    //         'https://cdn.pixabay.com/photo/2016/04/21/22/50/pizza-1344720_1280.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20),
    //         ]
    //     ),
    //     new Recipe(
    //         'A Test Recipe4',
    //         'This is simply a test',
    //         'https://cdn.pixabay.com/photo/2016/11/29/13/02/cheese-1869708_1280.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20),
    //         ]
    //     )
    // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  onDeleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
