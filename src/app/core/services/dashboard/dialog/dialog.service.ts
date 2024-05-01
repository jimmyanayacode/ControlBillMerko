import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ErrordialogComponent } from '../../../../presentation/components/errordialog/errordialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private destroy$ = new Subject<void>();
  constructor(private dialog: MatDialog) {}

  openDialog(errorMessage: string, typeMessage: boolean): void {
    console.log(errorMessage);
    const dialogRef = this.dialog.open(ErrordialogComponent, {
      width: '550px',
      height: '150px',
      data: { message: errorMessage, typeMessage },
    });
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe();
  }
}
