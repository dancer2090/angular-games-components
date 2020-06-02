import { Component, Inject } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { UberApplication } from '../../../../UberReaderData/UberApplication';
import { UberReaderDialog } from '../UberReaderDialog';
import { UberReaderLoadingMessage } from '../UberReaderLoadingMessage';
import { Wordlist } from '../../../../UberReaderData/DataClasses/db/Wordlist';
import { WordlistVisibilityEvent } from '../../../../UberReaderData/Events/WordlistVisibilityEvent';
import { UberApplicationEvent } from '../../../../UberReaderData/Events/UberApplicationEvent';
import { UberApplicationEventTypes } from '../../../../UberReaderData/Events/UberApplicationEventTypes';
import { ParentDialog } from '../ParentDialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector:"change-wordlist-visibility-dialog",
    styleUrls: ['./ChangeWordlistVisibility.css'],
    template:`
        <div>       
			<div class="mdl-grid login-form-grid">
				<div class="mdl-cell mdl-cell--12-col login-form-cell">
					<h3 class="mdl-typography--headline mdl-color-text--grey-800 login-headline">{{ _title }}</h3>
					<button class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
						<mdl-icon>close</mdl-icon>   
					</button>

                    <mdl-radio name="visibility" value="true" [(ngModel)]="radioBtnValue" (click)="rbGroup_itemClickHandler(true)" mdl-ripple>Community – other users can view this list, but only you can update it.</mdl-radio>
                    <br><br>
                    <mdl-radio name="visibility" value="false" [(ngModel)]="radioBtnValue" (click)="rbGroup_itemClickHandler(false)" mdl-ripple>Private – Only you can access this list.</mdl-radio>
				</div> 
			</div>        
			<div class="mdl-dialog__actions">
				<button mdl-button class="green-button login-button" (click)="okButton_Click()" mdl-button-type="raised" mdl-ripple>Save</button>				
			</div>
		</div>
<!--
        <div class="alertDialogOverlay">
            <div class="wordListDialogContainer">
                <div class="alertTitleContainer">
                    <label>{{_title}}</label>
                    <button (click)="closeDialog()" class="closeBtn"></button>
                </div>
                <div class="contentDiv">
                    <input id="publicRadioBtn" #publicRadioBtn type="radio" name="visibility" value="true" (click)="rbGroup_itemClickHandler(true)">Community – other users can view this list, but only you can update it.<br/>
                    <input id="privateRadioBtn" #privateRadioBtn type="radio" name="visibility" value="false" (click)="rbGroup_itemClickHandler(false)">Private – Only you can access this list.
                </div>

                <div #buttonGroup id="buttonGroupDiv">
                    <div class="col"><button #okButton (click)="okButton_Click()" class="outlineBlueW120Btn">Save</button></div>
                </div>
            </div>
        </div>
-->
    `
})

export class ChangeWordlistVisibility extends ParentDialog
{
    private _wordlist:Wordlist;
    public radioBtnValue: string = 'true';
    public isPublic:boolean = true;
    private _defaultIsPublicValue:boolean;
    public wordlistVisibilityChanged:(e:WordlistVisibilityEvent) => void;
    public visibilityRadioValue:boolean;
    
    //@ViewChild('publicRadioBtn') publicRadioBtn:any;
    //@ViewChild('privateRadioBtn') privateRadioBtn:any; 

    constructor(
        public dialogRef: MatDialogRef<ChangeWordlistVisibility>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        super(dialogRef);

        this._wordlist = data.wordlist;        
        this._title = UberApplication.GetInstance().GetUiTextByKey("LIST_VISIBILITY_DIALOG_TITLE").replace("{0}", data.wordlistName);
        this._defaultIsPublicValue = data.defaultIsPublicValue;        

        this.wordlistVisibilityChanged = data.setWordlistVisibility;        
    }

