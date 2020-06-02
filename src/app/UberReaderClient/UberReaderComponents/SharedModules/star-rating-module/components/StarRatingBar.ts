import { Component, ViewChild, Input, HostListener } from '@angular/core';
import { VisualComponent } from '../../../VisualComponent';

@Component({
    selector: 'star-rating',
    template: `
    <div class="{{visible ? '' : 'hide'}}">
        <canvas #starCanvas (mouseleave)="mouseLeaveEvent($event)" (mousemove)="mouseMoveEvent($event)" (click)="rateClick()"></canvas>
        <!-- <label>{{_progress.toFixed(1)}}</label> -->
    </div>
    `
})

export class StarRatingBar extends VisualComponent
{
    @ViewChild('starCanvas', { static: true }) starCanvas;

    @Input('visible') visible:boolean = true;
    @Input('height') height:number;
    @Input('count') count:number = 5;

    private _enableRating:boolean = false;
    private _saved:boolean = false;
    //private _count:number = 5;
    private _radius:number = 20;
    @Input('backgroundColor') _backgroundColor:string = "#AFAEAE";
    @Input('fillColor') _fillColor:string = "#09539D";
    private _progress:number = 0;
    private _starGap:number = 1;

    private angleIncrement:number = Math.PI / 5;//5 pointed star -> 10 point arround the circle (360 degrees or Math.PI * 2): 5 outer points, 5 inner points
    private ninety:number = Math.PI * .5;//offset the rotation by 90 degrees so the star points up
    private ctx:CanvasRenderingContext2D;

    ngAfterViewInit()
    {
        this._radius = this.height / 1.81 * window.devicePixelRatio;        

        let canvas = this.starCanvas.nativeElement;
        canvas.width = (this._radius * 2 + this._starGap) * this.count - this._starGap;
        canvas.height = this._radius * 2;

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

    @HostListener('window:resize', ['$event'])
    onResize(event) {        
        this.ngAfterViewInit();     
    }

    private lastProgress:number = 0;
    mouseLeaveEvent(event):void 
    {
        if(this._enableRating && !this._saved)
        {
            this.lastProgress = 0;
            this._progress = 0;
            this.redraw();
        }
    }

    mouseMoveEvent(event):void 
    {
        console.log('this._progress: ', this._progress);
        this._progress = Math.ceil(<number> ((event.offsetX / event.currentTarget.clientWidth) * this.count));
        if(this._enableRating && this._saved == false)
        {            
            /*let whole: number = Math.floor(this._progress);
            let decimal: number = this._progress - whole;
            if (decimal <= 0.25) {
                decimal = 0;
            }
            else if (decimal > 0.25 && decimal < 0.75) {
                decimal = 0.5;
            }
            else {
                decimal = 1;
            }
            this._progress = whole + decimal;*/
           
            if(this.lastProgress != this._progress)
            {
                this.lastProgress = this._progress;                
                this.redraw();
                //this._saved = false;
            }
        }
    }

    rateClick():void 
    {
        if (this._enableRating) {
            this._saved = true;
            
            if(this.lastProgress != this._progress)
            {
                this.lastProgress = this._progress;
                this.redraw();            
            }
        }        
    }

    private redraw()
    {
        //this.ctx.restore();
        this.ctx.clearRect(0, 0, (this._radius * 2 + this._starGap) * this.count - this._starGap, this._radius * 2);
        this.drawStars(this.ctx, this._radius, this._backgroundColor);
        this.ctx.save();
        this.drawMask(this.ctx, this._radius, this._progress);
        this.drawStars(this.ctx, this._radius, this._fillColor);
        this.ctx.restore();
    }

    private drawMask(ctx:CanvasRenderingContext2D, radius:number, maskAmount:number)
    {
        ctx.strokeStyle = "transparent";
        ctx.beginPath();
        ctx.rect(0, 0, (radius / window.devicePixelRatio) * 2 * maskAmount + Math.trunc(maskAmount) * this._starGap, (radius / window.devicePixelRatio) * 2);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
    }

    private drawStars(ctx:CanvasRenderingContext2D, radius:number, color:string)
    {
        ctx.fillStyle = color;
        
        for (let idx:number=0; idx < this.count; idx++)
        {
            ctx.beginPath();
            for(let i:number = 0; i <= 10; i++)
            {//for each point
                let tempRadius:number = (i % 2 > 0 ? radius : radius * .5);//determine if the point is inner (half radius) or outer(full radius)
                let px:number = radius + Math.cos(this.ninety + this.angleIncrement * i) * tempRadius + radius * 2 * idx + this._starGap * idx;//compute x
                let py:number = radius + Math.sin(this.ninety + this.angleIncrement * i) * tempRadius;//and y using polar to cartesian coordinate conversion
                if(i == 0)
                {
                   ctx.moveTo(px / window.devicePixelRatio, py / window.devicePixelRatio);
                }//obj.graphics.moveTo(px,py);//move the 'pen' so we don't draw lines from (0,0)
                ctx.lineTo(px / window.devicePixelRatio, py / window.devicePixelRatio);
                //ctx.stroke();
            }
            ctx.closePath();
            ctx.fill();
        }
    }

    @Input()
    public set enableRating(val:boolean)
    {
        this._enableRating = val;
        // if (this._enableRating)
        // {
        //     this.addEventListener(MouseEvent.MOUSE_MOVE, group1_mouseMoveHandler, false, 0, true);
        // }
    };
    
    public set backgroundColor(color:string)
    {
        this._backgroundColor = color;
    }
    
    public set fillColor(color:string)
    {
        this._fillColor = color;
    }
    
    // public set count(count:number)
    // {
    //     this._count = count;
    // }
    
    public set starGap(val:number)
    {
        this._starGap = val;
    }
    
    public set progress(val:number)
    {
        this._progress = val;
        this.redraw();
        // myMask.graphics.clear();
        // myMask.graphics.beginFill(0);
        // myMask.graphics.drawRect(0, 0, this._radius * 2 * val + int(val) * this._starGap, this._radius * 2);
        // myMask.graphics.endFill();
    }
    
    public get progress():number
    {
        return this._progress;
    }
    
    // protected group1_mouseMoveHandler(event:MouseEvent):void
    // {
    //     if (!this._enableRating) return;
        
    //     let startX:number = localToGlobal(new Point()).x;
    //     let val:number = int((event.stageX - startX) / (_radius * 2 + _starGap)) + 1;
    //     /*let excess:Number = (event.localX / (_radius * 2)) - val > 0.5 ? 1 : 0.5;
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