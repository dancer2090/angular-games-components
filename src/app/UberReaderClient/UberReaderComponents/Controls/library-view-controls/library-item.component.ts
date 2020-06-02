import { Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { SharedProxyText } from '../../../../UberReaderData/DataClasses/other/SharedProxyText';
import { ProxyText } from '../../../../UberReaderData/DataClasses/other/ProxyText';
import { ProxyTest } from '../../../../UberReaderData/DataClasses/other/ProxyTest';
import { AppSettings } from '../../../../UberReaderData/AppSettings';
import { UberApplication } from '../../../../UberReaderData/UberApplication';
import { ProxyWordlist } from '../../../../UberReaderData/DataClasses/other/ProxyWordlist';
import { SharedProxyWordlist } from '../../../../UberReaderData/DataClasses/other/SharedProxyWordlist';
import { ProductInfo } from '../../../../UberReaderData/DataClasses/db/ProductInfo';
import { User_Text } from '../../../../UberReaderData/DataClasses/db/User_Text';


@Component({
    selector: 'library-item',
    styleUrls: ['./library-item-dialog.component.css'],
    template: `
        <div class="mdl-cell mdl-cell-2-col library-col" (mouseover)="onMouseOver()" (mouseleave)="onMouseLeave()">	                         
            <mdl-card class="library-tile" [class.current-text]="data.Text_id == currentTextId || data.Wordlist_id == currentTextId" style="background: transparent url('https://resources.ereflect.com/Typesy/webApp/assets/icon/library-book-01.svg') no-repeat !important; background-size: 100%;">
                <div class="current-text div-label" *ngIf="data.Text_id == currentTextId  || data.Wordlist_id == currentTextId">SELECTED EXERCISE</div> 
                <mdl-card-title mdl-card-expand class="library-image">
                    <p class="book-title" [mdl-tooltip]="bookTitle">{{ title }}</p>    
                    <mdl-tooltip #bookTitle="mdlTooltip">{{ title }}</mdl-tooltip>                
                    <!--<mdl-icon class="current-text-icon" *ngIf="data.Text_id == currentTextId">bookmark</mdl-icon>-->
                </mdl-card-title>
                <!--
                <mdl-checkbox *ngIf="!isCurrentText" class="selectCheckbox" [class.checked]="isSelected" [(ngModel)]="isSelected" [mdl-ripple]="true" (click)="itemSelected.emit(data)"></mdl-checkbox>
                -->
                <mdl-card-supporting-text class="supporting-text-3">
                    <p class="mdl-typography--subhead mdl-typography--font-bold book-author">{{ itemInfoTwo }}</p>
                </mdl-card-supporting-text>
            
                <mdl-card-actions class="library-actions">
                    <div class="card-buttons" [class.card-buttons]="!displayHoverGroup">

                        <!--<button mdl-button mdl-button-type="raised" mdl-ripple mdl-colored="accent"
                            *ngIf="isCurrentText || isCurrentWordlist" (click)="onButtonClick('edit')" class="tile-button">
                            {{ editButtonLbl }}
                        </button>
                        <!--<button mdl-button mdl-button-type="raised" mdl-ripple mdl-colored="accent"
                            *ngIf="!isCurrentText" (click)="onButtonClick('select')" class="tile-button">
                            {{ textAction }}
                        </button>-->
                        <button mdl-button mdl-button-type="raised" mdl-ripple mdl-colored="accent" (click)="onButtonClick('view')" class="tile-button hide">
                            View 
                        </button>
                        <button *ngIf="(isCurrentText && displayShare)  || (!isCurrentText && 
                                (displayLocation || displayPreview || displayRemove || displayEdit || displayClear || displayShare || displayDelete))" 
                                mdl-button mdl-button-type="icon" class="book-dot-menu" #optionsBtn="mdlButton" (click)="optionsMenu.toggle($event, optionsBtn)">
                            <mdl-icon>more_vert</mdl-icon>
                        </button>
                        <mdl-menu #optionsMenu="mdlMenu" mdl-menu-position="top-right">
                            <mdl-menu-item *ngIf="displayUpgrade" (click)="onButtonClick('upgrade')">Upgrade</mdl-menu-item>
                            <!--<mdl-menu-item *ngIf="displayTextAction" (click)="onButtonClick('select')">{{ textAction }}</mdl-menu-item>-->
                            <mdl-menu-item *ngIf="displayLocation" (click)="onButtonClick('location')">Location</mdl-menu-item>
                            <mdl-menu-item *ngIf="displayPreview" (click)="onButtonClick('preview')">Preview</mdl-menu-item>
                            <mdl-menu-item *ngIf="displayRemove" (click)="onButtonClick('remove')">Remove</mdl-menu-item>
                            <mdl-menu-item *ngIf="displayEdit && !isCurrentText" (click)="onButtonClick('edit')">{{ editButtonLbl }}</mdl-menu-item>
                            <mdl-menu-item *ngIf="displayClear" (click)="onButtonClick('clear')">Clear</mdl-menu-item>
                            <mdl-menu-item *ngIf="displayShare" (click)="onButtonClick('share')">Share</mdl-menu-item>
                            <mdl-menu-item *ngIf="displayDelete" (click)="onButtonClick('delete')">{{ deleteButtonLbl }}</mdl-menu-item>
                        </mdl-menu>
                    </div>
                </mdl-card-actions>            
            </mdl-card>
        </div>


        <!--<div id="mainContainer" (mouseover)="onMouseOver()" (mouseleave)="onMouseLeave()">
            <div>
                <div id="upperContainer">
                    <div id="title">{{ title }}</div>
                </div>
                <div id="lowerContainer">
                    <div>
                        <img id="authorPic">
                        <label id="itemInfoOne">{{ itemInfoOne }}</label>
                    </div>
                    <label id="itemInfoTwo">{{ itemInfoTwo }}</label>
                </div>
            </div>
            <div id="hoverGroup" *ngIf="displayHoverGroup">
                <button *ngIf="displayUpgrade" (click)="onButtonClick('upgrade')">Upgrade</button>
                <button *ngIf="displayTextAction" (click)="onButtonClick('select')">{{ textAction }}</button>
                <button *ngIf="displayLocation" (click)="onButtonClick('location')">Location</button>
                <button *ngIf="displayPreview" (click)="onButtonClick('preview')">Preview</button>
                <button *ngIf="displayRemove" (click)="onButtonClick('remove')">Remove</button>
                <button *ngIf="displayEdit" (click)="onButtonClick('edit')">{{ editButtonLbl }}</button>
                <button *ngIf="displayClear" (click)="onButtonClick('clear')">Clear</button>
                <button (click)="openExtraOptions()" *ngIf="showExtraOptions">...</button>
                <div class="roundButtonGroup" *ngIf="showExtraOptionsGroup">
                    <button *ngIf="displayEditRound" (click)="onButtonClick('edit')">Edit</button>
                    <button *ngIf="displayShare" (click)="onButtonClick('share')">Share</button>
                    <button *ngIf="displayDelete" (click)="onButtonClick('delete')">{{ deleteButtonLbl }}</button>
                </div>
            </div>
        </div>-->
    `
})
export class LibraryItem implements OnInit{
    @Input() currentTextId:number = -1;
    @Input('data') data:any;
    @Input('isSelected') isSelected:boolean;
    @Output() btnClick = new EventEmitter();
    @Output() itemSelected = new EventEmitter();
    @ViewChild('optionsMenu', { static: true }) optionsMenu:any; 

    private model:UberApplication;    
    private currentProduct:ProductInfo;

    public isCurrentText:boolean = false;
    public isCurrentWordlist:boolean = false;
    public title:string = "";
    public itemInfoOne:string = "";
    public itemInfoTwo:string = "";
    public textAction:string = AppSettings.textAction;
    public editButtonLbl:string = "Edit";
    public deleteButtonLbl:string = "";
    public bookImageSrc:string = "assets/icon/book.svg";

    public displayHoverGroup:boolean = false;
    public showExtraOptions:boolean = false;
    public showExtraOptionsGroup:boolean = false;
    public displayUpgrade:boolean = false;
    public displayTextAction:boolean = true
    public displayLocation:boolean = true;
    public displayPreview:boolean = true;
    public displayRemove:boolean = true;
    public displayEdit:boolean = true;
    public displayClear:boolean = true;
    public displayEditRound:boolean = false;
    public displayShare:boolean = true;
    public displayDelete:boolean = true;

    constructor() {
        this.model = UberApplication.GetInstance();
        this.currentProduct = this.model.CurrentProduct;
    }
    
    ngOnInit() {
        if(this.data != null) {
            if(this.data instanceof SharedProxyText) {
                this.title = this.data.Title;
                this.itemInfoOne = this.data.Owner; 
                this.itemInfoTwo = this.data.Author && this.data.Author.length > 0 ? this.data.Author : "";
                this.isCurrentText = this.model.CurrentUserData.CurrentText ? this.model.CurrentUserData.CurrentText.Text_id == this.data.Text_id : false;
            }
            else if(this.data instanceof ProxyText) {
                this.title = this.data.Title;
                this.itemInfoTwo = this.data.Author && this.data.Author.length > 0 ? this.data.Author: ""; 
                this.isCurrentText = this.model.CurrentUserData.CurrentText ? this.model.CurrentUserData.CurrentText.Text_id == this.data.Text_id : false;
            }
            else if(this.data instanceof ProxyTest) {
                this.title = this.data.Book;
                this.itemInfoOne = this.data.Book; 
                this.itemInfoTwo = this.data.Author && this.data.Author.length > 0 ? this.data.Author: "";
            }
            else if(this.data instanceof ProxyWordlist || this.data instanceof SharedProxyWordlist) {
                if ( this.data.Name == "[display_name] Words") {
                    let displayName:string = this.model.CurrentUserData.DisplayNamePosessive;
                    this.data.Name = this.data.Name.replace("[display_name]",displayName);
                }                
                this.title = this.data.Name;
                this.isCurrentWordlist = this.model.CurrentWordlist ? this.model.CurrentWordlist.Wordlist_id == this.data.Wordlist_id : false;
                
                // For Typesy
                this.isCurrentText = this.model.CurrentUserData.CurrentText ? this.model.CurrentUserData.CurrentText.Text_id == this.data.Wordlist_id : false;
            }
        }

        this.bookImageSrc = AppSettings.GetAssetLocation() + this.bookImageSrc;
    }    
    
    public onButtonClick(btnName:string):void {
        this.btnClick.emit(
            {   
                btnName: btnName.toLowerCase(), 
                data: this.data
            }
        );
    }

    public onMouseOver():void {
        if(this.isUpgradeVisible()) 
            return;
        
        this.updateCurrentLibraryItem();
        this.setupRemoveBtn();
        this.setupEditBtn();
        this.setupShareBtn();
        this.setupDeleteBtn();
        this.displayTextAction = this.currentProduct.ReaderText == "Spreed" || !this.isCurrentText || (this.currentProduct.DisplayVocab && !this.isCurrentWordlist);
        this.displayLocation = this.isCurrentText && this.currentProduct.DoPreprocessing;
        this.displayPreview = ( !this.isCurrentText && this.currentProduct.DoPreprocessing ) || this.currentProduct.DisplayVocab;        
        this.displayClear = this.currentProduct.DisplayVocab;
        
        /* TO DO
        if((Data as ProxyWordlist).User_id == 0){
            let user_wordlist:User_Wordlist = this.model.GetUserWordlist(id);
            if(user_wordlist)
            {
                if(user_wordlist.Percentage_mastered > 0){
                    hoverGroup.clearButtonVisibility =  true;
                }
                if(!isThisCurrentWordlist && parentId == "userTextContainer")
                {
                    hoverGroup.removeButtonVisibility = user_wordlist && user_wordlist.Show_in_library.HasValue() && user_wordlist.Show_in_library.Value() == true;
                }
                else
                {
                    hoverGroup.removeButtonVisibility = false;
                }							
            }						
        }*/

        if(this.currentProduct.DoPreprocessing) {
            this.showExtraOptions = (this.displayShare || this.displayDelete || this.displayEdit) && !this.showExtraOptionsGroup;
        }
        else if(this.currentProduct.DisplayVocab) {
            this.showExtraOptions = (this.displayShare || this.displayDelete || (this.displayRemove && this.displayClear)) && this.showExtraOptionsGroup;
            
            /*TO DO
            if(this.displayRemove && this.displayClear) {
                removeButton.label = "";
                removeButton.width = removeButton.height = buttonHeight;
                removeButton.toolTip = "Remove";
                optionContainer.addElement(removeButton);
                
                clearButton.label = "";
                clearButton.width = clearButton.height = buttonHeight;
                clearButton.toolTip = "Clear";
                optionContainer.addElement(clearButton);
            }
            else {
                removeButton.label = "Remove";
                removeButton.width = buttonWidth;
                removeButton.height = buttonHeight;
                removeButton.toolTip = "";
                if(optionContainer.contains(removeButton))
                {
                    addElement(removeButton);
                }
                
                clearButton.label = "Clear";
                clearButton.width = buttonWidth;
                clearButton.height = buttonHeight;
                clearButton.toolTip = "";
                if(optionContainer.contains(clearButton))
                {
                    addElement(clearButton);
                }
                
                this.validateNow();
            }*/
        }
        else {
            this.showExtraOptions = (this.displayShare || this.displayDelete) && !this.showExtraOptionsGroup;
        }

        this.displayHoverGroup = true;
    }

    private updateCurrentLibraryItem() {
        if(this.data != null) {
            if(this.data instanceof SharedProxyText || this.data instanceof ProxyText) {
                this.isCurrentText = this.model.CurrentUserData.CurrentText ? this.model.CurrentUserData.CurrentText.Text_id == this.data.Text_id : false;
            }
            else if(this.data instanceof ProxyWordlist || this.data instanceof SharedProxyWordlist) {
                this.isCurrentWordlist = this.model.CurrentWordlist ? this.model.CurrentWordlist.Wordlist_id == this.data.Wordlist_id : false;
            }
        }
    }

    public onMouseLeave():void {
        this.displayHoverGroup = false
        this.showExtraOptionsGroup = false;
        this.optionsMenu.hide();
    }
    
    public openExtraOptions():void {
        this.showExtraOptions = false;
        this.showExtraOptionsGroup = true;
    }

    private isUpgradeVisible():boolean {
        let id:number;
        if(this.data instanceof ProxyText)
            id = this.data.Text_id;
        else if(this.data instanceof SharedProxyText)
            id = this.data.Text_id;
        else if(this.data instanceof ProxyWordlist)
            id = this.data.Wordlist_id;
        else if(this.data instanceof SharedProxyWordlist)
            id = this.data.Wordlist_id;
            
        if(this.model.CurrentUser.Is_trial && !this.model.IsTrialTextEnabled(id)) {
            this.displayUpgrade = true;
            this.displayTextAction = false;
            this.displayLocation = false;
            this.displayPreview = false;
            this.displayEdit = false;
            this.displayShare = false;
            this.displayDelete = false;
            this.displayRemove = false;
            this.displayClear = false;
        }
        else {
            this.displayUpgrade = false;
        }
        return this.displayUpgrade;
    }

    private setupRemoveBtn():void {
        this.displayRemove = false;
        if(this.data instanceof ProxyText && this.currentProduct.DoPreprocessing) {
            let userTextExist:boolean = this.model.CheckUserTextExistence(this.data.Text_id);
            if(userTextExist && this.data.User_id == null && !this.isCurrentText) {
                let bookUserText:User_Text = this.model.GetUserText(this.data.Text_id); 
                this.displayRemove = bookUserText && bookUserText.Show_in_library != null && bookUserText.Show_in_library == true;					
            }
        }
    }

    private setupEditBtn():void {
        if(this.data instanceof SharedProxyText) {
            this.displayEdit = this.data.Owner_user_id != null && this.data.Can_edit;
            this.editButtonLbl = this.data.Can_edit ? "Edit" : "View";
            //hoverGroup.editButton.setStyle("icon", ((Data as SharedProxyText).Can_edit ? ResourceClasses.edit : ResourceClasses.view));
        }
        else if(this.data instanceof ProxyText) {
            if(this.data.User_id != null) {
                this.displayEdit = true;	
                this.editButtonLbl = "Edit";
                //hoverGroup.editButton.setStyle("icon", ResourceClasses.edit);
            }
            else {
                if(this.currentProduct.DoPreprocessing) {
                    this.displayEdit = false;		
                }
                else {
                    this.displayEdit = false; //true; change for March version	
                    this.editButtonLbl = "View";
                    //hoverGroup.editButton.setStyle("icon", ResourceClasses.view);
                }
            }
        }
        else {
            this.displayEdit = false;
        }
    }

    private setupShareBtn():void {
        this.displayShare = false;
        if(this.data instanceof ProxyText) {
            this.displayShare = this.data.User_id != null && this.data.User_id == this.model.CurrentUser.User_id;
        }
        else if(this.data instanceof ProxyWordlist) {
            //TO DO this.displayShare =  (Data as ProxyWordlist).User_id != 0 && (Data as ProxyWordlist).User_id == this.model.CurrentUser.User_id;
        }
    }

    private setupDeleteBtn():void {
        if(this.data instanceof SharedProxyText) {
            this.displayDelete = this.data.Group_id == null; //&& !this.isCurrentText;
            this.deleteButtonLbl = this.data.Group_id == null ? "Remove" : "Delete";
        }
        else if(this.data instanceof ProxyText) {
            this.displayDelete = this.data.User_id != null; //&& !this.isCurrentText;
            this.deleteButtonLbl = this.data.User_id != null ? "Delete" : "Remove"; //&& !this.isCurrentText			
        }
        else if(this.data instanceof SharedProxyWordlist) {
            this.displayDelete = this.data.Group_id == null && !this.isCurrentWordlist;
            this.deleteButtonLbl = this.data.Group_id == null ? "Remove" : "Delete";		
        }
        else if(this.data instanceof ProxyWordlist) {
            //TO DO
            this.displayDelete = false;            
            //this.displayDelete = this.data.User_id != 0 && (Data as ProxyWordlist).User_id == this.model.CurrentUser.User_id && !isThisCurrentWordlist;
            //this.deleteButtonLbl = (Data as ProxyWordlist).User_id != 0 && !isThisCurrentWordlist ? "Delete" : "Remove";	
        }
    }

    private isLocationVisible():void {}

    private isPreviewVisible():void {}

    private isClearVisible():void {}
}