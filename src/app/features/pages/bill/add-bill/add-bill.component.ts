import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Subject, takeUntil } from 'rxjs';

import { Provider } from '../../../../domain/models/interfaces/provider/provider.interface';
import {
  Bill,
  BillBackendResponse,
} from '../../../../domain/models/interfaces/bill';
import { BillService } from '../../../../data/services/bill/bill.service';
import { ProviderService } from '../../../../data/services/provider/provider.service';
import { StatusAuthService } from '../../../../core/services/statusAuth/status-auth.service';
import { DialogService } from '../../../../core/services/dashboard/dialog/dialog.service';
import { TableInfoComponent } from '../../../../presentation/components/tableInfo/table-info/table-info.component';

@Component({
  selector: 'app-add-bill',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule,
    TableInfoComponent,
  ],
  templateUrl: './add-bill.component.html',
  styleUrl: './add-bill.component.css',
})
export default class AddBillComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public creditAvailableByProvider = signal<boolean | undefined>(true);
  public billResponse: BillBackendResponse[] = [];
  public providersList: Provider[] = [];
  public displayedColumnsBill: { title: string; key: string }[] = [
    { title: 'Proveedor', key: 'nameProvider' },
    { title: '# Factura', key: 'numberBill' },
    { title: 'Valor factura', key: 'value' },
    { title: 'Fecha ingreso', key: 'dateInput' },
    { title: 'Valor pendiente', key: 'balance' },
  ];

  constructor(
    private fb: FormBuilder,
    private billService: BillService,
    private providerService: ProviderService,
    private userService: StatusAuthService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.providerService
      .getAllProviders()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Provider[]) => {
          this.providersList = data;
        },
        error: (error) => {
          console.error('Error fetching providers: ', error);
        },
      });
    this.billService
      .getAllBills()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: BillBackendResponse[]) => {
          this.billResponse = data;
        },
        error: (error) => {
          console.error(`Error feching bills: ${error}`);
        },
      });
  }

  ngOnDestroy(): void {
    // Limpieza de recursos para evitar fugas de memoria
    this.destroy$.next();
    this.destroy$.complete();
  }

  /* Form bill */
  public addBillForm: FormGroup = this.fb.group({
    numberBill: ['', [Validators.required, Validators.minLength(3)]],
    provider: ['', [Validators.required]],
    valueBill: [100000, [Validators.required, Validators.min(0)]],
    credit: [false],
    dateIn: ['', [Validators.required]],
    user: [''],
  });

  onProviderChange() {
    const selectProviderId = this.addBillForm.get('provider')?.value;
    const providerAvaliableCredit = this.providersList.find(
      (provider) => provider._id === selectProviderId
    );
    this.creditAvailableByProvider.set(providerAvaliableCredit?.credit);
  }

  onSaveBill() {
    if (this.addBillForm.invalid) {
      this.addBillForm.markAllAsTouched();
      return;
    }
    const formDataBill: Bill = this.addBillForm.value;
    formDataBill.user = this.userService.currentUser()!._id;
    formDataBill.dateIn = new Date(formDataBill.dateIn).toISOString();
    this.billService
      .createBill(formDataBill)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.dialogService.openDialog(
            `Se registro la factura ${response.numberBill} en la base de datos`,
            true
          );

          this.addBillForm.reset();
          Object.keys(this.addBillForm.controls).forEach((key) => {
            this.addBillForm.get(key)?.setErrors(null);
            this.addBillForm.get(key)?.markAsUntouched();
          });
        },
        error: (error) => {
          console.error('Error creating provider:', error);
          this.dialogService.openDialog(
            `No se pudo crear el proveedor: ${error}`,
            false
          );
        },
      });
  }

  isValidField(field: string): boolean | null {
    return (
      this.addBillForm.controls[field].errors &&
      this.addBillForm.controls[field].touched
    );
  }
}
