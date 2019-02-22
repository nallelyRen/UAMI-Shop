import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.calculaPromedio();
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
      const id = this.producto.idUsuario;
      const calificador = this.usuarioService.obtenerUsuarioPorId(idUsuario);
      if (idUsuario != -1) {
        //Verificamos que el usuario no sea el mismo que se esta calificando 
        if (id === calificador) {
          alert('No puedes calificarte tu mismo, tu calificación no se ha enviado');
        } else {
          var cadena = this.producto.usuario.calificacion.toString();
          var arreglo = cadena.split("-");
          var cadena2 = arreglo.toString();
          var calificaciones = cadena2.split(",");
          var bandera = false;
          //for para obtener todos los id 
          // Verificamos que el usuario no haya calificado ya
          for (var i = 0; i < calificaciones.length; i++) {
            if (calificador === calificaciones[i]) {
              bandera = true;
              //Sustituimos la calificación vieja por la nueva
              calificaciones[i + 1] = this.usuario.calificacion;
              alert('Tu calificación' + this.usuario.calificacion + ' se ha modificado correctamente');
              break;
            }
            i++;
          }

          if (!bandera) {
            //Agregamos la calificación enviada al arreglo del usuario
            this.usuarioService.modificarCalificacion(idUsuario, this.usuario.calificacion, id).subscribe(
              res => {
                alert('Tu calificación' + this.usuario.calificacion + ' se ha enviado correctamente');
                this.carga = false;
              }
            );
          }
          this.calculaPromedio();
        }
      } else {
        this.carga = false;
        alert('Tu calificación no se envió correctamente');
        this.carga = false;
      }
    }
  }
  

  calculaPromedio() {
    //console.log('entro al metodo p');
    //codigo para el promedio
    //dividimos el conjunto en subcadenas eliminando "-"

    //pruebas
    //var arreglo=["1-10","3-6","6-8","45-3","6-10"];
    //var cadena2= arreglo.toString();
    //var arreglo2= cadena2.split("-");
    //var cadena3= arreglo2.toString();
    //var calificaciones=cadena3.split(",");

    var cadena = this.producto.usuario.calificacion.toString();
    var arreglo = cadena.split("-");
    var cadena2 = arreglo.toString();
    var calificaciones = cadena2.split(",");
    var suma = 0;
    var total = calificaciones.length / 2;
    //sumamos todas las calificaciones
    for (var i = 1; i < calificaciones.length; i++) {
      suma = suma + parseInt(calificaciones[i]);
      //console.log('calificacion '+calificaciones[i]);
      i++;
    }
    var promedio = suma / total;
    //  console.log('el promedio es '+promedio);
   
    document.getElementById("calif").innerHTML = '10';
   // return promedio;
   
  }


}