import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeWordlistDialog } from './ChangeWordlistDialog';
import { CreateWordlistDialog } from './CreateWordlistDialog';
import { RenameWordlistDialog } from './RenameWordlistDialog';
import { ChangeWordlistVisibility } from './ChangeWordlistVisibility';
import { MdlModule } from '@angular-mdl/core';
import { VocabSharedDialogsService } from './vocab-shared-dialogs.service';


@NgModule({
  declarations: [
    ChangeWordlistDialog,    
    CreateWordlistDialog,   
    ChangeWordlistVisibility,    
    RenameWordlistDialog
  ],
  entryComponents: [
    ChangeWordlistDialog,   
    CreateWordlistDialog, 
    ChangeWordlistVisibility,
    RenameWordlistDialog    
  ],
  imports: [    
    CommonModule,
    FormsModule,
    MdlModule    
  ],
  exports: [    
    ChangeWordlistDialog,          
    CreateWordlistDialog,  
    ChangeWordlistVisibility,  
    RenameWordlistDialog  
  ]
})
export class VocabSharedDialogsModule { }
