import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule } from '@angular/forms';
import { AddNewTextButton } from './components/add-new-text-button.component';
import { AddNewTextDialogModule } from '../add-new-text-dialog-module/add-new-text-dialog.module';
import { AddWebUrlTextDialogModule } from '../add-web-url-text-dialog-module/add-web-url-text-dialog.module';

@NgModule({
  declarations: [    
    AddNewTextButton
  ],
  entryComponents: [
    AddNewTextButton
  ],
  imports: [
    CommonModule,
    MdlModule,
    AddNewTextDialogModule,
    AddWebUrlTextDialogModule
  ],
  exports: [
    AddNewTextButton
  ]
})
export class AddNewTextButtonModule { }
