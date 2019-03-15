import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  // editar producto
  public producto: any;
  // para el catalogo
  public productos: any;
  public categoria: string;

  // para producto de catalogo ver mas
  public productoCat: any;

  // para el scroll de la pantalla del catalogo
  public scrollY: number;

  // para el componente de la pantalla de la cuenta
  public productosCuenta: any;
  // cadena que contiene la ruta de las peticiones al back-end

  url = 'https://uamishopback.azurewebsites.net/tutorial-spring-boot-0.1.0/';
  //url = 'http://localhost:8080/';

  // en el constructor añadimos la clase http
  constructor( private http: Http) { }

  // con este metodo se obtienen todos los libros del catalogo
  obtenerLibros() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'libros') // .subscribe(res => console.log(res.json()));
    .pipe(map(res => {
      this.productos = res.json();
      this.categoria = 'Libros';
      return res.json();
    }));
  }

  obtenerProyectos() {
    return this.http.get(this.url + 'proyectos')
    .pipe(map(res => {
      this.productos = res.json();
      this.categoria = 'Proyectos';
      return res.json();
    }));
  }

  obtenerElectronicos() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'electronica') // .subscribe(res => console.log(res.json()));
    .pipe(map(res => {
      this.productos = res.json();
      this.categoria = 'Electrónica';
      return res.json();
    }));
  }

  obtenerDepartamentos() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'departamentos') // .subscribe(res => console.log(res.json()));
    .pipe(map(res => {
      this.productos = res.json();
      this.categoria = 'Departamentos';
      return res.json();
    }));
  }

  obtenerTutorias() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'tutorias') // .subscribe(res => console.log(res.json()));
    .pipe(map(res => {
      this.productos = res.json();
      this.categoria = 'Tutorias';
      return res.json();
    }));
  }

   obtenerProductos() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'productos') // .subscribe(res => console.log(res.json()));
    .pipe(map(res => res.json()));
  }
  obtenerOtros() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'otros') // .subscribe(res => console.log(res.json()));
    .pipe(map(res => {
      this.productos = res.json();
      this.categoria = 'Otros';
      return res.json();
    }));
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

  nuevoDepartamento(nombre, precio, descripcion, file: File, idUsuario, ubicacion) {
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('file', file);
    formData.append('idUsuario', idUsuario);
    formData.append('ubicacion', ubicacion);
    return this.http.post( this.url + 'departamentos', formData)
    .pipe(
    map(res => {
      return res.json();
    }));
  }

  nuevaTutoria(nombre, precio, descripcion, area , file: File, idUsuario){
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('area', area);
  formData.append('file', file);
  formData.append('idUsuario', idUsuario);
    return this.http.post( this.url + 'tutorias', formData)
    .pipe(
    map(res => {
      return res.json();
    }));
  }

  nuevoOtro(nombre, precio, descripcion, file: File, idUsuario) {
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('file', file);
    formData.append('idUsuario', idUsuario);
    return this.http.post( this.url + 'Otros', formData)
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
        this.productosCuenta = res.json();
        console.log(res.json());
        return res.json();
      }));
  }

  agregameEnFavoritos(idUsuario, idProducto) {
    console.log('idUsuario =', idUsuario, 'idProducto=', idProducto);
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
        this.productosCuenta = res.json();
        console.log(res.json());
        return res.json();
      }));
  }

  dameMisProductos(idUsuario) {
    return this.http.get(this.url + 'misProductos/' + idUsuario)
    .pipe(
      map(res => {
        this.productosCuenta = res.json();
        console.log(res.json());
        return res.json();
      }));
  }

  eliminameProducto(idUsuario, idProducto) {
      return this.http.delete(this.url + 'productos?idUsuario=' + idUsuario + '&idProducto=' + idProducto)
      .pipe(
        map(res => {
          this.productosCuenta = res.json();
          console.log(res.json());
          return res.json();
        }));
  }

  modificaDatosProducto(idUsuario, idProducto, nombre, precio, descripcion) {
    const formData: FormData = new FormData();
    formData.append('idUsuario', idUsuario);
    formData.append('idProducto', idProducto);
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    return this.http.post( this.url + 'modificaProducto', formData)
    .pipe(
    map(res => {
      return res.json();
    }));
  }

  modificaDatosTutoria(idUsuario, idProducto, nombre, precio, descripcion, area) {
    const formData: FormData = new FormData();
    formData.append('idUsuario', idUsuario);
    formData.append('idProducto', idProducto);
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('area', area);
    return this.http.post( this.url + 'modificaTutoria', formData)
    .pipe(
      map(res => {
        return res.json();
    }));
  }

  modificaDatosProyectos(idUsuario, idProducto, nombre, precio, descripcion, representante, requisitos) {
    const formData: FormData = new FormData();
    formData.append('idUsuario', idUsuario);
    formData.append('idProducto', idProducto);
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('representante', representante);
    formData.append('requisitos', requisitos);
    return this.http.post( this.url + 'modificaProyecto', formData)
    .pipe(
      map(res => {
        return res.json();
    }));
  }

  modificaDatosDepartamentos(idUsuario, idProducto, nombre, precio, descripcion, ubicacion) {
    const formData: FormData = new FormData();
    formData.append('idUsuario', idUsuario);
    formData.append('idProducto', idProducto);
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('ubicacion', ubicacion);
    return this.http.post( this.url + 'modificaDepartamento', formData)
    .pipe(
      map(res => {
        return res.json();
    }));
  }

  modificaImagenProducto(idUsuario, idProducto, file: File) {
    const formData: FormData = new FormData();
    formData.append('idUsuario', idUsuario);
    formData.append('idProducto', idProducto);
    formData.append('file', file);
    return this.http.post( this.url + 'modificaImg', formData)
    .pipe(map(res => {
        return res.json();
    }));
  }
  // editar producto e imagen
  getProducto() {
    return this.producto;
  }

  setProducto(prod: any) {
    this.producto = prod;
  }
  // catalogo de productos
  getProductos() {
    return this.productos;
  }

  getCategoria() {
    return this.categoria;
  }

  getProductoCat() {
    return this.productoCat;
  }

  setProductoCat(prod: any) {
    this.productoCat = prod;
  }

  getScroll(): number {
    return this.scrollY;
  }

  setScroll(pos: number) {
    this.scrollY = pos;
  }
  // para la pantalla de cuenta
  getProductosCuenta(): any {
    return this.productosCuenta;
  }

}
