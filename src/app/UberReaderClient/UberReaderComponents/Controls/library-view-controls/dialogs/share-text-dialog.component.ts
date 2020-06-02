import { Component, OnInit, Inject } from '@angular/core';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { Group } from '../../../../../UberReaderData/DataClasses/db/Group';
import { UberReaderLoadingMessage } from '../../../Dialogs/UberReaderLoadingMessage';
import { SharedObjectEvent } from '../../../../../UberReaderData/Events/SharedObjectEvent';
import { UberApplicationEventTypes } from '../../../../../UberReaderData/Events/UberApplicationEventTypes';
import { UberApplicationEvent } from '../../../../../UberReaderData/Events/UberApplicationEvent';
import { StringUtils } from '../../../../../UberReaderData/Utils/StringUtils';
import { TextShareSettingsEvent } from '../../../../../UberReaderData/Events/TextShareSettingsEvent';
import { ClosePopUpEvent } from '../../../../../UberReaderData/Events/ClosePopUpEvent';
import { Group_Shared_Object } from '../../../../../UberReaderData/DataClasses/other/Group_Shared_Object';
import { User_Shared_Object } from '../../../../../UberReaderData/DataClasses/other/User_Shared_Object';
import { ProxyText } from '../../../../../UberReaderData/DataClasses/other/ProxyText';
import { ParentDialog } from 'app/UberReaderClient/UberReaderComponents/Dialogs/ParentDialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'share-text-dialog',
    styleUrls: ['./share-text-dialog.component.css'],
    template: `
        
                <h3 class="mdl-typography--headline mdl-color-text--grey-800 dialog-headline">{{dialogTitle}}</h3>
                <button class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
                    <mdl-icon>close</mdl-icon>   
                </button>
             <div class="mdl-dialog__content" > 
                <div id="upperContainer">
                    <div id="usersTextAreaDiv">
                        Enter users to share with<br>
                        <mdl-textfield [label]="usersTextAreaDefaultText" [(ngModel)]="usersListed" rows="3" maxrows="3"></mdl-textfield>
                        <!--<textarea #textArea [(ngModel)]="usersListed"  style="resize:none;" [placeholder]="usersTextAreaDefaultText"></textarea>-->
                    </div>
                    <button mdl-button #optionsBtn="mdlButton" (click)="optionsMenu.toggle($event, optionsBtn)" class="button--dropdown">
                        <h4 class="mdl-color-text--grey-600  dropdown--label-sm">{{permissionSelected}}
                        <mdl-icon class="dropdown--item-icon">arrow_drop_down</mdl-icon></h4>
                    </button>
                    <mdl-menu #optionsMenu="mdlMenu" mdl-menu-position="bottom-left">
                        <mdl-menu-item *ngFor="let option of permissionOptions" (click)="permissionSelectionChanged(option)">{{ option.label }}</mdl-menu-item>
                    </mdl-menu>
                </div>
                <!--button mdl-button class="button--primary login-button" mdl-button-type="raised" mdl-ripple (click)="share()">Share</button-->
                <button mat-raised-button class="button--primary login-button"  (click)="share()">Share</button>
                <div id="sharedWithDivWrapper">
                    Shared with<br>
                    <div id="sharedWithDiv">
                        <div class="sharedWithItem" *ngFor="let user of usersAndGroupsSharedWith">
                            <label id="userNameLabel" class="sharedWithItemElement">{{ user.Name }}</label>
                            <div class="shareOptions">
                                <div class="sharedWithItemElement">
                                    <button mdl-button #optionsBtn2="mdlButton" (click)="optionsMenu2.toggle($event, optionsBtn2)" class="button--dropdown">
                                       <h4 class="mdl-color-text--grey-600  dropdown--label-sm"> {{ user.Can_edit? 'Can edit':'Can view'}}
                                        <mdl-icon class="dropdown--item-icon">arrow_drop_down</mdl-icon></h4>
                                    </button>
                                    <mdl-menu #optionsMenu2="mdlMenu" mdl-menu-position="bottom-left">
                                        <mdl-menu-item (click)="updateSharedObjectPermissions(true, user)">Can Edit</mdl-menu-item>
                                        <mdl-menu-item (click)="updateSharedObjectPermissions(false, user)">Can View</mdl-menu-item>
                                        <!--<mdl-menu-item *ngFor="let option of permissionOptions" (click)="updateSharedObjectPermissions(option, user)">{{ option.label }}</mdl-menu-item>-->
                                    </mdl-menu>
                                </div>
                                <button class="sharedWithItemElement deleteSharedWithBtn" (click)="deleteSharedObject(user)" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
                                    <mdl-icon>close</mdl-icon>   
                                </button>
                                <!--<button (click)="deleteSharedObject(user)" class="sharedWithItemElement">X</button>-->
                            </div>
                        </div>
                    </div>
                </div>
       </div>
        
        <!--
        <div *ngIf="visible" class="alertDialogOverlay">
            <div class="dialogMainContainer">   
                <div class="alertTitleContainer">
                    <label>{{dialogTitle}}</label>
                    <button (click)="close()" class="closeBtn"></button>
                </div>
                <div class="dialogContentDiv">
                    <div id="upperContainer">
                        <div id="usersTextAreaDiv">
                            Enter users to share with<br>
                            <textarea #textArea [(ngModel)]="usersListed"  style="resize:none;" [placeholder]="usersTextAreaDefaultText"></textarea>
                        </div>
                        <drop-down-list [dataList]="permissionOptions" [multiSelect]="false" 
                                    (selectionChanged)="permissionSelectionChanged($event)" [label]="permissionSelected" labelField="label">
                        </drop-down-list>
                    </div>
                    <button (click)="share()" class="defaultBtnStyle">Share</button>                    
                    <div>
                        Shared with<br>
                        <div id="sharedWithDiv">
                            <div class="sharedWithItem" *ngFor="let user of usersAndGroupsSharedWith">
                                <label id="userNameLabel" class="sharedWithItemElement">{{ user.Name }}</label>
                                <div class="shareOptions">
                                    <div class="sharedWithItemElement">
                                        <drop-down-list [dataList]="permissionOptions" [multiSelect]="false" 
                                                    (selectionChanged)="updateSharedObjectPermissions($event, user)" label="{{ user.Can_edit? 'Can edit':'Can view'}}" labelField="label">
                                        </drop-down-list>
                                    </div>
                                    <button (click)="deleteSharedObject(user)" class="sharedWithItemElement">X</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>-->
    `
})
export class ShareTextDialog extends ParentDialog implements OnInit {
    private model:UberApplication;
    private textToShare:ProxyText;
    private usersSharedWith:any[] = [];
    private groupsSharedWith:any[]= [];
    private groupsAvailableToShareWith:Group[] = [];
    private isOpened:boolean = false;
    private canShare:boolean = true;
    private sharedObjectIdToEdit:number;

