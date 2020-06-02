import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WordUsageExampleItemRenderer } from './components/WordUsageExampleItemRenderer';
import { VocabDirective } from './directives/VocabDirective';
import { MasonryModule } from '../shared-components-module/components/angular2-masonry/src/module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [    
    WordUsageExampleItemRenderer,
    VocabDirective
  ],
  imports: [
    CommonModule,
    FormsModule    
  ],
  exports: [
    WordUsageExampleItemRenderer,
    VocabDirective,
    MasonryModule
  ]
})
export class VocabSharedComponentsModule { }
