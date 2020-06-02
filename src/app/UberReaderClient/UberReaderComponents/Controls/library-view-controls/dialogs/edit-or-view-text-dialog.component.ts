import { Component, Inject } from '@angular/core';
import { Text } from '../../../../../UberReaderData/DataClasses/db/Text';
import { StringUtils } from '../../../../../UberReaderData/Utils/StringUtils';
import { UberReaderLoadingMessage } from '../../../Dialogs/UberReaderLoadingMessage';
import { TextUtil } from '../../../../../UberReaderData/Utils/TextUtil';
import { UberApplicationEvent } from '../../../../../UberReaderData/Events/UberApplicationEvent';
import { UberApplicationEventTypes } from '../../../../../UberReaderData/Events/UberApplicationEventTypes';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { ParentDialog } from 'app/UberReaderClient/UberReaderComponents/Dialogs/ParentDialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'edit-or-view-text-dialog',
    styleUrls: ['./edit-or-view-text-dialog.component.css'],
    template: `   
       
                <h3 class="mdl-typography--headline mdl-color-text--grey-800 dialog-headline">{{dialogTitle}}</h3>
                <button class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
                    <mdl-icon>close</mdl-icon>   
                </button>
                <!--<div>
                    <div class="firstInput">
                        <div class="formItemLabel">Title</div>
                        <div class="formItemInput"><input type="text" [(ngModel)]="textTitle" [readonly]="titleInputReadOnly"></div>
                    </div>
                    <div class="middleInput">
                        <div class="formItemLabel">Author</div>
                        <div class="formItemInput"><input type="text" [(ngModel)]="author" [readonly]="readonly"></div>
                    </div>
                    <div class="lastInput">
                        <div class="formItemLabel">Genre</div>
                        <div class="formItemInput"><input type="text" [(ngModel)]="genre" [readonly]="readonly"></div>
                    </div>
                </div>-->
               <div class="mdl-dialog__content" > 
                <mdl-textfield label="Title" [(ngModel)]="textTitle" floating-label [readonly]="titleInputReadOnly" [disabled]="titleInputReadOnly"></mdl-textfield>
                <mdl-textfield label="Author" [(ngModel)]="author" floating-label [readonly]="readonly" [disabled]="readonly"></mdl-textfield>
                <mdl-textfield label="Genre" [(ngModel)]="genre" floating-label [readonly]="readonly" [disabled]="readonly"></mdl-textfield>
                <mdl-textfield [readonly]="readonly" [disabled]="readonly" [(ngModel)]="content" rows="3" maxrows="3"></mdl-textfield>
                <!--<textarea #textArea [(ngModel)]="content" [readonly]="readonly" style="resize:none;">{{ content }}</textarea>-->
            </div> 
            
        <div class="mdl-dialog__actions" *ngIf="!readonly">
            <!--button mdl-button class="button--primary login-button" mdl-button-type="raised" mdl-ripple (click)="save()">Save</button-->
            <button mat-raised-button class="button--primary login-button" mdl-button-type="raised" mdl-ripple (click)="save()">Save</button>
        </div>

        <!--
        <div *ngIf="visible" class="alertDialogOverlay">
            <div class="dialogMainContainer">   
                <div class="alertTitleContainer">
                    <label>{{dialogTitle}}</label>
                    <button (click)="close()" class="closeBtn"></button>
                </div>
                <div class="dialogContentDiv">
                    <div>
                        <div class="firstInput">
                            <div class="formItemLabel">Title</div>
                            <div class="formItemInput"><input type="text" [(ngModel)]="textTitle" [readonly]="titleInputReadOnly"></div>
                        </div>
                        <div class="middleInput">
                            <div class="formItemLabel">Author</div>
                            <div class="formItemInput"><input type="text" [(ngModel)]="author" [readonly]="readonly"></div>
                        </div>
                        <div class="lastInput">
                            <div class="formItemLabel">Genre</div>
                            <div class="formItemInput"><input type="text" [(ngModel)]="genre" [readonly]="readonly"></div>
                        </div>
                    </div>
                    <textarea #textArea [(ngModel)]="content" [readonly]="readonly" style="resize:none;">{{ content }}</textarea>
                    <div class="buttonContainer" *ngIf="!readonly">
                        <button #okButton (click)="save()" class="defaultBtnStyle">Save</button>
                        
                    </div>
                </div>
            </div>
        </div>-->
    `
})
export class EditOrViewTextDialog extends ParentDialog {
    private model:UberApplication;
    private textObject:Text;
    private forceViewType: string = "";

    public readonly:boolean = false;
    public titleInputReadOnly:boolean = false;
    public dialogTitle:string = "";
    public textTitle:string = "";
    public author:string = "";
    public genre:string = "";
    public content:string = "";

