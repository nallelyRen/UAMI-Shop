import { Injectable } from '@angular/core';
import {Component, ViewEncapsulation} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
@Component({
    encapsulation: ViewEncapsulation.None,
  
})
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  message: string = 'Snack Bar opened.';
  actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  
  
constructor(public snackBar: MatSnackBar) {
  }
  open(message: string,) {
    alert('Hoho, parece que ocurrio un problema al acceder a tu cuenta, por favor intenta entrar nuevamente');
    var action="avion";
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
