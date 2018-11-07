import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url = 'http://localhost:8080/productos';
  constructor( private http: Http) { }

  obtenerLibros() {
    // this.http.get(this.url2).subscribe(res => console.log('hola', res));
    return this.http.get(this.url)// .subscribe(res => console.log(res.json()));
    .pipe(map(res => res.json()));
  }
}
