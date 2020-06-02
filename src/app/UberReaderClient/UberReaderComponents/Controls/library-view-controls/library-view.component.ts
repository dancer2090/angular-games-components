import { MdlDialogService } from '@angular-mdl/core';
import { UberReader } from '../../../UberReader';
import { Component, OnInit, ViewChild, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { UberApplication } from '../../../../UberReaderData/UberApplication';
import { UberReaderLoadingMessage } from '../../Dialogs/UberReaderLoadingMessage';
import { Code } from '../../../../UberReaderData/DataClasses/db/Code';
import { SearchTextSessionCache } from '../../../../UberReaderData/UberDataAccess/SearchTextSessionCache';
import { TextsSearchEvent } from '../../../../UberReaderData/Events/TextsSearchEvent';
import { TextsTableEvent } from '../../../../UberReaderData/Events/TextsTableEvent';
import { SharedProxyText } from '../../../../UberReaderData/DataClasses/other/SharedProxyText';
import { ProxyText } from '../../../../UberReaderData/DataClasses/other/ProxyText';
import { ErrorMessage } from '../../../../UberReaderData/Utils/ErrorMessage';
import { UberReaderTextEvent } from '../../../../UberReaderData/Events/UberReaderTextEvent';
import { ClosePopUpEvent } from '../../../../UberReaderData/Events/ClosePopUpEvent';
import { Router } from '@angular/router';
import { ScreenState } from '../../../../UberReaderData/Utils/ScreenState';
import { ProxyTextsEvent } from '../../../../UberReaderData/Events/ProxyTextsEvent';
import { UberApplicationEventTypes } from '../../../../UberReaderData/Events/UberApplicationEventTypes';
import { UberApplicationEvent } from '../../../../UberReaderData/Events/UberApplicationEvent';
import { StringUtils } from '../../../../UberReaderData/Utils/StringUtils';
import { TextShareSettingsEvent } from '../../../../UberReaderData/Events/TextShareSettingsEvent';
import { User_Text } from '../../../../UberReaderData/DataClasses/db/User_Text';
import { Text } from '../../../../UberReaderData/DataClasses/db/Text';
import { ShareTextDialog } from './dialogs/share-text-dialog.component';
import { EditOrViewTextDialog } from './dialogs/edit-or-view-text-dialog.component';
import { UserAuthenticatedEvent } from '../../../../UberReaderData/Events/UserAuthenticatedEvent';
import { HtmlService } from '../../../../UberReaderData/Utils/Services/HtmlService';
import { AppSettings } from '../../../../UberReaderData/AppSettings';
import { WordlistSearchEvent } from '../../../../UberReaderData/Events/WordlistSearchEvent';
import { Wordlist_Category } from '../../../../UberReaderData/DataClasses/db/Wordlist_Category';
import { EmptyScreen } from '../../SharedModules/empty-screen-module/components/empty-screen.component';
import { GamesLibraryService } from '../courses-train-view-controls/games-module/games-view.service';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'library-view',
    styleUrls: ['./library-view.component.css'],
    template: `
        <div class="page-content-courses-outer" #scroller (scroll)="onScroll($event)" [class.hide]="!isViewReady">
            <div class="page-content-courses">
                <div id="libraryGroupContainer">
                    <div class="libraryGroup" *ngIf="userAndSharedTexts.length > 0">
                        <label class="mdl-typography--display-1 mdl-typography--font-light mdl-color-text--grey-600 course-header-title">My Exercises</label>
                        <div class="mdl-grid">
                            <library-item *ngFor="let text of userAndSharedTexts" [data]="text" [currentTextId]="currentTextId" [isSelected]="selectedText == text" (btnClick)="handleBtnClick($event)" (itemSelected)="selectTextFromDialog($event)" (click)="item_clickHandler($event, text)"></library-item>
                        </div>
                    </div>
                    <div class="libraryGroup" *ngIf="defaultTexts.length > 0">
                        <label class="mdl-typography--display-1 mdl-typography--font-light mdl-color-text--grey-600 course-header-title">{{ defaultHeaderText }}</label>
                        <div class="mdl-grid">
                            <library-item *ngFor="let text of defaultTexts" [data]="text" [currentTextId]="currentTextId" [isSelected]="selectedText == text" (btnClick)="handleBtnClick($event)" (itemSelected)="selectTextFromDialog($event)" (click)="item_clickHandler($event, text)"></library-item>
                        </div>
                    </div>
                </div>
                <empty-screen class="libraryEmptyScreen" #zeroResultsView [visible]="zeroResults" (refresh)="clearSearch(); callSearch();"></empty-screen>
            </div>
        </div>
    `
})
export class LibraryView implements OnInit, OnDestroy{
    @Input() forGames: boolean = false;
    @Input() forTypingTest: boolean = false;
    @Output() textSelectedEmitter = new EventEmitter();
    @Output() previewEmitter = new EventEmitter();
    @ViewChild('zeroResultsView', { static: true }) zeroResultsView: EmptyScreen;
    @ViewChild('scroller', {static: true}) scroller: any;

    private searchSession:SearchTextSessionCache;
    private isInitSearch:boolean = true;
    private calledAllTexts:boolean = false;
    private newSearch:boolean = false;
    private tempSearchWord:string = "";
    private tempSearchCode:string = "";
    private pageIndex:number = 0;
    private numberOfItems:number = 20;
    private isMaxVerticalScroll:boolean = false;
    private doSearch:boolean = true;
    private model:UberApplication;
    private currentState:string = "";
    private textToDelete:any;
    private textToShare:any;
    private browseType:string = "";
	private browseParam:number = -1;
    private searchTimeout:any;
    private inMyLibrary:boolean = true;
    private hideMyLibrary:boolean = false;
    private gamesLibrary: GamesLibraryService;

    public currentTextId:number = -1;
    public userAndSharedTexts:any[] = [];
    public defaultTexts:any[] = [];
    public searchInput:string = "";
    public topicCategories:any[] = [{Code_text: "SHOW ALL"}];
    public bookCategories:Code[] = [];
    public bookLvlCategories:Code[] = [];
    public wordlistCategories: Wordlist_Category[] = [];
    public wordlistSubCategories: Wordlist_Category[] = [];
    public searchBoxDefaultText:string = "";
    public defaultHeaderText:string = "";
    public zeroResultText:string = "";
    public zeroResults:boolean = false;
    public isViewReady:boolean = false;
    public selectedText:any;
    public isVocabView: boolean = false;
    public isReaderView: boolean = false;
    public addTextOptions:any[] = [
            {label: "Paste Text", data: "pasteText"},
            {label: "Use URL", data: "useUrl"},
            /*{label: "Web Page", data: "webPage"}, */
            {label: "Document", data: "document"}
        ];
    public vocabExerciseTypes: any[] = [
        {label: "Spelling (only words)", data: "spelling"},
        {label: "Vocabulary (include definitions)", data: "vocab"}
    ];
    public includeDefinitions: boolean = true;
    public selectedVocabExerciseType: any;

    constructor(private router: Router,
                private mdlDialogService:MdlDialogService,
                private matDialog: MatDialog,
                private htmlService: HtmlService) {
        this.model = UberApplication.GetInstance();
        this.gamesLibrary = GamesLibraryService.GetInstance();
    }

    ngOnInit() {
        if (!this.forTypingTest) {
            this.htmlService.setTitle("Typesy");
        }

        this.model.addEventListener(UserAuthenticatedEvent.SIGN_OUT, this.signedOut);
        if(!this.forGames || !this.forTypingTest) {
            //UberReader.GetInstance().SetNavScreenState(ScreenState.MANAGING_TEXT);
            //UberReaderStateData.GetInstance().currentUberReaderScreenState = ScreenState.MANAGING_TEXT;
        }

        if(this.model.hasLoggedIn) {
            setTimeout(() => this.Init());
        }
        else {
            this.model.addEventListener(UberApplicationEventTypes.NEW_USER, this.loggedIn);
        }
    }

