import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  productos: any[] = [];
  usuario={"nombre":'',"correo":'',"telefono":'',"calificacion":''};
 //usuario:  any[] = [];
  categoria = 'Libros';
  constructor(private productoService: ProductosService, private usuarioService: UsuarioService) {
  }

  ngOnInit() {

  }

  cambio(categoria) {
    this.categoria = categoria;
    if (categoria === 'libros') {
      this.productoService.obtenerLibros().subscribe(res => {
        this.productos = res;
        console.log(res);
        console.log('tipo', typeof (this.productos));
      });
    } else {
      if (categoria === 'proyectos') {
        this.productoService.obtenerProyectos().subscribe(res => {
          this.productos = res;
          console.log(res);
          console.log('tipo', typeof (this.productos));
        });
      } else {
        this.productoService.obtenerElectronicos().subscribe(res => {
          this.productos = res;
          console.log(res);
          console.log('tipo', typeof (this.productos));
        });
      }
    }
  }


  obtenerFavoritos() {
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.dameMisFavoritos(idUsuario).subscribe(res => {
        this.productos = res;
        console.log(res);
      });
    } else {
      console.log('no estas logueado');
    }

  }
  obtenerProductosUsuario() {
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.dameMisProductos(idUsuario).subscribe(res => {
        this.productos = res;
        console.log(res);
      });
    } else {
      console.log('no estas logueado');
    }

  }
  eliminarFavoritos(id) {
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.eliminameEnFavoritos(idUsuario, id).subscribe(res => {
        this.productos = res;
        console.log(res);
      });
    } else {
      console.log('no estas logueado');
    }

  }
  obtenerInfoUsuario() {
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
    const usuario=this.usuarioService.obtenerUsuarioPorId(idUsuario);
    console.log(usuario.nombre, usuario.correo);
      this.usuarioService.logueo(usuario.nombre, usuario.correo).subscribe(res => {
    // this.usuario=res;
      this.usuario.nombre= res.nombre;
       this.usuario.telefono= res.telefono;
       this.usuario.calificacion= res.calificacion;
       this.usuario.correo= res.correo;
        console.log(res);
      });
    } else {
      console.log('no estas logueado');
    }

  }

  eliminarProducto(id) {
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.eliminameProducto(idUsuario, id).subscribe(res => {
        this.productos = res;
        console.log(res);
      });
    } else {
      console.log('no estas logueado');
    }

  }

}