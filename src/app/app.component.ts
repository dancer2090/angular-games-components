import { Component, OnInit } from '@angular/core';
import { DataStorageManager } from './UberReaderClient/DataStorageManager';
import { AppSettings } from './UberReaderData/AppSettings';
import { BuildSettings } from './UberReaderClient/BuildSettings';
import { UberApplication } from './UberReaderData/UberApplication';
import { Router, NavigationEnd, Event, NavigationStart, RoutesRecognized, ActivatedRoute, Params } from '@angular/router';
import { DevUtils } from './UberReaderData/DevUtils';
import { HistoryNavigation } from './UberReaderData/uber.navigation.service';
import { UberReader } from './UberReaderClient/UberReader';
import { ScreenState } from './UberReaderData/Utils/ScreenState';
import { ActivityService } from './UberReaderActivities/activity.service';
import { Plugins } from '@capacitor/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const { Device } = Plugins;

declare var ga:Function;
declare var fbq:Function;
declare var google_tag_params;
declare var google;
declare var console;

@Component({
  selector: 'app-root',
  template: `   
    <div style="height:100%;">
        <!-- <prep-ed-calculator></prep-ed-calculator> -->
        <uber-reader-loading-message></uber-reader-loading-message>
        <uber-reader></uber-reader>
        <background-upload></background-upload>
      
    </div> 
    
    <!---
    <img class="hide" preloadDirective [sources]='imagesToPreload' />
    -->
    <!-- preload all typesy fonts and videos-->
<!--
    <span style="font-family: andaleMono;"></span>
    <span style="font-family: aurulentSansMono;"></span>
    <span style="font-family: bitstreamVeraSansMono;"></span>
    <span style="font-family: courierNew;"></span>
    <span style="font-family: dejavuSansMono;"></span>
    <span style="font-family: envyCodeR;"></span>
    <span style="font-family: inconsolata;"></span>
    <span style="font-family: liberationMono;"></span>
    <span style="font-family: oxygenMono;"></span>
    <span style="font-family: ptMono;"></span>
    <span style="font-family: saxMono;"></span>
    <span style="font-family: ubuntuMono;"></span>
    <span style="font-family: firaMono;"></span>

    <video class="hide"> <source src="{{ 'assets/video/us-keyboard-high-resolution.mp4' | resourceLoc }}" type="video/mp4"> </video>
    <video class="hide"> <source src="{{ 'assets/video/uk-keyboard-high-resolution.mp4' | resourceLoc }}" type="video/mp4"> </video>
    <video class="hide"> <source src="{{ 'assets/video/spanish-keyboard-high-resolution.mp4' | resourceLoc }}" type="video/mp4"> </video>
    <video class="hide"> <source src="{{ 'assets/video/brazilian-keyboard-high-resolution.mp4' | resourceLoc }}" type="video/mp4"> </video>
    <video class="hide"> <source src="{{ 'assets/video/canadian-multilingual-keyboard-high-resolution.mp4' | resourceLoc }}" type="video/mp4"> </video>
    <video class="hide"> <source src="{{ 'assets/video/us-keyboard-numeric-high-resolution.mp4' | resourceLoc }}" type="video/mp4"> </video>
-->
    <!--    
    <simple-notifications></simple-notifications>   
    <img #preloader [src]="imgPreloadSrc" style="display:none;" (load)="imageLoaded()"/>
    -->
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  //state:string = "inactive";
  private flag:boolean = false;
  private _ngOnDestroy: Subject<void> = new Subject<void>();

  constructor(private _model:UberApplication,
            private router:Router,
            private history:HistoryNavigation,
            private activityService: ActivityService,
            private route: ActivatedRoute) {

    DevUtils.ShowTime("AppComponent", "constructor");    

    //bugsnagClient.notify(new Error('Test error'))
    
    /* let media = new Media('http://www.hochmuth.com/mp3/Beethoven_12_Variation.mp3',
        () => console.log('success'),
        error => console.log('error. ', error));
    media.play(); */        

    if (!BuildSettings.isDevBuild && !BuildSettings.isLocalBuild) {
        console.log = function(){};
        console.warn = function(){};
        console.error = function(){};
        console.warn = function(){};
        console.group = function(){};
        console.groupEnd = function(){};
        console.timeEnd = function(){};
        console.time = function(){};
        console.error = function(){};
    }
    
    this.router.events.subscribe(
            (event:Event) => {                     
                //console.log(event);
                if (event instanceof NavigationStart) {     
                    //this.history.pushRoute(event.url);    
                    /** Transferred this code from typesy-redirect.component.ts to app.component **/
                    if (event.url.indexOf('edu') > -1) {
                        DevUtils.ShowTime("AppComponent : constructor", "IS SCHOOL BUILD");
                        AppSettings.schoolBuild = true;
                    }
                    else if (event.url.indexOf('community/sso') > -1 || (event.url.indexOf('chromestore') > -1 && /\bCrOS\b/.test(navigator.userAgent))) { // check if user is using chromestore app on chromeOS or is logging in to community
                        DevUtils.ShowTime("AppComponent : constructor", "IS TRIAL BUILD");
                        AppSettings.TrialEnabled = true;
                        AppSettings.TrialKey = "TYPESYTRIAL1";
                    }
                    else if (event.url.indexOf('signup') > -1) {
                        DevUtils.ShowTime("AppComponent : constructor", "signup");
                        AppSettings.ShowSignUp = true;
                    }                           
                    /** END LINE **/         
                }
                else if (event instanceof RoutesRecognized) {
                    if (event.url.indexOf('updateHistory=0') >= 0) {
                        return;
                    }

                    if (this._model.hasLoggedIn) {
                        if (this.activityService.ActivityToPreview != null) {
                            this.activityService.ActivityToPreview = null;
                        }
                        else {
                            this._model.CloseAllOpenedDialogs();
                        }
                    }                                    
                    
                    if(event.state.root.queryParamMap.keys.length > 0) {
                        if(this.flag) {                            
                            return;
                        }
                        this.flag = true;
                    }
                    else {
                        this.flag = false;
                    }

                    if (event.state.root.children[0].data == null) return;
                    let breadcrumb:any = event.state.root.children[0].data.breadcrumb;
                    let route_name:any = event.state.root.children[0].data.name;
                    //console.log(breadcrumb + " : " + route_name, event.url);
                    
                    //console.log('event.url, breadcrumb: ', event.url, breadcrumb);
                    this.history.pushRoute(event.url, breadcrumb);
                    UberReader.GetInstance().backButtonLabel = this.history.getBackLabel();
                    UberReader.GetInstance().navBarVisible = true;
                    
                    /**
                     * now that there is only 1 instance of navigation/header bar across all routes
                     * set variables here what to show/hide in the header bar of a route
                     */
                    switch (route_name) {
                        case 'browse':
                            UberReader.GetInstance().SetNavScreenState(ScreenState.PREP_ED_DISCOVER);
                            UberReader.GetInstance().showTitleHeader = false;
                            UberReader.GetInstance().showHeaderActionContent = false;
                            UberReader.GetInstance().showNavLinks = true;
                            UberReader.GetInstance().showHomeButtonBar = true;
                            UberReader.GetInstance().showBackButton = false;
                            UberReader.GetInstance().showCourseRunnerActionButtons = false;
                            UberReader.GetInstance().backButtonTooltip = "";
                            UberReader.GetInstance().showSchoolLogo = false;
                            break;
                        case 'prep':
                            UberReader.GetInstance().SetNavScreenState(ScreenState.PREP_ED_COURSES);
                            UberReader.GetInstance().showTitleHeader = false;
                            UberReader.GetInstance().showHeaderActionContent = false;
                            UberReader.GetInstance().showNavLinks = true;
                            UberReader.GetInstance().showHomeButtonBar = true;
                            UberReader.GetInstance().showBackButton = false;
                            UberReader.GetInstance().showCourseRunnerActionButtons = false;
                            UberReader.GetInstance().backButtonTooltip = "";
                            UberReader.GetInstance().showSchoolLogo = false;
                            break;
                        case 'vocab':
                            UberReader.GetInstance().SetNavScreenState(ScreenState.MANAGING_WORDLIST);
                            UberReader.GetInstance().showTitleHeader = false;
                            UberReader.GetInstance().showHeaderActionContent = false;
                            UberReader.GetInstance().showNavLinks = true;
                            UberReader.GetInstance().showHomeButtonBar = true;
                            UberReader.GetInstance().showBackButton = false;
                            UberReader.GetInstance().showCourseRunnerActionButtons = false;
                            UberReader.GetInstance().backButtonTooltip = "";
                            UberReader.GetInstance().showSchoolLogo = false;
                            break;
                        case 'course':
                            UberReader.GetInstance().showTitleHeader = false;
                            UberReader.GetInstance().showHeaderActionContent = false;
                            UberReader.GetInstance().showNavLinks = false;
                            UberReader.GetInstance().showHomeButtonBar = false;
                            UberReader.GetInstance().showBackButton = true;
                            UberReader.GetInstance().showCourseRunnerActionButtons = false;
                            UberReader.GetInstance().backButtonTooltip = "";      
                            UberReader.GetInstance().showSchoolLogo = false;               
                            break;
                        case 'program':
                            UberReader.GetInstance().showTitleHeader = false;
                            UberReader.GetInstance().showHeaderActionContent = false;
                            UberReader.GetInstance().showNavLinks = false;
                            UberReader.GetInstance().showHomeButtonBar = false;
                            UberReader.GetInstance().showBackButton = true;
                            UberReader.GetInstance().showCourseRunnerActionButtons = false;
                            UberReader.GetInstance().backButtonTooltip = "";
                            //UberReader.GetInstance().navBarVisible = false;  
                            UberReader.GetInstance().showSchoolLogo = false;            
                            break;
                        case 'wishlist':         
                            UberReader.GetInstance().SetNavScreenState(ScreenState.PREP_ED_WISHLIST);
                            UberReader.GetInstance().showTitleHeader = false;
                            UberReader.GetInstance().showHeaderActionContent = false;
                            UberReader.GetInstance().showNavLinks = true;
                            UberReader.GetInstance().showHomeButtonBar = true;
                            UberReader.GetInstance().showBackButton = false;
                            UberReader.GetInstance().showCourseRunnerActionButtons = false;
                            UberReader.GetInstance().backButtonTooltip = "";
                            UberReader.GetInstance().showSchoolLogo = false;
                            break;                   
                        case 'notes':  
                            UberReader.GetInstance().SetNavScreenState(ScreenState.PREP_ED_NOTES);
                            UberReader.GetInstance().showTitleHeader = false;
                            UberReader.GetInstance().showHeaderActionContent = false;
                            UberReader.GetInstance().showNavLinks = true;
                            UberReader.GetInstance().showHomeButtonBar = true;
                            UberReader.GetInstance().showBackButton = false;
                            UberReader.GetInstance().showCourseRunnerActionButtons = false;
                            UberReader.GetInstance().backButtonTooltip = "";
                            UberReader.GetInstance().showSchoolLogo = false;
                            break;                          
                        case 'stats':
                            UberReader.GetInstance().SetNavScreenState(ScreenState.VIEWING_CHART);
                            UberReader.GetInstance().showTitleHeader = false;
                            UberReader.GetInstance().showHeaderActionContent = false;
                            UberReader.GetInstance().showNavLinks = true;
                            UberReader.GetInstance().showHomeButtonBar = true;
                            UberReader.GetInstance().showBackButton = false;
                            UberReader.GetInstance().showCourseRunnerActionButtons = false;
                            UberReader.GetInstance().backButtonTooltip = "";
                            UberReader.GetInstance().showSchoolLogo = false;
                            break;
                        case 'user':   
                        case 'wordlist':
                        case 'word':                            
                            UberReader.GetInstance().showTitleHeader = false;
                            UberReader.GetInstance().showHeaderActionContent = false;
                            UberReader.GetInstance().showNavLinks = false;
                            UberReader.GetInstance().showHomeButtonBar = true;
                            UberReader.GetInstance().showBackButton = true;
                            UberReader.GetInstance().showCourseRunnerActionButtons = false;
                            UberReader.GetInstance().backButtonTooltip = "";
                            UberReader.GetInstance().showSchoolLogo = false;         
                            break;
                        case 'home':                            
                        case 'exercises':
                        case 'stats':
                        case 'courses':
                        case 'play':
                        case 'hall-of-fame':
                        case 'my-tasks':
                            UberReader.GetInstance().showTitleHeader = false;
                            UberReader.GetInstance().showHeaderActionContent = false;
                            UberReader.GetInstance().showNavLinks = true;
                            UberReader.GetInstance().showHomeButtonBar = true;
                            UberReader.GetInstance().showBackButton = false;
                            UberReader.GetInstance().showCourseRunnerActionButtons = false;
                            UberReader.GetInstance().backButtonTooltip = "";
                            UberReader.GetInstance().showSchoolLogo = false;
                            break;
                        case 'admin':
                            UberReader.GetInstance().showSchoolLogo = true;
                            UberReader.GetInstance().showBackButton = false;
                            break;
                        case 'curriculum-info':
                            UberReader.GetInstance().showBackButton = true;
                            UberReader.GetInstance().showTitleHeader = true;
                            UberReader.GetInstance().showNavLinks = false;
                            UberReader.GetInstance().showProfilePicMenu = true;
                            break;
                        case 'public-activity':
                            UberReader.GetInstance().showTitleHeader = false;
                            UberReader.GetInstance().showHeaderActionContent = false;
                            UberReader.GetInstance().showNavLinks = false;
                            UberReader.GetInstance().showHomeButtonBar = false;
                            UberReader.GetInstance().showBackButton = false;
                            UberReader.GetInstance().showCourseRunnerActionButtons = false;
                            UberReader.GetInstance().backButtonTooltip = "";
                            UberReader.GetInstance().showSchoolLogo = false;
                            UberReader.GetInstance().isNearpodBuild = true;
                            break;
                        case 'typesy-public-profile':
                            UberReader.GetInstance().showTitleHeader = false;
                            UberReader.GetInstance().showHeaderActionContent = false;
                            UberReader.GetInstance().showNavLinks = false;
                            UberReader.GetInstance().showHomeButtonBar = false;
                            UberReader.GetInstance().showBackButton = false;
                            UberReader.GetInstance().showCourseRunnerActionButtons = false;
                            UberReader.GetInstance().backButtonTooltip = "";
                            UberReader.GetInstance().showSchoolLogo = false;
                            UberReader.GetInstance().isTypesyPublicProfile = true;
                            break;
                    }
                }
                else if(event instanceof NavigationEnd) {
                    if (event.url.indexOf('updateHistory=0') >= 0)
                    {
                        return;
                    }
                }
            });

    AppSettings.Init(BuildSettings.productId, BuildSettings.EnableDebugWindow, BuildSettings.schoolBuild,
            BuildSettings.useMediaFolder, BuildSettings.isAppStoreBuild, BuildSettings.ClientType,
            BuildSettings.ClientVersion, BuildSettings.trialEnabled,
            BuildSettings.DeviceDebugType, BuildSettings.TrialKey, BuildSettings.prepEdProduct,
            BuildSettings.allowAnonymousLogin, BuildSettings.useCDN, BuildSettings.ProducDataVersion, BuildSettings.trackEvents);

    DataStorageManager.GetInstance().Init(); 
  }

  //preload images in css here
  public imagesToPreload:string [] = [
        AppSettings.GetAssetLocation() + 'assets/icon/back-active.svg'
    ];
  
  /*
  imgPreloadSrc:string;
  images = [
    "assets/icon/loading.svg",
    "assets/icon/x.svg",
    "assets/icon/back-active.svg",
    "assets/icon/add_wishlist_32_a.svg",
    "assets/icon/calculator_32_a.svg",
    "assets/icon/desktop_flag_32_a.svg",
    "assets/icon/desktop-wishlist-hover.svg",
    "assets/icon/desktop-wishlist-remove-hover.svg",
    "assets/icon/remove_wishlist_32_a.svg",
    "assets/icon/restart_icon_a.svg",
    "assets/icon/x-black.svg",
    "assets/icon/profile_32_filled.svg",
    "assets/icon/preped-desktop-logo.svg",
    "assets/icon/login-bg.svg",
    "assets/icon/backbtn.svg",
    "assets/icon/backbtn-active.svg",
    "assets/icon/backbtn-down.svg",
    "assets/icon/nextbtn.svg",
    "assets/icon/nextbtn-active.svg",
    "assets/icon/nextbtn-down.svg",
    "assets/icon/sorry-icon.svg",
    "assets/icon/square-default-pic.svg",
    "assets/icon/trophy.svg",
    "assets/icon/preview_140.svg",
    "assets/icon/email.svg",
    "assets/icon/down-arrow.svg",
    "assets/icon/menu-icon.svg",
    "assets/icon/menu-icon-active.svg",
    "assets/icon/share_32.svg",
    "assets/icon/share_32_a.svg",
    "assets/icon/sound-icon-a.svg",
    "assets/icon/sound-icon.svg",
    "assets/icon/empty-chart.svg",
    "assets/icon/expand-icon.svg",
    "assets/icon/collapse-icon.svg",
    "assets/icon/mouseover.svg",
    "assets/icon/videos-icon.svg",
    "assets/icon/question-icon.svg",
    "assets/icon/remove-icon.svg",
    "assets/icon/module-icon.svg",
    "assets/icon/concept-icon.svg",
    "assets/icon/mastered.svg",
    "assets/icon/unmastered.svg",
    "assets/icon/unmastered-active.svg",
    "assets/icon/remove-list.svg",
    "assets/icon/remove-list-active.svg",
    "assets/icon/scroll-down.svg",
    "assets/icon/dropdown-large.svg"
  ];
*/
    ngOnInit():void
    {   
        DevUtils.ShowTime("AppComponent", "ngOnInit");
        //this.preloadImages();
        Device.getInfo().then(info => {
            console.log('device info: ', info);
            this._model.SetDeviceInfo(info);
        });
        
        /* this.http.get('assets/sheet.csv')
        .subscribe(
            data => {                
                var allTextLines = data.text().split(/\r\n|\n/);
                var headers = allTextLines[0].split(',');
                var lines = [];

                let idx1 = headers.findIndex(header => header == 'Principal First Name');
                let idx2 = headers.findIndex(header => header == 'Principal Last Name');
                let idx3 = headers.findIndex(header => header == 'Street');
                let idx4 = headers.findIndex(header => header == 'City');
                let idx5 = headers.findIndex(header => header == 'State');
                let idx6 = headers.findIndex(header => header == 'Zip');

                for ( var i = 1; i < allTextLines.length; i++) {
                    // split content based on comma
                    var line = allTextLines[i].split(',');
                    if (line.length == headers.length) {
                        let line1 = line[idx1] + ' ' + line[idx2] + '\r\n' + line[idx3] + '\r\n' + line[idx4] + ' ' + line[idx5] + ' ' + line[idx6];
                        lines.push(line1);
                    }
                }
                console.log('HMMMM: ', lines);
                this.saveTextAsFile(lines.join('\r\n\r\n'), 'test1.txt');
            },
            error => {
                console.log('hmmm error: ', error);
            }
        );
        this.printTest(); */
    }

   /*  private printTest() {
        let body = '<html><body><p innerHtml=\"Dear [Name],\r\n\r\n' +
        'I’m writing to you with an important update on the common core curriculum standards, and what it means for [school-name].\r\n\r\n' +
        'In 2019, keyboarding (correct touch typing) is the most important computer skill for students to learn. Correct touch typing improves computer-based test scores and make assignments and class work faster and easier. And keyboarding skills are now an essential learning goal in the common core standards.\r\n\r\n' +
        'The good news is that it’s now fast and easy to implement a keyboarding program. Typesy - the leading premium keyboarding program for education - takes care of teaching your students to type in a fast, easy, and fun way. And it meets the common core requirements.\r\n\r\n' +
        'In order to help you get your students on the right path, I have set you up with a full semester of school-wide Typesy access, completely free. This is the full version of Typesy - unlimited students, unlimited teachers. No catch, no obligations, and no ads.\r\n\r\n' +
        'Your account also comes with premium support at no cost. So please don’t hesitate to call or email us if you need any help. We can show you exactly how to implement a successful keyboarding program.\r\n\r\n' +
        'Getting started is easy - just log into your account using the details below, or pass the details to your keyboarding/IT teacher. Then you can get your Typing classes set up in just a few minutes. Typesy will take care of the rest.\r\n\r\n' +
        '\r\n\r\nRespectfully,\t\t\t\t\t\t\t\t\tUsername: <b>abcde</b>\r\n' +
        '\t\t\t\t\t\t\t\tPassword: 123456\r\n' +
        '\t\t\t\t\t\t\t\tLogin link:\r\n' +
        '\t\t\t\t\t\t\t\twww.typesy.com/type\r\n' +
        'Rick Mesias – Senior Education Consultant\t\t\t\tTraining videos:\r\n' +           
        '\t\t\t\t\t\t\t\twww.typesy.com/help/\">' + 
        '</body></html>';

        this.saveTextAsFile(body, 'print1.html');
    }

    private saveTextAsFile (data, filename) {

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        var blob = new Blob([data], {type: 'text/plain'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')
        // FOR IE:

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
        }
        else{
            var e: any = document.createEvent('MouseEvents');
            var a: any = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
            e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        }
    } */

    ngAfterViewInit() {
        
    }

    imageLoaded():void
    {
        //this.preloadImages();
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this._ngOnDestroy.next();
        this._ngOnDestroy.complete();
    }
    
    /*
    preloadImages():void
    {
    if(this.images.length > 0)
    {
        this.imgPreloadSrc = AppSettings.GetAssetLocation() + this.images.pop();      
    }
    }
    */

    /** Below is the function being called by the avatar generator code to save the user's created avatar **/
    /* publicFunc(avatarImgFile:any) {
        this.ngZone.run(() => this.privateFunc(avatarImgFile));
    }

    privateFunc(avatarImgFile:any) {
        this.externalResourceLoader.avatarLoaded.next(avatarImgFile);
    } 

    ngOnDestroy() {
        window.my.namespace.publicFunc = null;
    }*/
}
