import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ParentDialog } from 'app/UberReaderClient/UberReaderComponents/Dialogs/ParentDialog';
import { UberApplication } from 'app/UberReaderData/UberApplication';
import { AppSettings } from 'app/UberReaderData/AppSettings';
import { StringUtils } from 'app/UberReaderData/Utils/StringUtils';
import { UberReaderLoadingMessage } from 'app/UberReaderClient/UberReaderComponents/Dialogs/UberReaderLoadingMessage';
import { UberReaderTextEvent } from 'app/UberReaderData/Events/UberReaderTextEvent';
import { Text } from 'app/UberReaderData/DataClasses/db/Text';
import { TextUtil } from 'app/UberReaderData/Utils/TextUtil';

@Component({
    selector: 'add-new-text-dialog',
    styleUrls: ['./add-new-text-dialog.component.css'],
    template: `
        <h3 class="mdl-typography--headline mdl-color-text--grey-800 dialog-headline">{{dialogTitle}}</h3>
        <button class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
            <mdl-icon>close</mdl-icon>   
        </button>
        <div class="mdl-dialog__content">
            <mdl-textfield label="Title" [(ngModel)]="textTitle" (keypress)="validateEntries()" floating-label></mdl-textfield>
            <mdl-textfield class="textArea" label="Add Text Here" [(ngModel)]="content" rows="3" maxrows="3" (keydown)="validateEntries()"></mdl-textfield>
        </div>
        <div class="mdl-dialog__actions">
            <!--button mdl-button class="button--primary login-button" mdl-button-type="raised" mdl-ripple [disabled]="textTitle.length == 0 || content.length == 0" (click)="save()">Save</button>
            <button [class.hide]="!openFromTest" mdl-button class="button--primary login-button" mdl-button-type="raised" mdl-ripple [disabled]="textTitle.length == 0 || content.length == 0" (click)="saveAndUse()">{{ saveAnd_action }}</button>
            <button mdl-button class="close" mdl-button-type="raised" mdl-ripple (click)="closeDialog()">Cancel</button-->

            <button mat-raised-button class="button--primary login-button"  [disabled]="textTitle.length == 0 || content.length == 0" (click)="save()">Save</button>
            <button [class.hide]="!openFromTest" mat-raised-button  class="button--primary login-button" [disabled]="textTitle.length == 0 || content.length == 0" (click)="saveAndUse()">{{ saveAnd_action }}</button>
            <button mat-raised-button  class="button--mat-secondary close"  (click)="closeDialog()">Cancel</button>
        </div>
    `
})
export class AddNewTextDialog extends ParentDialog {
    private model:UberApplication;
    private textObject:Text;
    private setAsCurrentText:boolean = false;
    private addOptionUsed: string;

    public dialogTitle:string = "";
    public textTitle:string = "";
    public author:string = "";
    public genre:string = "";
    public content:string = "";
    public saveAnd_action:string = "";
    public entryInvalid:boolean = true;
    public openFromTest: boolean = false;

    constructor(public dialogRef: MatDialogRef<AddNewTextDialog>,
            @Inject(MAT_DIALOG_DATA) data: any) {
        super(dialogRef);
        this.model = UberApplication.GetInstance();
        //this.visible = true;
        this.openFromTest = data.openFromTest != null ? data.openFromTest : false;
        this.addOptionUsed = data.addOption;
        this.Init(data.text);        
    }

    public Init( textObject: Text = null ):void {
        this.textObject = textObject == null ? new Text() : textObject;
        this.dialogTitle = this.model.GetUiTextByKey("ADD_TEXT_TO_LIBRARY_DIALOG_TITLE");
        this.saveAnd_action = this.openFromTest ? "Save and Use" : "Save and " + AppSettings.textAction;        

        if(textObject) {
            this.textTitle = textObject.Title;
            this.author = textObject.Author;					
            this.genre = textObject.Genre;
            this.content = textObject.Content;
        }
    }
    
    public validateEntries():void {
        let valid:number = 0;
        
        //title
        if(StringUtils.TrimString(this.textTitle).length > 0)
            valid++;

        //content
        if(StringUtils.TrimString(this.content).length > 0)
            valid++;
        
        let isValid = valid == 2;
        this.entryInvalid = !isValid;
    }  

    private isValid():boolean {
        let errorMessage:string = "";
        let valid:boolean = true;
        console.log(this.textTitle + " " + this.author + " " + this.genre);

        if (this.textTitle == null || StringUtils.TrimString(this.textTitle).length == 0) {
            valid = false;
            errorMessage = this.model.GetUiTextByKey("ERR_EMPTY_TEXT_TITLE_MESSAGE");
        }
        
        if ( this.content == null || StringUtils.TrimString(this.content).length == 0 ) {
            valid = false;
            errorMessage += "\n" + this.model.GetUiTextByKey("ERR_EMPTY_TEXT_CONTENT_MESSAGE");
        }

        if (!valid) {
            //AlertDialog.show(errorMessage,this.model.GetUiTextByKey("ERR_EMPTY_TEXT_TITLE"), true);
            this.model.showMdlAlertDialog(errorMessage,this.model.GetUiTextByKey("ERR_EMPTY_TEXT_TITLE"), true);
        }
        
        return valid;
    }

    public saveAndUse():void {
        if( this.isValid() ) 
            this.setAsCurrentText = true;
        else 
            return;
        this.save();
    }

    public save():void {
        if( this.isValid() ) {            
            this.textObject.Title = this.textTitle;
            this.textObject.Author = this.author.substring(0, 99);
            this.textObject._Date = new Date();
            this.textObject.Genre = this.genre;
            this.textObject.Content = this.content;
            this.textObject.Reading_level = TextUtil.FogIndexToReadingLevel(TextUtil.CalculateReadability(this.content));
            this.textObject.User_id = this.model.CurrentUser.User_id;
            this.textObject.Product_id = this.model.CurrentProduct.ProductId;

            UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_ADDING_NEW_TEXT"));
            this.model.AddText(this.textObject, this.insertTextSuccess, this.insertTextFailed);
        }			
    }

    private insertTextSuccess = (event:UberReaderTextEvent) => {
        event.target.removeEventListener(UberReaderTextEvent.TEXT_INSERTED, this.insertTextSuccess);
        event.target.removeEventListener(UberReaderTextEvent.TEXT_INSERT_ERROR, this.insertTextFailed);

        if (this.setAsCurrentText && !this.openFromTest) {
            this.model.CurrentUserData.CurrentText = event._Text;
        }
        
        //this.dispatchEvent(new UberReaderTextEvent(UberReaderTextEvent.TEXT_SELECTED, event._Text, "", this.setAsCurrentText));	
        //this.close();
        this.closeDialog({
            text: event._Text,
            isCurrentText: this.setAsCurrentText
        });
    }
    
    private insertTextFailed = (event:UberReaderTextEvent) => {
        event.target.removeEventListener(UberReaderTextEvent.TEXT_INSERTED, this.insertTextSuccess);
        event.target.removeEventListener(UberReaderTextEvent.TEXT_INSERT_ERROR, this.insertTextFailed);
        this.setAsCurrentText = false;        
        UberReaderLoadingMessage.GetInstance().Hide();
        //AlertDialog.show(event.ErrorMessage, "", true);
        this.model.showMdlAlertDialog(event.ErrorMessage, "");
    }		

    public dispose():void {}
}