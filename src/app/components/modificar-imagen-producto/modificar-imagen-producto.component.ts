import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';

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
  constructor(private usuarioService: UsuarioService, private productoService: ProductosService) { }

  ngOnInit() {
    this.producto = this.productoService.getProducto();
    this.src = this.producto.archivo.url;
    console.log(this.src);
  }

  setImage(files: FileList) {
    this.file = files.item(0);
    this.siImagen = true;
  }

  cambiaImagen() {
    if (this.siImagen) {
      const id= this.usuarioService.validarUsuarios();    
      if(id== -1){
      this.productoService.modificaImagenProducto(id, this.producto.id, this.file).subscribe(res => {
        if (res.url) {
          this.src = res.url;
          alert('La imagen de tu producto "' + this.producto.nombre + '" se ha modificado correctamente');
          this.siImagen = false;
        } else {
          alert('Ups, la imagen de tu producto "' + this.producto.nombre + '" no se ha podido modificar correctamente');
        }
      });
    
    }
    } else {
      alert('Selecciona la nueva imagen de tu producto para continuar');
    }
  }
}
