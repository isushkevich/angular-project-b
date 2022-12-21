import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Data} from "./inerfaces";

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(private http: HttpClient) {
    }

    getTodoList(id): Observable<Data> {
        return this.http.get<Data>(`https://dummyjson.com/todos/user/${id}`, {headers: headers});
    }

    addTask(taskName: string, completed: Boolean, userId: number | string) {
        const body = JSON.stringify({
            todo: taskName,
            completed: completed,
            userId: userId,
        });

        return this.http.post('https://dummyjson.com/todos/add', body, {headers: headers});
    }

    editTask() {
        const body = JSON.stringify({
            completed: false,
        });
        return this.http.put('https://dummyjson.com/todos/1', body, {headers: headers});
    }

    deleteTask() {
        return this.http.delete('https://dummyjson.com/todos/1', {headers: headers});
    }
}