    ngAfterViewInit():void
    {
        setTimeout(() => {
            if(this._wordlist)
            {
                //this.setRadioButtons(this._wordlist.Is_public);
                this.isPublic = this._wordlist.Is_public;                
            }
            else
            {
                //this.setRadioButtons(this._defaultIsPublicValue);
                this.isPublic = this._defaultIsPublicValue;                
            }
            this.radioBtnValue = this.isPublic ? 'true' : 'false';
        }, 0);
    }

    public init(wordlist:Wordlist, wordlistName:string, defaultIsPublicValue:boolean = true):void
    {
        this._wordlist = wordlist;
        this._defaultIsPublicValue = defaultIsPublicValue;
        this._title = UberApplication.GetInstance().GetUiTextByKey("LIST_VISIBILITY_DIALOG_TITLE").replace("{0}", wordlistName);
    }

    public setRadioButtons(isPublic:boolean):void
	{
	    //this.privateRadioBtn.nativeElement.checked = !isPublic;
		//this.publicRadioBtn.nativeElement.checked =  isPublic;

        this.isPublic = isPublic;
        this.radioBtnValue = isPublic ? 'true' : 'false';
	}

    public okButton_Click():void
    {
        if(this._wordlist)
        {
            if(this._wordlist.Is_public != this.isPublic)
            {
                this._wordlist.Is_public = this.isPublic;
                this._wordlist.Can_edit = !this.isPublic;

                UberReaderLoadingMessage.GetInstance().Show("Updating Wordlist.");						
				UberApplication.GetInstance().UpdateWordlist(this._wordlist, this.updateWordlistSuccess, this.updateWordlistFailed);
            }
        }
        else
        {
            //this.dispatchEvent(new WordlistVisibilityEvent(WordlistVisibilityEvent.WORDLIST_VISIBILITY_CHANGED, this.isPublic));            
            if (this.wordlistVisibilityChanged) {                
                this.wordlistVisibilityChanged(new WordlistVisibilityEvent(WordlistVisibilityEvent.WORDLIST_VISIBILITY_CHANGED, this.isPublic));
            }
			this.closeDialog();
        }
    }

    private updateWordlistSuccess = (event:UberApplicationEvent) =>
	{
		event.target.removeEventListener(UberApplicationEventTypes.WORDLIST_UPDATE_SUCCESS, this.updateWordlistSuccess);
		event.target.removeEventListener(UberApplicationEventTypes.WORDLIST_UPDATE_FAILED, this.updateWordlistFailed);
		
		UberReaderLoadingMessage.GetInstance().Hide();
		//this.dispatchEvent(new WordlistVisibilityEvent(WordlistVisibilityEvent.WORDLIST_VISIBILITY_CHANGED, this.isPublic));
        if (this.wordlistVisibilityChanged) {
            this.wordlistVisibilityChanged(new WordlistVisibilityEvent(WordlistVisibilityEvent.WORDLIST_VISIBILITY_CHANGED, this.isPublic));
        }
		this.closeDialog(); //this.dispatchEvent(new ClosePopUpEvent(ClosePopUpEvent.CLOSE, ClosePopUpEvent.OK));
	}
	
	private updateWordlistFailed = (event:UberApplicationEvent) =>
	{
		event.target.removeEventListener(UberApplicationEventTypes.WORDLIST_UPDATE_SUCCESS, this.updateWordlistSuccess);
		event.target.removeEventListener(UberApplicationEventTypes.WORDLIST_UPDATE_FAILED, this.updateWordlistFailed);
		
		UberReaderLoadingMessage.GetInstance().Hide();
		//AlertDialog.show(UberApplication.GetInstance().GetUiTextByKey("ERR_UPDATING_WORDLIST"), UberApplication.GetInstance().GetUiTextByKey("ERR_UPDATING_WORDLIST_TITLE"), true);
        UberApplication.GetInstance().showMdlAlertDialog(UberApplication.GetInstance().GetUiTextByKey("ERR_UPDATING_WORDLIST"), UberApplication.GetInstance().GetUiTextByKey("ERR_UPDATING_WORDLIST_TITLE"), true);
	}

    public rbGroup_itemClickHandler(val:boolean):void
    {        
        this.isPublic = val;        
    }

    public dispose():void{}
}