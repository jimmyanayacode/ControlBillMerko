import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { ValidatorsService } from '../../services/validators/validators.service';
import { LoginUserService } from '../../services/auth/loginUser/login-user.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrordialogComponent } from '../../components/errordialog/errordialog.component';
import { SpinnerLoaderComponent } from '../../components/spinnerLoader/spinner-loader/spinner-loader.component';
import { StatusAuthService } from '../../services/auth/statusAuth/status-auth.service';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    SpinnerLoaderComponent
  ],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
})
export default class LoginUserComponent {

  isLoading: boolean = false;

  constructor(public dialog: MatDialog) {
    this.authService.checkAuthStatus().subscribe();
  }


  private router = inject(Router);
  private fb = inject(FormBuilder);

  private validatorsService = inject(ValidatorsService);
  private loginUserService = inject(LoginUserService);
  private authService = inject(StatusAuthService)

  public loginUserForm: FormGroup = this.fb.group({
    loginUserEmail: [
      'jimmy@gmail.com',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
    loginUserPassword: [
      '1234567',
      [Validators.required, Validators.minLength(6)],
    ],
  });

  loginUser() {
    if (this.loginUserForm.invalid) {
      this.loginUserForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const { loginUserEmail, loginUserPassword } = this.loginUserForm.value;

    this.loginUserService.login(loginUserEmail, loginUserPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard')
      },
      error: (message) => {
        this.openDialog(message);
        this.isLoading = false;
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

  openDialog(errorMessage: string): void {
    const dialogRef = this.dialog.open(ErrordialogComponent, {
      width: '550px',
      height: '150px',
      data: { message: errorMessage },
    });

    dialogRef.afterClosed().subscribe()
  }
}
