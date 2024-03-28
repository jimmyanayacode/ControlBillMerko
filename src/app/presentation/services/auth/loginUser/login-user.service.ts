import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../../../environment/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthStatus, CheckTokenInterface, LoginUserResponse, User } from '../../../../interfaces/auth';
import { Observable, catchError, map, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LoginUserService {

  private readonly baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient){
  }

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  setCurrentUser(user: User | null): void {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
  }

  setAuthStatus(status: AuthStatus) {
    this._authStatus.set(status);
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true
  }

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password }

    return this.http.post<LoginUserResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(err => throwError(() => err.error.message))
      )
  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) return of(false);

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenInterface>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this.setAuthStatus(AuthStatus.notAutehticated)
          return of(false)
        })
      )
  }

  logout(){
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this.setAuthStatus(AuthStatus.notAutehticated)
  }
}
