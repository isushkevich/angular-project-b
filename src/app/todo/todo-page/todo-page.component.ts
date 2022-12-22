import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../../user.service";
import {TodoService} from "../../todo.service";
import {FormControl, FormGroup} from "@angular/forms";
import {GenerateIDService} from "../../generate-id.service";
import {Data, TodoItem} from "../../inerfaces";
import {SnackbarService} from "../../snackbar.service";

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

    constructor(private snackbarService: SnackbarService, private userService: UserService, private todoService: TodoService, private changeDetector: ChangeDetectorRef, private generateIDService: GenerateIDService) {
        userService.getUser.subscribe((value: { [key: string]: string | number } | null) => {
            this.user = value;
        })

        this.taskForm = new FormGroup({
            taskName: new FormControl(''),
            isCompleted: new FormControl(false),
        });
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
                    this.snackbarService.openSnackBar(`Task '${this.taskForm.value.taskName}' created`);
                    this.taskForm.reset({taskName: '', isCompleted: false});
                    const taskWithNewId = {
                        ...data,
                        id: this.generateIDService.generateID(this.todoList.todos)
                    };
                    this.todoList.todos.push(taskWithNewId);
                    this.changeDetector.detectChanges();
                },
                error: error => {
                    this.snackbarService.openSnackBar(error.error.message);
                }
            })
    }

    deleteTask(taskId: number) {
        this.todoService.deleteTask().subscribe(
            {
                next: () => {
                    this.todoList.todos = this.todoList.todos.filter(task => task.id != taskId);
                    this.changeDetector.detectChanges();
                },
                error: error => {
                    this.snackbarService.openSnackBar(error.error.message);
                }
            }
        )
    }

    editTask(task: TodoItem) {
        this.todoService.editTask().subscribe(
            {
                next: () => {
                    for (let i in this.todoList.todos) {
                        if (this.todoList.todos[i].id === task.id) {
                            this.todoList.todos[i] = task;
                        }
                    }
                    this.changeDetector.detectChanges();
                },
                error: error => {
                    this.snackbarService.openSnackBar(error.error.message);
                }
            }
        )
    }
}
