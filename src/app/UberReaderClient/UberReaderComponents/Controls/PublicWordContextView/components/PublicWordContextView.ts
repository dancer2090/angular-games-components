import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { VisualComponent } from '../../../VisualComponent';
import { DropDownList } from '../../../SharedModules/shared-components-module/components/DropDownList';
import { Word } from '../../../../../UberReaderData/DataClasses/db/Word';
import { WordUsageExample } from '../../../../../UberReaderData/DataClasses/db/WordUsageExample';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { Word_User } from '../../../../../UberReaderData/DataClasses/db/Word_User';
import { WordToHtml } from '../../../UtilComponents/WordToHtml';
import { HtmlService } from '../../../../../UberReaderData/Utils/Services/HtmlService';
import { UberDataAccessRemoteService } from '../../../../../UberReaderData/UberDataAccess/uber-data-access-remote.service';
import { HistoryNavigation } from '../../../../../UberReaderData/uber.navigation.service';
import { UberApplicationEventTypes } from '../../../../../UberReaderData/Events/UberApplicationEventTypes';
import { UberReader } from '../../../../UberReader';
import { WordEvent } from '../../../../../UberReaderData/Events/WordEvent';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { UberReaderLoadingMessage } from '../../../Dialogs/UberReaderLoadingMessage';
import { ErrorMessage } from '../../../../../UberReaderData/Utils/ErrorMessage';
import { Word_PartOfSpeech } from '../../../../../UberReaderData/DataClasses/db/Word_PartOfSpeech';
import { Word_Sense } from '../../../../../UberReaderData/DataClasses/db/Word_Sense';
import { WordUsageExampleEvent } from '../../../../../UberReaderData/Events/WordUsageExampleEvent';
import { ClosePopUpEvent } from '../../../../../UberReaderData/Events/ClosePopUpEvent';
import { ScreenState } from '../../../../../UberReaderData/Utils/ScreenState';
import { UberApplicationEvent } from '../../../../../UberReaderData/Events/UberApplicationEvent';
import { LoginDialog2 } from '../../../Dialogs/LoginDialog2';

@Component({
    selector: 'public-context-view',
    styleUrls: ['./PublicWordContextView.css'],
    template:`
   
        <div id="wordcontextviewContainer">
            <div class="toolbarDiv" *ngIf="false">
                <div id="authorInfoLogo" class="toolbarDivLogo3" (click)="GoHome()"></div>
                <div class="toolbarDivInner">
                    <div *ngIf="backBtnLabel.length > 0" class="backBtn"><button id="btnBackAuthorInfo" (click)="backButtonClickHandler()">{{backBtnLabel}}</button></div>
                    <div id="btnsDiv">
                        <button (click)="profileOptionChanged('login')" id="loginButton" class="{{loggedIn == false ? '' : 'hide'}}">Login</button>
                        <button (click)="profileOptionChanged('signup')" id="signUpButton" class="{{loggedIn == false ? '' : 'hide'}}">Sign Up</button>
                    </div>
                </div>
            </div>
            
            <div class="blueHeadlineDiv">
                <div class="blueHeadlineInner"><label>{{wordText}}</label></div>
            </div>

            <div id="wordcontextviewMainContainer">
             <div id="wordcontextviewInnerWrap">

              <div id="wordcontextviewHeader">
                <div class="col">
                    <label class="{{ wordText?.length > 25 ? 'mainWordSmall':'mainWord' }}">{{ wordText }}</label>                    
                    <audio #soundPlayer (loadedmetadata)="loadedMeta(true)" (error)="loadedMeta(false)">
                        <source type="audio/mpeg">
                        Your browser does not support the audio tag.
                    </audio>
                    <button (click)="playSound()" class="{{ disableHear? 'playSoundBtnDisabled':'playSoundBtn' }}"></button>                    
					<label id="wordPartOfSpeech">{{ wordPartOfSpeech }}</label>
                </div>
                <div class="col">
                    <div id="wordDefinitionWrapper">
                     <label id="wordDefinition">{{ wordDefinitionString }}</label>
                     <drop-down-list #wordDefinitionsDropdown [dataList]="wordDefinitionArray" maxHeight="450px" (selectionChanged)="wordDefinitionSelectedChanged($event)" label="Main Definition" labelField="Definition" id="wordDefinitionDropdown">
                     </drop-down-list>
                    </div>
                     	<drop-down-list #wordGenresDropdown [dataList]="wordGenres" [multiSelect]="true" [withCheckBox]="true" [openOnHover]="false" (selectionChanged)="wordGenreSelectedChanged($event)" [label]="genresBtnLabel" labelField="fullText" id="genreDropDownGroup">
                </drop-down-list>
                </div>
             </div>
             <!--<div id="wordExampleBoxcontainer" class="cols">
                <div id="wordUsageExamplesContainer" *ngFor="let example of _wordUsageExamples">            
                    <word-usage-example [example]="example"></word-usage-example>           
                </div>
             </div>-->
             
			 <div id="masonryContainer">             
                <masonry>
                    <masonry-brick class="brick" *ngFor="let example of _wordUsageExamples">
                        <word-usage-example [example]="example"></word-usage-example> 
                    </masonry-brick>
                </masonry>
			 </div>   

            </div>     
          </div>
     </div>
    `
})

