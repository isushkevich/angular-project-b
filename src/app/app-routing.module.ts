import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ContentGuardGuard} from "./content-guard.guard";


const routes: Routes = [
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {
        path: 'content',
        loadChildren: () => import('./content/content.module').then(m => m.ContentModule),
        canActivate: [ContentGuardGuard]
    },
    {path: 'todo', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)},
    {path: '', pathMatch: 'full', redirectTo: '/auth'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
