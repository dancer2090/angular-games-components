import { Component, ViewChild, OnInit, HostListener, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, Params } from '@angular/router';
import { SideMenu } from './SideMenu';
import { UberReaderStateData } from "./UberReaderStateData";
import { UberApplication } from '../UberReaderData/UberApplication';
import { DataStorageManager } from '../UberReaderClient/DataStorageManager';
import { AppSettings } from '../UberReaderData/AppSettings';
import { BuildSettings } from '../UberReaderClient/BuildSettings';
import { User } from '../UberReaderData/DataClasses/db/User';
import { UserAuthenticatedEvent } from '../UberReaderData/Events/UserAuthenticatedEvent';
import { UberApplicationEventTypes } from '../UberReaderData/Events/UberApplicationEventTypes';
import { UberApplicationEvent } from '../UberReaderData/Events/UberApplicationEvent';
import { EventDispatcher } from '../UberReaderData/Events/EventDispatcher';
import { UITextEvent } from '../UberReaderData/Events/UITextEvent';
import { StartupAuthenticationEvent } from '../UberReaderData/Events/StartupAuthenticationEvent';
import { ProductInfoEvent } from '../UberReaderData/Events/ProductInfoEvent';
import { PasswordChangeDialog } from '../UberReaderClient/UberReaderComponents/Dialogs/PasswordChangeDialog';
import { UberReaderLoadingMessage } from '../UberReaderClient/UberReaderComponents/Dialogs/UberReaderLoadingMessage';
import { ScreenState } from '../UberReaderData/Utils/ScreenState';
import { NavigationBar } from './NavigationBar';
import { ProxyWordlist } from '../UberReaderData/DataClasses/other/ProxyWordlist';
import { DevUtils } from '../UberReaderData/DevUtils';
import { MenuItem } from './UberReaderComponents/UtilComponents/MenuComponent/MenuItem';
import { LoginDialog2 } from './UberReaderComponents/Dialogs/LoginDialog2';
import { PreferencesDialog } from './UberReaderComponents/Dialogs/shared-dialogs/user-menu-dialogs/preferences-dialog.component';
import { TypesyProfileDialog } from './UberReaderComponents/Dialogs/shared-dialogs/user-menu-dialogs/profile-dialog.component';
import { FeedbackDialog } from './UberReaderComponents/Dialogs/shared-dialogs/user-menu-dialogs/feedback-dialog.component';
import { UserSettingSyncEvent } from '../UberReaderData/Events/UserSettingSyncEvent';
import { UrlLoaderService } from './UberReaderComponents/SharedModules/shared-components-module/services/UrlLoader.service';
import { bugsnagClient } from '../app.module';
import { InvalidTokenEvent } from '../UberReaderData/Events/InvalidTokenEvent';
import { UserNotification } from '../UberReaderData/DataClasses/db/UserNotification';
import { MatDialog } from '@angular/material';
import { ProxyTypingTask } from '../UberReaderData/DataClasses/other/ProxyTypingTask';
import { MdlDialogService } from '@angular-mdl/core';

import { GoalsDialog } from './UberReaderComponents/SharedModules/goals-dialog-module/components/goals-dialog.component';
import { PlacementTestDialog } from './UberReaderComponents/Dialogs/shared-dialogs/user-menu-dialogs/placement-test-dialog.component';
import { ActivityService } from 'app/UberReaderActivities/activity.service';
import { take } from 'rxjs/operators';
import { UberDataAccessRemoteService } from 'app/UberReaderData/UberDataAccess/uber-data-access-remote.service';

@Component({
  selector: 'uber-reader',
  template:  `     
    <div>
        <div class="universal-notification-container" *ngIf="currentNotification != null">
            <div class="content">
                <label class="mdl-typography--subhead notification-text">{{ currentNotification.NotificationText }}</label>
                <button mdl-button *ngIf="currentNotification.Link != null && currentNotification.Link != 'refresh'" class="notification-buttons" (click)="notificationBtnClickHandler()">{{ currentNotification.ButtonText }}</button>
                <button mdl-button *ngIf="currentNotification.Link == 'refresh'" class="notification-buttons" (click)="pageReload()">Refresh</button>
            </div>
            <button mdl-button mdl-button-type="icon" class="close-notification" (click)="getNextNotification()">
                <mdl-icon>close</mdl-icon>
            </button>
        </div>

        <!--<div id="recommendRefresh" *ngIf="recommendRefresh && !hideRecommendRefresh">
            <label>We've made some updates and squashed a few bugs. <a href="" (click)="pageReload()">Reload the page</a> to see what we've improved.</label>
            <button (click)="hideRecommendRefreshHandler()">Hide</button>
        </div>-->
        
        <div id="uberReaderMainDiv">
            <div class="mdl-layout__drawer-right" [class.active]="activateRightDrawer">
                <mdl-list>
                    <img [class.hide]=" profilePicture == '' " src="{{profilePicture}}" class="rightMenuProfileImg"/>
                    <span [class.hide]=" profilePicture != '' " class="icon-account_circle_outline rightMenuProfileImg"></span>
                    <div class="rightMenuProfileName"></div>
                    <!-- <div class="rightMenuProfileDivider"></div> -->
                    <h6 class="page-headline sideMenuDisplayName">
                        {{ _model?.CurrentUser?.First_name }} {{ _model?.CurrentUser?.Last_name }}
                    </h6> 

                    <div style="width: 100%; border-top: 1px solid #ccc;">
                        <mdl-list-item *ngFor="let item of profileLoggedInItems" [class.hide]="!item.visible" (click)="profileListItemSelected(item.data)" [class.item--theme]="item.data == 'Theme'">
                            <mdl-list-item-primary-content>
                                <mdl-switch [class.hide]="item.data != 'Theme'" [(ngModel)]="isDarkTheme" style="margin-right: 5px; width: 50px;" (click)="$event.stopPropagation(); SetAppTheme(isDarkTheme ? 'Dark' : 'Light')" mdl-ripple></mdl-switch>
                                <span [class.hide]="item.data == 'Theme'" class="{{item.styleClass}} icons" style="margin-right:30px;"></span>                                
                                {{ item.label }}
                            </mdl-list-item-primary-content>
                            <mdl-list-item-secondary-action>
                                <span id="menuItemBadge" [mdl-badge]="item.unseen > 0 ? item.unseen : null"></span>
                            </mdl-list-item-secondary-action>
                        </mdl-list-item>
                    </div>
                    <div style="width: 100%; position: absolute; bottom: 0px; border-top: 1px solid #ccc;">
                        <mdl-list-item *ngFor="let item of extraMenus" (click)="profileListItemSelected(item.data)">
                            <mdl-list-item-primary-content>
                                <mdl-icon style="margin-right:30px;" *ngIf="item.icon != null">{{ item.icon }}</mdl-icon>
                                <span>{{ item.label }}</span>
                            </mdl-list-item-primary-content>
                        </mdl-list-item>
                    </div>
                </mdl-list>
            </div>
            <div class="mdl-layout__obfuscator-right" [class.active]="activateRightDrawer" (click)="openRightDrawer()"></div>

            <mdl-layout #mdlLayout="mdlLayout" mdl-layout-fixed-header mdl-layout-header-seamed class="{{navBarVisible ? '' : 'preped-layout-drawer-hide'}}">
                <mdl-layout-header class="{{ navBarVisible ? 'mdl-layout__header is-casting-shadow mdl-layout__header--seamed' : 'hide'}}" [class.header-transparent]="setHeaderToTransparent" [class.ipad--bottom-header]="isIPAD && !isAdminView">
                    <navigation-bar #navigationBar 
                        [visible]="navBarVisible" 
                        [loggedIn]="loggedIn" 
                        [showBackButton]="showBackButton" 
                        [backButtonLabel]="backButtonLabel" 
                        [backButtonTooltip]="backButtonTooltip"
                        [titleHeader]="titleHeader"
                        [breadcrumbs]="breadcrumbs"
                        [headerActionContent]="headerActionContent"                        
                        [showTitleHeader]="showTitleHeader"
                        [showHeaderActionContent]="showHeaderActionContent"
                        [showNavLinks]="showNavLinks" 
                        [showHomeButtonBar]="showHomeButtonBar" 
                        [showCourseRunnerActionButtons]="showCourseRunnerActionButtons"
                        [shareCourseStepButtonVisible]="shareCourseStepButtonVisible"
                        [showCalculator]="showCalculator"
                        [numOfCourses]="numOfCourses" 
                        [myPrepTooltip]="myPrepTooltip" 
                        [profileLoggedInItems]="profileLoggedInItems" 
                        [totalUnseenItems]="totalUnseenItems"
                        [numOfUnviewedWords]="numOfUnviewedWords"
                        [allowSignup]="allowSignup"
                        [userIsAdmin]="userIsAdmin"
                        [showProfilePicMenu]="showProfilePicMenu"
                        [isDesktopToolbar]="isDesktopToolbar"
                        [showHallOfFame]="showHallOfFame"
                        [hidePlaySection]="hidePlaySection"
                        [showSchoolLogo]="showSchoolLogo"
                        [isTypesyPublicProfile]="isTypesyPublicProfile"
                        [isNearpodBuild]="isNearpodBuild"
                        [transparent]="setHeaderToTransparent"
                        [isDarkTheme]="isDarkTheme"
                        [isAdminView]="isAdminView"
                        (changeScreen)="SwitchScreenState($event)" 
                        (sideMenuEmitter)="OpenSideMenu()"
                        (showRightDrawer)="openRightDrawer()"></navigation-bar>                    
                </mdl-layout-header>
                <mdl-layout-drawer *ngIf="showSideMenuDrawer" [class.student-drawer]="showSocialMediaIcons" [class.admin-drawer]="isAdminView">
                    <side-menu-bar #sideMenuBar [sideMenuItems]="activeSideMenuItems" [loggedIn]="loggedIn" [showHomeButtonBar]="showHomeButtonBar" (closeDrawer)="mdlLayout.closeDrawer()"></side-menu-bar>
                </mdl-layout-drawer>
                
                <mdl-layout-content [class.ipad--bottom-margin]="isIPAD && !isAdminView"> <!--#appContainer>-->
                    <router-outlet></router-outlet>
                    <div *ngIf="showSocialMediaIcons" class="section--footer-links">
                        <a href="https://www.facebook.com/typesy" target="_blank"><img src="{{ (isDarkTheme ? 'assets/icon/fb-dark.svg' : 'assets/icon/fb.svg') | resourceLoc }}" /></a>
                        <a href="https://twitter.com/typesyapp" target="_blank"><img src="{{ (isDarkTheme ? 'assets/icon/twitter-dark.svg' : 'assets/icon/twitter.svg') | resourceLoc }}" /></a>
                        <a href="https://www.instagram.com/typesyapp/" target="_blank"><img src="{{ (isDarkTheme ? 'assets/icon/instagram-dark.svg' : 'assets/icon/instagram.svg') | resourceLoc }}" /></a>
                        <a href="https://www.youtube.com/channel/UCgL6PjGOgk4YacdM0PbiICg" target="_blank"><img src="{{ (isDarkTheme ? 'assets/icon/youtube-dark.svg' : 'assets/icon/youtube.svg') | resourceLoc }}" /></a>
                    </div>
                </mdl-layout-content>
              
            </mdl-layout>
            
            
        </div>
        
    </div>
    `
})

