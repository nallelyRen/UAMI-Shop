import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

// componentes
import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CuentaComponent} from './components/cuenta/cuenta.component';
import { LoginComponent } from './components/login/login.component';
import { PiePaginaComponent } from './components/pie-pagina/pie-pagina.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';

// rutas
import { RouterModule } from '@angular/router';
import { APP_ROUTING } from './app.routes';
import { ListUploadComponent } from './components/list-upload/list-upload.component';
import { ModificarDatosProductoComponent } from './components/modificar-datos-producto/modificar-datos-producto.component';
import { ModificarImagenProductoComponent } from './components/modificar-imagen-producto/modificar-imagen-producto.component';

// angular material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule,} from '@angular/material/paginator';
import { MatInputModule, } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ModuloEliminarComponent } from './components/modulo-eliminar/modulo-eliminar.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    SobreNosotrosComponent,
    NavbarComponent,
    ProductosComponent,
    ProductoComponent,
    CuentaComponent,
    LoginComponent,
    PiePaginaComponent,
    AyudaComponent,
    ListUploadComponent,
    AgregarProductoComponent,
    ModificarDatosProductoComponent,
    ModificarImagenProductoComponent,
     ModuloEliminarComponent
  ],
   
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    // MatPaginatorModule,
    NgbPaginationModule,
    NgbModule,
    MatInputModule,
    MatSnackBarModule,
    APP_ROUTING
  ],
  providers: [],
  entryComponents: [ModuloEliminarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
