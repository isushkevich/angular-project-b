import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoPageComponent} from './todo-page/todo-page.component';
import {ContentRoutingModule} from "./todo-routing.module";


@NgModule({
    declarations: [
        TodoPageComponent
    ],
    imports: [
        CommonModule,
        ContentRoutingModule
    ]
})
export class TodoModule {
}
