import { Input, ViewChild,  Component } from '@angular/core';
import { VisualComponent } from '../../../VisualComponent';

@Component({
    selector: 'progress-bar',
    styleUrls: ['./progress-bar.component.css'],
    template: `
        <div id="progressContainerBar" [style.background-color]="progressBarColor">
            <div id="trackBar" #trackBar [class.animate]="animate" [style.background-color]="trackBarColor" [style.width]="progressValue" [style.height]="barHeight">
                <div id="trackBarLabel" *ngIf="progressLabel != null && progressLabel > 2">{{ progressLabel }}%</div>
            </div>
        </div>
    `
})
export class ProgressBar extends VisualComponent {
    @Input('valueLabel') progressLabel:number;
    @Input('value') progressValue:string;
    @Input('progressBarColor') progressBarColor:string = "gray";
    @Input('trackBarColor') trackBarColor:string = "#1e73be";
    @Input('barHeight') barHeight:string = "25px";
    @Input('animate') animate:boolean = false;
}