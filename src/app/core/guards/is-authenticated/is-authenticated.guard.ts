import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../../../domain/models/interfaces/auth';
import { StatusAuthService } from '../../services/statusAuth/status-auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(StatusAuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  router.navigateByUrl('/auth/login');
  return false;
};
