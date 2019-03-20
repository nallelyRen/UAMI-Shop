import { Component, Input, OnInit} from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';
import {Router} from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modulo-eliminar',
  templateUrl: './modulo-eliminar.component.html',
  styleUrls: ['./modulo-eliminar.component.css']
})
export class ModuloEliminarComponent implements OnInit {

  @Input() name;

  productos: any[] = [];
  Restriccion=true;
  carga2 = false;
  carga3 = false;
  categoria = 'Libros';
  constructor(private productoService: ProductosService, private usuarioService: UsuarioService,
     private router: Router, private modalService: NgbModal, public activeModal: NgbActiveModal) {
        // creacion del formulario
      console.log('soy componente aparte jijiji', this.name);
  }

  ngOnInit() {
  }

  eliminarFavoritos(id) {
    this.carga3 = true ;
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.eliminameEnFavoritos(idUsuario, id).subscribe(res => {
        this.productos = res;
        alert('Tu producto '+ this.productos + 'ha sido eliminado de tus favoritos');
        this.carga3 = false ;
        console.log(res);
      });
    } else {
      this.carga3 = false ;
      console.log('no estas logueado');
    } 

  }

  eliminarProducto(id) {
    this.carga2 = true ;
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
        this.productoService.eliminameProducto(idUsuario, id).subscribe(res => {
        this.productos = res;
        this.carga2 = false ;
        console.log(res);
      });
    } else {
      this.carga2 = false ;
      console.log('no estas logueado');
    }

  }  

}
