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
  usuario = { "nombre": '', "correo": '', "telefono": '', "calificacion": '' };
  //usuario:  any[] = [];
  categoria = 'Libros';
  forma: FormGroup;
  constructor(private productoService: ProductosService, private usuarioService: UsuarioService) {
    // creacion del formulario
    this.forma = new FormGroup({
      'nombre': new FormControl(''),
      'correo': new FormControl(''),
      'telefono': new FormControl('', [Validators.required]),
      'calificacion': new FormControl('')
    });
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
      const usuario = this.usuarioService.obtenerUsuarioPorId(idUsuario);
      console.log(usuario.nombre, usuario.correo);
      this.usuarioService.logueo(usuario.nombre, usuario.correo).subscribe(res => {
        // this.usuario=res;
        this.usuario.nombre = res.nombre;
        this.usuario.telefono = res.telefono;
        this.usuario.calificacion = res.calificacion;
        this.usuario.correo = res.correo;
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

  guardarCambios() {
    this.usuario.nombre = this.forma.get('nombre').value;
    this.usuario.correo = this.forma.get('correo').value;
    this.usuario.telefono = this.forma.get('telefono').value;
    this.usuario.calificacion = this.forma.get('calificacion').value;

    // envio de la peticion al servicio
    if (this.usuario.telefono === '') {
      alert('El campo telefono es obligatorio');
    } else {
      const id = this.usuarioService.validarUsuarios();
      if (id != -1) {
        this.usuarioService.modificarUsuario(this.usuario.nombre, this.usuario.correo,  this.usuario.telefono,  this.usuario.calificacion).subscribe(
          res => {
            alert('Tu número' + this.usuario.telefono + ' se ha actualizado correctamente');
            this.forma.reset(this.Libro2);
          }
        );
      } else {
        console.log('no esta logueado');
      }
    }

  }
}
    