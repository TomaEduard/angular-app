import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { RecipesDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [

    { path: '', redirectTo: '/recipes', pathMatch: 'full' }, //http://localhost:4200/

    { path: 'recipes', component: RecipesComponent , children: [ //http://localhost:4200/recipes
        { path: '', component: RecipeStartComponent }, //http://localhost:4200/recipes/
        { path: 'new', component: RecipesEditComponent }, //http://localhost:4200/recipes/new
        { path: ':id', component: RecipesDetailComponent }, //http://localhost:4200/recipes/id
        { path: ':id/edit', component: RecipesEditComponent }, //http://localhost:4200/recipes/id/new

    ]}, 

    { path: 'shopping-list', component: ShoppingListComponent } //http://localhost:4200/shopping-list
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
