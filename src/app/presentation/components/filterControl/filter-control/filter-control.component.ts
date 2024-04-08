import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';

interface MonthsInterface {
  month: string;
  index: string;
}

interface StatusBillsInterface {
  status: string;
  index:  string;
}

@Component({
  selector: 'filter-control-component',
  standalone: true,
  imports: [ MatButtonToggleModule, ReactiveFormsModule, FormsModule, CommonModule, MatRadioModule ],
  templateUrl: './filter-control.component.html',
  styleUrl: './filter-control.component.css'
})
export class FilterControlComponent {

  months:MonthsInterface[] = [
    { month: 'Enero', index: "1" },
    { month: 'Febrero', index: "2" },
    { month: 'Marzo', index: "3" },
    { month: 'Abril', index: "4" },
    { month: 'Mayo', index: "5" },
    { month: 'Junio', index: "6" },
    { month: 'Julio', index: "7" },
    { month: 'Agosto', index: "8" },
    { month: 'Septiembre', index: "9" },
    { month: 'Octubre', index: "10" },
    { month: 'Noviembre', index: "11" },
    { month: 'Diciembre', index: "12" }
  ]
  statusBills:StatusBillsInterface[] = [
  {status: "Todas", index: "1"},
  {status: 'Pendientes', index: "2"},
  { status: 'Canceladas', index: "3"} ];

  monthsSelected = new FormControl('');
  statusBillsFind = new FormControl('Todas')

}
