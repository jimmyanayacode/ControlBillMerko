import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ProvidersWithInvoiceDetails } from '../../../../interfaces/provider/providerDetailsInvoice.interface';
import { BillFromBackend } from '../../../../interfaces/bill/billFromBackend,interface';


@Component({
  selector: 'component-table',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, MatTableModule, CommonModule ],
  templateUrl: './table-info.component.html',
  styleUrl: './table-info.component.css'
})

export class TableInfoComponent implements OnChanges {

  @Input() filterProperty: boolean = false
  @Input() dataTable: any[] = []
  @Input() displayedColumnsDinamic:{ title: string, key: string }[] = []
  /* @Input() billsData: BillFromBackend[] = [] */

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>(this.dataTable);

constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
    if ( changes['displayedColumnsDinamic']) this.displayedColumns = changes['displayedColumnsDinamic'].currentValue.map((col:any) => col.key );
    if (changes['dataTable'] ) this.dataSource.data = changes['dataTable'].currentValue;
  }

  applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  providers(){
    console.log(this.dataTable)
  }

}
