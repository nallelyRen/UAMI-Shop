import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import {Router} from '@angular/router';
import { $ } from 'protractor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  hero=true;
  closeResult: string;
  constructor(private usuarioService: UsuarioService, private router: Router, private modalService: NgbModal ) { }
  
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
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}
