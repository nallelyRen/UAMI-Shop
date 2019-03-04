import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';
import {Router} from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector:'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirmación de eliminar</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>¿Estas seguro de eliminar tu producto? </p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Cerrar</button>
    <button type="button" class="btn btn-primary" (click)="activeModal.dismiss (eliminarProducto(name))">Eliminar</button> 
    </div>
     `
})

export class NgbdModalContent implements OnInit  {
  
  @Input() name;

  productos: any[] = [];
  Restriccion=true;
  carga2 = false;
  carga3 = false;
  categoria = 'Libros';
  constructor(private productoService: ProductosService, private usuarioService: UsuarioService, private router: Router, private modalService: NgbModal, public activeModal: NgbActiveModal) {
        // creacion del formulario
  }

  ngOnInit() {
    this.llamada();
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

  obtenerProductosUsuario() {
    this.carga2 = true ;
    this.productos = [];
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.dameMisProductos(idUsuario).subscribe(res => {
        this.productos = res;
        this.carga2 = false ;
        console.log(res);
      });
    } else {
      this.carga2 = false ;
      console.log('no estas logueado');
    }
  }

  llamada(){
    const id= this.usuarioService.validarUsuarios();      
   if(id== -1){
    console.log('el valor es ',id);
    this.Restriccion=true;    
    alert('No estas logueado por lo que el contenido de la página no se mostrará');
    return this.Restriccion; 
   }else{         
    console.log('el valor es ',id);
     return this.Restriccion=false;
   }
    
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
  modificarProducto(producto: any) {
    this.productoService.setProducto(producto);
    this.router.navigate(['/modificarDatosProducto']);
  }
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})

export class NgbdModalComponent  implements OnInit{
  
  productos: any[] = [];
  Restriccion=true;
  carga=false;
  carga2 = false;
  carga3 = false;
  totalCalif = 0;
  promedio = 0;
  usuario = { "nombre": '', "correo": '', "telefono": '', "calificacion": '' };
  //usuario:  any[] = [];

  categoria = 'Libros';
  forma: FormGroup;
  constructor(private productoService: ProductosService, private usuarioService: UsuarioService, private router: Router, private modalService: NgbModal) {
        // creacion del formulario
    this.forma = new FormGroup({
      'nombre': new FormControl(''),
      'correo': new FormControl(''),
      'telefono': new FormControl('', [Validators.required]),
      'calificacion': new FormControl('')
    });
  }

 open(id) {
   const id2 = id;  
   const modalRef = this.modalService.open(NgbdModalContent );
   modalRef.componentInstance.name = id2; 
  }

  ngOnInit() {
    this.llamada();
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
    this.carga3 = true ;
    this.productos = [];
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.dameMisFavoritos(idUsuario).subscribe(res => {
        this.productos = res;
        this.carga3 = false ;
        console.log(res);
      });
    } else {
      this.carga3 = false ;
      console.log('no estas logueado');
    }

  }
  obtenerProductosUsuario() {
    this.carga2 = true ;
    this.productos = [];
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.dameMisProductos(idUsuario).subscribe(res => {
        this.productos = res;
        this.carga2 = false ;
        console.log(res);
      });
    } else {
      this.carga2 = false ;
      console.log('no estas logueado');
    }

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
  obtenerInfoUsuario() {  
    this.carga = true ;
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
        this.carga = false ;
        console.log(res.calificacion.toString());
        this.calculaPromedio(res.calificacion.toString());
      });
    } else {
      this.carga = false ;
      console.log('no estas logueado');
    }

  }
  llamada(){
    const id= this.usuarioService.validarUsuarios();      
   if(id== -1){
    console.log('el valor es ',id);
    this.Restriccion=true;    
    alert('No estas logueado por lo que el contenido de la página no se mostrará');
    return this.Restriccion; 
   }else{         
    console.log('el valor es ',id);
     return this.Restriccion=false;
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

  modificarProducto(producto: any) {
    this.productoService.setProducto(producto);
    this.router.navigate(['/modificarDatosProducto']);
  }
 

  guardarCambios() {
    this.carga = true ;
    this.usuario.telefono = this.forma.get('telefono').value;   
    // envio de la peticion al servicio
    if (this.usuario.telefono === '') {
      this.carga = false ;
      alert('El campo telefono es obligatorio');
    } else {
      const id = this.usuarioService.validarUsuarios();
      if (id != -1) {
        this.usuarioService.modificarUsuario(id, this.usuario.telefono).subscribe(
          res => {
            alert('Tu número' + this.usuario.telefono + ' se ha actualizado correctamente');
            this.carga = false ;
            this.forma.reset();
           // this.forma.reset(this.Libro2);
          }
        );
      } else {
        this.carga = false ;
        console.log('no esta logueado');
        this.carga = false ;
      }
    }

  }

  calculaPromedio( cadena: String) {
    const arreglo = cadena.split("-");
    const cadena2 = arreglo.toString();
    const calificaciones = cadena2.split(",");
    if (calificaciones.length > 1) {
      var suma = 0;
      this.totalCalif = calificaciones.length / 2;
    //sumamos todas las calificaciones
      for (var i = 1; i < calificaciones.length; i++) {
        suma = suma + parseInt(calificaciones[i]);
        i++;
      }
      this.promedio = suma / this.totalCalif;
    }
  }
  
  agregar(){
    this.router.navigate(['/agregarProducto']);
  } 
}