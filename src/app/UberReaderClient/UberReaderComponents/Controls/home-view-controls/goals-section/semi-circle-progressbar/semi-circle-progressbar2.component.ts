import { Component, Input, ViewChild, OnInit } from '@angular/core';


@Component({
    selector: 'semi-circle-progressbar2',
    styleUrls: ['./semi-circle-progressbar2.component.css'],
    template: `
    <div class="{{visible ? 'progressDiv' : 'hide'}}">
        <canvas #progressCanvas></canvas>
        <div style="display:none;">
            <img id="targetImage" src="{{'assets/icon/target-icon.svg' | resourceLoc}}">
            <img id="currentGreyImage" src="{{'assets/icon/grey-current.svg' | resourceLoc}}">
            <img id="currentWhiteImage" src="{{'assets/icon/white-current.svg' | resourceLoc}}">            
        </div>
    </div>
    `
})
export class SemiCircleProgressbar2 {
    @Input() visible:boolean = true;
    @Input('showProgressIconOnly') showProgressIconOnly:boolean = false;
    @ViewChild('progressCanvas', { static: true }) progressCanvas;
    @Input('type') _type:string = "circular";
    @Input('backgroundColor') _backgroundColor:string = "#E0E0E0";
    @Input('targetFillColor') _targetFillColor:string = "#A3CCE5";
    @Input('currentFillColor') _currentFillColor:string = "#3E92D7";

    private _size:number = 195;//154

    @Input('size')
    public set size(val:number) {
        this._size = val;
    };

    public get size() {
        return this._size;
    }

    private _barHeight:number = 25;
    @Input('barHeight')
    public set barHeight(val:number) {
        this._barHeight = val;
    };

    public get barHeight() {
        return this._barHeight;
    }
    private _radius:number = 10;
    private _currentValue:number = 0;
    private _targetValue:number = 0;
    private _maximumValue:number = 300;

    //private angleIncrement:number = Math.PI / 5;//5 pointed star -> 10 point arround the circle (360 degrees or Math.PI * 2): 5 outer points, 5 inner points
    private ninety:number = Math.PI * -1;//offset the rotation by 90 degrees so the star points up
    private ctx:CanvasRenderingContext2D;
    private targetImage: any;
    private currentGreyImage: any;
    private currentWhiteImage: any;
    private canvas: any;

    ngAfterViewInit()
    {        
        this.canvas = this.progressCanvas.nativeElement;
        //console.log("window.devicePixelRatio: ", window.devicePixelRatio);
        this.size = this.size * window.devicePixelRatio;
        if (this._type == "circular") {
            this._radius = this.size / 2;            
            this.canvas.width = this._radius * 2 + (this.showProgressIconOnly ? 30 : 160);
            this.canvas.height = this._radius + (this.showProgressIconOnly ? 30 : 50);
        }
        else {
            this.canvas.width = this.size + (this.showProgressIconOnly ? 20 : 80);
            this.canvas.height = this._barHeight * 3 * window.devicePixelRatio + 20;
        }
        

        if(window.devicePixelRatio > 1)
        {
            this.canvas.style.width = (this.canvas.width / window.devicePixelRatio) + "px";
            this.canvas.style.height = (this.canvas.height / window.devicePixelRatio) + "px";
        }
        this.ctx = this.canvas.getContext("2d");
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);  
        
        this.targetImage = document.getElementById('targetImage');
        this.currentGreyImage = document.getElementById('currentGreyImage');
        this.currentWhiteImage = document.getElementById('currentWhiteImage');

