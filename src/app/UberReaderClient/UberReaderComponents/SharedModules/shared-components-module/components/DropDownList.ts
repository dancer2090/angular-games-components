import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { Component, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { DropDownListItem } from './DropDownListItem';
import { VisualComponent } from '../../../VisualComponent';

@Component({
    selector: 'drop-down-list',
    template: `
    <div id="dropDownListDiv" #dropDownListDiv (clickOutside)="closeDropDown()" *ngIf="visible" (mouseleave)="closeDropDown()">        
        <button #dropdownButton (click)="toggleMenu()" (touchstart)="toggleMenuStart()" style="cursor: pointer;" (mouseover)="toggleMenuHover()" 
            class="{{selectedItems.length > 0 && lockSelection && multiSelect ? 'dropDownBtnActive' : 'dropDownBtn'}}">
                {{label}}<ng-content></ng-content>
        </button>

        <div id="dropDownItemsDiv" class="{{dropDownOpen && childCreated ? 'dropDownItemsStyle': 'hide'}}" #dropDownItemsDiv
            [style.background-color]="backgroundColor"
            [style.position]="'absolute'" [style.top]="divOffsetTop" [style.left]="divOffsetLeft"
            [style.overflow-y]="'auto'" [style.max-height]="maxHeight">
            <drop-down-list-item *ngFor="let dataItem of dataList" [item]="dataItem" [labelField]="labelField" [notifLabelField]="notifLabelField" (click)="valueSelected(dataItem)" [selected]="selectedItems.indexOf(dataItem) > -1"
                [withCheckBox]="withCheckBox" [listItemIconSrc]="listItemIconSrc" [listItemActiveIconSrc]="listItemActiveIconSrc" [lockSelection]="lockSelection" [highlightSelection]="highlightSelection" (iconClicked)="onIconClick($event)"></drop-down-list-item>
        </div>
    </div>
    `
})

export class DropDownList extends VisualComponent
{
    @Input('visible') visible:boolean = true;    

    @Input('labelField') labelField:string;
    @Input('notifLabelField') notifLabelField:string;
    @Input('label') label:string;

    @Input('dataList') dataList:any[];
    @Input('multiSelect') multiSelect:boolean = false;
    @Input('withCheckBox') withCheckBox:boolean = false;
    @Input('lockSelection') lockSelection:boolean = false;
    @Input('highlightSelection') highlightSelection:boolean = false;
    @Input('listItemIconSrc') listItemIconSrc:string;
    @Input('listItemActiveIconSrc') listItemActiveIconSrc:string;    

    @Input('bindLabel') bindLabel:boolean = false;
    @Input('requireSelection') requireSelection:boolean = false;

    @Input('openOnHover') hoverTrigger:boolean = false;
    @Input('verticalPosition') verticalPosition:string = "bottom";
    @Input('horizontalPosition') horizontalPosition:string = "center";

    @Input('maxHeight') maxHeight:string = "99999px";
    @Input('backgroundColor') backgroundColor:string = "white";

    @ViewChild('dropDownItemsDiv', { static: true }) dropDownItemsDiv:any; 
    @ViewChild('dropDownListDiv', { static: true }) dropDownListDiv:any; 
    @ViewChild('dropdownButton', { static: true }) dropdownButton:any; 
    @ViewChildren(DropDownListItem) dropdownItems:QueryList<DropDownListItem>; 

    @Output() selectionChanged = new EventEmitter<string[]>();
    @Output() iconClickHandler = new EventEmitter();

    public childCreated:boolean = false;
    public selectedItems:any[] = [];

    public divOffsetLeft:string = '0px';
    public divOffsetTop:string = '0px';

    public refresh():void
    {
        if(this.selectedItems.length > 0)
        {
            this.valueSelected(this.selectedItems[0]);
        }
    }

    public refreshItems():void {
        let items:DropDownListItem[] = this.dropdownItems.toArray();
        for (let item of items) {
            item.init();
        }
    }

    //click event
    public toggleMenu():void
    {    
        this.dropDownOpen = true;        
        setTimeout(() => {
            this.setDropDownPosition();
        }, 0); 
    }

    //hover events
    //triggered in mobile click
    public toggleMenuHover():void
    {
        if(this.hoverTrigger)
        {                        
            this.dropDownOpen = true;
            setTimeout(() => {                   
                this.setDropDownPosition();
            }, 0); 
        }        
    }

    public toggleMenuStart():void
    {
        if(this.hoverTrigger)
        {                        
            this.dropDownOpen = true;
            setTimeout(() => {                 
                this.setDropDownPosition();
            }, 0); 
        }        
    }

    public closeDropDown():void {
        this.dropDownOpen = false;
        /*
        if(this.hoverTrigger)
        {            
            this.dropDownOpen = false;
            this.history.push('mouse leave');
            this.historyEvent.emit(this.history);
        }
        */
    }

    private setDropDownPosition():void {      
        let dropDownBtnOffSetTop = this.dropdownButton.nativeElement.offsetTop;
        let dropDownBtnOffSetLeft = this.dropDownItemsDiv.nativeElement.previousElementSibling.offsetLeft;        
        let dropDownItemsDiv_height = this.dropDownItemsDiv.nativeElement.offsetHeight;
        switch(this.verticalPosition) {
            case 'top' :    
                            this.divOffsetTop = (dropDownBtnOffSetTop - dropDownItemsDiv_height) + "px";
                            break;
                            
            case 'middle' : this.divOffsetTop = (dropDownBtnOffSetTop - dropDownItemsDiv_height/2) + "px";
                            break;

            case 'bottom':
            default:        this.divOffsetTop = (dropDownBtnOffSetTop + this.dropdownButton.nativeElement.offsetHeight) + "px";
                            break;
        }

        switch(this.horizontalPosition) {
            case 'left' : 
                            this.divOffsetLeft = (dropDownBtnOffSetLeft - this.dropDownItemsDiv.nativeElement.offsetWidth) + "px";
                            break;
            case 'right' : 
                            this.divOffsetLeft = (dropDownBtnOffSetLeft + this.dropdownButton.nativeElement.offsetWidth) + "px";
                            break;
            case 'center':
            default: 
                            this.divOffsetLeft = dropDownBtnOffSetLeft + "px";
                            break;
        }

        this.childCreated = true;
    }
    
    public dropDownOpen:boolean = false;

    public getSelectedItems():any[]
    {
        return this.selectedItems;
    }
    public setSelectedItems(selectedValues:any[]):void
    {
         this.selectedItems = selectedValues;
    }

    public getSelectedItem():any
    {
        return this.selectedItems.length > 0 ? this.selectedItems[this.selectedItems.length - 1] : null;
    }
    public setSelectedItem(val:any):void
    {
        if (!this.multiSelect)
        {
            if(this.bindLabel)
            {
                if(typeof(val) == 'string')
                {
                    this.label = val;
                }
                else if(this.labelField != null)
                {
                    this.label = val[this.labelField];
                }
            }
        }

        this.selectedItems = [val];
    }

    public setSelectedItemIndex(index:number):void
    {
        if (!this.multiSelect)
        {
            var val:any = this.dataList[index];
            if(this.bindLabel)
            {
                if(typeof(val) == 'string')
                {
                    this.label = val;
                }
                else if(this.labelField != null)
                {
                    this.label = val[this.labelField];
                }
            }

            this.selectedItems = [val];
        }
    }

    valueSelected(val:any):void
    {
        if (!this.multiSelect)
        {
            if(this.bindLabel)
            {
                if(typeof(val) == 'string')
                {
                    this.label = val;
                }
                else if(this.labelField != null)
                {
                    this.label = val[this.labelField];
                }
            }

            // if (this.selectedItems.length == 0 || this.selectedItems[0] != val)
            // {
                this.selectedItems = [val];
                this.selectionChanged.emit(this.selectedItems);
            // }
            // else
            // {

            // }
        }
        else
        {
            let index = this.selectedItems.indexOf(val)
            if (index > -1)
            {
                this.selectedItems.splice(index, 1);
            }
            else
            {
                this.selectedItems.push(val);
            }
            this.selectionChanged.emit(this.selectedItems);
        }
        this.closeDropDown();
    }          

    public onIconClick(item:any):void {
        this.iconClickHandler.emit(item);
    }
}