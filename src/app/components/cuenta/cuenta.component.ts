import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  productos: any[] = [];
  usuario:any[]=[];
  categoria = 'Libros'; 
  constructor(private productoService: ProductosService,private usuarioService: UsuarioService) {
  }

  ngOnInit() {
   
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

  
obtenerFavoritos(){
  this.productoService.dameMisFavoritos(1).subscribe(res => {
    this.productos = res;
    console.log(res);   
  });
}
obtenerProductosUsuario(){
  this.productoService.dameMisProductos(1).subscribe(res => {
    this.productos = res;
    console.log(res);   
  });
}
eliminarFavoritos(id){
  this.productoService.eliminameEnFavoritos(1,id).subscribe(res => {
    this.productos = res;
    console.log(res);   
  });
}
obtenerInfoUsuario(){
  this.usuarioService.logueo('jorge','jorge@gmail.com').subscribe(res => {
    this.usuario = res;
    console.log(res);   
  });
}

eliminarProducto(id){
  this.productoService.eliminameProducto(1,id).subscribe(res => {
    this.productos = res;
    console.log(res);   
  });
}

}