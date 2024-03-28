
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors,  } from '@angular/forms';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {
  validate(control: AbstractControl<any, any>):  Observable<ValidationErrors | null> {
    throw new Error('Method not implemented.');
  }




}
