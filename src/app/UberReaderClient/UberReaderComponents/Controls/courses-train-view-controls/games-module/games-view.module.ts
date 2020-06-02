import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesMainView } from './games-main-view.component';
import { GamesStartView } from './games-start-view.component';
import { GamesViewRoutingModule } from './games-view-routing.module';
import { FormsModule } from '@angular/forms';
import { GamesRouteAccessGuard } from './games-routing-guards.service';
import { PreloaderModule } from '../../../SharedModules/preloader-module/preloader.module';
import { MdlModule } from '@angular-mdl/core';
import { GamesLibraryService } from './games-view.service';
import { TypesyCertificateModule } from '../../../SharedModules/typesy-certificate-module/typesy-certificate.module';
import { ResourceLocationModule } from '../../../SharedModules/resource-location-module/resource-location.module';
import { RouterModule } from '@angular/router';
import { TileGroupModule } from '../../../SharedModules/tile-group-module/tile-group.module';
import { ExercisesDialogModule } from 'app/UberReaderClient/UberReaderComponents/SharedModules/exercises-dialog-module/exercises-dialog.module';
import { MatDialogModule } from '@angular/material';
import { AddNewTextDialogModule } from '../../../SharedModules/add-new-text-dialog-module/add-new-text-dialog.module';
import { AddWebUrlTextDialogModule } from 'app/UberReaderClient/UberReaderComponents/SharedModules/add-web-url-text-dialog-module/add-web-url-text-dialog.module';
import { AddNewTextButtonModule } from '../../../SharedModules/add-new-text-button-module/add-new-text-button.module';
import { SuccessStatusModule } from '../../home-view-controls/success-status-section/success-status.module';

@NgModule({
    declarations: [
      GamesMainView,
      GamesStartView
    ],
    imports: [
      CommonModule,
      FormsModule,
      MdlModule,
      MatDialogModule,
      GamesViewRoutingModule,
      //ActivityControllerModule,
      ExercisesDialogModule,
      PreloaderModule,
      ResourceLocationModule,
      RouterModule,
      TileGroupModule,
      TypesyCertificateModule,
      AddNewTextDialogModule,
      AddWebUrlTextDialogModule,
      AddNewTextButtonModule,
      SuccessStatusModule
    ],
    providers: [
      GamesLibraryService,
      GamesRouteAccessGuard
    ]
})
export class GamesViewModule { }