export class UberReader extends EventDispatcher implements OnInit, AfterViewInit
{
    @ViewChild('mdlLayout', { static: true }) appContainer: any;    

    private isPublic: boolean = false;
    public _model:UberApplication;
    public LoggedIn:boolean = false;
    private loginInitialized:boolean = false;
    public recommendRefresh:boolean = false;
    public hideRecommendRefresh:boolean = false;    
    private _isDesktopToolbar:boolean = true;
    public set isDesktopToolbar(val:boolean) {
        this._isDesktopToolbar = val;
        this.updateDrawer();
    }

    public get isDesktopToolbar() {
        return this._isDesktopToolbar;
    }

    //wide up settings showNavLinks
    public showTitleHeader:boolean = false;
    public showHeaderActionContent:boolean = false;
    public showNavLinks:boolean = true;
    public showHomeButtonBar:boolean = true;
    public navBarVisible:boolean = true;
    public showBackButton:boolean = false;
    public showCourseRunnerActionButtons:boolean = false;
    public shareCourseStepButtonVisible:boolean = false;
    public showCalculator:boolean = false;
    public showProfilePicMenu: boolean = false;
    public backButtonLabel:string = "back";
    public backButtonTooltip:string = "";
    public isTypesyPublicProfile: boolean = false;
    public isNearpodBuild: boolean = false;
    public isAdminView: boolean;
    private _titleHeader:string = "";
    public set titleHeader(value: string) {
        setTimeout(() => this._titleHeader = value);
    }
    public get titleHeader() {
        return this._titleHeader;
    }
    private _breadcrumbs: any[] = [];
    public set breadcrumbs(value: any[]) {
        this._breadcrumbs = value;
    }
    public get breadcrumbs() {
        return this._breadcrumbs;
    }
    public headerActionContent:string = "";
    public showHallOfFame: boolean = true;
    public hidePlaySection: boolean = true;
    public showSchoolLogo: boolean = false;

    private URL_LOG_IN:boolean = false; 
    public numOfUnviewedWords:number = 0;
    public activateRightDrawer:boolean = false;
    public profilePicture:string = ""; //AppSettings.GetAssetLocation() + "assets/icon/profile_32_filled-grey.svg";
    public isDarkTheme: boolean = false;

    public typesyPublicProfileSideMenuItems: MenuItem[] = [
        {label: "Home", data: "typesy-public-profile-home"}, 
        {label: "For Schools", data: "typesy-public-profile-schools"}, 
        {label: "For Homeschool", data: "typesy-public-profile-homeschool"},  
        {label: "For Individuals", data: "typesy-public-profile-individuals"},
    ]

    public typesySideMenuItems:MenuItem[] = [
        {label: "Home", data: "Home", icon: "home", styleClass: "icon-home_outline"}, 
        {label: "Courses", data: "Courses", icon: "lightbulb_outline", styleClass: "icon-wb_incandescent_outline flip"}, 
        /*{label: "Play", data: "Play", icon: "keyboard"},  
        {label: "Exercises", data: "Exercises", icon: "library_books"},*/
        {label: "Stats", data: "Stats", icon: "show_chart", styleClass: "icon-assessment_outline"}
    ];

    public activeSideMenuItems:MenuItem[] = this.typesySideMenuItems;

    private userMenus:MenuItem[] = [
            {label: "MY NOTES", data: "Notes", icon: "description"}, 
            {label: "MY WISHLIST", data: "Wishlist", icon: "favorite"}, 
            {label: "MY STATS", data: "Stats", icon: "equalizer"},  
            //{label:"Live Chat", data: "Live Chat", icon: "chat"},
            //{label:"Submit Ticket", data: "Submit Ticket", icon: "send"}, 
            /*{label:"HELP", data: null, isHR: true, lockSelection: true, labelSrc: false, children: [ 
                {label:"Live Chat", data: "Live Chat"},
                {label:"Submit Ticket", data: "Submit Ticket"}
            ]},*/     
            {label: "PROFILE", data: "Profile", icon: "person"},
            {label: "ACTIVATE PURCHASE", data: "Activate Purchase", icon: "touch_app"}, 
            {label: "SIGN OUT", data: "Sign Out", icon: "power_settings_new"}
        ];

    public extraMenus:MenuItem[] = [];

    private mobileUserMenus:MenuItem[] = [
            {label: "MY NOTES", data: "Notes", icon: "description"}, 
            {label: "VOCAB", data: "Vocab", icon: "local_library"},
            {label: "MY WISHLIST", data: "Wishlist", icon: "favorite"}, 
            {label: "MY STATS", data: "Stats", icon: "equalizer"},
            //{label:"Live Chat", data: "Live Chat", icon: "chat"},
            //{label:"Submit Ticket", data: "Submit Ticket", icon: "send"},      
            /*{label:"HELP", data: null, isHR: true, lockSelection: true, labelSrc: false, children: [ 
                {label:"Live Chat", data: "Live Chat"},
                {label:"Submit Ticket", data: "Submit Ticket"}
            ]},*/      
            {label: "PROFILE", data: "Profile", icon: "person"},
            {label: "ACTIVATE PURCHASE", data: "Activate Purchase", icon: "touch_app"}, 
            {label: "SIGN OUT", data: "Sign Out", icon: "power_settings_new"}
    ];

