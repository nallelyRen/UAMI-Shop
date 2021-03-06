import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 Restriccion = true;
 colapsar = false;
  constructor(private usuarioService: UsuarioService, private router: Router ) {
    if (window.screen.width < 992) {
      this.colapsar = true;
    }
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
    if (window.screen.width < 992) {
      this.colapsar = true;
    } else {
      this.colapsar = false;
    }
    const id = this.usuarioService.validarUsuarios();
    if (id !== -1) {
      this.router.navigate(['/miCuenta']);
    } else {     
      alert('Necesitas estar logueado para acceder a esta sección');
      this.router.navigate(['/principal']);
    }
  }

  irCatalogo() {
    if (window.screen.width < 992) {
      this.colapsar = true;
    } else {
      this.colapsar = false;
    }
    const id = this.usuarioService.validarUsuarios();
    if (id !== -1) {
      this.router.navigate(['/productos']);
    } else {
      alert('Necesitas estar logueado para acceder a esta sección');
      this.router.navigate(['/principal']);
    }
  }
  irProducto() {
    if (window.screen.width < 992) {
      this.colapsar = true;
    } else {
      this.colapsar = false;
    }
    const id = this.usuarioService.validarUsuarios();
    if (id !== -1) {
      this.router.navigate(['/agregarProducto']);
    } else {
      alert('Necesitas estar logueado para acceder a esta sección');
      this.router.navigate(['/principal']);
    }
  }
}
