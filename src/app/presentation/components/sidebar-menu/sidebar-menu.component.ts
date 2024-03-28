import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sidebar-menu',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css'
})
export class SidebarMenuComponent {

  @Input({required:true}) path!:string
  @Input({required:true}) item!:string

}
