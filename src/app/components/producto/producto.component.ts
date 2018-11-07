import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ProductosService } from '../../services/productos.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  usuarios: any[] = [];
  id: any;
  producto: any;
  constructor(private router: ActivatedRoute
              , private usuarioService: UsuarioService,
                private productoService: ProductosService) {
                this.router.params.subscribe(params => {
                  console.log(params['id']);
                  this.id = params['id'] - 1;
                  this.obtenerProducto(this.id);
                });
              }

  ngOnInit() {
  }

  obtenerProducto(id) {
    this.productoService.obtenerLibros().subscribe(res => {
      this.producto = res[id];
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