        this.redraw();
    }

    private redraw()
    {
        if (this.ctx == null) return;        


        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //console.log("this._type: ", this._type);

        let x_pos:number;
        let y_pos:number;
        let current_label_x;
        let current_label_y;
        let target_label_x;
        let target_label_y;
        let currentValueText;
        let targetValueText;
        let currentTextWidth;
        let targetTextWidth;
        let boxPadding = 4;
        let currentIconWidth = 18;
        let targetIconWidth = 13;
        let currentBoxWidth;
        let targetBoxWidth;   

        if (this._type == "circular") {
            let currentToAngle:number = this.ninety + this._currentValue / this._maximumValue * Math.PI;
            let targetToAngle:number = this.ninety + this._targetValue / this._maximumValue * Math.PI;            

            let scopeRadius:number = this._radius / window.devicePixelRatio;
            x_pos = scopeRadius + (this.showProgressIconOnly ? 15 : 80);
            y_pos = scopeRadius + (this.showProgressIconOnly ? 20 : 30);
            let current_x = Math.cos(currentToAngle) * scopeRadius * 0.7 + x_pos;
            let current_y = Math.sin(currentToAngle) * scopeRadius * 0.7 + y_pos;
            let target_x = Math.cos(targetToAngle) * scopeRadius + x_pos;
            let target_y = Math.sin(targetToAngle) * scopeRadius + y_pos;

            this.ctx.clearRect(0, 0, this._radius * 2 + 10 + 150, this._radius * 2 + 10 + 30);
            
            // background
            this.ctx.fillStyle = this._backgroundColor;
            this.ctx.beginPath();
            this.ctx.arc(x_pos, y_pos, scopeRadius, this.ninety, Math.PI + this.ninety);
            this.ctx.fill();
            this.ctx.closePath();
            
            // target
            this.ctx.fillStyle = this._targetFillColor;
            this.ctx.beginPath();
            this.ctx.moveTo(x_pos, y_pos);
            this.ctx.lineTo(x_pos, y_pos);
            this.ctx.arc(x_pos, y_pos, scopeRadius, this.ninety, targetToAngle, false);
            this.ctx.lineTo(x_pos, y_pos);
            this.ctx.fill();
            this.ctx.closePath();

            // current
            this.ctx.fillStyle = this._currentFillColor;
            this.ctx.beginPath();
            this.ctx.moveTo(x_pos, y_pos);
            this.ctx.lineTo(x_pos, y_pos);
            this.ctx.arc(x_pos, y_pos, scopeRadius, this.ninety, currentToAngle, false);
            this.ctx.lineTo(x_pos, y_pos);
            this.ctx.fill();
            this.ctx.closePath();
            
            this.ctx.strokeStyle = this._targetFillColor;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();        
            this.ctx.moveTo(x_pos, y_pos);        
            this.ctx.lineTo(target_x, target_y);
            this.ctx.stroke();
            
            // center dot circle
            this.ctx.globalCompositeOperation='destination-out';
            this.ctx.beginPath();
            this.ctx.arc(x_pos, y_pos, 4, 0, 2 * Math.PI);        
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.globalCompositeOperation='source-over';                        

            // needle
            this.ctx.globalCompositeOperation='destination-out';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();        
            this.ctx.moveTo(x_pos, y_pos);        
            this.ctx.lineTo(current_x, current_y);
            this.ctx.stroke();
            this.ctx.globalCompositeOperation='source-over';            

            if (this.showProgressIconOnly) {
                current_label_x = Math.cos(currentToAngle) * scopeRadius + x_pos;
                current_label_y = Math.sin(currentToAngle) * scopeRadius * 1.1 + y_pos;
                target_label_x = Math.cos(targetToAngle) * scopeRadius + x_pos;
                target_label_y = Math.sin(targetToAngle) * scopeRadius * 1.1 + y_pos;
                currentIconWidth = 18;

                if (currentToAngle == -Math.PI/2) {
                    current_label_x = current_label_x - (currentIconWidth / 2);
                }
                else if ((currentToAngle > -Math.PI && currentToAngle < -Math.PI/2) || currentToAngle == -Math.PI) {
                    current_label_x = current_label_x - currentIconWidth - 1;            
                }
                else if (currentToAngle > -Math.PI/2 && currentToAngle < 0) {
                    current_label_x = current_label_x + 1;
                }

                if (targetToAngle == -Math.PI/2) {
                    target_label_x = target_label_x - (targetIconWidth / 2);
                }
                else if ((targetToAngle > -Math.PI && targetToAngle < -Math.PI/2) || targetToAngle == -Math.PI) {
                    target_label_x = target_label_x - targetIconWidth - 1;            
                }
                else if (targetToAngle > -Math.PI/2 && targetToAngle < 0) {
                    target_label_x = target_label_x + 1;
                }

                this.ctx.drawImage(this.targetImage, target_label_x, target_label_y - 6, 13, 13);
                this.ctx.drawImage(this.currentGreyImage, current_label_x, current_label_y - 9, currentIconWidth, 18);
            }
            else {
                current_label_x = Math.cos(currentToAngle) * scopeRadius + x_pos;
                current_label_y = Math.sin(currentToAngle) * scopeRadius * 1.2 + y_pos;
                target_label_x = Math.cos(targetToAngle) * scopeRadius + x_pos;
                target_label_y = Math.sin(targetToAngle) * scopeRadius * 1.2 + y_pos;
                currentValueText = this._currentValue + ' wpm';
                targetValueText = this._targetValue + ' wpm';
                currentTextWidth = this.ctx.measureText(currentValueText).width;
                targetTextWidth = this.ctx.measureText(targetValueText).width;
                currentBoxWidth = currentTextWidth + currentIconWidth + boxPadding * 3;
                targetBoxWidth = targetTextWidth + 13 + boxPadding * 3;        

                this.ctx.lineWidth = 1;
                this.ctx.font = '11px sans-serif';

                if (currentToAngle == -Math.PI/2) {
                    current_label_x = current_label_x - (currentBoxWidth / 2);
                }
                else if ((currentToAngle > -Math.PI && currentToAngle < -Math.PI/2) || currentToAngle == -Math.PI) {
                    current_label_x = current_label_x - currentBoxWidth - 5;            
                }
                else if (currentToAngle > -Math.PI/2 && currentToAngle < 0) {
                    current_label_x = current_label_x + 5;
                }

                if (targetToAngle == -Math.PI/2) {
                    target_label_x = target_label_x - (targetBoxWidth / 2);
                }
                else if ((targetToAngle > -Math.PI && targetToAngle < -Math.PI/2) || targetToAngle == -Math.PI) {
                    target_label_x = target_label_x - targetBoxWidth - 5;            
                }
                else if (targetToAngle > -Math.PI/2 && targetToAngle < 0) {
                    target_label_x = target_label_x + 5;
                }

                this.ctx.fillStyle = this._targetFillColor;
                this.roundRect(target_label_x, target_label_y - 12, targetBoxWidth, 25, 5, true, false);            
                this.ctx.fillStyle = '#444444';
                this.ctx.fillText(targetValueText, target_label_x + 13 + boxPadding * 2, target_label_y + 4);
                this.ctx.drawImage(this.targetImage, target_label_x + boxPadding, target_label_y - 12 + 6, 13, 13);

                this.ctx.fillStyle = this._currentFillColor;
                this.roundRect(current_label_x, current_label_y - 12, currentBoxWidth, 25, 5, true, false);
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.fillText(currentValueText, current_label_x + currentIconWidth + boxPadding * 2, current_label_y + 4);        
                this.ctx.drawImage(this.currentWhiteImage, current_label_x + boxPadding, current_label_y - 12 + 3, currentIconWidth, 18);
            }            
        }
        else {            
            x_pos = this.showProgressIconOnly ? 10 : 40;
            y_pos = this._barHeight + 10;
            //console.log("this._barHeight: ", this._barHeight);
            let linear_target_width = this._targetValue / 100 * this._size;
            let linear_current_width = this._currentValue / 100 * this._size;
            //console.log(x_pos, y_pos, this._size, linear_target_width, linear_current_width);
            this.ctx.fillStyle = this._backgroundColor;
            this.ctx.fillRect(x_pos, y_pos, this._size, this._barHeight);
            
            this.ctx.fillStyle = this._targetFillColor;
            this.ctx.fillRect(x_pos, y_pos, linear_target_width, this._barHeight);

            this.ctx.fillStyle = this._currentFillColor;
            this.ctx.fillRect(x_pos, y_pos, linear_current_width, this._barHeight);

            if (this.showProgressIconOnly) {
                current_label_x = x_pos + linear_current_width - (currentIconWidth / 2);
                current_label_y = y_pos - 18 - 1;
                target_label_x = x_pos + linear_target_width - (targetIconWidth / 2);
                target_label_y = y_pos + this._barHeight + 1;

                this.ctx.drawImage(this.targetImage, target_label_x, target_label_y, targetIconWidth, 13);
                this.ctx.drawImage(this.currentGreyImage, current_label_x, current_label_y, currentIconWidth, 18);
            } 
            else {
                currentValueText = this._currentValue + '%';
                targetValueText = this._targetValue + '%';
                currentTextWidth = this.ctx.measureText(currentValueText).width;
                targetTextWidth = this.ctx.measureText(targetValueText).width;
                currentBoxWidth = currentTextWidth + currentIconWidth + boxPadding * 3;
                targetBoxWidth = targetTextWidth + 13 + boxPadding * 3;  
                current_label_x = x_pos + linear_current_width - (currentBoxWidth / 2);
                current_label_y = y_pos - 22 - 5;
                target_label_x = x_pos + linear_target_width - (targetBoxWidth / 2);
                target_label_y = y_pos + this._barHeight + 5;

                this.ctx.font = '11px sans-serif';
                this.ctx.fillStyle = this._targetFillColor;
                this.roundRect(target_label_x, target_label_y, targetBoxWidth, 22, 5, true, false);
                this.ctx.fillStyle = '#444444';
                this.ctx.fillText(targetValueText, target_label_x + 13 + boxPadding * 2, target_label_y + 14);
                this.ctx.drawImage(this.targetImage, target_label_x + boxPadding, target_label_y + 4, 13, 13);

                this.ctx.fillStyle = this._targetFillColor;
                this.ctx.beginPath();
                this.ctx.moveTo(x_pos + linear_target_width - 3, target_label_y);
                this.ctx.lineTo(x_pos + linear_target_width, y_pos + this._barHeight + 1);
                this.ctx.lineTo(x_pos + linear_target_width + 3, target_label_y);
                this.ctx.closePath();
                this.ctx.fill();

                this.ctx.fillStyle = this._currentFillColor;
                this.roundRect(current_label_x, current_label_y, currentBoxWidth, 22, 5, true, false);
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.fillText(currentValueText, current_label_x + currentIconWidth + boxPadding * 2, current_label_y + 14);
                this.ctx.drawImage(this.currentWhiteImage, current_label_x + boxPadding, current_label_y + 2, currentIconWidth, 18);

                this.ctx.fillStyle = this._currentFillColor;
                this.ctx.beginPath();
                this.ctx.moveTo(x_pos + linear_current_width - 3, current_label_y + 22);
                this.ctx.lineTo(x_pos + linear_current_width, y_pos - 1);
                this.ctx.lineTo(x_pos + linear_current_width + 3, current_label_y + 22);
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
    }

    private roundRect(x: number, y: number, width: number, height: number, radius?: any, fill?: boolean, stroke?: boolean) {
        if (typeof stroke == 'undefined') {
          stroke = true;
        }
        if (typeof radius === 'undefined') {
          radius = 5;
        }
        if (typeof radius === 'number') {
          radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
          var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
          for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
          }
        }
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius.tl, y);
        this.ctx.lineTo(x + width - radius.tr, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        this.ctx.lineTo(x + width, y + height - radius.br);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        this.ctx.lineTo(x + radius.bl, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        this.ctx.lineTo(x, y + radius.tl);
        this.ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        this.ctx.closePath();
        if (fill) {
            this.ctx.fill();
        }
        if (stroke) {
            this.ctx.stroke();
        }              
      }
    
    @Input()
    public set currentValue(val:number)
    {
        this._currentValue = val;
        this.redraw();
    };

    @Input()
    public set targetValue(val:number)
    {
        this._targetValue = val;
        this.redraw();
    };
    
    public get currentValue():number
    {
        return this._currentValue;	
    }

    public get targetValue():number
    {
        return this._targetValue;	
    }

    @Input()
    public set maximumValue(val:number)
    {
        this._maximumValue = val;        
    };
    
    public get maximumValue():number
    {
        return this._maximumValue;	
    }

    @Input()
    public set type(val:string)
    {
        this._type = val;
        //console.log("SET TYPE!!!!!!!!!!! ", val);     
    };
    
    public get type():string
    {
        return this._type;	
    }
}