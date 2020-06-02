import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartTimeMenuComponent } from './chart-time-menu';
import { MatButtonModule, MatMenuModule } from '@angular/material';
import { MdlModule } from '@angular-mdl/core';

@NgModule({
    declarations: [
        ChartTimeMenuComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MdlModule
    ],
    exports: [
        ChartTimeMenuComponent
    ]
})
export class ChartTimeMenuModule { }