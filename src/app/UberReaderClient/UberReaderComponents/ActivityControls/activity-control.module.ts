import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GenericControl } from './generic-control';
import { TextControl } from './text-control.component';


@NgModule({
    declarations: 
      [ 
          TextControl
      ],
    entryComponents: 
      [
          TextControl
      ],
    imports: 
      [
        FormsModule,
        CommonModule
      ],
    exports: 
      [
      ]
})
export class ActivityControlsModule { }