import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyboardSVGComponent } from './components/keyboard-svg.component';

@NgModule({
    declarations: [
        KeyboardSVGComponent
    ],
    imports: [
        CommonModule        
    ],
    exports: [
        KeyboardSVGComponent
    ]
})
export class KeyboardSVGModule { }