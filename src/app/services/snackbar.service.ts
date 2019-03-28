import { Injectable } from '@angular/core';
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
  autoHide: number = 2500;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  
  
constructor(public snackBar: MatSnackBar) {
 

  }
  open(message: string, action: string, config?:MatSnackBarConfig<any>) {
     this.snackBar.open(message, action, {
        duration: 3500,
        verticalPosition:'bottom',
        horizontalPosition:'center',
        panelClass: ['bluesnackbar'],
        
    });
    
  }
  openmore(message: string, action: string, config?:MatSnackBarConfig<any>) {
    this.snackBar.open(message, action, {
       duration: 4500,
       verticalPosition:'bottom',
       horizontalPosition:'center',
       panelClass: ['bluesnackbar'],
       
   });
   
 }
}
