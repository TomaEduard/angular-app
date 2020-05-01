import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [

    { path: '', redirectTo: '/recipes', pathMatch: 'full' }, //http://localhost:4200/
    { path: 'recipes', component: RecipesComponent }, //http://localhost:4200/recipes
    { path: 'shopping-list', component: ShoppingListComponent} //http://localhost:4200/shopping-list
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