export class PublicWordContextView extends VisualComponent implements OnInit {
    @ViewChild('wordGenresDropdown', { static: true }) wordGenresDropdown:DropDownList;
    @ViewChild('wordDefinitionsDropdown', { static: true }) wordDefinitionsDropdown:DropDownList;
    @ViewChild('soundPlayer', { static: true }) soundPlayer:any;

    public backBtnLabel:string = "Back";
    public loggedIn:boolean = false;
    private _word:Word;
    public wordText:string;
    public wordDefinitionString:string;
    public wordDefinitionArray:any[] = [];
    public wordPartOfSpeech:string;
    public wordGenres:any[] = []; 
    public genresBtnLabel:string; 
    public _wordUsageExamples:WordUsageExample[] = [];
      
    private _model:UberApplication;
    
    private _wordUserRecord:Word_User;
    private previousPOSType:String = "";    //POS (Part Of Speech, e.g. Noun, Verb, Adjective)
    private prevPOSIdSelected:number = -1;
    private posIdSelected:number = -1; 
	private	finishedGettingDef:Boolean = false;
    public disableHear:boolean = true;
    private genresSelected:string[] = [];
    private _word2html:WordToHtml = new WordToHtml();    
    private searchedWord:string = "";
    
    constructor(private route: ActivatedRoute, private router:Router, private location:Location, 
                private htmlService:HtmlService, private ar:UberDataAccessRemoteService, private historyNavigator:HistoryNavigation ) {
        super();
        this._model = UberApplication.GetInstance();
        UberApplication.GetInstance().addEventListener(UberApplicationEventTypes.APP_STARTED, this.appReady);
    }

    private appReady = () =>
    {
        var genreCodes:string[] = this._model.GetUsageExampleGenres();
        var genreObject:any;
        for(let genre of genreCodes) {
            switch(genre) {
                case "SPOK":	genreObject = { fullText: "Spoken" }; 
                                break;
                case "FIC": 	genreObject = { fullText: "Fiction" };
                                break;
                case "NEWS": 	genreObject = { fullText: "News" };
                                break;
                case "ACAD": 	genreObject = { fullText: "Academic" };
                                break;
                case "MAG": 	genreObject = { fullText: "Magazine" };
            }
            genreObject.code = genre;
            this.wordGenres.push(genreObject);
        }
        this.genresBtnLabel = "Genres";//this._model.GetUiTextByKey('WORD_USAGE_GENRES_LABEL');

        /*this.route.params.forEach((params: Params) =>
        {                        
            if (params['wordString'] != null)
            {                                                                     
                this.searchedWord = params['wordString'];
                //this._model.SearchWord2(params['wordString'], this.searchWordSuccess, this.searchWordFailed);                
                //this.ar.SearchWordByText2(params['wordString'], this.searchWordSuccess, this.searchWordFailed);
                this.ar.SearchWordByText2(params['wordString']).subscribe(
                    (event:WordEvent) => {
                        this.searchWordSuccess(event);
                    },
                    (event:WordEvent) => {
                        this.searchWordFailed(event);
                    }
                );
            }        
        });

        this.route.params.forEach((params: Params) =>
        {                        
            if (params['wordString'] != null)
            {                                                                     
                this.searchedWord = params['wordString'];
                //this._model.SearchWord2(params['wordString'], this.searchWordSuccess, this.searchWordFailed);                
                this.ar.SearchWordByText2(params['wordString'], this.searchWordSuccess, this.searchWordFailed);
            }        
        });*/

        if (this.route.snapshot.paramMap.has('wordString'))
        {
            this.searchedWord = this.route.snapshot.paramMap.get('wordString');
            this.ar.SearchWordByText2(this.searchedWord, this.searchWordSuccess, this.searchWordFailed);
        }

        // this.route.params.forEach((params: Params) =>
        // {                        
        //     if (params['wordString'] != null)
        //     {                                                                     
        //         this.searchedWord = params['wordString'];
        //         //this._model.SearchWord2(params['wordString'], this.searchWordSuccess, this.searchWordFailed);                
        //         this.ar.SearchWordByText2(params['wordString'], this.searchWordSuccess, this.searchWordFailed);
        //     }        
        // });
    }

