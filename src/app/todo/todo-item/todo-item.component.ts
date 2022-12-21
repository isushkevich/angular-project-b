import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    SimpleChanges,
    ChangeDetectorRef,
    OnChanges, Output, EventEmitter
} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TodoItem} from "../../inerfaces";

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnChanges {
    @Input() todo: TodoItem;
    @Input() isCompleted: boolean;
    @Output() onDeleteTask: EventEmitter<number> = new EventEmitter();
    @Output() onEditTask: EventEmitter<TodoItem> = new EventEmitter();
    isEditMode: boolean;
    editTaskForm: FormGroup;

    constructor(private changeDetector: ChangeDetectorRef) {
        this.editTaskForm = new FormGroup({
            taskName: new FormControl(''),
            isCompleted: new FormControl(false),
        });
    }

    ngOnInit(): void {
        this.editTaskForm.setValue({taskName: this.todo.todo, isCompleted: this.isCompleted})
    }

    ngOnChanges(changes: SimpleChanges) {
        this.todo = changes.todo.currentValue;
        this.changeDetector.detectChanges();
    }

    switchEditMode() {
        this.isEditMode = !this.isEditMode;
    }

    deleteTask() {
        this.onDeleteTask.emit(this.todo.id);
    }

    saveTask() {
        const newTask = {
            ...this.todo,
            todo: this.editTaskForm.value.taskName,
            completed: this.editTaskForm.value.isCompleted
        }
        console.log(newTask);
        this.onEditTask.emit(newTask);
        this.switchEditMode();
    }
}
