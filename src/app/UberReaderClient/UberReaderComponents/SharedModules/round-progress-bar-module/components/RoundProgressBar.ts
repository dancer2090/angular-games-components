import { Component, ViewChild, Input } from '@angular/core';
import { VisualComponent } from '../../../VisualComponent';

@Component({
    selector: 'round-progress-bar',
    styleUrls: ['./RoundProgressBar.css'],
    template: `
<div class="{{visible ? 'progressDiv' : 'hide'}}">
    <canvas #progressCanvas></canvas>
    <label *ngIf="false" class="progressLabel" [style.font-size]="fontSize" [style.color]="fontColor">{{progressLabel}}</label>
</div>
    `
})

export class RoundProgressBar extends VisualComponent
{
    @Input() visible:boolean = true;
    @Input() displayProgressLabel:boolean = true;
    @ViewChild('progressCanvas', { static: true }) progressCanvas;
    private _size:number = 100;

    @Input('size')
    public set size(val:number) {
        this._size = val;
        this.fontSize = Math.round(this.size * 0.3) + 'px';
    };

    public get size() {
        return this._size;
    }

    @Input('fontSize') fontSize:string = "20px";
    @Input('fontColor') fontColor:string = "#888";

    private _radius:number = 100;
    private _innerRadius:number = 35;	
    @Input('backgroundColor') _backgroundColor:string = "#AFAEAE";
    @Input('fillColor') _fillColor:string = "#1E6ED8";
    private _value:number = 0;
    public progressLabel:string = "";
    private _barHeight:number = 15;
    @Input('usePercentage') _usePercentage:boolean = false;

    //private angleIncrement:number = Math.PI / 5;//5 pointed star -> 10 point arround the circle (360 degrees or Math.PI * 2): 5 outer points, 5 inner points
    private ninety:number = Math.PI * -1;//offset the rotation by 90 degrees so the star points up
    private ctx:CanvasRenderingContext2D;

    ngAfterViewInit()
    {        
        this._radius = this.size / 2 * window.devicePixelRatio;
        this._barHeight = (this._radius / window.devicePixelRatio) / 10;
        //this._barHeight = 
        this._innerRadius = (this._radius / window.devicePixelRatio) - this._barHeight;
        let canvas = this.progressCanvas.nativeElement;
        canvas.width = this._radius * 2 + 10;
        canvas.height = this._radius * 2 + 10;

        if(window.devicePixelRatio > 1)
        {
            canvas.style.width = (canvas.width / window.devicePixelRatio) + "px";
            canvas.style.height = (canvas.height / window.devicePixelRatio) + "px";
        }
        this.ctx = canvas.getContext("2d");
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        //this.ctx.save();

        this.redraw();
    }

