import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  confirm:boolean = false;
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  handleClick() {
    this.confirm = true;
    this.dialogRef.close();
  }
  
}
