import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    SimpleChanges,
    ChangeDetectorRef,
    OnChanges
} from '@angular/core';
import {TodoList} from "../todo-page/todo-page.component";

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnChanges {
    @Input() todo: TodoList;
    @Input() isCompleted: boolean;

    constructor(private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        console.log(this.todo)
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes.todo.currentValue)
        if (changes.todo) {
            console.log("here")
        }
        this.todo = changes.todo.currentValue;
        this.changeDetector.detectChanges();
    }

    editTask() {

    }

    deleteTask() {

    }
}
