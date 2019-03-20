import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import {Router} from '@angular/router';
import { $ } from 'protractor';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  hero=true;
  constructor(private usuarioService: UsuarioService, private router: Router ) { }
  
  ngOnInit() {
   
  }
  irCatalogo() {
    const id = this.usuarioService.validarUsuarios();
    if (id !== -1) {
      this.router.navigate(['/productos']);
    } else {
      alert('Necesitas estar logueado para acceder a esta sección');
      this.router.navigate(['/principal']);
    }
  }

  
}
