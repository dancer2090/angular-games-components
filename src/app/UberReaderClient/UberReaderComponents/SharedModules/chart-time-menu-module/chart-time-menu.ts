import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VisualComponent } from 'app/UberReaderClient/UberReaderComponents/VisualComponent';
import { AppSettings } from 'app/UberReaderData/AppSettings';

@Component({
    selector: 'chart-time-menu',
    styleUrls: ['./chart-time-menu.css'],
    templateUrl: './chart-time-menu.html'
})

export class ChartTimeMenuComponent {
    @Output() valueChanged = new EventEmitter();
    public groupings: any[];
    public selectedGrouping: any;

    constructor() {
        this.groupings = [
            //{ label: "Custom", data: "custom",  groupingType: "None", dateFrom: null, dateTo: null },
            { label: "24 Hours", data: "1,None"},
            { label: "7 days", data: "7,Day"},
            { label: "14 days", data: "14,Day"},
            { label: "30 days", data: "30,Day"},
            { label: "6 months", data: "5,Month"}
        ];

        this.selectedGrouping = this.groupings[4];
    }
    
    ngOnInit() {

    }
}