import { Component, OnDestroy, OnInit, computed, inject, viewChild } from '@angular/core';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { routes } from '../../../app.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatusAuthService } from '../../services/auth/statusAuth/status-auth.service';
import { ToolbarComponent } from '../../components/toolbar/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarService } from '../../services/dashboard/toolbar/toolbar.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [SidebarMenuComponent, RouterModule, CommonModule, ToolbarComponent, MatButtonModule, MatIconModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(
    private authService: StatusAuthService,
    public toolbarService: ToolbarService) {}

  ngOnInit(): void {
    this.authService.checkAuthStatus()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  menu = computed(() => this.toolbarService.toggleNavigation())

  public routes = routes[0].children?.filter(route => route.data);




}
