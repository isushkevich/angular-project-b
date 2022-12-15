import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoPageComponent} from './todo-page/todo-page.component';
import {ContentRoutingModule} from "./todo-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TodoItemComponent} from './todo-item/todo-item.component';

@NgModule({
    declarations: [
        TodoPageComponent,
        TodoItemComponent
    ],
    imports: [
        CommonModule,
        ContentRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule
    ]
})
export class TodoModule {
}
