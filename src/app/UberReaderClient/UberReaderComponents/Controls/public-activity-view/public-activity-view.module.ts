import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicActivityViewComponent } from './public-activity-view.component';
import { PublicActivityViewRoutingModule } from './public-activity-view-routing.module';
import { ActivityControllerModule } from '../courses-train-view-controls/activity-controller-module/activity-controller.module';

@NgModule({
    declarations: [
        PublicActivityViewComponent
    ],
    entryComponents: [
        
    ],
    imports: [
        CommonModule,
        PublicActivityViewRoutingModule,
        ActivityControllerModule        
    ]
})
export class PublicActivityViewModule { }