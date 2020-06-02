import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircularProgressbar } from './components/circular-progressbar.component';

@NgModule({
    declarations: [
        CircularProgressbar
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CircularProgressbar
    ]
})
export class CircularProgressBarModule { }