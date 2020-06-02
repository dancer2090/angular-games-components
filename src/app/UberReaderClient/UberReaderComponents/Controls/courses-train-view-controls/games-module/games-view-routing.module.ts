import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GamesMainView } from './games-main-view.component';
import { GamesStartView } from './games-start-view.component';
import { GamesRouteAccessGuard } from './games-routing-guards.service';

const games_routes: Routes = [
  { path: '', component: GamesMainView, canActivate: [GamesRouteAccessGuard], children: [
      {
        path: '', 
        component: GamesStartView      
      },
      {
        path: ':name', 
        loadChildren: 'app/UberReaderClient/UberReaderComponents/Controls/courses-train-view-controls/activity-controller-module/activity-controller.module#ActivityControllerModule',
        //loadChildren: () => import('app/UberReaderClient/UberReaderComponents/Controls/courses-train-view-controls/activity-controller-module/activity-controller.module').then(m => m.ActivityControllerModule)
      }
    ] 
  }
];

@NgModule({
  imports: [ RouterModule.forChild(games_routes) ],
  exports: [ RouterModule ]
})

export class GamesViewRoutingModule {}