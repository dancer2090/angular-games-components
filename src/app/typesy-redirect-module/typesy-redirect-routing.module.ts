import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TypesyRedirectComponent } from './components/typesy-redirect.component';

var routes: Routes = [
  { path: '', component:  TypesyRedirectComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class TypesyRedirectRoutingModule {}