    constructor(public dialogRef: MatDialogRef<EditOrViewTextDialog>,
            @Inject(MAT_DIALOG_DATA) data: any) {
                
        super(dialogRef);
        this.model = UberApplication.GetInstance();
        //this.visible = true;
        this.forceViewType = data.type;
        this.Init(data.text);
    }

    public Init( textObject:Text ):void {
        this.textObject = textObject;
        this.readonly = textObject.User_id == null && !textObject.Can_edit;
        this.textTitle = textObject.Title;
        this.author = textObject.Author;					
        this.genre = textObject.Genre;
        this.content = textObject.Content;			
        
        if (this.readonly || this.forceViewType == "view") {
            if(this.model.CurrentProduct.DoPreprocessing) 
                this.dialogTitle = this.model.GetUiTextByKey("VIEW_TEXT_DIALOG_TITLE");
            else if(this.model.CurrentProduct.DisplayText)
                this.dialogTitle = "View Exercise"; //this.model.GetUiTextByKey("VIEW_EXERCISE_DIALOG_TITLE");
            this.titleInputReadOnly = true;
            this.readonly = true;
        }
        else {
            if(this.model.CurrentProduct.DoPreprocessing)    
                this.dialogTitle = this.model.GetUiTextByKey("EDIT_TEXT_DIALOG_TITLE");
            else if(this.model.CurrentProduct.DisplayText)
                this.dialogTitle = "Edit Exercise"; //this.model.GetUiTextByKey("EDIT_EXERCISE_DIALOG_TITLE");
            this.titleInputReadOnly = textObject.User_id != this.model.CurrentUser.User_id;
        }
    }

    private isValid():boolean {
        let errorMessage:string = "";
        let valid:boolean = true;
        console.log(this.textTitle + " " + this.author + " " + this.genre);

        if (this.textTitle == null || StringUtils.TrimString(this.textTitle).length == 0) {
            valid = false;
            errorMessage = this.model.GetUiTextByKey("ERR_EMPTY_TEXT_TITLE_MESSAGE") + ". ";
        }
        
        if ( this.content == null || StringUtils.TrimString(this.content).length == 0 ) {
            valid = false;
            errorMessage += "\n" + this.model.GetUiTextByKey("ERR_EMPTY_TEXT_CONTENT_MESSAGE") + ". ";
        }
        
        /* GENRE is now not required
        if (StringUtils.TrimString(this.genre).length == 0) {
            errorMessage += "\n" + this.model.GetUiTextByKey("ERR_EMPTY_TEXT_GENRE_MESSAGE") + ". ";
            valid = false;
        }*/
        
        if (!valid) {
            //AlertDialog.show(errorMessage,this.model.GetUiTextByKey("ERR_EMPTY_TEXT_TITLE"), true);
            this.model.showMdlAlertDialog(errorMessage, this.model.GetUiTextByKey("ERR_EMPTY_TEXT_TITLE"));
        }
        
        return valid;
    }

    public save():void {
        if( this.isValid() ) {
            let isUpdated:boolean = false;
            if(this.textObject.Content != this.content) {
                this.textObject.Content = this.content;
                isUpdated = true;
            }
            
            this.textObject.Title = this.textTitle;
            this.textObject.Author = this.author;
            this.textObject.Genre = this.genre;
            this.textObject.Reading_level = TextUtil.FogIndexToReadingLevel(TextUtil.CalculateReadability(this.content));			
            
            UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_UPDATING_TEXT"));
            this.model.UpdateText(this.textObject, isUpdated, this.updateSuccess, this.updateFailed);
        }			
    }

    private updateSuccess = (event:UberApplicationEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.TEXT_UPDATE_SUCCESS, this.updateSuccess);
        event.target.removeEventListener(UberApplicationEventTypes.TEXT_UPDATE_FAILED, this.updateFailed);
        UberReaderLoadingMessage.GetInstance().Hide();
        //this.dispatchEvent(new TextControlEvent(TextControlEvent.EDIT_TEXT, this.textObject));
        //this.close();
        this.closeDialog(this.textObject);
    }
    
    private updateFailed = (event:UberApplicationEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.TEXT_UPDATE_SUCCESS, this.updateSuccess);
        event.target.removeEventListener(UberApplicationEventTypes.TEXT_UPDATE_FAILED, this.updateFailed);        
        UberReaderLoadingMessage.GetInstance().Hide();
        //AlertDialog.show(this.model.GetUiTextByKey("ERR_UPDATING_TEXT_MESSAGE"), this.model.GetUiTextByKey("ERR_UPDATING_TEXT_TITLE"), true);
        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("ERR_UPDATING_TEXT_MESSAGE"), this.model.GetUiTextByKey("ERR_EMPTY_TEXT_TITLE"));
    }		

    public dispose():void {}
}