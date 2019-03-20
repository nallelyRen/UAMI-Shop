import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // para el scroll de la pantalla de la cuenta
  public infoUsuario: any;
  public tipo: string;
  public scrollCuenta: number;

  // usuario
  Nombre = "";
  Correo = "";
  id = "";

  url = 'https://uamishopback.azurewebsites.net/tutorial-spring-boot-0.1.0/';
  //url = 'http://localhost:8080/';

  constructor(private http: Http) { }

  obtenerUsuarios() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'usuarios')// .subscribe(res => console.log(res.json()));
      .pipe(map(res => {
        console.log(res.json());
        return res.json();
      }));
  }

  logueo(nombre, correo) {
    console.log('entro en logueo');
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('correo', correo);
    console.log('entro en logueo 2' + nombre + correo);
    return this.http.post(this.url + 'usuarios', formData)
      .pipe(
        map(res => {
          this.infoUsuario = res.json();
          this.tipo = 'infoUsuario';
          console.log(res.json());
          return res.json();
        }));
  }
  validar(texto) {
    if (texto.length === 0 || /^\s+$/.test(texto)) {
      return false;
    }
    return true;

  }
  validarUsuarios() {
    if (localStorage.getItem('correo')) {
      if (this.validar(localStorage.getItem('nombre')) && this.validar(localStorage.getItem('correo'))) {
        if (this.id !== '') {
          this.Nombre = localStorage.getItem('nombre');
          this.Correo = localStorage.getItem('correo');
          console.log(this.Nombre + 'entro con correo  ' + this.Correo + 'id' + this.id);
          return this.id;
        } else {
          this.logueo(localStorage.getItem('nombre'), localStorage.getItem('correo')).subscribe(res => {
            console.log(res);
            this.id = res.id;
            this.Nombre = res.nombre;
            this.Correo = res.correo;
            return this.id;
          });
          console.log(this.Nombre + 'entro sin id ' + this.Correo);

        }
      } else {
        alert('Hoho, parece que ocurrio un problema al acceder a tu cuenta, por favor intenta entrar nuevamente');
        return -1;
      }

    } else {
      this.Nombre = '';
      this.Correo = '';
      this.id = '';
      console.log(this.Nombre + 'no esta logueado ' + this.Correo);
      return -1;
    }
  }

  obtenerUsuarioPorId(id) {
    return { "nombre": this.Nombre, "correo": this.Correo };
  }

  modificarUsuario(idUsuario, telefono) {
    return this.http.put(this.url + 'usuarios?idUsuario=' + idUsuario + '&telefono=' + telefono, null)
      .pipe(
        map(res => {
          this.infoUsuario = res.json();
          this.tipo = 'infoUsuario';
          return res.json();
        }));
  }


  modificarCalificacion(idUsuario,idUsuarioAcalificar, calificacion) {
    const formData: FormData = new FormData();
    formData.append('idUsuario', idUsuario);
    formData.append('calificacion', calificacion);
    formData.append('idUsuarioAcalificar', idUsuarioAcalificar);   
    return this.http.post( this.url + 'calificaUsuario', formData)   
      .pipe(
        map(res => {
          return res.json();
        }));
  }

  getInfoUsuario(): any {
    return this.infoUsuario;
  }

  getTipoCuenta(): string {
    return this.tipo;
  }

  setTipoCuenta(tipo: string) {
    this.tipo = tipo;
  }

  // pagina de cuenta
  getScrollCuenta(): number {
    return this.scrollCuenta;
  }

  setScrollCuenta(pos: number) {
    this.scrollCuenta = pos;
  }

}

