import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PublicWordContextView } from './components/PublicWordContextView';

var routes: Routes = [
  { path: '', component:  PublicWordContextView }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class PublicWordContextViewRoutingModule {}