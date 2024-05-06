import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarService } from '../../../core/services/dashboard/toolbar/toolbar.service';
import { routes } from '../../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sidebar-menu',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, MatButtonModule, CommonModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css',
})
export class SidebarMenuComponent {
  toolbarService = inject(ToolbarService);

  goPageDashboard() {
    this.toolbarService.toggleNavigationMenu();
    console.log(this.routes);
  }

  public routes = routes[0].children?.filter((route) => route.data);
}
