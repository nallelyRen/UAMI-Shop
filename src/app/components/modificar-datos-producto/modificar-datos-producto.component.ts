import { Component, OnInit} from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';

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

 producto: any;

 constructor(private usuarioService: UsuarioService, private productoService: ProductosService) {
 }

 ngOnInit() {
   this.producto = this.productoService.getProducto();
   console.log(this.producto);
 }

 guardarCambios() {
  this.elemento.nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
  this.elemento.precio = (<HTMLInputElement>document.getElementById('precio')).value;
  this.elemento.descripcion = (<HTMLInputElement>document.getElementById('descripcion')).value;
  if (this.elemento.nombre.length < 1 || this.elemento.precio.length < 1 || this.elemento.descripcion.length < 1) {
    alert('Los campos no pueden ser vacíos, complete la información para continuar');
  } else {
   if (this.producto.representante) {
    this.elemento.representante = (<HTMLInputElement>document.getElementById('representante')).value;
    this.elemento.requisitos = (<HTMLInputElement>document.getElementById('requisitos')).value;
    if (this.elemento.representante.length < 1 || this.elemento.requisitos.length < 1) {
      alert('Los campos no pueden ser vacíos, complete la información para continuar');
    } else {
      const id= this.usuarioService.validarUsuarios();    
      if(id!= -1){
    this.productoService.modificaDatosProyectos(id, this.producto.id, this.elemento.nombre, this.elemento.precio,
      this.elemento.descripcion, this.elemento.representante, this.elemento.requisitos).subscribe(res => {
        if (res) {
          alert('Tu proyecto "' + this.producto.nombre + '" se ha modificado correctamente');
        } else {
          alert('Ups, tu proyecto "' + this.producto.nombre + '" no se ha podido modificar');
        }
      });
    }

    }
   } else {
    if (this.producto.ubicacion) {
      this.elemento.ubicacion = (<HTMLInputElement>document.getElementById('ubicacion')).value;
      if (this.elemento.ubicacion.length < 1 ) {
        alert('Los campos no pueden ser vacíos, complete la información para continuar');
      } else {
        const id= this.usuarioService.validarUsuarios();    
        if(id!= -1){
      this.productoService.modificaDatosDepartamentos(id, this.producto.id, this.elemento.nombre, this.elemento.precio,
        this.elemento.descripcion, this.elemento.ubicacion).subscribe(res => {
          if (res) {
            alert('Tu departamento "' + this.producto.nombre + '" se ha modificado correctamente');
          } else {
            alert('Ups, tu depatramento "' + this.producto.nombre + '" no se ha podido modificar');
          }
        });
      }
      }
    } else {
      if (this.producto.area) {
        this.elemento.area = (<HTMLInputElement>document.getElementById('area')).value;
        if (this.elemento.area.length < 1) {
          alert('Los campos no pueden ser vacíos, complete la información para continuar');
        } else {
          const id= this.usuarioService.validarUsuarios();    
          if(id!= -1){
        this.productoService.modificaDatosTutoria(id, this.producto.id, this.elemento.nombre, this.elemento.precio,
          this.elemento.descripcion, this.elemento.area).subscribe(res => {
            if (res) {
              alert('La tutoría "' + this.producto.nombre + '" se ha modificado correctamente');
            } else {
              alert('Ups, la tutoría "' + this.producto.nombre + '" no se ha podido modificar');
            }
          });
        }
        }
      } else {
        const id= this.usuarioService.validarUsuarios();    
        if(id!= -1){
        this.productoService.modificaDatosProducto(id, this.producto.id, this.elemento.nombre, this.elemento.precio,
           this.elemento.descripcion).subscribe(res => {
            if (res) {
              alert('El producto "' + this.producto.nombre + '" se ha modificado correctamente');
            } else {
              alert('Ups, tu producto "' + this.producto.nombre + '" no se ha podido modificar');
            }
           });
          }
      }
    }
   }
  }
  }
}
