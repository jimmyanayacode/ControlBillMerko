
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-errordialog',
  standalone: true,
  imports: [ MatDialogTitle, MatDialogContent ],
  templateUrl: './errordialog.component.html',
  styleUrl: './errordialog.component.css'
})
export class ErrordialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrordialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message:string }
  ){}
}