    private loggedIn = (event:UberApplicationEvent) => {
        this.model.removeEventListener(UberApplicationEventTypes.NEW_USER, this.loggedIn);
        setTimeout(() => this.Init());
    }

    private signedOut = (event:UserAuthenticatedEvent) => {
        console.log("SIGNED OUT in library");
        this.model.removeEventListener(UserAuthenticatedEvent.SIGN_OUT, this.signedOut);
        this.router.navigate(['/home']);
    }

    ngOnDestroy() {
        this.model.removeEventListener(UserAuthenticatedEvent.SIGN_OUT, this.signedOut);
    }

    public Init():void {
        this.isViewReady = true;
        this.model.UpdateUserWorkingOn("Exercises");

        if(this.model.CurrentUser && this.model.CurrentUser.IsEduUser) {
            AppSettings.schoolBuild = true;
        }
        else {
            AppSettings.schoolBuild = false;
        }

        if(this.model.CurrentProduct.DoPreprocessing) {
            //TO DO
        }
        else if(this.model.CurrentProduct.DisplayVocab) {
            //TO DO
        }
        else {
            UberReaderLoadingMessage.GetInstance().Show("Loading...");

            if (this.forGames) {
                this.topicCategories = this.topicCategories.concat(this.model.GetCategoriesByName(this.model.CurrentLessonPlan.Name));
            }
            else if (this.forTypingTest) {
                this.topicCategories = this.topicCategories.concat(this.model.GetCategoriesByName("typing_test")).concat(this.model.GetCategoriesByName(this.model.CurrentLessonPlan.Name));
            }
            else {
                this.topicCategories = this.topicCategories.concat(this.model.GetTopics());
            }

            //reader texts in typesy
            this.bookLvlCategories = this.model.GetReadingTypes();
            this.bookCategories = this.model.GetLCCTypes();

            //vocab texts in typesy
            this.wordlistCategories = this.model.GetTopLevelWordlistCategories();
            this.wordlistSubCategories = this.wordlistCategories.find(category => category.Name == "Grades 1-10").SubCategories;
            this.selectedVocabExerciseType = this.vocabExerciseTypes[0];

            this.searchBoxDefaultText = this.model.GetUiTextByKey("PROMPT_SEARCH_EXERCISE").replace("{0}", this.model.GetNumberOfTexts().toString());
            this.zeroResultText = this.model.GetUiTextByKey("WARNING_ZERO_RESULTS");
            if (!this.forTypingTest) {
                this.currentTextId = this.model.CurrentUserData.CurrentText.Text_id;
                this.previewEmitter.next(this.model.CurrentUserData.CurrentText.Content);
            }
            this.doSearch = true;

            if (!this.forTypingTest) {
                let includeDef: boolean = this.model.GetUserPref("include_definitions") == "true";
                this.includeDefinitions = this.model.GetUserPref("include_definitions") == "" ? true : includeDef;
            }
        }

        this.zeroResultsView.init("noInternet", null, this.zeroResultText);
        if (this.forTypingTest) {
            this.browseSelectionChanged(this.topicCategories[1]); //set Typing Tests as the default category
        }
        else {
            this.getFirstLibraryItems();
        }
    }

    private getFirstLibraryItems():void {
        if(this.model.CurrentProduct.DoPreprocessing) {
            //TO DO
        }
        else if(this.model.CurrentProduct.DisplayVocab) {
            //TO DO
        }
        else {
            this.isInitSearch = true;
            this.pageIndex = 0;
            this.currentState = "searching";
            this.defaultHeaderText = "Online Exercises"; //this.model.GetUiTextByKey("LBL_ONLINE_LIBRARY");

            let defaultTexts = this.model.GetDefaultTexts(true);
            console.log("DEFAULT TEXTS: ", defaultTexts);
            if(defaultTexts && defaultTexts.length > 0) {
                this.GetDefaultProxyTexts(null);
            }
            else {
                console.log("GetTextsTable");
                this.model.GetTextsTable(this.GetDefaultProxyTexts, this.GetDefaultProxyTextsFailed);
            }

            this.searchBoxDefaultText = this.model.GetUiTextByKey("PROMPT_SEARCH_EXERCISE").replace("{0}", this.model.GetNumberOfTexts().toString());
        }
    }

    private GetDefaultProxyTexts = (event:TextsTableEvent) => {
        console.log("GetDefaultProxyTexts");
        if(event) {
            event.target.removeEventListener(TextsTableEvent.TEXTS_RETRIEVED, this.GetDefaultProxyTexts);
            event.target.removeEventListener(TextsTableEvent.TEXT_RETRIEVAL_FAILED, this.GetDefaultProxyTextsFailed);
        }

        //TO DO
        //clearTimeout(searchInputTimeoutId);
        this.updateSessionCache();
        this.model.SearchTexts(this.tempSearchWord, this.numberOfItems, this.pageIndex, this.tempSearchCode, this.isInitSearch, this.searchSession, this.functionGetUserText, this.textsError, this.isReaderView);
    }

    private updateSessionCache():void {
        if(this.searchSession) {
            this.searchSession.dispose();
        }
        this.searchSession = new SearchTextSessionCache();

        if(this.userAndSharedTexts.length > 0) {
            for(let text of this.userAndSharedTexts) {
                if(text instanceof SharedProxyText) {
                    this.searchSession.addId(text.Text_id);
                }
                else if(text instanceof ProxyText) {
                    if(text.Text_id != null) {
                        this.searchSession.addId(text.Text_id);
                    }
                }
                /*else if(text instanceof ProxyWordlist) {
                    this.searchSession.addId(userBtn.Data.Wordlist_id);
                }
                else if(userBtn.Data is SharedProxyWordlist)
                {
                    if( (userBtn.Data as SharedProxyWordlist).Wordlist_id.HasValue() )
                        this.searchSession.addId(userBtn.Data.Wordlist_id.Value());
                }*/
            }
        }

        if(this.defaultTexts.length > 0) {
            for(let defaultText of this.defaultTexts) {
                if(this.model.CurrentProduct.DisplayVocab){
                    this.searchSession.addId(defaultText.Wordlist_id)
                }
                else{
                    this.searchSession.addId(defaultText.Text_id);
                }
            }
        }
    }

    private GetDefaultProxyTextsFailed = (event:TextsTableEvent) => {
        event.target.removeEventListener(TextsTableEvent.TEXTS_RETRIEVED, this.GetDefaultProxyTexts);
        event.target.removeEventListener(TextsTableEvent.TEXT_RETRIEVAL_FAILED, this.GetDefaultProxyTextsFailed);
    }

