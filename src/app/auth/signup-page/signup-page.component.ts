import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SnackbarService} from "../../snackbar.service";

@Component({
    selector: 'app-signup-page',
    templateUrl: './signup-page.component.html',
    styleUrls: ['./signup-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPageComponent implements OnInit {
    signUpForm: FormGroup;
    hidePassword: boolean;
    hidePasswordRepeat: boolean;

    constructor(private snackbarService: SnackbarService, private router: Router) {
        this.signUpForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            login: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(64)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(64), Validators.pattern(/[a-zA-Z]/), Validators.pattern(/\d/)]),
            passwordRepeat: new FormControl('', [Validators.required, myValidator]),
            telephone: new FormControl('', [Validators.minLength(9), Validators.maxLength(15), Validators.pattern(/^[0-9]*$/)]),
        });

        this.signUpForm.controls.password.valueChanges.subscribe(() => {
            this.signUpForm.controls.passwordRepeat.updateValueAndValidity()
        })

        this.hidePassword = true;
        this.hidePasswordRepeat = true;
    }

    ngOnInit(): void {
    }

    onSubmit() {
        fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.signUpForm.value.email,
                username: this.signUpForm.value.login,
                password: this.signUpForm.value.password,
                phone: this.signUpForm.value.telephone
            })
        })
            .then(res => res.json())
            .then(
                result => {
                    if (result.message) {
                        this.snackbarService.openSnackBar(result.message);
                    } else {
                        this.snackbarService.openSnackBar(`Created user ${result.username}`);
                        this.router.navigate(['/auth']);
                    }
                }
            );
    }
}

function myValidator(control: AbstractControl): ValidationErrors | null {
    const parent = control.parent;

    if (!!parent && control.value === parent.get('password')?.value) {
        return null
    } else {
        return {isMatching: false}
    }
}
