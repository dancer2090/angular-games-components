import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreferencesDialog } from './preferences-dialog.component';
import { MdlModule } from '@angular-mdl/core';
import { TypesyProfileDialog } from './profile-dialog.component';
import { RecommendedGoalsResultDialog } from './recommended-goals-result-dialog.component';
import { FeedbackDialog } from './feedback-dialog.component';
import { RouterModule } from '@angular/router';
import { ChangeBackgroundDialog } from './change-background-dialog.component';
import { ColorPickerModule } from '../../../SharedModules/color-picker-module/color-picker.module';
import { ResourceLocationModule } from '../../../SharedModules/resource-location-module/resource-location.module';
import { PlacementTestDialog } from './placement-test-dialog.component';
import { MatButtonModule, MatMenuModule, MatDialogModule } from '@angular/material';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@NgModule({
  declarations: [
      //GoalsDialog,
      PreferencesDialog,
      TypesyProfileDialog,
      //RecommendGoalsDialog,
      RecommendedGoalsResultDialog,
      FeedbackDialog,
      ChangeBackgroundDialog,
      PlacementTestDialog
  ],
  entryComponents: [
      //GoalsDialog,
      PreferencesDialog,
      TypesyProfileDialog,
      //RecommendGoalsDialog,
      RecommendedGoalsResultDialog,
      FeedbackDialog,
      ChangeBackgroundDialog,
      PlacementTestDialog
  ],
  imports: [
    CommonModule,
    FormsModule,    
    MdlModule,
    RouterModule,    
    ColorPickerModule,
    ResourceLocationModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule
    //ColorPickerModule,
    //TypesyActivitiesModule
  ],
  providers: [
    ImagePicker
  ]
})
export class UserMenuDialogsModule { }