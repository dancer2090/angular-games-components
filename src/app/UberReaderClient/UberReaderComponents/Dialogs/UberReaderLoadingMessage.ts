import { Component, Input, OnInit } from '@angular/core';
import { StringUtils } from '../../../UberReaderData/Utils/StringUtils';
import { IUberReaderLoadingDialog } from '../../../UberReaderData/Utils/IUberReaderLoadingDialog';
import { UberReaderDialog } from './UberReaderDialog';
import { UberApplication } from '../../../UberReaderData/UberApplication';
import { UberApplicationEvent } from '../../../UberReaderData/Events/UberApplicationEvent';

import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../../../UberReaderData/AppSettings';
import { BuildSettings } from '../../BuildSettings';
import { UberApplicationEventTypes } from '../../../UberReaderData/Events/UberApplicationEventTypes';
@Component({
    selector: 'uber-reader-loading-message',
    template: `
    <!-- class="{{visible ? 'loadingDialogOverlaySm' : 'hide'}}" -->
    <div [class.hide]="!visible" [class.loadingDialogOverlaySm]="visible">
        <div *ngIf="loadingPercentage != -1; else defaultLoadingMessage">
            <img src="{{ productLogo | resourceLoc }}" style="width: 300px;"/>
            <div id="loading-percentage">{{ loadingDescription + " - " + loadingPercentage }}%</div>
            <mdl-progress id="loading-progress" [progress]="loadingPercentage"></mdl-progress>
        </div>

        <ng-template #defaultLoadingMessage>
            <img src="{{ productLogo | resourceLoc }}" width="200" class="loading" [class.pulse]="animate"/>
            <Br/>
            <div class="loadingMessage mdl-typography--subhead mdl-typography--font-medium" [class.hide]="animate">
                This is taking longer than expected, you can keep waiting or cancel and try again.
            </div>
            <button [class.hide]="animate" mdl-button (click)="cancelButton_clickHandler()" mdl-button-type="raised" mdl-ripple class="loadingCancelBtn">
                Cancel
            </button>
        </ng-template>

        <!--
        <div class="loadingDialogContainerSm">
            <div class="row"><label>{{loadingLabel}}</label></div>
            <div class="row"><label class="{{cancelLinkVisible ? 'outlineGreyFilledW80Btn' : 'hide'}}" (click)="cancelButton_Click()" >Cancel</label></div>
        </div>
        -->
    </div>
    `
})

export class UberReaderLoadingMessage extends UberReaderDialog implements IUberReaderLoadingDialog, OnInit
{
    @Input() visible = false;
    public static CANCEL_LOADING:string = "cancelLoading";
    
    public loadingLabel:string = "Loading...";
    public cancelLinkVisible:boolean = false;

    //private cancelTimer:Timer;

    public static _onScreen:boolean = false;
    public productLogo:string = "";
    public animate:boolean = true;
    public loadingDescription: string = "";
    public loadingPercentage: number = -1;

    private static _instance:UberReaderLoadingMessage;
    private cancel_callback: () => void;
    public static GetInstance():UberReaderLoadingMessage
    {
        return UberReaderLoadingMessage._instance;
    }

    constructor()
    {
        super();
        UberReaderLoadingMessage._instance = this;
    }

    ngOnInit() {
        switch(BuildSettings.productId) {
            case AppSettings.PREP_ED: 
                this.productLogo = "assets/icon/preped-logo.svg";//"http://www.preped.com/wp-content/themes/alfie/images/preped-logo.svg";
                break;
            case AppSettings.TYPESY:
                this.productLogo = "assets/icon/typesy-logo.svg";
                break;
        }
    }
    public cancelButton_clickHandler() {
        if (this.cancel_callback != null) {
            this.cancel_callback();
        }
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.CANCEL_LOADING));
        this.Hide();
    }

    public Show(loadingMessage:string, includeDefaultMessage:boolean = true, blocking:boolean = true, cancellable:boolean = true, callback?: () => void):void
    {
        this.cancel_callback = callback;

        if (UberReaderLoadingMessage._onScreen)
        {

        }
        else
        {
            UberReaderLoadingMessage._onScreen = true;
            this.animate = this.loadingPercentage != -1? false : true;

            if(cancellable)
            {
                this.timer = Observable.timer(0, 1000);
                this.subscription = this.timer.subscribe(t => {
                    this.showCancelButton(t);
                });
            }
            else
            {
                if(this.subscription)
                {
                     this.subscription.unsubscribe();
                }
            }

            this.cancelLinkVisible = false;
            this.setLoadingLabelText(loadingMessage, includeDefaultMessage);					
            //this._modal = blocking;
            
            this.open();
            
            //if (callback != null) {
                this.timeoutId = setTimeout(() => {
                    this.animate = false;
                }, 10000);
            //}            
        }
    }

    private timeoutId;
    private timer:Observable<number> = Observable.timer(0, 1000);
    private subscription:any;
    public open():void
    {
        this.visible = true;
    }

    public Hide():void
    {
        UberReaderLoadingMessage._onScreen = false;

        if(this.subscription)
        {
            this.subscription.unsubscribe();
        }
                    
        this.visible = false;
        this.animate = false;
        this.loadingDescription = "";
        this.loadingPercentage = -1;
        clearTimeout(this.timeoutId);
    }

    public cancelButton_Click():void
    {
        this.dispatchEvent(new UberApplicationEvent(UberReaderLoadingMessage.CANCEL_LOADING));
        this.Hide();
    }

    public CancelPreviousCall():void
    {
        this.cancelButton_Click();
    }

    public setLoadingLabelText(txt:string , includeDefaultText:boolean = true):void
    {
        if (!StringUtils.endsWith(StringUtils.TrimString(txt), "."))
        {
            txt =  txt + ".";
        }
        
        this.loadingLabel = txt;
        
        if(includeDefaultText)
        {
            this.loadingLabel = this.loadingLabel + " " + 
                (UberApplication.GetInstance().GetUiTextByKey("LABEL_LOADING_DIALOG_DEFAULT") == "No translation yet" ? "" : UberApplication.GetInstance().GetUiTextByKey("LABEL_LOADING_DIALOG_DEFAULT"));
        }

        if(UberApplication.GetInstance().CurrentProduct && UberApplication.GetInstance().CurrentProduct.DisplayQuestion)
        {
            this.loadingLabel = "Loading...";
        }
    }

    private showCancelButton = (t:number) =>
    {
        this.cancelLinkVisible = t >= 5;
        //this.cancelLinkVisible = true;
    }

    public dispose():void
    {

    }
}