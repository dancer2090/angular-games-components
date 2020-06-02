import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef, Type, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';

import { VisualComponent } from '../../../VisualComponent';
import { TrainingHelpView } from './training-help-view.component';
import { IntroCounterView } from './intro-counter-view.component';
import { VideoActivityView } from './video-activity-view.component';
import { EndScreen } from './end-screen.component';
import { Activity } from '../../../../../UberReaderData/DataClasses/db/Activity';
import { Course_Activity } from '../../../../../UberReaderData/DataClasses/db/Course_Activity';
import { DictionaryString } from '../../../../../UberReaderData/Utils/Dictionary';
import { ProductInfo } from '../../../../../UberReaderData/DataClasses/db/ProductInfo';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { ActivityService } from '../../../../../UberReaderActivities/activity.service';
import { HistoryNavigation } from '../../../../../UberReaderData/uber.navigation.service';
import { UberReader } from '../../../../UberReader';
import { UberReaderLoadingMessage } from '../../../Dialogs/UberReaderLoadingMessage';
import { ActivityEvent } from '../../../../../UberReaderData/Events/ActivityEvent';
import { ErrorMessage } from '../../../../../UberReaderData/Utils/ErrorMessage';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { User_Course } from '../../../../../UberReaderData/DataClasses/db/User_Course';
import { ActivityRecommendEvent } from '../../../../../UberReaderData/Events/ActivityRecommendEvent';
import { Text } from '../../../../../UberReaderData/DataClasses/db/Text';
import { StringUtils } from '../../../../../UberReaderData/Utils/StringUtils';
import { Setting } from '../../../../../UberReaderData/DataClasses/db/Setting';
import { AControlUtil } from '../../../ActivityControls/activity-control-util';
import { GenericControl } from '../../../ActivityControls/generic-control';
import { AControl } from '../../../../../UberReaderData/DataClasses/db/AControl';
import { AControlFactory } from '../../../ActivityControls/activity-control-factory';
import { ClosePopUpEvent } from '../../../../../UberReaderData/Events/ClosePopUpEvent';
import { Router, ActivatedRoute, Params, RouterOutlet } from '@angular/router';
import { Result } from '../../../../../UberReaderData/DataClasses/db/Result';
import { NextRecommendedTextEvent } from '../../../../../UberReaderData/Events/NextRecommendedTextEvent';
import { UserSettingSyncEvent } from '../../../../../UberReaderData/Events/UserSettingSyncEvent';
import { UberApplicationEventTypes } from '../../../../../UberReaderData/Events/UberApplicationEventTypes';
import { BuildSettings } from '../../../../BuildSettings';
import { GamesLibraryService } from '../games-module/games-view.service';
import { ProxyActivity } from 'app/UberReaderData/DataClasses/other/ProxyActivity';
import { Location } from '@angular/common';
import { StatusPointsEvent } from 'app/UberReaderData/Events/StatusPointsEvent';
import { MatDialog } from '@angular/material';
import { AdaptiveLearningDialog } from './dialogs/adaptive-learning-dialog.component';
import { UserStatusService } from '../../status-points-control/user-status.service';
import { NewStatusLevelDialog } from './dialogs/new-status-level-dialog.component';

export const enum ViewState {
    TRAINING_HELP = 1,
    INTRO_COUNTER = 2,
    ACTIVITY = 3,
    VIDEO = 4,
    END_SCREEN = 5
}

export const enum CourseViewMode {
    DEFAULT_VIEW_MODE = 1,
    REVIEW_MODE = 2
}

@Component({
    selector: 'activity-controller',
    styleUrls: ['./activity-controller.component.css'],
    template: `
        <div id="mainContainer">
            <training-help-view #trainingHelp [class.fade-in]="viewState == 1" [class.hide]="viewState != 1" (showActivity)="showActivityHandler($event)"></training-help-view>
            <intro-counter-view #introCounterView [class.hide]="viewState != 2" (startActivity)="startActivityFromIntro()"></intro-counter-view>
            <div id="activityWrapper" [class.fade-in]="viewState == 3" [class.hide]="viewState != 3">
                <div id="activityMainContainer">
                    <!--<div id="helpBtnDiv"><mdl-icon id="helpButton" (click)="showTrainingHelp()" *ngIf="!forCourse">help_outline</mdl-icon></div>-->
                    <div #activityContainer style="height: 100%;">
                        <router-outlet (activate)="onRouterOutletActivate($event)"></router-outlet>
                    </div>

                    <!--<button *ngIf="!forCourse && !isPublic" mdl-button mdl-button-type="raised" mdl-colored="accent" mdl-ripple class="skip button--primary button--primary-continue button--centered"
                            (click)="skipToNextRecommendedActivity()">Skip to next recommended game</button>-->
                </div>
            </div>
            <video-activity-view #videoActivity [class.fade-in]="viewState == 4" [class.hide]="viewState != 4" (finished)="videoFinished()"></video-activity-view>
            <end-screen #endScreen [class.fade-in]="viewState == 5" [class.hide]="viewState != 5" [activityName]="currentActivity?.Activity_name"
                                    (recommendedActivity)="startRecommendedActivity($event)" (runActivityAgain)="replayActivity_clickHandler()" (nextCourse)="continueNextCourse($event)" (continueToNextStep)="continueFromEndScreen()"></end-screen>
        </div>
    `,
    providers: [UserStatusService]
})
export class ActivityController extends VisualComponent implements OnInit{
    @ViewChild(RouterOutlet, { static: true }) activityOutlet: RouterOutlet;
    @Input() courseViewMode: number = CourseViewMode.DEFAULT_VIEW_MODE;
    @Input() currentCourseStep: number;
    @ViewChild('trainingHelp', { static: true }) trainingHelp:TrainingHelpView;
    @ViewChild('introCounterView', { static: true }) introCounterView:IntroCounterView;
    @ViewChild('activityContainer', { read: ViewContainerRef, static: true }) activityContainer;
    @ViewChild('videoActivity', { static: true }) videoActivity:VideoActivityView;
    @ViewChild('endScreen', { static: true }) endScreen:EndScreen;
    //@Output() recommendedActivity = new EventEmitter();
    @Output() finished = new EventEmitter();
    @Output() wholeCourseFinished = new EventEmitter();
    @Output() nextCourse = new EventEmitter();
    @Output() repeat = new EventEmitter();
    @Output() previousStep = new EventEmitter();
    @Output() nextStep = new EventEmitter();

    public viewState:number = -1;
    public currentActivity:Activity;
    public forCourse:boolean;
    public forceFullWord: boolean = false;

    private currentCourseActivity:Course_Activity;
    //private componentRef:ComponentRef<any>;
    private activityRef:any;
    private activityName:string;
    private methodArgsStart:DictionaryString<string>;
    private methodArgsEnd:DictionaryString<string>;
    private product:ProductInfo;
    private calledStart:boolean = false;
    private model:UberApplication;
    private gamesLibrary: GamesLibraryService;
    private nextRecommendedActivityId:number;
    private startTime:number = 0;
    private pauseStartTime:number = -1;
    private totalPauseTime:number = 0;
    private totalUsageTime:number = 0;
    private totalUsageTimeStored:boolean = false;
    private forceAdaptiveLearningPromptVisible: boolean = false;
    private adaptiveLearningPromptVisible: boolean = false;
    private focusAccuracyVisible: boolean = false;

