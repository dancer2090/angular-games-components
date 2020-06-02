import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';

import { VisualComponent } from '../../../VisualComponent';

@Component({
    selector: 'drop-down-list-item',
    
    template: `
        <div *ngIf="isHR"><hr></div>
        <div *ngIf="isHeader"><label class="dropDownHeaderLabel">{{label}}</label></div>
        <div *ngIf="!isHeader && !isHR" class="dropDownListItemContainer">
            <div class="{{ selected && lockSelection ? (highlightSelection ? 'dropDownListItemSelectedHighlight' : 'dropDownListItemSelected') : 'dropDownListItem'}}">
                <div class="col1" *ngIf="withCheckBox"><input type="checkbox" [checked]="selected"/></div>
                <div class="col2"><label class="{{selected && lockSelection ? 'activeLabel' : ''}}">{{label}}</label></div>
                <div *ngIf="withIcon">
                    <img #listItemIcon [src]="listItemIconSrc" (mouseover)="onIconMouseOver()" (mouseleave)="onIconMouseLeave()" (click)="onIconClick($event)">
                </div>
                <div *ngIf="showNotifLabel" class="col3"><label class="notifLabel">{{notifLabel}}</label></div>
            </div>
        </div>
    `
})

export class DropDownListItem extends VisualComponent implements OnInit
{
    //@Input('value') value:string;
    @Input('withCheckBox') withCheckBox:boolean = false;
    @Input('item') item:any;

    @Input('selected') selected:boolean = false;
    @Input('lockSelection') lockSelection:boolean = false;    
    @Input('highlightSelection') highlightSelection:boolean = false;    

    @Input('labelField') labelField:string;
    @Input('notifLabelField') notifLabelField:string;
    @Input('listItemIconSrc') listItemIconSrc:string;
    @Input('listItemActiveIconSrc') listItemActiveIconSrc:string;

    @Output() iconClicked = new EventEmitter();

    @ViewChild('listItemIcon', { static: true }) listItemIcon:any;

    public label:string;
    public withIcon:boolean = false;
    public isHeader:boolean = false;
    public notifLabel:string = "";
    public showNotifLabel:boolean = false;
    public isHR:boolean = false;

    ngOnInit():void
    {
        this.init();
    }

    public init():void {
        if(typeof(this.item) == 'string')
        {
            this.label = this.item;
        }
        else
        {
            if(this.labelField != null)
            {
                this.label = this.item[this.labelField];
            }

            if( this.listItemIconSrc != null && this.item["forceHideIcon"] == null) {
                this.withIcon = true;
            }

            if(this.item["isHeader"] != null) {
                this.isHeader = this.item["isHeader"];
            }

            if(this.notifLabelField != null)
            {                
                this.notifLabel = this.item[this.notifLabelField];
                this.showNotifLabel = this.notifLabel && this.notifLabel != "0";                
            }

            if(this.item["isHR"] != null) {
                this.isHR = this.item["isHR"];
            }
        }
    }

    onIconClick(event) {
        event.stopPropagation();
        this.iconClicked.emit(this.item);
    }

    onIconMouseOver() {
        this.listItemIcon.nativeElement.src = this.listItemActiveIconSrc;
    }

    onIconMouseLeave() {
        this.listItemIcon.nativeElement.src = this.listItemIconSrc;
    }

    dispose():void
    {

    }
}