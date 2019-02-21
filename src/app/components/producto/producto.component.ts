import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ProductosService } from '../../services/productos.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [NgbRatingConfig] 
})

export class ProductoComponent implements OnInit {
  
  
  usuarios: any[] = [];
  id: any;
  producto: any;
  produc: any;
  flag=false;
  carga=true;
  usuario = { "nombre": '', "correo": '', "telefono": '', "calificacion": '' };
  forma: FormGroup;
  constructor(private router: ActivatedRoute
              , private usuarioService: UsuarioService,
                private productoService: ProductosService, config: NgbRatingConfig) {
                this.router.params.subscribe(params => {
                  console.log(params['id']);
                  this.id = params['id'];
                  this.obtenerProducto(this.id);
                });

                config.max = 10;
               config.readonly = true;

               this.forma = new FormGroup({
               'calificacion': new FormControl('')
              });
              }

  ngOnInit() {
  
  }

   obtenerProducto(id) {
    this.productoService.obtenerProductoConId(id).subscribe(res => {
      this.producto = res;
      this.carga = false;
      console.log('producto', this.producto);
    });
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(res => {
      this.usuarios = res;
      
      console.log(res);
      console.log(typeof(this.usuarios));
    });
}
guardarCalificacion(){
  this.carga = true ;
  this.usuario.calificacion = this.forma.get('calificacion').value;   
  // envio de la peticion al servicio
  if (this.usuario.calificacion === '') {
    this.carga = false ;
    alert('El campo calificación es obligatorio');
  } else {
    const id = this.producto.idUsuario;
    if (id != -1) {
      this.usuarioService.modificarUsuario(id, this.usuario.calificacion).subscribe(
        res => {
          alert('Tu calificación' + this.usuario.calificacion + ' se ha enviado correctamente');
          this.carga = false ;
         // this.forma.reset(this.Libro2);
        }
      );
    } else {
      this.carga = false ;
      console.log('Tu calificación no se envió correctamente');
      this.carga = false ;
    }
  }
}

}