    ngOnInit() {                
        this.backBtnLabel = this.historyNavigator.getBackLabel();

        //UberReader.GetInstance().navBarVisible = false;
        this.loggedIn = UberApplication.GetInstance().hasLoggedIn;
        if (this.loggedIn == false)
        {
            var hasDefaultUser:boolean = UberReader.GetInstance()._dataStorageManager.HasDefaultUser();
            if(hasDefaultUser)
            {
                UberApplication.GetInstance().addEventListener(UberApplicationEventTypes.NEW_USER, this.checkLogInStatusAgain);
            }
        }
        
        if(this._model.hasStarted)
        {
            UberApplication.GetInstance().removeEventListener(UberApplicationEventTypes.APP_STARTED, this.appReady);
            this.appReady();
        }
    }

    private searchWordSuccess = (event:WordEvent) =>
	{
	    //event.target.removeEventListener(WordEvent.WORD_FOUND, this.searchWordSuccess);
		//event.target.removeEventListener(WordEvent.WORD_LOOKUP_ERROR, this.searchWordFailed);        
		UberReaderLoadingMessage.GetInstance().Hide();

        this.htmlService.setTitle(AppSettings.ProductName + " | " + event.word.Word_text);
        this.historyNavigator.setCurrentRouteLabel(event.word.Word_text);
        this.SetModel(event.word);
	}
			
	private searchWordFailed = (event:WordEvent) =>
	{
	    //event.target.removeEventListener(WordEvent.WORD_FOUND, this.searchWordSuccess);
		//event.target.removeEventListener(WordEvent.WORD_LOOKUP_ERROR, this.searchWordFailed);        
		UberReaderLoadingMessage.GetInstance().Hide();
				
		if (event.ErrorMessage == WordEvent.WORD_NOT_FOUND)
		{
		    // AlertDialog.show("Sorry we were unable to find the word '" + this.searchedWord + "'.", ErrorMessage.GET_UI_TEXT_ERROR_TITLE, false,1,
			//     this._model.GetUiTextByKey("BTN_OK_LABEL"));
            this._model.showMdlAlertDialog("Sorry we were unable to find the word '" + this.searchedWord + "'.", ErrorMessage.GET_UI_TEXT_ERROR_TITLE, true, this._model.GetUiTextByKey("BTN_OK_LABEL"));
		}
		else
		{
		    //AlertDialog.show(this._model.GetUiTextByKey("ERR_SERVER_LOOKUP_MESSAGE"), ErrorMessage.GET_UI_TEXT_ERROR_TITLE,true);
            this._model.showMdlAlertDialog(this._model.GetUiTextByKey("ERR_SERVER_LOOKUP_MESSAGE"), ErrorMessage.GET_UI_TEXT_ERROR_TITLE, true);
		}
	}

