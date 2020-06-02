import { Component, ViewChild, Input, Inject } from '@angular/core';
import { UberReaderLoadingMessage } from './UberReaderLoadingMessage';
import { PasswordChange } from '../Controls/PasswordChange';
import { DataStorageManager } from '../../DataStorageManager';
import { User } from '../../../UberReaderData/DataClasses/db/User';
import { UberApplication } from '../../../UberReaderData/UberApplication';
import { UserAuthenticatedEvent } from '../../../UberReaderData/Events/UserAuthenticatedEvent';
import { ClosePopUpEvent } from '../../../UberReaderData/Events/ClosePopUpEvent';
import { ParentDialog } from './ParentDialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UberDataAccessRemoteService } from 'app/UberReaderData/UberDataAccess/uber-data-access-remote.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UberReaderMd5 } from 'app/UberReaderData/Utils/UberReaderMd5';

@Component({
    selector: 'password-change-dialog',
	styleUrls: ['./PasswordChangeDialog.css'],
    template:`
		<div class="{{ showLoading ? 'disableDialogOverlay' : 'hide' }}">
			<mdl-progress [indeterminate]="true"></mdl-progress>
			<div class="disableDialog"></div>
		</div>

		<div class="mdl-grid login-form-grid">
			<div class="mdl-cell mdl-cell--12-col login-form-cell">
				<h3 class="mdl-typography--headline mdl-color-text--grey-800 login-headline">Change Password</h3>
				<!--<button class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
					<mdl-icon>close</mdl-icon>   
				</button>-->

				<p>You now need to update your password. Please enter a new password below.</p>
				<password-change-control #passwordChangeControl (submit)="okButton_Click()"></password-change-control>
			</div> 
		</div>        
		<div class="mdl-dialog__actions">
			<button mdl-button class="green-button login-button" (click)="okButton_Click()" mdl-button-type="raised" mdl-ripple [disabled]="!ready">Update Password</button>                
		</div>
<!--
        <div class="alertDialogOverlay">
            <div class="changePasswordDialogContainer">
                <div class="alertTitleContainer">
                    <label>Change Password</label>
                </div>
				<div id="contentDiv">
				  <label>You now need to update your password. Please enter a new password below.</label>
				
				<br/><br/>
                <password-change-control #passwordChangeControl (submit)="okButton_Click()"></password-change-control>
				<div #buttonGroup id="buttonGroupDiv1">
                <div class="col"><button #okButton (click)="okButton_Click()" class="GreenBtnW175" [disabled]="!ready">Update Password</button></div>
				</div>
            	</div>
            </div>
    
    	</div>
-->
    `
})

export class PasswordChangeDialog extends ParentDialog
{
    @ViewChild('passwordChangeControl', { static: true }) passwordChangeControl:PasswordChange;
    
	public ready:boolean = false;
	public showLoading:boolean = false;

    private _model:UberApplication = UberApplication.GetInstance();
	private closeCallback: () => void;

	constructor(
		public dialog: MatDialogRef<PasswordChangeDialog>,
		@Inject(MAT_DIALOG_DATA) private dialogData: any,
		private ar: UberDataAccessRemoteService
	) {
		super(dialog);
		if (dialogData.closeCallback) {
			this.closeCallback = dialogData.closeCallback;
		}		
	}

	ngAfterViewInit() {
		this.init(this.dialogData.user);
	}

	public init(user:User):void
	{
		this.passwordChangeControl.Init(user);
		this.passwordChangeControl.addEventListener(UserAuthenticatedEvent.VALID_USER, this.validateUser);
		this.passwordChangeControl.addEventListener(UserAuthenticatedEvent.INVALID_USER, this.validateUser);
	}

	private validateUser = (event:UserAuthenticatedEvent) =>
	{
		this.ready = event.type == UserAuthenticatedEvent.VALID_USER;
	}

    public okButton_Click():void
    {
        let errors:string[] = this.passwordChangeControl.CheckIfValidAndAssignValues();
		if (errors.length == 0)
		{
		    UberReaderLoadingMessage.GetInstance().Show(this._model.GetUiTextByKey("STAT_UPDATING_PASSWORD"));
			this.showLoading = true;
			let password = this.passwordChangeControl.GetUser().Password;
			this.UpdateUserTempPassword(password).subscribe((user: User) => {				
				DataStorageManager.GetInstance().UpdateDefaultLogin(user.Email, password);
				this.userUpdated(user);
			})
    		//this._model.UpdateUserDetails(this.passwordChangeControl.GetUser(), this.userUpdated, this.userUpdateError);
		}
		else
		{
		    var errorText:string = this._model.GetUiTextByKey("ERR_EDIT_USER_DEFAULT_MESSAGE") + "\n";
			for (let errorString of errors)
			{
			    errorText += "<br/>" + errorString;
			}

			//AlertDialog.show(errorText, this._model.GetUiTextByKey("ERR_EDIT_USER_DEFAULT_TITLE"),true);
			this._model.showMdlAlertDialog(errorText, this._model.GetUiTextByKey("ERR_EDIT_USER_DEFAULT_TITLE"), true);
		}
	}
	
	private UpdateUserTempPassword(password: string): Observable<User> {
        return this.ar.post$("UpdateUserTempPassword", [password], true).pipe(
            map(responseJSONObject => {
				let user: User = User.fromJson(responseJSONObject.result);
                return user;
            }),
            take(1)
        );
    }  


    private userUpdated(user: User): void {
	    //event.target.removeEventListener(UserAuthenticatedEvent.USER_UPDATED, this.userUpdated);
		//event.target.removeEventListener(UserAuthenticatedEvent.USER_UPDATE_FAILED, this.userUpdateError);				
		//UberReaderLoadingMessage.GetInstance().Hide();		
		this.showLoading = false;		
		//DataStorageManager.GetInstance().RemoveDefaultLogin(false);		
				
		if (user.User_id == this._model.CurrentUser.User_id) {
		    this._model.CurrentUser = user;
		}
							
		this.dispatchEvent(new ClosePopUpEvent(ClosePopUpEvent.CLOSE));
		if (this.closeCallback) {
			this.closeCallback();
		}
        //super.close();
        //super.destroy();
		this.closeDialog();
	}
			
	/*private userUpdateError = (event:UserAuthenticatedEvent) =>
	{
	    event.target.removeEventListener(UserAuthenticatedEvent.USER_UPDATED, this.userUpdated);
		event.target.removeEventListener(UserAuthenticatedEvent.USER_UPDATE_FAILED, this.userUpdateError);
				
		UberReaderLoadingMessage.GetInstance().Hide();
		this.showLoading = false;
		//AlertDialog.show(event.ErrorMessage, this._model.GetUiTextByKey("ERR_UPDATE_EDIT_USER_TITLE"), true);
		this._model.showMdlAlertDialog(event.ErrorMessage, this._model.GetUiTextByKey("ERR_UPDATE_EDIT_USER_TITLE"), true);
	}*/

    public dispose()
    {
		this.removeAllListeners();
    }
}