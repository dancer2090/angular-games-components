import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule } from '@angular/forms';
import { AddWebUrlTextDialog } from './component/add-web-url-text-dialog.component';

@NgModule({
  declarations: [    
    AddWebUrlTextDialog
  ],
  entryComponents: [
    AddWebUrlTextDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    MdlModule
  ],
  exports: [
    AddWebUrlTextDialog
  ]
})
export class AddWebUrlTextDialogModule { }
