import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginUserService } from '../../services/auth/loginUser/login-user.service';
import { AuthStatus } from '../../../interfaces/auth';
import { StatusAuthService } from '../../services/auth/statusAuth/status-auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( StatusAuthService );
  const router      = inject( Router );

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true
  }

  router.navigateByUrl('/auth/login');

  return false;
};
