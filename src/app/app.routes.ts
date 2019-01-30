import {RouterModule, Routes} from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { LoginComponent } from './components/login/login.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';

import { ModificarDatosProductoComponent } from './components/modificar-datos-producto/modificar-datos-producto.component';
import { ModificarImagenProductoComponent } from './components/modificar-imagen-producto/modificar-imagen-producto.component';

import { ListUploadComponent } from './components/list-upload/list-upload.component';


const APP_ROUTES: Routes = [
    {path: 'principal', component: PrincipalComponent },
    {path: 'miCuenta', component: CuentaComponent },
    {path: 'ayuda', component: AyudaComponent },
    {path: 'login', component: LoginComponent },
    {path: 'producto/:id', component: ProductoComponent },
    {path: 'agregarProducto', component: AgregarProductoComponent},
    {path: 'productos', component: ProductosComponent },
    {path: 'sobreNosotros', component: SobreNosotrosComponent },
    {path: 'modificarDatosProducto', component: ModificarDatosProductoComponent },
    {path: 'modificarImagenProducto', component: ModificarImagenProductoComponent },
    {path: '**', pathMatch: 'full', redirectTo: 'principal'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
