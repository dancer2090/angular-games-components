import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PublicWordlistView } from './components/PublicWordlistView';

var routes: Routes = [
  { path: '', component:  PublicWordlistView }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class PublicWordlistViewRoutingModule {}