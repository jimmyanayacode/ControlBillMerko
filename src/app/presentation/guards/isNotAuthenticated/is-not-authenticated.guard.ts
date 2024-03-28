import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginUserService } from '../../services/auth/loginUser/login-user.service';
import { AuthStatus } from '../../../interfaces/auth';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(LoginUserService);
  const router      = inject( Router );

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/dashboard')
    return false;
  }
  return true;
};
