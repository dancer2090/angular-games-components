import { PrepEdSharedComponentsModule } from '../../SharedModules/preped-shared-components-module/preped-shared-components.module';
import { NgModule } from '@angular/core';

import { UserInfoView } from './UserInfoView';
import { PublicProfileViewRoutingModule } from './public-profile-view-routing.module';
import { PublicUserInfoView } from './PublicUserInfoView';
import { AuthorInfoView } from './AuthorInfoView';
import { AppFooterModule } from '../../SharedModules/app-footer-module/app-footer.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [    
    UserInfoView,
    PublicUserInfoView,
    AuthorInfoView
  ],
  imports: [
    CommonModule,
    PublicProfileViewRoutingModule,
    PrepEdSharedComponentsModule,
    AppFooterModule
  ]
})
export class PublicProfileViewModule { }
