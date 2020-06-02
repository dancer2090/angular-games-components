import {  MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'mat-snackbar-dialog',
  styleUrls: ['./MatSnackBarDialog.css'],
  template: `
      <div class="matSnackBar-content">
        <i class="material-icons">{{ data?.icon }}</i>&nbsp;&nbsp;<span>{{ data?.message }}</span>
      </div>
  `
})

export class MatSnackBarDialog {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
