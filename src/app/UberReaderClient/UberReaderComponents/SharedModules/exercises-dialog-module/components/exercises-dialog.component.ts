import { Component, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { LibraryView } from 'app/UberReaderClient/UberReaderComponents/Controls/library-view-controls/library-view.component';
import { UberApplication } from 'app/UberReaderData/UberApplication';
import { UberApplicationEventTypes } from 'app/UberReaderData/Events/UberApplicationEventTypes';
import { UberReaderTextEvent } from 'app/UberReaderData/Events/UberReaderTextEvent';
import { UberReaderLoadingMessage } from 'app/UberReaderClient/UberReaderComponents/Dialogs/UberReaderLoadingMessage';
import { ErrorMessage } from 'app/UberReaderData/Utils/ErrorMessage';
import { UberApplicationEvent } from 'app/UberReaderData/Events/UberApplicationEvent';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ParentDialog } from '../../../Dialogs/ParentDialog';
import { UserSettingSyncEvent } from 'app/UberReaderData/Events/UserSettingSyncEvent';

@Component({
    selector: 'exercises-dialog',
    styleUrls: ['./exercises-dialog.component.css'],
    template: `
        <h3 class="mdl-typography--headline mdl-color-text--grey-800 dialog-headline">Select {{ taskType == 'Typing' || taskType == null ? exerciseGenericName : 'Word List' }}</h3>
        <button class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
            <mdl-icon>close</mdl-icon>
        </button>

        <div class="mdl-dialog__content">
            <div class="menutabs--container">
                <div class="mdl-navigation menutabs--wrap">
                    <a *ngIf="taskType == 'Typing' || taskType == null" class="menutabs--links one" [class.active]="selectedTab =='text'" (click)="updateDisplay('text')" >{{ exerciseGenericName }}s</a>
                    <!--<a class="menutabs--links two" [class.active]="selectedTab =='books'" (click)="updateDisplay('books')">Books</a>-->
                    <a *ngIf="taskType != 'Typing' || taskType == null" class="menutabs--links" [class.one]="taskType != null && taskType != 'Typing'" [class.two]="taskType == null" [class.active]="selectedTab =='wordlists'" (click)="updateDisplay('wordlists')">Word Lists</a>
                    <hr/>
                </div>
            </div>

            <div class="mdl-grid" style="padding: 0px; height: 80%">
                <div class="mdl-cell mdl-cell--8-col col1" >

                    <!-- ADD TEXT OPTIONS -->
                    <add-new-text-btn buttonStyle="default" [openFromTest]="openFromTest" (textAdded)="library.setCurrentText($event)" (useTextCreated)="closeDialog($event)" [class.hide]="selectedTab =='wordlists' || disableTextCreation"></add-new-text-btn>                   
                    
                    <div class="search-form"> 
                       
                            
                        <!-- TEXT CATEGORIES -->
                        <div class="button-container" [class.hide]="selectedTab !='text'">
                            <button mat-button [matMenuTriggerFor]="libraryBrowseMenu1" class="button--browse-dropdown">
                                <span class="categoryLbl">{{ library.codeSelected?.Code_text != null ? library.codeSelected?.Code_text : 'Browse' }}</span>
                                <mat-icon class="arrowdd">arrow_drop_down</mat-icon>
                            </button>
                            <mat-menu #libraryBrowseMenu1="matMenu">
                                <button mat-menu-item *ngFor="let topicCategory of library.topicCategories"
                                    (click)="library.browseSelectionChanged(topicCategory)" 
                                    [class.selectedMenuItem]="library.codeSelected?.Code_text == topicCategory.Code_text">
                                    {{ topicCategory.Code_text }}
                                </button>
                            </mat-menu>												
                        </div>

                         <!-- READER CATEGORIES -->
                         <div class="button-container" [class.hide]="selectedTab !='books'">
                            <button mat-button [matMenuTriggerFor]="libraryBrowseMenu2" class="button--browse-dropdown">
                                <span class="categoryLbl">{{ library.codeSelected?.Code_text != null ? library.codeSelected?.Code_text : 'Browse' }}</span>
                                <mat-icon class="arrowdd">arrow_drop_down</mat-icon>
                            </button>
                            <mat-menu #libraryBrowseMenu2="matMenu">
                                <!--<div class="menutabs--container">
                                    <div class="mdl-navigation menutabs--wrap dropdown" id="nav2">
                                        <a class="menutabs--links one dropdown active" [class.active]="selectedReaderTab == 'topic'" (click)="selectedReaderTab = 'topic'">Topic</a>
                                        <a class="menutabs--links two" [class.active]="selectedReaderTab == 'level'" (click)="selectedReaderTab = 'level'">Level</a>
                                        <hr>
                                    </div>
                                </div>>
                                <mdl-menu-item [class.hide]="selectedReaderTab == 'topic'" *ngFor="let category of library.bookLvlCategories" mdl-ripple (click)="library.browseSelectionChanged(category)" [class.selectedMenuItem]="library.codeSelected?.Code_text == category.Code_text">
                                    {{ category.Code_text }}
                                </mdl-menu-item>-->
                                <button mat-menu-item *ngFor="let category of library.bookCategories"
                                    [class.hide]="selectedReaderTab == 'level'"
                                    [class.selectedMenuItem]="library.codeSelected?.Code_text == category.Code_text"
                                    (click)="library.browseSelectionChanged(category)">
                                    {{ category.Code_text }}
                                </button>                                
                            </mat-menu>												
                        </div>

                        <!-- WORD LIST CATEGORIES -->
                        <div class="button-container" [class.hide]="selectedTab !='wordlists'">
                            <!--<button mdl-button #libraryBrowseBtn3="mdlButton" class="button--browse-dropdown" (click)="libraryBrowseMenu3.toggle($event, libraryBrowseBtn3)">
                                <span class="categoryLbl">{{ library.codeSelected?.Name != null ? library.codeSelected?.Name : 'Browse' }}</span><mdl-icon class="arrowdd">arrow_drop_down</mdl-icon>
                            </button>
                            <mdl-menu #libraryBrowseMenu3="mdlMenu" mdl-menu-position="bottom-left">
                                <div *ngFor="let wordlistCategory of library.wordlistCategories">
                                    <mdl-menu-item [class.hide]="wordlistCategory.Name == 'Grades 1-10'" mdl-ripple (click)="library.browseSelectionChanged(wordlistCategory)" [class.selectedMenuItem]="library.codeSelected?.Name == wordlistCategory.Name">
                                        {{ wordlistCategory.Name }}
                                    </mdl-menu-item>
                                    <button [class.hide]="wordlistCategory.Name != 'Grades 1-10'" mdl-button mdl-button-type="icon" class="option-li" #subMenuBtn="mdlButton" (click)="subMenu.toggle($event, subMenuBtn)">Grades 1-10
                                        <mdl-icon>arrow_right</mdl-icon>
                                    </button>
                                </div>
                            </mdl-menu>

                            <div class="sub-menu">	
                                <mdl-menu #subMenu="mdlMenu" mdl-menu-position="bottom-right">
                                    <mdl-menu-item *ngFor="let subCategory of library.wordlistSubCategories" mdl-ripple (click)="library.browseSelectionChanged(subCategory)">
                                        {{ subCategory.Name }}
                                    </mdl-menu-item>
                                </mdl-menu>		
                            </div>-->

                            <button mat-button [matMenuTriggerFor]="libraryBrowseMenu3" class="button--browse-dropdown">
                                <span class="categoryLbl">{{ library.codeSelected?.Name != null ? library.codeSelected?.Name : 'Browse' }}</span>
                                <mat-icon class="arrowdd">arrow_drop_down</mat-icon>
                            </button>

                            <mat-menu #libraryBrowseMenu3="matMenu">
                                <div *ngFor="let wordlistCategory of library.wordlistCategories">
                                    <button mat-menu-item *ngIf="wordlistCategory.Name != 'Grades 1-10'"
                                        [class.selectedMenuItem]="library.codeSelected?.Name == wordlistCategory.Name"
                                        (click)="library.browseSelectionChanged(wordlistCategory)">
                                        {{ wordlistCategory.Name }}
                                    </button>
                                    <button mat-menu-item *ngIf="wordlistCategory.Name == 'Grades 1-10'"
                                        [matMenuTriggerFor]="subMenu" 
                                        [class.selectedMenuItem]="library.codeSelected?.Name == wordlistCategory.Name"
                                        (click)="library.browseSelectionChanged(wordlistCategory)">
                                        {{ wordlistCategory.Name }}
                                    </button>
                                </div>
                            </mat-menu>

                            <mat-menu #subMenu="matMenu">
                                <ng-template matMenuContent>
                                    <button mat-menu-item *ngFor="let subCategory of library.wordlistSubCategories"
                                        [class.selectedMenuItem]="library.codeSelected?.Name == subCategory.Name" 
                                        (click)="library.browseSelectionChanged(subCategory)">
                                        {{ subCategory.Name }}
                                    </button>
                                </ng-template>
                            </mat-menu>
                        </div>

                        <!-- SEARCH FIELD -->               
                        <div class="search-box">
                            <mdl-icon class="search-icon">search</mdl-icon>
                            <mdl-textfield class="search-txt" [(ngModel)]="library.searchInput" (input)="library.callSearch()" [label]="library.searchBoxDefaultText"></mdl-textfield>
                            <mdl-icon #clearSearchButton [class.hide]="library.searchInput?.length == 0" class="libClearSearchBtn" [mdl-tooltip]="clearBtn"
                                (click)="library.searchInput = ''; library.callSearch();">clear</mdl-icon>
                            <mdl-tooltip #clearBtn="mdlTooltip" class="mdlClearBtn">Clear search</mdl-tooltip>
                        </div>
                    </div>
                </div> <!-- end of mdl cell 8 -->

                <div class="mdl-cell mdl-cell--4-col col2"  [class.hide]="selectedTab !='wordlists' || (taskType != null && taskType != 'Typing')">
                    <mdl-switch [(ngModel)]="library.includeDefinitions" mdl-ripple (change)="library.changeVocabExerciseType()">Include definitions</mdl-switch>
                </div>

                <!-- EXERCISES CONTAINER -->
                <div class="mdl-cell mdl-cell--8-col" style="margin: 0px; width: calc(70%);">
                    <div class="exercises-container">
                        <library-view #library (textSelectedEmitter)="enableButton = $event" (previewEmitter)="previewText = $event" [forTypingTest]="openFromTest" [forGames]="!openFromTest"></library-view>
                    </div>
                </div>

                <!-- PREVIEW CONTAINER -->
                <div class="mdl-cell mdl-cell--4-col" style="margin: 0px; width: calc(30%);">
                    <div class="preview-pane">
                        <label class="mdl-typography--display-1 mdl-typography--font-light mdl-color-text--grey-600 preview-header-title">Preview</label>
                        <mdl-textfield type="text" rows="3" [(ngModel)]="previewText" readonly></mdl-textfield>
                    </div>
                </div>

                <div class="mdl-dialog__actions" style="padding: 0px;">
                    <!--button mdl-button mdl-button-type="raised" class="button--primary" [disabled]="!enableButton" (click)="save()" style="width:85px;">
                        {{ openFromTest ? 'Use Exercise' : 'OK' }}
                    </button>
                    <button mdl-button mdl-button-type="raised" class="preview-btn" (click)="closeDialog()">
                        cancel
                    </button-->

                    <button mat-raised-button class="button--primary" [disabled]="!enableButton" (click)="save()" style="margin-left:5px;">
                        {{ openFromTest ? 'Use Exercise' : 'OK' }}
                    </button>
                    <button mat-raised-button class="button--mat-secondary preview-btn" (click)="closeDialog()">
                        cancel
                    </button>
                </div>
            </div> <!-- end of mdl grid -->
        </div> <!-- end of mdl dialog content -->
    `
})
export class ExercisesDialog extends ParentDialog implements AfterViewInit{
    @ViewChild('library', { static: true }) library: LibraryView;

