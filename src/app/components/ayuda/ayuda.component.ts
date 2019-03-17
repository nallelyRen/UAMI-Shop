import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';


@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})

export class AyudaComponent implements OnInit {
  
  constructor( public snackbarService: SnackbarService) { }

  ngOnInit() {
    this.snackbarService.open("texto de prueba");
  }

}
