import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StatusAuthService } from '../../../services/auth/statusAuth/status-auth.service';
import { ToolbarService } from '../../../services/dashboard/toolbar/toolbar.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {

  private elemento!: HTMLElement;

  constructor(){
  }

  private authService = inject(StatusAuthService);
  private toolbarService = inject(ToolbarService);


  toggleMenu(){
    this.toolbarService.toggleNavigationMenu();
    console.log(this.toolbarService.toggleNavigation())
  }

  onLogout(){
    this.authService.logoutUser();
  }

}