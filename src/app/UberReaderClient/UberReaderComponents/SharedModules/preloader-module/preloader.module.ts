import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderDirective } from './directives/PreloaderDirective';

@NgModule({
    declarations: [
        PreloaderDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PreloaderDirective
    ]
})
export class PreloaderModule { }