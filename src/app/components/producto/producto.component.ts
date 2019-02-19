import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ProductosService } from '../../services/productos.service';
import {FormControl, Validators} from '@angular/forms';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
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
              }

  ngOnInit() {
  
  }

  condicionDepartamento(produc){
    this.produc=produc;
      if(this.produc.categoria==='electronica'){
        console.log('categoria', this.produc.categoria);
        return this.flag=true;
      }else{
        console.log('categoria', this.produc.categoria);
        return this.flag=false;
      }
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

}