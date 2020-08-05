import { AuthComponent } from './auth/auth.component';
import { RecipesDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { Routes, RouterModule } from '@angular/router';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [

    { path: '', redirectTo: '/recipes', pathMatch: 'full' },    // http://localhost:4200/

    {
        path: 'recipes',                                        // http://localhost:4200/recipes
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent },      // http://localhost:4200/recipes/
            { path: 'new', component: RecipesDetailComponent },   // http://localhost:4200/recipes/new
            {
                path: ':id',                                    // http://localhost:4200/recipes/id
                component: RecipesDetailComponent,
                resolve: [RecipesResolverService]
            },
            {
                path: ':id/edit',                               // http://localhost:4200/recipes/id/new
                component: RecipesDetailComponent,
                resolve: [RecipesResolverService]
            },
        ],
    },

    { path: 'shopping-list', component: ShoppingListComponent }, // http://localhost:4200/shopping-list

    { path: 'auth', component: AuthComponent }                  // http://localhost:4200/auth

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
