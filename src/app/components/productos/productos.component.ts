import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

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
    this.productoService.obtenerLibros().subscribe(res => {
      this.productos = res;
      console.log(res);
      console.log('tipo', typeof(this.productos));
    });
}
}
