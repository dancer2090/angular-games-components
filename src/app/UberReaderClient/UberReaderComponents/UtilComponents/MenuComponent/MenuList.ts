import { Component, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { VisualComponent } from '../../VisualComponent';

import { MenuItem } from './MenuItem';
import { MenuItemRenderer } from './MenuItemRenderer';

@Component({
    selector: 'menu-list',
    template: `
        <div (clickOutside)="closeMenu()" style="cursor: pointer;" (mouseleave)="mainBoxExit()">
            <button (mouseover)="toggleMenu()" class="dropDownBtn">{{label | uppercase}}<ng-content></ng-content></button>
            <div id="dropDownItemsDiv" #dropDownItemsDiv class="{{menuListOpen ? 'menuListOpenStyle': 'hide'}}" [style.left]="divOffsetLeft">
                <menu-item-renderer *ngFor="let item of menuProvider" [direction]="childDirection" [item]="item" (selectedItem)="itemSelected($event)" (selectedLabelItem)="itemLabelSelected($event)" (onleave)="itemOnLeave($event)"></menu-item-renderer>
            </div>
        </div>
    `
})

export class MenuList extends VisualComponent
{
    @Input('label') label:string;
    @Input('menuProvider') menuProvider:MenuItem[];
    @Input('childDirection') childDirection:string = "right"; //left or right

    @Output() selectedItem = new EventEmitter();
    @Output() selectedItems = new EventEmitter();

    @ViewChild('dropDownItemsDiv', { static: true }) dropDownItemsDiv:any;
    @ViewChildren(MenuItemRenderer) itemsRenderers:QueryList<MenuItemRenderer>;

    public menuListOpen:boolean = false;

    public divOffsetLeft:string = '';
    public toggleMenu():void
    {
        this.menuListOpen = true;//!this.menuListOpen;
        this.divOffsetLeft = this.dropDownItemsDiv.nativeElement.previousElementSibling.offsetLeft + "px";

        setTimeout(() => {
            this.getSize();
        }, 0);
    }

    private getSize():void
    {
        let occupiedSpace:number = this.dropDownItemsDiv.nativeElement.previousElementSibling.offsetLeft + this.dropDownItemsDiv.nativeElement.offsetWidth;
        if(occupiedSpace > window.innerWidth)
        {
            let extraSpace:number = occupiedSpace - window.innerWidth;
            this.divOffsetLeft = (this.dropDownItemsDiv.nativeElement.previousElementSibling.offsetLeft - (extraSpace + 5)) + "px";
        }
        else
        {
            this.divOffsetLeft = this.dropDownItemsDiv.nativeElement.previousElementSibling.offsetLeft + "px";
        }
    }

    public itemSelected(item:any):void
    {
        this.selectedItem.emit(item);
        this.closeMenu()
    }

    public itemLabelSelected(label:string):void
    {
        this.label = label;
    }
    
    public closeMenu()
    {
        this.menuListOpen = false;
    }

    public itemOnLeave(event:MenuItemRenderer):void
    {
        event.closeMenu();
    }

    mainBoxExit():void
    {
        this.closeMenu();
    }
}