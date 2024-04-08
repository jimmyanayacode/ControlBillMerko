import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TableInfoComponent } from '../../components/tableInfo/table-info/table-info.component';
import { FilterControlComponent } from '../../components/filterControl/filter-control/filter-control.component';

@Component({
  selector: 'app-create-provider',
  standalone: true,
  imports: [MatCheckboxModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, TableInfoComponent, FilterControlComponent],
  templateUrl: './create-provider.component.html',
  styleUrl: './create-provider.component.css'
})
export default class CreateProviderComponent {

  constructor(private fb: FormBuilder){}

  public addProviderForm: FormGroup = this.fb.group({
    providerName: ['', [Validators.required, Validators.minLength(3)]],
    credit: [false],
    SelfWithholding: [false]
  })

  onSaveProvider() {
    if ( this.addProviderForm.invalid ) {
      this.addProviderForm.markAllAsTouched()
      return
    }
    console.log(this.addProviderForm.value)
    this.addProviderForm.reset()
  }

}
