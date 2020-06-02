import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { GoalsDialog } from './components/goals-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [    
    GoalsDialog
  ],
  entryComponents: [
    GoalsDialog
  ],
  imports: [
    CommonModule,
    FormsModule,    
    MdlModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    GoalsDialog
  ]
})
export class GoalsDialogModule { }
