import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificar-imagen-producto',
  templateUrl: './modificar-imagen-producto.component.html',
  styleUrls: ['./modificar-imagen-producto.component.css']
})
export class ModificarImagenProductoComponent implements OnInit {
  src;
  siImagen = false;
  file: File;
  producto;
  id: any;
  carga=false;
  constructor(private usuarioService: UsuarioService, private productoService: ProductosService,
              private router: ActivatedRoute) {
                this.router.params.subscribe(params => {
                  console.log(params['id']);
                  this.id = params['id'];
                  this.producto = this.productoService.getProducto();
                  console.log(this.producto);
                  if (this.producto == null) {
                        console.log('que pedo si entro aqui'+this.id);
                        this.producto = this.productoService.obtenerProductoConId(this.id).subscribe(res => {
                        console.log(res);
                        this.producto = res;
                        this.src = this.producto.archivo.url;
                      });
                  } else {
                    this.src = this.producto.archivo.url;
                  }
                });
    }

  ngOnInit() {
    // this.producto = this.productoService.getProducto();
    // this.src = this.producto.archivo.url;
    // console.log(this.src);
  }

  setImage(files: FileList) {
    this.file = files.item(0);
    if (this.file !== null){
      this.siImagen = true;
    } else {
      this.siImagen = false;
    }
  }

  cambiaImagen() {
    this.carga = true;
    if (this.siImagen) {
      const id= this.usuarioService.validarUsuarios();
      if(id!= -1){
      this.productoService.modificaImagenProducto(id, this.producto.id, this.file).subscribe(res => {
        if (res.url) {
          this.src = res.url;
          alert('La imagen de tu producto "' + this.producto.nombre + '" se ha modificado correctamente, los cambios pueden demorar unos minutos en aparecer');
          this.carga = false;
          this.siImagen = false;
        } else {
          alert('Ups, la imagen de tu producto "' + this.producto.nombre + '" no se ha podido modificar correctamente');
          this.carga = false;
        }
      });
    } else {
      alert('Ups, la imagen de tu producto "' + this.producto.nombre + '" no se ha podido modificar correctamente');
      this.carga = false;
    }
    } else {
      this.carga = false;
      alert('Selecciona la nueva imagen de tu producto para continuar');
    }
  }
}