    private functionGetUserText = (event:TextsSearchEvent) => {
        if(event) {
            event.target.removeEventListener(TextsSearchEvent.TEXTS_SEARCHED, this.functionGetUserText);
            event.target.removeEventListener(TextsSearchEvent.TEXT_SEARCHED_FAILED, this.textsError);
            console.log("USER TEXTS: ", event.UserTexts);
            console.log("SHARED TEXTS: ", event.SharedTexts);
            console.log("DEFAULT TEXTS: ", event.DefaultTexts);
        }

        if(this.currentState == "removed") return;
        this.currentState = "default";

        if(event.type == TextsSearchEvent.TEXTS_SEARCHED) {
            this.searchSession = event.SearchSession;
        }
        //showMoreBtn.visible = false;
        let success:boolean = false;
        let userTexts = [];
        if(event.UserTexts && event.UserTexts.length > 0) {
            userTexts = event.UserTexts;
            success = true;
        }

        let sharedTexts = [];
        if(event.SharedTexts && event.SharedTexts.length > 0) {
            sharedTexts = event.SharedTexts;
            success = true;
        }

        userTexts = userTexts.concat(sharedTexts);

        //if the current text is not a user text and it's the only text in My Library, then hide the My Library section
        this.hideMyLibrary = false;
        if(this.userAndSharedTexts.length + userTexts.length == 1 && this.model.CurrentUserData.CurrentText.User_id == null) {
            this.hideMyLibrary = true;
        }
        else {
            let currentText:any[] = [];            
            for(let i:number = 0; i<userTexts.length; i++) {
                if(userTexts[i].Text_id == this.model.CurrentUserData.CurrentText.Text_id) {
                    currentText = userTexts.splice(i, 1);
                    break;
                }
            }            
            if (this.model.CurrentUserData.CurrentText.Wordlist_id != null) {
                currentText = [];      
            }
            this.userAndSharedTexts = currentText.concat(this.userAndSharedTexts).concat(userTexts);
        }

        if(event.DefaultTexts && event.DefaultTexts.length > 0) {
            let defaultTexts = event.DefaultTexts;
            if(this.hideMyLibrary) {
                if(userTexts.length > 0) {
                    for(let i:number = 0; i<defaultTexts.length; i++) {
                        if(userTexts[0].Text_id == defaultTexts[i].Text_id) {
                            defaultTexts.splice(i, 1);
                            break;
                        }
                    }
                }
                this.defaultTexts = userTexts.concat(this.defaultTexts).concat(defaultTexts);
            }
            else {
                //remove current text only if NOT searching or NOT browsing
                if(this.inMyLibrary) {
                    for(let i:number = 0; i<defaultTexts.length; i++) {
                        if(defaultTexts[i].Text_id == this.model.CurrentUserData.CurrentText.Text_id){
                            defaultTexts.splice(i, 1);
                            break;
                        }
                    }
                }
                this.defaultTexts = this.defaultTexts.concat(defaultTexts);
            }

            success = true;
        }

        let numResults = 0;
        numResults += this.defaultTexts ? this.defaultTexts.length : 0;
        numResults += this.userAndSharedTexts ? this.userAndSharedTexts.length : 0;
        //numResults += event.UserTexts ? event.UserTexts.length : 0;
        //numResults += event.SharedTexts ? event.SharedTexts.length : 0;
        this.zeroResults = numResults == 0;

        this.pageIndex += success ? 1 : 0;
        this.calledAllTexts = this.pageIndex >= event.Number_Of_Pages;
        this.textsReceived();
    }

    private functionGetUserWordlists = (event: WordlistSearchEvent) => {
		console.log("TCL: LibraryView -> event", event)
        if(event) {
            event.target.removeEventListener(WordlistSearchEvent.WORDLISTS_SEARCHED, this.functionGetUserWordlists);
            event.target.removeEventListener(WordlistSearchEvent.WORDLISTS_SEARCHED_FAILED, this.wordlistsError);
            event.target.removeEventListener(WordlistSearchEvent.WORDLISTS_BROWSE, this.functionGetUserWordlists);
            event.target.removeEventListener(WordlistSearchEvent.WORDLISTS_BROWSE_FAILED, this.wordlistsError);
        }

        if(this.currentState == "removed") return;
        this.currentState = "default";

        let success: boolean = false;
        let userWordlists = [];
        if(event.UserWordlists && event.UserWordlists.length > 0) {
            userWordlists = event.UserWordlists;
            success = true;
        }

        let sharedWordlists = [];
        if(event.SharedWordlists && event.SharedWordlists.length > 0) {
            sharedWordlists = event.SharedWordlists;
            success = true;
        }

        userWordlists = userWordlists.concat(sharedWordlists);

        //if the current text is not a user text and it's the only text in My Library, then hide the My Library section
        this.hideMyLibrary = false;
        if(this.userAndSharedTexts.length + userWordlists.length == 1 && this.model.CurrentUserData.Current_wordlist_id == null) {
            this.hideMyLibrary = true;
        }
        else {
            let currentWordlist:any[] = [];
            for(let i:number = 0; i< userWordlists.length; i++) {
                if(userWordlists[i].Wordlist_id == this.model.CurrentUserData.Current_wordlist_id) {
                    currentWordlist = userWordlists.splice(i, 1);
                    break;
                }
            }
            this.userAndSharedTexts = currentWordlist.concat(this.userAndSharedTexts).concat(userWordlists);
        }

        if(event.DefaultWordlists && event.DefaultWordlists.length > 0) {
            let defaultWordlists = event.DefaultWordlists;
            if(this.hideMyLibrary) {
                if(userWordlists.length > 0) {
                    for(let i: number = 0; i < defaultWordlists.length; i++) {
                        //userWordlists[0] is the current exercise text
                        //if current exercise text is found in the default wordlists, remove it there 
                        //so there would be no duplicates of current selected text
                        if(userWordlists[0].Wordlist_id == defaultWordlists[i].Wordlist_id) {
                            defaultWordlists.splice(i, 1);
                            break;
                        }
                    }
                }
                this.defaultTexts = userWordlists.concat(this.defaultTexts).concat(defaultWordlists);
            }
            else {
                //remove current text only if NOT searching or NOT browsing
                if(this.inMyLibrary) {
                    for(let i:number = 0; i< defaultWordlists.length; i++) {
                        if(defaultWordlists[i].Wordlist_id == this.model.CurrentUserData.Current_wordlist_id) {
                            defaultWordlists.splice(i, 1);
                            break;
                        }
                    }
                }
                this.defaultTexts = this.defaultTexts.concat(defaultWordlists);
            }

            success = true;
        }

        let numResults = 0;
        numResults += this.defaultTexts ? this.defaultTexts.length : 0;
        numResults += this.userAndSharedTexts ? this.userAndSharedTexts.length : 0;
        this.zeroResults = numResults == 0;

        this.pageIndex += success ? 1 : 0;
        this.calledAllTexts = this.pageIndex >= event.NumberOfPages;
        this.textsReceived();
    }

    private textsReceived():void {
        UberReaderLoadingMessage.GetInstance().Hide();
        //scroller.visible = true;
        this.currentState = "default";
        this.newSearch = false;

        this.checkScroller();
    }

    private checkScroller():void {
        /*TO DO
        try{
            if(scroller.viewport.verticalScrollPosition >= (scroller.viewport.contentHeight - scroller.viewport.height))
            {
                var elementsInside:Number = userTextContainer.numElements + defaultTextContainer.numElements;
                if(!calledAllTexts && !zeroResults.visible && elementsInside > 0)
                {
                    showMoreBtn.visible = true;
                }
            }
            else
            {
                showMoreBtn.visible = false;
            }
        }catch(e:Error){
            trace(e.message);
        }*/
    }

    private textsError = (event:TextsSearchEvent) => {
        this.currentState = "default";

        if(event) {
            event.target.removeEventListener(TextsSearchEvent.TEXTS_SEARCHED, this.functionGetUserText);
            event.target.removeEventListener(TextsSearchEvent.TEXT_SEARCHED_FAILED, this.textsError);
            event.target.removeEventListener(TextsSearchEvent.TEXTS_BROWSE, this.functionGetUserText);
            event.target.removeEventListener(TextsSearchEvent.TEXTS_BROWSE_FAILED, this.textsError);
        }

        UberReaderLoadingMessage.GetInstance().Hide();

        if(this.userAndSharedTexts.length == 0 && this.defaultTexts.length == 0) {
            //TO DO scroller.visible = false;
        }
        else {
            this.checkScroller();
        }

        this.newSearch = false;

        if (event.ErrorMessage != ErrorMessage.CANCEL_LOADING) {
            this.model.showMdlAlertDialog(event.ErrorMessage, this.model.GetUiTextByKey("HTTPSERVICE_FAULT_TITLE"));
        }
    }

