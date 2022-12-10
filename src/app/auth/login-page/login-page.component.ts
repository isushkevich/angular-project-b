import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from "../../user.service";
import {Router} from "@angular/router"


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
    hide: boolean;
    loginForm: FormGroup;

    constructor(private snackBar: MatSnackBar, private userService: UserService, private router: Router) {
        this.loginForm = new FormGroup({
            login: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });

        this.hide = true;
    }

    ngOnInit(): void {
    };

    openSnackBar(content) {
        this.snackBar.open(content, 'Close', {duration: 10000, panelClass: ["snackbar"]});
    }

    onSubmit() {
        this.userService.authorize(this.loginForm.value.login, this.loginForm.value.password)
            .subscribe({
                next: (data: any) => {
                    this.openSnackBar(`Logged in as ${data.username}`);
                    this.userService.setUser(data.username);
                    this.router.navigate(['/todo']);
                },
                error: error => {
                    this.openSnackBar(error.error.message);
                }
            })
    }
}
