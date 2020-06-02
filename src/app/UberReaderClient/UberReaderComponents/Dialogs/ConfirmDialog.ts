import { Component, Inject } from '@angular/core';
import { IMdlDialogAction } from '@angular-mdl/core';
import { UberApplicationEvent } from '../../../UberReaderData/Events/UberApplicationEvent';
import { ClosePopUpEvent } from '../../../UberReaderData/Events/ClosePopUpEvent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ParentDialog } from './ParentDialog';

export class DialogType {
    public static DIALOG_TYPE_ALERT:number = 0;
    public static DIALOG_TYPE_CONFIRM:number = 1;
    public static DIALOG_TYPE_CHOICES:number = 2;
    public static DIALOG_TYPE_BLOCKING:number = 3;
}

@Component({
    selector: 'confirm-dialog',
    styleUrls: ['./ConfirmDialog.css'],
    template: `
        <div id="confirmDialog" class="alert">          
            <h3 class="mdl-typography--headline mdl-color-text--grey-800 dialog-headline">{{ _title }}</h3>
            <button [class.hide]="hideCloseBtn || dialogType == blockingDialogType" class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
                <mdl-icon>close</mdl-icon>
            </button>

            <div class="mdl-dialog__content">
                <mdl-icon *ngIf="isError" class="alert-icon">sentiment_very_dissatisfied</mdl-icon>                    
                <div id="messageContainer">
                    <p class="mdl-color-text--grey-800 p-margins" [innerHTML]="message"></p>
                </div>
            </div>

             <div class="mdl-dialog__actions" [class.hide]="dialogType == blockingDialogType">
                <!--button *ngFor="let action of actions" mdl-button class="green-button login-button" (click)="action.handler(); closeDialog()" mdl-button-type="raised" mdl-ripple>{{ action.text }}</button>
                <button *ngIf="dialogType != choicesDialogType" mdl-button class="green-button login-button" (click)="okButton_clickHandler()" mdl-button-type="raised" mdl-ripple>{{ _confirmText }}</button>
                <button *ngIf="dialogType != alertDialogType" mdl-button class="close" (click)="cancelButton_clickHandler()" mdl-button-type="raised" mdl-ripple>{{ _declineText }}</button-->

                <button mat-raised-button class="button--primary login-button" *ngFor="let action of actions"  (click)="action.handler(); closeDialog()">
                {{ action.text }}
                </button>
                <button mat-raised-button class="button--primary login-button" *ngIf="dialogType != choicesDialogType" (click)="okButton_clickHandler()">
                {{ _confirmText }}
                </button>
                <button mat-raised-button class="button--mat-secondary" *ngIf="dialogType != alertDialogType"  (click)="cancelButton_clickHandler()">
                {{ _declineText }}
                </button>
            </div>     
        </div>
    `
})


export class ConfirmDialog extends ParentDialog
{    
    public message:string = "";
    public closeHandler:(event: UberApplicationEvent) => void;
    public params:any;
    public isError:boolean = false;
    public actions: [IMdlDialogAction];
    public hideCloseBtn: boolean = false;
    
    public alertDialogType:number = DialogType.DIALOG_TYPE_ALERT;
    public confirmDialogType:number = DialogType.DIALOG_TYPE_CONFIRM;
    public choicesDialogType:number = DialogType.DIALOG_TYPE_CHOICES;
    public blockingDialogType: number = DialogType.DIALOG_TYPE_BLOCKING;
    public dialogType:number;

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialog>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        super(dialogRef);

        this.dialogType = data.dialogType;
        this._title = data.title;
        this.message = data.message;
        this.closeHandler = data.closeHandler;
        this.params = data.params;
        this.actions = data.actions;
        
        if (data.declineText) {
            this._declineText = data.declineText;
        }

        if (data.confirmText) {
            this._confirmText = data.confirmText;
        }

        if (data.isError) {
            this.isError = data.isError;
        }

        if (data.hideCloseBtn) {
            this.hideCloseBtn = data.hideCloseBtn;
        }
    }

    ngAfterViewInit() {
        document.getElementById("confirmDialog").focus();
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }

    public okButton_clickHandler() {       
        this.closeDialog(ClosePopUpEvent.OK);
    }

    public cancelButton_clickHandler() {
        this.closeDialog(ClosePopUpEvent.CANCEL);
    }

    public closeDialog(action: string = ClosePopUpEvent.CLOSE) {        
        if (this.closeHandler) {
            this.closeHandler(new ClosePopUpEvent(ClosePopUpEvent.CLOSE, action, this.params));
        }
        super.closeDialog(action);
    }    
}