import { Component, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
    one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
    selector: 'ngbd-datepicker-range',
    styleUrls: ['./datepicker-range.component.css'],
    templateUrl: './datepicker-range.component.html'
})
export class NgbdDatepickerRange {
    @Output() datesSelected = new EventEmitter();

    public hoveredDate: NgbDateStruct;
    public fromDate: Date;
    public toDate: Date;
    public diffBtwnDates: number; //in days

    private ngb_fromDate: NgbDateStruct;
    private ngb_toDate: NgbDateStruct;

    constructor(calendar: NgbCalendar) {
        this.ngb_fromDate = calendar.getToday();
        this.ngb_toDate = calendar.getNext(calendar.getToday(), 'd', 7);
        this.setDates();
    }

    public onDateSelection(date: NgbDateStruct) {
        if (!this.ngb_fromDate && !this.ngb_toDate) {
            this.ngb_fromDate = date;
        } else if (this.ngb_fromDate && !this.ngb_toDate && after(date, this.ngb_fromDate)) {
            this.ngb_toDate = date;
        } else {
            this.ngb_toDate = null;
            this.ngb_fromDate = date;
        }

        this.setDates();
    }

    private setDates(): void {
        if (this.ngb_fromDate && this.ngb_toDate) {
            this.fromDate = new Date(this.ngb_fromDate.year, this.ngb_fromDate.month - 1, this.ngb_fromDate.day);
            this.toDate = new Date(this.ngb_toDate.year, this.ngb_toDate.month - 1, this.ngb_toDate.day);

            let timeDiff = Math.abs(this.toDate.getTime() - this.fromDate.getTime());
            this.diffBtwnDates = Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
    }

    public isHovered = date => this.ngb_fromDate && !this.ngb_toDate && this.hoveredDate && after(date, this.ngb_fromDate) && before(date, this.hoveredDate);
    public isInside = date => after(date, this.ngb_fromDate) && before(date, this.ngb_toDate);
    public isFrom = date => equals(date, this.ngb_fromDate);
    public isTo = date => equals(date, this.ngb_toDate);
}
