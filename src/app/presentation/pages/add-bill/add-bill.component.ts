import { Component, OnChanges, OnInit, SimpleChanges, inject, signal } from '@angular/core';


import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { LoginUserService } from '../../services/auth/loginUser/login-user.service';
import { TableInfoComponent } from '../../components/tableInfo/table-info/table-info.component';
import { ProviderResponseInterface } from '../../../interfaces/provider/providerFromBackend.interface';
import { ProviderService } from '../../services/provider/provider.service';
import { Subject, takeUntil } from 'rxjs';
import { Provider } from '../../../interfaces/provider/provider.interface';
import { CommonModule } from '@angular/common';
import { StatusAuthService } from '../../services/auth/statusAuth/status-auth.service';
import { Bill } from '../../../interfaces/bill/billI.interface';
import { BillService } from '../../services/bill/bill.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrordialogComponent } from '../../components/errordialog/errordialog.component';
import { BillFromBackend } from '../../../interfaces/bill/billFromBackend,interface';


/* export interface Provider {
  name: string;
  credit: boolean;
  retention: boolean;
} */


/* export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
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
]; */

@Component({
  selector: 'app-add-bill',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCheckboxModule, MatDatepickerModule, RouterModule, MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, TableInfoComponent, CommonModule],
  templateUrl: './add-bill.component.html',
  styleUrl: './add-bill.component.css'
})
export default class AddBillComponent implements OnInit {


  private destroy$ = new Subject<void>();
  creditAvailableByProvider = signal<boolean | undefined>(true);
  public billResponse: BillFromBackend[] = [];
  displayedColumnsBill: { title: string, key: string }[] = [
    { title: 'Proveedor', key: 'nameProvider' },
    { title: '# Factura', key: 'numberBill' },
    { title: 'Valor factura', key: 'value' },
    { title: 'Fecha ingreso', key: 'dateInput' },
    { title: 'Valor pendiente', key: 'balance' },
  ];

  providersList: Provider[] = []

  constructor(public dialog: MatDialog, private fb: FormBuilder, private billService: BillService, private providerService: ProviderService, private userService: StatusAuthService) { }


  ngOnInit(): void {
    (this.providerService.getAllProviders())
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (data: Provider[]) => {
          this.providersList = data;
        },
        error: (error) => {
          console.error('Error fetching providers: ', error);
        }
      });
      (this.billService.getAllBills())
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (data: BillFromBackend[]) => {
          console.log(data)
          this.billResponse = data
        },
        error: (error) => {
          console.error(`Error feching bills: ${error}`)
        }
      })
  }

  authService = inject(LoginUserService);
  router = inject(Router)

  /* Bills table */
  /* displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  */
  /* Form bill */
  public addBillForm: FormGroup = this.fb.group({
    numberBill: ['150', [Validators.required, Validators.minLength(3)]],
    provider: ['', [Validators.required]],
    valueBill: [100000, [Validators.required, Validators.min(0)]],
    credit: [false],
    dateIn: ['', [Validators.required]],
    user: ['']
  })

  onProviderChange() {
    const selectProviderId = this.addBillForm.get('provider')?.value;
    const providerAvaliableCredit = this.providersList.find(provider => provider._id === selectProviderId)
    this.creditAvailableByProvider.set(providerAvaliableCredit?.credit)
  }

  onSaveBill() {
    if (this.addBillForm.invalid) {
      this.addBillForm.markAllAsTouched()
      return
    }
    const formDataBill: Bill = this.addBillForm.value;
    console.log({ formDataBill })
    formDataBill.user = this.userService.currentUser()!._id;
    formDataBill.dateIn = new Date(formDataBill.dateIn).toISOString();
    console.log({ formDataBill })
    this.billService.createBill(formDataBill)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log("Invoice created success", response);
          this.openDialog(`Se registro la factura ${response.numberBill} en la base de datos`, true)

          this.addBillForm.reset()
          Object.keys(this.addBillForm.controls).forEach((key) => {
            this.addBillForm.get(key)?.setErrors(null);
            this.addBillForm.get(key)?.markAsUntouched();
          });
        },
        error: (error) => {
          console.error('Error creating provider:', error);
          this.openDialog(`No se pudo crear el proveedor: ${error}`, false)
        }
      })


  }

  isValidField(field: string): boolean | null {

    return this.addBillForm.controls[field].errors
      && this.addBillForm.controls[field].touched

  }

  openDialog(errorMessage: string, typeMessage: boolean): void {
    const dialogRef = this.dialog.open(ErrordialogComponent, {
      width: '550px',
      height: '150px',
      data: { message: errorMessage, typeMessage }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe();
  }

}





