import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewActivityComponent} from './components/new-activity.component';
import {NewActivityRoutingModule} from './new-activity-routing.module';
import {MdlModule} from '@angular-mdl/core';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {SettingsModalComponent} from './components/settings-modal.component';

@NgModule({
  declarations: [
    NewActivityComponent,
    SettingsModalComponent
  ],
  imports: [
    CommonModule,
    NewActivityRoutingModule,
    MdlModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule
  ]
})
export class NewActivityModule {
}
