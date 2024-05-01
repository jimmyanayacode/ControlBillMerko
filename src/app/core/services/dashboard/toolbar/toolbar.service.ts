import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor() {}

  toggleNavigation = signal(true)

  toggleNavigationMenu(){
     this.toggleNavigation.update( value => !value);
  }

}
