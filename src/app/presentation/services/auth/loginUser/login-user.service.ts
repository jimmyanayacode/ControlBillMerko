/* service v1.0.1 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from '../../../../../environment/environments';

import { LoginUserResponse } from '../../../../interfaces/auth';

import { StatusAuthService } from '../statusAuth/status-auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService {

  constructor(private http: HttpClient, private authService: StatusAuthService){}

  private readonly baseUrl: string = environment.baseUrl;

  login(email: string, password: string): Observable<LoginUserResponse> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password }
    return this.http.post<LoginUserResponse>(url, body)

  }

  logout(){
    this.authService.logoutUser()
  }
}