    private wordlistsError = (event: WordlistSearchEvent) => {
        this.currentState = "default";

        if(event) {
            event.target.removeEventListener(WordlistSearchEvent.WORDLISTS_SEARCHED, this.functionGetUserWordlists);
            event.target.removeEventListener(WordlistSearchEvent.WORDLISTS_SEARCHED_FAILED, this.wordlistsError);
            event.target.removeEventListener(WordlistSearchEvent.WORDLISTS_BROWSE, this.functionGetUserWordlists);
            event.target.removeEventListener(WordlistSearchEvent.WORDLISTS_BROWSE_FAILED, this.wordlistsError);
        }

        UberReaderLoadingMessage.GetInstance().Hide();

        if(this.userAndSharedTexts.length == 0 && this.defaultTexts.length == 0) {
            //TO DO scroller.visible = false;
        }
        else {
            this.checkScroller();
        }

        this.newSearch = false;

        if (event.ErrorMessage != ErrorMessage.CANCEL_LOADING) {
            this.model.showMdlAlertDialog(event.ErrorMessage, this.model.GetUiTextByKey("HTTPSERVICE_FAULT_TITLE"));
        }
    }

    protected viewMoreItems():void {
        if( this.currentState != "default" || this.calledAllTexts || this.newSearch || this.isMaxVerticalScroll ) {
            console.log("return: " + this.currentState + " >> " + this.calledAllTexts + " >> " + this.newSearch + " >> " + this.isMaxVerticalScroll);
            return;
        }

        UberReaderLoadingMessage.GetInstance().CancelPreviousCall();
        //showMoreBtn.visible = false;

        if(this.doSearch) {
            if(this.tempSearchWord == "" && this.model.CurrentProduct.DoPreprocessing) {
                return;
            }
            this.currentState = "searching";

            if(this.model.CurrentProduct.DisplayVocab || this.isVocabView) {
                this.updateSessionCache();
                this.model.SearchWordlists(this.tempSearchWord, this.numberOfItems, this.pageIndex, this.tempSearchCode, this.isInitSearch, this.searchSession, this.functionGetUserWordlists, this.wordlistsError);
            }
            else {
                this.updateSessionCache();
                this.model.SearchTexts(this.tempSearchWord, this.numberOfItems, this.pageIndex, this.tempSearchCode, this.isInitSearch, this.searchSession, this.functionGetUserText, this.textsError, this.isReaderView);

            }
        }
        else {
            if(this.browseParam == -1) {
                return;
            }
            this.currentState = "browsing";
            if(this.model.CurrentProduct.DisplayVocab || this.isVocabView)
            {
                this.model.BrowseWordlistsByCategory(this.pageIndex, this.numberOfItems, this.browseParam, this.functionGetUserWordlists, this.wordlistsError);
            }
            else
            {
                this.model.BrowseTexts(this.pageIndex, this.numberOfItems, this.browseParam, this.browseType, this.functionGetUserText, this.textsError, this.isReaderView);
            }
        }
    }

    public onScroll(event):void {
        let target:number = event.target.scrollTop;
        let maxScroll:number = event.target.scrollHeight - event.target.offsetHeight;
        if(target >= maxScroll) {
            this.viewMoreItems();
        }
    }

