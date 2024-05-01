import { Component, OnChanges, OnInit, inject } from '@angular/core';
import { TableInfoComponent } from '../../components/tableInfo/table-info/table-info.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterControlComponent } from '../../components/filterControl/filter-control/filter-control.component';
import { BillService } from '../../services/bill/bill.service';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { Bill } from '../../../interfaces/bill';

interface MonthsInterface {
  month: string;
  index: string;
}

interface StatusBillsInterface {
  status: string;
  index: string;
}

@Component({
  selector: 'app-search-bill',
  standalone: true,
  imports: [
    TableInfoComponent,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatRadioModule,
    FilterControlComponent,
  ],
  templateUrl: './search-bill.component.html',
  styleUrl: './search-bill.component.css',
})
export default class SearchBillComponent implements OnInit {


  public billsResponse: Bill[] = []

public displayedColumnsBill: { title: string; key: string} [] = [
  { title: 'Proveedor', key: 'provider' },
    { title: '# Factura', key: 'numberBill' },
    { title: 'Valor factura', key: 'value' },
    { title: 'Fecha ingreso', key: 'dateInput' },
    { title: 'Valor pendiente', key: 'balance' },
]

constructor( private billService:BillService ){}

ngOnInit(){}


}

