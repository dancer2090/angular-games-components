import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VisualComponent } from '../../../VisualComponent';
import { UberReader } from '../../../../UberReader';
import { ScreenState } from '../../../../../UberReaderData/Utils/ScreenState';

@Component({
    selector: 'empty-screen',
    template: `
        <div class="{{visible ? '' : 'hide'}}">
            <div class="coursePromptContainer">
                <div class="empty-screen-icon-div"><mdl-icon class="empty-screen-icon">find_in_page</mdl-icon></div><Br/>
                <label class="mdl-typography--display-1 mdl-color-text--grey-600 empty-screen-headline">No Results Found</label><Br/><Br/>
                <label class="mdl-typography--subhead mdl-typography--font-medium mdl-color-text--grey-600 empty-screen-label">{{ emptyScreenStart }}</label><Br/>
                <!--button mdl-button class="green-button empty-screen-button" (click)="linkLabelClickEvent()" mdl-button-type="raised" mdl-ripple>{{ linkLabel }}</button-->  
                <button mat-raised-button class="button--primary empty-screen-button" (click)="linkLabelClickEvent()">{{ linkLabel }}</button>   
            </div>
        </div>
    `
})

export class EmptyScreen extends VisualComponent
{
    @Input() visible:boolean = true;
    @Output() refresh = new EventEmitter();

    private _screenState:string = "discover";
    public emptyScreenStart:string = "";
    public linkLabel:string = "";
    public emptyScreenAfterLink:string = "";

    public init(screenState:string, browse:string, overrideMessage?:string):void
    {	        
        this._screenState = screenState;
        if(overrideMessage != null && overrideMessage.length > 0)
        {
            this.emptyScreenStart = overrideMessage;
            this.linkLabel = "Clear search";
        }
        else
        {
            if(screenState == "prep" || screenState == "wishlist")
            {
                this.emptyScreenStart = "You have not added anything to your " + screenState + " yet.<br/>Go to ";
                this.linkLabel = "Browse";
                this.emptyScreenAfterLink = " to add some prep";
            }
            else if(screenState == "discover")
            {
                this.emptyScreenStart = "Nothing is available in this category right now. Please try a different category or go to ";
                this.linkLabel = "My Prep";
            }            
        }
    }	
    
    public linkLabelClickEvent():void
    {
        if(this._screenState == "discover")
        {          
            this.refresh.emit();            
        }
        else if(this._screenState == "wishlist" || this._screenState == "prep")
        {
            UberReader.GetInstance().SwitchScreenState(ScreenState.PREP_ED_DISCOVER);
        }
        else if(this._screenState == "noInternet")
        {
            this.refresh.emit();
        }
    }
    
    public dispose():void
    {

    }
}