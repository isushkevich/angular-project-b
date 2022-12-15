import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {TodoList} from "../todo-page/todo-page.component";

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
    @Input() todos: Array<TodoList>;

    constructor() {
    }

    ngOnInit(): void {
    }

}
