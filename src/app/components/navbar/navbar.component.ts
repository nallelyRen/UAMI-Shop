import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import {Router} from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 Restriccion = true;
  constructor(private usuarioService: UsuarioService, private router: Router, public snackbarService: SnackbarService, private snackBar: MatSnackBar ) {

  }

  ngOnInit() {
    this.llamada();
  }

 
   llamada(){
      const id = this.usuarioService.validarUsuarios();
     if(id== -1){
    //  console.log('el valor es ', id);
      // await(100000);
      // this.llamada();
        return this.Restriccion; 
     }else{
     // console.log('el valor es ', id);
       return this.Restriccion = false;
     }
  }

  irCuenta() {
    const id = this.usuarioService.validarUsuarios();
    if (id !== -1) {
      this.router.navigate(['/miCuenta']);
    } else {
      //this.snackbarService.open("esta es la prueba de ayuda","");
      alert('Necesitas estar logueado para acceder a esta sección');
      this.router.navigate(['/principal']);
    }
  }

  irCatalogo() {
    const id = this.usuarioService.validarUsuarios();
    if (id !== -1) {
      this.router.navigate(['/productos']);
    } else {
      alert('Necesitas estar logueado para acceder a esta sección');
      this.router.navigate(['/principal']);
    }
  }
  irProducto() {
    const id = this.usuarioService.validarUsuarios();
    if (id !== -1) {
      this.router.navigate(['/agregarProducto']);
    } else {
      alert('Necesitas estar logueado para acceder a esta sección');
      this.router.navigate(['/principal']);
    }
  }
}
