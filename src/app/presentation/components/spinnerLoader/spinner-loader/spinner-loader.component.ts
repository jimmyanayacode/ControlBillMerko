import { Component } from '@angular/core';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner-loader.component.html',
  styleUrl: './spinner-loader.component.css'
})
export class SpinnerLoaderComponent {

}
