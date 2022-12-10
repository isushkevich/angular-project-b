import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TodoGuard} from "./todo.guard";


const routes: Routes = [
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {path: 'todo', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule), canActivate: [TodoGuard]},
    {path: '', pathMatch: 'full', redirectTo: '/auth'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
