import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ProvidersWithInvoiceDetails } from '../../../../interfaces/provider/providerDetailsInvoice.interface';


/* export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
} */

/* const ELEMENT_DATA: PeriodicElement[] = [
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
  selector: 'component-table',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, MatTableModule, CommonModule ],
  templateUrl: './table-info.component.html',
  styleUrl: './table-info.component.css'
})

export class TableInfoComponent implements OnChanges {

  @Input() filterProperty: boolean = false
  @Input() providersData: ProvidersWithInvoiceDetails[] = []
  @Input() displayedColumnsDinamic:{ title: string, key: string }[] = []

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<ProvidersWithInvoiceDetails>(this.providersData);

constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
    if ( changes['displayedColumnsDinamic']) this.displayedColumns = changes['displayedColumnsDinamic'].currentValue.map((col:any) => col.key );
    if (changes['providersData']) this.dataSource.data = changes['providersData'].currentValue;
  }

  applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  providers(){
    console.log(this.providersData)
  }

}
