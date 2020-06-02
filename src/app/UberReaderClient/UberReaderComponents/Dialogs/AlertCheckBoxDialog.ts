import { Component, ViewChild } from '@angular/core';
import { UberReaderDialog } from './UberReaderDialog';
import { UberApplicationEvent } from '../../../UberReaderData/Events/UberApplicationEvent';
import { ClosePopUpEvent } from '../../../UberReaderData/Events/ClosePopUpEvent';
import { UberApplication } from '../../../UberReaderData/UberApplication';

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
    selector: 'alert-check-box-dialog',
    template: `
<div *ngIf="visible" class="alertDialogOverlay">
    <div class="alertDialogContainer">
        <div class="alertTitleContainer">
            <label>{{_title}}</label>
        </div>
        <div class="contentDiv">
            <div [innerHTML]="_message" class="contentMsg"></div>
            <div class="checkboxDiv">
                <input type="checkbox" #userPref/>
                <label>{{_checkBoxLabel}}</label>
            </div>
        </div>
       <div #buttonGroup id="buttonGroupDiv">
            <div class="col"><button #cancelButton (click)="cancelButton_Click()" class="{{cancelButtonVisible ? 'outlineGreyFilledW120Btn' : 'hide'}}">{{cancelButtonLabel}}</button></div>
            <div class="col"><button #okButton (click)="okButton_Click()" class="outlineBlueW120Btn">{{okButtonLabel}}</button></div>
        </div>
    </div>
</div>
    `
})

export class AlertCheckBoxDialog extends UberReaderDialog
{
    @ViewChild('userPref', { static: true }) userPref:any;

    private _message:string;
    private _isError:boolean;
    private _numOfButtons:number = 1;
    private _params:any;
    private _checkBoxLabel:string;

    private cancelButtonVisible:boolean = false;
    constructor()
    {
        super();
    }
    
    /* public static show(message:string, 
                        title:string="", 
						isError:boolean = false, 
						numOfButtons:number=1,
						okButtonLabel:string=null, 
						cancelButtonLabel:string=null,										
						closeHandler:(event:UberApplicationEvent) => void=null,
						params:any=null,
						closableByMouseDown:boolean=false,
						userPref:string=null,
						checkBoxLabel:string=null):void
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
        
        DialogManager.AddPopup(AlertCheckBoxDialog, function(dialog:AlertCheckBoxDialog)
        {
            dialog.popUp(message, title, isError, numOfButtons, okButtonLabel, cancelButtonLabel, closeHandler, params, userPref, checkBoxLabel);
        });
    } */

    private _userPref:string;
    public popUp(message:string, title:string, isError:boolean, numOfButtons:number, 
												  okButtonLabel:string, cancelButtonLabel:string,
                                                  closeHandler:(event:UberApplicationEvent) => void=null,
													params:any=null, userPref:string=null,
                                                    checkBoxLabel:string=null):void 
    {
        this._message = message;
        this._isError = isError;
        this._title = title;
        this.okButtonLabel = okButtonLabel;
        this.cancelButtonLabel = cancelButtonLabel;
        this._numOfButtons = numOfButtons;
        this._checkBoxLabel = checkBoxLabel;
        this._userPref = userPref;

        this.cancelButtonVisible = numOfButtons > 1;

        this._params = params;
        

        if (closeHandler != null)
        {
            this.addEventListener(ClosePopUpEvent.CLOSE, closeHandler);
        }
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
        UberApplication.GetInstance().UpdateUserPref(this._userPref, this.userPref.nativeElement.checked.toString(), true );
        setTimeout(() => 
        {
            //remove all extra buttons
            this.destroy();
            this.removeAllListeners();
        }, 0);
    }
   
    public dispose():void
    {
        
    }
}