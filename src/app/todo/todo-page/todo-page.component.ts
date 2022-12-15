import {Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef} from '@angular/core';
import {UserService} from "../../user.service";
import {TodoService} from "../../todo.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";

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
    public todoList: Data;
    taskForm: FormGroup;

    constructor(private snackBar: MatSnackBar, private userService: UserService, private todoService: TodoService, private changeDetector: ChangeDetectorRef) {
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
       this.todoService.getTodoList(this.user.id).subscribe({
           next: (data) => {
               this.todoList = data;
               this.changeDetector.detectChanges();
           }
       })
    }

    addTask() {
        this.todoService.addTask(this.taskForm.value.taskName, this.taskForm.value.isCompleted, this.user.id)
            .subscribe({
                next: (data: any) => {
                    this.todoList.todos.push(data);
                    this.changeDetector.detectChanges();
                },
                error: error => {
                    this.openSnackBar(error.error.message);
                }
            })
    }
}
