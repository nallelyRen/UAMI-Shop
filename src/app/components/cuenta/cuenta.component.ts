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

  guardarCambios() {
    this.Libro.nombre = this.forma.get('nombre').value;
    this.Libro.categoria = this.forma.get('categoria').value;
    this.Libro.precio = this.forma.get('precio').value;
    this.Libro.representante = this.forma.get('representante').value;
    this.Libro.requisitos = this.forma.get('requisitos').value;
    this.Libro.descripcion = this.forma.get('descripcion').value;
    // envio de la peticion al servicio
    if (this.Libro.nombre === '' || this.Libro.precio === '' || this.Libro.categoria === '' || this.SiImagen === false) {
      alert('El campo nombre,categoria y precio, son obligatorios');
    } else {
      if (this.forma.get('categoria').value === 'libro') {
        const id = this.usuarioService.validarUsuarios();
        if (id != -1) {
          this.productService.nuevoLibro(this.Libro.nombre, this.Libro.precio, this.Libro.descripcion, this.file, id).subscribe(
            res => {
              alert('Tu libro ' + this.Libro.nombre + ' se a subido correctamente');
              this.forma.reset(this.Libro2);
            }
          );
        } else {
          console.log('no esta logueado');
        }

      } else {
        if (this.forma.get('categoria').value === 'proyecto') {
          const id = this.usuarioService.validarUsuarios();
          if (id != -1) {
            this.productService.nuevoProyecto(this.Libro.nombre, this.Libro.representante, this.Libro.precio, this.Libro.descripcion,
              this.Libro.requisitos, this.file, id).subscribe(
                res => {
                  alert('Tu proyecto ' + this.Libro.nombre + ' se a subido correctamente');
                  this.forma.reset(this.Libro2);
                }
              );
          }else {
            console.log('no esta logueado');
          }
        } else {
          const id = this.usuarioService.validarUsuarios();
          if (id != -1) {
            this.productService.nuevoElectronico(this.Libro.nombre, this.Libro.precio, this.Libro.descripcion, this.file, id).subscribe(
            res => {
              alert('Tu electronico ' + this.Libro.nombre + ' se a subido correctamente');
              this.forma.reset(this.Libro2);
            }
          );  
          }else {
            console.log('no esta logueado');
          }
          
        }
      }
    }

    
  }

}