    private typesyUserMenus:MenuItem[] = [
            {label: "DARK THEME", data: "Theme", styleClass: "for-switch", visible: true},
            {label: "PROFILE", data: "Profile", icon: "person", styleClass: "icon-person_outline", visible: true},
            {label: "GOALS", data: "Goals", icon: "flag", styleClass: "icon-flag_outline", visible: true},
            {label: "INITIAL TEST", data: "Initial Test", icon: "flag", styleClass: "icon-assignment_outline", visible: true},
            {label: "USE TYPESY", data: "Use Typesy", icon: "flag", styleClass: "icon2-typesy_outline", visible: false},
            {label: "PREFERENCES", data: "Preferences", icon: "settings", styleClass: "icon-settings_outline", visible: true},  
            {label: "HELP", data: "Help", icon: "help", styleClass: "icon-help_outline", visible: true},
            {label: "FEEDBACK", data: "Feedback", icon: "feedback", styleClass: "icon-feedback_outline", visible: true},
            //{label: "REVIEW", data: "Review", icon: "review", styleClass: "icon-chat_outline", visible: false},
            {label: "SCHOOLS", data: "Schools", icon: "school", styleClass: "icon-school_outline", visible: true},
            {label: "CHANGE CUSTOMER", data: "Change Customer", icon: "supervisor_account", styleClass: "icon-swap_outline", visible: false},            
            {label: "TYPESY COMMUNITY", data: "Typesy Community", icon: "icon2-forum_outline", styleClass: "icon2-forum_outline", visible: true},            
            {label: "SIGN OUT", data: "Sign Out", icon: "power_settings_new", styleClass: "icon-power_outline", visible: true}
        ];

    public profileLoggedInItems:MenuItem[];
    public totalUnseenItems:number = 0;
    public isMobile:boolean = false;
    public allowSignup: boolean = true;
    public userIsAdmin: boolean = false;
    public showSideMenuDrawer: boolean = true;
    public currentNotification: UserNotification;
    public setHeaderToTransparent: boolean = false;
    public isIPAD: boolean;
    public showSocialMediaIcons: boolean = true;
    private forceDisplayActivationScreen: boolean = false;
    
    public set loggedIn(val: boolean) {
        switch(BuildSettings.productId) {
            case AppSettings.TYPESY:
                if (val) {
                    this.activeSideMenuItems = this.typesySideMenuItems;
                }
                else {
                    this.activeSideMenuItems = this.typesyPublicProfileSideMenuItems;
                }
                this.showSideMenuDrawer = this.isPublic ? false : val;
                /* if (this.showSideMenuDrawer == false) {
                    let drawer: HTMLElement = document.querySelector(".mdl-layout__drawer-button .material-icons");        
                    if (drawer) {
                        drawer.style.display = 'none';                  
                    } 
                } */
                break;
        }
        this.LoggedIn = val;               
    }

    public get loggedIn():boolean {
        return this.LoggedIn;
    }

    public onActivate(event: {route: ActivatedRoute}) {        
        let trialkey = event.route.snapshot.queryParamMap.get("trialkey");
        console.log('onActivate onActivate onActivate:: ', event, trialkey);
        if (trialkey != null) {
            AppSettings.TrialEnabled = true;
            AppSettings.TrialKey = trialkey;
        }        
    }

    public userMenuChangedUpdate():void {
        this.totalUnseenItems = 0;
        for (let item of this.profileLoggedInItems) {
            switch (item.data) {
                case "Notes"    :   item.unseen = UberApplication.GetInstance().GetUnseenNotes();
                                    break;
                case "Wishlist" :   item.unseen = UberApplication.GetInstance().GetUnseenWishlistCourses();
                                    break;
                case "Vocab"    :   item.unseen = this._model.GetUserPref("num_of_unviewed_words") == "" || !this.isMobile ? 0 : parseInt(this._model.GetUserPref("num_of_unviewed_words"));
                                    break;
                default         :   item.unseen = 0;
            }            
            this.totalUnseenItems += item.unseen;
        }        
    }

