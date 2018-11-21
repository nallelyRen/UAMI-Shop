import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  productos: any[] = [];
  categoria = 'Libros'; 
  constructor(private productoService: ProductosService) {
  }

  ngOnInit() {
    this.obtenerProductos();
  }

  cambio(categoria) {
    this.categoria = categoria;
    if (categoria === 'libros'){
      this.productoService.obtenerLibros().subscribe(res => {
        this.productos = res;
        console.log(res);
        console.log('tipo', typeof(this.productos));
      });
    } else {
      if (categoria === 'proyectos'){
        this.productoService.obtenerProyectos().subscribe(res => {
          this.productos = res;
          console.log(res);
          console.log('tipo', typeof(this.productos));
        });
      } else {
      this.productoService.obtenerElectronicos().subscribe(res => {
        this.productos = res;
        console.log(res);
        console.log('tipo', typeof(this.productos));
      });
    }
    }
  }

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe(res => {
      this.productos = res;
      console.log(res);
      console.log('tipo', typeof(this.productos));
    });
}
}