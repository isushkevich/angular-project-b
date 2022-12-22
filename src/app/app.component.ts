import {Component} from "@angular/core";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {SnackbarService} from "./snackbar.service";

@Component({
    selector: "app-root",
    template: `
        <div style="text-align:center" class="content">
            <h1>
                {{title}}
            </h1>
            <nav>
                <div class="navigation">
                    <button mat-raised-button color="accent" type="button" routerLink="/auth">Login</button>
                    <button *ngIf="this.user" mat-raised-button color="accent" type="button"
                            routerLink="/todo">To Do List
                    </button>
                    <button *ngIf="this.user" mat-button color="warn" type="button"
                            (click)="logOut()">Logout
                    </button>
                </div>
            </nav>
        </div>
        <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    public title = "Ivan's To-Do App";
    public user: object | null;

    constructor(private snackbarService: SnackbarService, private userService: UserService, private router: Router) {
        userService.getUser.subscribe((value) => {
            this.user = value;
        })
    }

    logOut() {
        this.userService.setUser(null);
        localStorage.clear();
        this.router.navigate(['/auth']);
        this.snackbarService.openSnackBar(`Logged out successfully`);
    }
}