    public SetModel(word:Word):void {
        this.resetVariables();

        //Set word model and word to display        
        this._word = word;        
        this.wordText= word.Word_text;

        //Set sound to play for the sound button
        var firstChar:String = this._word.Word_text.charAt(0).toLowerCase();
		if (firstChar.charCodeAt(0) >= AppSettings.CharCode_a && firstChar.charCodeAt(0) <= AppSettings.CharCode_z) {
			this.soundPlayer.nativeElement.src = AppSettings.SoundLocationURL + firstChar + "/" + this._word.Word_text + ".mp3";
		}
		else {
			this.disableHear = true;
		}

        //Set the word's definitions
        this._wordUserRecord = this._model.LookupOrCreateWordUserRecord(this._word.Word_id);
        this.populateWordDefinition();
        
        if(this.wordDefinitionString) {
            this.wordDefinitionString = this.wordDefinitionString.slice(0, this.wordDefinitionString.length - 3); // to eliminate the last charaters " • "
        }
        else {
            this.wordDefinitionString = "";
        }

        //Set the word's POS (Part Of Speech)
        if(this.wordDefinitionArray.length > 0) {
            this.wordPartOfSpeech = this.wordDefinitionArray[0].Definition;
            this.prevPOSIdSelected = this.wordDefinitionArray[1].Word_pos_id;
            this.wordDefinitionsDropdown.setSelectedItem(this.wordDefinitionArray[1]);
        }
        else {
            this.wordPartOfSpeech = "---";
            this.prevPOSIdSelected = -1;
        }

        //Set the selected genres according to the user preferences (selected genres should be saved in a userPref)
        var selectedGenres:any[] = [];
        var genreUserPref:boolean;
        for(let genreObj of this.wordGenres) {
            genreUserPref = this._model.GetUserPref(genreObj.code) != 'false';
            this._model.UpdateUserPref(genreObj.code, genreUserPref.toString(), true);
            if(genreUserPref) {
                selectedGenres.push(genreObj);
                this.genresSelected.push(genreObj.code);                
            }
        }
        this.wordGenresDropdown.setSelectedItems(selectedGenres);	
        this.getWordUsageExamples();
    }

    private resetVariables():void {
        this.wordDefinitionString = "";
        this.wordDefinitionArray = [];
        this.previousPOSType = "";
		this.finishedGettingDef = false;
        this.posIdSelected = -1;
        this._wordUsageExamples = [];
    }

    private populateWordDefinition():void {
        var partOfSpeechArray:Word_PartOfSpeech[] = this._word.GetPosInOrder(this._wordUserRecord);
        
        for(let wordPartOfSpeech of partOfSpeechArray) {
            this.populateWordPartOfSpeech(this._word.GetPos(wordPartOfSpeech), wordPartOfSpeech);
        }
    }
    
    private populateWordPartOfSpeech(senses:Array<Word_Sense>, pos:Word_PartOfSpeech):void {
        if (senses.length > 0) {
            if(this.previousPOSType == "") {
                this.previousPOSType = pos.Type;
            }
            else if(pos.Type != this.previousPOSType) {
                this.finishedGettingDef = true;
            }
            
            this.wordDefinitionArray.push({Definition:pos.Type, isHeader:true});
            senses = this._word2html.shiftDefaultSenseToTop(senses,this._word);
            for(let sense of senses) {
                this.wordDefinitionArray.push(sense);
                if(!this.finishedGettingDef)
                    this.wordDefinitionString += sense.Definition + " • ";
            }
        }
    }
    
    public wordGenreSelectedChanged(selectedItems:any[]):void {
        var genresSelectedChanged:boolean = false;
        this.genresSelected = [];

        for(let genreObj of this.wordGenres) {
            if(selectedItems.indexOf(genreObj) != -1) {
                if(!genresSelectedChanged)
                    genresSelectedChanged = this._model.GetUserPref(genreObj.code) != 'true';

                this.genresSelected.push(genreObj.code);
                this._model.UpdateUserPref(genreObj.code, "true", true);
            }
            else {
                if(!genresSelectedChanged)
                    genresSelectedChanged = this._model.GetUserPref(genreObj.code) != 'false';

                this._model.UpdateUserPref(genreObj.code, "false", true);
            }   
        }

        if(!genresSelectedChanged) {
            return;
        }   
            
        this.getWordUsageExamples();
    }

    private getWordUsageExamples():void {
        if(this.genresSelected.length == 0)
            return;
        
        if(this.wordDefinitionArray.length > 0) {
            var item:Word_Sense = this.wordDefinitionsDropdown.getSelectedItem();            
            this.posIdSelected = item.Word_pos_id;
        }
        else {
            return;
        }        
        
        //check cache first if it already contains usage examples
        this._wordUsageExamples = this._model.GetWordUsageExamples(this._word.Word_id, this.posIdSelected, this.genresSelected);

        if(this._wordUsageExamples && this._wordUsageExamples.length > 0) {
        //    UberReaderLoadingMessage.GetInstance().Hide();
        }
        else {            
            this._wordUsageExamples = [];
            this._model.GetWordPosExamples(this.posIdSelected, this.usageExampleReceived, this.usageExampleFailed); 
        }
    }

