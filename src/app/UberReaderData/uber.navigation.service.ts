import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EventDispatcher } from './Events/EventDispatcher';
import { UberApplication } from './UberApplication';
import { UberApplicationEvent } from './Events/UberApplicationEvent';
import { UberApplicationEventTypes } from './Events/UberApplicationEventTypes';

@Injectable()
export class HistoryNavigation extends EventDispatcher{
    private historyStack:any[] = [];
    public overrideBackBehavior:boolean = false;
    constructor(private router:Router)
    {
        super();
    }
    
    public navigate(commands:any[], extras?:any):void
    {
        //no need to push url since navigation end will add it for us
        this.router.navigate(commands,  extras);        
    }

    public replaceLastRoute(url:string, backLabel:string='Back'):void
    {
        this.historyStack.pop();
        //this.historyStack.push(url);
        this.historyStack.push({url: decodeURI(url), label: backLabel});
    }

    public setCurrentRouteLabel(label:string):void {
        //console.log("setCurrentRouteLabel: ", label);
        if (this.historyStack.length > 0) {
            this.historyStack[this.historyStack.length - 1].label = label;            
        }
    }

    public getBackLabel():string {
        return this.historyStack.length > 1 ? this.historyStack[this.historyStack.length - 2].label : '';
    }

    public pushRoute(url:string, label:string='Back'):void
    {        
        this.historyStack.push({url: decodeURI(url), label: label});
        //console.log('pushRoute:: ', this.historyStack);
    }   

    public popRoute():any
    {
        return this.historyStack.pop();
    }

    public peekLastRoute():any{
        return this.historyStack[this.historyStack.length - 1];
    }

    public back():void
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.REFRESH_NAVIGATION))
        if (!this.overrideBackBehavior) {
            if(this.historyStack.length > 1)
            {
                this.historyStack.pop();
                this.router.navigateByUrl(this.router.parseUrl(this.historyStack.pop().url));
            }
            else
            {
                this.router.navigate(["/find"]);
            }
        }        
    }
}