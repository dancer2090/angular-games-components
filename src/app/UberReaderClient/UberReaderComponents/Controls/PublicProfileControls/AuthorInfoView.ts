import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { VisualComponent } from '../../VisualComponent';
import { ProxyCourse } from '../../../../UberReaderData/DataClasses/other/ProxyCourse';
import { Author } from '../../../../UberReaderData/DataClasses/db/Author';
import { DiscoverItemRenderer } from './DiscoverItemRenderer';
import { UberApplication } from '../../../../UberReaderData/UberApplication';
import { AppSettings } from '../../../../UberReaderData/AppSettings';
import { UberApplicationEvent } from '../../../../UberReaderData/Events/UberApplicationEvent';
import { AuthorInfoEvent } from '../../../../UberReaderData/Events/AuthorInfoEvent';
import { UberReaderStateData } from '../../../UberReaderStateData';

import { UberReaderLoadingMessage } from '../../Dialogs/UberReaderLoadingMessage';
import { UberReader } from '../../../UberReader';
import { ScreenState } from '../../../../UberReaderData/Utils/ScreenState';

import { StartupAuthenticationEvent } from '../../../../UberReaderData/Events/StartupAuthenticationEvent';
import { UserInfoEvent } from '../../../../UberReaderData/Events/UserInfoEvent';
import { UberApplicationEventTypes } from '../../../../UberReaderData/Events/UberApplicationEventTypes';
import { DiscoverScreenState } from '../PrepEdControls/DiscoverScreenState';
import { HistoryNavigation } from '../../../../UberReaderData/uber.navigation.service';
import { HtmlService } from '../../../../UberReaderData/Utils/Services/HtmlService';
import { LoginDialog2 } from '../../Dialogs/LoginDialog2';

@Component({
    selector: 'prepEd-author-info',
    styleUrls: ['./AuthorInfoView.css'],
    template: `
    <div *ngIf="_author != null" style="height:97%;">
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



        <div class="mdl-grid page-headline-container">
        <div class="mdl-cell mdl-cell--12-col page-headline-inner">

              <div class="mdl-grid page-headline-grid">
                <div class="mdl-cell mdl-cell--7-col fixed-header">
                    <h4 class="mdl-color-text--grey-600  page-headline marginb-none">{{_author.Name}}</h4> 
                    <label class="mdl-color-text--grey-600 mdl-typography--subhead label-headline">{{_author.Author_title}}</label>
                </div>
                <div class="mdl-cell mdl-cell--5-col mdl-typography--text-right">
        
                 <div class="coursesReviewsDiv">
                    <div class="columnInfo">
                        <h4 class="mdl-color-text--grey-600  page-headline marginb-none">Students</h4> 
                        <label class="mdl-typography--title mdl-color-text--grey-600 number-label">{{_author.Num_students}}</label>
                    </div>
                    <div class="columnInfo">
                        <h4 class="mdl-color-text--grey-600  page-headline marginb-none">Modules</h4> 
                        <label class="mdl-typography--title mdl-color-text--grey-600 number-label">{{proxyCourses.length}}</label>
                    </div>
                    <div class="columnInfo">
                        <h4 class="mdl-color-text--grey-600  page-headline marginb-none">Reviews</h4> 
                        <label class="mdl-typography--title mdl-color-text--grey-600 number-label">{{_author.Num_reviews}}</label>
                    </div>
                </div>


                </div>  
               </div>           
        </div>
      
        </div>
        <div #contentContainer class="authorInfoContainerMain">
            <!--div class="authorInfoHeader">
                <div class="blueHeadlineInner2">
                    <div class="nameTitleDiv">
                        <h1 class="lblauthorInfoName">{{_author.Name}}</h1><br/>
                        <label class="lblauthorInfoTitle">{{_author.Author_title}}</label>
                    </div>
                    <div class="coursesReviewsDiv">
                    <div class="columnInfo">
                        <label class="lblHeader">Students</label>
                        <label class="lblNum">{{_author.Num_students}}</label>
                    </div>
                    <div class="columnInfo">
                        <label class="lblHeader">Modules</label>
                        <label class="lblNum">{{proxyCourses.length}}</label>
                    </div>
                    <div class="columnInfo">
                        <label class="lblHeader">Reviews</label>
                        <label class="lblNum">{{_author.Num_reviews}}</label>
                    </div>
                </div>
            </div>
          </div-->

        
        <div class="authorInfoContainer">
            <div>
                <div class="authorImgBgContainer">
                    <div #imageContainer class="authorImgContainer">
                        <img [src]="authorPicture">
                    </div>
                    <div #authorBackground class="authorBgContainer" [innerHTML]="_author.Biography">
                    </div>
                </div>
                <div>
                    <div>
                        <!-- website and other links -->
                    </div>
                </div>
            </div>
            <div>
                <div *ngIf="proxyCourses?.length > 0" class="courseDescripHeader">
                    <h2>{{prepModuleTerm}} Taught By {{_author.Name}}</h2>
                </div>
                <div class="mdl-grid main-grid">
                    <div *ngFor="let proxyCourse of proxyCoursesDisplay" class="mdl-cell mdl-cell-2-col course-col">
                        <discover-item displayType="card" [data]="proxyCourse" [displayAuthor]="true" (tileClicked)="DiscoverItemClicked($event)"></discover-item>
                    </div>
                </div>
                <div *ngIf="currentMaxPage > 1" class="paginationContainer">
                    <button *ngIf="currentPage > 1" (click)="navigateToPage(currentPage - 1)">&lt;</button>
                    <button *ngIf="maxPages.indexOf(1) == -1" (click)="navigateToPage(1)" class="{{currentPage == 1 ? 'activePageBtn' : ''}}">1</button>               
                    <label *ngIf="maxPages.indexOf(1) == -1 && maxPages.indexOf(2) == -1">...</label>
                    <button *ngFor="let p of maxPages" (click)="navigateToPage(p)" class="{{currentPage == p ? 'activePageBtn' : ''}}">{{p}}</button>                    
                    <button *ngIf="currentPage < currentMaxPage" (click)="navigateToPage(currentPage + 1)">&gt;</button>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
        </div>
        
    </div>
    <!--<dialog-outlet></dialog-outlet>-->
    `
})

