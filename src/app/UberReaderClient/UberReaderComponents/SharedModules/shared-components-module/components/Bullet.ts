import { Component, Input, Output, EventEmitter } from '@angular/core';

import { VisualComponent } from '../../../VisualComponent';

@Component({
    selector: 'bullet',
    template: `
<div *ngIf="visible" (click)="bulletClicked()">
    <div *ngIf="bulletImgString != null">
        <img [src]="bulletImgString">
    </div>
    <!--<div *ngIf="!useCustomImage">
        //Draw square
    </div>-->
    <label #lblContent>{{contentString}}</label>
</div>
    `
})

export class Bullet extends VisualComponent
{
    @Input('visible') visible:boolean = true;
    @Output() selected = new EventEmitter();
    @Input('contentString') contentString:string;
    @Input('bulletImgString') bulletImgString:string = null;

    public _font:string = "Arial";
    public _fontSize:number;
    public _color:number = 0x878888;
    
    public useCustomImage:boolean = false;
    public _symbolColor:number = 0x444444;
    public _bulletSize:number = 8;


    public bulletImgSource:string = "";
    
    public setContent(val:string)
    {				
        this.contentString = val;
    }
    
    private bulletClicked()
    {
        this.selected.emit(null);
    }
    
    public dispose():void
    {
        
    }
}