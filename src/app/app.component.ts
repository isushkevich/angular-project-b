import {Component} from "@angular/core";
import {UserService} from "./user.service";

@Component({
    selector: "app-root",
    template: `
        <div style="text-align:center" class="content">
            <h1>
                {{title}}
            </h1>
            <nav>
                <div class="navigation">
                    <button mat-stroked-button color="accent" type="button" routerLink="/auth">Login or Sign Up</button>
                    <button *ngIf="this.user" mat-stroked-button color="accent" type="button"
                            routerLink="/todo">To Do List
                    </button>
                    <button *ngIf="this.user" mat-stroked-button color="warn" type="button"
                            routerLink="/todo">Log Out
                    </button>
                </div>
            </nav>
        </div>
        <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    public title = "Ivan's To-Do App";
    public user: null | string;

    constructor(private userService: UserService) {
        userService.getUser.subscribe((value) => {
            this.user = value;
        })
    }
}
