import { Component, OnInit} from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import {MatSnackBar} from '@angular/material';

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
             private router: ActivatedRoute, private router1: Router,public snackbarService: SnackbarService, private snackBar: MatSnackBar) {
              this.router.params.subscribe(params => {
               // console.log(params['id']);
                this.id = params['id'];
                this.producto = this.productoService.getProducto();
                // console.log(this.producto);
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

validarPrecio(precio: number) {
  if ( precio < 0 || precio > 10000 || precio.toString().length < 1) {
    return true;
  } else {
      return false;
  }
}

 guardarCambios() {
 // console.log((<HTMLInputElement>document.getElementById('precio')).value);
  this.carga = true;
  this.elemento.nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
  this.elemento.precio = (<HTMLInputElement>document.getElementById('precio')).value;
  this.elemento.descripcion = (<HTMLInputElement>document.getElementById('descripcion')).value;
  if (this.elemento.nombre.length < 1 || this.elemento.precio === null || this.validarPrecio(parseFloat( this.elemento.precio))
     || this.elemento.descripcion.length < 1) {
     this.snackbarService.openmore("Los campos no pueden ser vacíos y el precio debe ser menor de 10000, complete la información para continuar","");
    this.carga = false;
  } else {
   if (this.producto.representante) {
    this.elemento.representante = (<HTMLInputElement>document.getElementById('representante')).value;
    this.elemento.requisitos = (<HTMLInputElement>document.getElementById('requisitos')).value;
    if (this.elemento.representante.length < 1 || this.elemento.requisitos.length < 1) {
      this.snackbarService.open("Los campos no pueden ser vacíos, complete la información para continuar","");
      this.carga = false;
    } else {
      const id= this.usuarioService.validarUsuarios();    
      if(id!= -1){
    this.productoService.modificaDatosProyectos(id, this.producto.id, this.elemento.nombre, this.elemento.precio,
      this.elemento.descripcion, this.elemento.representante, this.elemento.requisitos).subscribe(res => {
        if (res) {
          this.snackbarService.openmore(this.elemento.nombre  +" se ha modificado correctamente, los cambios pueden demorar unos minutos en aparecer","");
           this.carga = false;
          this.producto.nombre = this.elemento.nombre;
        } else {
          this.snackbarService.open(this.producto.nombre +" no se ha podido modificar","");          
          this.carga = false;
        }
      });
    }

    }
   } else {
    if (this.producto.ubicacion) {
      this.elemento.ubicacion = (<HTMLInputElement>document.getElementById('ubicacion')).value;
      if (this.elemento.ubicacion.length < 1 ) {        
        this.snackbarService.open("Los campos no pueden ser vacíos, complete la información para continuar","");
        this.carga = false;
      } else {
        const id= this.usuarioService.validarUsuarios();
        if(id!= -1){
      this.productoService.modificaDatosDepartamentos(id, this.producto.id, this.elemento.nombre, this.elemento.precio,
        this.elemento.descripcion, this.elemento.ubicacion).subscribe(res => {
          if (res) {
            this.snackbarService.openmore(this.elemento.nombre  +" se ha modificado correctamente, los cambios pueden demorar unos minutos en aparecer","");
            this.carga = false;
            this.producto.nombre = this.elemento.nombre;
          } else {
            this.snackbarService.open(this.producto.nombre +" no se ha podido modificar","");
            this.carga = false;
          }
        });
      }
      }
    } else {
      if (this.producto.area) {
        this.elemento.area = (<HTMLInputElement>document.getElementById('area')).value;
        if (this.elemento.area.length < 1) {
          this.snackbarService.open("Los campos no pueden ser vacíos, complete la información para continuar","");
          this.carga = false;
        } else {
          const id= this.usuarioService.validarUsuarios();    
          if(id!= -1){
        this.productoService.modificaDatosTutoria(id, this.producto.id, this.elemento.nombre, this.elemento.precio,
          this.elemento.descripcion, this.elemento.area).subscribe(res => {
            if (res) {
              this.snackbarService.openmore(this.elemento.nombre  +" se ha modificado correctamente, los cambios pueden demorar unos minutos en aparecer","");
              this.carga = false;
              this.producto.nombre = this.elemento.nombre;
            } else {
              this.snackbarService.open(this.producto.nombre +" no se ha podido modificar","");
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
              this.snackbarService.openmore(this.elemento.nombre  +" se ha modificado correctamente, los cambios pueden demorar unos minutos en aparecer","");
              this.carga = false;
              this.producto.nombre = this.elemento.nombre;
            } else {
              this.snackbarService.open(this.producto.nombre +" no se ha podido modificar","");
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
