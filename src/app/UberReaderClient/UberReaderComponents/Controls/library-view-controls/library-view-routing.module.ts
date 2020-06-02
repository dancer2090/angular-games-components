import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LibraryView } from './library-view.component';

var routes: Routes = [
  { path: '', component:  LibraryView }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class LibraryViewRoutingModule {}