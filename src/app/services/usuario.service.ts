import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'https://uamishopbackend.azurewebsites.net/tutorial-spring-boot-0.1.0/';
  constructor( private http: Http) { }

  obtenerUsuarios() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url + 'usuarios')// .subscribe(res => console.log(res.json()));
    .pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }

  logueo(nombre, correo) {
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('correo', correo);
    return this.http.post( this.url + 'usuarios', formData)
    .pipe(
    map(res => {
      console.log(res.json());
      return res.json();
    }));
  }

  validarUsuarios(){
    
  }
}

