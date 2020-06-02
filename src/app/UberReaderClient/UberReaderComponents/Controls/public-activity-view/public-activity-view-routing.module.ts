import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PublicActivityViewComponent } from './public-activity-view.component';


const routes: Routes = [
    { path: '', component: PublicActivityViewComponent, children: [
    {
      path: '',
      loadChildren: 'app/UberReaderClient/UberReaderComponents/Controls/courses-train-view-controls/activity-controller-module/activity-controller.module#ActivityControllerModule',
      //loadChildren: () => import('app/UberReaderClient/UberReaderComponents/Controls/courses-train-view-controls/activity-controller-module/activity-controller.module').then(m => m.ActivityControllerModule)
    }
  ] },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [],
})
export class PublicActivityViewRoutingModule {}