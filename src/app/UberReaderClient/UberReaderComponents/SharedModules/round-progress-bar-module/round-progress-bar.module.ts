import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundProgressBar } from './components/RoundProgressBar';

@NgModule({
    declarations: [
        RoundProgressBar
    ],
    imports: [
        CommonModule
    ],
    exports: [
        RoundProgressBar
    ]
})
export class RoundProgressBarModule { }