    //subject subscribers or event listeners for Activity Events
    private finishEventSubscriber:any;
    private pauseEventSubscriber:any;
    private forceStopEventSubscriber:any;
    private paramsSubscription:any;
    private showTrainingHelpSubscriber:any;
    private nextRecommendedSubscriber:any;

    private activityResults:any;
    private currentText: Text;
    private aControls: AControl[];
    private settings: Setting[];
    public isPublic: boolean = false;

    constructor(private route:ActivatedRoute, private router: Router, private resolver:ComponentFactoryResolver,
                private activityService:ActivityService, private historyNavigator: HistoryNavigation,
                private matDialog: MatDialog, private userStatusService: UserStatusService) {
        super();
        this.model = UberApplication.GetInstance();
        this.product = this.model.CurrentProduct;
        this.gamesLibrary = GamesLibraryService.GetInstance();
    }

    ngOnInit() {
        console.log("ACTIVITY-CONTROLLER : ngOnInit");
        this.model.addEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, this.disablePlaySection);
        UberReader.GetInstance().setHeaderToTransparent = true;

        if(this.paramsSubscription) this.paramsSubscription.unsubscribe();

        /* if (this.router.url.indexOf("play") != -1) {
            UberReader.GetInstance().showHeaderActionContent = false;
            this.Dispose();
            if(this.model.CurrentActivity) {
                this.Init(this.model.CurrentActivity);
                this.DisplayModel(false);
                if (this.gamesLibrary) this.gamesLibrary.headerTextChanged.next("Play / " + this.model.CurrentActivity.Activity_name);

                this.paramsSubscription = this.route.params
                    .subscribe( (params: Params) => {
                        if(this.isNewActivity) {
                            this.historyNavigator.popRoute(); //need this! so that Back button should always redirect to Games View, not to the last activity done by the user
                            this.ngOnInit();
                        }
                    }
                );
            }
            else {
                this.router.navigate([{outlets: {recommendOutlet: null, primary: 'play'}}]);
            }
        } */

