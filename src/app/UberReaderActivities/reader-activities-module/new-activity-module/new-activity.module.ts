import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewActivity } from './components/new-activity.component';
import { NewActivityRoutingModule } from './new-activity-routing.module';

@NgModule({
  declarations: [
    NewActivity
  ],
  imports: [
    CommonModule,
    NewActivityRoutingModule,
  ]
})
export class NewActivityModule { }
