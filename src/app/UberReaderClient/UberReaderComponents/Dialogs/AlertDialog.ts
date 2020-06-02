import { Component, ComponentFactoryResolver } from '@angular/core';
import { UberReaderDialog } from './UberReaderDialog';
import { AppSettings } from '../../../UberReaderData/AppSettings';
import { UberApplicationEvent } from '../../../UberReaderData/Events/UberApplicationEvent';
import { ClosePopUpEvent } from '../../../UberReaderData/Events/ClosePopUpEvent';

export class AlertDialogExtraButtonData
{
    public label:string;
    public detail:string;
    public styleName:string;

    constructor(label:string, detail:string, styleName:string)
    {
        this.label = label;
        this.detail = detail;
        this.styleName = styleName;
    }
}

@Component({
    selector: 'alert-dialog',
    template: `
            <div *ngIf="visible" class="alertDialogOverlay">
                <div class="alertDialogContainer">
                    <div class="alertTitleContainer">
                        <label>{{_title}}</label>
                    </div>
                    <div class="contentDiv">
                        <img [src]="sorryIcon" class="{{_isError ? '' : 'hide'}}" width="70" height="70">
                        <!--<label>{{_message}}</label>-->
                        <div [innerHTML]="_message" class="contentMsg"></div>
                    </div>
                <div #buttonGroup id="buttonGroupDiv">
                        <div class="col"><button #cancelButton (click)="cancelButton_Click()" class="{{cancelButtonVisible ? 'outlineGreyFilledW120Btn' : 'hide'}}">{{cancelButtonLabel}}</button></div>
                        <div class="col"><button #okButton (click)="okButton_Click()" class="outlineBlueW120Btn">{{okButtonLabel}}</button></div>
                        <!-- extra buttons -->
                        <div *ngFor="let buttonData of extraButtons" class="col">
                            <button (click)="extraButton_clickHandler(buttonData)" class="{{buttonData.styleName}}">{{buttonData.label}}</button>
                        </div>
                    </div>
                </div>
            </div>
    `
})

export class AlertDialog extends UberReaderDialog
{
    private sorryIcon:string = AppSettings.GetAssetLocation() + "assets/icon/sorry-icon.svg";

    private _message:string;
    private _isError:boolean;
    private _numOfButtons:number = 1;
    private _params:any;

    private cancelButtonVisible:boolean = false;

    private extraButtons:AlertDialogExtraButtonData[] = [];

    constructor(private componentFactoryResolver:ComponentFactoryResolver)
    {
        super();
    }
    /* 
    public static show(message:string, 
                        title:string="",
                        isError:boolean = false,
                        numOfButtons:number=1,
                        okButtonLabel:string=null, 
                        cancelButtonLabel:string=null,										
                        closeHandler:(event:UberApplicationEvent) => void=null,
                        params:any=null,
                        extraButtons:AlertDialogExtraButtonData[]=[],
                        closableByMouseDown:boolean=false,
                        extraButtonLabel:string=null):void
    {
        if(okButtonLabel == null)
            okButtonLabel = "OK";
        if(cancelButtonLabel == null)
            cancelButtonLabel = "Cancel";
        
        var punc:string = "!?.";				
        if(message && message.length > 0 && punc.indexOf(message.charAt(message.length - 1)) == -1)
        {
            message = message + ".";
        }

        if(title && title == "No translation yet")
        {
            title = ErrorMessage.GET_UI_TEXT_ERROR_TITLE;
        }
        
        DialogManager.AddPopup(AlertDialog, function(dialog:AlertDialog)
        {
            dialog.popUp(message, title, isError, numOfButtons, okButtonLabel, cancelButtonLabel, closeHandler, params, extraButtons, closableByMouseDown);
        });
    } */

    public popUp(message:string, title:string, isError:boolean, numOfButtons:number, 
												  okButtonLabel:string, cancelButtonLabel:string,
                                                  closeHandler:(event:UberApplicationEvent) => void=null,
													params:any=null, extraButtons:AlertDialogExtraButtonData[],
                                                    closableByMouseDown:boolean=false):void 
    {
        this._message = message;
        this._isError = isError;
        this._title = title;
        this.okButtonLabel = okButtonLabel;
        this.cancelButtonLabel = cancelButtonLabel;
        this._numOfButtons = numOfButtons;

        this.cancelButtonVisible = numOfButtons > 1;

        this.extraButtons = extraButtons;


        //this._defaultButton = isError || numOfButtons == 1 ? okButton : null;
        this._params = params;
        //this._closableByMouseDown = closableByMouseDown;
        

        if (closeHandler != null)
        {
            this.addEventListener(ClosePopUpEvent.CLOSE, closeHandler);
        }
        // if(closeHandler != null)
        // {
        //     addEventListener(ClosePopUpEvent.CLOSE, closeHandler, false, 0, true);
        // }
        
        //this._parent = parent;
        //UberReaderAccessor.GetPopUpManager().AddPopUpContent(this);
        this.open();		
    }

    protected cancelButton_Click():void
    {
        this.close();
        this.dispatchEvent(new ClosePopUpEvent(ClosePopUpEvent.CLOSE, ClosePopUpEvent.CANCEL, this._params));
    }

    protected okButton_Click():void
    {
        this.close();
        this.dispatchEvent(new ClosePopUpEvent(ClosePopUpEvent.CLOSE, ClosePopUpEvent.OK, this._params));
    }
    
    protected extraButton_clickHandler(buttonData:any):void
    {
        this.close();
        this.dispatchEvent(new ClosePopUpEvent(ClosePopUpEvent.CLOSE, buttonData.detail, this._params));
    }

    public close():void
    {
        this.visible = false;
        setTimeout(() => 
        {
            //remove all extra buttons
            this.extraButtons = [];
            this.destroy();
            this.removeAllListeners();
        }, 0);
    }
   
    public dispose():void
    {
        
    }
}