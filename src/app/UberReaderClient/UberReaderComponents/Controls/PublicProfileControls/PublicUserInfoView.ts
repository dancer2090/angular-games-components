import { Component, OnInit, Input } from '@angular/core';
import { VisualComponent } from '../../VisualComponent';
import { Location } from '@angular/common';
import { User } from '../../../../UberReaderData/DataClasses/db/User';
import { ProxyWordlist } from '../../../../UberReaderData/DataClasses/other/ProxyWordlist';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UberReaderStateData } from '../../../UberReaderStateData';
import { UberReader } from '../../../UberReader';
import { UberApplication } from '../../../../UberReaderData/UberApplication';
import { UserInfoEvent } from '../../../../UberReaderData/Events/UserInfoEvent';
import { UberReaderLoadingMessage } from '../../Dialogs/UberReaderLoadingMessage';
import { ScreenState } from '../../../../UberReaderData/Utils/ScreenState';
import { StartupAuthenticationEvent } from '../../../../UberReaderData/Events/StartupAuthenticationEvent';
import { StringUtils } from '../../../../UberReaderData/Utils/StringUtils';
import { AppSettings } from '../../../../UberReaderData/AppSettings';
import { UberApplicationEventTypes } from '../../../../UberReaderData/Events/UberApplicationEventTypes';
import { UberApplicationEvent } from '../../../../UberReaderData/Events/UberApplicationEvent';
import { DevUtils } from '../../../../UberReaderData/DevUtils';
import { HistoryNavigation } from '../../../../UberReaderData/uber.navigation.service';
import { HtmlService } from '../../../../UberReaderData/Utils/Services/HtmlService';
import { LoginDialog2 } from '../../Dialogs/LoginDialog2';

@Component({
    selector: 'public-user-profile',
    styleUrls: ['./PublicUserInfoView.css'],
    template: `
    <div *ngIf="_user != null" style="height:97%;" >
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
            <div class="blueHeadlineInner"><h1>{{_user.Name}}</h1></div>
        </div>
        
        <div class="publicUserContainer">
          <div class="publicUserInner">
            
                <div class="userImgContainer">
                   <img [src]="_userPicture" width="155" height="155"/>
                </div>

            <div>
                <div  class="wordListHeader">
                    {{wordlistLabel}}
                </div>

                <div>
                    <ul class="wordListUl">
                        <li *ngFor="let wordlist of _wordlists" (click)="OpenWordlist(wordlist)"><span>{{wordlist.Name}}</span></li>
                    </ul>
                </div>
            </div> 
          </div>
        </div> 
    </div>
    `
})

export class PublicUserInfoView extends VisualComponent implements OnInit
{
    public loggedIn:boolean = false;

    @Input('user') _user:User;
    @Input('wordlists') _wordlists:ProxyWordlist[] = [];

    //public _user:User;    
    public _userPicture:string = AppSettings.GetAssetLocation() + "assets/icon/square-default-pic.svg";
    //public _wordlists:ProxyWordlist[] = [];

    public wordlistLabel:string;

    private backBtnLabel:string = "Prep";

    constructor(private route: ActivatedRoute, private router: Router, private location:Location, private htmlService:HtmlService,
                private historyNavigator:HistoryNavigation)
    {
        super();
        DevUtils.ShowTime("PublicUserInfoView", "constructor");
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
        UberApplication.GetInstance().removeEventListener(UberApplicationEventTypes.NEW_USER, this.checkLogInStatusAgain);
        this.loggedIn = true;
    }

    ngOnInit()
    {
        this.backBtnLabel = this.historyNavigator.getBackLabel();
        DevUtils.ShowTime("PublicUserInfoView", "ngOnInit");
        this.loggedIn = UberApplication.GetInstance().hasLoggedIn;
        if (this.loggedIn == false)
        {
            var hasDefaultUser:boolean = UberReader.GetInstance()._dataStorageManager.HasDefaultUser();
            if(hasDefaultUser)
            {
                UberApplication.GetInstance().addEventListener(UberApplicationEventTypes.NEW_USER, this.checkLogInStatusAgain);
            }
        }

        //UberReaderLoadingMessage.GetInstance().Hide();	
        //this._user = event.user;
        //this._wordlists = event.Wordlists;
        if (this._user.Profile_pic != null && this._user.Profile_pic.length > 0)
        {
            this._userPicture = AppSettings.UserResourcesURL + this._user.User_id + "/profile/" + this._user.Profile_pic;
        }
        
        this.wordlistLabel = this.DisplayNamePosessive(this._user.Name) + " Wordlists";
        this.htmlService.setTitle(AppSettings.ProductName + " | " + this._user.Name);
        this.historyNavigator.setCurrentRouteLabel(this._user.Name);

        // this._user = null
        // this._userPicture = null;
        // this._wordlists = [];

        // let webUrl:string = this.route.snapshot.paramMap.get('web_url');
        // UberApplication.GetInstance().GetPublicUserProfileByWebUrl(webUrl, this.userInfoSucceeded, this.userInfoFailed);
    }

    //***** USER START **********/
    // private userInfoSucceeded = (event:UserInfoEvent) =>
    // {
    //     event.target.removeEventListener(UserInfoEvent.USER_INFO_RECEIVED, this.userInfoSucceeded);
    //     event.target.removeEventListener(UserInfoEvent.USER_INFO_FAILED, this.userInfoFailed);
        
    //     UberReaderLoadingMessage.GetInstance().Hide();	
    //     this._user = event.user;
    //     this._wordlists = event.Wordlists;
    //     this._userPicture = AppSettings.UserResroucesURL + event.user.User_id + "/profile/" + event.user.Profile_pic;
        
    //     this.wordlistLabel = this.DisplayNamePosessive(event.user.Name) + " Wordlists";
    //     this.htmlService.setTitle(AppSettings.ProductName + " | " + event.user.Name);
    //     this.historyNavigator.setCurrentRouteLabel(event.user.Name);
    // }

    public DisplayNamePosessive(displayName:string):string
    {
        if (StringUtils.endsWith(displayName, "s") || StringUtils.endsWith(displayName, "S"))
        {
            displayName =  displayName + "'";
        }
        else
        {
            displayName =  displayName + "'s";
        }
        
        return displayName;
    }

    /**
     * @private
     * @params event - course info event that captures failed server call
     * shows error message when calling get course info call
     */
    // private userInfoFailed = (event:UserInfoEvent) =>
    // {
    //     event.target.removeEventListener(UserInfoEvent.USER_INFO_RECEIVED, this.userInfoSucceeded);
    //     event.target.removeEventListener(UserInfoEvent.USER_INFO_FAILED, this.userInfoFailed);

    //     UberReaderLoadingMessage.GetInstance().Hide();
    // }

    //***** USER END **********/

    public OpenWordlist(wordlist:ProxyWordlist):void
    {
        this.router.navigate(['/wordlist', wordlist.Wordlist_id]);
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

    ngOnDestory():void
    {
        this.dispose();
    }

    public dispose():void
    {
        UberApplication.GetInstance().removeEventListener(UberApplicationEventTypes.NEW_USER, this.courseInfoLoginIn);
        this._wordlists = [];
        this._userPicture = null;
        this._user = null;
    }
}