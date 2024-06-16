import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html'
})
export class ConfirmacionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close(false);  // Cierra el diálogo y retorna false
  }

  onYesClick(): void {
    this.dialogRef.close(true);  // Cierra el diálogo y retorna true
  }
}
