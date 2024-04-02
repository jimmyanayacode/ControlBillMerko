import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'sidebar-menu',
  standalone: true,
  imports: [ RouterModule, MatSidenavModule, MatButtonModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css'
})
export class SidebarMenuComponent {

  @Input({required:true}) path!:string
  @Input({required:true}) item!:string

}
