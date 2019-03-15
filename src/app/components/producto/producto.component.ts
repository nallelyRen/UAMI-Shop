import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { ProductosService } from '../../services/productos.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
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
  flag = false;
  carga = true;
  promedio = 0;
  totalCalif = 0;
  usuario = { "nombre": '', "correo": '', "telefono": '', "calificacion": '' };
  forma: FormGroup;
  constructor(private router: ActivatedRoute
    , private usuarioService: UsuarioService, private location: Location,
    private productoService: ProductosService, config: NgbRatingConfig) {
    this.router.params.subscribe(params => {
      console.log(params['id']);
      this.id = params['id'];
      const prod = this.productoService.getProductoCat();
      console.log(prod);
      if (prod == null || prod.id != this.id) {
        this.obtenerProducto(this.id);
        console.log('no habia producto');
      } else {
        this.producto = prod;
        this.carga = false;
        this.calculaPromedio(this.producto.usuario.calificacion.toString());
        console.log('HABIA producto');
      }
    });
    config.max = 10;
    config.readonly = true;

    this.forma = new FormGroup({
      'calificacion': new FormControl('')
    });
  }

  ngOnInit() {
  }

  volver() {
    this.location.back();
  }

  obtenerProducto(id) {
    this.productoService.obtenerProductoConId(id).subscribe(res => {
      this.producto = res;
      this.carga = false;
      console.log('producto', this.producto);
      this.calculaPromedio(this.producto.usuario.calificacion.toString());
    });
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(res => {
      this.usuarios = res;

      console.log(res);
      console.log(typeof (this.usuarios));
    });
  }

  guardarCalificacion() {
    this.carga = true;
    this.usuario.calificacion = this.forma.get('calificacion').value;
    // envio de la peticion al servicio
    if (this.usuario.calificacion === '') {
      this.carga = false;
      alert('El campo calificación es obligatorio');
    } else {
      const idUsuario = this.usuarioService.validarUsuarios();
      // const id = this.producto.idUsuario;
      const idUsuarioAcalificar = this.producto.usuario.id;
      if (idUsuario !== -1) {
        // Verificamos que el usuario no sea el mismo que se esta calificando 
        if (idUsuario === idUsuarioAcalificar) {
          this.carga = false;
          alert('No puedes calificarte tu mismo, tu calificación no se ha enviado');
        } else {
          this.usuarioService.modificarCalificacion(idUsuario, idUsuarioAcalificar, this.usuario.calificacion ).subscribe(
            res => {
              const arreglo = res;
              this.calculaPromedio(arreglo.toString());
              alert('Tu calificación de ' + this.usuario.calificacion + ' se ha enviado correctamente, los cambios pueden demorar unos minutos en aparecer');
              this.carga = false;
            });
        }
      } else {
        alert('Tu calificación no se envió correctamente');
        this.carga = false;
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

}
