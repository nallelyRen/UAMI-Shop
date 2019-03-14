import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';
import {PageEvent} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  productos: any[] = [];
  categoria = '';
  inicio = true;
  Restriccion=true;
  carga = false;
  constructor(private productoService: ProductosService, private usuarioService: UsuarioService, private router: Router) {
      const cat = this.productoService.getCategoria();
      if (cat !== undefined) {
        this.categoria = cat;
        const prod = this.productoService.getProductos();
        if (prod !== undefined) {
          const scroll: number = this.productoService.getScroll();
          console.log(scroll, 'ya esta');
          setTimeout(function(){ window.scrollTo(0, scroll);}, 50);
          this.productos = prod;
          console.log(this.productos, this.categoria);
          this.inicio = false;
        } else {
          //  window.scrollTo(0, 0);
        }
      } else {
        // window.scrollTo(0, 0);
      }
  }
  
  pageEvent: PageEvent;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  ngOnInit() {
    this.llamada();
    // console.log(typeof( this.productoService.getScroll()), 'regreso');
    // window.scrollTo(0, this.productoService.getScroll());
  }

  cambio(categoria) {
    this.carga = true;
    this.productos = [];
    this.categoria = categoria;
    if (categoria === 'Libros') {
      this.productoService.obtenerLibros().subscribe(res => {
        this.productos = res;
        this.carga = false;
        console.log(res);
        console.log('tipo', typeof (this.productos));
      });
    } else {
      if (categoria === 'Proyectos') {
        this.productoService.obtenerProyectos().subscribe(res => {
          this.productos = res;
          this.carga = false;
          console.log(res);
          console.log('tipo', typeof (this.productos));
        });
      } else {
      if (categoria === 'Tutorias') {
        this.productoService.obtenerTutorias().subscribe(res => {
          this.productos = res;
          this.carga = false;
          console.log(res);
          console.log('tipo', typeof (this.productos));
        });
      } else {
        if (categoria === 'Electrónica') {
        this.productoService.obtenerElectronicos().subscribe(res => {
          this.productos = res;
          this.carga = false;
          console.log(res);
          console.log('tipo', typeof (this.productos));
        });
      }
      if (categoria === 'Departamentos') {
        this.productoService.obtenerDepartamentos().subscribe(res => {
        this.productos = res;
        this.carga = false;
         console.log(res);
          console.log('tipo', typeof (this.productos));
        });
      }  else{
        if (categoria === 'Otros') {
          this.productoService.obtenerOtros().subscribe(res => {
          this.productos = res;
          this.carga = false;
           console.log(res);
            console.log('tipo', typeof (this.productos));
          });
        }
      }
    }
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
    this.carga = true;
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.agregameEnFavoritos(idUsuario, id).subscribe(res => {
        this.carga = false;
        alert('Se agrego a tu lista de favoritos correctamente, los cambios pueden demorar unos minutos en aparecer');
        console.log(res);
      });
    } else {
      this.carga = false;
      alert('Ups no se pudo agregar a tu lista de favoritos');
      console.log('no estas logueado');
    }

  }

  verProducto(producto: any) {
    console.log(window.scrollY, 'ida');
    // console.log(window.pageYOffset);
    this.productoService.setScroll(window.scrollY);
    this.productoService.setProductoCat(producto);
    this.router.navigate(['/producto/' + producto.id]);
  }
}