import { Component, ViewChild, Input, OnInit } from '@angular/core';

@Component({
    selector: 'circular-progressbar',
    styleUrls: ['./circular-progressbar.component.css'],
    template: `
        <div #mainCircle class="{{ useCssSize ? 'radial-progress':'radial-progress2'}}" data-progress="0" [style.background-color]="backgroundColor">
            <div class="circle">
                <div class="mask full" #circleMask_1>
                    <div class="fill" #circleFill_1 [style.background-color]="fillColor"></div>
                </div>
                <div class="mask half" #circleMask_2>
                    <div class="fill" #circleFill_2 [style.background-color]="fillColor"></div>
                    <div class="fill fix"></div>
                </div>
                <div class="shadow"></div>
            </div>
            <div class="insetContainer">
                <div class="inset" [style.width]="insetSize + 'px'" [style.height]="insetSize + 'px'"></div>
            </div>
        </div>
    `
})
export class CircularProgressbar implements OnInit{ 
    @Input() size:number;
    @Input() thickness:number;
    @Input() backgroundColor:string;
    @Input() fillColor:string;
    @ViewChild('mainCircle', { static: true }) mainCircle:any;
    @ViewChild('circleMask_1', { static: true }) circleMask_1:any;
    @ViewChild('circleMask_2', { static: true }) circleMask_2:any;
    @ViewChild('circleFill_1', { static: true }) circleFill_1:any;
    @ViewChild('circleFill_2', { static: true }) circleFill_2:any;

    public insetSize:number;
    public useCssSize:boolean =  true;

    ngOnInit() {
        if(this.size) {
            this.useCssSize = false;
            this.mainCircle.nativeElement.style.width = this.size + "px";
            this.mainCircle.nativeElement.style.height = this.size + "px";
        }

        this.resizeHandler();
        this.progress(0);
    }

    public progress(value:number, maxValue:number = 100):void {
        let progressValue = Math.trunc( ( value / maxValue ) * 100 );
        if(progressValue > 100) return;
        progressValue *= 1.8;

        let transformStr = 'rotate(' + progressValue + 'deg)';
        this.circleMask_1.nativeElement.style.webkitTransform = transformStr;
        this.circleMask_1.nativeElement.style.transform = transformStr;
        
        this.circleFill_1.nativeElement.style.webkitTransform = transformStr;
        this.circleFill_1.nativeElement.style.transform = transformStr;

        this.circleFill_2.nativeElement.style.webkitTransform = transformStr;
        this.circleFill_2.nativeElement.style.transform = transformStr;
    }
    
    public resizeHandler(): void {
        let diameter:number = this.mainCircle.nativeElement.offsetWidth;
        
        if(this.thickness) 
            this.insetSize = diameter - (this.thickness * 2);
        else
            this.insetSize = diameter * .74;
            
        this.circleMask_1.nativeElement.style.clip = "rect(0px, " + diameter + "px, " + diameter/2 + "px, 0px)";
        this.circleMask_2.nativeElement.style.clip = "rect(0px, " + diameter + "px, " + diameter/2 + "px, 0px)";
        this.circleFill_1.nativeElement.style.clip = "rect(" + diameter/2 + "px, " + diameter + "px, " + diameter + "px, 0px)";
        this.circleFill_2.nativeElement.style.clip = "rect(" + diameter/2 + "px, " + diameter + "px, " + diameter + "px, 0px)";
    }

    public reset() {
        //this.progressValueLabel = "0/" + this.maxValue;
    }
}