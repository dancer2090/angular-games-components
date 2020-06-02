import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { MdlModule } from '@angular-mdl/core';
import { ChartsModule } from 'ng2-charts';
import { SuccessStatus } from './success-status.component';
import { ProgressBarModule } from 'app/UberReaderClient/UberReaderComponents/SharedModules/progress-bar-module/progress-bar.module';
import { CircularProgressBarModule } from 'app/UberReaderClient/UberReaderComponents/SharedModules/circular-progress-bar-module/circular-progress-bar.module';
import { ResourceLocationModule } from 'app/UberReaderClient/UberReaderComponents/SharedModules/resource-location-module/resource-location.module';


@NgModule({
  declarations: [
    SuccessStatus
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MdlModule,
    ChartsModule,
    ProgressBarModule,
    CircularProgressBarModule,
    ResourceLocationModule
  ],
  exports: [
    SuccessStatus
  ]
})

export class SuccessStatusModule {}
