import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerDirective, DialogComponent, TextDirective, SliderDirective } from './directives/color-picker.directive';
import { ColorPickerService } from './services/color-picker.service';

@NgModule({
    declarations: [
        ColorPickerDirective,
        DialogComponent,
        TextDirective,
        SliderDirective
    ],
    entryComponents: [
        DialogComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ColorPickerDirective
    ],
    providers: [
        ColorPickerService
    ]
})
export class ColorPickerModule { }