import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    title: 'Nexus | Catalogo'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Nexus | Login'
  },
  {
    path: 'registro',
    component: RegisterComponent,
    title: 'Nexus | Registro'
  },
  {
    path: 'producto/:id',
    component: ProductDetailComponent,
    title: 'Nexus | Detalle'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Nexus | Carrito'
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Nexus | Admin'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Nexus | Perfil'
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent,
    title: 'Nexus | Recuperar contrasena'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
