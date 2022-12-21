import {Injectable} from '@angular/core';
import {TodoItem} from "./inerfaces";

@Injectable({
    providedIn: 'root'
})
export class GenerateIDService {

    constructor() {
    }

    generateID(todos: TodoItem[]): number {

        let newID = 100;
        while (todos.some(todo => todo.id === newID)) {
            newID = Math.ceil(Math.random() * 1000);
        }
        console.log(newID)
        return newID;
    }

}
