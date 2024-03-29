import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { LoginUserResponse } from '../../../../interfaces/auth';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { StatusAuthService } from '../statusAuth/status-auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService {

  constructor(private http: HttpClient){}

  private readonly baseUrl: string = environment.baseUrl;
  private authService = inject(StatusAuthService)

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password }

    return this.http.post<LoginUserResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.authService.setAuthentication(user, token)),
        catchError(err => throwError(() => err.error.message))
      )
  }

  logout(){
    this.authService.logoutUser()
  }
}

