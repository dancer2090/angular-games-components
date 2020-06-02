import { NgModule } from '@angular/core';
import { LibraryView } from './library-view.component';
import { LibraryItem } from './library-item.component';
import { CommonModule } from '@angular/common';
import { LibraryViewRoutingModule } from './library-view-routing.module';
import { FormsModule } from '@angular/forms';
import { ShareTextDialog } from './dialogs/share-text-dialog.component';
import { MdlModule } from '@angular-mdl/core';
import { EditOrViewTextDialog } from './dialogs/edit-or-view-text-dialog.component';
import { EmptyScreenModule } from '../../SharedModules/empty-screen-module/empty-screen.module';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { GamesLibraryService } from '../courses-train-view-controls/games-module/games-view.service';

@NgModule({
  declarations: [
    LibraryView,
    ShareTextDialog,
    LibraryItem,
    EditOrViewTextDialog
  ],
  entryComponents: [
    ShareTextDialog,
    EditOrViewTextDialog
  ],
  imports: [
    FormsModule,
    CommonModule,
    EmptyScreenModule,
    MdlModule,
    MatDialogModule,
    MatButtonModule,
    LibraryViewRoutingModule,
    //PrepEdSharedComponentsModule
  ],
  exports: [
    LibraryView
  ],
  providers: [
    GamesLibraryService
  ]
})
export class LibraryViewModule { }