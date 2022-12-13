import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userChange: BehaviorSubject<null | object> = new BehaviorSubject<null | object>(null);

    public get getUser() {
        return this.userChange.asObservable();
    }

    constructor(private http: HttpClient) {
        this.setUser(JSON.parse(localStorage.getItem("user")));
    }

    authorize(login, password) {
        const body = JSON.stringify({
            username: login,
            password: password,
            // username: 'kminchelle', password: '0lelplR',
            // username": 'atuny0', password :'9uQFF1Lh'
        });

        return this.http.post('https://dummyjson.com/auth/login', body, {headers: headers});
    }

    setUser(user: object) {
        this.userChange.next(user);
    }
}
