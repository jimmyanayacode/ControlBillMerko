import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TableInfoComponent } from '../../components/tableInfo/table-info/table-info.component';
import { FilterControlComponent } from '../../components/filterControl/filter-control/filter-control.component';
import { ProviderService } from '../../services/provider/provider.service';
import { Provider } from '../../../interfaces/provider/provider.interface';
import { Subject, takeLast, takeUntil } from 'rxjs';



@Component({
  selector: 'app-create-provider',
  standalone: true,
  imports: [MatCheckboxModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, TableInfoComponent, FilterControlComponent],
  templateUrl: './create-provider.component.html',
  styleUrl: './create-provider.component.css'
})
export default class CreateProviderComponent implements OnDestroy {


  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private providerService : ProviderService ){
    this.addProviderForm = this.fb.group({
      providerName: ['', [Validators.required, Validators.minLength(3)]],
      credit: [false],
      selfWithHolding: [false],
      timelyPaymentDiscont: [false],
      salemen: ['']
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addProviderForm: FormGroup;


  onSaveProvider() {
    if ( this.addProviderForm.invalid ) {
      this.addProviderForm.markAllAsTouched()
      return
    }
    const providerInfo:Provider = this.addProviderForm.value
    this.providerService.createProvider( providerInfo ).pipe(
      takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          console.log('Provider created', response);
          this.addProviderForm.reset();
          Object.keys(this.addProviderForm.controls).forEach(key => {
            this.addProviderForm.get(key)?.setErrors(null);
            this.addProviderForm.get(key)?.markAsUntouched();
          })
        },
        error: (error) => console.error('Error creating provider:', error)
      })

  }
}
