import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { ToolbarService } from '../../services/dashboard/toolbar/toolbar.service';

@Component({
  selector: 'sidebar-menu',
  standalone: true,
  imports: [ RouterModule, MatSidenavModule, MatButtonModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css'
})
export class SidebarMenuComponent {

  toolbarService = inject(ToolbarService)

  @Input({required:true}) path!:string
  @Input({required:true}) item!:string

  goPageDashboard() {
    this.toolbarService.toggleNavigationMenu();
  }


}
