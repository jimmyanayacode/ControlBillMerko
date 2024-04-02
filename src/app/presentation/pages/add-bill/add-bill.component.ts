import { Component, inject } from '@angular/core';


import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { LoginUserService } from '../../services/auth/loginUser/login-user.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Provider {
  name: string;
  credit: boolean;
  retention: boolean;
}

interface Animal {
  name: string;
  sound: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-add-bill',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ MatCheckboxModule, MatDatepickerModule, RouterModule, MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './add-bill.component.html',
  styleUrl: './add-bill.component.css'
})
export default class AddBillComponent {

  constructor( private fb: FormBuilder ){}

  authService = inject(LoginUserService);
  router = inject(Router)

  /* Bills table */
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  /* Form bill */
  public addBillForm: FormGroup = this.fb.group({
    numberBill: ['', [Validators.required, Validators.minLength(3)]],
    provider: ['', [Validators.required]],
    valueBill: ['', [Validators.required, Validators.min(0)]],
    credit: [false],
    dateIn: ['', [Validators.required]]
  })



  /* Providers */
  providersList: Provider[] = [
    {
      name: 'nutresa',
      credit: true,
      retention: false,
    },
    {
      name: 'freskaleche',
      credit: true,
      retention: false,
    },
    {
      name: 'coca cola',
      credit: true,
      retention: false,
    },
    {
      name: 'postobon',
      credit: true,
      retention: false,
    },
    {
      name: 'gavassa',
      credit: true,
      retention: false,
    },

  ]

  onSaveBill():void {
    if ( this.addBillForm.invalid ) {
      this.addBillForm.markAllAsTouched()
      return
    }
    console.log( this.addBillForm.value )
    this.addBillForm.reset()
  }

  isValidField( field: string ) : boolean | null {

    return this.addBillForm.controls[field].errors
      && this.addBillForm.controls[field].touched

  }
}





