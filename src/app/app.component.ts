import {Component} from "@angular/core";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: "app-root",
    template: `
        <div style="text-align:center" class="content">
            <h1>
                {{title}}
            </h1>
            <nav>
                <div class="navigation">
                    <button mat-stroked-button color="accent" type="button" routerLink="/auth">Login</button>
                    <button *ngIf="this.user" mat-stroked-button color="accent" type="button"
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

    constructor(private snackBar: MatSnackBar, private userService: UserService, private router: Router) {
        userService.getUser.subscribe((value) => {
            this.user = value;
        })
    }

    openSnackBar(content) {
        this.snackBar.open(content, 'Close', {duration: 10000, panelClass: ["snackbar"]});
    }

    logOut() {
        this.userService.setUser(null);
        localStorage.clear();
        this.router.navigate(['/auth']);
        this.openSnackBar(`Logged out successfully`);
    }
}