        if (this.router.url.indexOf("play") != -1) {
            this.route.params.subscribe(param => {
                UberReader.GetInstance().showHeaderActionContent = true;
                let activityName: string = param.name;
                let proxyActivities: ProxyActivity[] = this.model.GetAllProxyActivities();
                let activity = proxyActivities.find(activity => activity.Activity_name.toLowerCase().replace(new RegExp(" ", "ig"), "-") == activityName);
                if (activity == null)
                    activity = proxyActivities.find(activity => activity.Activity_name.toLowerCase().replace(new RegExp(" ", "ig"), "-") == "testgame");
                let activityId: number = activity.Activity_id;
                console.log("ACTIVITY-CONTROLLER : ngOnInit route params : ", activityName, activityId);
                this.model.GetActivityData(activityId, this.GetActivityDataSuccess, this.GetActivityDataError);
            });
        }
    }

    private GetActivityDataSuccess = (event: ActivityEvent) => {
        console.log('ACTIVITY-CONTROLLER : GetActivityDataSuccess: ', event);
        event.target.removeEventListener(ActivityEvent.ACTVITY_DATA_RECEIVED, this.GetActivityDataSuccess);
        event.target.removeEventListener(ActivityEvent.ACTVITY_DATA_ERROR, this.GetActivityDataError);
        this.model.UpdateUserWorkingOn(event.activity.Activity_name);

        this.Dispose();
        this.Init(event.activity);
        this.DisplayModel(false);
        if (this.gamesLibrary) this.gamesLibrary.headerTextChanged.next("Play / " + this.model.CurrentActivity.Activity_name);

        UberReader.GetInstance().backButtonLabel = 'Back';
        this.historyNavigator.overrideBackBehavior = true;
        this.historyNavigator.addEventListener(UberApplicationEventTypes.REFRESH_NAVIGATION, this.navigateToGamesView);
    }

    private GetActivityDataError = (event: ActivityEvent) => {
        event.target.removeEventListener(ActivityEvent.ACTVITY_DATA_RECEIVED, this.GetActivityDataSuccess);
        event.target.removeEventListener(ActivityEvent.ACTVITY_DATA_ERROR, this.GetActivityDataError);

        this.router.navigate([{outlets: {recommendOutlet: null, primary: 'play'}}]);
        if (event.ErrorMessage == ErrorMessage.TRIAL_VERSION_ERROR) {
            UberReader.GetInstance().ActivateAccount();
            //TO DO UberReaderAccessor.GetUberReader().ActivateAccount(null, _model.GetUiTextByKey("TRIAL_ACTIVITY_ERROR_MESSAGE"));
        }
        else {
            this.model.showMdlAlertDialog(this.model.GetUiTextByKey("HTTPSERVICE_FAULT2"), this.model.GetUiTextByKey("HTTPSERVICE_FAULT_TITLE"),true);
        }
    }

    private navigateToGamesView = () => {
        this.historyNavigator.removeEventListener(UberApplicationEventTypes.REFRESH_NAVIGATION, this.navigateToGamesView);
        this.router.navigate([{outlets: {recommendOutlet: null, primary: 'play'}}]);
    }

    public Init(activity:Activity, courseActivity:any=null):void {
        console.log("ACTIVITY-CONTROLLER : Init : ", activity, courseActivity);
        UberReader.GetInstance().showBackButton = true;
        UberReader.GetInstance().showTitleHeader = true;
        UberReader.GetInstance().showNavLinks = false;
        this.methodArgsStart = {};
        this.methodArgsEnd = {};
        this.currentCourseActivity = courseActivity;
        this.model.CurrentActivity = this.currentActivity = activity;
        this.activityName = this.currentActivity.Dll_name.replace(".swf", "").replace(new RegExp("-", "g"), "");

        //if TYPESY
        if(BuildSettings.productId == AppSettings.TYPESY/* this.product.DisplayText && !this.product.DoPreprocessing */) { // using the commented condition will cause an error in public activity view (nearpod integration) when user is logged in. The product info will be accessed before it was initialized.
            if( this.activityName == "TestActivity" || this.activityName.indexOf("Dictation") > -1 || this.activityName.indexOf("LessonActivity") > -1) {
                this.activityName = "BasicTypingActivity";
            }

            /*if (this.activityName.indexOf("XmasFriends") > -1) {
                this.activityName = "ZType";
            }
            if( (this.activityName.indexOf("Test") > -1 ) ) {
                this.activityName = "Pacman";
            }
            else if (this.activityName.indexOf("Dictation") > -1) {
                this.activityName = "JimboJump";
            }
            else if(this.activityName.indexOf("LessonActivity") > -1) {
                this.activityName = "LetMeRock";
            } */
        }

        if (this.isPublic == false) {
            UberReader.GetInstance().UpdateMiniOdometer();
            this.nextRecommendedActivityId = this.model.GetNextRecommendedActivity(this.currentActivity.Activity_id);
        }
    }

    public Init2(activity:Activity, courseActivity:any=null, currentText:Text=null, aControls:AControl[]=null, settings:Setting[]= null) { // initialization for public display of activity - used in nearpod integration
        console.log("ACTIVITY-CONTROLLER : Init2 : ", activity, courseActivity);
        this.currentText = currentText;
        this.aControls = aControls;
        this.settings = settings;
        this.isPublic = true;

        this.Init(activity, courseActivity);
    }

    public skipToNextRecommendedActivity(): void {
        console.log("ACTIVITY-CONTROLLER : skipToNextRecommendedActivity");
        this.startRecommendedActivity(this.nextRecommendedActivityId);
    }

    public DisplayModel(forCourse:boolean):void {
        console.log("ACTIVITY-CONTROLLER : DisplayModel");
        this.calledStart = false;
        this.forCourse = forCourse;
        let activityType:string = this.model.GetActivityType(this.currentActivity);
        if(forCourse) {
            window.addEventListener("keydown", this.handleKeydown); // this is for the mouse-free feature
            if (activityType == "video_activity") {
                if(!this.currentActivity.Display_multimedia_screen || this.currentActivity.Display_multimedia_screen == null) {
                    this.viewState = ViewState.INTRO_COUNTER;
                    this.introCounterView.Init(this.currentCourseActivity, this.currentActivity.Activity_id, true);
                }
                else {
                    setTimeout( () => this.startActivityFromIntro(), 0);
                }
            }
            else {
                UberReader.GetInstance().titleHeader = this.currentCourseActivity.course.Course_name + " - " + this.currentCourseActivity.Intro_title;
                setTimeout( () => this.startActivityFromIntro(), 0);
                //this.introCounterView.Init(this.currentCourseActivity, this.currentActivity.Activity_id);
            }
        }
        else {
            if (this.isPublic) {
                window.addEventListener("keydown", this.handleKeydown); // this is for the mouse-free feature
            }

            if (activityType == "video_activity") {
                this.viewState = ViewState.VIDEO;
                this.videoActivity.Init2(this.currentActivity, this.currentCourseActivity.Intro_title);
            }
            else {
                UberReader.GetInstance().titleHeader = this.currentActivity.Activity_name;
                let showDescription:boolean = (this.model.GetUserPref("always_show_description") == "true" ||
                                            this.model.GetUserPref("always_show_description") == "") && AppSettings.useTrainingHelp; //!runActivityAgain &&

                if (this.isPublic && this.activityName == "LessonIntro") {
                    this.viewState = ViewState.INTRO_COUNTER;
                    this.currentCourseActivity.Intro_countdown = null;
                    this.currentCourseActivity.Button_text = 'Start';
                    this.introCounterView.Init(this.currentCourseActivity, this.currentActivity.Activity_id);
                }
                else {
                    if(showDescription && !this.isPublic) {
                        this.viewState = ViewState.TRAINING_HELP;
                        this.trainingHelp.Init(this.currentActivity);
                    }
                    else {
                        this.loadActivity();
                    }
                }
            }
        }
    }

    public Start():void {
        this.Pause(false);
        if( !this.calledStart ) {
            this.calledStart = true;
            this.CallFunction("startActivity", null);
        }
    }

    public Stop():void {
        this.CallFunction("closeProgram", null);
        this.CallFunction("stop", null);
        //this.CallFunction("ngOnDestroy", null);
        this.removeEventListeners();
        //this.removeAllElements();
        //activityGroup.removeAllElements();
        // TODO maybe call dispose or similar function in activities
        //this.removeElement(activityRef);
        if(this.activityRef) {
            try {
                console.log("CALLING NGONDESTROY FROM STOP");
                this.activityRef.ngOnDestroy();
                this.activityRef = null;
            }
            catch(e) {
                console.log("ERROR CALLING NGONDESTORY OF GAME: ", e);
            }
            this.activityService.HasActivityRef = false;
        }
    }

    public Pause(pause:boolean, displayDialog:boolean=false):void {
        //activityResults will only have a value when the activity has ended
        if(this.activityResults != null || pause == this.activityService.ActivityIsPaused) return;

        this.CallFunction("pause", pause);
        this.activityService.ActivityIsPaused = pause;
        if(pause) {
            this.pauseStartTime = new Date().getTime();
            if(displayDialog && this.activityService.ActivityOutlet != this.activityService.TYPING_TEST_OUTLET && this.model.GetUserPref("class_is_paused") != "True") {
                if (this.forCourse) {
                    this.model.showMdlAlertDialog("Click OK or press Enter to resume", "Activity is paused", false, "OK", () => { this.Pause(false) });
                }
                else {
                    this.model.showMdlAlertDialog("Click OK to resume", "Activity is paused", false, "OK", () => { this.Pause(false) });
                }
            }
            //console.log("PAUSED AT " + this.pauseStartTime);
        }
        else {
            this.SetContentFocus();
            if(this.pauseStartTime > -1) {
                this.totalPauseTime += ( new Date().getTime() - this.pauseStartTime ) / 1000;
                this.pauseStartTime = -1;
            }
            //console.log("TOTAL PAUSE TIME: " + this.totalPauseTime);
        }
    }

    public ForceStop(): void {
        if (this.activityService.ActivityOutlet == this.activityService.TYPING_TEST_OUTLET) return;
        this.CallFunction("pause", true);
        this.activityService.ActivityIsPaused = true;
        this.focusAccuracyVisible = true;
        this.model.showMdlAlertDialog("Please focus on your accuracy.", "", false, "Restart Activity", () => this.replayActivity(), null, true);
    }

    public replayActivity_clickHandler(): void {
        this.replayActivity();
    }

    public replayActivity():void {
        this.model.CloseAllOpenedDialogs();
        this.matDialog.closeAll();
        this.activityService.ActivityIsPaused = false;
        this.focusAccuracyVisible = false;
        this.activityService.ReplayData = [];
        this.calledStart = false;

        if (!this.forCourse) {
            UberReader.GetInstance().titleHeader = this.currentActivity.Activity_name;
        }

        //this.loadActivity();
        let activityType:string = this.model.GetActivityType(this.currentActivity);
        if (activityType == "flash_activity") {
            this.loadActivity(true);
        }
        else if (activityType == "video_activity") {
            this.viewState = ViewState.VIDEO;
            this.videoActivity.Init2(this.currentActivity, this.currentCourseActivity.Intro_title);
        }
    }

    public reloadRunningActivityText(): void {
      this.model.CloseAllOpenedDialogs();
      this.matDialog.closeAll();

      if (this.activityService.ActivityIsPaused === true) {
        this.CallFunction("pause", false);
        this.activityService.ActivityIsPaused = false;
      }

      this.setActivityText();
    }

    public SetContentFocus():void {
        if(this.activityRef != null) {
            this.CallFunction("setFocus", null);
        }
    }

    public CallFunctionLater( methodName:string, valueToPass:any ):void {
        this.methodArgsStart[methodName] = valueToPass;
    }

    public CallFunction( methodName:string, value:any ):void {
        if(this.activityRef != null) {
            try {
                if(value == null) {
                    this.activityRef[methodName]();
                }
                else {
                    this.activityRef[methodName](value);
                }
                console.log("CALLED " + methodName + "(" + value + ")");
            }
            catch (Error) {
                console.log("ERROR CALLING " + methodName + "(" + value + ")");
            }
        }
    }

    public Dispose():void {
        console.log("ACTIVITY-CONTROLLER : Dispose");
        this.videoActivity.Pause();
        this.introCounterView.Stop();
        this.endScreen.Reset();
        this.Stop();
        this.methodArgsStart = {};
        this.methodArgsEnd = {};
        this.methodArgsEnd = null;
        this.methodArgsStart = null;
        this.currentActivity = null;
        if (this.gamesLibrary) this.gamesLibrary.CurrentTextChangeCallback = null;
        this.activityService.ReplayData = [];
        this.activityService.IsActivityView = false;
    }

    public showActivityHandler( continueActivity:boolean ):void {
        if(continueActivity) {
            this.Pause(false);
            this.viewState = ViewState.ACTIVITY;
            this.activityService.IsActivityView = true;
        }
        else {
            this.activityService.ActivityIsPaused = false;
            this.loadActivity();
        }
    }

 	public showTrainingHelp():void {
        this.Pause(true);
        this.viewState = ViewState.TRAINING_HELP;
        this.trainingHelp.Init(this.model.CurrentActivity, true);
        this.activityService.IsActivityView = false;
    }

    public startRecommendedActivity( activityId:number ):void {
        //this.recommendedActivity.emit(activityId);

        if(this.model.getActivityById(activityId) == null) {
            UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_GETTING_ACTIVITY"));
        }

        this.model.GetActivityData(activityId, this.startActivity, this.activityCallFailed);
    }

    private startActivity = (event: ActivityEvent) => {
        console.log("ACTIVITY-CONTROLLER : startActivity of next recommended activity : ", event.activity);
        event.target.removeEventListener(ActivityEvent.ACTVITY_DATA_RECEIVED, this.startActivity);
        event.target.removeEventListener(ActivityEvent.ACTVITY_DATA_ERROR, this.activityCallFailed);
        UberReaderLoadingMessage.GetInstance().Hide();
        this.router.navigate(['/play', event.activity.Activity_name.toLowerCase().replace(new RegExp(" ", "ig"), "-")]);
    }

    private activityCallFailed = (event: ActivityEvent) => {
        event.target.removeEventListener(ActivityEvent.ACTVITY_DATA_RECEIVED, this.startActivity);
        event.target.removeEventListener(ActivityEvent.ACTVITY_DATA_ERROR, this.activityCallFailed);
        UberReaderLoadingMessage.GetInstance().Hide();

        if (event.ErrorMessage == ErrorMessage.TRIAL_VERSION_ERROR) {
            //TO DO UberReaderAccessor.GetUberReader().ActivateAccount(null, _model.GetUiTextByKey("TRIAL_ACTIVITY_ERROR_MESSAGE"));
        }
        else {
            //TO DO AlertDialog.show(_model.GetUiTextByKey("HTTPSERVICE_FAULT2"), _model.GetUiTextByKey("HTTPSERVICE_FAULT_TITLE"),this, true);
        }
    }

    public continueNextCourse( userCourse:User_Course ):void {
        this.nextCourse.emit(userCourse);
    }

    public startActivityFromIntro():void {
        console.log('ACTIVITY-CONTROLLER : startActivityFromIntro');
        let activityType:string = this.model.GetActivityType(this.currentActivity);
        if (activityType == "flash_activity") {
            this.loadActivity();
        }
        else if (activityType == "video_activity") {
            this.startActivityTimer();
            this.viewState = ViewState.VIDEO;
            this.videoActivity.Init(this.currentActivity, this.currentCourseActivity.Intro_title);
        }
    }

    private recommendedActivityReceived = (event:ActivityRecommendEvent) => {
        event.target.removeEventListener(ActivityRecommendEvent.ACTVITY_RECOMMEND_RECEIVED, this.recommendedActivityReceived);
        event.target.removeEventListener(ActivityRecommendEvent.ACTVITY_RECOMMEND_FAILED, this.recommendedActivityFailed);

        this.nextRecommendedActivityId = event.ActivityId;
        //console.log("next activity: " + this.nextRecommendedActivityId);
    }

    private recommendedActivityFailed = (event:ActivityRecommendEvent) => {
        event.target.removeEventListener(ActivityRecommendEvent.ACTVITY_RECOMMEND_RECEIVED, this.recommendedActivityReceived);
        event.target.removeEventListener(ActivityRecommendEvent.ACTVITY_RECOMMEND_FAILED, this.recommendedActivityFailed);
        //console.log("no recommended activity");
    }

    private nextRecommendedTextReceived = (event:NextRecommendedTextEvent) => {
        event.target.removeEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_RECEIVED, this.nextRecommendedTextReceived);
        event.target.removeEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_ERROR, this.nextRecommendedTextError);
        this.model.CurrentUserData.CurrentText = event.NextRecommendedText;
    }

    private nextRecommendedTextError = (event:NextRecommendedTextEvent) => {
        event.target.removeEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_RECEIVED, this.nextRecommendedTextReceived);
        event.target.removeEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_ERROR, this.nextRecommendedTextError);
        //console.log("no recommended text");
    }

    private loadActivity(isReplay: boolean = false):void {
        console.log("ACTIVITY-CONTROLLER : loadActivity");
        this.viewState = ViewState.ACTIVITY;

        if(this.activityRef) {
            // when the `type` input changes we destroy a previously created component before creating the new one
            try {
                console.log("CALLING NGONDESTROY FROM LOADACTIVITY");
                //this.activityRef.ngOnDestroy();
                this.activityRef = null;
            }
            catch(e) {
                console.log("ERROR CALLING NGONDESTORY OF GAME: ", e);
            }
            this.activityService.HasActivityRef = false;
        }

        //Get needed activity dynamically
        try {
            /* let activityComponent = Activities[this.activityName];
            let componentFactory = this.resolver.resolveComponentFactory(activityComponent);
            this.componentRef = this.activityContainer.createComponent(componentFactory);
            this.activityRef = this.componentRef.instance;
            this.activityService.HasActivityRef = true; */

            if (this.activityOutlet) {
                this.activityOutlet.deactivate();
            }
            if (isReplay) {
                if (this.isPublic) {
                    this.router.navigate(['/nearpod', this.currentCourseActivity.Course_activity_id], {skipLocationChange: true, replaceUrl: false, queryParams: {updateHistory: 0, replay : this.currentCourseActivity.Course_activity_id}});
                }
                else if (this.forCourse) {
                    this.repeat.emit();
                }
                else {
                    this.router.navigate(['/play'], {queryParams: {replay : this.currentActivity.Activity_name}});
                }
            }
            else {
                this.router.navigate([this.activityName], { relativeTo: this.route.parent, skipLocationChange: true, replaceUrl: false, queryParams: { updateHistory: 0 } });
            }
        }catch(Error) {
            this.model.showMdlAlertDialog("Error loading activity: " + this.activityName + " not found.", "Error",);
            return;
        }
    }

    public onRouterOutletActivate(componentRef) {
        console.log("ACTIVITY-CONTROLLER : onRouterOutletActivate : ", componentRef);
        this.activityRef = componentRef;
        this.activityService.HasActivityRef = true;
        this.addEventListeners();
        this.setUpActivity();
    }

    private setUpActivity():void {
        if(this.forCourse) {
            this.CallFunction("hideTrainingHelpButton", null);
        }

        let enableVoiceover = this.model.GetUserPref("enable_voiceover") == "true";
        this.CallFunction("setSpeechSynthesis", enableVoiceover);

        let useGameSounds = this.model.GetUserPref("use_game_sounds") == "true" || this.isPublic;
        this.CallFunction("useGameSounds", useGameSounds);

        let lastResult: Result = this.model.getLastResultForCurrentUser(this.model.CurrentProduct.Goal_1_key);
        let currentWPM: number = lastResult == null ? 0 : lastResult.Value;
        this.CallFunction("setInitialWPM", currentWPM);
        this.CallFunction("setActivityName", this.currentActivity.Activity_name);
        this.CallFunction("setTheme", this.model.GetUserPref("default_theme"));

        if (this.currentCourseActivity != null) {
            this.CallFunction("setCourseStepImg", this.currentCourseActivity.Course_activity_id);
        }

        this.setActivityText();
        this.setGameForCourse();
        // * TODO: For testing purposes only
        // this.forceFullWord = true;
        // !
        this.setForceFullWord();
        this.setupGuiOnLoad();
        /*FOR TESTING ONLY
        let activityName = this.currentActivity.Dll_name.replace(".swf", "").replace(new RegExp("-", "g"), "");
        if(activityName.indexOf("Dictation") > -1) {
            this.CallFunction("setAudio", "https://resources.ereflect.com/Typesy/audio/Dictation_Easy_A_Tale_Of_Two_Cities_By_Charles_Dickens.mp3");
            this.CallFunction("setAudioMarkers", "0.0|5.0|11.9|18.8|26.9|34.4|42.5|49.4|57.5|64.4|72.5|79.4|86.9|95.6|108.8|116.3|128.1|134.4");
        }
        else if(activityName.indexOf("Introduction") > -1) {
            this.CallFunction("setAudio", "https://resources.ereflect.com/Typesy/audio/home_row_instructions_asdf.mp3");
            this.CallFunction("setAudioMarkers", "8.2|10.1|13.2|15.9|18.8");
        }*/
        this.callFunctions();
    }

    private setActivityText():void {
        if (this.currentActivity.Requires_text) {
            if(this.currentActivity.Requires_basic_test && this.forCourse) {
                //TO DO
            }
            else {
                if (this.currentCourseActivity != null && this.currentCourseActivity.Text_id != null) {
                    let courseText:Text = this.currentText ? this.currentText : this.model.GetCourseText(this.currentCourseActivity.Text_id);
                    if(courseText.Topic_id && this.model.CurrentUserData && !this.isPublic) this.model.CurrentUserData.CurrentText = courseText; //only make it as current text if course text is selectable, example of non-selectable texts: Dictation Activity texts
                    this.CallFunction("setActivityText", courseText.Content);
                    this.CallFunction("setVoiceLetters", courseText.Voice_letters);
                    this.CallFunction("setTextTitle", courseText.Title);
                }
                else {
                    if (this.model.CurrentUserData.CurrentText == null) {
                        //TO DO currentAlertDialog = AlertDialog.show(model.GetUiTextByKey("ERR_ACTIVITY_MISSING_TEXT_MESSAGE"), "", UberReaderAccessor.GetUberReaderSprite(), false, 2, "Set text", "Cancel", selectText);
                    }
                    else {
                        let text:string = "";
                        if(this.product.DoPreprocessing) {
                            //TO DO
                        }
                        else {
                            text = this.model.processTextRemoveNewLines(this.model.CurrentUserData.CurrentText.Content);
                        }

                        text = StringUtils.TrimString(text);
                        this.CallFunction("setActivityText", text);
                        if (this.currentActivity.Category_id !== 66 && this.currentActivity.Category_id !== 139) {
                          this.CallFunction("setVoiceLetters", this.model.CurrentUserData.CurrentText.Voice_letters);
                          this.CallFunction("setTextTitle", this.model.CurrentUserData.CurrentText.Title);
                        }

                        if(this.product.DisplayText && !this.product.DoPreprocessing) {
                            let numTextUsed:string = this.model.GetUserPref("current_text_counter");
                            if(numTextUsed.length > 0 && parseInt(numTextUsed) >= 10) {
                                this.model.UpdateUserPref("current_text_counter", "0", true);
                                let multipleUseMessage:string = this.model.GetUiTextByKey("WARNING_MULTIPLE_TEXT_USE").replace("{0}", this.model.CurrentUserData.CurrentText.Title);
                                //TO DO this.model.showMdlConfirmDialog(multipleUseMessage, "", "Continue with " + this.model.CurrentUserData.CurrentText.Title, "Go to Library",)
                            }
                            else {
                                let counter:number = numTextUsed == "" ? 0 : parseInt(numTextUsed) + 1;
                                this.model.UpdateUserPref("current_text_counter", counter.toString(), true);
                                //TO DO StartActivity();
                            }
                        }
                        else {
                            //TO DO StartActivity();
                        }
                    }
                }
            }
        }
    }

    private setGameForCourse(): void {
      this.CallFunction("setGameForCourse", this.forCourse);
    }
    // * TODO: HERE!!!
    private setForceFullWord(): void {
      this.CallFunction("setForceFullWord", this.forceFullWord);
    }

    private setupGuiOnLoad():void {
        //Combine the settings with the following priority: Activity, User, Default
        let combinedSettings:Setting[] = this.model.getDefaultSettings();
        let userSettings:Setting[] = this.model.getSettingsForUser();
        let groupSettings:Setting[] = this.model.getSettingsForGroup();
        combinedSettings = this.settings ? this.settings : AControlUtil.CombineSettings(combinedSettings, userSettings, groupSettings);

        let courseActivitySettings:Setting[];
        if (this.currentCourseActivity != null) {
            courseActivitySettings = this.currentCourseActivity.Settings;
            combinedSettings = AControlUtil.CombineSettings(combinedSettings, courseActivitySettings, null);
        }

        let aControls:GenericControl[] = [];
        let activityControls:AControl[] = this.aControls ? this.aControls : this.model.getAControlByActivity(this.currentActivity);
        for (let aControl of activityControls) {
            let typeName:string = this.model.getCodeNameById(aControl.Type_id);
            let gControl:GenericControl = AControlFactory.GetAControl(aControl, typeName);
            if(gControl == null) continue;
            gControl.ApplySettings(combinedSettings);
            gControl.Group_name = aControl.Group_name;
            //gControl.addEventListener(AControlEvent.ACONTROL_CHANGED, control_ControlChanged, false, 0, true);

            /*TO DO
            //overridden settings in courses will not be visible
            let overriddenInCourseSettings:Boolean = false;
            if(_inCourseRunner && courseActivitySettings != null)
            {
                for each(let s:Setting in courseActivitySettings)
                {
                    if(ctrl.Function_name == s.Function_name)
                    {
                        overriddenInCourseSettings = true;
                        break;
                    }
                }
            }
            if (ctrl.Visible && !overriddenInCourseSettings)
            {
                    let rGroup:AControlContainer = new AControlContainer();
                    //rGroup.Header = ctrl.Group_name;
                    rGroup.useSeparator = false;
                    rGroup.addElement(gControl);
                    activityViewerControls.addElement(rGroup);

                    let spacer:Spacer = new Spacer();
                    spacer.percentWidth = 100;
                    activityViewerControls.addElement(spacer);
            }*/
            aControls.push(gControl);
        }

        //Send the settings to the current activity
        for (let genericControl of aControls) {
            let controlValues:DictionaryString<any> = genericControl.GetValues();
            for (let key in controlValues) {
                let value:string = controlValues[key];
                //console.log(key + " : " + value);
                this.CallFunctionLater(key, value);
            }
        }
    }

    private callFunctions():void {
        if(!this.calledStart) {

            this.CallFunction("setLocalResources", AppSettings.ActivitySoundLocationURLByType(AppSettings.LOCAL_MEDIA));

            if(!AppSettings.useMediaFolder) {
                this.CallFunction("setWebResources", AppSettings.ActivitySoundLocationURLByType(AppSettings.WEB_MEDIA));
            }

            for (let methodName in this.methodArgsStart) {
                this.CallFunction(methodName, this.methodArgsStart[methodName]);
            }

            for (let methodName in this.methodArgsEnd) {
                this.CallFunction(methodName, this.methodArgsEnd[methodName]);
            }

            this.calledStart = true;
            if (this.gamesLibrary) this.gamesLibrary.CurrentTextChangeCallback = this.currentTextUpdated;
            setTimeout( () => {
                this.CallFunction("startActivity", null);
                this.startActivityTimer();
            }, 0);
        }
    }

    private startActivityTimer():void {
        this.pauseStartTime = -1;
        this.totalPauseTime = 0;
        this.startTime = new Date().getTime();
        this.totalUsageTimeStored = false;
    }

    private addEventListeners():void {
        if(this.finishEventSubscriber) this.finishEventSubscriber.unsubscribe();
        this.finishEventSubscriber = this.activityService.finishedSubject.subscribe( results => this.activityFinished(results) );

        if(this.pauseEventSubscriber) this.pauseEventSubscriber.unsubscribe();
        this.pauseEventSubscriber = this.activityService.pausedSubject.subscribe( pause => this.Pause(pause, true) );

        if(this.forceStopEventSubscriber) this.forceStopEventSubscriber.unsubscribe();
        this.forceStopEventSubscriber = this.activityService.forceStopSubject.subscribe( () => this.ForceStop() );

        if(this.showTrainingHelpSubscriber) this.showTrainingHelpSubscriber.unsubscribe();
        this.showTrainingHelpSubscriber = this.activityService.showTrainingHelpSubject.subscribe( show => this.showTrainingHelp() );

        if(this.nextRecommendedSubscriber) this.nextRecommendedSubscriber.unsubscribe();
        this.nextRecommendedSubscriber = this.activityService.skipToNextRecommendedActivity.subscribe( () => this.skipToNextRecommendedActivity() );
    }

    private removeEventListeners():void {
        if(this.finishEventSubscriber) this.finishEventSubscriber.unsubscribe();
        if(this.pauseEventSubscriber) this.pauseEventSubscriber.unsubscribe();
        if(this.forceStopEventSubscriber) this.forceStopEventSubscriber.unsubscribe();
        if(this.paramsSubscription) this.paramsSubscription.unsubscribe();
        if(this.showTrainingHelpSubscriber) this.showTrainingHelpSubscriber.unsubscribe();
        if(this.nextRecommendedSubscriber) this.nextRecommendedSubscriber.unsubscribe();

        this.model.removeEventListener(UberApplicationEventTypes.CURRENT_TEXT_CHANGED, this.currentTextUpdated);
    }

    public videoFinished():void {
        if (!this.isPublic) {
            this.storeTimeUsed();
            if (this.currentCourseStep + 1 == this.model.CurrentUserCourse.course.Course_Activities.length) { //if current course step is the last step in the course
                this.wholeCourseFinished.emit();
            }
            else {
                this.finished.emit(true);
            }
        }
        else {
            this.showEndScreen();
        }
    }

    /*@HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        event.preventDefault();

        if(this.activityResults != null) {
            if(event.keyCode == 13) {
                this.model.hideMdlAlertDialog();
            }
        }
    }*/

    private activityFinished( results:any ):void {
        if (this.activityService.ActivityOutlet == this.activityService.TYPING_TEST_OUTLET) return;

        if (this.isPublic) {
            console.log(results);
            this.showEndScreen(results);
        }
        else {
            if (this.gamesLibrary != null && this.gamesLibrary.CurrentTextChangeCallback != null) {
              if (results.show_end_screen !== null && results.show_end_screen === false) {
                // * FOR FUTURE IMPLEMENTATION
              } else {
                this.gamesLibrary.CurrentTextChangeCallback = null;
              }
            }

            if(!this.forCourse && results.show_end_screen !== false && this.model.GetUserPref("games_auto_progress") == "true" && this.currentActivity.Requires_text) {
                this.model.GetNextRecommendedText(this.nextRecommendedTextReceived, this.nextRecommendedTextError);
                console.log('get here the next text');
            }

            if(this.courseViewMode == CourseViewMode.REVIEW_MODE) {
                if (results.status_points != null) {
                    results.status_points = 0;
                }
            }

            this.activityResults = results;
            if(results.overall && results.overall.length > 0) {
                console.log("WITH OVERALL RESULTS");
                this.storeResults(results);
                setTimeout(() => this.showEndScreen(results), 500);
            }
            else {
                this.totalUsageTime = this.storeTimeUsed();
                if (results.show_end_screen !== undefined && results.show_end_screen === false) {
                    setTimeout(() => {
                        this.model.AddStatusPoints2(results.status_points, this.pointsAddedSuccessful, this.pointsAddedFailed);
                    }, 1000);
                }
                else {
                    console.log("WITHOUT OVERALL RESULTS", results);
                    this.showEndScreen(results);
                }
            }

            if (this.forCourse && results.replayData.length > 0 && results.howFast != -1 && results.howFast != null) {
                //this.model.StoreUserTypingReplayData(results.replayData, this.currentCourseActivity.Course_activity_id, null);
                this.model.StoreUserTypingReplayData2(results.replayData, this.currentCourseActivity.Course_activity_id, null, results.startingPos, results.howFast, results.howWell);
            }
            else { //need to reset replayData for games
                this.activityService.ReplayData = [];
            }
        }
    }

    /* This function is only needed in main typing activities - Typing Lesson, Test Typing, Dictation */
    public storeResults (results:any) {
        let overallResults = results.overall;
        let howFast:number = results.howFast == null ? -1 : results.howFast;
        let howWell:number = results.howWell == null ? -1 : results.howWell;
        let minimumCharsToType:number = parseInt(UberApplication.getDefaultByKey('typesy_min_chars_to_type').Value);

        if(results.charsTyped >= minimumCharsToType || !this.forCourse) {
            if(howWell >= 0) {
                let howWellResult = {tag1: null, tag2: null, key: "how_well", value: howWell, storeVocabValues: false};
                overallResults.push(howWellResult);
            }

            if(howFast >= 0) {
                let howFastResult = {tag1: null, tag2: null, key: "how_fast", value: howFast, storeVocabValues: false};
                overallResults.push(howFastResult);
            }
        }

        if(overallResults.length > 0) {
            this.model.CurrentActivity = this.currentActivity;
            this.model.StoreResults(overallResults);
        }

        this.totalUsageTime = this.storeTimeUsed();
    }

    public continueFromEndScreen(): void {
        this.finished.emit(false);
    }

    private showEndScreen = ( data:any = null ) => {
        let results:any;
        if(data instanceof ClosePopUpEvent)
            results = data.Params;
        else
            results = data;

        if(this.forCourse) {
            if(this.currentCourseStep + 1 == this.model.CurrentUserCourse.course.Course_Activities.length) { //if current course step is the last step in the course
                this.wholeCourseFinished.emit();
            }
            else {
                //Commented out the codes below as they might be possible cause of the spacebar issue
                //let activityType:string = this.model.GetActivityType(this.currentActivity);
                //if (activityType == "video_activity" || (results && results.status_points == null)) {
                if (results && results.status_points == null) {
                    this.finished.emit(true);
                }
                else {
                    if (!this.repeatActivity()) {
                        if (this.isPublic) {
                            this.endScreen.InitAsPublic(this.currentCourseActivity, results);
                        }
                        else {
                            this.endScreen.InitByCourseActivity(this.currentCourseActivity, results);
                        }
                        //this.finished.emit(false);
                        this.viewState = ViewState.END_SCREEN;
                    }
                    else {
                        return;
                    }
                }
            }
        }
        else {
            if (this.isPublic) {
                this.endScreen.InitAsPublic(this.currentCourseActivity, results);
            }
            else {
                this.endScreen.InitByActivity(results, this.totalUsageTime, this.nextRecommendedActivityId);
            }
            this.viewState = ViewState.END_SCREEN;
        }
        this.activityResults = null;

        if(this.activityRef) {
            try {
                console.log("CALLING NGONDESTROY FROM SHOWENDSCREEN");
                //this.activityRef.ngOnDestroy();
                this.activityRef = null;
            }
            catch(e) {
                console.log("ERROR CALLING NGONDESTORY OF GAME: ", e);
            }
            this.activityService.HasActivityRef = false;
        }
        if (!this.isPublic) UberReader.GetInstance().UpdateMiniOdometer();
    }

    private storeTimeUsed():number {
        let totalSeconds:number = 0;
        if(!this.totalUsageTimeStored && this.currentActivity != null) {
            let endTime:number = new Date().getTime();
            totalSeconds = Math.floor((endTime - this.startTime) / 1000);
            totalSeconds -= this.totalPauseTime;
            if (totalSeconds > 0) {
                let activityType:string = this.model.getCodeNameById(this.currentActivity.Type_id);
                this.model.StoreScore("time_used", activityType, this.currentActivity.Activity_name, totalSeconds, false);
                this.totalUsageTimeStored = true;
            }
        }
        return totalSeconds;
    }

    private canStart():void {
        dispatchEvent(new Event("activityCanStart"));
    }

    /**
     * If there are group user prefs for min speed and accuracy, these user pref values are used instead of the course activity keys
     * BUT if the group user prefs are empty and the course activity has the key, then check user value against key value and recommend repeat if value is less than the key values
     */
    private repeatActivity(): boolean {
        let forceRepeatActivity: boolean = false;
        let minSpeedRequired: any = this.model.GetUserPref("minimum_typing_speed");
        let minAccuracyRequired: any = this.model.GetUserPref("minimum_typing_accuracy");
        forceRepeatActivity = (minSpeedRequired != "" && parseInt(minSpeedRequired) != -1) || (minAccuracyRequired != "" && parseInt(minAccuracyRequired) != -1 );

        if (this.currentCourseActivity.Key_1 != null || forceRepeatActivity) {
            minSpeedRequired = minSpeedRequired != "" ? parseInt(minSpeedRequired) : this.currentCourseActivity.Key_1_min;
            minSpeedRequired = minSpeedRequired == null ? 0 : minSpeedRequired;
            minAccuracyRequired = minAccuracyRequired != "" ? parseInt(minAccuracyRequired) : this.currentCourseActivity.Key_2_min;
            minAccuracyRequired = minAccuracyRequired == null ? 0 : minAccuracyRequired;

            let key1Name:string = this.model.CurrentProduct.Goal_1_name;
            let key1Unit:string = this.model.CurrentProduct.Goal_1_unit;
            let key1Result:number = forceRepeatActivity ? this.activityResults.howFast : this.model.getLastResultForCurrentUser(this.currentCourseActivity.Key_1).Value;
            let key2Result:number = 0.0;

            //build message box text; may need to check if value exists
            let text: string = StringUtils.substitute(this.model.GetUiTextByKey("WARNING_ADAPTIVE_LEARNING_DEFAULT_MESSAGE") , key1Name, key1Result, key1Unit, key1Name, minSpeedRequired, key1Unit);

            if (this.currentCourseActivity.Key_2 != null || forceRepeatActivity) {
                // may need to check if value exists
                let key2Name:string = this.model.CurrentProduct.Goal_2_name;
                let key2Unit:string = this.model.CurrentProduct.Goal_2_unit;
                key2Result = forceRepeatActivity ? this.activityResults.howWell : this.model.getLastResultForCurrentUser(this.currentCourseActivity.Key_2).Value;
                text += StringUtils.substitute(this.model.GetUiTextByKey("WARNING_ADAPTIVE_LEARNING_EXTENDED_MESSAGE"), key2Name, key2Result, key2Unit, key2Name, minAccuracyRequired, key2Unit);
            }

            //checks if user has failed to achieve any key. Will work if there is only 1 key provided; may need to check if value exists
            if (key1Result < minSpeedRequired || (key2Result!=0.0 && key2Result < minAccuracyRequired)) {
                if(forceRepeatActivity) {
                    while (text.indexOf("&[nl]") >= 0) {
                        text = text.replace("&[nl]","<br>");
                    }
                    this.forceAdaptiveLearningPromptVisible = true;
                    let adaptiveLearningPrompt = this.matDialog.open(AdaptiveLearningDialog, {
                        data: {speed: key1Result, requiredSpeed: minSpeedRequired, accuracy: key2Result, requiredAccuracy: minAccuracyRequired, forceRepeat: true},
                        disableClose: true,
                        width: '678px'
                    });
                    adaptiveLearningPrompt.afterClosed().subscribe((event:ClosePopUpEvent) => this.repeatActivityAlertHandler(event));
                    //this.model.showMdlAlertDialog(text, this.model.GetUiTextByKey("WARNING_ADAPTIVE_LEARNING_TITLE"), false, "Restart Activity", this.repeatActivityAlertHandler, null, true);
                }
                else {
                    text += this.model.GetUiTextByKey("WARNING_ADAPTIVE_LEARNING_RETRY_MESSAGE");
                    while (text.indexOf("&[nl]") >= 0) {
                        text = text.replace("&[nl]","<br>");
                    }
                    this.adaptiveLearningPromptVisible = true;
                    let adaptiveLearningPrompt = this.matDialog.open(AdaptiveLearningDialog, {
                        data: {speed: key1Result, requiredSpeed: minSpeedRequired, accuracy: key2Result, requiredAccuracy: minAccuracyRequired, forceRepeat: false},
                        disableClose: true,
                        width: '678px'
                    });
                    adaptiveLearningPrompt.afterClosed().subscribe((event:ClosePopUpEvent) => this.repeatActivityAlertHandler(event));
                    //this.model.showMdlConfirmDialog(text, this.model.GetUiTextByKey("WARNING_ADAPTIVE_LEARNING_TITLE"), this.model.GetUiTextByKey("GEN_NO"), this.model.GetUiTextByKey("GEN_YES"), this.repeatActivityAlertHandler);
                }
                return true;
            }
        }
        return false;
    }

    private repeatActivityAlertHandler = (event:ClosePopUpEvent) => {
        this.adaptiveLearningPromptVisible = false;
        this.forceAdaptiveLearningPromptVisible = false;
        if (event.detail != ClosePopUpEvent.OK) {
            this.endScreen.InitByCourseActivity(this.currentCourseActivity, this.activityResults);
            //this.finished.emit(false);
            this.activityResults = null;
            this.viewState = ViewState.END_SCREEN;
        }
        else {
            this.repeat.emit();
        }
    }

    private disablePlaySection = (event) => {
        if (!this.model.CurrentUser.Is_admin && this.model.GetUserPref("hide_play_section") == "True") {
            if (this.router.url.indexOf("play") != -1) {
                this.Dispose();
            }
            /* else {
                if(this.activityRef != null) {
                    this.Pause(true, true);
                }
            } */
        }
    }

    private currentTextUpdated = (event:ClosePopUpEvent) => {
        /* if(this.model.IsRecommendedTextAvailable == false){
            this.CallFunction('IsRecommendedtextAvail',false);
        } */
        //activityResults will only have a value when the activity has ended
        if(this.activityResults != null) return;

        if (this.currentActivity.Category_id !== 66 && this.currentActivity.Category_id !== 139) {
          this.CallFunction('IsRecommendedtextAvail',this.model.IsRecommendedTextAvailable);
        }

        if (this.viewState == ViewState.TRAINING_HELP) {
            this.calledStart = false;
            this.trainingHelp.Init(this.model.CurrentActivity, false);
        }
        else {
          if (this.currentActivity.Category_id === 66 || this.currentActivity.Category_id === 65 || this.currentActivity.Category_id === 64 || this.currentActivity.Category_id === 63 || this.currentActivity.Category_id === 139) {
            this.reloadRunningActivityText();
          } else {
            this.replayActivity(); // TODO:
          }
        }
    }

    public handleKeydown = (event: KeyboardEvent) => {
        //console.log("KEYDOWN ", event);
        if (event.key == null) return;
        if (event.ctrlKey || event.keyCode == 27) {
            event.preventDefault();
            event.stopPropagation();
        }

        switch(this.viewState) {
            case ViewState.VIDEO:
                if (event.key == " ") {
                    this.videoActivity.toggleVideo();
                }
                else if (event.key.toLowerCase().indexOf("right") != -1 || event.key == "Enter") {
                    this.videoActivity.finishVideo();
                }
                else if (event.key.toLowerCase().indexOf("left") != -1) {
                    this.videoActivity.minimize();
                    this.previousStep.emit(event);
                }
                else if (event.keyCode == 27) { //if ESC
                    this.videoActivity.minimize();
                }
                break;
            case ViewState.INTRO_COUNTER:
                if (event.key == "Enter" && this.introCounterView.counterLabel == -1) {
                    this.startActivityFromIntro();
                }
                else if (event.key.toLowerCase().indexOf("right") != -1 || event.key == "Enter") {
                    this.nextStep.emit(event);
                }
                else if (event.key.toLowerCase().indexOf("left") != -1) {

                    this.previousStep.emit(event);
                }
                break;
            case ViewState.ACTIVITY:
                if (event.key.toLowerCase().indexOf("right") != -1 && !this.adaptiveLearningPromptVisible && !this.forceAdaptiveLearningPromptVisible && !this.activityService.ActivityIsPaused) {
                    this.nextStep.emit(event);
                }
                else if (event.key.toLowerCase().indexOf("left") != -1 && !this.adaptiveLearningPromptVisible && !this.forceAdaptiveLearningPromptVisible && !this.activityService.ActivityIsPaused) {
                    this.previousStep.emit(event);
                }

                if (this.activityName == "LessonIntro") {
                    /*
                    Disabled: pause/play lesson intro when pressing spacebar
                    if (event.key == " ") {
                        this.Pause(!this.activityService.ActivityIsPaused);
                    }*/
                }
                else {
                    if (this.activityName == "BasicTypingActivity") {
                        if (!this.activityService.ActivityIsPaused) {
                            if (event.key.toLowerCase().indexOf("up") != -1) {
                                this.CallFunction("toggleShowKeyboard", null);
                            }
                            else if (event.key.toLowerCase().indexOf("down") != -1) {
                                this.CallFunction("toggleShowKeyboard", null);
                            }
                        }
                    }
                    else { //if activity is a game
                        if (event.key == "p" && event.ctrlKey) {
                            if (this.activityService.ActivityIsPaused) {
                                this.model.CloseAllOpenedDialogs();
                                this.matDialog.closeAll();
                            }
                            this.Pause(!this.activityService.ActivityIsPaused, true);
                        }
                    }

                    if (this.currentActivity.Dll_name.indexOf("Dictation") != -1) {
                        if (event.ctrlKey) {
                            if (event.key == "s") {
                                this.CallFunction("toggleDictationText", null);
                            }
                            else if (event.key == "h") {
                                this.CallFunction("toggleDictationText", null);
                            }
                            else if (event.key == "r") {
                                this.CallFunction("replayDictation", null);
                            }
                        }
                    }

                    if (this.activityService.ActivityIsPaused && event.key == "Enter") {
                        if (this.focusAccuracyVisible) {
                            this.replayActivity();
                        }
                        else {
                            this.model.CloseAllOpenedDialogs();
                            this.matDialog.closeAll();
                            this.Pause(false);
                        }
                    }

                    if (this.adaptiveLearningPromptVisible || this.forceAdaptiveLearningPromptVisible) {
                        if (event.key == "Enter") {
                            this.model.CloseAllOpenedDialogs();
                            this.matDialog.closeAll();
                            this.repeatActivityAlertHandler(new ClosePopUpEvent(ClosePopUpEvent.CLOSE, ClosePopUpEvent.OK));
                        }
                        else if (event.key.toLowerCase().indexOf("right") != -1 && !this.forceAdaptiveLearningPromptVisible) {
                            this.model.CloseAllOpenedDialogs();
                            this.matDialog.closeAll();
                            this.repeatActivityAlertHandler(new ClosePopUpEvent(ClosePopUpEvent.CLOSE, ClosePopUpEvent.CANCEL));
                        }
                    }
                }
        }
    }

    // * Referred from game end screen component
    public pointsAddedSuccessful = (event: StatusPointsEvent) => {
        console.log("pointsAddedSuccessful for third party games", event);
        if (event) {
            event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_ADDED, this.pointsAddedSuccessful);
            event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_ADD_ERROR, this.pointsAddedFailed);
            event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVED, this.pointsAddedSuccessful);
            event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVE_ERROR, this.pointsAddedFailed);
        }

        let userStatusData: any = this.userStatusService.update();
        if (userStatusData.newFeatures) { //|| BuildSettings.isLocalBuild) {
            let newStatLevelDialog = this.matDialog.open(NewStatusLevelDialog, {
                data: userStatusData,
                width: '1100px',
                disableClose: true,
                panelClass: 'status-level-increase-dialog'
            });

            newStatLevelDialog.afterClosed().subscribe( () => {
                if (this.activityResults.status_points > 0) {
                    this.model.showMatSnackBar('star', ('You earned ' + this.activityResults.status_points + ' Typesy point').concat((this.activityResults.status_points > 1) ? 's' : ''));
                }
                this.activityResults = null;
                UberReader.GetInstance().UpdateMiniOdometer();
            });
        }
        else {
            if (this.activityResults.status_points > 0) {
                this.model.showMatSnackBar('star', ('You earned ' + this.activityResults.status_points + ' Typesy point').concat((this.activityResults.status_points > 1) ? 's' : ''));
            }
            this.activityResults = null;
            UberReader.GetInstance().UpdateMiniOdometer();
        }
    }

    public pointsAddedFailed = (event: StatusPointsEvent) => {
      if (event) {
        event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_ADDED, this.pointsAddedSuccessful);
        event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_ADD_ERROR, this.pointsAddedFailed);
        event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVED, this.pointsAddedSuccessful);
        event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVE_ERROR, this.pointsAddedFailed);
      }

      this.model.showMatSnackBar('error_outline', 'Failed to add Typesy Points');
      this.activityResults = null;
      console.log('TCL: ActivityController -> publicpointsAddedFailed -> pointsAddedFailed');
    }

    ngOnDestroy() {
        if(!this.forCourse && this.gamesLibrary) this.gamesLibrary.headerTextChanged.next("Play");
        this.model.removeEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, this.disablePlaySection);
        window.removeEventListener("keydown", this.handleKeydown);
        this.Dispose();
        this.historyNavigator.overrideBackBehavior = false;
        UberReader.GetInstance().setHeaderToTransparent = false;
        UberReader.GetInstance().titleHeader = "";
    }
}
