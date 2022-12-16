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
    }

    ngOnChanges(changes: SimpleChanges) {
        this.todo = changes.todo.currentValue;
        this.changeDetector.detectChanges();
    }

    editTask() {

    }

    deleteTask($event: MouseEvent) {
        console.log($event)
    }
}
