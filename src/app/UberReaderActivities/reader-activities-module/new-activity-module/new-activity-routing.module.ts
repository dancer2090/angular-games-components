import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NewActivityComponent} from './components/new-activity.component';

const routes: Routes = [
    { path: '', component: NewActivityComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [],
})
export class NewActivityRoutingModule {}
