import { Component, computed, effect, inject } from '@angular/core';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { routes } from '../../../app.routes';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginUserService } from '../../services/auth/loginUser/login-user.service';
import { AuthStatus } from '../../../interfaces/auth';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [ SidebarMenuComponent, RouterModule, CommonModule ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  authServie = inject( LoginUserService );

  constructor(){
    this.authServie.checkAuthStatus().subscribe()
  }

  public routes = routes[0].children?.filter( route => route.data );




}
