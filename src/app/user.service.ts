import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user: null | string;

    userChange: BehaviorSubject<null | string> = new BehaviorSubject<null | string>(null);

    public get getUser() {
        return this.userChange.asObservable();
    }

    constructor(private http: HttpClient) {
        this.user = null;
    }

    authorize(login, password) {
        const headers = {'Content-Type': 'application/json'};
        const body = JSON.stringify({
            username: login,
            password: password,
            // username: 'kminchelle', password: '0lelplR',
            // username": 'atuny0', password :'9uQFF1Lh'
        });

        return this.http.post('https://dummyjson.com/auth/login', body, {headers: headers});
    }

    setUser(username: string) {
        this.userChange.next(username);
    }
}
