/* component v1.0.1 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Subject, takeUntil } from 'rxjs';

import { ErrordialogComponent } from '../../components/errordialog/errordialog.component';
import { FilterControlComponent } from '../../components/filterControl/filter-control/filter-control.component';
import { TableInfoComponent } from '../../components/tableInfo/table-info/table-info.component';

import { ProviderService } from '../../services/provider/provider.service';

import { Provider } from '../../../interfaces/provider/provider.interface';
import { ProvidersWithInvoiceDetails } from '../../../interfaces/provider/providerDetailsInvoice.interface';

@Component({
  selector: 'app-create-provider',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TableInfoComponent,
    FilterControlComponent,
  ],
  templateUrl: './create-provider.component.html',
  styleUrl: './create-provider.component.css',
})
export default class CreateProviderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public addProviderForm: FormGroup;
  public providersResponse: ProvidersWithInvoiceDetails[] = []
  displayedColumnsProvider: { title: string, key: string }[] = [
    { title: 'Proveedor', key: 'name' },
    { title: 'Valor compras', key: 'shoppingValue' },
    { title: 'Valor credito', key: 'balanceCount' },
    { title: 'Facturas Pendientes', key: 'totalPayValue' }
  ];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private providerService: ProviderService
  ) {
    this.addProviderForm = this.fb.group({
      providerName: ['', [Validators.required, Validators.minLength(3)]],
      credit: [false],
      selfWithHolding: [false],
      timelyPaymentDiscont: [false],
      salemen: [''],
    });
  }
  ngOnInit(): void {
    (this.providerService.getAllProvidersInvoiceDetatils())
    .pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: ProvidersWithInvoiceDetails[]) => {
        this.providersResponse = data;
      },
      error: (error) => {
        console.error('Error fetching providers: ', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSaveProvider() {
    if (this.addProviderForm.invalid) {
      this.addProviderForm.markAllAsTouched();
      return;
    }
    const providerInfo: Provider = this.addProviderForm.value;
    this.providerService
      .createProvider(providerInfo)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Provider created', response);
          this.openDialog(`Se creo el proveedor: ${response.name} en base de datos`, true)
          this.addProviderForm.reset();
          Object.keys(this.addProviderForm.controls).forEach((key) => {
            this.addProviderForm.get(key)?.setErrors(null);
            this.addProviderForm.get(key)?.markAsUntouched();
          });
        },
        error: (error) => { console.error('Error creating provider:', error);
          this.openDialog(`No se pudo crear el proveedor: ${error}`, false)
         }
      });
  }

  openDialog(errorMessage: string, typeMessage:boolean):void {
    const dialogRef = this.dialog.open(ErrordialogComponent, {
      width: '550px',
      height: '150px',
      data: { message: errorMessage, typeMessage}
    });
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe();
  }
}
