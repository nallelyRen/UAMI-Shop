import { Component, OnInit} from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
 selector: 'app-modificar-datos-producto',
 templateUrl: './modificar-datos-producto.component.html',
 styleUrls: ['./modificar-datos-producto.component.css']
})
export class ModificarDatosProductoComponent implements OnInit {

 elemento = {
   nombre: '',
   ubicacion: '',
   precio: '',
   area: '',
   representante: '',
   requisitos: '',
   descripcion: '',
 };

 carga=false;
 id: any;
 producto: any;

 constructor(private usuarioService: UsuarioService, private productoService: ProductosService,
             private router: ActivatedRoute, private router1: Router) {
              this.router.params.subscribe(params => {
                console.log(params['id']);
                this.id = params['id'];
                this.producto = this.productoService.getProducto();
                 console.log(this.producto);
                 if (this.producto == null) {
                      this.producto = this.productoService.obtenerProductoConId(this.id).subscribe(res => {
                      this.producto = res;
                    });
                 }
              });
 }

 ngOnInit() {

 }

 modificarImagen() {
  this.router1.navigate(['/modificarImagenProducto/' + this.id]);
}

 guardarCambios() {
  this.carga = true;
  this.elemento.nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
  this.elemento.precio = (<HTMLInputElement>document.getElementById('precio')).value;
  this.elemento.descripcion = (<HTMLInputElement>document.getElementById('descripcion')).value;
  if (this.elemento.nombre.length < 1 || this.elemento.precio.length < 1 || this.elemento.descripcion.length < 1) {
    alert('Los campos no pueden ser vacíos, complete la información para continuar');
    this.carga = false;
  } else {
   if (this.producto.representante) {
    this.elemento.representante = (<HTMLInputElement>document.getElementById('representante')).value;
    this.elemento.requisitos = (<HTMLInputElement>document.getElementById('requisitos')).value;
    if (this.elemento.representante.length < 1 || this.elemento.requisitos.length < 1) {
      alert('Los campos no pueden ser vacíos, complete la información para continuar');
      this.carga = false;
    } else {
      const id= this.usuarioService.validarUsuarios();    
      if(id!= -1){
    this.productoService.modificaDatosProyectos(id, this.producto.id, this.elemento.nombre, this.elemento.precio,
      this.elemento.descripcion, this.elemento.representante, this.elemento.requisitos).subscribe(res => {
        if (res) {
          alert('Tu proyecto "' + this.elemento.nombre  + '" se ha modificado correctamente');
          this.carga = false;
          this.producto.nombre = this.elemento.nombre;
        } else {
          alert('Ups, tu proyecto "' + this.producto.nombre + '" no se ha podido modificar');
          this.carga = false;
        }
      });
    }

    }
   } else {
    if (this.producto.ubicacion) {
      this.elemento.ubicacion = (<HTMLInputElement>document.getElementById('ubicacion')).value;
      if (this.elemento.ubicacion.length < 1 ) {
        alert('Los campos no pueden ser vacíos, complete la información para continuar');
        this.carga = false;
      } else {
        const id= this.usuarioService.validarUsuarios();
        if(id!= -1){
      this.productoService.modificaDatosDepartamentos(id, this.producto.id, this.elemento.nombre, this.elemento.precio,
        this.elemento.descripcion, this.elemento.ubicacion).subscribe(res => {
          if (res) {
            alert('Tu departamento "' + this.elemento.nombre  + '" se ha modificado correctamente');
            this.carga = false;
            this.producto.nombre = this.elemento.nombre;
          } else {
            alert('Ups, tu depatramento "' + this.producto.nombre + '" no se ha podido modificar');
            this.carga = false;
          }
        });
      }
      }
    } else {
      if (this.producto.area) {
        this.elemento.area = (<HTMLInputElement>document.getElementById('area')).value;
        if (this.elemento.area.length < 1) {
          alert('Los campos no pueden ser vacíos, complete la información para continuar');
          this.carga = false;
        } else {
          const id= this.usuarioService.validarUsuarios();    
          if(id!= -1){
        this.productoService.modificaDatosTutoria(id, this.producto.id, this.elemento.nombre, this.elemento.precio,
          this.elemento.descripcion, this.elemento.area).subscribe(res => {
            if (res) {
              alert('La tutoría "' + this.elemento.nombre  + '" se ha modificado correctamente');
              this.carga = false;
              this.producto.nombre = this.elemento.nombre;
            } else {
              alert('Ups, la tutoría "' + this.producto.nombre + '" no se ha podido modificar');
              this.carga = false;
            }
          });
        }
        }
      } else {
        const id = this.usuarioService.validarUsuarios();
        if (id != -1) {
        this.productoService.modificaDatosProducto(id, this.producto.id, this.elemento.nombre, this.elemento.precio,
           this.elemento.descripcion).subscribe(res => {
            if (res) {
              alert('El producto "' + this.elemento.nombre + '" se ha modificado correctamente');
              this.carga = false;
              this.producto.nombre = this.elemento.nombre;
            } else {
              alert('Ups, tu producto "' + this.producto.nombre + '" no se ha podido modificar');
              this.carga = false;
            }
           });
          }
      }
    }
   }
  }
  }
}
