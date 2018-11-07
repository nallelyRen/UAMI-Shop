import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:8080/usuarios';
  constructor( private http: Http) { }

  obtenerUsuarios() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url)// .subscribe(res => console.log(res.json()));
    .pipe(map(res => res.json()));
  }
}
