import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];
  categoria = 'Libros';
  Restriccion=true;
  constructor(private productoService: ProductosService, private usuarioService: UsuarioService) {
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
        if (categoria === 'electronica') {
        this.productoService.obtenerElectronicos().subscribe(res => {
          this.productos = res;
          console.log(res);
          console.log('tipo', typeof (this.productos));
        });
      }
      }
      if (categoria === 'departamentos') {

        this.productoService.obtenerDepartamentos().subscribe(res => {
        this.productos = res;
         console.log(res);
          console.log('tipo', typeof (this.productos));
        });

      }  
    }
  }

  obtenerProductos() {
    this.productoService.obtenerLibros().subscribe(res => {
      this.productos = res;
      console.log(res);
      console.log('tipo', typeof (this.productos));
    });
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

  agregarFavorito(id) {
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.agregameEnFavoritos(idUsuario, id).subscribe(res => {
        console.log(res);
      });
    } else {
      console.log('no estas logueado');
    }

  }

}