    public dialogTitle:string = "";
    public usersTextAreaDefaultText:string = "";
    public usersListed:string = "";
    public usersAndGroupsSharedWith:any[] = [];
    public permissionSelected:string = "Can edit";
    public permissionOptions:any[] = [
        {value: true, label: "Can edit"}, 
        {value: false, label: "Can view"}
    ];

    constructor(public dialogRef: MatDialogRef<ShareTextDialog>,
                @Inject(MAT_DIALOG_DATA) shareObject: any) {

        super(dialogRef);
        this.model = UberApplication.GetInstance();
        //this.visible = true;
        this.initByText(shareObject.textToShare, shareObject.usersShared, shareObject.groupsShared, shareObject.groupsCanShareWith);
    }

    ngOnInit() {
        this.usersTextAreaDefaultText = this.model.GetUiTextByKey('PROMPT_ENTER_USER_STRINGS')
    }

    public initByText(text:ProxyText, usersShared:User_Shared_Object[], groupsShared:Group_Shared_Object[], groupsAvalableToShare:Group[], fromDialog:boolean = true):void {
        this.textToShare = text;
        this.usersSharedWith = usersShared;
        this.groupsSharedWith = groupsShared;
        this.groupsAvailableToShareWith = groupsAvalableToShare;
        this.dialogTitle = this.model.GetUiTextByKey("TITLE_SHARE_TEXT_DIALOG").replace("{0}", text.Title);
        this.isOpened = fromDialog; //check if still needed

        this.usersAndGroupsSharedWith = this.usersSharedWith.concat(this.groupsSharedWith);
    }

    public permissionSelectionChanged(selectedItem:any):void {
        this.canShare = selectedItem.value;
        this.permissionSelected = selectedItem.label;
    }

