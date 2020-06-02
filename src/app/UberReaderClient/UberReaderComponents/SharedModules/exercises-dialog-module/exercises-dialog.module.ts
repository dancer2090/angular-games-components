import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { ExercisesDialog } from './components/exercises-dialog.component';
import { LibraryViewModule } from '../../Controls/library-view-controls/library-view.module';
import { MatDialogModule, MatButtonModule, MatMenuModule, MatIconModule } from '@angular/material';
import { AddNewTextButtonModule } from '../add-new-text-button-module/add-new-text-button.module';

@NgModule({
  declarations: [    
    ExercisesDialog
  ],
  entryComponents: [
    ExercisesDialog
  ],
  imports: [
    CommonModule,
    FormsModule,    
    MdlModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    LibraryViewModule,
    AddNewTextButtonModule
  ],
  exports: [
    ExercisesDialog
  ]
})
export class ExercisesDialogModule { }
