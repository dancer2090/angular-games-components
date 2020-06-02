import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicWordlistViewRoutingModule } from './public-wordlist-view-routing.module';
import { PublicWordlistView } from './components/PublicWordlistView';

@NgModule({
  declarations: [    
    PublicWordlistView
  ],
  imports: [
    PublicWordlistViewRoutingModule,
    CommonModule
  ]
})
export class PublicWordlistViewModule { }