    public callSearch():void {
        console.log("callSearch called.");
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => this.searchClicked(), 300);
    }

    public searchClicked(event:KeyboardEvent=null):void {
        console.log("searchClicked called. ", this.searchInput, this.currentState);
        //if(event && event.keyCode != 13) return;

        clearTimeout(this.searchTimeout);

        if (this.searchInput.length == 0) {
            if (this.forTypingTest) {
                this.browseSelectionChanged(this.topicCategories[1]); //set Typing Tests as the default category
            }
            else {
                this.getFirstLibraryItems();
            }
        }
        else {
            this.zeroResults = false;
            if(this.currentState == "searching" || this.currentState == "browsing") {
                UberReaderLoadingMessage.GetInstance().CancelPreviousCall();
            }

            //can add codes here to do when still searching to prevent searching to continue
            var numOfBooks:number = 0;
            numOfBooks += this.defaultTexts ? this.defaultTexts.length : 0;
            numOfBooks += this.userAndSharedTexts ? this.userAndSharedTexts.length : 0;

            //if searching for the same string
            if((StringUtils.TrimString(this.searchInput).length == 0 || (this.tempSearchWord == this.searchInput)) && numOfBooks > 0) {
                return;
            }
            else if(numOfBooks == 0 && StringUtils.TrimString(this.searchInput).length == 0 && this.model.CurrentProduct.DoPreprocessing) {
                return;
            }

            /*showMoreBtn.visible = false;*/
            this.browseType = "";
            this.browseParam = -1;
            //browseCombo.selectedIndex1 = -1;
            //browseCombo.selectedIndex2 = -1;

            //clear all buttons and searched texts here
            this.clearLibrary();

            this.doSearch = true;
            this.newSearch = true;
            this.inMyLibrary = false;
            this.currentState = "searching";
            this.defaultHeaderText = "Online Exercises";

            this.pageIndex = 0;
            this.isInitSearch = false;
            this.calledAllTexts = false;
            this.tempSearchWord = this.searchInput;
            this.tempSearchCode = "all";
            this.scroller.nativeElement.scrollTop = 0;

            this.updateSessionCache();
            UberReaderLoadingMessage.GetInstance().Show("Loading Books..." );
            this.model.SearchTexts(this.tempSearchWord, this.numberOfItems, this.pageIndex, this.tempSearchCode, this.isInitSearch, this.searchSession, this.functionGetUserText, this.textsError, this.isReaderView);

            //resetScrollBar();
            //textSearchBox.setFocus();
        }
    }

    public clearSearch(): void {
        this.searchInput = "";
    }

    public codeSelected: any = this.topicCategories[0];
    public browseSelectionChanged(selectedItem:any):void {
        if (this.selectedVocabExerciseType != null) {
            this.searchBoxDefaultText = this.model.GetUiTextByKey("PROMPT_SEARCH_EXERCISE").replace("{0}", this.model.GetNumberOfWordlists().toString());
        }

        this.codeSelected = selectedItem;

        if( !(this.codeSelected instanceof Code) && !this.isVocabView) {
            if(!this.inMyLibrary) this.goToMyLibrary();
            this.browseType = "";
            this.browseParam = -1;
            return;
        }

        let tempBrowseType:string = "Topic"; //state == "group1" ? "Reading Level" : "Topic";
        let tempBrowseParam:number = -1;

        if (this.isVocabView) {
            tempBrowseParam = (selectedItem as Wordlist_Category).Wordlist_category_id;
            this.defaultHeaderText = (selectedItem as Wordlist_Category).Name;
        }
        else {
        //if(state == "group1" && selectedItem1 != null) {
            tempBrowseParam = this.codeSelected.Code_id;
            this.defaultHeaderText = this.codeSelected.Code_text;
        //}
        }

        if(tempBrowseParam == -1)
            return;

        if(tempBrowseType != this.browseType || tempBrowseParam != this.browseParam) {
            this.browseType = tempBrowseType;
            this.browseParam = tempBrowseParam;
        }
        else {
            return;
        }

        if(this.currentState == "searching" || this.currentState == "browsing") {
            UberReaderLoadingMessage.GetInstance().CancelPreviousCall();
        }

        this.clearLibrary();

        //showMoreBtn.visible = false;
        //to do defaultTextHeader.text = header;
        this.currentState = "browsing";
        this.searchInput = "";
        this.tempSearchCode = "";
        this.tempSearchWord = "";

        //do browse here
        this.inMyLibrary = false;
        this.doSearch = false;
        this.pageIndex = 0;
        this.calledAllTexts = false;
        this.scroller.nativeElement.scrollTop = 0;

        console.log("BROWSE PARAMS: ", this.browseParam, this.browseType);
        if (this.isVocabView) {
            this.model.BrowseWordlistsByCategory(this.pageIndex, this.numberOfItems, this.browseParam, this.functionGetUserWordlists, this.wordlistsError);
        }
        else {
            this.model.BrowseTexts(this.pageIndex, this.numberOfItems, this.browseParam, this.browseType, this.functionGetUserText, this.textsError, this.isReaderView);
        }
    }

    public goToMyLibrary():void {
        UberReaderLoadingMessage.GetInstance().Show("Loading...");
        this.searchBoxDefaultText = this.model.GetUiTextByKey("PROMPT_SEARCH_EXERCISE").replace("{0}", this.model.GetNumberOfTexts().toString());
        this.doSearch = true;
        this.inMyLibrary = true;
        this.clearLibrary();
        this.getFirstLibraryItems();
    }

    private clearLibrary():void {
        this.userAndSharedTexts = [];
        this.defaultTexts = [];
    }

    private editOrView: string = "";
    public handleBtnClick(itemClickedInfo:any):void {
        switch(itemClickedInfo.btnName) {
            case 'upgrade': break;
            case 'select': this.selectText(itemClickedInfo.data)
                           break;
            case 'location': break;
            case 'preview': break;
            case 'remove':  this.removeText(itemClickedInfo.data);
                            break;
            case 'view':    this.editOrView = "view";
                            this.editText(itemClickedInfo.data);
                            break;
            case 'edit':    this.editOrView = "edit";
                            this.editText(itemClickedInfo.data);
                            break;
            case 'clear': break;
            case 'share':   this.shareText(itemClickedInfo.data);
                            break;
            case 'delete':  this.deleteText(itemClickedInfo.data);
                            break;
        }
    }

    public item_clickHandler(event, text) {
        if (event) {
            event.stopPropagation();
        }

        if (text.Wordlist_id != null) {
            //let asVocabText = this.selectedVocabExerciseType.data == "vocab";
            this.model.GetWordlistDataAsText(text.Wordlist_id, this.includeDefinitions, this.getPreviewText, this.textSelectionError);
        }
        else if (this.selectedText == null || this.selectedText.Text_id != text.Text_id) {
            UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_RETRIEVING_TEXT"));
            this.model.getTextById(text.Text_id, this.getPreviewText, this.textSelectionError);
        }
    }

    public changeVocabExerciseType(): void {
        this.model.UpdateUserPref("include_definitions", this.includeDefinitions.toString(), true);
        if (this.selectedText) {
          if (this.selectedText.Wordlist_id != null) {
              //let asVocabText = this.selectedVocabExerciseType.data == "vocab";
              this.model.GetWordlistDataAsText(this.selectedText.Wordlist_id, this.includeDefinitions, this.getPreviewText, this.textSelectionError);
          }
        }
    }

    private getPreviewText = (event:UberReaderTextEvent) => {
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVED, this.getPreviewText);
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, this.textSelectionError);

        UberReaderLoadingMessage.GetInstance().Hide();

        //this.selectTextFromDialog(event._Text);
        //if (!this.forTypingTest) {
            this.currentTextId = event._Text.Text_id;
        //}
        this.selectedText = event._Text;
        this.textSelectedEmitter.emit(true);
        this.previewEmitter.next(this.selectedText.Content);
    }

    /** FUNCTIONS USED IN EXERCISES DIALOG **/
    public selectTextFromDialog(selectedItem: any): void {
        if(this.selectedText == selectedItem) {
            this.selectedText = null;
            this.textSelectedEmitter.emit(false);
        }
        else {
            this.selectedText = selectedItem;
            this.textSelectedEmitter.emit(true);
        }
    }

    public trainOnSelectedText(isGameLoaded: boolean = false): void {
        if(this.selectedText == null) {
            this.model.showMdlAlertDialog("Please select a text.", "", true);
        }
        else {
            //this.selectText(this.selectedText);
            this.textSelected(new UberReaderTextEvent(UberReaderTextEvent.TEXT_RETREIVED, this.selectedText), isGameLoaded);
        }
    }

    /** REMOVE A TEXT **/
    private removeText(itemSelected:any):void {
        this.model.showMdlConfirmDialog(this.model.GetUiTextByKey("WARNING_READ_REMOVE_TEXT_MESSAGE"), "",
                                        this.model.GetUiTextByKey("GEN_NO"), this.model.GetUiTextByKey("GEN_YES"), this.removeTextHandler, itemSelected.Text_id);
    }

    private removeTextHandler = (event:ClosePopUpEvent) => {
        if(event.target)
            event.target.removeEventListener(ClosePopUpEvent.CLOSE, this.removeTextHandler);

        if(event.detail == ClosePopUpEvent.OK) {
            let userText:User_Text = this.model.GetUserText(event.Params);
            userText.Show_in_library = false;
            this.model.UpdateUserText(event.Params);
            this.clearLibrary();
            this.getFirstLibraryItems();
        }
    }
    /** END LINE: REMOVE A TEXT **/

    /** SHARE A TEXT */
    public shareText(itemSelected:any):void {
        if(itemSelected instanceof ProxyText) {
            this.textToShare = itemSelected;
            UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_RETRIEVING_SHARE_SETTINGS"));
            this.model.GetTextShareSettings(this.textToShare.Text_id, this.textShareSettingsReceived, this.textShareSettingsError);
        }
    }

    private textShareSettingsReceived = (event:TextShareSettingsEvent) => {
        event.target.removeEventListener(TextShareSettingsEvent.TEXT_SHARE_SETTINGS_SUCCESS, this.textShareSettingsReceived);
        event.target.removeEventListener(TextShareSettingsEvent.TEXT_SHARE_SETTINGS_ERROR, this.textShareSettingsError);

        UberReaderLoadingMessage.GetInstance().Hide();

        let textToShare = this.textToShare;

        /* let shareTextDialog = this.mdlDialogService.showCustomDialog({
            providers:[{provide: "data", useValue: {
                            textToShare: textToShare,
                            usersShared: event.Users_shared,
                            groupsShared: event.Groups_shared,
                            groupsCanShareWith: event.Groups_can_share_with
                        }
                    }],
            component: ShareTextDialog,
            isModal: true,
            clickOutsideToClose: true,
            styles: {'width': '480px'}
        }); */

        let shareTextDialog = this.matDialog.open(ShareTextDialog, {
            data: { textToShare: textToShare, usersShared: event.Users_shared, groupsShared: event.Groups_shared, groupsCanShareWith: event.Groups_can_share_with },
            disableClose: true,
            width: '480px'
        });
  }

    private textShareSettingsError = (event:TextShareSettingsEvent) => {
        event.target.removeEventListener(TextShareSettingsEvent.TEXT_SHARE_SETTINGS_SUCCESS, this.textShareSettingsReceived);
        event.target.removeEventListener(TextShareSettingsEvent.TEXT_SHARE_SETTINGS_ERROR, this.textShareSettingsError);
        UberReaderLoadingMessage.GetInstance().Hide();
        this.model.showMdlAlertDialog(event.Error_message, this.model.GetUiTextByKey("HTTPSERVICE_FAULT_TITLE"));
    }

    /** END LINE: SHARE A TEXT */

    /** READ / TRAIN A TEXT **/
    private selectText(itemSelected:any):void {
        if(this.model.CurrentUserData.CurrentText != null && itemSelected.Text_id == this.model.CurrentUserData.CurrentText.Text_id) {
            //TO DO UberReaderAccessor.GetUberReader().changeScreenState(ScreenState.SPREEDER);
        }
        else {
            UberReaderLoadingMessage.GetInstance().Show(UberApplication.GetInstance().GetUiTextByKey("STAT_RETRIEVING_TEXT"));
            this.model.getTextById(itemSelected.Text_id, this.textSelected, this.textSelectionError);
        }
    }

    private textSelected = (event:UberReaderTextEvent, isGameLoaded: boolean = false) => {
        if (event.target) {
            event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVED, this.textSelected);
            event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, this.textSelectionError);
        }

        UberReaderLoadingMessage.GetInstance().Hide();

        if (event._Text != null) {
            //console.log(event._Text);
            if (!this.forTypingTest) {
                this.currentTextId = event._Text.Text_id;
                this.previewEmitter.next(event._Text.Content);
            }
            let previousTextID:number = this.model.CurrentUserData.CurrentText.Text_id;
            if (event._Text.Wordlist_id != null) {
                event._Text.IsVocabText = this.selectedVocabExerciseType.data == "vocab";
            }
            this.model.CurrentUserData.CurrentText = event._Text;

            if(this.model.CurrentProduct.DoPreprocessing) {
                if(this.currentState == "removed") {
                    //TO DO clearVariables();
                    this.clearLibrary();
                    this.getFirstLibraryItems();
                }
            }
            else {
                if(event._Text.User_id != null) {
                    let textRemoved:boolean = false;
                    for(let text of this.userAndSharedTexts) {
                        if( text.Text_id == event._Text.Text_id) {
                            let deleted = this.userAndSharedTexts.splice(this.userAndSharedTexts.indexOf(text), 1);
                            this.userAndSharedTexts = deleted.concat(this.userAndSharedTexts);
                            textRemoved = true;
                            //console.log(this.userAndSharedTexts);
                            break;
                        }
                        //delete previous current-text that is from the default set of texts
                        if( text.Text_id == previousTextID ) {
                            if(text.User_id == null) {
                                let deleted = this.userAndSharedTexts.splice(this.userAndSharedTexts.indexOf(text), 1);
                                this.defaultTexts = deleted.concat(this.defaultTexts);
                            }
                        }
                    }

                    //remove the old reference of the product text
                    /*for(var oldDefaultIndex:int = 0; oldDefaultIndex < userTextContainer.numElements; oldDefaultIndex++)
                    {
                        btn = userTextContainer.getElementAt(oldDefaultIndex) as UberReaderTextButton;
                        if(btn.Data is ProxyText && (btn.Data as ProxyText).User_id.HasValue() == false && ((btn.Data as ProxyText).Text_id != this.model.CurrentUserData.CurrentText.Text_id))
                        {
                            userTextContainer.removeElement(btn);
                            removeProductItemFromUserSearch(btn.Data.Text_id);
                            break;
                        }
                    }*/
                }
                else
                {
                    for(let defaultText of this.defaultTexts) {
                        if(defaultText.Text_id == event._Text.Text_id) {
                            if(this.inMyLibrary) {
                                if(this.userAndSharedTexts.length == 0) {
                                    let deleted = this.defaultTexts.splice(this.defaultTexts.indexOf(defaultText), 1);
                                    this.defaultTexts = deleted.concat(this.defaultTexts);
                                }
                                else {
                                    let deleted = this.defaultTexts.splice(this.defaultTexts.indexOf(defaultText), 1);
                                    this.userAndSharedTexts = deleted.concat(this.userAndSharedTexts);
                                }
                            }
                            //console.log(this.userAndSharedTexts);
                            break;
                        }
                    }

                    for(let text of this.userAndSharedTexts) {
                        //delete previous current-text that is from the default set of texts
                        if( text.Text_id == previousTextID ) {
                            if(text.User_id == null) {
                                let deleted = this.userAndSharedTexts.splice(this.userAndSharedTexts.indexOf(text), 1);
                                this.defaultTexts = deleted.concat(this.defaultTexts);
                            }
                        }
                    }
                    /*for(var oldDefaultIndex2:int = 0; oldDefaultIndex2 < userTextContainer.numElements; oldDefaultIndex2++)
                    {
                        btn = userTextContainer.getElementAt(oldDefaultIndex2) as UberReaderTextButton;
                        if(btn.Data is ProxyText && (btn.Data as ProxyText).User_id.HasValue() == false && ((btn.Data as ProxyText).Text_id != this.model.CurrentUserData.CurrentText.Text_id))
                        {
                            userTextContainer.removeElement(btn);
                            removeProductItemFromUserSearch(btn.Data.Text_id);
                            break;
                        }
                    }*/
                }
            }
        }


        if(event._Text) {
            let readTextMessage:string = "";
            let titleTextMessage:string = "";
            if(this.model.CurrentProduct.DoPreprocessing) {
                let button1Label:string = this.model.CurrentProduct.ReaderText == "Spreed" ? "Spreed" : "Courses";
                let button2Label:string = this.model.CurrentProduct.ReaderText == "Spreed" ? "Courses" : "Training";
                readTextMessage = this.model.CurrentProduct.ReaderText == "Spreed" ? this.model.GetUiTextByKey("WARNING_SPREEDER_TEXT_CHANGED") : this.model.GetUiTextByKey("WARNING_PREPROCESSING_TEXT_CHANGED");
                readTextMessage = readTextMessage.replace("{0}", event._Text.Title);
                titleTextMessage = this.model.CurrentProduct.ReaderText == "Spreed" ? this.model.GetUiTextByKey("WARNING_SPREEDER_TEXT_CHANGED_TITLE") : this.model.GetUiTextByKey("WARNING_PREPROCESSING_TEXT_CHANGED_TITLE");
                this.model.showMdlDialogWithChoices(readTextMessage, titleTextMessage, [
                    {
                        text: button1Label,
                        handler: () => {
                            this.readTextDialogResult(new ClosePopUpEvent(ClosePopUpEvent.CLOSE, ClosePopUpEvent.OK));
                        }
                    },
                    {
                        text: button2Label,
                        handler: () => {
                            this.readTextDialogResult(new ClosePopUpEvent(ClosePopUpEvent.CLOSE, ClosePopUpEvent.CANCEL));
                        }
                    }
                ]);
            }
            else
            {
                let hideCloseButton: boolean = false;
                if (this.gamesLibrary.CurrentTextChangeCallback != null) {
                    hideCloseButton = true;
                    readTextMessage = "You are now training with " + event._Text.Title + ". Press OK to restart the game.";
                }
                else {
                    readTextMessage = "You are now training with " + event._Text.Title + ". All games will be based on this exercise.";
                    //this.model.GetUiTextByKey("WARNING_NOT_PREPROCESSING_TEXT_CHANGED").replace("{0}", event._Text.Title);
                }
                titleTextMessage = this.model.GetUiTextByKey("WARNING_NOTPREPROCESSING_TEXT_CHANGED_TITLE");

                if(this.forGames || this.forTypingTest) {
                    this.model.IsRecommendedTextAvailable = true;
                    if (!isGameLoaded) {
                        this.model.showMdlAlertDialog(readTextMessage, titleTextMessage, false, "OK", this.gamesLibrary.CurrentTextChangeCallback, null, hideCloseButton);
                    }
                    else {
                        this.model.ResetTextExercise = true;
                        this.gamesLibrary.CurrentTextChangeCallback();
                    }
                }
                else {
                    this.model.showMdlConfirmDialog(readTextMessage, titleTextMessage, "Close", "Games", this.readTextDialogResult);
                }
            }
        }
    }

    private textSelectionError = (event:UberReaderTextEvent) => {
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVED, this.textSelected);
        //event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVED, textToLocateSelected);
        //event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVED, textToPreviewSelected);
        //event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVED, textToEditSelected);
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

    private readTextDialogResult = (event:ClosePopUpEvent) => {
        if(this.model.CurrentProduct.DoPreprocessing) {
            if(this.model.CurrentProduct.ReaderText == "Spreed") {
                switch(event.detail) {
                    case ClosePopUpEvent.OK:
                        //TO DO UberReaderAccessor.GetUberReader().changeScreenState(ScreenState.SPREEDER);
                        break;
                    case ClosePopUpEvent.CANCEL:
                        UberReader.GetInstance().SwitchScreenState(ScreenState.RUNNING_COURSE);
                        break;
                    case ClosePopUpEvent.EXTRA:
                        //do nothing
                        break;
                }
            }
            else {
                switch(event.detail) {
                    case ClosePopUpEvent.OK:
                        UberReader.GetInstance().SwitchScreenState(ScreenState.RUNNING_COURSE);
                        break;
                    case ClosePopUpEvent.CANCEL:
                        UberReader.GetInstance().SwitchScreenState(ScreenState.SHOWING_ACTIVITY);
                        break;
                    case ClosePopUpEvent.EXTRA:
                        //do nothing
                        break;
                }
            }
        }
        else {
            switch(event.detail) {
                case ClosePopUpEvent.OK:
                    UberReader.GetInstance().SwitchScreenState(ScreenState.SHOWING_ACTIVITY);
                    break;
                case ClosePopUpEvent.CANCEL:
                    // do nothing
                    break;
            }
        }
    }
    /** END LINE : READ / TRAIN A TEXT **/

    /** DELETE A TEXT: only user texts can be deleted **/
    private deleteText(itemSelected:any):void {
        this.textToDelete = itemSelected;

        if(itemSelected instanceof SharedProxyText) {
            if(itemSelected.Group_id != null)
                return;
            let dialogTitle:string = "";
            if(this.model.CurrentProduct.DoPreprocessing) {
                dialogTitle = this.model.GetUiTextByKey("UNSHARE_TEXT_TITLE");
            }
            else if(this.model.CurrentProduct.DisplayText) {
                dialogTitle = "Unshare Exercise"; //this.model.GetUiTextByKey("UNSHARE_EXERCISE_TITLE");
            }
            this.model.showMdlConfirmDialog(this.model.GetUiTextByKey("WARNING_TEXT_UNSHARE").replace("{0}", itemSelected.Title), dialogTitle,
                                                this.model.GetUiTextByKey("GEN_NO"), this.model.GetUiTextByKey("GEN_YES"), this.deleteShareAlertHandler);
        }
        else if(itemSelected instanceof ProxyText) {
            if(itemSelected.User_id == null)
                return;

            let dialogTitle:string = "", dialogMsg:string = "";
            if(this.model.CurrentProduct.DoPreprocessing) {
                dialogTitle = this.model.GetUiTextByKey("WARNING_DELETE_TEXT_TITLE");
                dialogMsg = this.model.GetUiTextByKey("WARNING_DELETE_TEXT_MESSAGE");

            }
            else if(this.model.CurrentProduct.DisplayText) {
                dialogTitle = "Delete Exercise"; //this.model.GetUiTextByKey("WARNING_DELETE_EXERCISE_TITLE");
                dialogMsg = "Are you sure you want to delete this exercise?"; //this.model.GetUiTextByKey("WARNING_DELETE_EXERCISE_MESSAGE");
            }
            this.model.showMdlConfirmDialog(dialogMsg, dialogTitle, this.model.GetUiTextByKey("GEN_NO"), this.model.GetUiTextByKey("GEN_YES"), this.deleteTextAlertHandler);
        }
    }

    private deleteShareAlertHandler = (event:ClosePopUpEvent) => {
        if (event.detail == ClosePopUpEvent.OK) {
            UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_UPDATING_SHARE_SETTINGS"));
            this.model.DeleteSharedObject(this.textToDelete.Shared_object_id, this.model.CurrentUser.User_id, this.sharedObjectDeleted, this.sharedObjectDeleteError);
        }
    }

    private sharedObjectDeleted = (event:UberApplicationEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.SHARED_OBJECT_DELETED, this.sharedObjectDeleted);
        event.target.removeEventListener(UberApplicationEventTypes.SHARED_OBJECT_DELETE_ERROR, this.sharedObjectDeleteError);

        UberReaderLoadingMessage.GetInstance().Hide();

        if(this.currentState == "removed") {
            //to do clearVariables();
            this.clearLibrary();
            this.getFirstLibraryItems();
        }
        else {
            for(let text of this.userAndSharedTexts) {
                if(text instanceof SharedProxyText && text.User_id != null && text.Shared_object_id == this.textToDelete.Shared_object_id) {
                    this.userAndSharedTexts.splice(this.userAndSharedTexts.indexOf(text), 1);
                    break;
                }
            }
            this.searchBoxDefaultText = this.model.GetUiTextByKey("PROMPT_SEARCH_EXERCISE").replace("{0}", this.model.GetNumberOfTexts().toString());
        }
    }

    private sharedObjectDeleteError = (event:UberApplicationEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.SHARED_OBJECT_DELETED, this.sharedObjectDeleted);
        event.target.removeEventListener(UberApplicationEventTypes.SHARED_OBJECT_DELETE_ERROR, this.sharedObjectDeleteError);
        UberReaderLoadingMessage.GetInstance().Hide();
        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("DELETE_SHARED_OBJECT_ERROR_MESSAGE"), this.model.GetUiTextByKey("DELETE_SHARED_OBJECT_ERROR_TITLE"));
    }

    private deleteTextAlertHandler = (event:ClosePopUpEvent) => {
        if (event.detail == ClosePopUpEvent.OK) {
            try {
                if (this.model.CurrentUserData.CurrentText != null && this.textToDelete.Text_id == this.model.CurrentUserData.CurrentText.Text_id) {
                    //allow deletion of text if it's a user created one
                    if(this.textToDelete.User_id != null) {
                        UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_DELETE_TEXT"));
                        //ID NO. 34895 is the id number of the default text of Typesy if user has not set any text yet.
                        //The default text's title with an ID of 34895 is "2, 3, 4 Letter Common Words (1)"
                        let newTextID: number = this.defaultTexts != null && this.defaultTexts.length > 0 ? this.defaultTexts[0].Text_id : 34895;
                        this.model.getTextById(newTextID, this.setNewCurrentText, this.textSelectionError);
                    }
                    /*else {
                        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("ERR_DELETE_CURRENT_TEXT_MESSAGE").replace("{0}", this.textToDelete.Title), this.model.GetUiTextByKey("ERR_DELETE_CURRENT_TEXT_TITLE"));
                    }*/
                }
                else {
                    UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_DELETE_TEXT"));
                    this.model.DeleteText(this.textToDelete.Text_id, this.deleteMyTextSuccess, this.deleteMyTextFailed);
                }
            }
            catch(Error) {
                console.log(Error);
                this.model.showMdlConfirmDialog(this.model.GetUiTextByKey("ERR_DELETING_TEXT_LIST_MESSAGE"), this.model.GetUiTextByKey("ERR_DELETING_TEXT_LIST_TITLE"),
                                                this.model.GetUiTextByKey("BTN_CANCEL_LABEL"), this.model.GetUiTextByKey("BTN_TRY_AGAIN"), this.deleteTextAlertHandler);
            }
        }
    }

    private deleteMyTextSuccess = (event:ProxyTextsEvent) => {
        console.log("SUCCESS");
        event.target.removeEventListener(ProxyTextsEvent.PROXY_TEXT_DELETED, this.deleteMyTextSuccess);
        event.target.removeEventListener(ProxyTextsEvent.PROXY_TEXT_DELETE_FAILED, this.deleteMyTextFailed);
        UberReaderLoadingMessage.GetInstance().Hide();

        if(this.currentState == "removed") {
            //TO DO clearVariables();
            this.clearLibrary();
            this.getFirstLibraryItems();
        }
        else {
            for(let text of this.userAndSharedTexts) {
                if(text instanceof ProxyText && text.Text_id == this.textToDelete.Text_id) {
                    this.userAndSharedTexts.splice(this.userAndSharedTexts.indexOf(text), 1);
                    //TO DO removeProductItemFromUserSearch(btn.Data.Text_id);
                    break;
                }
            }
            this.searchBoxDefaultText = this.model.GetUiTextByKey("PROMPT_SEARCH_EXERCISE").replace("{0}", this.model.GetNumberOfTexts().toString());
        }

        this.currentTextId = this.model.CurrentUserData.CurrentText.Text_id;
        this.selectedText = this.model.CurrentUserData.CurrentText;
        this.previewEmitter.next(this.selectedText.Content);
        this.textToDelete = null;
    }

    private deleteMyTextFailed = (event:ProxyTextsEvent) => {
        console.log("FAILED");
        event.target.removeEventListener(ProxyTextsEvent.PROXY_TEXT_DELETED, this.deleteMyTextSuccess);
        event.target.removeEventListener(ProxyTextsEvent.PROXY_TEXT_DELETE_FAILED, this.deleteMyTextFailed);

        UberReaderLoadingMessage.GetInstance().Hide();
        this.textToDelete = null;
        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("ERR_DELETING_USER_TEXT_MESSAGE"), this.model.GetUiTextByKey("ERR_DELETING_USER_TEXT_TITLE"));
    }

    private setNewCurrentText = (event:UberReaderTextEvent) => {
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVED, this.setNewCurrentText);
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, this.textSelectionError);
        console.log("setNewCurrentText", event);
        this.model.CurrentUserData.CurrentText = event._Text;
        if (!this.forTypingTest) {
            this.currentTextId = event._Text.Text_id;
            this.previewEmitter.next(event._Text.Content);
        }
        let currentText = this.defaultTexts.splice(0,1);
        if(this.userAndSharedTexts.length <= 1) {
            this.defaultTexts = currentText.concat(this.defaultTexts);
        }
        else {
            this.userAndSharedTexts = currentText.concat(this.userAndSharedTexts);
        }
        this.model.DeleteText(this.textToDelete.Text_id, this.deleteMyTextSuccess, this.deleteMyTextFailed);
    }
    /** END LINE: DELETE A TEXT **/

    /** EDIT OR VIEW A TEXT **/
    private editText(itemSelected:any):void {
        UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_RETRIEVING_TEXT"));
        this.model.getTextById(itemSelected.Text_id, this.textToEditSelected, this.textSelectionError);
    }

    private textToEditSelected = (event:UberReaderTextEvent) => {
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVED, this.textToEditSelected);
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, this.textSelectionError);

        UberReaderLoadingMessage.GetInstance().Hide();

        /* let editOrViewDialog = this.mdlDialogService.showCustomDialog({
            component: EditOrViewTextDialog,
            isModal: true,
            providers: [{provide: Text, useValue: event._Text}, {provide: "type", useValue: this.editOrView}],
            clickOutsideToClose: true,
            styles: {'width': '480px'}
        }); */

        /* editOrViewDialog.subscribe((dialogRef) => {
            dialogRef.onHide().subscribe((text:Text) => {
                if(text) {
                    if (this.selectedText != null && this.selectedText.Text_id == text.Text_id) {
                        this.selectedText = text;
                    }
                    this.updateTextButton(text);
                }
            });
        }); */

        let editOrViewDialog = this.matDialog.open(EditOrViewTextDialog, {
            data: { text: event._Text, type: this.editOrView },
            disableClose: true,
            width: '480px'
        });

        editOrViewDialog.afterClosed().subscribe((text: Text) => {
            if(text) {
                if (this.selectedText != null && this.selectedText.Text_id == text.Text_id) {
                    this.selectedText = text;
                }
                this.updateTextButton(text);
            }
        });
    }

    private updateTextButton = (text:Text) => {
        /*if(event.target) {
            event.target.removeEventListener(TextControlEvent.EDIT_TEXT, this.updateTextButton);
        }*/

        let editedTextId:number = text.Text_id; //event._Text.Text_id;
        let isUserText:boolean = text.User_id == this.model.CurrentUser.User_id; //event._Text.User_id == this.model.CurrentUser.User_id;
        let proxyTexts:ProxyText[] = this.model.GetUserProxyTexts();
        let sharedTexts:SharedProxyText[] = this.model.GetSharedProxyTexts();
        let newProxyText:any;

        if(isUserText) {
            for(let proxytext of proxyTexts) {
                if(proxytext.Text_id == text.Text_id) {
                    newProxyText = proxytext;
                    break;
                }
            }
        }
        else {
            for(let sharedtext of sharedTexts) {
                if(sharedtext.Text_id == text.Text_id) {
                    newProxyText = sharedtext;
                    break;
                }
            }
        }

        if(newProxyText) {
            let textFound:boolean = false;

            //user text
            for(let i:number = 0; i < this.userAndSharedTexts.length; i++){
                if(this.userAndSharedTexts[i].Text_id == newProxyText.Text_id) {
                    this.userAndSharedTexts[i] = newProxyText;
                    textFound = true;
                    console.log("EDITED!");
                    break;
                }
            }

            /*if(!textFound) {
                for each(var libraryBtn:UberReaderTextButton in libraryTextButtons)
                {
                    if(newProxyText is SharedProxyText &&  libraryBtn.Data is SharedProxyText)
                    {
                        if((newProxyText as SharedProxyText).Text_id.Value() == libraryBtn.Data.Text_id.Value())
                        {
                            libraryBtn.Data = newProxyText;
                            break;
                        }
                    }
                    else if(newProxyText is ProxyText &&  libraryBtn.Data is ProxyText)
                    {
                        if((newProxyText as ProxyText).Text_id == libraryBtn.Data.Text_id)
                        {
                            libraryBtn.Data = newProxyText;
                            break;
                        }
                    }
                }
            }*/
        }

        if(this.model.CurrentUserData.CurrentText && (this.model.CurrentUserData.CurrentText.Text_id == editedTextId)) {
            this.model.CurrentUserData.CurrentText = text;
        }
    }
    /** END LINE: EDIT OR VIEW A TEXT **/

    /** ADD TEXT FROM EXERCISES DIALOG */
    public setCurrentText(text: Text): void {
        let proxyText: ProxyText = ProxyText.fromLibrary(text);
        let tempArr: any[] = [];
        tempArr.push(proxyText);
        this.userAndSharedTexts = tempArr.concat(this.userAndSharedTexts);
        this.selectedText = text;
        this.currentTextId = text.Text_id;
        this.textSelectedEmitter.emit(true);
        this.previewEmitter.next(this.selectedText.Content);
        this.searchBoxDefaultText = this.model.GetUiTextByKey("PROMPT_SEARCH_EXERCISE").replace("{0}", this.model.GetNumberOfTexts().toString());
    }
    /** END LINE: ADD TEXT FROM EXERCISES DIALOG */

}
