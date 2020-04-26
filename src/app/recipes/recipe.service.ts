import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel', 
            'A super-tasty Schnitzel - just awesome!', 
            'https://cdn.pixabay.com/photo/2017/11/10/15/04/steak-2936531_1280.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20),
            ]
        ),
        new Recipe(
            'Big Fat Burger', 
            'What else you need to say?', 
            'https://cdn.pixabay.com/photo/2015/04/20/13/25/burger-731298_1280.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1),
                new Ingredient('Bacon', 2),
                new Ingredient('Cheese', 1),
            ]
            ),
        new Recipe(
            'A Test Recipe3', 
            'This is simply a test', 
            'https://cdn.pixabay.com/photo/2016/04/21/22/50/pizza-1344720_1280.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20),
            ]
        ),
        new Recipe(
            'A Test Recipe4', 
            'This is simply a test', 
            'https://cdn.pixabay.com/photo/2016/11/29/13/02/cheese-1869708_1280.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20),
            ]
        )
    ];

    constructor(private shoppingListService: ShoppingListService) {};
    
    getRecipes() {
        return this.recipes.slice();
        // return [...this.recipes];
    }

    addIngredientsToShoppingList(Ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(Ingredients)
    }
}
