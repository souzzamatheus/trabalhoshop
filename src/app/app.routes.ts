import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  { path: '', component: Home, title: 'Novo Shop | Produtos' },
  { path: 'produto/:id', component: ProductDetail, title: 'Novo Shop | Produto' },
  { path: 'login', component: Login, title: 'Novo Shop | Login' },
  { path: 'perfil', component: Profile, canActivate: [authGuard], title: 'Novo Shop | Minha conta' },
  { path: '**', redirectTo: '' },
];
