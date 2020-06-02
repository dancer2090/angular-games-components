import { Component, Input, Output, EventEmitter, ViewChild, ViewChildren } from '@angular/core';

import { VisualComponent } from '../../VisualComponent';

import { MenuItem } from './MenuItem';

@Component({
    selector: 'menu-item-renderer',
    template: `
        <div *ngIf="item.isHR" id="menuListSeparator"></div>
        <div *ngIf="item.visible != false && !item.isHR" style="cursor: pointer;" (clickOutside)="closeMenu()" (mouseover)="mouseOverEvent()" (mouseleave)="mouseLeaveEvent($event)" class="{{selected ? 'dropDownListItemSelectedHighlight' : 'dropDownListItem'}}">
           <div id="row" (click)="showChildOrSelect()"> 
                <div id="col1">
                    <input type="checkbox" *ngIf="multiple" [checked]="selected" (click)="showChildOrSelect()"/>
                    <img src="{{'assets/icon/checkmark_16.png' | resourceLoc}}" *ngIf="!multiple && selected" width="16" height="16"/>
                </div>
                <div class="col3" *ngIf="item.unseen > 0"><label class="notifLabel">{{item.unseen}}</label></div>              
                <div id="col2">
                    <button #rendererButton>
                        {{item.label | uppercase}}
                        <img src="{{'assets/icon/menuitem_expand.svg' | resourceLoc}}" *ngIf="item.children != null" width="11" height="17"/>
                        
                    </button>
                </div>                  
           </div> 

            <!-- for children -->
            <div #dropDownItemsDiv class="{{menuListOpen ? 'menuListOpenStyle': 'hide'}}" [style.position]="'absolute'" [style.left]="divOffsetLeft" [style.top]="divOffsetTop" id="menuListOpenChild">
                <menu-item-renderer *ngFor="let obj of item.children" [parent]="item" [item]="obj" [multiple]="item.multiple" [lockSelection]="item.lockSelection" 
                    [selected]="selections.indexOf(obj.data) > -1"
                    (selectedItem)="itemSelected($event)" (onleave)="childLeaveFocus($event)">
                </menu-item-renderer>
            </div>
        </div>
    `
})

export class MenuItemRenderer extends VisualComponent
{
    @Input('item') item:MenuItem;
    @Input('parent') parent:MenuItem;
    @Input('multiple') multiple:boolean = false;
    @Input('lockSelection') lockSelection:boolean = false;
    @Input('selected') selected:boolean = false;
    @Input('direction') direction:string = "right";

    @Output() selectedItem = new EventEmitter();
    @Output() selectedLabelItem = new EventEmitter();
    @Output() onleave = new EventEmitter();
    //@Output() selectedItems = new EventEmitter();

    @ViewChild('dropDownItemsDiv', { static: true }) dropDownItemsDiv:any;
    @ViewChild('rendererButton', { static: true }) rendererButton:any;

    public selections:any[] = [];

    public divOffsetLeft:string = '';
    public divOffsetTop:string = '';    
    public menuListOpen:boolean = false;

    ngOnInit():void
    {

    }

    ngAfterViewInit():void
    {
        setTimeout(() => {
            if(this.item.selected)
            {
                this.itemSelected(this.item);
            }
        }, 0);        
    }

    showChildOrSelect():void
    {
        if(this.item.children != null)
        {            
            this.menuListOpen = !this.menuListOpen;  
            this.position();          
        }
        else
        {
            //this.selectedItem.emit(this.item.data);
            this.itemSelected(this.item);
        }
    }

    mouseOverEvent():void
    {
        if(this.item.children)
        {
            this.menuListOpen = true;
            this.position();
        }        
    }

    private position():void
    {
        let offSetLeft:number;        
        if(this.direction == "right") 
        {
            offSetLeft = this.rendererButton.nativeElement.offsetWidth + this.dropDownItemsDiv.nativeElement.previousElementSibling.offsetLeft - 5;            
        }
        else
        {
            offSetLeft = this.dropDownItemsDiv.nativeElement.previousElementSibling.offsetWidth * -1 + 2;
        }

        this.divOffsetLeft = offSetLeft + "px";
        this.divOffsetTop = (this.rendererButton.nativeElement.offsetTop + 5) + "px";
    }

    itemSelected(selectedVal:any):void
    {
        if(this.item.multiple == true)
        {        
            /*   
            let index = this.selections.indexOf(data)
            if (index > -1)
            {
                this.selections.splice(index, 1);
            }
            else
            {
                this.selections.push(data);
            }

            this.selectedItems.emit(this.selections);
            */
        }
        else
        {
            //mainly used by parent menu items
            if(this.item.lockSelection == true)
            {
                this.selections = [];
                this.selections.push(selectedVal.data);
            }

            //mainly used by parent menu items
            if(this.item.labelSrc)
            {
                this.selectedLabelItem.emit(selectedVal.label);
            }

            if(this.parent == null)
            {
                //only pass the data that will be used in the component
                this.selectedItem.emit(selectedVal.data);       
            }
            else
            {
                //bubble up the menu item up to the parent menu list component
                this.selectedItem.emit(selectedVal);       
            }
        }
    }

    public closeMenu()
    {
        this.menuListOpen = false;
    }

    mouseLeaveEvent(event):void
    {
        this.onleave.emit(this);
    }

    childLeaveFocus(event):void
    {
        if(this.parent == null)
        {
            this.onleave.emit(this);
        }
        else
        {
            event.closeMenu();
        }
    }

    public checkBoxClicked(event):void
    {
        event.preventDefault()
    }
}