    private usageExampleReceived = (event:WordUsageExampleEvent) => {
        event.target.removeEventListener(WordUsageExampleEvent.WORD_USAGE_RETRIEVED, this.usageExampleReceived);
        event.target.removeEventListener(WordUsageExampleEvent.WORD_USAGE_FAILED, this.usageExampleFailed);
        
        UberReaderLoadingMessage.GetInstance().Hide();
        
        var examples:WordUsageExample[] = event.Examples;
        
        if(examples && examples.length > 0) {
            if(this.posIdSelected == examples[0].Word_Pos_id) {
                this._model.SetWordUsageExamples(this._word.Word_id, this.posIdSelected, event.Examples);
                for(let example of examples) {
                    if(this.genresSelected.indexOf(example.Genre) != -1) {
                        this._wordUsageExamples.push(example);
                    }
                }
            }
        }
    }

    private usageExampleFailed = (event:WordUsageExampleEvent) => {
        event.target.removeEventListener(WordUsageExampleEvent.WORD_USAGE_RETRIEVED, this.usageExampleReceived);
        event.target.removeEventListener(WordUsageExampleEvent.WORD_USAGE_FAILED, this.usageExampleFailed);
        
        UberReaderLoadingMessage.GetInstance().Hide();
        //AlertDialog.show("Error getting usage examples. Do you want to try again?", "Error occurred", true, 2, "Try Again", "No", this.tryAgain);
        this._model.showMdlConfirmDialog("Error getting usage examples. Do you want to try again?", "Error occurred",
                "No", "Try Again", this.tryAgain);
    }
    
    private tryAgain = (event:ClosePopUpEvent) => {
        if(event.detail == ClosePopUpEvent.OK)
        {
            this.getWordUsageExamples();
        }
    }
    
    public wordDefinitionSelectedChanged(selectedItems:any[]):void {
        let item:Word_Sense = selectedItems[0];
        if (item != null && item["isHeader"] == null)
        {
            this._wordUserRecord.Default_sense_id = item.Word_sense_id;
            let wordUsers:Word_User[] = [];
            wordUsers.push(this._wordUserRecord);
            this._model.UpdateWordUsers(wordUsers);          
            this.wordPartOfSpeech = item.SpelledPos;

            //reset affected variables
            this.wordDefinitionString = "";
            this.wordDefinitionArray = [];
            this.previousPOSType = "";
            this.finishedGettingDef = false;

            //call this to rearrange the definitions; selected definition should rank first in the list of definitions
            this.populateWordDefinition(); 
        
            if(this.wordDefinitionString) {
                this.wordDefinitionString = this.wordDefinitionString.slice(0, this.wordDefinitionString.length - 3); // to eliminate the last charaters " • "
            }
            
            if(item.Word_pos_id != this.prevPOSIdSelected){
                this.getWordUsageExamples();
                this.prevPOSIdSelected = item.Word_pos_id;
            }
        }
    }

    public loadedMeta(val:boolean):void {
		this.disableHear = !val;
	}

    public playSound():void {
		this.soundPlayer.nativeElement.play();
	}

    public GoHome():void
    {
        UberReader.GetInstance().SwitchScreenState(ScreenState.PREP_ED_DISCOVER, true);
    }

    public profileOptionChanged(event):any
    {
        if(event == "login")
        {
            LoginDialog2.OpenScreenState = 0;//login
        }
        else if(event == "signup")
        {
            LoginDialog2.OpenScreenState = 1;//sign up
        }

        if(UberReader.GetInstance().CheckIfLoggedIn(false))
        {
            
        }
        else
        {
            UberApplication.GetInstance().addEventListener(UberApplicationEventTypes.NEW_USER, this.courseInfoLoginIn);
        }
    }

    private courseInfoLoginIn = (event:UberApplicationEvent) =>
    {
        event.target.removeEventListener(UberApplicationEventTypes.NEW_USER, this.courseInfoLoginIn);
        this.loggedIn = true;
    }

    private checkLogInStatusAgain = (event:UberApplicationEvent)=>
    {
        UberApplication.GetInstance().removeEventListener(UberApplicationEventTypes.NEW_USER, this.checkLogInStatusAgain);
        this.loggedIn = true;
    }

    backButtonClickHandler()
    {
        this.historyNavigator.back();
    }

    public dispose():void
    {
        this._model.removeEventListener(UberApplicationEventTypes.APP_STARTED, this.appReady);
        this._model.removeEventListener(WordUsageExampleEvent.WORD_USAGE_RETRIEVED, this.usageExampleReceived);
        this._model.removeEventListener(WordUsageExampleEvent.WORD_USAGE_FAILED, this.usageExampleFailed);

        this.searchWordSuccess = null;
        this.searchWordFailed = null;
    }
}