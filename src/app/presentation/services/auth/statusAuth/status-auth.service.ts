import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../../../environment/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthStatus, CheckTokenInterface, User } from '../../../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class StatusAuthService {

  private readonly baseUrl: string = environment.baseUrl;

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(private http: HttpClient) {}

  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) return of(false);

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenInterface>(url, { headers })
      .pipe(
        map(({ user, token }) =>  this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAutehticated)
          return of(false)
        })
      )
      }

  public setAuthentication( user: User, token: string ): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token)
    return true;
  }

  public logoutUser() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAutehticated)
  }

}
