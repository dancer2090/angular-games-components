import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingBar } from './components/StarRatingBar';

@NgModule({
    declarations: [
        StarRatingBar
    ],
    imports: [
        CommonModule
    ],
    exports: [
        StarRatingBar
    ]
})
export class StarRatingBarModule { }