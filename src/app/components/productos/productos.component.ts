import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';
import {PageEvent} from '@angular/material';
import {Router} from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {

  pagina = 1;
  numPag = 0;
  // length = 100;
  // pageSize = 10;
  // pageSizeOptions: number[] = [5, 10, 25, 100];
  productos: any[] = [];
  categoria = '';
  inicio = 1;
  actual = 1;
  Restriccion=true;
  carga = false;

  constructor(private productoService: ProductosService, private usuarioService: UsuarioService, 
    private router: Router, public snackbarService: SnackbarService, private snackBar: MatSnackBar) {

      const cat = this.productoService.getCategoria();
      if (cat !== undefined) {
        this.categoria = cat;
        if (cat === 'Libros') {
          this.actual = 2;
        }
        if (cat === 'Proyectos') {
          this.actual = 3;
        }
        if (cat === 'Electrónica') {
          this.actual = 4;
        }
        if (cat === 'Departamentos') {
          this.actual = 5;
        }
        if (cat === 'Tutorias') {
          this.actual = 6;
        }
        if (cat === 'Otros') {
          this.actual = 7;
        }
        const prod = this.productoService.getProductos();
        if (prod !== undefined) {
          const scroll: number = this.productoService.getScroll();

         // console.log(scroll, 'ya esta');

          setTimeout(function() { window.scrollTo(0, scroll); }, 50);
          this.productos = prod.content;
          this.numPag = prod.totalElements;
          this.pagina = prod.number + 1;

          //console.log(this.productos, this.categoria);

          this.inicio = 2;
        } else {
          //  window.scrollTo(0, 0);
        }
      } else {
        // window.scrollTo(0, 0);
      }
  }
  
  // pageEvent: PageEvent;
  // setPageSizeOptions(setPageSizeOptionsInput: string) {
    // this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  // }
  ngOnInit() {
    this.llamada();

    // console.log(typeof( this.productoService.getScroll()), 'regreso');
    // window.scrollTo(0, this.productoService.getScroll());
  }

  ngOnDestroy() {

   // console.log(window.scrollY, 'ida');

    // console.log(window.pageYOffset);
    this.productoService.setScroll(window.scrollY);
  }

  cambio(categoria) {
    this.carga = true;
    this.productos = [];
    this.categoria = categoria;
    this.pagina = 1;
    if (categoria === 'Libros') {
      this.productoService.librosPorPagina(0, 2)
      .subscribe(res => {
        this.productos = res.content;
        this.carga = false;
        this.numPag = res.totalElements;
        // console.log('tipo', typeof (this.productos));
      });
    } else {
      if (categoria === 'Proyectos') {
        this.productoService.proyectosPorPagina(0, 2)
        .subscribe(res => {
          this.productos = res.content;
          this.carga = false;
          this.numPag = res.totalElements;

         // console.log(res);

          // console.log('tipo', typeof (this.productos));
        });
      } else {
      if (categoria === 'Tutorias') {
        this.productoService.tutoriasPorPagina(0, 2)
        .subscribe(res => {
          this.productos = res.content;
          this.carga = false;
          this.numPag = res.totalElements;

         // console.log(res);

          // console.log('tipo', typeof (this.productos));
        });
      } else {
        if (categoria === 'Electrónica') {
          this.productoService.electronicosPorPagina(0, 2)
          .subscribe(res => {
          this.productos = res.content;
          this.carga = false;
          this.numPag = res.totalElements;

         // console.log(res);

          // console.log('tipo', typeof (this.productos));
        });
      }
      if (categoria === 'Departamentos') {
        this.productoService.departamentosPorPagina(0, 2)
        .subscribe(res => {
        this.productos = res.content;
        this.carga = false;
        this.numPag = res.totalElements;

       // console.log(res);

        // console.log('tipo', typeof (this.productos));
        });
      }  else {
        if (categoria === 'Otros') {
          this.productoService.otrosPorPagina(0, 2)
          .subscribe(res => {
          this.productos = res.content;
          this.carga = false;
          this.numPag = res.totalElements;

          //console.log(res);

          // console.log('tipo', typeof (this.productos));
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
     // console.log(res);
     // console.log('tipo', typeof (this.productos));
    });
}

llamada(){
    const id= this.usuarioService.validarUsuarios();      
   if(id== -1){
    //console.log('el valor es ',id);
    this.Restriccion=true;
    alert('No estas logueado por lo que el contenido de la página no se mostrará');
    return this.Restriccion; 
   } else {

   // console.log('el valor es ',id);

     return this.Restriccion=false;
   }
}

agregarFavorito(id) {
    this.carga = true;
    const idUsuario = this.usuarioService.validarUsuarios();
    if (idUsuario != -1) {
      this.productoService.agregameEnFavoritos(idUsuario, id).subscribe(res => {
        this.carga = false;

        this.snackbarService.open("Se agrego a tu lista de favoritos correctamente","los cambios pueden demorar unos minutos en aparecer");
       //  console.log(res);

      });
    } else {
      this.carga = false;
      this.snackbarService.open("Ups no se pudo agregar a tu lista de favoritos","");
     //  console.log('no estas logueado');
    }

}

verProducto(producto: any) {
    this.productoService.setProductoCat(producto);
    this.router.navigate(['/producto/' + producto.id]);
}

cambioPagina() {
  this.carga = true;
  this.productos = [];
  const pagina = this.pagina - 1;
    if (this.categoria === 'Libros') {
      this.productoService.librosPorPagina(pagina, 2)
      .subscribe(res => {
        this.productos = res.content;
        this.carga = false;
        this.numPag = res.totalElements;
        // console.log('tipo', typeof (this.productos));
      });
    } else {
      if (this.categoria === 'Proyectos') {
        this.productoService.proyectosPorPagina(pagina, 2)
        .subscribe(res => {
          this.productos = res.content;
          this.carga = false;
          this.numPag = res.totalElements;

          //console.log(res);

          // console.log('tipo', typeof (this.productos));
        });
      } else {
      if (this.categoria === 'Tutorias') {
        this.productoService.tutoriasPorPagina(pagina, 2)
        .subscribe(res => {
          this.productos = res.content;
          this.carga = false;
          this.numPag = res.totalElements;

         // console.log(res);

          // console.log('tipo', typeof (this.productos));
        });
      } else {
        if (this.categoria === 'Electrónica') {
          this.productoService.electronicosPorPagina(pagina, 2)
          .subscribe(res => {
          this.productos = res.content;
          this.carga = false;
          this.numPag = res.totalElements;

          //console.log(res);

          // console.log('tipo', typeof (this.productos));
        });
      }
      if (this.categoria === 'Departamentos') {
        this.productoService.departamentosPorPagina(pagina, 2)
        .subscribe(res => {
        this.productos = res.content;
        this.carga = false;
        this.numPag = res.totalElements;

      //  console.log(res);

        // console.log('tipo', typeof (this.productos));
        });
      }  else {
        if (this.categoria === 'Otros') {
          this.productoService.otrosPorPagina(pagina, 2)
          .subscribe(res => {
          this.productos = res.content;
          this.carga = false;
          this.numPag = res.totalElements;

         // console.log(res);

          // console.log('tipo', typeof (this.productos));
          });
        }
      }
    }

  }
  }

}
}