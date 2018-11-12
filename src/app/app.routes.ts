import {RouterModule, Routes} from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { LoginComponent } from './components/login/login.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';

const APP_ROUTES: Routes = [
    {path: 'principal', component: PrincipalComponent },
    {path: 'miCuenta', component: CuentaComponent },
    {path: 'ayuda', component: AyudaComponent },
    {path: 'login', component: LoginComponent },
    {path: 'producto/:id', component: ProductoComponent },
    {path: 'productos', component: ProductosComponent },
    {path: 'sobreNosotros', component: SobreNosotrosComponent },
    {path: '**', pathMatch: 'full', redirectTo: 'principal'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);