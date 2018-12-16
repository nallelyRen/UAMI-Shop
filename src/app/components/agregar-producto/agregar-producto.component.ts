import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  // esta es la entidad libro donde se guardan los datos del mismo
  Libro = {
    nombre: '',
    categoria: '',
    precio: '',
    representante: '',
    requisitos: '',
    descripcion: '',
  };
  file: any;
  condicionProyecto = false;
  SiImagen = false;
  // libro vacio 
  Libro2 = {
    nombre: '',
    categoria: '',
    precio: '',
    representante: '',
    requisitos: '',
    descripcion: '',
  };

forma: FormGroup;
// constructor de la clase, este inicializa el formulario y conecta con el servicio
constructor(private productService: ProductosService) {
  // creacion del formulario
  this.forma = new FormGroup({
    'nombre': new FormControl('', [Validators.required, Validators.minLength(3) ]),
    'categoria': new FormControl('', [Validators.required]),
    'precio': new FormControl('', [Validators.required] ),
    'representante': new FormControl('' ),
    'requisitos': new FormControl('' ),
    'descripcion': new FormControl('', [Validators.required] )
  });
}
// metodo que se ejecuta antes que el demas codigo pero despues del constructor
ngOnInit() {
}

prueba1() {
  if (this.forma.get('categoria').value === 'proyecto') {
    this.condicionProyecto = true;
  } else {
    this.condicionProyecto = false;
  }
}

// evento del boton con el que se obtiene la imagen que sube el usuario
setImage(files: FileList) {
  this.file = files.item(0);
  this.SiImagen = true;
}

// metodo con el cual enviamos la peticion al servisio, para que este conece con el back-end
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
      this.productService.nuevoLibro(this.Libro.nombre, this.Libro.precio, this.Libro.descripcion, this.file,1).subscribe(
        res => {
            alert('Tu libro ' + this.Libro.nombre + ' se a subido correctamente');
            this.forma.reset(this.Libro2);
        }
      );
    } else {
      if (this.forma.get('categoria').value === 'proyecto') {
        this.productService.nuevoProyecto(this.Libro.nombre, this.Libro.representante,this.Libro.precio,this.Libro.descripcion,
           this.Libro.requisitos, this.file,1).subscribe(
          res => {
              alert('Tu proyecto ' + this.Libro.nombre + ' se a subido correctamente');
              this.forma.reset(this.Libro2);
          }
        );
      } else {
        this.productService.nuevoElectronico(this.Libro.nombre, this.Libro.precio, this.Libro.descripcion, this.file,1).subscribe(
          res => {
              alert('Tu electronico ' + this.Libro.nombre + ' se a subido correctamente');
              this.forma.reset(this.Libro2);
          }
        );
      }
    }
  }

  /**console.log(this.forma);
  this.Libro.nombre = this.forma.get('nombre').value;
  this.Libro.categoria = 'libro',
  this.Libro.precio = this.forma.get('precio').value;
  this.Libro.descripcion = this.forma.get('descripcion').value;
  // console.log('hacker', this.Libro.nombre, this.Libro.precio, this.Libro.descripcion, this.Libro.archivo);
  // envio de la peticion al servicio
  if (this.Libro.nombre == '' || this.Libro.precio == '') {
    alert('El campo nombre y precio, son obligatorios');
  } else {
  this.productService.nuevoLibro(this.Libro, this.file).subscribe(
    res => {
        alert('Tu producto ' + this.Libro.nombre + ' se a subido correctamente');
        this.forma.reset(this.Libro)
    }
  );
  }**/
}

}
