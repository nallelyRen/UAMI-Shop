import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  productos: any[] = [];
  Restriccion=true;
  carga=false;
  usuario = { "nombre": '', "correo": '', "telefono": '', "calificacion": '' };
  //usuario:  any[] = [];
  

  categoria = 'Libros';
  forma: FormGroup;
  constructor(private productoService: ProductosService, private usuarioService: UsuarioService, private router: Router) {
        // creacion del formulario
    this.forma = new FormGroup({
      'nombre': new FormControl(''),
      'correo': new FormControl(''),
      'telefono': new FormControl('', [Validators.required]),
      'calificacion': new FormControl('')
    });
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
    this.carga = true ;
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.dameMisFavoritos(idUsuario).subscribe(res => {
        this.productos = res;
        this.carga = false ;
        console.log(res);
      });
    } else {
      this.carga = false ;
      console.log('no estas logueado');
    }

  }
  obtenerProductosUsuario() {
    this.carga = true ;
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.dameMisProductos(idUsuario).subscribe(res => {
        this.productos = res;
        this.carga = false ;
        console.log(res);
      });
    } else {
      this.carga = false ;
      console.log('no estas logueado');
    }

  }
  eliminarFavoritos(id) {
    this.carga = true ;
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.eliminameEnFavoritos(idUsuario, id).subscribe(res => {
        this.productos = res;
        this.carga = false ;
        console.log(res);
      });
    } else {
      this.carga = false ;
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
        console.log(res);
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
    this.carga = true ;
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.eliminameProducto(idUsuario, id).subscribe(res => {
        this.productos = res;
        this.carga = false ;
        console.log(res);
      });
    } else {
      this.carga = false ;
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
}