export class AuthorInfoView extends VisualComponent implements OnInit
{
    public loggedIn:boolean = false;
    
    @Input('author') _author:Author;
    @Input('proxyCourses') proxyCourses:ProxyCourse[] = [];

    public authorPicture:string = AppSettings.GetAssetLocation() + "assets/icon/square-default-pic.svg";
    private backBtnLabel:string = "Prep";
    public prepModuleTerm:string = AppSettings.PREP_MODULE_PLURAL_TERM;

    public proxyCoursesDisplay: ProxyCourse[] = [];
    public maxPages:number[] = [];
    public currentMaxPage:number = 0;
    public currentPage:number = 1;
    public itemsPerPage: number = 20;
    public maxDisplayedPages: number = 10;

    constructor(private route: ActivatedRoute, private router: Router, private location:Location, private htmlService:HtmlService, private historyNavigator:HistoryNavigation)
    {
        super();
    }

    private DiscoverItemClicked(proxyCourse:ProxyCourse):void
    {
        //this.router.navigate(['', proxyCourse.Web_url]);
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

    public navigateToPage(page: number) {
        this.currentPage = page;
        this.proxyCoursesDisplay = this.proxyCourses.slice((this.currentPage - 1) * this.itemsPerPage, this.itemsPerPage * this.currentPage);

        let centerPage:number = (this.maxPages[this.maxPages.length - 1] + this.maxPages[0]) / 2;
        if (this.currentPage > centerPage && this.maxPages[this.maxPages.length - 1] < this.currentMaxPage) {
            for (let i=0; i<this.currentPage - centerPage && this.maxPages.indexOf(this.currentMaxPage) == -1; i++) {
                this.maxPages.push(this.maxPages[this.maxPages.length - 1] + 1);
                this.maxPages.shift();
            }            
        }
        else if (this.currentPage <= centerPage && this.maxPages.indexOf(1) == -1) {
            for (let i=0; i<Math.floor(centerPage) - this.currentPage && this.maxPages.indexOf(1) == -1; i++) {
                this.maxPages.pop();
                this.maxPages.unshift(this.maxPages[0] - 1);
            }            
        }

        if (this.currentPage == 1) {
            this.maxPages.splice(0);
            for (let i=1; i<=this.currentMaxPage && i<=this.maxDisplayedPages; i++) {
                this.maxPages.push(i);
            }
        }
    }

    ngOnInit()
    {
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
        
        if (this._author.Profile_picture != 'https://www.preped.com/assets/authorpics/') {
            this.authorPicture = this._author.Profile_picture;
        }        
        //this._author = event.author;
        this.proxyCourses = this.proxyCourses.sort((a:ProxyCourse, b:ProxyCourse) => { return a.Course_id < b.Course_id ? 0 : 1 });
        this.htmlService.setTitle(this._author.Name + " | PrepEd");
        this.historyNavigator.setCurrentRouteLabel(this._author.Name);
        this.proxyCoursesDisplay = this.proxyCourses.slice((this.currentPage - 1) * this.itemsPerPage, this.itemsPerPage * this.currentPage);

        this.currentMaxPage = Math.ceil(this.proxyCourses.length / this.itemsPerPage);
        for (let i=1; i<=this.currentMaxPage && i<=this.maxDisplayedPages; i++) {
            this.maxPages.push(i);
        }

        // this._author = null
        // this.authorPicture = null;
        // this.proxyCourses = [];

        // let webUrl:string = this.route.snapshot.paramMap.get('web_url');
        // UberApplication.GetInstance().GetAuthorInfoByWebUrl(webUrl, this.authorInfoSucceeded, this.authorInfoFailed);  
        
        // this.route.params.forEach((params: Params) =>
        // {
        //     let webUrl:string = params['web_url']; // (+) converts string 'id' to a number
        //     UberApplication.GetInstance().GetAuthorInfoByWebUrl(webUrl, this.authorInfoSucceeded, this.authorInfoFailed);       
        // });
    }
    
    //***** AUTHOR START **********/

    /**
     * @private
     * @params event - event object passed from GetCourseInfo
     * repopulates components from new proxy course from server
     */
    // private authorInfoSucceeded = (event:AuthorInfoEvent) =>
    // {
    //     event.target.removeEventListener(AuthorInfoEvent.AUTHOR_INFO_RECEIVED, this.authorInfoSucceeded);
    //     event.target.removeEventListener(AuthorInfoEvent.AUTHOR_INFO_FAILED, this.authorInfoFailed);
        
    //     UberReaderLoadingMessage.GetInstance().Hide();	

    //     this.authorPicture = event.author.Profile_picture;
    //     this._author = event.author;
    //     this.proxyCourses = event.Proxy_courses.sort((a:ProxyCourse, b:ProxyCourse) => { return a.Course_id < b.Course_id ? 0 : 1 });
    //     this.htmlService.setTitle(this._author.Name + " | PrepEd");
    //     this.historyNavigator.setCurrentRouteLabel(this._author.Name);

    //     UberReaderStateData.GetInstance().currentCourseWebUrl != null ? "Prep" : "Browse";
    // }

    /**
     * @private
     * @params event - course info event that captures failed server call
     * shows error message when calling get course info call
     */
    // private authorInfoFailed = (event:AuthorInfoEvent) =>
    // {
    //     event.target.removeEventListener(AuthorInfoEvent.AUTHOR_INFO_RECEIVED, this.authorInfoSucceeded);
    //     event.target.removeEventListener(AuthorInfoEvent.AUTHOR_INFO_FAILED, this.authorInfoFailed);

    //     UberReaderLoadingMessage.GetInstance().Hide();
    // }
    // //***** AUTHOR END **********/

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

    private GoHome():void
    {
        UberReader.GetInstance().SwitchScreenState(ScreenState.PREP_ED_DISCOVER, true);
    }

    public dispose():void
    {
        this.proxyCourses = [];
        this.authorPicture = null;
        this._author = null;
    }
}