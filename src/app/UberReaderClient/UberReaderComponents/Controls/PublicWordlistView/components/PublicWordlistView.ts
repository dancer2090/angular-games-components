import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { VisualComponent } from '../../../VisualComponent';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { Wordlist } from '../../../../../UberReaderData/DataClasses/db/Wordlist';
import { Wordlist_Word } from '../../../../../UberReaderData/DataClasses/db/Wordlist_Word';
import { UberReader } from '../../../../UberReader';
import { UberApplicationEventTypes } from '../../../../../UberReaderData/Events/UberApplicationEventTypes';
import { UberReaderLoadingMessage } from '../../../Dialogs/UberReaderLoadingMessage';
import { UberApplicationEvent } from '../../../../../UberReaderData/Events/UberApplicationEvent';
import { WordlistEvent } from '../../../../../UberReaderData/Events/WordlistEvent';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { ScreenState } from '../../../../../UberReaderData/Utils/ScreenState';
import { HtmlService } from '../../../../../UberReaderData/Utils/Services/HtmlService';
import { HistoryNavigation } from '../../../../../UberReaderData/uber.navigation.service';
import { LoginDialog2 } from '../../../Dialogs/LoginDialog2';

@Component({
    selector: 'public-wordlist-view',
    styleUrls: ['./PublicWordlistView.css'],
    template: `
        <div *ngIf="selectedWordlist != null">
            <div style="height:97%;" >
                <div class="toolbarDiv" *ngIf="false">
                    <div id="authorInfoLogo" class="toolbarDivLogo3" (click)="GoHome()"></div>
                    <div class="toolbarDivInner">
                        <div *ngIf="backBtnLabel.length > 0" class="backBtn"><button id="btnBackAuthorInfo" (click)="backButtonClickHandler()">{{backBtnLabel}}</button></div>
                        <div class="btnsDiv">
                            <button (click)="profileOptionChanged('login')" id="loginButton" class="{{loggedIn == false ? '' : 'hide'}}">Login</button>
                            <button (click)="profileOptionChanged('signup')" id="signUpButton" class="{{loggedIn == false ? '' : 'hide'}}">Sign Up</button>
                        </div>
                    </div>
                </div>
                
                <div class="blueHeadlineDiv">
                    <div class="blueHeadlineInner"><label>{{selectedWordlist?.Name}}</label></div>
                </div>
                <div class="publicUserContainer">
                 <div class="publicUserInner">
                    <div>
                        <ul class="wordListUl">
                            <li *ngFor="let word of _words" (click)="OpenWordlistWord(word)"><span>{{word.Word_added}}</span></li>
                        </ul>
                    </div> 
                  </div>
                 </div>           
            </div>
        </div>
        `
})

export class PublicWordlistView extends VisualComponent implements OnInit
{
    public loggedIn:boolean = false;
    public _words:Wordlist_Word[];
    private _model:UberApplication;    
    public selectedWordlist:Wordlist = null;
    private backBtnLabel:string = "Back";

    private wordlistId:number;

    constructor(private router: Router, private route: ActivatedRoute, private location:Location, private htmlService:HtmlService, private historyNavigator:HistoryNavigation)
    {
        super();
        this._model = UberApplication.GetInstance();                
    }

    ngOnInit() 
    {                   
        if (this.route.snapshot.paramMap.has('wordlistId'))
        {
            this.wordlistId = parseInt(this.route.snapshot.paramMap.get('wordlistId'));
        }

        this.backBtnLabel = this.historyNavigator.getBackLabel();

        //UberReader.GetInstance().navBarVisible = false;
        if(this.wordlistId != null) {
            this.loggedIn = UberApplication.GetInstance().hasLoggedIn;
            if (this.loggedIn == false)
            {
                var hasDefaultUser:boolean = UberReader.GetInstance()._dataStorageManager.HasDefaultUser();
                if(hasDefaultUser)
                {
                    UberApplication.GetInstance().addEventListener(UberApplicationEventTypes.NEW_USER, this.checkLogInStatusAgain);
                }
                else
                {
                    this._model.GetPublicWordlistData(this.wordlistId, this.wordlistDataReceived, this.wordlistDataError);
                }
            }
            else {
                this._model.GetPublicWordlistData(this.wordlistId, this.wordlistDataReceived, this.wordlistDataError);
            }
        }
    }

    backButtonClickHandler()
    {
        this.historyNavigator.back();
    }

    /**
     * @public
     * @params course - proxy course that contains the details of the info to be shown
     * populates the components with data currently available from the passed proxy course
     */

    private checkLogInStatusAgain = (event:UberApplicationEvent)=>
    {
        this.loggedIn = true;
        this._model.removeEventListener(UberApplicationEventTypes.NEW_USER, this.checkLogInStatusAgain);    
        this._model.GetAllWordlistData(this.wordlistId, this.wordlistDataReceived, this.wordlistDataError);
    }

    private OpenWordlistWord(word:Wordlist_Word):void
    {        
        this.router.navigate(['/word', word.Word_added]);
    }

    private wordlistDataReceived = (event:WordlistEvent) => {
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_RECEIVED, this.wordlistDataReceived);
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_ERROR, this.wordlistDataError);	
        
        UberReaderLoadingMessage.GetInstance().Hide();
        if (event.Wordlist != null) {
            //go to next screen   
            this.selectedWordlist = event.Wordlist;
            this.htmlService.setTitle(AppSettings.ProductName + " | " + this.selectedWordlist.Name);
            this._words = event.Wordlist.WordlistWords;
            this.historyNavigator.setCurrentRouteLabel(this.selectedWordlist.Name);
        }
        else {
            //AlertDialog.show(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"),true);
            this._model.showMdlAlertDialog(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"), true);
        }   
    }

    private wordlistDataError = (event:WordlistEvent) => {
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_RECEIVED, this.wordlistDataReceived);
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_ERROR, this.wordlistDataError);
        
        UberReaderLoadingMessage.GetInstance().Hide();        
        //AlertDialog.show(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"),true);
        this._model.showMdlAlertDialog(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"), true);
	}

    private GoHome():void
    {
        UberReader.GetInstance().SwitchScreenState(ScreenState.PREP_ED_DISCOVER, true);
    }

    private profileOptionChanged(event):any
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

    public dispose():void
    {
        UberApplication.GetInstance().removeEventListener(UberApplicationEventTypes.NEW_USER, this.courseInfoLoginIn);
        this._words = [];
        this.selectedWordlist = null;
    }
}