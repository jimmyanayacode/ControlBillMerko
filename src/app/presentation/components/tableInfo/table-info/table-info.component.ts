import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

/* Angular Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


@Component({
  selector: 'component-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, CommonModule],
  templateUrl: './table-info.component.html',
  styleUrl: './table-info.component.css'
})

export class TableInfoComponent implements OnChanges {

  @Input() filterProperty: boolean = false
  @Input() dataTable: any[] = []
  @Input() displayedColumnsDinamic: { title: string, key: string }[] = []

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>(this.dataTable);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayedColumnsDinamic']) this.displayedColumns = changes['displayedColumnsDinamic'].currentValue.map((col: any) => col.key);
    if (changes['dataTable']) this.dataSource.data = changes['dataTable'].currentValue;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
