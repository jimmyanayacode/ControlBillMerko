/* component v1.0.1 */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { ErrordialogComponent } from '../../../../presentation/components/errordialog/errordialog.component';
import { SpinnerLoaderComponent } from '../../../../presentation/components/spinnerLoader/spinner-loader/spinner-loader.component';
import { StatusAuthService } from '../../../../core/services/statusAuth/status-auth.service';
import { DialogService } from '../../../../core/services/dashboard/dialog/dialog.service';
import { LoginUserService } from '../../../../data/services/auth/loginUser/login-user.service';
import { ValidatorsService } from '../../../../core/services/validators/validators.service';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    SpinnerLoaderComponent,
    ErrordialogComponent,
  ],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
})
export default class LoginUserComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public loginUserForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: StatusAuthService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private loginUserService: LoginUserService,
    private validatorsService: ValidatorsService
  ) {
    // Inicialización del FormGroup con validaciones
    this.loginUserForm = this.fb.group({
      loginUserEmail: [
        'jimmy@gmail.com',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
      ],
      loginUserPassword: [
        '123456',
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  ngOnInit(): void {
    // Verificar el estado de autenticación al inicio
    this.authService
      .checkAuthStatus()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    // Limpieza de recursos para evitar fugas de memoria
    this.destroy$.next();
    this.destroy$.complete();
  }

  loginUser() {
    if (this.loginUserForm.invalid) {
      // Marcar todos los campos como tocados si el formulario es inválido
      this.loginUserForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { loginUserEmail, loginUserPassword } = this.loginUserForm.value;

    this.loginUserService
      .login(loginUserEmail, loginUserPassword)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ user, token }) => {
          this.isLoading = false;
          this.authService.setAuthentication(user, token);
          this.loginUserForm.reset();
        },
        error: (message) => {
          this.dialogService.openDialog(message.error.message, false);
          this.isLoading = false;
          this.authService.logoutUser();
        },
      });
  }

  isValidField(field: string): boolean | null {
    return (
      this.loginUserForm.controls[field].errors &&
      this.loginUserForm.controls[field].touched
    );
  }

  getErrorMessage(field: string): string {
    if (!this.loginUserForm.controls[field].errors) return '';

    const errors = this.loginUserForm.controls[field].errors || {};

    for (const error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'Campo obligatorio';

        case 'pattern':
          return 'Formato incorrecto';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} letras.`;
      }
    }
    return '';
  }
}
