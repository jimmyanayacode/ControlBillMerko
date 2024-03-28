import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { LoginUserService } from './presentation/services/auth/loginUser/login-user.service';
import { AuthStatus } from './interfaces/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'billsControlApp';

  constructor(){}

  private authService = inject(LoginUserService);
  private router = inject(Router);

  public finishedAuthCheck = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return
      case AuthStatus.notAutehticated:
        this.router.navigateByUrl('/auth/login');
        return
    }
  })
}


