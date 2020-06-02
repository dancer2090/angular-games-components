import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule } from '@angular/forms';
import { AddNewTextDialog } from './components/add-new-text-dialog.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [    
    AddNewTextDialog
  ],
  entryComponents: [
    AddNewTextDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MdlModule
  ],
  exports: [
    AddNewTextDialog
  ]
})
export class AddNewTextDialogModule { }
