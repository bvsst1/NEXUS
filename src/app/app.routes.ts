import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RegisterComponent } from './components/register/register.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

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
    path: 'recover-password',
    component: RecoverPasswordComponent,
    title: 'Nexus | Recuperar contrasena'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    title: 'Nexus | Perfil'
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
    path: 'checkout-success',
    component: CheckoutSuccessComponent,
    canActivate: [authGuard],
    title: 'Nexus | Compra Exitosa'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    title: 'Nexus | Admin'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
