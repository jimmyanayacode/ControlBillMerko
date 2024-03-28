import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../../environment/environments';
import { UserRegisterResponse } from '../../../../interfaces/auth/register-response.interface';

interface UserResponse {
  id:    string;
  name:  string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( private http: HttpClient ) { }

  private apiUrl:string = 'http://localhost:3000/users?email='

  private readonly baseUrl: string = environment.baseUrl;

  checkEmail( email: string) {
    return this.http.get<UserResponse[]>( `${this.apiUrl}${email}`  ).pipe(
      map( users => users.length > 0 ? {emailTaken: true} : null )
    )
  }

  /* register( email:string, name:string, password:string) {
    const url = `${this.baseUrl}/auth/register`
    const body = { email, name, password }

    return this.http.post<UserRegisterResponse>(url, body)
      .pipe(
        map({user, token})
      )
  } */

}
