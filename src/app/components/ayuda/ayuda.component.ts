import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})

export class AyudaComponent implements OnInit {
  
  constructor( public snackbarService: SnackbarService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  //  this.snackbarService.open("texto de prueba");
  }
   open(){
      alert('Hoho, parece que ocurrio un problema al acceder a tu cuenta, por favor intenta entrar nuevamente');
    //this.snackbar.open("texto de prueba");
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
