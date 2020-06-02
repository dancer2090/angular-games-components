import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserInfoView } from './UserInfoView';


var routes: Routes = [
  { path: '', component:  UserInfoView }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class PublicProfileViewRoutingModule {}