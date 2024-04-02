import { Component, ElementRef, computed, inject, viewChild } from '@angular/core';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { routes } from '../../../app.routes';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatusAuthService } from '../../services/auth/statusAuth/status-auth.service';
import { ToolbarComponent } from '../../components/toolbar/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarService } from '../../services/dashboard/toolbar/toolbar.service';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [ SidebarMenuComponent, RouterModule, CommonModule, ToolbarComponent, MatButtonModule, MatIconModule ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {


  authService = inject( StatusAuthService );
  toolbarService = inject(ToolbarService)

  constructor(){
    this.authService.checkAuthStatus().subscribe();
  }

  menu = computed(() =>  this.toolbarService.toggleNavigation())


  public routes = routes[0].children?.filter( route => route.data );




}
