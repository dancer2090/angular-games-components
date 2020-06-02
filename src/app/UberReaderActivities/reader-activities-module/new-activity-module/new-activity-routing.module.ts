import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NewActivity } from './components/new-activity.component';

const routes: Routes = [
    { path: '', component: NewActivity }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [],
})
export class NewActivityRoutingModule {}