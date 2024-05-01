import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './presentation/layout/dashboard-layout/dashboard-layout.component';
import AuthPageComponent from './presentation/auth/auth-page/auth-page.component';
import { isAuthenticatedGuard } from './core/guards/is-authenticated/is-authenticated.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'add-bill',
        loadComponent: () =>
          import('./presentation/pages/add-bill/add-bill.component'),
        data: {
          item: 'Adicionar factura',
        },
      },
      {
        path: 'search-bill',
        loadComponent: () =>
          import('./presentation/pages/search-bill/search-bill.component'),
        data: {
          item: 'Buscar facturas',
        },
      },
      {
        path: 'create-provider',
        loadComponent: () =>
          import(
            './presentation/pages/create-provider/create-provider.component'
          ),
        data: {
          item: 'Crear proveedor',
        },
      },
      {
        path: '**',
        redirectTo: 'add-bill',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'user',
    component: AuthPageComponent,
    children: [
      {
        path: 'register-user',
        loadComponent: () =>
          import('./presentation/auth/register-user/register-user.component'),
      },
      {
        path: 'login-user',
        loadComponent: () =>
          import('./presentation/auth/login-user/login-user.component'),
      },
      {
        path: '**',
        redirectTo: 'login-user',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'user',
    pathMatch: 'full',
  },
];
