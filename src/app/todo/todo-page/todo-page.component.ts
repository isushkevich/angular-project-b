import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {UserService} from "../../user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";

export interface TodoList {
    completed: boolean;
    id: number;
    todo: string;
    userId: number;
}

export interface Data {
    limit: number,
    skip: number,
    todos: Array<TodoList>,
    total: number,
}

@Component({
    selector: 'app-todo-page',
    templateUrl: './todo-page.component.html',
    styleUrls: ['./todo-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPageComponent implements OnInit {
    public user: { [key: string]: string | number } | null;
    public tasks$: Observable<Data> | null;

    constructor(private snackBar: MatSnackBar, private userService: UserService) {
        userService.getUser.subscribe((value: { [key: string]: string | number } | null) => {
            this.user = value;
        })
    }

    openSnackBar(content) {
        this.snackBar.open(content, 'Close', {duration: 10000, panelClass: ["snackbar"]});
    }

    ngOnInit() {
        this.tasks$ =  this.userService.getTodoList(this.user.id);
        console.log(this.tasks$)
    }
}
