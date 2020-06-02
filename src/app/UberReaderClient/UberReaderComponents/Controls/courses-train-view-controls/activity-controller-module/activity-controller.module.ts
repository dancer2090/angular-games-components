import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicIntroView } from './basic-intro-view.component';
import { TrainingHelpView } from './training-help-view.component';
import { IntroCounterView } from './intro-counter-view.component';
import { EndScreen } from './end-screen.component';
import { ActivityController } from './activity-controller.component';
import { MdlModule } from '@angular-mdl/core';
import { VideoActivityView } from './video-activity-view.component';
import { ResourceLocationModule } from '../../../SharedModules/resource-location-module/resource-location.module';
import { ActivityControllerRoutingModule } from './activity-controller-routing.module';
import { RouterModule } from '@angular/router';
import { NewStatusLevelDialog } from './dialogs/new-status-level-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { AdaptiveLearningDialog } from './dialogs/adaptive-learning-dialog.component';
import { GamesLibraryService } from '../games-module/games-view.service';

@NgModule({
  declarations: [
    BasicIntroView,
    TrainingHelpView,
    IntroCounterView,
    EndScreen,
    VideoActivityView,
    ActivityController,
    NewStatusLevelDialog,
    AdaptiveLearningDialog
  ],    
  entryComponents: [
    NewStatusLevelDialog,
    AdaptiveLearningDialog
  ],
  imports: [    
    CommonModule,
    MdlModule,      
    MatDialogModule,   
    MatButtonModule,
    ResourceLocationModule,
    RouterModule,
    ActivityControllerRoutingModule
  ],
  exports: [
    ActivityController
  ], 
  providers: [
    GamesLibraryService
  ]
})
export class ActivityControllerModule { }