    @ViewChild('navigationBar', { static: true }) navigationBar:NavigationBar;
    /**************** GUEST ****************/
    private fromGuestLogin:boolean = false;
    private loggedInSuccessCallback:() => void;
    CheckIfLoggedIn(goToHome:boolean, successCallback?:() => void):boolean
    {      
        //try to login
        this.loggedIn = UberApplication.GetInstance().hasLoggedIn || this.loggedIn;
        this.loggedInSuccessCallback = successCallback;
        console.log('CheckIfLoggedIn CheckIfLoggedIn :: ', this.loggedIn, this.loginInitialized);
        if(this.loggedIn == false)
        {
            this.fromGuestLogin = !goToHome; 
            if(this.loginInitialized)
            {
                this.showWindow();
            }
            else
            {
                UberReaderLoadingMessage.GetInstance().Show("Loading...", false);
                this.SetStartUpUI();
            }
        }

        return this.loggedIn;
    }
    /**************** END GUEST ****************/
    constructor(
        private route: ActivatedRoute, 
        private router: Router,
        private urlLoaderService:UrlLoaderService,
        private matDialog: MatDialog, 
        private activityService: ActivityService,
        private ar: UberDataAccessRemoteService
    ) {
        super();      

        this.isIPAD = AppSettings.ClientType == AppSettings.IPAD_ANGULAR;
        DevUtils.ShowTime("UberReader", "constructor");
        this._model = UberApplication.GetInstance();
        UberReader._instance = this;
        this._dataStorageManager = DataStorageManager.GetInstance();
        this.route.queryParamMap.subscribe(params => {
            let login = params.get('login');
            this.URL_LOG_IN = login!= null && parseInt(login) == 1;                        
        });        

        let routerEventsSubcription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                console.log('NavigationStart NavigationStart NavigationStart NavigationStart: ', event);
                if (event.url.indexOf('nearpod') != -1 || (event.url.indexOf('users') != -1 && event.url.indexOf('admin') == -1)) {
                    this.isPublic = true;
                }

                //WORKAROUND to force existing users to enter activation code for homeschool upgrade
                if (event.url.indexOf("activate") != -1) {
                    this.forceDisplayActivationScreen = true;
                }
                
                this.isAdminView = event.url.indexOf('admin') != -1;
                this.showSocialMediaIcons = event.url.indexOf("/courses/") == -1 && event.url.indexOf("/play/") == -1 && !this.isAdminView && !this.isPublic;
                this.showSideMenuDrawer = event.url.indexOf("/courses/") == -1 && event.url.indexOf("/play/") == -1;
                let drawerBtn = document.querySelector(".mdl-layout__drawer-button") as HTMLDivElement;
                if (drawerBtn && this.isIPAD) {                    
                    if (this.isAdminView) {
                        //drawerBtn.style.display = 'block !important';
                        let index = drawerBtn.className.indexOf(" button--menu-non-admin");
                        if (index != -1) {
                            drawerBtn.className = drawerBtn.className.substring(0, index + 1);
                        }                        
                        if (drawerBtn.className.indexOf(" button--menu-admin") == -1) {
                            drawerBtn.className += " button--menu-admin";
                        } 
                    }
                    else {
                        //drawerBtn.style.display = 'none !important';
                        let index = drawerBtn.className.indexOf(" button--menu-admin");
                        if (index != -1) {
                            drawerBtn.className = drawerBtn.className.substring(0, index + 1);
                        }                                                
                        if (drawerBtn.className.indexOf(" button--menu-non-admin") == -1) {                            
                            drawerBtn.className += " button--menu-non-admin";
                        }                      
                    }                    
                }
                //this.init();
                //routerEventsSubcription.unsubscribe();
            }
        });
        this.router.events.pipe(take(1)).subscribe(() => {
            console.log('zzzzzzzz ASFASSLDFKDSLFKDSFKDSAFKAS!! ! ! ');
            this.init();
        });        
        // this.route.queryParams.subscribe(params => {
        //     for(let p in params)
        //     {
        //         this.URL_LOG_IN = params['login'] == 1;
        //     }
        // });
        this._model.addEventListener(ProductInfoEvent.UPDATE_REQUIRED, this.updateRecommended);
    }
    
    private init()
    {        
        DevUtils.ShowTime("UberReader", "ngOnInit");
        console.log('this._model.CurrentUser:: ', this._model.CurrentUser, this._dataStorageManager.HasDefaultUser());       
        if (this._model.CurrentUser == null)
        {
            let hasDefaultUser:boolean = this._dataStorageManager.HasDefaultUser();
            if(hasDefaultUser && !this.isPublic)
            {                
                UberReaderLoadingMessage.GetInstance().Show("Loading...", false, true, false);
                this.SetStartUpUI();
            }
            else
            {
                this.GetStartupData();
            }
            //this.GetStartupData();
            this.loggedIn = false;
        }
        else
        {
            this.loggedIn = true;
            this.UserProfileUpdated();
            this.UpdateStatus();
            this.UpdateUserWordlists();
        }

        this.windowResized();     
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        DevUtils.ShowTime("UberReader", "AfterViewInit");
        this.UpdateAppBackground();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.windowResized();
        this.updateDrawer();               
    }

    private updateDrawer() {
        let drawer: HTMLElement = document.querySelector(".mdl-layout__drawer-button .material-icons");        
        if (drawer) {
            drawer.style.color = this.isDesktopToolbar ? '#616161' : '#ffffff';
            
        }
        /* if (this.isIPAD) {
            let drawerBtn = document.querySelector(".mdl-layout__drawer-button");
            if (drawerBtn) {
                drawerBtn.className += " ipad--button-position";
            }
        } */
    }

    private windowResized():void
    {
        switch(BuildSettings.productId) {
            case AppSettings.TYPESY:
                this.profileLoggedInItems = this.typesyUserMenus;
                break;
            case AppSettings.PREP_ED:
                if (window.innerWidth <= 980) {
                    this.profileLoggedInItems = this.mobileUserMenus;         
                    this.isMobile = true;   
                }
                else {
                    this.profileLoggedInItems = this.userMenus;
                    this.isMobile = false;
                }
                this.UpdateStatus();
                break;
        }
    }

    public UpdateAppBackground(): void {
        if(BuildSettings.productId == AppSettings.TYPESY) {
            if(this._model.GetUserPref("background_image") != "") {
                try {
                    this.appContainer.el.nativeElement.firstChild.style.backgroundImage = "url(\'" + this._model.GetUserPref("background_image") + "\')";
                }
                catch(e) {
                    //set to default if image is not found
                    this.appContainer.el.nativeElement.firstChild.style.backgroundImage = "url(\'" + AppSettings.GetAssetLocation() + "assets/icon/background-images/default-bg.svg\')";
                }
            }
            else {
                this.appContainer.el.nativeElement.firstChild.style.backgroundImage = "url(\'" + AppSettings.GetAssetLocation() + "assets/icon/background-images/default-bg.svg\')";
            }
        }
    }

    public SetAppTheme(_theme: string): void {
        console.log("SET APP THEME ", _theme);
        let theme: string = _theme == "" ? "Light" : _theme;
        this.isDarkTheme = theme == "Dark";
        this._model.UpdateUserPref("default_theme", theme, true);
        this.activityService.preferencesChangedSubject.next({type: 'theme', value: theme});

        let head = document.getElementsByTagName("head")[0];   
        let themeAsset = document.getElementById("themeAsset");
        if (theme == "Dark" && themeAsset == null) {                     
            let stylesheet = document.createElement("link");
            stylesheet.id = "themeAsset";
            stylesheet.rel = "stylesheet";
            stylesheet.href = AppSettings.GetAssetLocation() + "assets/css/dark_theme.css";
            head.appendChild(stylesheet);            
        }
        else if (theme == "Light" && themeAsset != null) {
            head.removeChild(themeAsset);
        }        
    }
  
    private static _instance:UberReader;
    public static GetInstance():UberReader
    {
        return UberReader._instance;
    }

    public _dataStorageManager:DataStorageManager;
    private _startupError:boolean = false;
    private _errorMessage:string = "";

    //private _ScreenState:number = -1;
    private GetStartupData():void
    {
        this._model.GetStartupData(this.startupDataReceived, this.errorReceivingStartupData);
    }

    private isGetStarupDataCalled:boolean = false;
    private errorReceivingStartupData = (event:ProductInfoEvent) =>
    {
        if(this.isGetStarupDataCalled)
        {
            event.target.removeEventListener(ProductInfoEvent.STARTUP_DATA_RECEIVED, this.startupDataReceived);
            event.target.removeEventListener(ProductInfoEvent.STARTUP_DATA_ERROR, this.errorReceivingStartupData);
            this._startupError = true;
            UberReaderLoadingMessage.GetInstance().Hide();
        }
        else
        {
            setTimeout(() => {
                this._model.GetStartupData(this.startupDataReceived, this.errorReceivingStartupData);
            }, 1000);
            this.isGetStarupDataCalled = true;
        }
    }
    private startupDataReceived = (event:ProductInfoEvent) =>
    {
        event.target.removeEventListener(ProductInfoEvent.STARTUP_DATA_RECEIVED, this.startupDataReceived);
        event.target.removeEventListener(ProductInfoEvent.STARTUP_DATA_ERROR, this.errorReceivingStartupData);
        UberReaderLoadingMessage.GetInstance().Hide();       

        this._model.init(event.productInfo);
        //console.log('startupDataReceived this._model.UiTextLoaded(): ', this._model.UiTextLoaded());
        this.loginInitialized = this._model.UiTextLoaded();

        let userGrp = this._model.CurrentUserGroup;
        
        if(userGrp == null || userGrp.length == 0) {
            this._model.storeUserGroup(this._model.getRandomUserGroup());
        }

        let firstScreen:number = ScreenState.DEFAULT_VIEW;

        if(event.productInfo.DisplayQuestion)
        {
            firstScreen = ScreenState.PREP_ED_DISCOVER;
        }

        //a hack to check if you need to redirect
        //works mainly for sign out now
        let parse:string[] = document.URL.split('/'); 
        for(let route of this.router.config)
        {
            if(parse[parse.length - 1] == route.path && route.path != ":web_url")
            {
                this.SwitchScreenState(firstScreen, true);
                break;
            }
        }

        if(this.URL_LOG_IN)
        {
            this.URL_LOG_IN = false;
            LoginDialog2.OpenScreenState = 0;//login
            this.SwitchScreenState(ScreenState.PREP_ED_PROFILE);
        }

        console.log('event.productInfo.ProductId == AppSettings.TYPESY:: ', event.productInfo.ProductId == AppSettings.TYPESY, this.loginInitialized, this.isPublic);
        if(event.productInfo.ProductId == AppSettings.TYPESY) {
            setTimeout( () => {
                if(!this.loginInitialized && !this.isPublic) {
                    this.CheckIfLoggedIn(false);
                }
            }, 1000);
        }
    }
    
    private SetStartUpUI():void
    {
        this._model.GetUITexts(this.successReceivingUIText, this.errorReceivingUIText);
    }

    private isUITextCalled:boolean = false;
    private errorReceivingUIText = (event:UITextEvent) =>
    {
        if(this.isUITextCalled)
        {
            event.target.removeEventListener(UITextEvent.UI_TEXT_RECEIVED, this.successReceivingUIText);
            event.target.removeEventListener(UITextEvent.UI_TEXT_ERROR, this.errorReceivingUIText);
            this._startupError = true;
            this.showWindow();
        }
        else
        {
            setTimeout(() => {
                this._model.GetUITexts(this.successReceivingUIText, this.errorReceivingUIText);
            }, 1000);
            this.isUITextCalled = true;
        }
    }

    private successReceivingUIText = (event:UITextEvent) =>
    {
        event.target.removeEventListener(UITextEvent.UI_TEXT_RECEIVED, this.successReceivingUIText);
        event.target.removeEventListener(UITextEvent.UI_TEXT_ERROR, this.errorReceivingUIText);
        this.showWindow();
    }

    private showWindow():void {
        console.log('showWindow showWindow showWindow!!');
        this.loginInitialized = true;
        let hasDefaultUser:boolean = this._dataStorageManager.HasDefaultUser();
        let defaultType:string = this._dataStorageManager.GetDefaultUserType();
        let _autoSignIn:boolean = false;
        let showSignUp: boolean = AppSettings.ShowSignUp;
        console.log('this.router.url', this.router.url, showSignUp);
        
        DevUtils.LogFunction("UberReader", "showWindow", [{"hasDefaultUser": hasDefaultUser, "defaultType": defaultType}]);
        switch(defaultType)
        {
            case "UseLogin":
                _autoSignIn = false;
                break;
            default:
                _autoSignIn = hasDefaultUser;
        }        

        //Removed Auto Sign-in for Clever/Classlink users 
        if(!this.forceDisplayActivationScreen && showSignUp == false && ((_autoSignIn && defaultType != "Clever" && defaultType != "Classlink") || (this.router.url.indexOf("navigate=admin") != -1 && (defaultType == "Clever" || defaultType == "Classlink"))))
        {   
            DevUtils.ShowTime("UberReader", "showWindow : autoSignIn || is admin and clever or classlink user");
            let loginDialog:LoginDialog2 = new LoginDialog2(this.ar);
            let autologInFail = (event:UberApplicationEvent) =>
            {
                DevUtils.DisplayError(event, "showWindow : autologInFail");
                event.target.removeEventListener(event.type, autologInFail);
                DataStorageManager.GetInstance().RemoveDefaultLogin(false);
                DataStorageManager.GetInstance().Restart();
                this._model.AutoLoginFailed();
                this._model.GetStartupData(this.startupDataReceived, this.errorReceivingStartupData);
            };
            loginDialog.addEventListener("AutoLogInFailed", autologInFail);  
            loginDialog.AutoSignIn(this.loginAuthenticatedHandler)
        }
        else
        {   
            UberReaderLoadingMessage.GetInstance().Hide();

            let loginScreenState = showSignUp ? 1 : LoginDialog2.OpenScreenState;
            /*if(BuildSettings.productId == AppSettings.TYPESY && !this.fromSignOut) {
                loginScreenState = 1;
            }*/

            /* let lDialog = this.mdlDialogService.showCustomDialog({
                    providers: [{provide: "data", useValue: {'state' : loginScreenState, 'successCallback': this.loggedInSuccessCallback, 'fromGuestLogin': this.fromGuestLogin}}],
                    component: LoginDialog2,
                    isModal: true,   
                    styles: {'width': '450px', 'min-height': '550px', 'padding': '0px'}
                });
            
            lDialog.subscribe((dialogRef) => {
                dialogRef.onHide().subscribe(data => {
                    if(data != null) {
                        this.loginAuthenticatedHandler(data);
                    }
                })
            }); */

            let loginDialog = this.matDialog.open(LoginDialog2, {                    
                data: { state: loginScreenState, successCallback: this.loggedInSuccessCallback, fromGuestLogin: this.fromGuestLogin, forceActivate: this.forceDisplayActivationScreen },
                disableClose: true,
                width: '450px',
                panelClass: 'login-dialog-panel-class'
            });

            loginDialog.afterClosed().subscribe(data => {                
                if(data != null) {
                    this.loginAuthenticatedHandler(data);
                }
            });
        }
        if(AppSettings.schoolBuild) {
            this.allowSignup = false;
        }
    }

    private loginAuthenticatedHandler = (event:StartupAuthenticationEvent) =>
    {
        DevUtils.LogFunction("UberReader", "loginAuthenticatedHandler", [event]);
        this._model.init(event.product);
        if(event.user.Force_Password_Change)
        {
            UberReaderLoadingMessage.GetInstance().Hide();
            /*let authenticatedHandler = this.loginAuthenticatedHandler2;
            let localEvent = event;
            DialogManager.AddPopup2(this.componentFactoryResolver, PasswordChangeDialog, function(dialog:PasswordChangeDialog)
            {
                let passwordChanged = (event:ClosePopUpEvent) =>
                {
                    event.target.removeEventListener(ClosePopUpEvent.CLOSE, passwordChanged);
                    authenticatedHandler(localEvent);
                }
                dialog.addEventListener(ClosePopUpEvent.CLOSE, passwordChanged);       
                dialog.init(event.user);
            });*/
            let passwordChanged = () => {
                this.loginAuthenticatedHandler2(event);
            }
            let dialogData = {
                user: event.user,
                closeCallback: passwordChanged
            };		
            /* let pDialog = this.mdlDialogService.showCustomDialog({
                providers: [{provide: "data", useValue: dialogData}],
                component: PasswordChangeDialog,
                isModal: true,
                styles: {'width': '450px', 'padding': '0px'}
            }); */

            let pDialog = this.matDialog.open(PasswordChangeDialog, {            
                data: dialogData,
                disableClose: true,
                width: '450px',
                panelClass: 'password-change-dialog'
            });
        }
		else
		{	
		    this.loginAuthenticatedHandler2(event);
		}
    }
    
    public UserProfileUpdated = () => 
    {
        if(this._model.CurrentUserData)
        {         
            if(this._model.CurrentUserData.ProfilePictureUrl)
            {
                this.profilePicture = this._model.CurrentUserData.ProfilePictureUrl;
            }
            else {
                this.profilePicture = "";
            }  
        }
        this.navigationBar.UpdateProfile();
    }
    
    public updateUnviewedWords() {
        this.numOfUnviewedWords = 0;
        this._model.UpdateUserPref('num_of_unviewed_words', "0", true);
    }

    private signedOut = (event:UserAuthenticatedEvent) => {
        this.navigationBar.organizationLogo = null;
        this.appContainer.el.nativeElement.firstChild.style.backgroundImage = "url(\'" + AppSettings.GetAssetLocation() + "assets/icon/background-images/default-bg.svg\')";
        this._model.removeEventListener(UserAuthenticatedEvent.SIGN_OUT, this.signedOut);  
        this.router.navigate(['/home']);
    }
    
    private loginAuthenticatedHandler2 = (event:StartupAuthenticationEvent) =>
    {   
        DevUtils.LogFunction("UberReader", "loginAuthenticatedHandler2", [event]);
        UberReaderLoadingMessage.GetInstance().Hide();            
        this.loggedIn = true;

        let firstScreen:number = ScreenState.DEFAULT_VIEW;
        
        console.log('event.user asdf asdfadsf: ', event.user);
        this.SetCurrentUser(event.user);
        
        this.getNextNotification();
        this.setupTypesyNavigationBar();
        this.setupTypesyUserMenu();
        this.UserProfileUpdated();
        this.UpdateStatus();
        this.UpdateUserWordlists();
        this.navigationBar.CreateMenu();
        this.UpdateAppBackground();
        this.SetAppTheme(this._model.GetUserPref("default_theme"));
        this.checkLiveClassPause();

        bugsnagClient.user = event.user;
        bugsnagClient.metaData = {
            BuildSettings: BuildSettings.toJson()     
        };
        
        this.numOfUnviewedWords = this._model.GetUserPref("num_of_unviewed_words") == "" ? 0 : parseInt(this._model.GetUserPref("num_of_unviewed_words"));
        this._model.UpdateUserPref('num_of_unviewed_words', this.numOfUnviewedWords.toString(), true);

        this._model.addEventListener(UserAuthenticatedEvent.SIGN_OUT, this.signedOut);
        this._model.addEventListener(InvalidTokenEvent.INVALID_TOKEN, this.invalidTokenHandler);
        this._model.addEventListener(InvalidTokenEvent.TOKEN_INVALIDATED, this.invalidTokenHandler);
        this._model.addEventListener(UberApplicationEventTypes.PROFILE_PIC_LOADED, this.UserProfileUpdated);
        this._model.addEventListener(UberApplicationEventTypes.UPDATE_STATUS, this.UpdateStatus);
        this._model.addEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, () => {
            this.setupTypesyNavigationBar();
            this.setupTypesyUserMenu();
            this.checkLiveClassPause();
        });
        this._model.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.ORGANIZATION_LOGO_LOADED));
        
        if(this._model.CurrentProduct.DisplayQuestion == true) //Prep Ed
        {
            firstScreen = ScreenState.PREP_ED_DISCOVER;
        }
        else if(this._model.CurrentProduct.DisplayText == true)
        {
            firstScreen = ScreenState.VIEWING_CHART;
        }

        if(!this.fromGuestLogin)
        {
            switch(firstScreen)
            {
                case ScreenState.RUNNING_COURSE:
                case ScreenState.SPREEDER:
                //case ScreenState.PREP_ED_DISCOVER:  

                    //a hack to check if you need to redirect
                    let parse:string[] = document.URL.split('/'); 
                    for(let route of this.router.config)
                    {
                        if(parse[parse.length - 1] == route.path && route.path != ":web_url")
                        {
                            setTimeout(() => { this.SwitchScreenState(firstScreen, true); }, 0);
                            break;
                        }
                    }
                    break;
                default:
                    //this.SwitchScreenState(ScreenState.DEFAULT_VIEW, true);
                    break;
            }
        }

        if (event.user.GoogleUser) {
            /** WORK AROUND: empty screen after logging in using google account */
            let mouseEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
              });
            document.dispatchEvent(mouseEvent);
            window.self.dispatchEvent(mouseEvent);
            this.appContainer.el.nativeElement.dispatchEvent(mouseEvent);
        } 
    }

    private SetCurrentUser(user:User):void
    {
        console.log('SetCurrentUser: ', user);
        if (user != null)
        {
            this._model.CurrentUser = user;
            /* this.navigationBar.SetCurrentUser(this._model.CurrentUser);
            if(user.IsEduUser) {
                AppSettings.schoolBuild = true;
            }
            else {
                AppSettings.schoolBuild = false;
            } */
        }
    }

    public goToWishlist() {
        this.SwitchScreenState(ScreenState.PREP_ED_WISHLIST);
    }

    public goToWordlist(wordlistId:number) {
        this.urlLoaderService.OpenUrlNewWindow(location.href.replace(this.router.url, "/wordlist/" + wordlistId));
    }

    public GetForcedTypingTasks(): ProxyTypingTask[] {
        return this.navigationBar.GetForcedTypingTasks();
    }

    public SetNavScreenState(screenState:number) {
        this.navigationBar.CurrentState(screenState);
    }

    public SwitchScreenState(screenState:number, refresh:boolean = false):void
    {
        console.log('SwitchScreenState SwitchScreenState SwitchScreenState:: ', screenState, this._model.CurrentProduct.DisplayText);
        let currentScreenState = UberReaderStateData.GetInstance().currentUberReaderScreenState;
        this.navigationBar.CurrentState(screenState);
        
        refresh = refresh;
        if (screenState != currentScreenState || refresh)
        {
            if (currentScreenState == ScreenState.RUNNING_COURSE)
            {
            }
            else if (currentScreenState == ScreenState.SHOWING_ACTIVITY)
            {
            }
            else if (currentScreenState == ScreenState.MANAGING_TEXT)
            {
            }
            else if (currentScreenState == ScreenState.SPREEDER)
            {
            }
        }
        else
        {
            return;
        }

        let oldState = UberReaderStateData.GetInstance().currentUberReaderScreenState;
        UberReaderStateData.GetInstance().previousUberReaderScreenState = oldState;        
        UberReaderStateData.GetInstance().currentUberReaderScreenState = screenState;

        switch (screenState)
        {
            case ScreenState.SHOWING_ACTIVITY:
                if(this._model.CurrentProduct.DoPreprocessing) {
                    //SPREEDER
                }
                else if(this._model.CurrentProduct.DisplayText) { 
                    //TYPESY
                    this.router.navigate([{outlets: {recommendOutlet: null, primary: 'play'}}]);
                }
                //     if (_model.CurrentProduct.DisplayVocab)
                //     {
                //         if (_model.ShowWordInfoForCurrentActivity())
                //         {
                //             _activityState = ActivityState.IN_ACTIVITY_SHOW_WORD_INFO;
                //             if(_model.CurrentWord != null)
                //             {
                //                 EnableWordOperations(ActivityState.IN_ACTIVITY_SHOW_WORD_INFO);
                //                 setWordsMenuString(_model.CurrentWord.Word_text);
                //             }
                //         }
                //         else
                //         {
                //             _activityState = ActivityState.IN_ACTIVITY;
                //             EnableWordOperations(ActivityState.IN_ACTIVITY);
                //             setWordsMenuString(null);
                //         }
                //     }

                //     navigationContainer.addElementAt(activityContainer.viewBackButton,0);
                break;
            case ScreenState.DICTIONARY:
                //     dictionaryView.Init();
                break;
            case ScreenState.WORD_DISCOVER:
                //     wordListView.initTabs();
                //     wordListView.setModel(_model.CurrentWordlist, _model.CurrentWord);
                break;
            case ScreenState.MANAGING_WORDLIST:
                this.router.navigate([{outlets: {lazyDialogOutlet: null, primary: 'vocab'}}]);
                break;
            case ScreenState.DEFAULT_VIEW:
                if(this._model.CurrentProduct.DisplayText) { 
                    //TYPESY - temporary only
                    if(this.loggedIn || this.CheckIfLoggedIn(true)) {
                        this.router.navigate([{outlets: {recommendOutlet: null, primary: 'home'}}]);
                    }
                }
                break;
            case ScreenState.RUNNING_COURSE:
                if(this._model.CurrentProduct.DoPreprocessing) {
                    //SPREEDER
                }
                else if(this._model.CurrentProduct.DisplayText) { 
                    //TYPESY
                    this.router.navigate([{outlets: {recommendOutlet: null, primary: 'courses'}}]);
                }
                break;
            case ScreenState.MANAGING_TEXT:
                if(this._model.CurrentProduct.DoPreprocessing) {
                    //SPREEDER
                }
                else if(this._model.CurrentProduct.DisplayText) { 
                    //TYPESY
                    this.router.navigate([{outlets: {recommendOutlet: null, primary: 'exercises'}}]);
                }
                break;
            case ScreenState.ADMIN_VIEW:
                if(this._model.CurrentProduct.DisplayText) { 
                    //TYPESY
                    if (BuildSettings.DeviceDebugType == AppSettings.IPAD_ANGULAR ||
                        BuildSettings.DeviceDebugType == AppSettings.ANDROID_ANGULAR) {
                        this.router.navigate([{outlets: {recommendOutlet: null, primary: 'admin'}}]);
                    }
                    else {
                        var baseApp:string = "";
                        if (BuildSettings.isLocalBuild) {
                            baseApp = "http://localhost:3000/";
                        }
                        else if (BuildSettings.isDevBuild) {
                            baseApp = "https://typesy.com/apps/test2/";
                        }
                        else {
                            baseApp = "https://typesy.com/type/";
                        }                                                                 
                        var url = baseApp += (this._model.CurrentUser.CleverUser || this._model.CurrentUser.ClasslinkUser ? "edu/?navigate=admin" : "admin/home");
                        window.open(url, "_blank");
                    }
                }
                break;
            case ScreenState.TYPESY_HALL_OF_FAME:
                this.router.navigate([{outlets: {recommendOutlet: null, primary: 'hall-of-fame'}}]);
                break;
            case ScreenState.TYPESY_MY_TASKS_VIEW:
                this.router.navigate([{outlets: {recommendOutlet: null, primary: 'my-tasks'}}]);
                break;
            case ScreenState.SPREEDER:
                //     spreederView.addKeydownEvent();
                //     spreederView.ScreenStateFocus();
                break;
            case ScreenState.VIEWING_CHART:
                if(this._model.CurrentProduct.DisplayText) { 
                    //TYPESY
                    this.router.navigate([{outlets: {recommendOutlet: null, primary: 'stats'}}]);
                }
                else {
                    this.router.navigate([{outlets: {lazyDialogOutlet: null, primary: 'stats'}}]);
                }
                break;
            default:
                break;
        }

        this.UpdateStatus();
    }

    public numOfCourses:number = 0;
    public myPrepTooltip:string = "";
    public UpdateStatus = () =>
    {
        if(this.loggedIn)
        {            
            let unseenCourses:number = UberApplication.GetInstance().GetUnseenCourses();
            let unseenPrograms:number = UberApplication.GetInstance().GetUnseenPrepProgram();            
            this.numOfCourses = unseenCourses + unseenPrograms;

            this.myPrepTooltip = "";
            if (unseenPrograms > 0)
            {
                this.myPrepTooltip = unseenPrograms + " new " + (unseenPrograms > 1 ? "programs" : "program") + " added";
            }

            if (unseenCourses > 0) 
            {
                this.myPrepTooltip += this.myPrepTooltip.length > 0 ? "<br>" : "";
                this.myPrepTooltip += unseenCourses + " new " + (unseenCourses > 1 ? "preps" : "prep") + " added";
            }

            this.userMenuChangedUpdate();
        }
    }

    public UpdateUserWordlists() {
        this.navigationBar.UpdateUserWordlists();
    }

    private fromSignOut:boolean = false;
    public RestartApplication():void
    {
        this.profilePicture = ""; //AppSettings.GetAssetLocation() + "assets/icon/profile_32_filled-grey.svg";
        this.fromSignOut = true;
        this.loggedIn = false;
        this.showHomeButtonBar = true;
        this.navBarVisible = true;
        this.fromGuestLogin = false;
        this._startupError = false;
        this._errorMessage = "";
        //this._ScreenState = -1;
        this.isGetStarupDataCalled = false;
        this.isUITextCalled = false;
        //this.loginInitialized = false;
        this.userIsAdmin = false;
        this.allowSignup = true;
        this.currentNotification = null;
        this.forceDisplayActivationScreen = false;

        //remove Admin from Side Menu
        let adminIndex = this.typesySideMenuItems.findIndex(item => item.data == 'Admin');
        if(adminIndex != -1) this.typesySideMenuItems.splice(adminIndex, 1); 

        //reset Typesy user menu items
        for (let menuItem of this.typesyUserMenus) {
            if (menuItem.data == "Change Customer") {
                menuItem.visible = false;
            }
            else {
                menuItem.visible = true;
            }
        }
        
        this.SetAppTheme("Light");
        UberReaderStateData.GetInstance().Restart();
        DataStorageManager.GetInstance().Restart();
        //DialogManager.RemoveAllPopUp();
        this._model.CloseAllOpenedDialogs(); //this is a fix for an issue where auto-open dialogs upon start up don't close when user logs out right after logging in
        this.navigationBar.Restart();
        this.init();

        var currentScreenState = UberReaderStateData.GetInstance().currentUberReaderScreenState;
        
        if (this._model.CurrentProduct.ProductId == AppSettings.PREP_ED)
        {
            this.SwitchScreenState(ScreenState.PREP_ED_DISCOVER);
        }
        else if (this._model.CurrentProduct.ProductId == AppSettings.TYPESY)
        {
            this.SwitchScreenState(ScreenState.DEFAULT_VIEW);
        }
    }

    public OpenSideMenu():void
    {
        SideMenu.GetInstance().Show();
        //this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.SHOW_SIDE_MENU));
    }

    public UserWordlistChanged(event):void {
        this.navigationBar.UserWordlistChanged(event);
    }

    public DeleteWordlist(wordlist:ProxyWordlist):void {
        this.navigationBar.DeleteWordlist(wordlist);
    }

    public pageReload():void
    {
        event.preventDefault();
        this._model.ClearLocalStorage();
        if (this.currentNotification != null) {
            this._model.UpdateUserPref("last_notification_closed", this.currentNotification.NotificationID.toString(), true);
        }
        window.location.reload(true);
    }

    private updateRecommended = (event:ProductInfoEvent) =>
    {                
        this.recommendRefresh = true;
    }

    public hideRecommendRefreshHandler():void
    {
        this.recommendRefresh = false;
        this.hideRecommendRefresh = true;
    }

    openRightDrawer():void {
        this.activateRightDrawer = !this.activateRightDrawer;
    }

    public profileListItemSelected(data):void
    {
        switch(data)
        {
            case "Login":
                /* let lDialog = this.mdlDialogService.showCustomDialog({
                    providers: [{provide: "data", useValue: {'state' : '0'}}] ,
                    component: LoginDialog2,
                    isModal: true,
                    styles: {'width': '450px', 'min-height': '550px', 'padding': '0px'}
                }); */
                this.matDialog.open(LoginDialog2, {                    
                    data: { state: '0' },
                    disableClose: true,
                    width: '450px',
                    panelClass: 'login-dialog-panel-class'
                });
                break;
            case "Profile":
                if (!this._model.HasOpenDialogs())
                {
                    switch(BuildSettings.productId) {
                        case AppSettings.TYPESY:
                            /* let typesyProfileDialog = this.mdlDialogService.showCustomDialog({
                                component: TypesyProfileDialog,
                                isModal: true,
                                styles: {'width': '550px'}
                            }); */
                            const typesyProfileDialog = this.matDialog.open(TypesyProfileDialog, {
                                width: '550px'
                            });
                            /* this.mdlDialogService.showCustomDialog({
                                component: SurveyReviewDialog,
                                isModal: true,
                                styles: {'width': '550px', 'height': '300px'}            
                            }); */
                            break;
                        default:
                            break;
                    }
                }
                break;
            case "Sign Out":
                DataStorageManager.GetInstance().RemoveDefaultLogin(false);
                UberApplication.GetInstance().Logout(true);
                this.OrganizationName = '';
                this.showHeaderActionContent = false;
                this.showProfilePicMenu = false;
                break;
            case "Wishlist":
                this.SwitchScreenState(ScreenState.PREP_ED_WISHLIST);
                break;
            case "Notes":
                this.SwitchScreenState(ScreenState.PREP_ED_NOTES);
                break;
            case "Vocab":
                this.SwitchScreenState(ScreenState.MANAGING_WORDLIST);
                break;
            case "Stats":
                this.SwitchScreenState(ScreenState.VIEWING_CHART);
                break;
            case "Submit Ticket":
                this.urlLoaderService.OpenUrlNewWindow("https://deskportal.zoho.com/portal/ereflect/newticket");
                break;
            case "Goals":
                //if (!this._model.HasOpenDialogs())
                //{
                    /* let goalsDialog = this.mdlDialogService.showCustomDialog({
                        component: GoalsDialog,
                        providers: [{provide: 'data', useValue: null}, {provide: 'bulkSetting', useValue: false}],
                        isModal: true,
                        styles: {'width': '480px'}
                    }); */

                    const goalsDialog = this.matDialog.open(GoalsDialog, {
                        data: { classData: null, bulkSetting: false },
                        width: '480px'
                    });
                //}
                break;
            case "Initial Test":
                this.matDialog.open(PlacementTestDialog, {
                    id: 'placement-test-dialog'
                });
                break;
            case "Preferences":
                if (!this._model.HasOpenDialogs())
                {
                    /* let prefDialog = this.mdlDialogService.showCustomDialog({
                        component: PreferencesDialog,
                        isModal: true,
                        styles: {'width': '500px', 'height': '450px', 'position' : 'absolute'}
                    }) */;

                    this.matDialog.open(PreferencesDialog, {
                        width: '500px',
                        height: '550px',
                        panelClass: 'preferences-dialog',
                        disableClose: true
                    });
                }
                break;
            case "Help":
                this.urlLoaderService.OpenUrlNewWindow(this._model.CurrentProduct.HelpFile);
                break;
            case "Feedback":
                if (!this._model.HasOpenDialogs())
                {
                    let feedbackDialog = this.matDialog.open(FeedbackDialog, {                        
                        width: '650px'
                    });
                }
                break;
            /* case "Review":
                this.mdlDialogService.showCustomDialog({
                    component: SurveyReviewDialog,
                    isModal: true,
                    styles: {'width': '550px', 'height': '300px'}            
                });
            break; */
            case "Schools":
                this.urlLoaderService.OpenUrlNewWindow("https://www.typesy.com/edu");
                break;
            case "Theme":
                this.isDarkTheme = !this.isDarkTheme; 
                this.SetAppTheme(this.isDarkTheme ? 'Dark' : 'Light');
                break;
            case "Typesy Community":
                this.urlLoaderService.OpenUrlNewWindow("https://community.typesy.com");
                break;
        }

        if (data != "Theme") {
            this.openRightDrawer();
        }
    }

    public ActivateAccount(): void {
    }

    private setupTypesyNavigationBar(): void {
        this.showHallOfFame = this._model.CurrentUser.Is_admin ? true : this._model.GetUserPref("hall_of_fame_mode") == "off" ? false : true;
        let hallOfFameIndex = this.typesySideMenuItems.findIndex(item => item.data == 'HallOfFame');
        if(this.showHallOfFame) {
            if(hallOfFameIndex == -1) {
                let hallOFFameSideMenu: MenuItem = {label: "Hall of Fame", data: "HallOfFame", icon: "stars", styleClass: "icon-star_outline"};
                this.typesySideMenuItems.splice(this.typesySideMenuItems.findIndex(item => item.data == 'Stats') + 1, 0, hallOFFameSideMenu);
            }
        }
        else {
            if(hallOfFameIndex != -1) {
                this._model.showMdlAlertDialog("Your administration has disabled the Hall of Fame section.", 
                    "Hall of Fame Section Disabled", false, "OK", () => {
                        this.typesySideMenuItems.splice(this.typesySideMenuItems.findIndex(item => item.data == 'HallOfFame'), 1);
                        if (this.router.url.indexOf("home") == -1) {
                            this.router.navigate([{outlets: {recommendOutlet: null, primary: 'home'}}]);
                        }
                    });
            }
        }

        this.hidePlaySection = this._model.CurrentUser.Is_admin ? false : this._model.GetUserPref("hide_play_section") == "True" ? true : false;
        let playSectionIndex = this.typesySideMenuItems.findIndex(item => item.data == 'Play');
        if(this.hidePlaySection) {
            if(playSectionIndex != -1) {
                this.typesySideMenuItems.splice(this.typesySideMenuItems.findIndex(item => item.data == 'Play'), 1);
                if (this.router.url.indexOf("my-tasks") == -1 && this.router.url.indexOf("courses/") == -1) {
                    this._model.showMdlAlertDialog("Your administration has disabled the Play section.", 
                        "Play Section Disabled", false, "OK", () => {
                            if (this.router.url.indexOf("play") != -1) {
                                this.router.navigate([{outlets: {recommendOutlet: null, primary: 'home'}}]);
                            }
                        });
                }
            }
        }
        else {
            if(playSectionIndex == -1) {
                let playSideMenu: MenuItem = {label: "Play", data: "Play", icon: "keyboard", styleClass: "icon-keyboard_outline"};
                this.typesySideMenuItems.splice(this.typesySideMenuItems.findIndex(item => item.data == 'Courses') + 1, 0, playSideMenu);
            }
        }

        this.userIsAdmin = this._model.CurrentUser.Is_admin;
        if(this.userIsAdmin && this.typesySideMenuItems.findIndex(item => item.data == 'Admin') == -1) {
            let adminSideMenu: MenuItem = {label: "Admin", data: "Admin", icon: "person", styleClass: "icon-person_outline"};
            if(playSectionIndex != -1)
                this.typesySideMenuItems.splice(playSectionIndex + 1, 0, adminSideMenu);
            else 
                this.typesySideMenuItems.splice(this.typesySideMenuItems.findIndex(item => item.data == 'Courses') + 1, 0, adminSideMenu);
        }

        if (this._model.CurrentUser.IsEduUser) {
            let myTasksSideMenu: MenuItem = {label: "My Tasks", data: "MyTasks", icon: "person", styleClass: "icon-assignment_outline"};
            if (this.typesySideMenuItems.findIndex(item => item.data == 'MyTasks') == -1) {
                let statsIndex = this.typesySideMenuItems.findIndex(item => item.data == 'Stats');
                this.typesySideMenuItems.splice(statsIndex + 1, 0, myTasksSideMenu);
            }            
        }
    }

    private setupTypesyUserMenu(): void {
        if(this._model.CurrentUser.IsEduUser || this._model.IsMacintosh || this._model.IsIOS) { 
            this.ToggleTypesyUserMenuItem("Schools", false);   
        }

        let hasClassGoals: boolean = this._model.GetUserPref("enable_class_goals") == "True" ? true : false;
        if (hasClassGoals) { 
            this.ToggleTypesyUserMenuItem("Goals", false);
        }
        else { 
            this.ToggleTypesyUserMenuItem("Goals", true);
        }

        /* if (BuildSettings.isDevBuild || BuildSettings.isLocalBuild) {
            this.ToggleTypesyUserMenuItem("Review", true);
        } */

        if (this._model.PlacementTest == null) {
            this.ToggleTypesyUserMenuItem("Initial Test", false);
        }
        this.profileLoggedInItems = this.typesyUserMenus;
    }

    /**
     * @param menuItemData - The data string of the menu item that you are going to show or hide
     * @param showItem - Set to true if you want to show a menu item, otherwise set to false     * 
     */
    public ToggleTypesyUserMenuItem(menuItemData: string, showItem: boolean): void {
        this.typesyUserMenus.find(menuItem => menuItem.data == menuItemData).visible = showItem;
    }

    /* moved back to admin (october 2019)
    public set AdminSearchLabel(searchLabel: string) {
        this.navigationBar.adminSearchLabel = searchLabel;
        if (searchLabel == null) {
            this.navigationBar.searchInput = "";
        }
    }

    public set AdminSearchInput(searchInput: string) {
        this.navigationBar.searchInput = searchInput;
    }*/

    public set OrganizationName(value: string) {
        this.navigationBar.organizationName = value;
    }

    private invalidTokenHandler = (event: InvalidTokenEvent) => {
        this._model.removeEventListener(InvalidTokenEvent.INVALID_TOKEN, this.invalidTokenHandler);
        this._model.removeEventListener(InvalidTokenEvent.TOKEN_INVALIDATED, this.invalidTokenHandler);
        this._model.showMdlAlertDialog(event.Message, "", true, "Refresh Page", () => {
            window.location.reload(true);
        }, null, true);
    }
    
    public getNextNotification(): void {
        let notifications: UserNotification[] = this._model.UserNotifications;
        if (notifications != null && notifications.length > 0) {
            if (this.currentNotification != null) {
                this._model.UpdateUserPref("last_notification_closed", this.currentNotification.NotificationID.toString(), true);
                notifications.splice(notifications.indexOf(this.currentNotification), 1); 
            }

            let nextNotification = notifications[0];
            for (let i = 1; i < notifications.length; i++) {
                if (notifications[i].NotificationID < nextNotification.NotificationID) {
                        nextNotification = notifications[i];
                }
            }
            this.currentNotification = null;
            this.currentNotification = nextNotification;
        }
    }

    public notificationBtnClickHandler(): void {
        this._model.UpdateUserPref("last_notification_closed", this.currentNotification.NotificationID.toString(), true);
        window.open(this.currentNotification.Link, '_blank');
        this.getNextNotification();
    }

    public UpdateMiniOdometer(): void {
        this.navigationBar.updateMiniOdometer();
    }

    private classPausePromptDisplayed: boolean = false;
    private checkLiveClassPause(): void {        
        if (this.userIsAdmin) return;

        if (this._model.GetUserPref("class_is_paused") == "True") {
            if (!this.activityService.ActivityIsPaused) {
                this.activityService.pause(true);
            }
            this._model.showMdlBlockingDialog("Class is paused. Please wait for your teacher or administrator to resume it.");
            this.classPausePromptDisplayed = true;
        }
        else if (this.classPausePromptDisplayed) {
            if (this.activityService.ActivityIsPaused) {
                this.activityService.pause(false);
            }
            this.matDialog.closeAll();
            this.classPausePromptDisplayed = false;
        }
    }
}
