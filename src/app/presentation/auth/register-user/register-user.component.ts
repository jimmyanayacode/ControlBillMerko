import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ValidatorsService } from '../../services/validators/validators.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export default class RegisterUserComponent {
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  public registerUserForm: FormGroup = this.fb.group(
    {
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern(
            this.validatorsService.firstNameAndLastnamePattern
          ),
        ],
      ],
      userEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
      ],
      userNickName: [
        '',
        [Validators.required, this.validatorsService.cantBeStrider],
      ],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
      userPasswordConfirm: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo(
          'userPassword',
          'userPasswordConfirm'
        ),
      ],
    }
  );

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.registerUserForm, field);
  }

  registerUser() {
    if (this.registerUserForm.invalid) {
      this.registerUserForm.markAllAsTouched();
      return;
    }

    console.log('hola');
    console.log(this.registerUserForm.value);
  }

  getErrorMessage(field: string): string {
    if (!this.registerUserForm.controls[field].errors) return '';

    const errors = this.registerUserForm.controls[field].errors || {};

    for (const error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'Este campo es obligatorio';

        case 'pattern':
          return 'Formato incorrecto';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} letras.`;

        case 'notEqual':
          return `Las contraseñas no son iguales`;
      }
    }
    return '';
  }
}

/* const control = this.registerUserForm.get(field)

    if ( control?.errors ) {
      if ( control.errors['required']) {
        return 'Este campo es obligatorio'
      }
      if (control.errors['pattern']) {

        console.log(control.errors['pattern'])
        return `Formato errado`
      }
      if (control.errors['minlength']) {
        return `Minimo ${ control.errors['minlength'].requiredLength } caracteres`
      }

    } */
