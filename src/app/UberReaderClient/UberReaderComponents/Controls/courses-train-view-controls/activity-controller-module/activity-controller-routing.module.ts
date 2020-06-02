import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActivityController } from './activity-controller.component';

const routes: Routes = [
  { path: '', component: ActivityController, children: [
    {
      path: 'sr_TextFlash',
      loadChildren: 'app/UberReaderActivities/reader-activities-module/new-activity-module/new-activity.module#NewActivityModule'
    }
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class ActivityControllerRoutingModule {}
