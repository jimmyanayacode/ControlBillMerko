import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './presentation/layout/dashboard-layout/dashboard-layout.component';
import AuthPageComponent from './features/pages/auth/auth-page/auth-page.component';
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
          import('./features/pages/bill/add-bill/add-bill.component'),
        data: {
          category: 'Facturas',
          item: 'Adicionar factura',
        },
      },
      {
        path: 'search-bill',
        loadComponent: () =>
          import('./features/pages/bill/search-bill/search-bill.component'),
        data: {
          category: 'Facturas',
          item: 'Buscar facturas',
        },
      },
      {
        path: 'create-provider',
        loadComponent: () =>
          import(
            './features/pages/provider/create-provider/create-provider.component'
          ),
        data: {
          category: 'Proveedor',
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
          import('./features/pages/auth/register-user/register-user.component'),
      },
      {
        path: 'login-user',
        loadComponent: () =>
          import('./features/pages/auth/login-user/login-user.component'),
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
