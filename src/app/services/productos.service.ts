import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  // cadena que contiene la ruta de las peticiones al back-end
  url = 'http://localhost:8080/';
  // en el constructor añadimos la clase http
  constructor( private http: Http) { }

  // con este metodo se obtienen todos los libros del catalogo
  obtenerLibros() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'libros') //.subscribe(res => console.log(res.json()));
    .pipe(map(res => res.json()));
  }

  obtenerProyectos() {
    return this.http.get(this.url + 'proyectos')
    .pipe(map(res => res.json()));
  }

  obtenerElectronicos() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'electronica') //.subscribe(res => console.log(res.json()));
    .pipe(map(res => res.json()));
  }

  obtenerProductos() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'productos') //.subscribe(res => console.log(res.json()));
    .pipe(map(res => res.json()));
  }


  nuevoLibro(nombre, precio, descripcion, file: File) {
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('file', file);
    return this.http.post( this.url + 'libros', formData)
    .pipe(
    map(res => {
      console.log('si entro');
      console.log(res.json());
      return res.json();
    }));
  }

  nuevoProyecto(nombre, representante, precio, descripcion, requisitos, file: File) {
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('representante', representante);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('requisitos', requisitos);
    formData.append('file', file);
    return this.http.post( this.url + 'proyectos', formData)
    .pipe(
    map(res => {
      console.log('si entro');
      console.log(res.json());
      return res.json();
    }));
  }

  nuevoElectronico(nombre, precio, descripcion, file: File) {
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('file', file);
    return this.http.post( this.url + 'electronica', formData)
    .pipe(
    map(res => {
      console.log('si entro');
      console.log(res.json());
      return res.json();
    }));
  }

  // este metodo sirve para hacer una peticion post, hacia el back-end
  /**nuevoLibro( libro: any, file: File) {
    // creamos un formData para enviarselo al backend
    const formData: FormData = new FormData();
    formData.append("nombre", libro.nombre);
    // formData.append("categoria", libro.categoria);
    formData.append("precio", libro.precio);
    formData.append("descripcion", libro.descripcion);
    formData.append("file", file);
    return this.http.post( this.url, formData)
    .pipe(
    map(res => {
      console.log('si entro');
      console.log(res.json());
      return res.json();
    }));
  }**/
}
