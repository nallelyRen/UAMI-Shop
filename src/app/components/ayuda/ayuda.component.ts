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
    this.snackbarService.open("esta es la prueba de ayuda","prueba 2");
  }
  
 
}
