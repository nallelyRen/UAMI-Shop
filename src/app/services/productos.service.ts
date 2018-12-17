import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  // cadena que contiene la ruta de las peticiones al back-end
  url = 'https://uamishopbackend.azurewebsites.net/tutorial-spring-boot-0.1.0/';
  // en el constructor añadimos la clase http
  constructor( private http: Http) { }

  // con este metodo se obtienen todos los libros del catalogo
  obtenerLibros() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'libros') // .subscribe(res => console.log(res.json()));
    .pipe(map(res => res.json()));
  }

  obtenerProyectos() {
    return this.http.get(this.url + 'proyectos')
    .pipe(map(res => res.json()));
  }

  obtenerElectronicos() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'electronica') // .subscribe(res => console.log(res.json()));
    .pipe(map(res => res.json()));
  }

  obtenerProductos() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'productos') // .subscribe(res => console.log(res.json()));
    .pipe(map(res => res.json()));
  }


  nuevoLibro(nombre, precio, descripcion, file: File, idUsuario) {
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('file', file);
    formData.append('idUsuario', idUsuario);
    return this.http.post( this.url + 'libros', formData)
    .pipe(
    map(res => {
      console.log('si llego');
      console.log(res.json());
      return res.json();
    }));
  }

  nuevoProyecto(nombre, representante, precio, descripcion, requisitos, file: File, idUsuario) {
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('representante', representante);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('requisitos', requisitos);
    formData.append('file', file);
    formData.append('idUsuario', idUsuario);
    return this.http.post( this.url + 'proyectos', formData)
    .pipe(
    map(res => {
      console.log('si entro');
      console.log(res.json());
      return res.json();
    }));
  }

  nuevoElectronico(nombre, precio, descripcion, file: File, idUsuario) {
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('file', file);
    formData.append('idUsuario', idUsuario);
    return this.http.post( this.url + 'electronica', formData)
    .pipe(
    map(res => {
      console.log('si entro');
      console.log(res.json());
      return res.json();
    }));
  }


  obtenerProductoConId(idProducto) {
    return this.http.get(this.url + 'productos/' + idProducto)
    .pipe(
      map(res => {
        console.log('si entro');
        console.log(res.json());
        return res.json();
      }));
  }

  // metodo para obtener los productos favoritos de un usuario regresa una
  // coleccion de los productos favoritos del usuario
  dameMisFavoritos(idUsuario) {
    console.log(idUsuario);
    return this.http.get(this.url + 'misFavoritos/' + idUsuario)
    .pipe(
      map(res => {
        console.log(res.json());
        return res.json();
      }));
  }

  agregameEnFavoritos(idUsuario, idProducto) {
    return this.http.put(this.url + 'agregaFavorito/' + idUsuario + '/' + idProducto, null)
    .pipe(
      map(res => {
        console.log(res.json());
        return res.json();
      }));
  }


  eliminameEnFavoritos(idUsuario, idProducto) {
    return this.http.put(this.url + 'eliminaFavorito/' + idUsuario + '/' + idProducto, null)
    .pipe(
      map(res => {
        console.log(res.json());
        return res.json();
      }));
  }

  dameMisProductos(idUsuario) {
    return this.http.get(this.url + 'misProductos/' + idUsuario)
    .pipe(
      map(res => {
        console.log(res.json());
        return res.json();
      }));
  }

  eliminameProducto(idUsuario, idProducto) {
      return this.http.delete(this.url + 'productos?idUsuario=' + idUsuario + '&idProducto=' + idProducto)
      .pipe(
        map(res => {
          console.log(res.json());
          return res.json();
        }));
  }



  
}