    public updateSharedObjectPermissions(selectedPermission:any, selectedItem:any):void {
        console.log(selectedPermission);
        selectedItem.Can_edit = selectedPermission.value
        this.sharedObjectIdToEdit = selectedItem.Shared_object_id;        
        console.log(selectedItem);
        
        UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_UPDATING_SHARE_SETTINGS"));
        this.model.UpdateObjectShareSettings(this.sharedObjectIdToEdit, this.model.CurrentUser.User_id, selectedItem.Can_edit, this.sharedObjectUpdated, this.sharedObjectUpdateError);
    }

    private sharedObjectUpdated = (event:SharedObjectEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.SHARED_OBJECT_SETTINGS_UPDATED, this.sharedObjectUpdated);
        event.target.removeEventListener(UberApplicationEventTypes.SHARED_OBJECT_SETTINGS_UPDATE_ERROR, this.sharedObjectUpdateError);        
        UberReaderLoadingMessage.GetInstance().Hide();
    }

    private sharedObjectUpdateError = (event:SharedObjectEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.SHARED_OBJECT_SETTINGS_UPDATED, this.sharedObjectUpdated);
        event.target.removeEventListener(UberApplicationEventTypes.SHARED_OBJECT_SETTINGS_UPDATE_ERROR, this.sharedObjectUpdateError);        
        UberReaderLoadingMessage.GetInstance().Hide();
        
        for(let item of this.usersAndGroupsSharedWith) {
            if(item.Shared_object_id == this.sharedObjectIdToEdit) {
                item.Can_edit = !item.Can_edit;
            }
        }
        
        //AlertDialog.show(this.model.GetUiTextByKey("STAT_UPDATE_SHARE_SETTINGS_ERROR"));
        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("STAT_UPDATE_SHARE_SETTINGS_ERROR"));
    }

    public deleteSharedObject(selectedItem:any):void {
        this.sharedObjectIdToEdit = selectedItem.Shared_object_id;
        let shareName:string;
        if (selectedItem instanceof User_Shared_Object) {
            shareName = "user \"" + selectedItem.Name + "\"";
        }
        else if (selectedItem instanceof Group_Shared_Object) {
            shareName = "group \"" + selectedItem.Group_name + "\"";
        }
        
        let errMsg:string;
        let titleMsg:string;
        if(this.model.CurrentProduct.DisplayVocab) {
            titleMsg = this.model.GetUiTextByKey("UNSHARE_WORDLIST_TITLE")
            errMsg = this.model.GetUiTextByKey("UNSHARE_WORDLIST_MESSAGE").replace("{0}", shareName);
        }
        else {
            titleMsg = this.model.GetUiTextByKey("UNSHARE_TEXT_TITLE")
            errMsg = this.model.GetUiTextByKey("UNSHARE_TEXT_MESSAGE").replace("{0}", shareName);
        }
        
        //AlertDialog.show(errMsg, titleMsg, false, 2, this.model.GetUiTextByKey("GEN_YES"), this.model.GetUiTextByKey("GEN_NO"), this.deleteShareAlertHandler);
        this.model.showMdlConfirmDialog(errMsg, titleMsg, this.model.GetUiTextByKey("GEN_NO"), this.model.GetUiTextByKey("GEN_YES"), this.deleteShareAlertHandler);
    }
    
    private deleteShareAlertHandler = (event:ClosePopUpEvent) => {
        if (event.detail == ClosePopUpEvent.OK) {
            UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_UPDATING_SHARE_SETTINGS"));
            this.model.DeleteSharedObject(this.sharedObjectIdToEdit, this.model.CurrentUser.User_id, this.sharedObjectDeleted, this.sharedObjectDeleteError);
        }
    }

    private sharedObjectDeleted = (event:UberApplicationEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.SHARED_OBJECT_DELETED, this.sharedObjectDeleted);
        event.target.removeEventListener(UberApplicationEventTypes.SHARED_OBJECT_DELETE_ERROR, this.sharedObjectDeleteError);
        
        UberReaderLoadingMessage.GetInstance().Hide();
        
        for(let item of this.usersAndGroupsSharedWith) {
            if(item.Shared_object_id == this.sharedObjectIdToEdit) {
                this.usersAndGroupsSharedWith.splice(this.usersAndGroupsSharedWith.indexOf(item),1);
            }
        }	
        //to do refreshGroupSelectionList();
    }

    private sharedObjectDeleteError = (event:UberApplicationEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.SHARED_OBJECT_DELETED, this.sharedObjectDeleted);
        event.target.removeEventListener(UberApplicationEventTypes.SHARED_OBJECT_DELETE_ERROR, this.sharedObjectDeleteError);        
        UberReaderLoadingMessage.GetInstance().Hide();        
        //AlertDialog.show(this.model.GetUiTextByKey("DELETE_SHARED_OBJECT_ERROR_MESSAGE"), this.model.GetUiTextByKey("DELETE_SHARED_OBJECT_ERROR_TITLE"));
        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("DELETE_SHARED_OBJECT_ERROR_MESSAGE"), this.model.GetUiTextByKey("DELETE_SHARED_OBJECT_ERROR_TITLE"));
    }

    public share():void {
        let userStringsArray:string[] = [];
        let groupsIds:number[] = [];
                
        //if(shareControlButtonBar.selectedIndex == 0)//if (usersShareGroup.visible == true)
        //{
            let userStrings:string[] = this.usersListed.split(new RegExp("[\\r\\n\,]+"));
            for (let userString of userStrings) {
                let trimmedUserString:string = StringUtils.TrimString(userString);
                if (trimmedUserString.length > 0) {
                    userStringsArray.push(trimmedUserString);
                }
            }
            //if empty show message
            if (userStringsArray.length == 0) {
                // show allert
                return;
            }
        /*}
        else if(shareControlButtonBar.selectedIndex == 1)//else if (groupShareGroup.visible == true)
        {
            for each (let group:com.er.ur.UberReaderData.db.Group in groupsSelectionList.selectedItems)
            {
                groupsIds.push(group.Group_id);
            }
            //if empty show message
            if (groupsIds.length == 0)
            {
                // show alert
                return;
            }
        }*/
        
        UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_UPDATING_SHARE_SETTINGS"));
        /*
        if(this.model.CurrentProduct.DisplayVocab) {
            this.model.ShareWordlist(_proxyWordlist.Wordlist_id, this.model.CurrentUser.User_id, userStringsVector, groupsIds, canShare, wordlistShared, wordlistShareError, UberReaderLoadingDialog.GetInstance());
        }
        else
        {*/
            this.model.ShareText(this.textToShare.Text_id, this.model.CurrentUser.User_id, userStringsArray, groupsIds, this.canShare, this.textShared, this.textShareError);
        //}		
    }

    private textShared = (event:TextShareSettingsEvent) => {				
        event.target.removeEventListener(TextShareSettingsEvent.TEXT_SHARE_SUCCESS, this.textShared);
        event.target.removeEventListener(TextShareSettingsEvent.TEXT_SHARE_ERROR, this.textShareError);
        
        UberReaderLoadingMessage.GetInstance().Hide();
        
        this.usersSharedWith = event.Users_shared;
        this.groupsSharedWith = event.Groups_shared;
        this.groupsAvailableToShareWith = event.Groups_can_share_with;
        
        this.usersAndGroupsSharedWith = this.usersSharedWith.concat(this.groupsSharedWith);

        let userShareErrorsString:string = "";
        for(let userString of event.User_share_errors) {
            userShareErrorsString += ", " + userString;
        }
        
        if (userShareErrorsString.length > 0) {
            //AlertDialog.show(this.model.GetUiTextByKey("TEXT_SHARE_ERROR_MESSAGE").replace("{0}", userShareErrorsString.substr(2)), this.model.GetUiTextByKey("TEXT_SHARE_ERROR_TITLE"), true);
            this.model.showMdlAlertDialog(this.model.GetUiTextByKey("TEXT_SHARE_ERROR_MESSAGE").replace("{0}", userShareErrorsString.substr(2)), this.model.GetUiTextByKey("TEXT_SHARE_ERROR_TITLE"));
        }
    }
    
    private textShareError = (event:TextShareSettingsEvent) => {
        event.target.removeEventListener(TextShareSettingsEvent.TEXT_SHARE_SUCCESS, this.textShared);
        event.target.removeEventListener(TextShareSettingsEvent.TEXT_SHARE_ERROR, this.textShareError);        
        UberReaderLoadingMessage.GetInstance().Hide();        
        //AlertDialog.show(event.Error_message, this.model.GetUiTextByKey("ERR_SHARING_TEXT"));
        this.model.showMdlAlertDialog(event.Error_message, this.model.GetUiTextByKey("ERR_SHARING_TEXT"));
    }

    public dispose():void {}
}