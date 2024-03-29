import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ValidatorsService } from '../../services/validators/validators.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../../services/auth/registerAuth/register.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrordialogComponent } from '../../components/errordialog/errordialog.component';

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
    MatDialogModule
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export default class RegisterUserComponent {
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  private registerService = inject(RegisterService);
  private router = inject(Router);

  public registerUserForm: FormGroup = this.fb.group(
    {
      userNameRegister: [
        '',
        [
          Validators.required,
          Validators.pattern(
            this.validatorsService.firstNameAndLastnamePattern
          ),
        ],
      ],
      userEmailRegister: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
      ],
      userNickNameRegister: [
        '',
        [Validators.required, this.validatorsService.cantBeStrider],
      ],
      userPasswordRegister: ['', [Validators.required, Validators.minLength(6)]],
      userPasswordConfirm: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo(
          'userPasswordRegister',
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

    const { userNameRegister, userEmailRegister, userPasswordRegister } = this.registerUserForm.value;

    console.log('hola');
    console.log(this.registerUserForm.value);

    this.registerService.register( userEmailRegister, userNameRegister, userPasswordRegister).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard')
      },
      error: (message) => {
        this.openDialog(message);
      }
    })



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

  openDialog(errorMessage: string): void {
    const dialogRef = this.dialog.open(ErrordialogComponent, {
      width: '550px',
      height: '150px',
      data: { message: errorMessage },
    });

    dialogRef.afterClosed().subscribe()
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
