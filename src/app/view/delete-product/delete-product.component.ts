import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product',
  template: `
    <h1 mat-dialog-title>Confirmar eliminación</h1>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button (click)="onYesClick()">Sí</button>
    </div>
  `
})
export class DeleteProductComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
