import { NgModule } from '@angular/core';

import { PublicWordContextViewRoutingModule } from './public-word-context-view-routing.module';
import { PublicWordContextView } from './components/PublicWordContextView';
import { VocabSharedComponentsModule } from '../../SharedModules/vocab-shared-components-module/vocab-shared-components.module';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../SharedModules/shared-components-module/shared-components.module';

@NgModule({
  declarations: [    
    PublicWordContextView
  ],
  imports: [
    CommonModule,
    PublicWordContextViewRoutingModule,
    VocabSharedComponentsModule,
    SharedComponentsModule
  ]
})
export class PublicWordContextViewModule { }
