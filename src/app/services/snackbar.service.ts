import { Injectable } from '@angular/core';
import {Component, ViewEncapsulation} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

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
   open(texto) {
     this.message=texto;
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;   
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }
}
