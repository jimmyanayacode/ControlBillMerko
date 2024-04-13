import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStatus } from './interfaces/auth';
import { StatusAuthService } from './presentation/services/auth/statusAuth/status-auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'billsControlApp';

  constructor(
    private authService: StatusAuthService,
    private router: Router
  ) { }

  public finishedAuthCheck = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return
    }
  })
}


