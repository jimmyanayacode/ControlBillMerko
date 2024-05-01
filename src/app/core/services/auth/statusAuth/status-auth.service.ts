import { Injectable, computed, signal } from '@angular/core';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { environment } from '../../../../../environment/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AuthStatus,
  CheckTokenInterface,
  User,
} from '../../../../models/interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StatusAuthService {
  private readonly baseUrl: string = environment.baseUrl;

  // Signals to manage state of the current user and authentication status
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // Computed properties to expose state
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(private http: HttpClient, private router: Router) {}

  // Safe getter for localStorage items
  private getLocalStorageItem(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  }

  // Safe setter for localStorage items
  private setLocalStorageItem(key: string, value: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
  }

  // Safe remover for localStorage items
  private removeLocalStorageItem(key: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  }

  // Checks the authentication status by verifying the token
  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = this.getLocalStorageItem('token');

    if (!token) return of(false);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenInterface>(url, { headers }).pipe(
      retry(3), //Try at least 3 time
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError((error) => {
        console.error('Error checking auth status', error);
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  // Sets the user and token upon successful authentication
  public setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    this.setLocalStorageItem('token', token);
    this.router.navigateByUrl('/dashboard');
    return true;
  }

  // Logs out the user by clearing token and resetting state
  public logoutUser() {
    this.removeLocalStorageItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    this.router.navigateByUrl('/auth/login');
  }
}
