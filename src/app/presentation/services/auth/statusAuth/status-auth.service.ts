import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../../../environment/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthStatus, CheckTokenInterface, User } from '../../../../interfaces/auth';
import { LoginUserService } from '../loginUser/login-user.service';

@Injectable({
  providedIn: 'root'
})
export class StatusAuthService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  authService = inject( LoginUserService );

  checkAuthStatus():Observable<boolean> {

    const url   =   `${ this.baseUrl }/auth/check-token`;
    const token = localStorage.getItem('token');

    if(!token) return of(false);

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

      return this.http.get<CheckTokenInterface>(url, {headers})
        .pipe(
          map(({token, user}) => {
            this.authService.setCurrentUser(user);
            localStorage.setItem('token', token);
            return true
          }),
          catchError(() => {
            this.authService.setAuthStatus( AuthStatus.notAutehticated )
            return of(false)
          })
        )
  }



}
