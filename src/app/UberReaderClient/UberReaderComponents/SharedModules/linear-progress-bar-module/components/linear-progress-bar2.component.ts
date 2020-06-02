import { Component, Input, ViewChild, OnInit } from '@angular/core';


@Component({
    selector: 'linear-progress-bar2',
    template: `
        <canvas #progressCanvas></canvas>
    `
})
export class LinearProgressBar2 {
    @ViewChild('progressCanvas', { static: true }) progressCanvas;
    @Input('backgroundColor') _backgroundColor:string = "#DDDDDD";
    @Input('fillColor') _fillColor:string = "#85C6F0";

    private _size:number = 240;    
    private _value:number = 0;
    private _maximumValue:number = 100;
    private _barHeight:number = 24;
    private _labelFontSize:number = 16;
    private _label: string = "";

    private ctx:CanvasRenderingContext2D;
    private canvas: any;

    ngAfterViewInit()
    {        
        this.canvas = this.progressCanvas.nativeElement;
        this.size = this.size;// * window.devicePixelRatio;

        this.canvas.width = this.size;
        this.canvas.height = this.barHeight;

        /* if(window.devicePixelRatio > 1)
        {
            this.canvas.style.width = (this.canvas.width / window.devicePixelRatio) + "px";
            this.canvas.style.height = (this.canvas.height / window.devicePixelRatio) + "px";
        } */
        this.ctx = this.canvas.getContext("2d");
        // this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);  
        this.redraw();
    }

    private redraw()
    {
        if (this.ctx == null) return;        

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = this._backgroundColor;
        this.ctx.fillRect(0, 0, this.size, this.barHeight);
        
        this.ctx.fillStyle = this._fillColor;
        this.ctx.fillRect(0, 0, (this.value / 100) * this.size, this.barHeight);
        
        let label: string = this.value + '%';
        if (this._label.length > 0) label += ' ' + this._label; 
        this.ctx.font = this._labelFontSize + 'px arial';
        let labelTextMetrics: TextMetrics = this.ctx.measureText(label.replace(/\s+/ig, 'l'));        
        this.ctx.fillStyle = '#444444';        
        this.ctx.fillText(label, (this.size - labelTextMetrics.width) / 2, this.barHeight / 2 + (this._labelFontSize * 0.375));
    }
    
    @Input()
    public set value(val:number)
    {
        this._value = val;
        this.redraw();
    };
    
    public get value():number
    {
        return this._value;	
    }

    @Input()
    public set label(val: string)
    {
        this._label = val;
        this.redraw();
    };
    
    public get label():string
    {
        return this._label;	
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
    public set size(val:number) {
        this._size = val;
    };

    public get size() {
        return this._size;
    }
    
    @Input()
    public set barHeight(val:number) {
        this._barHeight = val;
    };

    public get barHeight() {
        return this._barHeight;
    }

    @Input()
    public set labelFontSize(val:number) {
        this._labelFontSize = val;
    };

    public get labelFontSize() {
        return this._labelFontSize;
    }
}