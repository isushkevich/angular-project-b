import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    constructor(private snackBar: MatSnackBar) {
    }

    openSnackBar(content) {
        this.snackBar.open(content, 'Close', {duration: 5000, panelClass: ["snackbar"]});
    }
}
