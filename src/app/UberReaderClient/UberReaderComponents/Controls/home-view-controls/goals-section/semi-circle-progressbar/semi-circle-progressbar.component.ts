import { Component, Input, ViewChild, OnInit } from '@angular/core';


@Component({
    selector: 'semi-circle-progressbar',
    styleUrls: ['./semi-circle-progressbar.component.css'],
    template: `
        <div class="mainContainer">
            <div class="circle" [style.width]="diameter" [style.height]="circle_height">
                <div #progressbar class="half-circle-bar" [style.border-color]="backgroundColor" [style.border-width]="thickness"></div>
                <div #progressbarFill class="half-circle-fill" [style.border-color]="fillColor" [style.border-width]="thickness"></div>
            </div>
            <label class="mdl-color-text--grey-700 mdl-typography--body-1 mdl-typography--text-center header-title-2">{{ progressLabel }}</label>
        </div>
    `
})
export class SemiCircleProgressbar implements OnInit {
    @ViewChild('progressbar', { static: true }) progressbar: any;
    @ViewChild('progressbarFill', { static: true }) progressbarFill: any;

    //blue: 3E92D7 ; green: 34ad07
    @Input() fillColor: string = "#3E92D7";
    @Input() backgroundColor: string = "#E0E0E0";
    @Input() progressUnit: string;
    @Input() showLabel: boolean = true;
    @Input() diameter: string = "135px";
    @Input() thickness: string = "18px";

    public progressLabel: string;
    public circle_height: string;

    private maxValue: number = 100;

    ngOnInit() {
        this.circle_height = Math.trunc(parseInt(this.diameter) / 2) + "px";
        this.progressbar.nativeElement.style.clip = "rect(0px," + this.diameter + ", " + this.circle_height + ", 0px)";
        this.progressbarFill.nativeElement.style.clip = "rect(0px," + this.diameter + ", " + this.circle_height + ", 0px)";
        this.reset();
    }

    public progress(value: number, maxValue: number = 100) {
        this.maxValue = maxValue;
        let progressValue = Math.trunc((value / this.maxValue) * 100);
        //if (progressValue > 100) return;
        progressValue = Math.min(progressValue, 100);
        progressValue = progressValue * 1.8 + 180;

        let transformStr = 'rotate(' + progressValue + 'deg)';
        this.progressbarFill.nativeElement.style.webkitTransform = transformStr;
        this.progressbarFill.nativeElement.style.transform = transformStr;

        if (this.showLabel) {
            if (this.progressUnit) {
                this.progressLabel = value + " " + this.progressUnit;
            }
            else {
                this.progressLabel = value + "/" + this.maxValue;
            }
        }
    }

    public reset() {
        if (this.showLabel) {
            if (this.progressUnit) {
                this.progressLabel = "0 " + this.progressUnit;
            }
            else {
                this.progressLabel = "0/" + this.maxValue;
            }
        }
    }
}