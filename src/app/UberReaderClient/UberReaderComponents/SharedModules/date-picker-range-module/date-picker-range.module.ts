import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbdDatepickerRange } from './components/datepicker-range.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        NgbdDatepickerRange
    ],
    imports: [
        CommonModule,
        NgbModule.forRoot(),
    ],
    exports: [
        NgbdDatepickerRange
    ]
})
export class DatePickerRangeModule { }