import { Recipe } from './../recipe.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe1', 'This is simply a test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg'),
    new Recipe('A Test Recipe2', 'This is simply a test', 'https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305_1280.jpg'),
    new Recipe('A Test Recipe3', 'This is simply a test', 'https://cdn.pixabay.com/photo/2016/04/21/22/50/pizza-1344720_1280.jpg'),
    new Recipe('A Test Recipe4', 'This is simply a test', 'https://cdn.pixabay.com/photo/2016/11/29/13/02/cheese-1869708_1280.jpg'),
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
