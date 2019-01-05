import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// componentes
import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
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
    ModificarImagenProductoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