    private redraw()
    {
        if (this.ctx == null) return;
        let toAngle:number = this.ninety + this.value / 100 * 2 * Math.PI;
        let dotEndRadius:number = Math.floor(this.size * 0.095);//8;        

        let scopeRadius:number = this._radius / window.devicePixelRatio;
        let x_pos:number = scopeRadius + 5;
        let y_pos:number = scopeRadius + 5;

        this.ctx.clearRect(0, 0, this._radius * 2 + 10, this._radius * 2 + 10);
        
        this.ctx.fillStyle = this._backgroundColor;
        this.ctx.beginPath();
        this.ctx.arc(x_pos, y_pos, scopeRadius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        
        this.ctx.fillStyle = this._fillColor;
        this.ctx.beginPath();
        this.ctx.moveTo(x_pos, y_pos);
        this.ctx.lineTo(x_pos, y_pos);
        this.ctx.arc(x_pos, y_pos, scopeRadius, this.ninety, toAngle, false);
        this.ctx.lineTo(x_pos, y_pos);
        this.ctx.fill();
        this.ctx.closePath();                
        
        this.ctx.globalCompositeOperation='destination-out';
        this.ctx.beginPath();
        this.ctx.arc(x_pos, y_pos, this._innerRadius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.globalCompositeOperation='source-over';

        let x_factor:number = 0;
        let y_factor:number = 0;
        if (toAngle == -Math.PI) { // angle is at -180 deg
            x_factor = dotEndRadius/2;
            y_factor = 0;
        }
        else if (toAngle == -Math.PI/2) { // angle is at -90 deg
            x_factor = 0;
            y_factor = dotEndRadius/2;
        }
        else if (toAngle == 0) { // angle is at 0 deg
            x_factor = -dotEndRadius/2;
            y_factor = 0;
        }
        else if (toAngle == Math.PI/2) { // angle is at 90 deg
            x_factor = 0;
            y_factor = -dotEndRadius/2;
        }
        else if (toAngle > -Math.PI && toAngle < -Math.PI/2) { // angle is at Quadrant II
            x_factor = dotEndRadius/4;
            y_factor = dotEndRadius/4;
            //console.log("angle is at Quadrant II");
        }
        else if (toAngle > -Math.PI/2 && toAngle < 0) { // angle is at Quadrant I
            x_factor = -dotEndRadius/4;
            y_factor = dotEndRadius/4;
            //console.log("angle is at Quadrant I");
        }
        else if (toAngle > 0 && toAngle < Math.PI/2) { // angle is at Quadrant IV
            x_factor = -dotEndRadius/4;
            y_factor = -dotEndRadius/4;
            //console.log("angle is at Quadrant IV");
        }
        else if (toAngle > Math.PI/2 && toAngle < Math.PI) { // angle is at Quadrant III
            x_factor = dotEndRadius/4;
            y_factor = -dotEndRadius/4;
            //console.log("angle is at Quadrant III");
        }
        let x = Math.cos(toAngle) * scopeRadius + x_pos + x_factor;
        let y = Math.sin(toAngle) * scopeRadius + y_pos + y_factor;

        this.ctx.beginPath();
        this.ctx.arc(x, y, dotEndRadius, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    public set backgroundColor(color:string)
    {
        this._backgroundColor = color;
    }
    
    public set fillColor(color:string)
    {
        this._fillColor = color;
    }
    
    @Input()
    public set value(val:number)
    {
        this._value = val;
        this.progressLabel = val.toFixed(0) + (this._usePercentage ? "%" : "");
        this.redraw();
        // myMask.graphics.clear();
        // myMask.graphics.beginFill(0);
        // myMask.graphics.drawRect(0, 0, this._radius * 2 * val + int(val) * this._starGap, this._radius * 2);
        // myMask.graphics.endFill();
    };
    
    public get value():number
    {
        return this._value;	
    }

    public useLabel(val:boolean, usePercentage:boolean = false):void
    {
        //detailsContainer.includeInLayout = detailsContainer.visible = val;
        this._usePercentage = usePercentage;
        
        this.value = this._value;
    }

    public set explicitValue(val:string)
    {
        this.progressLabel = val;
        //value.text = val;
    }
    
    // protected group1_mouseMoveHandler(event:MouseEvent):void
    // {				
    //     if (!this._enableRating) return;
        
    //     var startX:number = localToGlobal(new Point()).x;
    //     var val:number = int((event.stageX - startX) / (_radius * 2 + _starGap)) + 1;
    //     /*var excess:Number = (event.localX / (_radius * 2)) - val > 0.5 ? 1 : 0.5;
    //     val += excess;*/
    //     progress = val;
    // }
    
    public dispose():void
    {
        // if (this.hasEventListener(MouseEvent.MOUSE_MOVE)) 
        //     this.removeEventListener(MouseEvent.MOUSE_MOVE, group1_mouseMoveHandler);
        // starsToMask.graphics.clear();
        // initialStars.graphics.clear();
        // myMask.graphics.clear();
        // removeAllElements();
        // starsToMask = null;
        // initialStars = null;
        // myMask = null;
    }
}