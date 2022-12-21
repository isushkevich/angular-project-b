import {Injectable} from '@angular/core';
import {TodoList} from "./todo/todo-page/todo-page.component";

@Injectable({
    providedIn: 'root'
})
export class GenerateIDService {

    constructor() {
    }

    generateID(todos: TodoList[]): number {

        let newID = 100;
        while (todos.some(todo => todo.id === newID)) {
            newID = Math.ceil(Math.random() * 1000);
        }
        console.log(newID)
        return newID;
    }

}
