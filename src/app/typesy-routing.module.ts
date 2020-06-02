import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PreloadSelectedModulesList } from './PreloadSelectedModulesList';
import { TypesyRouteGuardService } from './typesy-route-guard.service';

const typesy_routes: Routes = [
  { 
    path: '',
    redirectTo: 'play',
    pathMatch: 'full'
  },
  {
    path: 'play',
    canLoad: [TypesyRouteGuardService],
    loadChildren: 'app/UberReaderClient/UberReaderComponents/Controls/courses-train-view-controls/games-module/games-view.module#GamesViewModule',
    data: {preload: true, name: 'play'},
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(typesy_routes, {preloadingStrategy: PreloadSelectedModulesList, onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule ]
})

export class TypesyRoutingModule {}