import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 Restriccion=true;
  constructor(private usuarioService: UsuarioService ) { 

  }

  ngOnInit() {    
    this.llamada();
  }

 
   llamada(){
      const id= this.usuarioService.validarUsuarios();      
     if(id== -1){
      console.log('el valor es ',id);
      // await(100000);
      // this.llamada();
        return this.Restriccion; 
     }else{
      console.log('el valor es ',id);
       return this.Restriccion=false;
     }
      
  }
}
