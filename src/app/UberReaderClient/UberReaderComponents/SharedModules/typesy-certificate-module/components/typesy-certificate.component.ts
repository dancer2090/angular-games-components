import { Component, Input, OnInit } from '@angular/core';
import { DateFormatter } from '../../../Controls/admin-view-controls/utils/date-formatter';

@Component({
    selector: 'typesy-certificate-component',
    styleUrls: ['./typesy-certificate.component.css'],
    templateUrl: './typesy-certificate.component.html'
})
export class TypesyCertificateComponent {
    @Input() certificateOwner: string;
    @Input() certificateTitle: string;
    @Input() certificateSpeed: number;
    @Input() certificateAccuracy: number;
    @Input() certificateScore: number;
    @Input() certificateDate: Date;

    constructor() {}
    
    public formatDate(date: Date): string {
        return date != null ? DateFormatter.formatDate(date) : DateFormatter.formatDate(new Date());
    }

    public formatNumber(value: number): number {
        return Math.round(value);
    }
}