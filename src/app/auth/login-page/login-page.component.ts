import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {Router} from "@angular/router"
import {SnackbarService} from "../../snackbar.service";


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
    hide: boolean;
    loginForm: FormGroup;

    constructor(private snackbarService: SnackbarService, private userService: UserService, private router: Router) {
        this.loginForm = new FormGroup({
            login: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });

        this.hide = true;
    }

    ngOnInit(): void {
    };

    onSubmit() {
        this.userService.authorize(this.loginForm.value.login, this.loginForm.value.password)
            .subscribe({
                next: (data: any) => {
                    const user = {id: data.id, username: data.username};

                    this.snackbarService.openSnackBar(`Logged in as ${user.username}`);
                    this.userService.setUser(user);
                    localStorage.setItem("user", JSON.stringify(user));
                    this.router.navigate(['/todo']);
                },
                error: error => {
                    this.snackbarService.openSnackBar(error.error.message);
                }
            })
    }
}
