import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {UserService} from "../../user.service";
import {TodoService} from "../../todo.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Component({
    selector: 'app-todo-page',
    templateUrl: './todo-page.component.html',
    styleUrls: ['./todo-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPageComponent implements OnInit {
    public user: { [key: string]: string | number } | null;
    public tasks$: Observable<Data> | null;
    taskForm: FormGroup;

    constructor(private snackBar: MatSnackBar, private userService: UserService, private todoService: TodoService, private http: HttpClient) {
        userService.getUser.subscribe((value: { [key: string]: string | number } | null) => {
            this.user = value;
        })

        this.taskForm = new FormGroup({
            taskName: new FormControl(''),
            isCompleted: new FormControl(false),
        });
    }

    openSnackBar(content) {
        this.snackBar.open(content, 'Close', {duration: 10000, panelClass: ["snackbar"]});
    }

    ngOnInit() {
        this.tasks$ =  this.todoService.getTodoList(this.user.id);
    }

    addTask() {
        const body = JSON.stringify({
            todo: this.taskForm.value.taskName,
            completed: this.taskForm.value.isCompleted,
            userId: 5,
        });

        return this.http.post('https://dummyjson.com/todos/add', body, {headers: headers}).subscribe(data=>console.log(data))
    }
}