    public enableButton: boolean = false;
    public openFromTest: boolean;    
    public previewText: string = "";
    public selectedTab: string = "text";
    public selectedReaderTab: string = "topic";
    public taskType: string = "";
    public exerciseGenericName: string = "Content Text";
    public disableTextCreation: boolean = false;

    private model: UberApplication;
    private isGameLoaded: boolean;

    constructor(public dialogRef: MatDialogRef<ExercisesDialog>, private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) data: any) {
        super(dialogRef);
        //this.visible = true;
        this.model = UberApplication.GetInstance();
        this.model.addEventListener(UberApplicationEventTypes.CURRENT_TEXT_CHANGED, this.currentTextUpdated);        
        this.openFromTest = data.openFromTest;
        this.isGameLoaded = data.isGameLoaded; //! FIXME:
        this.taskType = data.taskType;

        if (!this.model.CurrentUser.Is_admin) {
            this.disableTextCreation = this.model.GetUserPref("disable_text_creation").toLowerCase() == "true" ? true : false;    
            this.model.addEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, this.updateUserSettings);  
        }  
    }

    ngAfterViewInit() {
        if (this.taskType && (this.taskType.indexOf('Spell') != -1 || this.taskType.indexOf('Vocab') != -1)) {
            this.library.includeDefinitions = this.taskType.indexOf('Vocab') != -1;
            setTimeout(() => this.updateDisplay('wordlists'), 0);
        }  
        if (this.model.CurrentUserData.CurrentText.Wordlist_id != null) {
            setTimeout(() => this.updateDisplay('wordlists'), 0);
        }
    }

    public save(): void { //! FIXME:
        if (this.openFromTest) {
            let selectedText = this.library.selectedText;
            if(selectedText == null) {
                this.model.showMdlAlertDialog("Please select a text.", "", true);
            }
            else {
                //this.model.getTextById(selectedText.Text_id, this.textSelected, this.textSelectionError);            
                this.closeDialog(selectedText);
            }
        }
        else {
          this.library.trainOnSelectedText(this.isGameLoaded); //! FIXME:
        }
    }

    private textSelected = (event:UberReaderTextEvent) => {
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVED, this.textSelected);
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, this.textSelectionError);

        UberReaderLoadingMessage.GetInstance().Hide();
        this.closeDialog(event._Text);
    }

    private textSelectionError = (event:UberReaderTextEvent) => {
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVED, this.textSelected);
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, this.textSelectionError);

        UberReaderLoadingMessage.GetInstance().Hide();

        if(event.ErrorMessage == ErrorMessage.TRIAL_VERSION_ERROR) {
            //to do upgradeAccount(null);
        }
        else if(event.ErrorMessage == ErrorMessage.CANCEL_LOADING) {
            //suppress error
        }
        else if(event.ErrorMessage.length > 0) {
            this.model.showMdlAlertDialog(event.ErrorMessage, this.model.GetUiTextByKey("ERR_GETTING_TEXT_TITLE"));
        }
        else {
            this.model.showMdlAlertDialog(this.model.GetUiTextByKey("ERR_GETTING_TEXT_MESSAGE"), this.model.GetUiTextByKey("ERR_GETTING_TEXT_TITLE"));
        }
    }

    private currentTextUpdated = (event:UberApplicationEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.CURRENT_TEXT_CHANGED, this.currentTextUpdated);
        this.closeDialog();
    }

    public updateDisplay(tabName: string): void {
        this.selectedTab = tabName;
        this.library.isVocabView = this.selectedTab == "wordlists";
        this.library.isReaderView = this.selectedTab == "books";

        if (this.selectedTab == "wordlists") {
            this.library.selectedVocabExerciseType = this.library.vocabExerciseTypes[0];
            this.library.browseSelectionChanged(this.library.wordlistCategories[0]);
        }
        else if (this.selectedTab == "books") {
            this.library.selectedVocabExerciseType = null;
            //this.library.Init();
            this.library.browseSelectionChanged(this.library.bookCategories[0]);
        }
        else if (this.library.forTypingTest) {
            this.library.selectedVocabExerciseType = null;
            this.library.browseSelectionChanged(this.library.topicCategories[1]); //set Typing Tests as the default category
        }
        else {
            this.library.selectedVocabExerciseType = null;
            this.library.browseSelectionChanged(this.library.topicCategories[0]);
        }
    }

    private updateUserSettings = () => {
        this.disableTextCreation = this.model.GetUserPref("disable_text_creation").toLowerCase() == "true" ? true : false;
    }

    ngOnDestroy() {
        this.model.removeEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, this.updateUserSettings);
    }

    public dispose():void {}
}
