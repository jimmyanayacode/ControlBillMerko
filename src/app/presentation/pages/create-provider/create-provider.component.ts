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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Subject, takeUntil } from 'rxjs';

import { FilterControlComponent } from '../../components/filterControl/filter-control/filter-control.component';
import { TableInfoComponent } from '../../components/tableInfo/table-info/table-info.component';

import { Provider } from '../../../models/interfaces/provider/provider.interface';
import { ProvidersWithInvoiceDetails } from '../../../models/interfaces/provider/providerDetailsInvoice.interface';
import { DialogService } from '../../../core/services/dashboard/dialog/dialog.service';
import { ProviderService } from '../../../core/services/provider/provider.service';

@Component({
  selector: 'app-create-provider',
  standalone: true,
  imports: [
    FilterControlComponent,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TableInfoComponent,
  ],
  templateUrl: './create-provider.component.html',
  styleUrl: './create-provider.component.css',
})
export default class CreateProviderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public addProviderForm: FormGroup;
  public providersResponse: ProvidersWithInvoiceDetails[] = [];
  displayedColumnsProvider: { title: string; key: string }[] = [
    { title: 'Proveedor', key: 'name' },
    { title: 'Valor compras', key: 'shoppingValue' },
    { title: 'Valor credito', key: 'totalCreditPending' },
    { title: 'Facturas Pendientes', key: 'balanceCount' },
  ];

  constructor(
    private dialogService: DialogService,
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
    this.providerService
      .getAllProvidersInvoiceDetatils()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: ProvidersWithInvoiceDetails[]) => {
          this.providersResponse = data;
        },
        error: (error) => {
          console.error('Error fetching providers: ', error);
        },
      });
  }

  ngOnDestroy(): void {
    // Limpieza de recursos para evitar fugas de memoria
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
          this.dialogService.openDialog(
            `Se creo el proveedor: ${response.name} en base de datos`,
            true
          );
          this.addProviderForm.reset();
          Object.keys(this.addProviderForm.controls).forEach((key) => {
            this.addProviderForm.get(key)?.setErrors(null);
            this.addProviderForm.get(key)?.markAsUntouched();
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
}
