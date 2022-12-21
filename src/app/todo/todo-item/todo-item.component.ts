import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    SimpleChanges,
    ChangeDetectorRef,
    OnChanges, Output, EventEmitter
} from '@angular/core';
import {TodoList} from "../todo-page/todo-page.component";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnChanges {
    @Input() todo: TodoList;
    @Input() isCompleted: boolean;
    @Output() onDeleteTask: EventEmitter<number> = new EventEmitter();
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
        this.switchEditMode();
    }
}
