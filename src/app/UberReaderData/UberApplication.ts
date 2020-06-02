import { Lesson_Plan } from './DataClasses/db/Lesson_Plan';
import {
    IMdlDialogAction,
    MdlDialogReference,
    MdlDialogService,
    MdlSnackbarService
} from '@angular-mdl/core';
import { Injectable, Type, NgZone } from '@angular/core';

import { UberDataAccessRemoteService } from './UberDataAccess/uber-data-access-remote.service';
import { AppSettings } from './AppSettings';
import { SearchTextSessionCache } from './UberDataAccess/SearchTextSessionCache';
import { StringUtils } from './Utils/StringUtils';
import { TreeNode } from './Utils/TreeNode';
import { EventDispatcher } from './Events/EventDispatcher';
import { UberApplicationEvent } from './Events/UberApplicationEvent';
import { UberApplicationEventTypes } from './Events/UberApplicationEventTypes';
import { AControlEvent } from './Events/AControlEvent';
import { AddCourseEvent } from './Events/AddCourseEvent';
import { AddPrepProgramEvent } from './Events/AddPrepProgramEvent';
import { InvalidTokenEvent } from './Events/InvalidTokenEvent';
import { UberSyncEvent } from './Events/UberSyncEvent';
import { VocabSyncEvent } from './Events/VocabSyncEvent';
import { TextSyncEvent } from './Events/TextSyncEvent';
import { AddWordToListEvent } from './Events/AddWordToListEvent';
import { WordUserChangedEvent } from './Events/WordUserChangedEvent';
import { DeleteWordEvent } from './Events/DeleteWordEvent';
import { QuestionSyncEvent } from './Events/QuestionSyncEvent';
import { WordDiscoverEvent } from './Events/WordDiscoverEvent';
import { TreeNodeEvent } from './Events/TreeNodeEvent';
import { ProductsEvent } from './Events/ProductsEvent';
import { UserAuthenticatedEvent } from './Events/UserAuthenticatedEvent';
import { WordlistEvent } from './Events/WordlistEvent';
import { ProxyWordlistEvent } from './Events/ProxyWordlistEvent';
import { ProxyTestsEvent } from './Events/ProxyTestsEvent';
import { TestDataEvent } from './Events/TestDataEvent';
import { ChartDataEvent } from './Events/ChartDataEvent';
import { UberReaderTextEvent } from './Events/UberReaderTextEvent';
import { UserProfilePicUpdateEvent } from './Events/UserProfilePicUpdateEvent';
import { GetImageEvent } from './Events/GetImageEvent';
import { ImportTextDocumentEvent } from './Events/ImportTextDocumentEvent';
import { CheckUpdateEvent } from './Events/CheckUpdateEvent';
import { EventTypes } from './Events/EventTypes';
import { WordSenseEvent } from './Events/WordSenseEvent';
import { WordEvent } from './Events/WordEvent';
import { MultiAddWordEvent } from './Events/MultiAddWordEvent';
import { WordsLookupEvent } from './Events/WordsLookupEvent';
import { UITextEvent } from './Events/UITextEvent';
import { StatusPointsEvent } from './Events/StatusPointsEvent';
import { WikiServiceEvent } from './Events/WikiServiceEvent';
import { WordlistShareSettingsEvent } from './Events/WordlistShareSettingsEvent';
import { SharedProxyWordlistsEvent } from './Events/SharedProxyWordlistsEvent';
import { SharedObjectEvent } from './Events/SharedObjectEvent';
import { MessageEvent } from './Events/MessageEvent';
import { NewsItemsEvent } from './Events/NewsItemsEvent';
import { ProxyTextsEvent } from './Events/ProxyTextsEvent';
import { TextShareSettingsEvent } from './Events/TextShareSettingsEvent';
import { CourseEvent } from './Events/CourseEvent';
import { CourseActivityPreviewEvent } from './Events/CourseActivityPreviewEvent';
import { ActivityEvent } from './Events/ActivityEvent';
import { TextsSearchEvent } from './Events/TextsSearchEvent';
import { BookCoverEvent } from './Events/BookCoverEvent';
import { ActivityIconEvent } from './Events/ActivityIconEvent';
import { CourseIntroEvent } from './Events/CourseIntroEvent';
import { WordUsageExampleEvent } from './Events/WordUsageExampleEvent';
import { OnScreenIntroImageEvent } from './Events/OnScreenIntroImageEvent';
import { TextsTableEvent } from './Events/TextsTableEvent';
import { DiscoveryBrowseEvent } from './Events/DiscoveryBrowseEvent';
import { DiscoverProgramEvent } from './Events/DiscoverProgramEvent';
import { CourseInfoEvent } from './Events/CourseInfoEvent';
import { ProgramInfoEvent } from './Events/ProgramInfoEvent';
import { CourseToWishlistEvent } from './Events/CourseToWishlistEvent';
import { ProgramToWishlistEvent } from './Events/ProgramToWishlistEvent';
import { CourseCommentEvent } from './Events/CourseCommentEvent';
import { CoursePreviewEvent } from './Events/CoursePreviewEvent';
import { ProductInfoEvent } from './Events/ProductInfoEvent';
import { RatingCourseEvent } from './Events/RatingCourseEvent';
import { AControl } from './DataClasses/db/AControl';
import { Activity } from './DataClasses/db/Activity';
import { Activity_Category } from './DataClasses/db/Activity_Category';
import { Chart } from './DataClasses/db/Chart';
import { Chart_Category } from './DataClasses/db/Chart_Category';
import { Code } from './DataClasses/db/Code';
import { Course_Category } from './DataClasses/db/Course_Category';
import { Default } from './DataClasses/db/Default';
import { ProxyText } from './DataClasses/other/ProxyText';
import { PurchaseData } from './DataClasses/other/PurchaseData';
import { ProductInfo } from './DataClasses/db/ProductInfo';
import { Result } from './DataClasses/db/Result';
import { Setting } from './DataClasses/db/Setting';
import { ProxyWordlist } from './DataClasses/other/ProxyWordlist';
import { Question_Group } from './DataClasses/db/Question_Group';
import { Text } from './DataClasses/db/Text';
import { Wordlist } from './DataClasses/db/Wordlist';
import { Wordlist_Category } from './DataClasses/db/Wordlist_Category';
import { Word_Discover } from './DataClasses/db/Word_Discover';
import { Word_User } from './DataClasses/db/Word_User';
import { Word_Sense } from './DataClasses/db/Word_Sense';
import { UserData } from './DataClasses/other/UserData';
import { UserIdentificationData } from './DataClasses/other/UserIdentificationData';
import { User_Comment } from './DataClasses/db/User_Comment';
import { User_Course } from './DataClasses/db/User_Course';
import { User_Prep_Program } from './DataClasses/db/User_Prep_Program';
import { Prep_Program } from './DataClasses/db/Prep_Program';
import { User_Question } from './DataClasses/db/User_Question';
import { User_Notes } from './DataClasses/db/User_Notes';
import { User_Text } from './DataClasses/db/User_Text';
import { UserPref } from './DataClasses/db/UserPref';
import { User } from './DataClasses/db/User';
import { Course } from './DataClasses/db/Course';
import { ProxyCourse } from './DataClasses/other/ProxyCourse';
import { Wordlist_Word } from './DataClasses/db/Wordlist_Word';
import { Language } from './DataClasses/db/Language';
import { StatusLevel } from './DataClasses/other/StatusLevel';
import { Feedback } from './DataClasses/db/Feedback';
import { AuthorPicture } from './DataClasses/other/AuthorPicture';
import { Word_Pos } from './DataClasses/db/Word_Pos';
import { Offer } from './DataClasses/db/Offer';
import { SharedProxyText } from './DataClasses/other/SharedProxyText';
import { Word } from './DataClasses/db/Word';
import { PrepEdCourseFilter } from './DataClasses/other/PrepEdCourseFilter';
import { UberReader } from "../UberReaderClient/UberReader";
import { WordUsageExample } from './DataClasses/db/WordUsageExample';
import { NewWordsAddedToListEvent } from './Events/NewWordsAddedToListEvent';
import { UserInfoEvent } from './Events/UserInfoEvent';
import { HtmlService } from './Utils/Services/HtmlService';
import { UserProgressedEvent } from './Events/UserProgressedEvent';
import { ConfirmDialog, DialogType } from '../UberReaderClient/UberReaderComponents/Dialogs/ConfirmDialog';
import { MatSnackBarDialog } from '../UberReaderClient/UberReaderComponents/Dialogs/MatSnackBarDialog';
import { Observable } from 'rxjs/Rx';
import { PrepRecommendationEvent } from './Events/PrepRecommendationEvent';
import { TempUserData, UserGroup } from './DataClasses/other/TempUserData';
import { DataStorageManager } from '../UberReaderClient/DataStorageManager';
import { UserAppBgImgUpdateEvent } from './Events/UserAppBgImgUpdateEvent';
import { ExamInfo } from './DataClasses/db/ExamInfo';
import { LeaderboardEvent } from './Events/LeaderboardEvent';
import { UserProfileInfo } from './DataClasses/other/UserProfileInfo';
import { ProxyLessonPlan } from './DataClasses/other/ProxyLessonPlan';
import { LessonPlanEvent } from './Events/LessonPlanEvent';
import { AdminEvent } from './Events/AdminEvent';
import { AdminUserEvent } from './Events/AdminUserEvent';
import { AdminUser } from './DataClasses/db/AdminUser';
import { UserGroupEvent } from './Events/UserGroupEvent';
import { Group } from './DataClasses/db/Group';
import { AdminGroupEvent } from './Events/AdminGroupEvent';
import { AdminLiveUserDataEvent } from './Events/AdminLiveUserDataEvent';
import { AdminGroupSettingsEvent } from './Events/AdminGroupSettingsEvent';
import { NextPrepRecommendationEvent } from './Events/NextPrepRecommendationEvent';
import { GroupReportDataEvent } from './Events/GroupReportDataEvent';
import { AdminDataSyncEvent } from './Events/AdminDataSyncEvent';
import { AdminUserGoalsEvent } from './Events/AdminUserGoalsEvent';
import { Customer } from './DataClasses/db/Customer';
import { AddPrepProgramsEvent } from './Events/AddPrepProgramsEvent';
import { NextRecommendedTextEvent } from './Events/NextRecommendedTextEvent';
import { AdminCleverSyncEvent } from './Events/AdminCleverSyncEvent';
import { CleverEvent } from './Events/CleverEvent';
import { GroupLessonPlanEvent } from './Events/GroupLessonPlanEvent';
import { TypingTestEvent } from './Events/TypingTestEvent';
import { TypingTest } from './DataClasses/db/Typing_Test';
import { TypingTestSyncEvent } from './Events/TypingTestSyncEvent';
import { ProxyTypingTest } from './DataClasses/other/ProxyTypingTest';
import { NewTypingTestEvent } from './Events/NewTypingTestEvent';
import { ProgressObjectEvent } from './Events/ProgressObjectEvent';
import { UserTypingTestResult } from './DataClasses/db/User_Typing_Test_Result';
import { School_Trial_Info } from './DataClasses/db/School_Trial_Info';
import { OrganizationLogoUpdateEvent } from './Events/OrganizationLogoUpdateEvent';
import { UserSettingSyncEvent } from './Events/UserSettingSyncEvent';
import { DeviceInfo } from '@capacitor/core';
import { TicketEvent } from './Events/TicketEvent';
import { RunningTaskEvent } from './Events/RunningTaskEvent';
import { AdminDistrictSyncEvent } from './Events/AdminDistrictSyncEvent';
import { UploadEvent } from './Events/UploadEvent';
import { UserNotification } from './DataClasses/db/UserNotification';
import { TypingTask } from './DataClasses/db/Typing_Task';
import { TypingTaskEvent } from './Events/TypingTaskEvent';
import { UserTypingTaskResult } from './DataClasses/db/User_Typing_Task_Result';
import { TypingTasksDataSyncEvent } from './Events/TypingTasksDataSyncEvent';
import { ProxyTypingTask } from './DataClasses/other/ProxyTypingTask';
import { TypingTaskResultEvent } from './Events/TypingTaskResultEvent';
import { ProxyActivity } from './DataClasses/other/ProxyActivity';
import { CharacterCompetencyEvent } from './Events/CharacterCompetencyEvent';
import { SurveyReviewEvent } from './Events/SurveyReviewEvent';
import { SurveyReview } from './DataClasses/db/SurveyReview';
import { LessonPlanInfoEvent } from './DataClasses/db/LessonPlanInfoEvent';
import { Grading_Template } from './DataClasses/db/Grading_Template';
import { GradingTemplateEvent } from './Events/GradingTemplateEvent';
import { UserPrefEvent } from './Events/UserPrefEvent';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ReplayEvent } from './Events/ReplayEvent';
import { TypesyCourseActivityEvent } from './DataClasses/db/TypesyCourseActivityEvent';
import { TypesyPublicProfileEvent } from './Events/TypesyPublicProfileEvent';
import { AdminSubscriptionEvent } from './Events/AdminSubscriptionEvent';
import { WordlistSearchEvent } from './Events/WordlistSearchEvent';
import { UploadPurchaseOrderEvent } from './Events/UploadPurchaseOrderEvent';
import { LessonPlanSyncEvent } from './Events/LessonPlanSyncEvent';
import { PrintCertificateEvent } from './Events/PrintCertificateEvent';
import { TypesyStatusLevel } from './DataClasses/db/Typesy_Status_Level';
import { PlacementTest } from './DataClasses/db/PlacementTest';
import { UpgradeOfferEvent } from './Events/UpgradeOfferEvent';

declare var gapi:any;
declare var google;

@Injectable()
export class UberApplication extends EventDispatcher
{
    private static _theApp:UberApplication;
    public hasStarted:boolean = false;
    public hasLoggedIn:boolean = false;

    public currentlySelectedWordlist:ProxyWordlist = null;
    private _tempUserData: TempUserData = new TempUserData();
    public GetTempUserData(): TempUserData {
        return this._tempUserData;
    }

    public storeUserGroup(group:string):void
    {
        if (this.CurrentUser != null)
        {
            this.UpdateUserPref("group", group, true);
        }
        DataStorageManager.GetInstance().SetStorageUserPref("group", group);
    }

    public get CurrentUserGroup():string
    {
        if (this.CurrentUser != null)
        {
            return this.GetUserPref("group");
        }
        else
        {
            return DataStorageManager.GetInstance().GetStorageUserPref("group");
        }
    }

    public getRandomUserGroup():string {
        return UserGroup.GROUPS[Math.floor(Math.random() * UserGroup.GROUPS.length)];
    }

    private _deviceInfo: any;
    public GetDeviceInfo() {
        return this._deviceInfo ? this._deviceInfo : { platform: 'web' };
    }

    public SetDeviceInfo(info: any) {
        this._deviceInfo = info;
    }

    public get IsMacintosh(): boolean {
        return false;
    }

    public get IsIOS(): boolean {
        return this.GetDeviceInfo().platform == 'ios';
    }

    public get AllowPrint(): boolean {
        return this.GetDeviceInfo().platform == 'web';
    }

    public get AllowImport(): boolean {
        return this.GetDeviceInfo().platform == 'web';
    }

    public get AllowGoogleClassroom(): boolean {
        return this.GetDeviceInfo().platform == 'web';
    }

    public get AllowOtherLogins(): boolean {
        return this.GetDeviceInfo().platform == 'web';// || this.GetDeviceInfo().platform == 'android';
    }

    public GetTourTemplate(): string {
        return `<div class="popover" role="tooltip">
                    <div class="arrow"></div>
                    <h3 class="popover-title"></h3>
                    <div class="popover-content"></div>
                    <div class="popover-navigation">
                        <div class="btn-group">
                            <button class="btn btn-sm btn-default" data-role="prev">&laquo; Prev</button>
                            <button class="btn btn-sm btn-default" data-role="next">Next &raquo;</button>
                            <button class="btn btn-sm btn-default" data-role="end">End</button>
                        </div>
                    </div>
                </div>`;
                //<button class="btn btn-sm btn-default" data-role="pause-resume" data-pause-text="Pause" data-resume-text="Resume">Pause</button>
    }

    public SetTourStepViewed(tourStepKey:string):void
    {
        if (this.hasLoggedIn)
        {
            UberApplication.GetInstance().UpdateUserPref(tourStepKey, "seen", false);
        }
        else
        {
            DataStorageManager.GetInstance().SetStorageUserPref(tourStepKey, "seen");
        }
    }

    public HasViewedTourStep(tourStepKey:string):boolean
    {
        //return false;
        // UNCOMMENT ABOVE IF YOU WANT TO TEST TOUR
        if (this.hasLoggedIn)
        {
            let userPref = this.GetUserPref(tourStepKey);
            return userPref != null && userPref.length > 0;
        }
        else
        {
            let pref = DataStorageManager.GetInstance().GetStorageUserPref(tourStepKey);
            return pref != null && pref.length > 0;
        }
    }

    public SetAdminPageSize(pageSize: number):void
    {
        if (this.hasLoggedIn)
        {
            UberApplication.GetInstance().UpdateUserPref('adminPageSize', pageSize + '', false);
        }
        else
        {
            DataStorageManager.GetInstance().SetStorageUserPref('adminPageSize', pageSize + '');
        }
    }

    public GetAdminPageSize(): number {
        let userPref;
        if (this.hasLoggedIn)
        {
            userPref = this.GetUserPref('adminPageSize');
        }
        else
        {
            userPref = DataStorageManager.GetInstance().GetStorageUserPref('adminPageSize');
        }
        return userPref != null && userPref.length > 0 ? parseInt(userPref) : 10;
    }

    // private _loginStatus:string = null;

    // public GetLoginStatus(callback?:(status:string) => void):string
    // {
    //     if (callback)
    //     {

    //     }
    //     return this._loginStatus;
    // }
    // public SetLoginStatus(value:string)
    // {
    //     this._loginStatus = value;
    // }

    public static GetExistingInstance():UberApplication
    {
        return UberApplication._theApp;
    }

    public static GetInstance():UberApplication
    {
        // if (UberApplication._theApp == null)
        // {
        //     UberApplication._theApp = new UberApplication();
        // }
        return UberApplication._theApp;
    }

    public static RestartInstance():UberApplication
    {
        // if (UberApplication._theApp != null)
        // {
        //     UberApplication._theApp = new UberApplication();
        // }
        return UberApplication._theApp;
    }

    private notifOptions:any = {
        position: ["bottom", "left"],
        animate: 'fromLeft',
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: true,
        clickToClose: true,
        lastOnBottom: true,
        maxStack: 6
    };

    public showSnackbar(message:string, actionText?:string, actionHandler?:()=>void) {
        if (actionText) {
            this.mdlSnackbarService.showSnackbar({
                message: message,
                timeout: 5000/*2750*/,
                closeAfterTimeout: true,
                action: {
                    handler: actionHandler,
                    text: actionText
                }
            });
        }
        else {
            this.mdlSnackbarService.showToast(message, 5000);
        }
    }

    public showMatSnackBar(icon: string, message: string) {
      this.ngZone.run(() => {
          const config = new MatSnackBarConfig();
          config.panelClass = 'centerDiv';
          config.data = {
            icon: icon,
            message: message
          };
          config.duration = 5000;

          this.matSnackBar.openFromComponent(MatSnackBarDialog, config);
        }
      );
    }

    public showMdlAlertDialog(alertMessage: string, title?: string, isError?:boolean, okText: string="OK", closeHandler?: (event: UberApplicationEvent) => void, params?: any, hideCloseBtn?: boolean) {
        if(isError) title = "Oops";
        return this.showDialog(DialogType.DIALOG_TYPE_ALERT, alertMessage, title, isError, null, okText, closeHandler, params, null, hideCloseBtn);
    }

    public showMdlConfirmDialog(message: string, title?: string, declineText?: string, confirmText?: string, closeHandler?: (event: UberApplicationEvent) => void, params?: any) {
        return this.showDialog(DialogType.DIALOG_TYPE_CONFIRM, message, title, null, declineText, confirmText, closeHandler, params);
    }

    public showMdlBlockingDialog(alertMessage: string, title?: string, isError?:boolean) {
        this.showDialog(DialogType.DIALOG_TYPE_BLOCKING, alertMessage, title, isError);
    }

    private showDialog(dialogType:number, message: string, title?: string, isError?:boolean, declineText?: string, confirmText?: string, closeHandler?: (event: UberApplicationEvent) => void, params?: any, actions?: IMdlDialogAction[], hideCloseBtn?: boolean) {
        let dialogData:any = {
            dialogType: dialogType,
            message: message,
            title: title,
            isError: isError,
            declineText: declineText,
            confirmText: confirmText,
            closeHandler: closeHandler,
            params: params,
            actions: actions,
            hideCloseBtn: hideCloseBtn
        };
        
        let dialog = this.matDialog.open(ConfirmDialog, {            
            data: dialogData,
            disableClose: true,
            width: '450px'
        });

        return dialog;

        /* let pDialog = this.mdlDialogService.showCustomDialog({
            providers: [{provide: "data", useValue: dialogData}],
            component: ConfirmDialog,
            isModal: true,
            styles: {'width': '450px'}
        }); */

        //commented out by Jomelyn; code is causing bugs; not efficient
        //pDialog.subscribe( (dialogReference) => this.currentMdlDialogRef = dialogReference );
    }

    /* public showExercisesDialog(openFromTest: boolean = false, isGameLoaded: boolean = false): Observable<MdlDialogReference>  {
        return this.mdlDialogService.showCustomDialog({
            providers: [{provide: 'data', useValue: {openFromTest: openFromTest, isGameLoaded: isGameLoaded}}],
            component: ExercisesDialog,
            isModal: true,
            clickOutsideToClose: false,
            classes: 'exercises-dialog'
            //styles: { 'width': '1100px', 'height': 'auto' }
        });
    } */

    private isRecommendedTextAvailable: boolean = null;
    public get IsRecommendedTextAvailable(): boolean {
      return this.isRecommendedTextAvailable;
    }

    public set IsRecommendedTextAvailable(isRecommendedTextAvailable: boolean) {
      this.isRecommendedTextAvailable = isRecommendedTextAvailable;
    }

    private resetTextExercise: boolean = false;
    public get ResetTextExercise(): boolean {
      return this.resetTextExercise;
    }

    public set ResetTextExercise(open: boolean) {
      this.resetTextExercise = open;
    }

    //courses view overlap workaround
    /* public showCourseReviewDialog(course: Course, callback?: (courseActivityIndex: number) => void): void {
        this.CurrentUserCourse = this.GetUserCourseByID(course.Course_id);
        this.CurrentUserCourse.course = course;

        /* let courseCompleteDialog = this.mdlDialogService.showCustomDialog({
            component: CourseCompleteDialog,
            isModal: true,
            providers: [{provide: User_Course, useValue: this.CurrentUserCourse}],
            clickOutsideToClose: true,
            styles: {'width': '550px'}
        });

        const courseCompleteDialog = this.matDialog.open(CourseCompleteDialog, {
            width: '550px',
            data: this.CurrentUserCourse
        });

        //courseCompleteDialog.subscribe((dialogRef) => this.currentMdlDialogRef = dialogRef );
        courseCompleteDialog.afterClosed().subscribe(selectedIndex => {
            if(selectedIndex >= 0) callback(selectedIndex);
        });
    } */

    private currentMdlDialogRef:MdlDialogReference;
    public set CurrentMdlDialogRef(dialogRef: MdlDialogReference) {
        this.currentMdlDialogRef = dialogRef;
    }

    public get CurrentMdlDialogRef(): MdlDialogReference {
        return this.currentMdlDialogRef;
    }

    /*public hideMdlAlertDialog(): void {
        if(this.currentMdlDialogRef) this.currentMdlDialogRef.hide();
    }*/

    private openedDialogRefs:MdlDialogReference[] = [];
    public HasOpenDialogs():Boolean
    {
        return this.openedDialogRefs.length > 0;
    }

    public AddToOpenedDialogRefs(dialogRef: MdlDialogReference) {
        this.openedDialogRefs.push(dialogRef);
    }

    public CloseAllOpenedDialogs(): void {
        for(let dialog of this.openedDialogRefs) {
            dialog.hide();
        }
        this.openedDialogRefs = [];
    }

    public RemoveFromOpenedDialogs(dialogRef: MdlDialogReference): void {
        let index = this.openedDialogRefs.indexOf(dialogRef);
        if(index != -1) this.openedDialogRefs.splice(index, 1);
    }

    public showMdlDialogWithChoices(question: string, title?: string, actions?: IMdlDialogAction[]) {
        this.showDialog(DialogType.DIALOG_TYPE_CHOICES, question, title, null, 'Close', null, null, null, actions);
        /*
        let pDialog = this.mdlDialogService.showDialog({
            title: title,
            message: question,
            actions: actions,
            fullWidthAction: true,
            isModal: true
        });
        */
    }

    public drawTypingSpeedGauge(element: any, currentValue: number, targetValue: number, maximumValue: number, minorTicks: number, tickInterval: number, width: number, height: number, label: string='') {
        this.drawGoogleGauge(element, currentValue, targetValue, maximumValue, minorTicks, tickInterval, width, height, label);
    }

    public drawTypingAccuracyGauge(element: any, currentValue: number, targetValue: number, minorTicks: number, tickInterval: number, width: number, height: number, label: string='') {
        this.drawGoogleGauge(element, currentValue, targetValue, 100, minorTicks, tickInterval, width, height, label);
    }

    private drawGoogleGauge = (element: any, currentValue: number, targetValue: number, maximumValue: number, minorTicks: number, tickInterval: number, width: number, height: number, label: string='') => {
        if (google.visualization == null || element == null) return;

        let data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          [label, currentValue]
        ]);

        let majorTicks: number[] = [];
        for (let num: number = 0; num <= maximumValue; num += tickInterval) {
            majorTicks.push(num);
        }

        let options = {
            chartArea: {'width': '100%', 'height': '100%'},
            max: maximumValue,
            greenFrom: targetValue >= maximumValue ? maximumValue : targetValue,
            greenTo: maximumValue,
            majorTicks: majorTicks,
            minorTicks: minorTicks,
            fontSize: 16
        };

        //chart.clearChart();
        let chart = new google.visualization.Gauge(element.nativeElement);
        chart.draw(data, options);
    }

    public drawSuccessStatusChart = (element: any, currentStatusPoints: number, nextStatusLevel?: TypesyStatusLevel) => {
        if (element == null || google.visualization == null) return;

        let arr: any = [
            ['Task', 'Hours per Day']
        ]

        if (nextStatusLevel) {
            arr.push(['Points Required for ' + nextStatusLevel.Name, nextStatusLevel.RequiredStatusPoints - currentStatusPoints]);
        }
        arr.push(['Points Collected', currentStatusPoints]);

        let data = google.visualization.arrayToDataTable(arr);

        let options = {
            pieHole: 0.4,
            slices: {
                0: { color: '#3e92d7' },
                1: { color: '#34ad07' }
            },
            backgroundColor: 'transparent',
            legend: {position: 'bottom',textStyle: { fontSize: 13}},
            pieSliceText: 'value',
            fontSize: 16,
            tooltip: {
              text: 'value'
          }
        };

        //chart.clearChart();
        let chart = new google.visualization.PieChart(element.nativeElement);
        chart.draw(data, options);
    }

    public drawProgressChart = (element: any, progress: number, stepsCompleted: number, totalSteps: number) => {
        if (element == null || google.visualization == null) return;

        let arr: any = [
            ['Task', 'Hours per Day'],
            [stepsCompleted + ' steps complete', progress],
            [(totalSteps - stepsCompleted) + ' steps left to do', 100 - progress]
        ]

        let data = google.visualization.arrayToDataTable(arr);

        let options = {
            pieHole: 0.8,
            slices: {
                0: { color: '#34AD07' },
                1: { color: '#CCCCCC' }
            },
            backgroundColor: 'transparent',
            legend: 'none',
            pieSliceText: 'none',
            pieStartAngle: 270,
            fontSize: 12
            //tooltip: { trigger: 'none' },
        };

        //chart.clearChart();
        let chart = new google.visualization.PieChart(element.nativeElement);
        chart.draw(data, options);
    }

    constructor(private ar:UberDataAccessRemoteService, private htmlService:HtmlService,
                private mdlSnackbarService: MdlSnackbarService,
                private mdlDialogService:MdlDialogService,
                public matDialog: MatDialog,
                public matSnackBar: MatSnackBar,
                private ngZone: NgZone)
    {
        super();

        this.ar.addEventListener(InvalidTokenEvent.INVALID_TOKEN, this.redispatchEvent);
        this.ar.addEventListener(InvalidTokenEvent.TOKEN_INVALIDATED, this.redispatchEvent);

        this.ar.addEventListener(UberSyncEvent.USER_DATA_SYNC, this.redispatchEvent);
        this.ar.addEventListener(VocabSyncEvent.VOCAB_DATA_SYNC, this.vocabSynced);
        this.ar.addEventListener(TextSyncEvent.TEXT_DATA_SYNC, this.textSynced);
        this.ar.addEventListener(TypingTestSyncEvent.TEST_DATA_SYNC, this.typingTestSynced);
        this.ar.addEventListener(QuestionSyncEvent.QUESTION_DATA_SYNC, this.redispatchEvent);
        this.ar.addEventListener(UberApplicationEventTypes.USER_WORDLIST_CHANGED, this.redispatchEvent);
        this.ar.addEventListener(ProductInfoEvent.UPDATE_REQUIRED, this.redispatchEvent);
        this.ar.addEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, this.redispatchEvent);

        this.ar.addEventListener(UploadEvent.UPLOAD_START, this.redispatchEvent);
        this.ar.addEventListener(UploadEvent.UPLOAD_PROGRESS, this.redispatchEvent);
        this.ar.addEventListener(UploadEvent.UPLOAD_END, this.redispatchEvent);
        this.ar.addEventListener(UploadEvent.UPLOAD_ERROR, this.redispatchEvent);

        this.ar.addEventListener(TypingTasksDataSyncEvent.USER_TASKS_DATA_SYNC, this.redispatchEvent);
        this.ar.addEventListener(LessonPlanSyncEvent.LESSON_PLAN_SYNC, this.redispatchEvent);

        UberApplication._theApp = this;
    }

    // public keyDownEvent(event:KeyboardEvent):void
    // {
    // 	this.ar.keyDownEvent(event);
    // }

    // private loadSound(word:Word):void
    // {
    // 	if (this._wordSound)
    // 	{
    // 		this._wordSound.removeEventListener(Event.COMPLETE, this.wordSoundLoaded);
    // 		this._wordSound.removeEventListener(IOErrorEvent.IO_ERROR, this.wordSoundLoadFailed);
    // 		try {this._wordSound.close();}
    // 		catch (Error) {}
    // 	}
    // 	var firstChar:string = word.Word_text.charAt(0).toLowerCase();
    // 	if (firstChar.charCodeAt(0) >= AppSettings.CharCode_a && firstChar.charCodeAt(0) <= AppSettings.CharCode_z)
    // 	{
    // 		this._wordSound = new Sound();
    // 		this._wordSound.addEventListener(Event.COMPLETE, this.wordSoundLoaded);
    // 		this._wordSound.addEventListener(IOErrorEvent.IO_ERROR, this.wordSoundLoadFailed);
    // 		var wordSoundUrl:string
    // 		/*if (AppSettings.localNetworkLocationAvailable)
    // 		{
    // 			wordSoundUrl = UberReaderAccessor.GetDataStorageManager().GetWordSoundUrl(word.Word_text);
    // 		}
    // 		else
    // 		{*/
    // 			wordSoundUrl = AppSettings.SoundLocationURL + firstChar + "/" + word.Word_text + ".mp3";
    // 		//}
    // 		this._wordSound.load(new URLRequest(wordSoundUrl));
    // 	}
    // }

    private wordlistRestart:boolean = true; //to prevent restarting twice
    private vocabSynced = (event:VocabSyncEvent) =>
    {
        if (event.ResetWordlist)
        {
            var defaultWordlist:Wordlist = this.GetDefaultWordlist();
            if(defaultWordlist != null)
            {
                this._current_user_data.Current_wordlist_id = defaultWordlist.Wordlist_id;
                //_current_user_data.Aux_wordlist_id = defaultWordlist.Wordlist_id;

                this._current_user_data.Current_word_id = defaultWordlist.WordlistWords[0].Word_id;
                this.OnCurrentWordlistChanged();

                //this.loadSound(this.CurrentWord);
                event.ResetWordlist = false;
            }
            else
            {
                event.ResetWordlist = event.ResetWordlist && this.wordlistRestart;
                this.wordlistRestart = false;
            }
        }
        this.dispatchEvent(event);
    }

    private textRestart:boolean = true; //to prevent restarting twice
    private textSynced = (event:TextSyncEvent) => {
        if(this.CurrentUserData == null) return;
        if(event.UpdatedCurrentText != null)
        {
            if(this.CurrentUserData.CurrentText._Date < event.UpdatedCurrentText._Date)
                this.CurrentUserData.CurrentText = event.UpdatedCurrentText;
        }

        if (event.ResetText)
        {
            event.ResetText = event.ResetText && this.textRestart;
            this.textRestart = false;
        }
        this.dispatchEvent(event);
    }

    private testDispatched: boolean = false;
    public set TestDispatched(value: boolean) {
        this.testDispatched = value;
    }

    public GetTypingTest(proxyTypingTest: ProxyTypingTest): TypingTest {
        return this.ar.GetTypingTestFromCache(proxyTypingTest);
    }

    private typingTestSynced = (event: TypingTestSyncEvent) => {
        this.dispatchEvent(event);

        let groupIds = event.TypingTest.map(test => test.GroupId);
        let instructors: AdminUser[] = [];
        groupIds.forEach(id => {
            let groupInstructors = this.GetInstructorsByGroup(id);
            if (groupInstructors) {
                instructors = instructors.concat(groupInstructors);
            }
        });

        if (!UberReader.GetInstance().loggedIn || this.testDispatched || event.TypingTest == null || event.TypingTest.length == 0 ||
                this.CurrentUser.Is_admin || instructors.some(instructor => instructor.User_id == this.CurrentUser.User_id)) {
            return;
        }

        let activeTests: ProxyTypingTest[] = event.TypingTest.slice();
        let testResults: UserTypingTestResult[] = event.TypingTestResults;
        let testToDispatch: ProxyTypingTest;

        for (let test of event.TypingTest) {
            let result = testResults.find(result => result.TypingTestId == test.TypingTestId);
            if (result) {
                if (result.Attempts < test.AllowedAttempts) {
                    testToDispatch = test;
                    break;
                }
                // if the result's attempts exceeded the test's allowed no. of attempts, still allow the user to take the test
                // the number of attempts will still be recorded and users with test result exceeding the allowed no. of attempts will be indicated in the admin interface
                else if (result.Speed == null && result.Accuracy == null) {
                    testToDispatch = test;
                    break;
                }
                // if a test has a result and the result's no. of attempts is greater than the test's allowed no. of attempts
                // it means the test has been completed by the user
                else {
                    activeTests.splice(activeTests.indexOf(test), 1);
                }
            }
        }

        if (testToDispatch == null) {
            testToDispatch = activeTests.find(test => test.ForceStart == true);
            if (testToDispatch == null && activeTests[0]) {
                testToDispatch = activeTests[0];
            }
        }

        if (testToDispatch) {
            this.ar.addEventListener(TypingTestEvent.TYPING_TEST_RECEIVED, this.typingTestReceived);
            this.ar.addEventListener(TypingTestEvent.TYPING_TEST_ERROR, this.typingTestError);
            this.ar.GetTypingTest(testToDispatch);
        }
    }

    private typingTestReceived = (event: TypingTestEvent) => {
        this.ar.removeEventListener(TypingTestEvent.TYPING_TEST_RECEIVED, this.typingTestReceived);
        this.ar.removeEventListener(TypingTestEvent.TYPING_TEST_ERROR, this.typingTestError);
        let typingTest = event.TypingTest;
        let result: UserTypingTestResult = this.GetResultByID(typingTest.TypingTestId);
        this.testDispatched = true;
        this.ar.SetCurrentTypingTest(typingTest);

        if (result && (result.Attempts < typingTest.AllowedAttempts || result.Speed == null && result.Accuracy == null)) {
            this.dispatchEvent(new NewTypingTestEvent(NewTypingTestEvent.REPEAT_TYPING_TEST, typingTest, null));
        }
        else if (typingTest.ForceStart) {
            this.dispatchEvent(new NewTypingTestEvent(NewTypingTestEvent.FORCE_START_TYPING_TEST, typingTest, null));
        }
        else {
            this.dispatchEvent(new NewTypingTestEvent(NewTypingTestEvent.ACTIVE_TYPING_TEST, typingTest, null));
        }
    }

    private typingTestError = (event: TypingTestEvent) => {
        this.ar.removeEventListener(TypingTestEvent.TYPING_TEST_RECEIVED, this.typingTestReceived);
        this.ar.removeEventListener(TypingTestEvent.TYPING_TEST_ERROR, this.typingTestError);
        this.showMdlAlertDialog("You have been assigned to a test but there seems to be a problem with getting the test data.", "", true);
    }

    public GetCurrentTypingTest():TypingTest {
        return this.ar.GetCurrentTypingTest();
    }

    /*
    private questionRestart:boolean = true; //to prevent restarting twice
    private questionSynced(event:QuestionSyncEvent):void
    {
        if(event.UpdatedCurrentText != null)
        {
            if(this.CurrentUserData.CurrentText._Date < event.UpdatedCurrentText._Date)
            this.CurrentUserData.CurrentText = event.UpdatedCurrentText;
        }

        if (event.ResetText)
        {
            event.ResetText = event.ResetText && this.textRestart;
            this.textRestart = false;
        }
        this.dispatchEvent(event);
    }
    */

    public init(product:ProductInfo):void
    {
        this._currentProduct = product;
        this.hasStarted = true;
        //_currentProduct = UberApplication.getProductById(AppSettings.CurrentProductId);
        //formatter.formatString="YYYY-MM-DD HH:NN:SS";

        //this.ar.StartSyncing();
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.APP_STARTED));
    }

    private _currentActivity:Activity;
    public get CurrentActivity():Activity
    {
        return this._currentActivity;
    }
    public set CurrentActivity(value:Activity)
    {
        this._currentActivity = value;
    }

    private _currentUserCourse:User_Course;
    public get CurrentUserCourse():User_Course
    {
        return this._currentUserCourse;
    }
    public set CurrentUserCourse(value:User_Course)
    {
        this._currentUserCourse = value;
    }

    public ShowWordInfoForCurrentActivity():boolean
    {
        return this.CurrentProduct.DisplayVocab && this.CurrentActivity != null && this.CurrentActivity.Show_word_info != null && this.CurrentActivity.Show_word_info;
    }

    private _currentProduct:ProductInfo;
    public get CurrentProduct():ProductInfo
    {
        return this._currentProduct;
    }

    private _currentUser:User;
    public get CurrentUser():User
    {
        return this._currentUser;
    }
    public set CurrentUser(value:User)
    {
        this._currentUser = value;

        this.hasLoggedIn = value != null;
        this.CurrentUserData = new UserData(value);

        this.ar.StartSyncing();
    }

    private _current_user_data:UserData;
    public get CurrentUserData():UserData
    {
        return this._current_user_data;
    }
    public set CurrentUserData(value:UserData)
    {        
        this._current_user_data = value;

        if(this._currentUser)
            this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.NEW_USER));
    }

    // private _wordSound:Sound;
    // public get CurrentWordSound():Sound
    // {
    // 	return this._wordSound;
    // }
    public get CurrentWord():Word
    {
        if (this._current_user_data.Current_word_id == null || this.GetWordById(this._current_user_data.Current_word_id) == null)
        {
            var defaultWord:Word = this.GetDefaultWord();
            this.CurrentWord = defaultWord;
            //_current_user_data.Current_word_id = defaultWord.Word_id;
            // update current word userPref
        }

        if(this._current_user_data.Current_word_id != null)
        {
            return this.GetWordById(this._current_user_data.Current_word_id);
        }
        else
        {
            return null;
        }

        /*if (_currentUser.Current_word_id == null)
        {
            //_currentUser.word = GetDefaultWord();
            var defualtWord:Word = GetDefaultWord();
            _currentUser.Current_word_id = defualtWord.Word_id;
            return defualtWord;
        }
        else
        {
            return GetWordById(_currentUser.Current_word_id);
        }*/
    }
    public set CurrentWord(value:Word)
    {
        if(value != null)
        {
            this._current_user_data.Current_word_id = value.Word_id;
            //update userPref
            this.UpdateUserPref("current_word_id", value.Word_id.toString(), true);
            //this.ar.UpdateUser_Word(CurrentUser.User_id, value.Word_id);
            this.OnCurrentWordChanged();

            //_currentUser.word = value;
            //_currentUser.Current_word_id = value.Word_id;
            //this.ar.UpdateUser_Word(CurrentUser.User_id, value.Word_id);
            //OnCurrentWordChanged();

            //this.loadSound(value);
        }
        /*else
        {
            _current_user_data.Current_word_id.setString(null);
            UpdateUserPref("current_word_id", "", true);
            OnCurrentWordChanged();
        }*/
    }

    // private wordSoundLoadFailed(event:Event):void
    // {
    // 	this._wordSound.removeEventListener(Event.COMPLETE, this.wordSoundLoaded);
    // 	this._wordSound.removeEventListener(IOErrorEvent.IO_ERROR, this.wordSoundLoadFailed);
    // 	this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORD_SOUND_LOAD_FAILED));
    // }

    // private wordSoundLoaded(event:Event):void
    // {
    // 	this._wordSound.removeEventListener(Event.COMPLETE, this.wordSoundLoaded);
    // 	this._wordSound.removeEventListener(IOErrorEvent.IO_ERROR, this.wordSoundLoadFailed);
    // 	this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.WORD_SOUND_LOADED));
    // }

    public get CurrentWordlist():Wordlist
    {
        if(this.CurrentProduct.DisplayVocab || this.CurrentProduct.DisplayQuestion)
        {
            if (this._current_user_data.Current_wordlist_id == null || this.getWordlistById(this._current_user_data.Current_wordlist_id) == null)
            {
                var defaultWordlist:Wordlist = this.GetDefaultWordlist();
                if(defaultWordlist)
                {
                    this.CurrentWordlist = defaultWordlist;
                }
            }

            //if still empty then return null
            if(this._current_user_data.Current_wordlist_id == null)
            {
                return null;
            }
            else
            {
                var wordlist:Wordlist = this.getWordlistById(this._current_user_data.Current_wordlist_id);
                if (wordlist.Name == "[display_name] Words")
                {
                    var displayName:string = this.CurrentUserData.DisplayNamePosessive;
                    wordlist.Name = wordlist.Name.replace("[display_name]", displayName);
                }

                return wordlist;
            }
        }
        else
        {
            return null;
        }

    }
    public set CurrentWordlist(value:Wordlist)
    {
        //_currentUser.Current_wordlist = value;
        this._current_user_data.Current_wordlist_id = value.Wordlist_id;
        if (value.User_id == null && (this._current_user_data.Aux_wordlist_id == null || this._current_user_data.Aux_wordlist_id != value.Wordlist_id))
        {
            this.AuxWordlist = value;
        }
        this.UpdateUserPref("current_wordlist_id", value.Wordlist_id.toString(), true);
        this.OnCurrentWordlistChanged();
    }

    public get AuxWordlist():Wordlist
    {
        if (this._current_user_data.Aux_wordlist_id == null || this.getWordlistById(this._current_user_data.Aux_wordlist_id) == null)
        {
            var defaultWordlist:Wordlist = this.GetDefaultWordlist();
            this.AuxWordlist = defaultWordlist;
        }
        return this.getWordlistById(this._current_user_data.Aux_wordlist_id);
    }
    public set AuxWordlist(value:Wordlist)
    {
        this._current_user_data.Aux_wordlist_id = value.Wordlist_id;
        this.UpdateUserPref("aux_wordlist_id", value.Wordlist_id.toString(), true);
    }

    /**
     * User Functions
     */

    public LogUserOn(user:User):void
    {
        this._currentUser = user;
        /*if( user.Local_Network_Location != null && user.Local_Network_Location.length > 0)
        {
            AppSettings.SetLocalNetworkDirectory(user.Local_Network_Location);
            CheckLocalNetworkDirectory();
        }*/
    }

    /*public CheckLocalNetworkDirectory():void
    {
        if(_currentUser.Local_Network_Location != null && _currentUser.Local_Network_Location.length > 0)
        {
            try
            {
                var testFileUrl:string = AppSettings.getProductResourcesURL2(true) + "directoryVerifier";
                var loader:URLLoader = new URLLoader();
                loader.dataFormat = URLLoaderDataFormat.BINARY;
                loader.addEventListener(Event.COMPLETE, (event:Event):void
                {
                    AppSettings.localNetworkLocationAvailable = true;
                });
                loader.addEventListener(IOErrorEvent.IO_ERROR, (event:Event):void
                {
                    AppSettings.localNetworkLocationAvailable = false;
                    dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.LOCAL_NETWORD_DIRECTORY_MISSING));
                });
                loader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, (event:Event):void
                {
                    AppSettings.localNetworkLocationAvailable = false;
                    dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.LOCAL_NETWORD_DIRECTORY_MISSING));
                });
                loader.load(new URLRequest(testFileUrl));
            }
            catch (e:Error)
            {
                AppSettings.localNetworkLocationAvailable = false;
                dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.LOCAL_NETWORD_DIRECTORY_MISSING));
            }
        }
    }*/

    public GetAllUsers():User[]
    {
        return this.ar.SelectAllUsers();
    }

    public NoUsersExist():boolean
    {
        var numUsers:number = this.ar.CountUsers();
        if (numUsers == 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public ProfilePicLoaded():void
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.PROFILE_PIC_LOADED));
    }

    public DeleteUser(user:User):void
    {
        //DeleteUserHistory(user);
        this.ar.DeleteUser(user.User_id);
    }

    /*public DeleteCurrentUserHistory():void
    {
        DeleteUserHistory(_currentUser);
    }*/

    /*public DeleteUserHistory(user:User):void
    {
        //user.word = null;
        user.Current_word_id;
        //user.Current_wordlist = null;
        user.Current_wordlist_id;
        user.Aux_wordlist = null;
        user.Aux_wordlist_id;
        // look at nullInts
        //user.Goal_1 = CurrentProduct.Goal_1_default;
        //user.Goal_2 = CurrentProduct.Goal_2_default;

        this.ar.ClearUserHistory(user.User_id);

        if (CurrentProduct.DisplayVocab)
        {
            OnUserWordlistChanged();
        }
        //SubmitChanges();
        //ResetWordUserCache();
    }*/

    public FireUserWordlistChanged():void
    {
        this.OnUserWordlistChanged();
    }

    private OnUserWordlistChanged():void
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.USER_WORDLIST_CHANGED));
    }

    public DeleteUserPreferences(userAControlRefs:string[]):void
    {
        this.ar.DeleteUserPreferences(this.CurrentUser.User_id, userAControlRefs);
    }

    public ClearProgress(courseId:number):void
    {
        let userId = null;
        if (this.CurrentUser)
        {
            userId = this.CurrentUser.User_id
        }
        this.ar.ClearCourseProgress(courseId, userId, this.CurrentLessonPlan.Lesson_plan_id);
        this.dispatchEvent(new UserProgressedEvent(UserProgressedEvent.USER_NAVIGATE_TO_COURSE, courseId, 0));
    }

    public ClearPrepProgramProgress(programId:number):void
    {
        this.ar.ClearPrepProgramProgress(programId);
    }

    public UserExists(email:string):boolean
    {
        var numUsersWithEmail:number = this.ar.CountUsersWithEmail(email);
        if (numUsersWithEmail == 0)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    public AddUser(user:User):void
    {
        var userId:number = this.ar.InsertUser(user);
        user.User_id = userId;
    }

    public TextExists(title:string, author:string):boolean
    {
        var products:number[] = new Array<number>(this.CurrentProduct.ProductId, AppSettings.ALL_PRODUCTS);
        var numTexts:number = this.ar.CountTextsWithTitleAuthorUserProducts(title, author, this.CurrentUser.User_id, products);
        return (numTexts > 0);
    }

    public TextCurrentSection(text:Text):number
    {
        var userText:User_Text = this.GetUserText(text.Text_id);
        var bookmarkUpTo:number = userText.Bookmark;

        var tracker:number = 0;
        var sectionIndex:number = 1;
        var dummyString:string = "";

        for (var section of text.TextSections)
        {
            tracker += section.length;
            if (bookmarkUpTo >= tracker)
            {
                sectionIndex ++;
            }
        }

        return sectionIndex;
    }

    public GetTextForUser2(userText:User_Text):string
    {
        if(userText == null)
        {
            userText = this.GetUserText(this.CurrentUserData.CurrentText.Text_id);
        }

        var textToUse:string = "";
        var currentText:Text = this.CurrentUserData.CurrentText;

        if(currentText.Content.length > 0)
        {
            var sectionNumber:number = this.TextCurrentSection(currentText);
            textToUse = currentText.TextSections[sectionNumber - 1];
        }

        return textToUse;
    }

    public processText(input:string):string
    {
        // Return original string if empty
        if (input == "")
        {
            return input;
        }

        // Continue.
        input = input.replace("\r\n", "\n");
        input = input.replace('_', ' ');

        var newString:string = "";

        for (var i = 0; i < input.length; i++)
        {
            //If it's the last char in the string
            if (i + 1 == input.length)
            {
                //Add it and that will be the end
                newString += input.charAt(i);
            }
                //Else if it's a non-newline char
            else if (input.charAt(i) != '\n')
            {
                //Add it and keep going
                newString += input.charAt(i);
            }
                //Else if it's the first new line in a double new line
            else if (input.charAt(i) == '\n' && input.charAt(i + 1) == '\n')
            {
                //Add it and skip past the second
                newString += input.charAt(i);
                i++;
            }
                //else if it's a lone new line
            else if (input.charAt(i) == '\n' && input.charAt(i + 1) != '\n')
            {
                //Replace it with a space
                newString += ' ';
            }
        }

        //Remove beginning space if there is one
        if (newString.charAt(0) == " ")
        {
            newString = newString.slice(1);
        }

        //If string starts with a new line, remove it
        if (newString.charAt(0) == "\n")
        {
            newString = newString.slice(1);
        }

        //Remove double spaces
        newString = newString.replace("  ", " ");

        return newString;
    }

    public processTextRemoveNewLines(input:string):string
    {
        if (input == "")
        {
            return input;
        }
        else
        {
            return StringUtils.RemoveDuplicateSpaces(input);
        }
    }

    public AddWordToList(word:Word, wordStringAdded:string, wordlistId:number):void
    {
        var words:Word[] = new Array<Word>();
        words.push(word);
        var wordStrings:string[] = new Array<string>();
        wordStrings.push(wordStringAdded);
        this.AddWordsToList(words, wordStrings, wordlistId);
    }

    public AddWordsToList(words:Word[], wordStringsAdded:string[], wordlistId:number):void
    {
        var wordIds:number[] = new Array<number>();
        for (var word of words)
        {
            wordIds.push(word.Word_id);
        }
        if (wordIds.length > 0)
        {
            if(this.CurrentUser.Current_wordlist_id != null && wordlistId == this.CurrentUser.Current_wordlist_id)
            {
                this.ar.addEventListener(AddWordToListEvent.WORD_INSERT_SUCCESS, this.wordsAddedToList);
                this.ar.addEventListener(AddWordToListEvent.WORD_INSERT_FAILED, this.wordsAddedFailed);
            }

            this.ar.InsertMultipleWordsToWordlist(wordlistId, wordIds, this.CurrentUser.User_id, wordStringsAdded);
            // maybe update currentWordlist?
        }
    }

    private wordsAddedToList(event:AddWordToListEvent):void
    {
        event.target.removeEventListener(AddWordToListEvent.WORD_INSERT_SUCCESS, this.wordsAddedToList);
        event.target.removeEventListener(AddWordToListEvent.WORD_INSERT_FAILED, this.wordsAddedFailed);
        this.OnUserWordlistChanged();
    }

    private wordsAddedFailed(event:AddWordToListEvent):void
    {
        event.target.removeEventListener(AddWordToListEvent.WORD_INSERT_SUCCESS, this.wordsAddedToList);
        event.target.removeEventListener(AddWordToListEvent.WORD_INSERT_FAILED, this.wordsAddedFailed);

        // if(event.ErrorMessage.length > 0)
        // {
        // 	AlertDialog.show(event.ErrorMessage, this.GetUiTextByKey("ERR_ADDING_MULTI_WORDS_TITLE"), UberReaderAccessor.GetUberReaderSprite(), true);
        // }
    }

    //TODO improve this function
    public UserWordlistExists(name:string):boolean | ProxyWordlist | Wordlist_Category
    {
        for (var userWordlist of this.GetUserProxyWordlists())
        {
            if (userWordlist.Name.toLowerCase() == name.toLowerCase())
            {
                return userWordlist;
            }
        }
        for (var wordlistCategory of this.GetTopLevelWordlistCategories())
        {
            if (wordlistCategory.ContainsWordlist(name))
            {
                return true;
            }
        }
        return false;
    }

    /*
    public DeleteText(textId:number):void
    {
        this.ar.DeleteText(textId, CurrentUser.User_id);
    }
    */

    /**
     * end user fucntion
     */

    public UpdateText(text:Text, isUpdated:boolean, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UberApplicationEventTypes.TEXT_UPDATE_SUCCESS, successHandler);
        this.ar.addEventListener(UberApplicationEventTypes.TEXT_UPDATE_FAILED, faultHandler);

        this.ar.UpdateText(text, isUpdated);
    }


    public UpdateUserCoursesPrepProgramsSeen(userCourseIds:number[], userPrepProgramIds:number[]):void
    {
        this.ar.UpdateUserCoursesPrepProgramsSeen(userCourseIds, userPrepProgramIds);
        this.UpdateAppStatus();
    }

    public UpdateWordsSeen(wordlist_id:number):void {
        this.ar.UpdateWordsSeen(wordlist_id);
    }

    public UpdateUserCourse(userCourse:User_Course):void
    {
        if (userCourse.User_id != null)
        {
            this.ar.UpdateUserCourse(userCourse);
        }
    }

    public UpdateUserCourseV2(userCourse:User_Course, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener("userCourseUpdateSuccessful", successHandler);
        this.ar.addEventListener("userCourseUpdateFailed", faultHandler);

        if (userCourse.User_id != null)
        {
            this.ar.UpdateUserCourse(userCourse);
        }
    }

    public StoreUserAnswers(answerObjects:any[]):void
    {
        var userQuestions:User_Question[] = new Array<User_Question>();
        for (var answerObject of answerObjects)
        {
            var userQuestion:User_Question = this.getUserQuestionByQuestion(answerObject.questionId);
            if (userQuestion == null)
            {
                userQuestion = new User_Question();
                userQuestion.Deleted = false;
                userQuestion.Question_id = answerObject.questionId;
                userQuestion.User_id = this.CurrentUser.User_id;
                userQuestion.Course_id = answerObject.courseId;
                //userQuestion.Notes = answerObject.Notes;
                userQuestion.Time_taken = answerObject.Time_taken
            }
            userQuestion.Answer = answerObject.answer;
            userQuestions.push(userQuestion);
            //this.ar.UpdateUserQuestion(userQuestion);
        }
        this.ar.UpdateUserQuestions(userQuestions);
    }

    public UpdateQuestionVideoWatched(questionId:number, courseId:number, videoLength:number):void
    {
        var userQuestion:User_Question = this.getUserQuestionByQuestion(questionId);
        if (userQuestion == null)
        {
            userQuestion = new User_Question();
            userQuestion.Deleted = false;
            userQuestion.Question_id = questionId;
            userQuestion.User_id = this.CurrentUser.User_id;
            userQuestion.Course_id = courseId;
        }

        userQuestion.Explanation_video_length = userQuestion.Explanation_video_length == null ? videoLength : userQuestion.Explanation_video_length + videoLength;
        if(videoLength > 1)
        {
            userQuestion.Explanation_video_watched = userQuestion.Explanation_video_watched == null ? 1 : userQuestion.Explanation_video_watched + 1;
        }

        if(userQuestion.Explanation_video_length == 0 || userQuestion.Explanation_video_watched == 0 || userQuestion.Explanation_video_watched == null)
        {
            //console.log("Empty:", userQuestion.Explanation_video_length, userQuestion.Explanation_video_watched, questionId);
        }
        else
        {
            //console.log("User Question with Video Added:", userQuestion.Explanation_video_length, userQuestion.Explanation_video_watched, questionId);
        }

        this.ar.UpdateUserQuestion(userQuestion);
    }

    public UpdateQuestionAnswer(questionId:number, courseId:number, answer:string, correct:boolean, timeTaken:number):void
    {
        var userQuestion:User_Question = this.getUserQuestionByQuestion(questionId);
        if (userQuestion == null)
        {
            userQuestion = new User_Question();
            userQuestion.Deleted = false;
            userQuestion.Question_id = questionId;
            //userQuestion.User_id = this.CurrentUser.User_id;
            userQuestion.Course_id = courseId;
        }
        userQuestion.Answer = answer;
        userQuestion.Time_taken = timeTaken;
        userQuestion.Correct = correct;
        if (this.CurrentUser != null)
        {
            userQuestion.User_id = userQuestion.User_id = this.CurrentUser.User_id;
        }
        else
        {
            userQuestion.User_id = null;
        }
        this.ar.UpdateUserQuestion(userQuestion);
    }
    /*
    public UpdateUserQuestionNotes(questionId:number, courseId:number, notes:string, handler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UberApplicationEventTypes.QUESTION_NOTES_SAVED, handler);
        this.ar.addEventListener(UberApplicationEventTypes.QUESTION_NOTES_FAILED, handler);
        var userQuestion:User_Question = this.getUserQuestionByQuestion(questionId);
        if (userQuestion == null)
        {
            userQuestion = new User_Question();
            userQuestion.Deleted = false;
            userQuestion.Question_id = questionId;
            userQuestion.User_id = this.CurrentUser.User_id;
            userQuestion.Course_id = courseId;
        }
        userQuestion.Notes = notes;
        this.ar.UpdateUserQuestionNotes(userQuestion);
    }
    */


    public UpdateUserNotesSeen(user_notes:User_Notes[]):void {
        this.ar.UpdateUserNotesSeen(user_notes);
        UberReader.GetInstance().UpdateStatus();
    }

    // Updates or creates user notes
    public UpdateUserNotes(courseActivityId:number, course_id:number, step:number, notes:string, handler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UberApplicationEventTypes.QUESTION_NOTES_SAVED, handler);
        this.ar.addEventListener(UberApplicationEventTypes.QUESTION_NOTES_FAILED, handler);

        let userNotes:User_Notes = this.getOrCreateUserNotesByCourseActivityId(courseActivityId, course_id, step);
        userNotes.Seen = false;
        userNotes.Notes = notes;
        this.ar.UpdateUserNotes(userNotes);
        UberReader.GetInstance().UpdateStatus();
    }

    public UpdateUserNotes2(userNotes: User_Notes, handler?:(event:UberApplicationEvent) => void): void {
        if (handler) {
            this.ar.addEventListener(UberApplicationEventTypes.QUESTION_NOTES_SAVED, handler);
            this.ar.addEventListener(UberApplicationEventTypes.QUESTION_NOTES_FAILED, handler);
        }

        this.ar.UpdateUserNotes(userNotes);
    }

    /**
     Settings functions
        */
    private GetUserSetting(functionName:string, controlRef:string):Setting
    {
        return this.ar.SelectSettingByControlRefFunctionName(controlRef, functionName);
    }

    public GetUserPref(key:string):string
    {
        if (this.CurrentUser == null)
        {
            return "";
        }
        else
        {
            var userPref:UserPref = this.GetUserPrefByKey(key);
            if (userPref)
            {
                return userPref.Value;
            }
            else
            {
                return "";
            }
        }
    }

    private GetUserPrefByKey(key:string):UserPref
    {
        if (this.CurrentUser == null)
        {
            return null;
        }
        else
        {
            return this.ar.SelectUserPrefByKey(key);
        }
    }

    public AdminGetGroupUserPref(groupID: number, key: string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(UserPrefEvent.USER_PREF_RECEIVED, successHandler);
        this.ar.addEventListener(UserPrefEvent.USER_PREF_ERROR, faultHandler);
        this.ar.AdminGetGroupUserPref(groupID, key);
    }
    /**
     * end Settings fucntion
     */

    public getAControlById(id:number):AControl
    {
        return this.ar.SelectAControlById(id);
    }

    public getAControlByActivity(activity:Activity):AControl[]
    {
        let aControls:AControl[] = new Array<AControl>();
        for (let aControlActivity of activity.AControl_Activities)
        {
            aControls.push(this.ar.SelectAControlById(aControlActivity.Control_id));
        }
        return aControls;
    }

    public getActivityById(id:number):Activity
    {
        return this.ar.SelectActivityById(id);
    }

    public getActivityByCategory(id:number):Activity[]
    {
        return this.ar.SelectAllActivitiesByCategory(id);
    }

    public getAllActivityCategories():Activity_Category[]
    {
        return this.ar.SelectAllActivityCategories();
    }

    public getCodeById(id:number):Code
    {
        return this.ar.SelectCodeById(id);
    }

    public getCodeByText(text:string):Code
    {
        return this.ar.SelectCodeByText(text);
    }

    public getCodesByParentId(id:number):Code[]
    {
        return this.ar.SelectCodesByParentId(id);
    }

    public getExamInfoByExamName(exam_name:string):ExamInfo
    {
        return this.ar.GetExamInfoByExamName(exam_name);
    }

    public GetDisplayNames():string[]
    {
        var retVal:string[] = new Array<string>();
        var displayNameCode:Code = this.getCodeByText("display_names");
        if (displayNameCode != null)
        {
            var displayNames:Code[] = this.getCodesByParentId(displayNameCode.Code_id);
            for (var code of displayNames)
            {
                retVal.push(code.Code_text);
            }
        }
        else
        {
            retVal.push("[First Name]");
            retVal.push("[Last Name]");
            retVal.push("[First Name] [Last Name]");
            retVal.push("[Last Name] [First Name]");
            retVal.push("[Username]");
        }
        return retVal;
    }

    public GetFeedbackTypes():string[]
    {
        var retVal:string[] = new Array<string>();
        var feedbackCode:Code = this.getCodeByText("feedback_types");
        if (feedbackCode != null)
        {
            var feedbackTypes:Code[] = this.getCodesByParentId(feedbackCode.Code_id);
            for (var code of feedbackTypes)
            {
                retVal.push(code.Code_text);
            }
        }
        else
        {
            retVal.push("Bug");
            retVal.push("Feature Request");
            retVal.push("General");
        }
        return retVal;
    }

    public GetFeedbackSources():string[]
    {
        var retVal:string[] = new Array<string>();
        var feedbackCode:Code = this.getCodeByText("feedback_sources");
        if (feedbackCode != null)
        {
            var feedbackSources:Code[] = this.getCodesByParentId(feedbackCode.Code_id);
            for (var code of feedbackSources)
            {
                retVal.push(code.Code_text);
            }
        }
        else
        {
            retVal.push("Course");
            retVal.push("Activity");
            retVal.push("Text");
            retVal.push("Wordlist");
            retVal.push("Charts");
            retVal.push("General");
        }
        return retVal;
    }

    public getUserQuestionByQuestion(id:number):User_Question
    {
        return this.ar.SelectUserQuestionByQuestion(id);
    }

    //Gets existing UserNotes from cache or returns null. If creating is required use funciton "getOrCreateUserNotesByCourseActivityId"
    public getUserNotesByCourseActivityId(id:number):User_Notes
    {
        return this.ar.SelectUserNotesByCourseActivity(id);
    }

    public getAllUserNotes():User_Notes[]
    {
        return this.ar.GetAllUserNotes();
    }

    public HasUserNotes(course_id: number):boolean
    {
        if (this.CurrentUser != null) {
            return this.ar.HasUserNotes(course_id);
        }
        else {
            return false;
        }
    }

    //Gets existing UserNotes from cache or creates new instance if null
    public getOrCreateUserNotesByCourseActivityId(course_activity_id:number, course_id:number, step:number):User_Notes
    {
        var userNotes:User_Notes = this.ar.SelectUserNotesByCourseActivity(course_activity_id);
        if (userNotes == null)
        {
            userNotes = new User_Notes();
            userNotes.Course_activity_id = course_activity_id;
            userNotes.Course_id = course_id;
            userNotes.Course_step_num = step;
            userNotes.Last_updated = new Date();
            userNotes.Notes = "";
            userNotes.User_id = this.CurrentUser.User_id;
        }
        return userNotes;
    }

    public GetAllLessonPlans(): ProxyLessonPlan[] {
        return this.ar.SelectAllLessonPlans();
    }

    // public GetLessonPlanById(lessonPlanId:number): Lesson_Plan {
    //     return this.ar.GetLessonPlanById(lessonPlanId);
    // }

    public GetLessonPlan(lessonPlanId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(LessonPlanEvent.LESSONPLAN_RECEIVED , successHandler);
        this.ar.addEventListener(LessonPlanEvent.LESSONPLAN_ERROR , faultHandler);
        this.ar.GetLessonPlan(lessonPlanId);
    }

    public get CurrentLessonPlan(): Lesson_Plan {
        return this.ar.CurrentLessonPlan;
    }

    public set CurrentLessonPlan(lessonPlan: Lesson_Plan) {
        this.ar.CurrentLessonPlan = lessonPlan;
    }

    public GetCourseCategoriesByLessonPlanId(lessonPlanId:number): Course_Category[] {
        return this.ar.GetCourseCategoriesByLessonPlanId(lessonPlanId);
    }

    public getAllCourseCategories():Course_Category[]
    {
        return this.ar.SelectAllCourseCategories();
    }

    public set CurrentCourseCategories(categories:Course_Category[]) {
        this.ar.CurrentCourseCategories = categories;
    }

    public static getDefaultByKey(key:string):Default
    {
        return UberApplication.GetExistingInstance().ar.SelectDefaultByKey(key);
    }

    public getLastResultForCurrentUser(key:string):Result
    {
        return this.CurrentUser ? this.ar.SelectLastResultByUserKey(key, this.CurrentUser.User_id, this.CurrentProduct.ProductId) : null;
    }

    public getDefaultSettings():Setting[]
    {
        return this.ar.SelectAllDefaultSetting();
    }

    public getSettingsForUser():Setting[]
    {
        return this.ar.SelectAllUserSettings();
    }

    public getSettingsForGroup():Setting[]
    {
        return this.ar.SelectAllGroupSettings();
    }

    public static getAllUser():User[]
    {
        //return this.ar.SelectAllUsers();
        return UberApplication.GetExistingInstance().ar.SelectAllUsers();
    }

    public GetWordById(id:number):Word
    {
        return this.ar.SelectWordById(id);
    }

    public getWordlistById(id:number):Wordlist
    {
        return UberApplication.GetExistingInstance().ar.SelectWordlistById(id);
    }

    public GetTopLevelWordlistCategories(): Wordlist_Category[]
    {
        return this.ar.SelectAllTopLevelWordlistCategories();
    }

    public GetDefaultTexts(includeComplexTexts:boolean):ProxyText[]
    {
        return this.ar.SelectAllDefaultTexts(includeComplexTexts);
    }

    public getWordsByWordlist(wordlist:Wordlist):Word[]
    {
        var words:Word[] = [];
        for (var wordlistWord of wordlist.WordlistWords)
        {
            words.push(this.GetWordById(wordlistWord.Word_id));
        }
        return words;
    }

    public getUserAControls():AControl[]
    {
        return this.ar.SelectAllUserAControls();
    }

    public getChartCategories():Chart_Category[]
    {
        return this.ar.SelectAllChartCategories();
    }

    public getCodeNameById(id:number):string
    {
        return this.ar.SelectCodeById(id).Code_text;
    }

    public UserCoursePercent(course:ProxyCourse):number
    {
        var currentUserCourse:User_Course = this.ar.SelectUserCourseByCourseUser(course.Course_id, this.CurrentUser.User_id);
        if (currentUserCourse == null)
        {
            return 0;
        }
        else if (currentUserCourse.Finished)
        {
            return 100;
        }
        else if(currentUserCourse.Sequence_upto > course.Course_length)
        {
            currentUserCourse.Sequence_upto = course.Course_length;
            currentUserCourse.Finished = true;
            return 100;
        }
        else
        {
            var upto:number = currentUserCourse.Sequence_upto;
            var numActivities:number = course.Course_length;
            if (numActivities == 0)
            {
                return 0;
            }
            var percent:number = upto * 100 / numActivities;
            return percent;
        }
    }

    public GetAllUserWordDiscoverRecords():Word_Discover[]
    {
        return this.ar.SelectAllWordDiscovers();
    }

    public HasUserFinishedCategory(category:Course_Category):boolean
    {
        for (var course of category.ProxyCourses)
        {
            if (course.Track_progress)
            {
                var userCourse:User_Course = this.GetUserCourse(course.Course_id);
                //if (userCourse == null || !userCourse.Finished)
                if (userCourse == null || userCourse.Sequence_upto < course.Course_length)
                {
                    return false;
                }
            }
        }
        return true;
    }
    public GetUserPrepProgram(programId:number):User_Prep_Program
    {
        if (this.CurrentUser == null)
        {
            return null;
        }
        else
        {
            return this.ar.GetUserPrepProgramByProgramId(programId);
        }
    }

    //Gets existing User_Course from cache or returns null. If creating new is required use function "GetOrCreateUserCourse"
    public GetUserCourse(courseId:number):User_Course
    {
        if (this.CurrentUser == null)
        {
            return null;
        }
        else
        {
            let userCourse:User_Course = this.ar.SelectUserCourseByCourseUser(courseId, this.CurrentUser.User_id);
			// if (userCourse == null) {
			// 	userCourse = new User_Course();
			// 	userCourse.User_id = this.CurrentUser.User_id;
			// 	userCourse.Course_id = courseId;
			// 	userCourse.Finished = false;
			// 	userCourse.Sequence_upto = 0;
			// 	this.ar.InsertUserCourse(userCourse);
			// 	return userCourse;
			// }
			// else {
				return userCourse;
			// }
        }
    }

    public GetUserCourseByID(courseId:number):User_Course
    {
        if (this.CurrentUser == null)
        {
            return null;
        }
        else
        {
            let userCourse:User_Course = this.ar.SelectUserCourseByCourseUser(courseId, this.CurrentUser.User_id);
			if (userCourse == null) {
				userCourse = new User_Course();
				userCourse.User_id = this.CurrentUser.User_id;
				userCourse.Course_id = courseId;
				userCourse.Finished = false;
				userCourse.Sequence_upto = 0;
				this.ar.InsertUserCourse(userCourse);
				return userCourse;
			}
			else {
				return userCourse;
			}
        }
    }

    public GetOrCreateUserCourse(c:Course):User_Course
    {
        if (this.CurrentUser == null)
        {
            var userCourse = new User_Course();
            userCourse.User_id = null;
            userCourse.Course_id = c.Course_id;
            userCourse.course = c;
            userCourse.Finished = false;
            userCourse.Sequence_upto = 0;

            return userCourse;
            //return null;
        }
        else
        {
            var userCourse:User_Course = this.ar.SelectUserCourseByCourseUser(c.Course_id, this.CurrentUser.User_id);
            if (userCourse == null)
            {
                userCourse = new User_Course();

                userCourse.Course_id = c.Course_id;
                userCourse.course = c;
                userCourse.Finished = false;
                userCourse.Sequence_upto = 0;

                if (this.CurrentUser != null)
                {
                    userCourse.User_id = this.CurrentUser.User_id;
                    this.ar.InsertUserCourse(userCourse);
                }
                else
                {
                    userCourse.User_id = null;
                }

                return userCourse;
            }
            else
            {
                userCourse.course = c;
                return userCourse;
            }
        }
    }

    public SaveUserSetting(functionName:string, controlRef:string, value:string):void
    {
        var setting:Setting = this.GetUserSetting(functionName, controlRef);

        if (setting == null)
        {
            setting = new Setting();
            setting.Function_name = functionName;
            setting.Control_ref = controlRef;
            setting.User_id = this.CurrentUser.User_id;
            setting.Product_id = this.CurrentProduct.ProductId;
            setting.Value = value;

            this.ar.InsertSetting(setting);
        }
        else
        {
            setting.Value = value;
            this.ar.UpdateSetting(setting);
        }
    }

    public SaveUserSettings(settingObjects: any[]): void {
        let settings: Setting[] = [];
        for(let settingObj of settingObjects) {
            let setting: Setting = this.GetUserSetting(settingObj.functionName, settingObj.controlRef);
            if(setting == null) {
                setting = new Setting();
                setting.Function_name = settingObj.functionName;
                setting.Control_ref = settingObj.controlRef;
                setting.User_id = this.CurrentUser.User_id;
                setting.Product_id = this.CurrentProduct.ProductId;
                setting.Value = settingObj.value;
            }
            else {
                setting.Value = settingObj.value;
            }
            settings.push(setting);
        }
        this.ar.UpdateSettings(settings);
    }

    public UpdateUserPref(key:string, value:string, useProduct:boolean):void
    {
        if (this.CurrentUser == null)
        {
            //do nothing
        }
        else
        {
            var userPref:UserPref = this.GetUserPrefByKey(key);
            if (userPref == null || userPref.UserId == null)
            {
                userPref = new UserPref();
                userPref.UserId = this.CurrentUser.User_id;
                userPref.Last_updated = new Date();
                if (useProduct)
                {
                    userPref.Product_id = AppSettings.CurrentProductId;//this.CurrentProduct.ProductId;
                }
                userPref.Key = key;
                userPref.Value = value;

                this.ar.InsertUserPref(userPref);
            }
            else if (userPref.Value != value)
            {
                userPref.Value = value;
                this.ar.UpdateUserPref(userPref);
            }
        }
    }

    public UpdateUserPrefs(keys:any[], values:any[], useProduct:boolean):void
    {
        if (this.CurrentUser == null)
        {
            //do nothing
        }
        else
        {
            var userPrefVector:UserPref[] = new Array<UserPref>();
            for(var index:number = 0; index < keys.length; index++)
            {
                var userPref:UserPref = this.GetUserPrefByKey(keys[index]);

                if (userPref == null || userPref.UserId == null)
                {
                    userPref = new UserPref();
                    userPref.UserId = this.CurrentUser.User_id;
                    userPref.Last_updated = new Date();
                    if (useProduct)
                    {
                        userPref.Product_id = this.CurrentProduct.ProductId;
                    }
                    userPref.Key = keys[index];
                    userPref.Value = values[index];

                    userPrefVector.push(userPref);
                }
                else if (userPref.Value != values[index])
                {
                    userPref.Value = values[index];
                    userPrefVector.push(userPref);
                }
            }

            this.ar.UpdateUserPrefs(userPrefVector);
        }
    }

    public SetGoal1Default():void
    {
        this.CurrentUserData.Goal_1 = this.CurrentProduct.Goal_1_default;
        this.UpdateUserPref("goal_1", this.CurrentProduct.Goal_1_default.toString(), true);
    }

    public SetGoal2Default():void
    {
        this.CurrentUserData.Goal_2 = this.CurrentProduct.Goal_2_default;
        this.UpdateUserPref("goal_2", this.CurrentProduct.Goal_2_default.toString(), true);
    }

    public SetGoalsTarget(goal1:number, goal2:number):void
    {
        var arrayKey:any[] = new Array();
        var arrayValue:any[] = new Array();

        this.CurrentUserData.Goal_1 = goal1;
        arrayKey.push("goal_1");
        arrayValue.push(goal1.toString());
        if(this.CurrentProduct.Goal_2_default != null)
        {
            this.CurrentUserData.Goal_2 = goal2;
            arrayKey.push("goal_2");
            arrayValue.push(goal2.toString());
        }

        this.UpdateUserPrefs(arrayKey, arrayValue, true);
    }

    public SetGoal1Target(num:number):void
    {
        this.CurrentUserData.Goal_1 = num;
        //UpdateUserPref("goal_1", num.toString(), true);
    }

    public SetGoal2Target(num:number):void
    {
        this.CurrentUserData.Goal_2 = num;
        //UpdateUserPref("goal_2", num.toString(), true);
    }

    /*public getResultsForCurrentUser(key:string):Result[]
    {
        return this.ar.SelectAllResultsByUserKey(key, CurrentUser.User_id, CurrentProduct.ProductId);
    }*/

    private GetDefaultWord():Word
    {
        if (this.CurrentWordlist.WordlistWords.length > 0)
        {
            return this.GetWordById(this.CurrentWordlist.WordlistWords[0].Word_id)
        }
        else
        {
            if(this.GetDefaultWordlist() == null)
            {
                return null;
            }
            else
            {
                return this.GetWordById(this.GetDefaultWordlist().WordlistWords[0].Word_id);
            }
        }
    }

    public GetDefaultWordlist():Wordlist
    {
        if (this.CurrentProduct.Default_wordlist_id != null)
        {
            return this.getWordlistById(this.CurrentProduct.Default_wordlist_id);
        }
        else
        {
            return null;
        }
    }

    public GetDefault(key:string):string
    {
        var def:Default = UberApplication.getDefaultByKey(key);

        if (def != null)
        {
            return def.Value;
        }
        else
        {
            return "";
        }
    }

    public getDefaultBool(key:string):boolean
    {
        var result:string = this.GetDefault(key);
        return result != null && result.toLowerCase() == "true";
    }

    public getDefaultInt(key:string):number
    {
        var result:string = this.GetDefault(key);
        if (isNaN(parseInt(result)))
        {
            return 0;
        }
        else
        {
            var ret:number = parseInt(result);
            return ret;
        }
    }

    public GetRandomWordlist(length:number):Word[]
    {
        var retVal:Word[] = new Array<Word>();

        /*if (CurrentUser.Aux_wordlist == null)
        {
            CurrentUser.Aux_wordlist = GetDefaultWordlist();
            CurrentUser.Aux_wordlist_id = CurrentUser.Aux_wordlist.Wordlist_id;
            // Update User aux Wordlist
        }*/

        var auzListWordIds:number[] = new Array<number>();
        for (var wlw of this.AuxWordlist.WordlistWords)
        {
            auzListWordIds.push(wlw.Word_id);
        }

        for (var i = 0; i < length && auzListWordIds.length > 0; i++)
        {
            var index:number = Math.random() * auzListWordIds.length - 1;
            var w:Word = this.GetWordById(auzListWordIds[index]);
            //auzListWordIds.removeAt(index);
            auzListWordIds.splice(index, 1);
            retVal.push(w);
        }
        return retVal;
    }

    protected OnCurrentWordChanged():void
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.CURRENT_WORD_CHANGED));
    }

    protected OnCurrentWordlistChanged():void
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.CURRENT_WORDLIST_CHANGED));
    }

    public OnWordUserChanged(wu:Word_User):void
    {
        this.dispatchEvent(new WordUserChangedEvent(WordUserChangedEvent.WORD_USER_CHANGED, wu));
    }

    private GetUserResourcesFolder():string
    {
        return AppSettings.UserResourcesURL + this.CurrentUser.User_id.toString() + "/";
    }

    public GetUserWordImagesFolder():string
    {
        return this.GetUserResourcesFolder() + "wordImages/";
    }

    public GetUserProfileFolder():string
    {
        return this.GetUserResourcesFolder() + "profile/";
    }

    public GetUserBackgroundImageFolder(): string {
        return this.GetUserResourcesFolder() + "backgroundImage/";
    }

    public GetDefaultSense(wordId:number):Word_Sense
    {
        return this.ar.SelectDefaultWordSenseByWord(wordId);
    }

    public IsDefaultSense(wordId:number, senseId:number):boolean
    {
        var wuRec:Word_User = this.LookupWordUserRecord(wordId);
        if (wuRec == null)
        {
            return false;
        }
        else
        {
            return wuRec.Default_sense_id != null && wuRec.Default_sense_id == senseId;
        }
    }

    public GetNumMastered(wordlist:Wordlist):number
    {
        var numMastered:number = 0;
        for (var wlw of wordlist.WordlistWords)
        {
            var wordUser:Word_User = this.LookupWordUserRecord(wlw.Word_id);
            if (wordUser != null && wordUser.Mastered)
            {
                numMastered ++;
            }
        }
        return numMastered;
    }

    public SetWordsMastered(wordIds:number[], mastered:boolean):void
    {
        var wordUsersToUpdate:Word_User[] = new Array<Word_User>();
        for (var wordId of wordIds)
        {

            var wordUser:Word_User = this.LookupOrCreateWordUserRecord(wordId);
            if (wordUser.Mastered != mastered)
            {
                wordUser.Mastered = mastered;
                wordUsersToUpdate.push(wordUser);
                //UpdateWordUser(wu);
                this.OnWordUserChanged(wordUser);
            }
        }
        this.UpdateWordUsers(wordUsersToUpdate);

        /*var wu:Word_User = LookupOrCreateWordUserRecord(wordId);
        if (wu.Mastered != mastered)
        {
            wu.Mastered = mastered;
            UpdateWordUser(wu);
            OnWordUserChanged(wu);
        }*/
    }

    public IsMastered(wordId:number):boolean
    {
        var wu:Word_User = this.LookupWordUserRecord(wordId);
        if (wu == null)
        {
            return false;
        }
        else
        {
            return wu.Mastered;
        }
    }

    public UpdateWordUsers(wordUsers:Word_User[]):void
    {
        this.ar.UpdateWordUsers(wordUsers);
    }

    public RemoveWordsFromWordlist(wordlistId:number, wordIds:number[], successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(DeleteWordEvent.WORDLIST_WORD_DELETE_SUCCESS, successHandler);
        this.ar.addEventListener(DeleteWordEvent.WORDLIST_WORD_DELETE_ERROR, successHandler);
        this.ar.DeleteWordlistWordsByWord_Wordlist(wordlistId, wordIds, this.CurrentUser.User_id);
    }

    /*private wordRemoved_Deleted(event:DeleteWordEvent):void
    {
        event.target.removeEventListener(DeleteWordEvent.WORDLIST_WORD_DELETE_SUCCESS, wordRemoved_Deleted);
        event.target.removeEventListener(DeleteWordEvent.WORDLIST_WORD_DELETE_ERROR, wordRemoved_Deleted_failed);

        OnCurrentWordChanged();
    }

    private wordRemoved_Deleted_failed(event:DeleteWordEvent):void
    {
        event.target.removeEventListener(DeleteWordEvent.WORDLIST_WORD_DELETE_SUCCESS, wordRemoved_Deleted);
        event.target.removeEventListener(DeleteWordEvent.WORDLIST_WORD_DELETE_ERROR, wordRemoved_Deleted_failed);
    }	*/

    public DeleteWord(word:Word, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        if (this.CurrentWord.Word_id == word.Word_id)
        {
            this.CurrentWord = this.GetDefaultWord();
        }

        this.ar.addEventListener(DeleteWordEvent.WORDLIST_WORD_DELETE_SUCCESS, successHandler);
        this.ar.addEventListener(DeleteWordEvent.WORDLIST_WORD_DELETE_ERROR, successHandler);
        this.ar.DeleteWord(word);
    }

    public DeleteWordSense(ws:Word_Sense):void
    {
        this.ar.DeleteWordSense(ws);
    }

    public DeleteWordDiscoverRecord(wd:Word_Discover):void
    {
        this.ar.DeleteWordDiscover(wd.Word_discover_id, this.CurrentUser.User_id);
    }

    public SetWordDiscoverRecordActivated(wd:Word_Discover):void
    {
        this.ar.UpdateWordDiscover_Activated(wd);
    }

    public SetCurrentWord(word:Word):void
    {
        if (this.CurrentWord == null || this.CurrentWord.Word_id != word.Word_id)
        {
            this.CurrentWord = word;
        }
    }

    public SetCurrentWordString(wordText:string):void
    {
        if (this.CurrentWord == null || this.CurrentWord.Word_text != wordText)
        {
            for (var wlw of this.CurrentWordlist.WordlistWords)
            {
                var word:Word = this.GetWordById(wlw.Word_id);
                if (word.Word_text == wordText)
                {
                    this.CurrentWord = word;
                    return;
                }
            }
            //CurrentWord = LookupWord(word);
            // TODO either look through existing wrds from current wordlist for text or get activity to pass id
        }
    }

    public UpdateWordNotes(w:Word, notes:string):void
    {
        var wu:Word_User = this.LookupOrCreateWordUserRecord(w.Word_id);
        wu.Notes = notes;
        var wordUsers:Word_User[] = new Array<Word_User>();
        wordUsers.push(wu);
        this.UpdateWordUsers(wordUsers);
    }

    public UpdateWordDiscoverRecord(wd:Word_Discover):void
    {
        this.ar.UpdateWordDiscover(wd, this.CurrentUser.User_id);
    }

    public SwapWordDiscoverRecords(wd1:Word_Discover, wd2:Word_Discover):void
    {
        this.ar.SwapWordDiscoverRecords(wd1, wd2);
    }

    public UpdateWordDiscoverTable():void
    {
        this.ar.UpdateWordDiscoversTable(this.CurrentUser.User_id);
    }

    public AddWordDiscoverRecord(wd:Word_Discover, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(WordDiscoverEvent.WORD_DISCOVER_INSERTED, successHandler);
        this.ar.addEventListener(WordDiscoverEvent.WORD_DISCOVER_INSERT_ERROR,  faultHandler);

        this.ar.InsertWordDiscover(wd, this.CurrentUser.User_id);
    }

    public WordDiscoverExists(name:string):boolean
    {
        return this.ar.WordDiscoverExists(name);
    }

    public LookupOrCreateWordUserRecord(wordId:number):Word_User
    {
        var retVal:Word_User = this.LookupWordUserRecord(wordId);
        if (retVal == null)
        {
            retVal = this.CreateWordUserRecord(wordId);
        }
        return retVal;
    }

    public LookupWordUserRecord(wordId:number):Word_User
    {
        /*if (wordUserCache[wordId] != null)
        {
            return wordUserCache[wordId];
        }
        else
        {*/
            var retVal:Word_User = this.ar.SelectWordUserByUserWord(wordId);

            //wordUserCache[wordId] = retVal;
            return retVal;
        /*}*/
    }

    private CreateWordUserRecord(wordId:number):Word_User
    {
        var retVal:Word_User = new Word_User();
        retVal.Word_id = wordId;
        retVal.User_id = this.CurrentUser == null ? null : this.CurrentUser.User_id;
        retVal.Mastered = false;
        //this.ar.InsertWordUser(retVal);

        return retVal;
    }


    public GetProductInfo():ProductInfo
    {
        return this.ar.GetProductInfo();
    }

    public GetActivityType(a:Activity):string
    {
        return this.getCodeNameById(a.Type_id);
    }

    public GetCourseText(textId:number):Text
    {
        return this.ar.GetCourseText(textId);
    }

    public SetCurrentText(text:Text):void
    {
        this.ar.SetCurrentText(text);
    }

    public GetCurrentText():Text
    {
        if(this.CurrentProduct.DisplayVocab)
        {
            return null;
        }
        else
        {
            return this.ar.GetCurrentText();
        }
    }

    public StoreResults(resultObjects:any[]):void
    {
        var results:Result[] = new Array<Result>();
        //var resultObject:any = {tag1: tag1, tag2: tag2, key: key, value: value, storeVocabValues: true};
        for (var resultObject of resultObjects)
        {
            var newResult:Result = new Result();
            newResult.Tag1 = resultObject.tag1;
            newResult.Tag2 = resultObject.tag2;
            newResult.Result_key = resultObject.key;
            //newResult._Date = new Date();
            newResult.User_id = this.CurrentUser.User_id;
            newResult.Activity_name = this.CurrentActivity.Activity_name;
            newResult.Value = resultObject.value;
            newResult.Product_id = this.CurrentProduct.ProductId;

            if (this.CurrentProduct.DisplayVocab && resultObject.storeVocabValues)
            {
                newResult.Current_wordlist_id = this.CurrentWordlist.Wordlist_id;

                var numWordsMastered:number = this.GetNumMastered(this.CurrentWordlist);
                var numWords:number = this.CurrentWordlist.WordlistWords.length;
                var testOutOf:number = numWords - numWordsMastered;

                var percentMasteredResult:Result = new Result();
                percentMasteredResult.Result_key = "percent_mastered";
                percentMasteredResult.Value = Math.trunc((numWordsMastered / numWords) * 100);
                percentMasteredResult.Activity_name = this.CurrentActivity.Activity_name;
                percentMasteredResult.Current_wordlist_id = this.CurrentWordlist.Wordlist_id;
                percentMasteredResult.User_id = this.CurrentUser.User_id;
                percentMasteredResult.Product_id = this.CurrentProduct.ProductId;
                results.push(percentMasteredResult);
                //this.ar.InsertResult(percentMasteredResult);

                var actualTestScore:number = Math.round((testOutOf / 100) * resultObject.value);

                var adjustedPercentResult:Result = new Result();
                adjustedPercentResult.Result_key = "adjusted_percent";
                adjustedPercentResult.Value = Math.trunc(((actualTestScore + numWordsMastered) / numWords) * 100);
                adjustedPercentResult.Activity_name = this.CurrentActivity.Activity_name;
                adjustedPercentResult.Current_wordlist_id = this.CurrentWordlist.Wordlist_id;
                adjustedPercentResult.User_id = this.CurrentUser.User_id;
                adjustedPercentResult.Product_id = this.CurrentProduct.ProductId;
                results.push(adjustedPercentResult);
                //this.ar.InsertResult(adjustedPercentResult);
            }
            results.push(newResult);
            //this.ar.InsertResult(newResult);
        }
        this.ar.InsertResults(results);
        //UberReaderAccessor.GetUberReader().UpdateGoals();
    }

    public StoreScore(tag1:string, tag2:string, key:string, theValue:number, storeVocabValues:boolean, questionId:number = null, prepEdActivityName:string = null):void
    {
        var newResult:Result = new Result();
        newResult.Tag1 = tag1;
        newResult.Tag2 = tag2;
        newResult.Result_key = key;
        newResult.User_id = this.CurrentUser.User_id;
        newResult.Value = theValue;
        newResult.Product_id = this.CurrentProduct.ProductId;

        if(this.CurrentProduct.DisplayQuestion)
        {
            newResult.Activity_name = prepEdActivityName;
        }
        else
        {
            newResult.Activity_name = this.CurrentActivity.Activity_name;
        }

        if(questionId != null)
        {
            newResult.Question_id = questionId;
        }

        if (this.CurrentProduct.DisplayVocab && storeVocabValues)
        {
            newResult.Current_wordlist_id = this.CurrentWordlist.Wordlist_id;

            var numWordsMastered:number = this.GetNumMastered(this.CurrentWordlist);
            var numWords:number = this.CurrentWordlist.WordlistWords.length;
            var testOutOf:number = numWords - numWordsMastered;

            var percentMasteredResult:Result = new Result();
            percentMasteredResult.Result_key = "percent_mastered";
            percentMasteredResult.Value = Math.trunc((numWordsMastered / numWords) * 100);
            //percentMasteredResult._Date = new Date();
            percentMasteredResult.Activity_name = this.CurrentActivity.Activity_name;
            percentMasteredResult.Current_wordlist_id = this.CurrentWordlist.Wordlist_id;
            percentMasteredResult.User_id = this.CurrentUser.User_id;
            percentMasteredResult.Product_id = this.CurrentProduct.ProductId;
            this.ar.InsertResult(percentMasteredResult);

            var actualTestScore:number = Math.round((testOutOf / 100) * theValue);

            var adjustedPercentResult:Result = new Result();
            adjustedPercentResult.Result_key = "adjusted_percent";
            adjustedPercentResult.Value = Math.trunc(((actualTestScore + numWordsMastered) / numWords) * 100);
            //adjustedPercentResult._Date = new Date();
            adjustedPercentResult.Activity_name = this.CurrentActivity.Activity_name;
            adjustedPercentResult.Current_wordlist_id = this.CurrentWordlist.Wordlist_id;
            adjustedPercentResult.User_id = this.CurrentUser.User_id;
            adjustedPercentResult.Product_id = this.CurrentProduct.ProductId;
            this.ar.InsertResult(adjustedPercentResult);
        }
        this.ar.InsertResult(newResult);
        //UberReaderAccessor.GetUberReader().UpdateGoals();
    }

    public GetValidProducts(userEmail:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(ProductsEvent.PRODUCT_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(ProductsEvent.PRODUCT_CALL_FAILED, faultHandler);

        this.ar.SelectAllProductsByUser(userEmail);
    }

    public ValidateUser(userData:UserIdentificationData, productId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UserAuthenticatedEvent.USER_AUTHENTICATED, successHandler);
        this.ar.addEventListener(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, faultHandler);

        this.ar.AuthenticateUser(userData, productId);
    }

    public GetSchoolTrialInfo(): School_Trial_Info {
        return this.ar.GetSchoolTrialInfo();
    }

    /*public GetProductData(product:number, user:User, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UberApplicationEventTypes.RECEIVING_PRODUCT_DATA_SUCCESS, successHandler);
        this.ar.addEventListener(UberApplicationEventTypes.RECEIVING_PRODUCT_DATA_FAILED, faultHandler);

        this.ar.GetProductData(product, user);
    }

    public GetUserData(user:User, product:ProductInfo, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UberApplicationEventTypes.RECEIVING_USER_DATA_SUCCESS, successHandler);
        this.ar.addEventListener(UberApplicationEventTypes.RECEIVING_USER_DATA_FAILED, faultHandler);

        this.ar.GetUserData(user, product);
    }*/

    public GetAllWordlistData(wordlistId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(WordlistEvent.WORDLIST_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(WordlistEvent.WORDLIST_DATA_ERROR, faultHandler);

        this.ar.GetWordlistData(wordlistId, this.CurrentUser.User_id);
    }

    public GetPublicWordlistData(wordlistId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(WordlistEvent.WORDLIST_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(WordlistEvent.WORDLIST_DATA_ERROR, faultHandler);

        this.ar.GetPublicWordlistData(wordlistId);
    }

    public GetTextsTable(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void = null):void
    {
        var products:number[] = new Array<number>(this.CurrentProduct.ProductId, AppSettings.ALL_PRODUCTS);

        this.ar.addEventListener(TextsTableEvent.TEXTS_RETRIEVED, successHandler);
        this.ar.addEventListener(TextsTableEvent.TEXT_RETRIEVAL_FAILED, faultHandler);

        this.ar.SelectAllProxyTextsByProductsUser(products, this.CurrentUser.User_id);
    }

    public GetUserProxyWordlists():ProxyWordlist[]
    {
        var proxyWordlists:ProxyWordlist[] = this.ar.SelectAllProxyWordlistsSynchronous(this.CurrentUser.User_id);
        for (var proxyWordlist of proxyWordlists)
        {
            if (proxyWordlist.Name == "[display_name] Words")
            {
                var displayName:string = this.CurrentUserData.DisplayNamePosessive;
                proxyWordlist.Name = proxyWordlist.Name.replace("[display_name]",displayName);
            }
        }
        return proxyWordlists;
    }

    public DeleteCustomWordlist(wordlistId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UberApplicationEventTypes.WORDLIST_DELETED, successHandler);
        this.ar.addEventListener(UberApplicationEventTypes.WORDLIST_DELETE_ERROR, faultHandler);

        this.ar.DeleteWordlist(wordlistId, this.CurrentUser.User_id);
    }

    public RenameCustomWordlist(wordlistId:number, newName:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(ProxyWordlistEvent.WORDLIST_RENAMED, successHandler);
        this.ar.addEventListener(ProxyWordlistEvent.WORDLIST_RENAME_ERROR, faultHandler);

        this.ar.RenameWordlist(wordlistId, this.CurrentUser.User_id, newName);
    }

    public GetProxyTests(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(ProxyTestsEvent.PROXY_TESTS_RETRIEVED, successHandler);
        this.ar.addEventListener(ProxyTestsEvent.PROXY_TEST_RETRIEVAL_FAILED, faultHandler);

        this.ar.SelectAllProxyTests();
    }

    public GetTestData(testId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(TestDataEvent.TEST_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(TestDataEvent.TEST_DATA_ERROR, faultHandler);

        this.ar.GetTestData(testId);
    }

    public GetChartData3(charts:Chart[], grouping:string, type:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        if(type == "default")
        {
            this.ar.addEventListener(ChartDataEvent.CHART_DATA_RECEIVED, successHandler);
            this.ar.addEventListener(ChartDataEvent.CHART_DATA_ERROR, faultHandler);
        }
        else if(type == "mini")
        {
            this.ar.addEventListener(ChartDataEvent.MINI_CHART_DATA_RECEIVED, successHandler);
            this.ar.addEventListener(ChartDataEvent.MINI_CHART_DATA_ERROR, faultHandler);
        }


        this.ar.GetChartData3(charts, grouping, this.CurrentWordlist, this.CurrentUser.User_id, this.CurrentProduct.ProductId, type);
    }

    public getTextById(id:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UberReaderTextEvent.TEXT_RETREIVED, successHandler);
        this.ar.addEventListener(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, faultHandler);

        this.ar.GetText(id, this.CurrentUser.User_id);
    }

    public AddText(text:Text, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void=null):void
    {
        if (successHandler != null)
        {
            this.ar.addEventListener(UberReaderTextEvent.TEXT_INSERTED, successHandler);
        }
        if (faultHandler != null)
        {
            this.ar.addEventListener(UberReaderTextEvent.TEXT_INSERT_ERROR, faultHandler);
        }

        this.ar.InsertText(text);
    }

    public UpdateUserDetails(user:User, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UserAuthenticatedEvent.USER_UPDATED, successHandler);
        this.ar.addEventListener(UserAuthenticatedEvent.USER_UPDATE_FAILED, faultHandler);

        this.ar.UpdateUser(user);
    }

    public CheckEmailUsername(user:User, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UserAuthenticatedEvent.USER_DETAILS_AVAILABLE, successHandler);
        this.ar.addEventListener(UserAuthenticatedEvent.USER_DETAILS_UNAVAILABLE, faultHandler);

        this.ar.CheckEmailUsername(user);
    }

    public GetConfirmationPin(activationCode:string, email:string, productId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(MessageEvent.CONFIRMATION_PIN_SENT, successHandler);
        this.ar.addEventListener(MessageEvent.CONFIRMATION_PIN_ERROR, faultHandler);

        this.ar.GetConfirmationPin(activationCode, email, productId);
    }

    public UseActivationCode(userData:UserIdentificationData, purchaseData:PurchaseData, productId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UserAuthenticatedEvent.ACTIVATION_CODE_USED, successHandler);
        this.ar.addEventListener(UserAuthenticatedEvent.ACTIVATION_CODE_ERROR, faultHandler);

        this.ar.UseActivationCode(userData, purchaseData, productId);
    }

    public UpdateUserProfilePic(profilePicString:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UserProfilePicUpdateEvent.PROFILE_PIC_UPDATED, successHandler);
        this.ar.addEventListener(UserProfilePicUpdateEvent.PROFILE_PIC_UPDATE_ERROR, faultHandler);

        this.ar.UpdateUserProfilePic(profilePicString, this.CurrentUser.User_id);
    }

    public AdminCreateHelpDeskTicket(firstName: string, lastName: string, email: string, schoolName: string, subject: string, description: string, fileName: string, base64Attachment: string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(TicketEvent.TICKET_CREATED, successHandler);
        this.ar.addEventListener(TicketEvent.TICKET_ERROR, faultHandler);
        this.ar.AdminCreateHelpDeskTicket(firstName, lastName, email, schoolName, subject, description, fileName, base64Attachment);
    }

    public AdminUpdateOrganizationLogo(customerID: number, organizationLogo: string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(OrganizationLogoUpdateEvent.ORGRANIZATION_LOGO_UPDATED, successHandler);
        this.ar.addEventListener(OrganizationLogoUpdateEvent.ORGRANIZATION_LOGO_UPDATE_ERROR, faultHandler);

        this.ar.AdminUpdateOrganizationLogo(customerID, organizationLogo);
    }

    public UpdateUserAppBackgroundImg(bgImageString:string, fileName:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UserAppBgImgUpdateEvent.BG_IMG_UPDATED, successHandler);
        this.ar.addEventListener(UserAppBgImgUpdateEvent.BG_IMG_UPDATE_ERROR, faultHandler);

        this.ar.UpdateUserAppBackgroundImg(bgImageString, fileName, this.CurrentProduct.ProductId);
    }

    public GetImage(url:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(GetImageEvent.GET_IMAGE_SUCCESS, successHandler);
        this.ar.addEventListener(GetImageEvent.GET_IMAGE_FAILED, faultHandler);

        this.ar.GetImage(url, this.CurrentUser.User_id);
    }

    public GetProfImage(url:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(GetImageEvent.GET_PROF_IMAGE_SUCCESS, successHandler);
        this.ar.addEventListener(GetImageEvent.GET_PROF_IMAGE_FAILED, faultHandler);

        this.ar.GetProfImage(url, this.CurrentUser.User_id);
    }

    public ImportTextDoc(textDocString:string, fileName:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        //this.ar.addEventListener(UberApplicationEventTypes.TEXT_DOC_IMPORTED, successHandler);
        //this.ar.addEventListener(UberApplicationEventTypes.TEXT_DOC_IMPORT_ERROR, faultHandler);
        this.ar.addEventListener(ImportTextDocumentEvent.TEXT_IMPORTED, successHandler);
        this.ar.addEventListener(ImportTextDocumentEvent.TEXT_IMPORT_FAILED, faultHandler);

        this.ar.ImportTextDoc(textDocString, fileName, this.CurrentUser.User_id, this.CurrentProduct.ProductId);
    }

    public CheckForUpdate(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(CheckUpdateEvent.UPDATE_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(CheckUpdateEvent.UPDATE_DATA_ERROR, faultHandler);

        this.ar.CheckForUpdate(AppSettings.CurrentProductId);
    }

    public CheckForTrialUpdate(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(CheckUpdateEvent.UPDATE_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(CheckUpdateEvent.UPDATE_DATA_ERROR, faultHandler);

        this.ar.CheckForTrialUpdate(AppSettings.CurrentProductId);
    }

    public UpdateUserWordImage(wordImageString:string, wordString:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(EventTypes.WORD_IMAGE_UPLOADED, successHandler);
        this.ar.addEventListener(EventTypes.WORD_IMAGE_UPLOAD_ERROR, faultHandler);

        this.ar.UpdateUserWordImage(wordImageString, wordString, this.CurrentUser.User_id);
    }

    public DeleteUserWordImage(wordString:string):void
    {
        this.ar.DeleteUserWordImage(wordString, this.CurrentUser.User_id);
    }

    public CreateWordlist(name:string, isPublic:boolean, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(WordlistEvent.WORDLIST_CREATED, successHandler);
        this.ar.addEventListener(WordlistEvent.WORDLIST_CREATION_ERROR, faultHandler);

        var newWordlist:Wordlist = new Wordlist();
        newWordlist.Name = name;
        newWordlist.Sequence = 1;
        newWordlist.User_id = this.CurrentUser.User_id;
        newWordlist.WordlistWords = new Array<Wordlist_Word>();
        newWordlist.Is_public = isPublic;

        if(isPublic){
			newWordlist.Can_edit = false;
		}

        this.ar.InsertWordlist(newWordlist);
    }

    public UpdateWordlist(wordlist:Wordlist, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void ):void
	{
	    this.ar.addEventListener(UberApplicationEventTypes.WORDLIST_UPDATE_SUCCESS, successHandler);
		this.ar.addEventListener(UberApplicationEventTypes.WORDLIST_UPDATE_FAILED, faultHandler);

		this.ar.UpdateWordlist(wordlist);
	}

    /*public InsertWordSense(ws:Word_Sense, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(WordSenseEvent.WORD_SENSE_INSERTED, successHandler);
        this.ar.addEventListener(WordSenseEvent.WORD_SENSE_INSERT_ERROR, faultHandler);

        this.ar.InsertWordSense(ws);
    }*/

    public InsertWordSense2(ws:Word_Sense, word_id:number, pos:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(WordSenseEvent.WORD_SENSE_INSERTED, successHandler);
        this.ar.addEventListener(WordSenseEvent.WORD_SENSE_INSERT_ERROR, faultHandler);

        this.ar.InsertWordSense2(ws, word_id, pos);
    }

    /*public UpdateWordSense(ws:Word_Sense, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(WordSenseEvent.WORD_SENSE_UPDATED, successHandler);
        this.ar.addEventListener(WordSenseEvent.WORD_SENSE_UPDATE_ERROR, faultHandler);

        this.ar.UpdateWordSense(ws);
    } */
    public UpdateWordSense2(ws:Word_Sense, word_id:number, pos:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(WordSenseEvent.WORD_SENSE_UPDATED, successHandler);
        this.ar.addEventListener(WordSenseEvent.WORD_SENSE_UPDATE_ERROR, faultHandler);

        this.ar.UpdateWordSense2(ws, word_id, pos);
    }

    public CreateWord(wordText:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(WordEvent.WORD_CREATED, successHandler);
        this.ar.addEventListener(WordEvent.WORD_CREATION_ERROR, faultHandler);

        this.ar.CreateWord(wordText, this.CurrentUser.User_id);
    }

    public AddWordStringsToList(wordlist:Wordlist, wordsStrings:string[], successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(MultiAddWordEvent.WORDS_ADDED, successHandler);
        this.ar.addEventListener(MultiAddWordEvent.MULTI_ADD_WORD_ERROR, faultHandler);

        this.ar.InsertMultipleWordStringToWordlist(wordlist, wordsStrings, this.CurrentUser.User_id);
    }

    public SearchWord(wordText:string, wordlistId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(WordEvent.WORD_FOUND, successHandler);
        this.ar.addEventListener(WordEvent.WORD_LOOKUP_ERROR, faultHandler);
        if (this.CurrentUser != null)
        {
            this.ar.SearchWordByText(wordText, wordlistId, this.CurrentUser.User_id);
        }
        else
        {
            this.ar.SearchWordByText2(wordText);
        }
    }

    public LookupWordsStartingWith(text:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(WordsLookupEvent.WORDS_FOUND, successHandler);
        this.ar.addEventListener(WordsLookupEvent.WORDS_LOOKUP_ERROR, faultHandler);

        this.ar.SelectAllWordsByText(text, this.CurrentUser.User_id);
    }

    /** TODO
     *
     * remove try catch in release
     *
     * */
    public GetUiTextByKey(key:string):string
    {
        let uiText:string = this.ar.GetUiTextByKey(key);
        uiText = StringUtils.ReplaceAll(uiText, "&[nl]", "\n");
        return uiText;
    }

    public UiTextLoaded():boolean
    {
        return this.ar.UiTextLoaded();
    }

    public getQuestionAnswer(id:number):string
    {
        return this.ar.SelectQuestionAnswerByQuestion(id);
    }

    public GetAllLanguages():Language[]
    {
        return this.ar.GetAllLanguages();//_cachedData.Languages;
    }

    public GetStatusLevels():StatusLevel[]
    {
        return this.ar.GetStatusLevels();
    }

    public GetStatusPoints():number
    {
        return this.ar.GetStatusPoints();
    }

    public AutoLoginFailed(): void {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.AUTO_LOGIN_FAILED));
    }

    public GetStartupData(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(ProductInfoEvent.STARTUP_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(ProductInfoEvent.STARTUP_DATA_ERROR, faultHandler);

        this.ar.GetStartupData(AppSettings.CurrentProductId);
    }

    public GetUITexts(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UITextEvent.UI_TEXT_RECEIVED, successHandler);
        this.ar.addEventListener(UITextEvent.UI_TEXT_ERROR, faultHandler);

        this.ar.GetUITexts(AppSettings.CurrentProductId);
    }

    //DEPRECATED STARTING AUGUST 2019 VERSION:
    public GetTotalStatusPoints(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVED, successHandler);
        this.ar.addEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVE_ERROR, faultHandler);

        this.ar.GetTotalStatusPoints(this.CurrentUser.User_id, this.CurrentProduct.ProductId);
    }

    //DEPRECATED STARTING AUGUST 2019 VERSION:
    public AddStatusPoints(statusPoints:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):number
    {
        this.ar.addEventListener(StatusPointsEvent.STATUS_POINTS_ADDED, successHandler);
        this.ar.addEventListener(StatusPointsEvent.STATUS_POINTS_ADD_ERROR, faultHandler);

        return this.ar.AddStatusPoints(statusPoints, this.CurrentUser.User_id, this.CurrentProduct.ProductId);
    }

    public GetUserStatusPoints(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVED, successHandler);
        this.ar.addEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVE_ERROR, faultHandler);
        this.ar.GetUserStatusPoints(this.CurrentUser.User_id, this.CurrentProduct.ProductId);
    }

    public AddStatusPoints2(statusPoints:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void
    {
        this.ar.addEventListener(StatusPointsEvent.STATUS_POINTS_ADDED, successHandler);
        this.ar.addEventListener(StatusPointsEvent.STATUS_POINTS_ADD_ERROR, faultHandler);
        this.ar.AddStatusPoints2(statusPoints, this.CurrentUser.User_id, this.CurrentProduct.ProductId);
    }

    public sendFeedback(feedback:Feedback, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void = null):void
    {
        this.ar.addEventListener(UberApplicationEventTypes.FEEDBACK_SENT, successHandler);
        this.ar.addEventListener(UberApplicationEventTypes.FEEDBACK_SEND_ERROR, faultHandler);

        this.ar.SendFeedback(feedback);
    }

    public WikiSearch(keyword:string, limit:number, user:string, password:string, site:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void = null):void
    {
        this.ar.addEventListener(WikiServiceEvent.WIKI_SEARCH_RESULTS, successHandler);
        this.ar.addEventListener(WikiServiceEvent.WIKI_SEARCH_ERROR, faultHandler);

        this.ar.WikiSearch(keyword, limit, user, password, site);
    }

    public WikiGetArticle(title:string, user:string, password:string, site:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void = null):void
    {
        this.ar.addEventListener(WikiServiceEvent.WIKI_ARTICLE_RESULT, successHandler);
        this.ar.addEventListener(WikiServiceEvent.WIKI_ARTICLE_ERROR, faultHandler);

        return this.ar.WikiGetArticle(title, user, password, site);
    }

    public GetProxyWordlists(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void = null):void
    {
        this.ar.addEventListener(SharedProxyWordlistsEvent.SHARED_PROXY_WORDLISTS_RECEIEVED_SUCCESS, successHandler);
        this.ar.addEventListener(SharedProxyWordlistsEvent.SHARED_PROXY_WORDLISTS_RECEIEVED_FAILED, faultHandler);

        this.ar.GetAllSharedProxyWordlistsByUser(this.CurrentUser.User_id, this.CurrentProduct.ProductId);
    }

    public GetWordlistShareSettings(wordListId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void = null):void
    {
        this.ar.addEventListener(WordlistShareSettingsEvent.WORDLIST_SHARE_SETTINGS_SUCCESS, successHandler);
        this.ar.addEventListener(WordlistShareSettingsEvent.WORDLIST_SHARE_SETTINGS_ERROR, faultHandler);

        this.ar.GetWordlistShareSettings(this.CurrentUser.User_id, wordListId);
    }

    public ShareWordlist(wordListId:number, userId:number, userStrings:string[], groupIds:number[], canEdit:boolean, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void = null):void
    {
        this.ar.addEventListener(WordlistShareSettingsEvent.WORDLIST_SHARE_SUCCESS, successHandler);
        this.ar.addEventListener(WordlistShareSettingsEvent.WORDLIST_SHARE_ERROR, faultHandler);

        this.ar.ShareWordlist(wordListId, userId, userStrings, groupIds, canEdit);
    }

    public DeleteSharedObject(sharedObjectId:number, userId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void = null):void
    {
        this.ar.addEventListener(UberApplicationEventTypes.SHARED_OBJECT_DELETED, successHandler);
        this.ar.addEventListener(UberApplicationEventTypes.SHARED_OBJECT_DELETE_ERROR, faultHandler);

        this.ar.DeleteSharedObject(sharedObjectId, userId);
    }

    public UpdateObjectShareSettings(sharedObjectId:number, userId:number, canEdit:boolean, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void = null):void
    {
        this.ar.addEventListener(SharedObjectEvent.SHARED_OBJECT_UPDATED, successHandler);
        this.ar.addEventListener(SharedObjectEvent.SHARED_OBJECT_UPDATE_ERROR, faultHandler);

        this.ar.UpdateObjectShareSettings(sharedObjectId, userId, canEdit);
    }

    public ResetPassword(userString:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void = null):void
    {
        this.ar.addEventListener(MessageEvent.PASSWORD_RESET, successHandler);
        this.ar.addEventListener(MessageEvent.PASSWORD_RESET_ERROR, faultHandler);

        this.ar.ResetPassword(userString, AppSettings.CurrentProductId);
    }

    public GetNews(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(NewsItemsEvent.NEWS_ITEMS_RECEIVED, successHandler);
        this.ar.addEventListener(NewsItemsEvent.NEWS_ITEMS_ERROR, faultHandler);

        this.ar.GetNews(this.CurrentUser.User_id, this.CurrentProduct.ProductId);
    }

    public Logout(emitLogout:boolean):void
    {
        this.ar.Logout();

        //this.hasStarted = false;
        //this.hasLoggedIn = false; will be set in CurrentUser function to false

        if(this.CurrentUser.GoogleUser) {
            gapi.auth2.getAuthInstance().signOut().then(function () {
                console.log('User signed out.');
            });
        }

        this.CurrentUser = null;
        this.CurrentUserData = null;
        this.CurrentActivity = null;
        //this._currentProduct = null;
        this.wordlistRestart = false;
        this.textRestart = false;

        this.dispatchEvent(new UserAuthenticatedEvent(UserAuthenticatedEvent.SIGN_OUT, null));
        setTimeout(() => UberReader.GetInstance().RestartApplication(), 1000);
    }

    public ClearLocalStorage():void
    {
        this.ar.ClearLocalStorage();
    }

    // private facebookLogoutResponse(response:any):void
    // {
    // 	FacebookAccessor.AccessToken = null;
    // 	FacebookAccessor.User = null;
    // 	UberReaderAccessor.GetUberReader().RestartApplication();
    // }

    // private googleLogoutResponse(response:any):void
    // {
    // 	GoogleAccessor.AccessToken = null;
    // 	GoogleAccessor.User = null;
    // 	UberReaderAccessor.GetUberReader().RestartApplication();
    // }

    public DeleteText(textId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(ProxyTextsEvent.PROXY_TEXT_DELETED, successHandler);
        this.ar.addEventListener(ProxyTextsEvent.PROXY_TEXT_DELETE_FAILED, faultHandler);

        this.ar.DeleteText(textId, this.CurrentUser.User_id);
    }

    public GetUserProxyTexts():ProxyText[]
    {
        return this.ar.GetUserProxyTexts();
    }

    public GetShowInLibraryProxyTexts():ProxyText[]
    {
        return this.ar.LibraryDefaultProxyTexts();
    }

    public GetSharedProxyTexts():SharedProxyText[]
    {
        return this.ar.GetSharedProxyTexts();
    }

    public GetTextShareSettings(textId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(TextShareSettingsEvent.TEXT_SHARE_SETTINGS_SUCCESS, successHandler);
        this.ar.addEventListener(TextShareSettingsEvent.TEXT_SHARE_SETTINGS_ERROR, faultHandler);

        this.ar.GetTextShareSettings(this.CurrentUser.User_id, textId, this.CurrentProduct.ProductId);
    }

    public ShareText(textId:number, userId:number, userStrings:string[], groupIds:number[], canEdit:boolean, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void = null):void
    {
        this.ar.addEventListener(TextShareSettingsEvent.TEXT_SHARE_SUCCESS, successHandler);
        this.ar.addEventListener(TextShareSettingsEvent.TEXT_SHARE_ERROR, faultHandler);

        this.ar.ShareText(textId, userId, userStrings, groupIds, canEdit, this.CurrentProduct.ProductId);
    }
    /*
    public GetUserSharedProxyTexts(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(SharedProxyTextsEvent.SHARED_PROXY_TEXTS_RECEIEVED_SUCCESS, successHandler);
        this.ar.addEventListener(SharedProxyTextsEvent.SHARED_PROXY_TEXTS_RECEIEVED_FAILED, faultHandler);

        this.ar.GetAllSharedProxyTextsByUser(CurrentUser.User_id, CurrentProduct.ProductId);
    }
    */

    public GetCourseData(courseId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(CourseEvent.COURSE_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(CourseEvent.COURSE_DATA_ERROR, faultHandler);

        this.ar.GetCourseData(courseId);
    }

    public GetCourseActivityPreview(courseActivityId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(CourseActivityPreviewEvent.COURSE_ACTIVITY_PREVIEW_RECEIVED, successHandler);
        this.ar.addEventListener(CourseActivityPreviewEvent.COURSE_ACTIVITY_PREVIEW_ERROR, faultHandler);

        this.ar.GetCourseActivityPreview(courseActivityId);
    }

    public GetActivityData(activityId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(ActivityEvent.ACTVITY_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(ActivityEvent.ACTVITY_DATA_ERROR, faultHandler);

        this.ar.GetActivity(activityId);
    }

    public GetProxyCourseById(id:number):ProxyCourse
    {
        return this.ar.GetProxyCourseById(id);
    }

    public GetAllProxyCourses(): ProxyCourse[] {
        return this.ar.GetAllProxyCourses();
    }

    public GetCourseById(id:number):Course
    {
        return this.ar.GetCourseById(id);
    }

    public GetOrganizationDisplayName():string
    {
        return this.ar.GetOrganizationDisplayName();
    }

    public SetOrganizationLogoUrl(value: string)
    {
        this.ar.SetOrganizationLogoUrl(value);
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.ORGANIZATION_LOGO_LOADED));
    }

    public GetOrganizationLogoUrl():string
    {
        return this.ar.GetOrganizationLogoUrl();
    }

    // public CreateTrialAccount(userData:UserIdentificationData, trialKey:string, productId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    // {
    //     this.ar.addEventListener(UserAuthenticatedEvent.ACTIVATION_CODE_USED, successHandler);
    //     this.ar.addEventListener(UserAuthenticatedEvent.ACTIVATION_CODE_ERROR, faultHandler);

    //     this.ar.CreateTrialAccount(userData, trialKey, productId);
    // }

    public CreateTrialAccount(userData:UserIdentificationData, trialKey:string, productId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UserAuthenticatedEvent.USER_AUTHENTICATED, successHandler);
        this.ar.addEventListener(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, faultHandler);

        this.ar.CreateUserAndGetData(userData, productId, trialKey);
    }

    public UpgradeTrialAccount(purchaseData:PurchaseData, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UserAuthenticatedEvent.USER_AUTHENTICATED, successHandler);
        this.ar.addEventListener(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, faultHandler);

        this.ar.UpgradeTrialAccount(purchaseData, this.CurrentUser.User_id, this.CurrentProduct.ProductId);
    }

    public GetUserText(textId:number):User_Text
    {
        return this.CreateOrLookUpUserText(textId);
    }

    public UpdateUserText(textId:number, isBackgroundCall: boolean = false):void
    {
        var userText:User_Text = this.GetUserText(textId);
        this.ar.UpdateUserText(userText, isBackgroundCall);

        if(this.CurrentUserData.CurrentText)
        {
            if(textId == this.CurrentUserData.CurrentText.Text_id)
            {
                this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.USER_TEXT_UPDATED));
            }
        }
    }

    private CreateOrLookUpUserText(textId:number):User_Text
    {
        var retVal:User_Text = this.ar.GetUserText(textId);

        if(retVal == null)
        {
            retVal = new User_Text();
            retVal.User_id = this.CurrentUser.User_id;
            retVal.Bookmark = 0;
            retVal.Finished = false;
            retVal.Text_id = textId;
            retVal.Last_updated = new Date();
            //retVal.Show_in_library.setBool(true);
            this.ar.InsertUserText(retVal);
        }

        return retVal;
    }

    public CheckUserTextExistence(textId:number):boolean
    {
        var retVal:User_Text = this.ar.GetUserText(textId);
        return retVal != null;
    }

    public GetTrialWordlistLimit():number
    {
        return this.ar.GetTrialWordlistLimit();
    }

    public SearchTexts(searchString:string, pageSize:number, pageNumber:number, searchCodeString:string, isInit:boolean, searchSession:SearchTextSessionCache, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void, doPreprocessing:boolean = false):void
    {
        this.ar.addEventListener(TextsSearchEvent.TEXTS_SEARCHED, successHandler);
        this.ar.addEventListener(TextsSearchEvent.TEXT_SEARCHED_FAILED, faultHandler);

        this.ar.SearchTexts(this.CurrentProduct.ProductId, this.CurrentUser.User_id, searchString, pageNumber, pageSize, searchCodeString, isInit, searchSession, doPreprocessing);
    }

    public SearchWordlists(searchString: string, pageSize: number, pageNumber: number, searchCodeString: string, isInit: boolean, searchSession: SearchTextSessionCache, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(WordlistSearchEvent.WORDLISTS_SEARCHED, successHandler);
        this.ar.addEventListener(WordlistSearchEvent.WORDLISTS_SEARCHED_FAILED, faultHandler);
        this.ar.SearchWordlists(this.CurrentProduct.ProductId, this.CurrentUser.User_id, searchString, pageNumber, pageSize, searchCodeString, isInit, searchSession);
    }

    public BrowseWordlistsByCategory(pageNumber: number, pageSize: number, categoryId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(WordlistSearchEvent.WORDLISTS_BROWSE, successHandler);
        this.ar.addEventListener(WordlistSearchEvent.WORDLISTS_BROWSE_FAILED, faultHandler);
        this.ar.BrowseWordlistsByCategory(this.CurrentProduct.ProductId, pageNumber, pageSize, categoryId);
    }

    //getbook
    public GetTextCovers(ids:number[]):void
    {
        this.ar.addEventListener(BookCoverEvent.IMAGE_LOADED, this.dispatchEvent);

        this.ar.GetTextCovers(ids);
    }

    public GetBookCoverByTextId(id:number):string
    {
        return this.ar.GetBookCoverByTextId(id);
    }

    public GetAuthorPictureById(id:number):AuthorPicture
    {
        return this.ar.GetAuthorPictureById(id);
    }

    //activity icon
    public GetActivityIcons(dpi:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(ActivityIconEvent.IMAGE_LOADED, successHandler);
        this.ar.addEventListener(ActivityIconEvent.IMAGE_FAILED, faultHandler);

        this.ar.GetActivityIcons(this.CurrentProduct.ProductId, dpi);
    }

    public GetActivityIconById(id:number):string
    {
        return this.ar.GetActivityIconById(id);
    }

    //course icon
    public GetCourseIcons(dpi:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(CourseIntroEvent.IMAGE_LOADED, successHandler);
        this.ar.addEventListener(CourseIntroEvent.IMAGE_FAILED, faultHandler);

        this.ar.GetCourseIcons(this.CurrentProduct.ProductId, dpi);
    }

    public GetCourseIconById(id:number):string
    {
        return this.ar.GetCourseIconById(id);
    }

    public GetWordPosByIds(pos_id:number):Word_Pos
    {
        return this.ar.GetWordPosByIds(pos_id);
    }

    public GetUsageExampleGenres():string[]
    {
        var retVal:string[] = new Array<string>();
        var usageExampleCode:Code = this.getCodeByText("example_genres");
        if (usageExampleCode != null)
        {
            var usageExampleCodes:Code[] = this.getCodesByParentId(usageExampleCode.Code_id);
            for (var code of usageExampleCodes)
            {
                retVal.push(code.Code_text);
            }
        }
        return retVal;
    }

    public GetWordPosExamples(wordPosId:number, /*code:string,*/ successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(WordUsageExampleEvent.WORD_USAGE_RETRIEVED, successHandler);
        this.ar.addEventListener(WordUsageExampleEvent.WORD_USAGE_FAILED, faultHandler);

        this.ar.GetWordPosExamples(wordPosId, /*code,*/);
    }

    /*public GetCourseIntroScreensByProduct(dpi:Number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(OnScreenIntroImageEvent.INTRO_IMAGE_LOADED, successHandler);
        this.ar.addEventListener(OnScreenIntroImageEvent.INTRO_IMAGE_FAILED, faultHandler);

        this.ar.GetCourseIntroScreensByProduct(CurrentProduct.ProductId, dpi);
    }*/

    public GetIntroImagesById(id:number):string
    {
        return this.ar.GetIntroImagesById(id);
    }

    /*public GetIntroScreensByCourse(id:number, dpi:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(OnScreenIntroImageEvent.INTRO_IMAGE_LOADED, successHandler);
        this.ar.addEventListener(OnScreenIntroImageEvent.INTRO_IMAGE_FAILED, faultHandler);

        this.ar.GetIntroScreensByCourse(id, dpi);
    }*/

    public GetIntroScreensByActivity(id:number, dpi:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        if(successHandler != null)
            this.ar.addEventListener(OnScreenIntroImageEvent.INTRO_IMAGE_LOADED, successHandler);
        if(faultHandler != null)
            this.ar.addEventListener(OnScreenIntroImageEvent.INTRO_IMAGE_FAILED, faultHandler);

        this.ar.GetIntroScreensByActivity(id, dpi);
    }

    public GetReadingTypes():Code[]
    {
        var readingCode:Code = this.getCodeByText("reading_levels");
        return this.getCodesByParentId(readingCode.Code_id);
    }

    public GetLCCTypes():Code[]
    {
        var lccCode:Code = this.getCodeByText("lcc");
        return this.getCodesByParentId(lccCode.Code_id);
    }

    public GetSpreederReadingLevels():Code[]
    {
        var spreederReadingLevel:Code = this.getCodeByText("spreeder_reading_levels");
        return this.getCodesByParentId(spreederReadingLevel.Code_id);
    }

    public GetTopics():Code[]
    {
        var topicsCode:Code = this.getCodeByText("topics_ut");
        return this.getCodesByParentId(topicsCode.Code_id);
    }

    public GetCategoriesByName(categoryName: string): Code[]
    {
        categoryName = categoryName.toLowerCase();
        let topicsCode: Code;
        switch(categoryName) {
            case 'typing_test':
                topicsCode = this.getCodeByText("topics_typesy_tests");
                break;
            case 'interactive':
                topicsCode = this.getCodeByText("topics_typesy_3");
                break;
            case 'classic':
            default:
                topicsCode = this.getCodeByText("topics_ut");
        }
        return this.getCodesByParentId(topicsCode.Code_id);
    }

    public BrowseTexts(pageNumber:number, pageSize:number, browseParameter:number, browseType:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void, doPreprocessing:boolean = false):void
    {
        this.ar.addEventListener(TextsSearchEvent.TEXTS_BROWSE, successHandler);
        this.ar.addEventListener(TextsSearchEvent.TEXTS_BROWSE_FAILED, faultHandler);

        this.ar.BrowseTexts(this.CurrentProduct.ProductId, pageNumber, pageSize, browseParameter, browseType, doPreprocessing);
    }

    public GetTextPreview(id:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UberReaderTextEvent.TEXT_RETREIVED, successHandler);
        this.ar.addEventListener(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, faultHandler);

        this.ar.GetTextPreview(id);
    }

    public GetNumberOfTexts():number
    {
        return this.ar.GetNumberOfTexts();
    }

    public GetNumberOfWordlists():number
    {
        return this.ar.GetNumberOfWordlists();
    }
    /* public GetNextRecommendedActivity(activityId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        console.log('GetNextRecommendedActivity :: GetNextRecommendedActivity :: ', categories, activities);
        this.ar.addEventListener(ActivityRecommendEvent.ACTVITY_RECOMMEND_RECEIVED, successHandler);
        this.ar.addEventListener(ActivityRecommendEvent.ACTVITY_RECOMMEND_FAILED, faultHandler);

        this.ar.GetNextRecommendedActivity(this.CurrentProduct.ProductId, activityId);
    } */

    public GetNextRecommendedActivity(activityId:number): number
    {
        let categories:Activity_Category[] = this.getAllActivityCategories().filter(category => category.ProxyActivities.length > 0);
        let activities: ProxyActivity[] = [];
        categories.forEach(category => {
            activities.push(...category.ProxyActivities);
        });
        activities = activities.filter(activity => /* activity.Suggest &&  */(!this.CurrentUser.Is_trial || this.IsTrialActivityEnabled(activity.Activity_id)) && this.IsActivityUnlocked(activity.Activity_id));
        let activityIds = activities.map(activity => activity.Activity_id);
        activityIds.splice(activityIds.indexOf(activityId), 1);
        activityIds.reverse();
        console.log('activityIds: ', activityIds);

        let cummulativeWeightings = [];
        let totalWeighting = 0;
        for (let i=0; i < activityIds.length; i++) {
            let currentWeighting = 1 + (2 * i / (activityIds.length - 1.0));
            totalWeighting += currentWeighting;
            cummulativeWeightings.push(totalWeighting);
        }

        let randomNum = Math.random() * totalWeighting;
        let index = cummulativeWeightings.indexOf(cummulativeWeightings.find(item => randomNum < item));

        return activityIds[index];
    }

    private IsActivityUnlocked(activityID: number): boolean {
        let currentLevel: TypesyStatusLevel;
        let currentStatusPoints: number = this.UserStatusPoints;        
        let statusLevels: TypesyStatusLevel[] = this.TypesyStatusLevels;
        //let userTypingCompetency: UserTypingCompetency = this.model.UserTypingCompetency;

        for (let level of statusLevels) {
            if (currentStatusPoints < Math.trunc(level.RequiredStatusPoints)) { //|| userTypingCompetency.Competency < level.RequiredTypingCompetency) {
                break;
            }
            else if (currentStatusPoints >= level.RequiredStatusPoints) { //&& userTypingCompetency.Competency >= level.RequiredTypingCompetency) {
                currentLevel = level;
            }
        }

        if (currentLevel.Name == "Diamond") {
            return true;
        }
        else {
            return currentLevel.AvailableActivityIDs.indexOf(activityID.toString()) != -1;
        }
    }

    public IsTrialActivityEnabled(activityId:number):boolean
    {
        return this.ar.IsTrialActivityEnabled(activityId);
    }

    public IsTrialCourseEnabled(courseId:number):boolean
    {
        return this.ar.IsTrialCourseEnabled(courseId);
    }

    public IsTrialTextEnabled(textId:number):boolean
    {
        return this.ar.IsTrialTextEnabled(textId);
    }

    public IsTrialChartEnabled(chartId:number):boolean
    {
        return this.ar.IsTrialChartEnabled(chartId);
    }

    public IfTrialCourseStep1Locked(courseId:number):boolean
    {
        return this.ar.IfTrialCourseStep1Locked(courseId);
    }

    public GetEnablePrintCertificates():boolean
    {
        return this.ar.GetEnablePrintCertificates();
    }

    public GetInAppOfferByCourseId(id:number):Offer
    {
        return this.ar.GetInAppOfferByCourseId(id);
    }

    public GetInAppOfferByProgramId(id:number):Offer
    {
        return this.ar.GetInAppOfferByProgramId(id);
    }

    public GetInAppOffersByProgramId(id:number):Offer[]
    {
        return this.ar.GetInAppOffersByProgramId(id);
    }

    public GetHtmlText(urlString:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(ImportTextDocumentEvent.TEXT_IMPORTED, successHandler);
        this.ar.addEventListener(ImportTextDocumentEvent.TEXT_IMPORT_FAILED, faultHandler);

        this.ar.GetHtmlText(urlString);
    }

    public GetRandomTest(readingLevel:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(TestDataEvent.TEST_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(TestDataEvent.TEST_DATA_ERROR, faultHandler);

        this.ar.GetRandomTest(this.CurrentProduct.ProductId, readingLevel);
    }

    public GetPrepPrograms(examType:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(DiscoverProgramEvent.PROGRAMS_RECEIVED, successHandler);
        this.ar.addEventListener(DiscoverProgramEvent.PROGRAMS_FAILED, faultHandler);

        this.ar.GetPrepPrograms(examType);
    }

    public BrowseFilterCourses(prepEdProduct:string, browse:TreeNode, filter:PrepEdCourseFilter, pageNumber:number, pageSize:number, refresh:boolean, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(DiscoveryBrowseEvent.COURSES_RECEIVED, successHandler);
        this.ar.addEventListener(DiscoveryBrowseEvent.COURSES_FAILED, faultHandler);

        this.ar.BrowseFilterCourses(AppSettings.CurrentProductId, prepEdProduct, browse, filter, pageNumber, pageSize, refresh);
    }

    public GetPrepRecommendations(exam:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void)
    {
        this.ar.addEventListener(PrepRecommendationEvent.PREP_RECOMMENDATIONS_RECEIVED, successHandler);
        this.ar.addEventListener(PrepRecommendationEvent.PREP_RECOMMENDATIONS_FAILED, faultHandler);

        this.ar.GetPrepRecommendations(exam, this.hasLoggedIn);
    }

    public GetNextRecommendedCourses(course_id: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void)
    {
        this.ar.addEventListener(NextPrepRecommendationEvent.PREP_RECOMMENDATIONS_RECEIVED, successHandler);
        this.ar.addEventListener(NextPrepRecommendationEvent.PREP_RECOMMENDATIONS_FAILED, faultHandler);

        this.ar.GetNextRecommendedCourses(course_id, this.hasLoggedIn);
    }

    public GetDiscoverProxyCourses():ProxyCourse[]
    {
        return this.ar.GetDiscoverProxyCourses();
    }

    public GetDiscoverProxyCoursesById(id:number):ProxyCourse
    {
        return this.ar.GetDiscoverProxyCoursesById(id);
    }

    public GetPrepProgramInfoDataByWebUrl(webUrl:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(ProgramInfoEvent.INFO_RECEIVED, successHandler);
        this.ar.addEventListener(ProgramInfoEvent.INFO_FAILED, faultHandler);

        this.ar.GetPrepProgramInfoDataByWebUrl(webUrl);
    }

    public GetPrepProgramUserData(programId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(ProgramInfoEvent.INFO_USER_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(ProgramInfoEvent.INFO_USER_DATA_FAILED, faultHandler);

        this.ar.GetPrepProgramUserData(programId);
    }

    public GetCourseInfo(courseId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(CourseInfoEvent.INFO_RECEIVED, successHandler);
        this.ar.addEventListener(CourseInfoEvent.INFO_FAILED, faultHandler);

        this.ar.GetCourseInfo(courseId);
    }

    public GetCourseInfoByWebUrl(webUrl:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(CourseInfoEvent.INFO_RECEIVED, successHandler);
        this.ar.addEventListener(CourseInfoEvent.INFO_FAILED, faultHandler);

        this.ar.GetCourseInfoByWebUrl(webUrl);
    }

    public GetCourseInfoUserData(courseId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(CourseInfoEvent.INFO_USER_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(CourseInfoEvent.INFO_USER_DATA_FAILED, faultHandler);

        this.ar.GetCourseInfoUserData(courseId);
    }

    public GetPublicUserProfileByWebUrl(webUrl:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UserInfoEvent.USER_INFO_RECEIVED, successHandler);
        this.ar.addEventListener(UserInfoEvent.USER_INFO_FAILED, faultHandler);

        this.ar.GetPublicUserProfileByWebUrl(webUrl);
    }

    // public GetAuthorInfoByWebUrl(webUrl:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    // {
    //     this.ar.addEventListener(AuthorInfoEvent.AUTHOR_INFO_RECEIVED, successHandler);
    //     this.ar.addEventListener(AuthorInfoEvent.AUTHOR_INFO_FAILED, faultHandler);

    //     this.ar.GetAuthorInfoByWebUrl(webUrl);
    // }

    public PurchasePrepProgram(programId:number, purchaseData:PurchaseData, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(AddPrepProgramEvent.ADD_PROGRAM_SUCCESS, successHandler);
        this.ar.addEventListener(AddPrepProgramEvent.ADD_PROGRAM_FAILED, faultHandler);

        this.ar.PurchasePrepProgram(programId, purchaseData);
    }

    public PurchaseCourse(courseId:number, purchaseData:PurchaseData, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(AddCourseEvent.ADD_COURSE_SUCCESS, successHandler);
        this.ar.addEventListener(AddCourseEvent.ADD_COURSE_FAILED, faultHandler);

        this.ar.PurchaseCourse(courseId, purchaseData);
    }

    public PurchasePrepProgramActivationCode(activationCode:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(AddPrepProgramEvent.ADD_PROGRAM_SUCCESS, successHandler);
        this.ar.addEventListener(AddPrepProgramEvent.ADD_PROGRAM_FAILED, faultHandler);

        this.ar.PurchasePrepProgramActivationCode(activationCode);
    }

    public PrepEdUseActivationCode(activationCode:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(AddPrepProgramsEvent.ADD_PROGRAMS_SUCCESS, successHandler);
        this.ar.addEventListener(AddPrepProgramsEvent.ADD_PROGRAMS_FAILED, faultHandler);

        this.ar.PrepEdUseActivationCode(activationCode);
    }

    public GetMyCourses():ProxyCourse[]
    {
        return this.ar.GetMyCourses();
    }

    public GetMyCoursesByPage(pageNumber:number, pageSize:number, sortBy:string="recent", filters:string[]=[]):ProxyCourse[]
    {
        return this.ar.GetMyCoursesByPage(pageNumber, pageSize, sortBy, filters);
    }

    public GetMyCourseWishlist():ProxyCourse[]
    {
        if (this.hasLoggedIn)
        {
            return this.ar.GetMyCourseWishlist();
        }
        else
        {
            return [];
        }
    }

    public GetMyPrepProgramWishlist():Prep_Program[]
    {
        if(this.hasLoggedIn)
        {
            return this.ar.GetMyPrepProgramWishlist();
        }
        else
        {
            return [];
        }
    }

    public AddPrepProgramToWishlist(programId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(ProgramToWishlistEvent.PROGRAM_ADDED, successHandler);
        this.ar.addEventListener(ProgramToWishlistEvent.PROGRAM_NOT_ADDED, faultHandler);

        this.ar.AddPrepProgramToWishlist(programId);
    }

    public RemovePrepProgramFromWishlist(programId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(ProgramToWishlistEvent.PROGRAM_REMOVED, successHandler);
        this.ar.addEventListener(ProgramToWishlistEvent.PROGRAM_NOT_REMOVED, faultHandler);

        this.ar.RemovePrepProgramFromWishlist(programId);
    }

    public AddCourseToWishlist(courseId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(CourseToWishlistEvent.COURSE_ADDED, successHandler);
        this.ar.addEventListener(CourseToWishlistEvent.COURSE_NOT_ADDED, faultHandler);

        this.ar.AddCourseToWishlist(courseId);
    }

    public RemoveCourseFromWishlist(courseId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(CourseToWishlistEvent.COURSE_REMOVED, successHandler);
        this.ar.addEventListener(CourseToWishlistEvent.COURSE_NOT_REMOVED, faultHandler);

        this.ar.RemoveCourseFromWishlist(courseId);
    }

    public RateCourse(courseId:number, rating:number, review:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(RatingCourseEvent.RATING_SUCCESSFUL, successHandler);
        this.ar.addEventListener(RatingCourseEvent.RATING_FAILED, faultHandler);

        this.ar.RateCourse(courseId, rating, review);
    }

    public GetTrialMaxNumTexts():number
    {
         return this.ar.GetTrialMaxNumTexts();
    }

    public GetCourseComments(courseId:number, pageNumber:number, pageSize:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(CourseCommentEvent.COMMENTS_LOADED, successHandler);
        this.ar.addEventListener(CourseCommentEvent.COMMENTS_FAILED, faultHandler);

        this.ar.GetCourseComments(courseId, pageNumber, pageSize);
    }

    public GetPrepProgramComments(programId:number, pageNumber:number, pageSize:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(CourseCommentEvent.COMMENTS_LOADED, successHandler);
        this.ar.addEventListener(CourseCommentEvent.COMMENTS_FAILED, faultHandler);

        this.ar.GetPrepProgramComments(programId, pageNumber, pageSize);
    }

    public GetMyProxyCoursesByProgramId(programId:number):ProxyCourse[]
    {
        return this.ar.GetMyProxyCoursesByProgramId(programId);
    }

    public GetMyPrepProgram():Prep_Program[]
    {
        return this.ar.GetMyPrepProgram();
    }

    // public SaveCourseImageToCache(bitmap:BitmapData, filename:string):void
    // {
    //     this.ar.SaveCourseImageToCache(bitmap, filename);
    // }

    // public GetCourseImageFromCache(filename:string):BitmapData
    // {
    //     return this.ar.GetCourseImageFromCache(filename);
    // }

    public GetQuestionGroupById(id:number):Question_Group
    {
        return this.ar.GetQuestionGroupById(id);
    }

    public GetQuestionGroupByCourseId(id:number):Question_Group[]
    {
        return this.ar.GetQuestionGroupByCourseId(id);
    }

    public GetMyCourseById(id:number):ProxyCourse
    {
        return this.ar.GetMyCourseById(id);
    }

    public GetCoursePreview(courseId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(CoursePreviewEvent.PREVIEW_LOADED, successHandler);
        this.ar.addEventListener(CoursePreviewEvent.PREVIEW_ERROR, faultHandler);

        this.ar.GetCoursePreview(courseId);
    }

    public GetUserCommentByCourseId(id:number):User_Comment
    {
        return this.ar.GetUserCommentByCourseId(id);
    }

    public GetUserCommentByPrepProgramId(id:number):User_Comment
    {
        return this.ar.GetUserCommentByPrepProgramId(id);
    }

    // public CreateAnonymousUser(version:string, clientType:string, trialKey:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    // {
    //     this.ar.addEventListener(UserAuthenticatedEvent.USER_AUTHENTICATED, successHandler);
    //     this.ar.addEventListener(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, faultHandler);

    //     this.ar.CreateAnonymousAccount(AppSettings.CurrentProductId, trialKey, version, clientType);
    // }

    public FlagCourseActivity(activityId:number, reason:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
    {
        this.ar.addEventListener(UberApplicationEventTypes.FEEDBACK_SENT, successHandler);
        this.ar.addEventListener(UberApplicationEventTypes.FEEDBACK_SEND_ERROR, faultHandler);

        this.ar.FlagCourseActivity(activityId, reason);
    }

    public CompletePrepEdProfileInfo(profile_info: UserProfileInfo, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(UberApplicationEventTypes.COMPLETE_PREPED_PROFILE_INFO_SUCCESS, successHandler);
        this.ar.addEventListener(UberApplicationEventTypes.COMPLETE_PREPED_PROFILE_INFO_FAILED, faultHandler);

        this.ar.CompletePrepEdProfileInfo(profile_info);
    }

    public GetPrepEdDiscoverBrowse(section:string):TreeNode[]
    {
        let retVal:TreeNode[] = [];
        //retVal.push(new TreeNode(null, "All Prep"));

        let prepedDiscoverCode:Code = this.getCodeByText(section.toLowerCase() + "_sections");
        if (prepedDiscoverCode != null)
        {
            var parentBrowses:Code[] = this.getCodesByParentId(prepedDiscoverCode.Code_id);
            for (var parentCode of parentBrowses)
            {
                var parentNode:TreeNode = new TreeNode(parentCode, parentCode.Code_text);
                var childBrowses:Code[] = this.getCodesByParentId(parentCode.Code_id);
                for (var childCode of childBrowses)
                {
                    var childNode:TreeNode = new TreeNode(childCode, childCode.Code_text);
                    //childNode.ParentNode = parentNode;
                    parentNode.AddChild(childNode);
                }

                retVal.push(parentNode);
            }
        }

        return retVal;
    }

    public GetAllPrepEdDiscoveryBrowse():TreeNode[]
    {
        let retVal:TreeNode[] = [];
        let codes:Code[] = this.getCodesByParentId(220);
        for(let code of codes)
        {
            retVal = retVal.concat(this.GetPrepEdDiscoverBrowse(code.Code_text));
        }

        return retVal;
    }

    public ChangePrepEdDiscoverFilter(browseNode:TreeNode):void
    {
        this.dispatchEvent(new TreeNodeEvent(TreeNodeEvent.TREE_NODE_SELECTED, browseNode));
    }

    public UpdatePrepEdExamType():void
    {
        this.htmlService.setTitle("PrepEd");
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.UPDATE_EXAM_TYPE));
    }

    public UpdatePrepEdBrowseSubjects():void
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.UPDATE_BROWSE_SUBJECTS));
    }

    public AddWordStringsToListById(wordlistId:number, wordsStrings:string[], successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void
	{
		this.ar.addEventListener(MultiAddWordEvent.WORDS_ADDED, successHandler);
		this.ar.addEventListener(MultiAddWordEvent.MULTI_ADD_WORD_ERROR, faultHandler);

		this.ar.InsertMultipleWordStringToWordlistId(wordlistId, wordsStrings, this.CurrentUser.User_id);
	}

    public NewWordsAddedToList(numWords:number):void
    {
        this.dispatchEvent(new NewWordsAddedToListEvent(NewWordsAddedToListEvent.NEW_WORDS_ADDED, numWords));
    }

    public GetUnseenCourses():number
    {
        return this.ar.GetUnseenCourses();
    }

    public GetUnseenWishlistCourses():number
    {
        return this.ar.GetUnseenWishlistCourses();
    }

    public GetUnseenNotes():number
    {
        return this.ar.GetUnseenNotes();
    }

    public GetUnseenPrepProgram():number
    {
        return this.ar.GetUnseenPrepProgram();
    }

    public GetUnseenWords(wordlist_id:number):number
    {
        return this.ar.GetUnseenWords(wordlist_id);
    }

    public UpdateAppStatus():void
    {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.UPDATE_STATUS));
    }

    public GetWordUsageExamples(wordId:number, wordPosId:number, genresSelected:string[]):WordUsageExample[]
    {
        return this.ar.GetWordUsageExamples(wordId, wordPosId, genresSelected);
    }

    public SetWordUsageExamples(wordId:number, wordPosId:number, examples:WordUsageExample[]):void
    {
        this.ar.SetWordUsageExamples(wordId, wordPosId, examples);
    }

    public GetLeaderboards(timeRange:string, boardType:string, productId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(LeaderboardEvent.LEADERBOARDS_RECEIVED , successHandler);
        this.ar.addEventListener(LeaderboardEvent.LEADERBOARDS_ERROR , faultHandler);

        if(timeRange == "current") {
            if(boardType == "home") {
                this.ar.GetCurrentHomeLeaderboards(productId);
            }
            else if (boardType == "edu class") {
                this.ar.GetLeaderboardsEduByGroup(productId);
            }
            else {
                this.ar.GetCurrentEDULeaderboards(productId);
            }
        }
        else if(timeRange == "past") {
            if(boardType == "home") {
                this.ar.GetPastHomeLeaderboards(productId);
            }
            else if (boardType == "edu class") {
                this.ar.GetPastLeaderboardsEduByGroup(productId);
            }
            else {
                this.ar.GetPastEDULeaderboards(productId);
            }
        }
    }

    public get UpgradeURL(): string {
        return this.ar.UpgradeURL;
    }

    public UserAccountActivated(): void {
        this.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.USER_ACCOUNT_ACTIVATED));
    }

    /** ADMIN INTERFACE FUNCTIONS **/
    public HasAdminData(): boolean {
        return this.ar.HasAdminData();
    }

    public GetAdminInterfaceData(customerId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminEvent.ADMIN_DATA_RECEIVED , successHandler);
        this.ar.addEventListener(AdminEvent.ADMIN_DATA_ERROR , faultHandler);
        this.ar.GetAdminInterfaceData(customerId);
    }

    public GetAdminInterfaceData2(customerId: number, districtId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminEvent.ADMIN_DATA_RECEIVED , successHandler);
        this.ar.addEventListener(AdminEvent.ADMIN_DATA_ERROR , faultHandler);
        this.ar.GetAdminInterfaceData2(customerId, districtId);
    }

    public GetAdminUsers(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminUserEvent.ADMIN_USERS_RECEIVED , successHandler);
        this.ar.addEventListener(AdminUserEvent.ADMIN_USERS_ERROR , faultHandler);
        this.ar.GetAdminUsers();
    }

    public EditAdminUser(user:AdminUser, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminUserEvent.ADMIN_USER_UPDATED, successHandler);
        this.ar.addEventListener(AdminUserEvent.ADMIN_USERS_ERROR, faultHandler);
        this.ar.EditAdminUser(user);
    }

    /* public AdminCreateUser(user:AdminUser, generateUsername: boolean, generatePassword: boolean, groupID: number, customerId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminUserEvent.ADMIN_USER_CREATED, successHandler);
        this.ar.addEventListener(AdminUserEvent.ADMIN_USERS_ERROR, faultHandler);
        this.ar.AdminCreateUser(user, generateUsername, generatePassword, groupID, customerId);
    } */

    public AdminResetUserPasswords(userIDs: number[], successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminUserEvent.ADMIN_USER_PASSWORD_RESET, successHandler);
        this.ar.addEventListener(AdminUserEvent.ADMIN_USERS_ERROR, faultHandler);
        this.ar.AdminResetUserPasswords(userIDs);
    }

    /* public AdminDeleteUsers(userIds: number[], successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminUserEvent.ADMIN_USERS_DELETED, successHandler);
        this.ar.addEventListener(AdminUserEvent.ADMIN_USERS_ERROR, faultHandler);
        this.ar.AdminDeleteUsers(userIds);
    } */

    public GetRunningTaskStatus(runningTaskId: number/* , successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void */): Observable<AdminUserEvent> {
        // this.ar.addEventListener(RunningTaskStatusEvent.TASK_SUCESS, successHandler);
        // this.ar.addEventListener(RunningTaskStatusEvent.TASK_ERROR, faultHandler);
        return this.ar.GetRunningTaskStatus(runningTaskId);
    }

    public GetRunningTaskStatusByID(runningTaskId: number): Observable<RunningTaskEvent> {
        return this.ar.GetRunningTaskStatusByID(runningTaskId);
    }

    public AdminStartImportUsers(file: string, fixNameCapitalization: boolean, groupId: number, customerId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminUserEvent.ADMIN_USERS_IMPORTED, successHandler);
        this.ar.addEventListener(AdminUserEvent.ADMIN_USERS_IMPORT_ERROR, faultHandler);
        this.ar.AdminStartImportUsers(file, fixNameCapitalization, groupId, customerId);
    }

    public AdminImportUsers(file: string, fixNameCapitalization: boolean, groupId: number, customerId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminUserEvent.ADMIN_USERS_IMPORTED, successHandler);
        this.ar.addEventListener(AdminUserEvent.ADMIN_USERS_IMPORT_ERROR, faultHandler);
        this.ar.AdminImportUsers(file, fixNameCapitalization, groupId, customerId);
    }

    public GetAdminGroups():Group[]
    {
        return this.ar.GetAdminGroups();
    }

    public GetAdminGroup(groupId:number):Group
    {
        return this.ar.GetAdminGroup(groupId);
    }

    public GetAdminUserChartCategories():Chart_Category[]
    {
        return this.ar.GetAdminUserChartCategories();
    }
    public GetAdminGroupChartCategories():Chart_Category[]
    {
        return this.ar.GetAdminGroupChartCategories();
    }

     /**
     * synchronously gets all group charts from cache
     */
    public GetAdminGroupCharts(): Chart[] {
        return this.ar.GetAdminGroupCharts(false);
    }
    /**
     * synchronously gets all group reports from cache
     */
    public GetAdminGroupReports(): Chart[] {
        return this.ar.GetAdminGroupCharts(true);
    }

    /**
     * synchronously get a list of all users from cache
     * @param groupId the id of the group to get users from
     */
    public GetAdminUsersCache(): AdminUser[]
    {
        return this.ar.GetAdminUsersCache();
    }
    /**
     * returns a list of all users in a group
     * @param groupId the id of the group to get users from
     */
    public GetUsersByGroup(groupId:number): AdminUser[] {
        return this.ar.GetAdminUsersByGroupIsLeader(groupId, null);
    }
    /**
     * returns a list of all users in a group that are students
     * @param groupId the id of the group to get users from
     */
    public GetStudentsByGroup(groupId:number): AdminUser[] {
        return this.ar.GetAdminUsersByGroupIsLeader(groupId, false);
    }

    public GetGroupByUserID(userID: number): Group {
        return this.ar.GetGroupByUserID(userID);
    }

    public GetGroupsByUserID(userID: number): Group[] {
        return this.ar.GetGroupsByUserID(userID);
    }

    public GetAdminUsersByClassName(groupName: string): AdminUser[] {
        return this.ar.GetAdminUsersByClassName(groupName);
    }

    /**
     * returns a list of all users in a group that are instructors
     * @param groupId the id of the group to get users from
     */
    public GetInstructorsByGroup(groupId:number): AdminUser[] {
        return this.ar.GetAdminUsersByGroupIsLeader(groupId, true);
    }
    /**
     * returns a list of all users in current organization that are not in a particular group
     * @param groupId the id of the group
     */
    public GetUsersNotInGroup(groupId:number): AdminUser[] {
        return this.ar.GetAdminUsersNotInGroup(groupId);
    }

    public GetUsersNotInAnyGroup(): AdminUser[] {
        return this.ar.GetUsersNotInAnyGroup();
    }

    public AdminAddUsersToGroup(groupId:number, userIds:number[], asLeaders: boolean, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(UserGroupEvent.USERS_ADDED_TO_GROUP, successHandler);
        this.ar.addEventListener(UserGroupEvent.USERS_ADD_TO_GROUP_ERROR, faultHandler);
        this.ar.AdminAddUsersToGroup(groupId, userIds, asLeaders);
    }

    public AdminAddInstructorsToGroup(groupId:number, userIds:number[], successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(UserGroupEvent.INSTRUCTORS_ADDED_TO_GROUP, successHandler);
        this.ar.addEventListener(UserGroupEvent.INSTRUCTORS_ADD_TO_GROUP_ERROR, faultHandler);
        this.ar.AdminAddInstructorToGroup(groupId, userIds);
    }

    public AdminRemoveUsersFromGroup(groupId:number, userIds:number[], successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(UserGroupEvent.USERS_REMOVED_FROM_GROUP, successHandler);
        this.ar.addEventListener(UserGroupEvent.USERS_REMOVE_FROM_GROUP_ERROR, faultHandler);
        this.ar.AdminRemoveUsersFromGroup(groupId, userIds);
    }

    public AdminCreateGroup(group:Group, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminGroupEvent.ADMIN_GROUP_CREATED, successHandler);
        this.ar.addEventListener(AdminGroupEvent.ADMIN_GROUP_CREATION_ERROR, faultHandler);
        this.ar.AdminCreateGroup(group);
    }

    public AdminEditGroup(group:Group, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void, isBackgroundCall: boolean = false): void {
        this.ar.addEventListener(AdminGroupEvent.ADMIN_GROUP_UPDATED, successHandler);
        this.ar.addEventListener(AdminGroupEvent.ADMIN_GROUP_UPDATE_ERROR, faultHandler);
        this.ar.AdminEditGroup(group, isBackgroundCall);
    }

    public AdminGetLiveUserData(userId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminLiveUserDataEvent.ADMIN_LIVE_USER_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(AdminLiveUserDataEvent.ADMIN_LIVE_USER_DATA_ERROR, faultHandler);
        this.ar.AdminGetLiveUserData(userId);
    }

    public AdminGetLiveGroupData(groupId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminLiveUserDataEvent.ADMIN_LIVE_GROUP_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(AdminLiveUserDataEvent.ADMIN_LIVE_GROUP_DATA_ERROR, faultHandler);
        this.ar.AdminGetLiveGroupData(groupId);
    }

    public AdminGetGroupSettings(groupId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_RECEIVED, successHandler);
        this.ar.addEventListener(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_ERROR, faultHandler);
        this.ar.AdminGetGroupSettings(groupId);
    }

    public AdminSaveGroupSettings(groupId:number, groupSettings:Setting[], groupUserPrefs:UserPref[], successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_UPDATED, successHandler);
        this.ar.addEventListener(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_UPDATE_ERROR, faultHandler);
        this.ar.AdminSaveGroupSettings(groupId, groupSettings, groupUserPrefs);
    }

    public AdminBulkUpdateGroupSettings(groupIds:number[], groupSettings:Setting[], groupUserPrefs:UserPref[], successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_UPDATED, successHandler);
        this.ar.addEventListener(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_UPDATE_ERROR, faultHandler);
        this.ar.AdminBulkUpdateGroupSettings(groupIds, groupSettings, groupUserPrefs);
    }

    public AdminResetGroupSettings(groupId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_RESET, successHandler);
        this.ar.addEventListener(AdminGroupSettingsEvent.ADMIN_GROUP_SETTINGS_RESET_ERROR, faultHandler);
        this.ar.AdminResetGroupSettings(groupId);
    }

    public AdminGetUserChartData(userId:number, chart:Chart, grouping:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(ChartDataEvent.CHART_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(ChartDataEvent.CHART_DATA_ERROR, faultHandler);
        this.ar.GetChartData3([chart], grouping,null, userId, this.CurrentProduct.ProductId, "default", true);
    }

    public GetChartDataDateRange(userID: number, charts: Chart[], grouping: string, startDate: Date, endDate: Date, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(ChartDataEvent.CHART_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(ChartDataEvent.CHART_DATA_ERROR, faultHandler);
        this.ar.GetChartDataDateRange(charts, userID, this.CurrentProduct.ProductId, grouping, startDate, endDate, this.CurrentWordlist != null? this.CurrentWordlist.Wordlist_id : null);
    }

    public AdminGetGroupChartDataByID(chartId: number, groupId:number, grouping:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(ChartDataEvent.GROUP_CHART_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(ChartDataEvent.GROUP_CHART_DATA_ERROR, faultHandler);
        this.ar.AdminGetGroupChartDataByID(chartId, grouping, groupId, this.CurrentProduct.ProductId);
    }

    public AdminGetGroupChartData(groupId:number, charts:Chart[], grouping:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(ChartDataEvent.GROUP_CHART_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(ChartDataEvent.GROUP_CHART_DATA_ERROR, faultHandler);
        this.ar.AdminGetGroupChartData(charts, grouping,groupId, this.CurrentProduct.ProductId);
    }

    public AdminGetGroupChartDataDateRange(charts: Chart[], groupId:number, grouping:string, startDate: Date, endDate: Date, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(ChartDataEvent.GROUP_CHART_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(ChartDataEvent.GROUP_CHART_DATA_ERROR, faultHandler);
        this.ar.AdminGetGroupChartDataDateRange(charts, groupId, this.CurrentProduct.ProductId, grouping, startDate, endDate);
    }

    public AdminGetGroupReportData(groupId:number, chart:Chart, grouping:string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(GroupReportDataEvent.GROUP_REPORT_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(GroupReportDataEvent.GROUP_REPORT_DATA_ERROR, faultHandler);
        this.ar.AdminGetGroupReportData(chart, grouping,groupId, this.CurrentProduct.ProductId);
    }

    public AdminGetGroupReportDataDateRange(chart:Chart, groupId:number, grouping:string, startDate: Date, endDate: Date, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(GroupReportDataEvent.GROUP_REPORT_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(GroupReportDataEvent.GROUP_REPORT_DATA_ERROR, faultHandler);
        this.ar.AdminGetGroupReportDataDateRange(chart, groupId, this.CurrentProduct.ProductId, grouping, startDate, endDate);
    }

    public AdminGetUserReportData(userId:number, chart:Chart, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void {
        this.ar.addEventListener(ChartDataEvent.USER_REPORT_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(ChartDataEvent.USER_REPORT_DATA_ERROR, faultHandler);
        this.ar.AdminGetUserReportData(chart, userId, this.CurrentProduct.ProductId);
    }

    public AdminDeleteClass(groupId:number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void {
        this.ar.addEventListener(AdminGroupEvent.ADMIN_GROUP_DELETED, successHandler);
        this.ar.addEventListener(AdminGroupEvent.ADMIN_GROUP_DELETE_ERROR, faultHandler);
        this.ar.AdminDeleteGroup(groupId);
    }

    public AdminDeleteGroups(groupIds:number[], successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void {
        this.ar.addEventListener(AdminGroupEvent.ADMIN_GROUP_DELETED, successHandler);
        this.ar.addEventListener(AdminGroupEvent.ADMIN_GROUP_DELETE_ERROR, faultHandler);
        this.ar.AdminDeleteGroups(groupIds);
    }

    public UpdateUserWorkingOn(currentActivity:string):void {
        //this.ar.addEventListener(AdminGroupEvent.ADMIN_GROUP_DELETED, successHandler);
        //this.ar.addEventListener(AdminGroupEvent.ADMIN_GROUP_DELETE_ERROR, faultHandler);
        this.ar.UpdateUserWorkingOn(currentActivity);
    }

    public StartAdminDataSync(purchaseId: number, customerId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminDataSyncEvent.ADMIN_DATA_SYNCED, successHandler);
        this.ar.addEventListener(AdminDataSyncEvent.ADMIN_DATA_SYNC_ERROR, faultHandler);
        this.ar.StartAdminDataSync(purchaseId, customerId);
    }

    public StopSyncingAdminData():void {
        this.ar.StopSyncingAdminData();
    }

    public StartAdminTasksDataSync(groupId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(TypingTasksDataSyncEvent.TASKS_DATA_SYNC_SUCCESS, successHandler);
        this.ar.addEventListener(TypingTasksDataSyncEvent.TASKS_DATA_SYNC_ERROR, faultHandler);
        this.ar.StartAdminTasksDataSync(groupId);
    }

    public StopAdminTasksDataSync(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void):void {
        this.ar.StopAdminTasksDataSync();
        this.ar.removeEventListener(TypingTasksDataSyncEvent.TASKS_DATA_SYNC_SUCCESS, successHandler);
        this.ar.removeEventListener(TypingTasksDataSyncEvent.TASKS_DATA_SYNC_ERROR, faultHandler);
    }

    public AdminCleverResync(customerId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminCleverSyncEvent.ADMIN_CLEVER_SYNCED, successHandler);
        this.ar.addEventListener(AdminCleverSyncEvent.ADMIN_CLEVER_SYNC_ERROR, faultHandler);
        this.ar.AdminCleverResync(customerId);
    }

    public AdminDistrictResync(districtID: number, startHandler:(event:UberApplicationEvent) => void, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminDistrictSyncEvent.ADMIN_DISTRICT_SYNC_IN_PROGRESS, startHandler);
        this.ar.addEventListener(AdminDistrictSyncEvent.ADMIN_DISTRICT_SYNC_FINISHED, successHandler);
        this.ar.addEventListener(AdminDistrictSyncEvent.ADMIN_DISTRICT_SYNC_ERROR, faultHandler);
        this.ar.AdminDistrictResync(districtID);
    }

    public CallRunningTaskHandler(taskID: number, responseJSONObject: any): void {
        this.ar.CallRunningTaskHandler(taskID, responseJSONObject);
    }

    public GetAdminUserGoals(userId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminUserGoalsEvent.ADMIN_USER_GOALS_RECEIVED, successHandler);
        this.ar.addEventListener(AdminUserGoalsEvent.ADMIN_USER_GOALS_ERROR, faultHandler);
        this.ar.AdminGetUserGoals(userId);
    }

    public GetEreflectAdminCustomers():Customer[] {
        return this.ar.GetEreflectAdminCustomers();
    }

    public GetCurrentCustomerId(): number {
        return this.ar.GetCurrentCustomerId();
    }

    public SetCurrentCustomerId(id: number): void {
        this.ar.SetCurrentCustomerId(id);
    }

    public GetNextRecommendedText(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_RECEIVED, successHandler);
        this.ar.addEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_ERROR, faultHandler);
        this.ar.GetNextRecommendedText(this.CurrentUserData.CurrentText.Text_id);
    }

    public GetNextRecommendedText2(successHandler: (event: UberApplicationEvent) => void, faultHandler: (event: UberApplicationEvent) => void): void {
        this.ar.addEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_RECEIVED, successHandler);
        this.ar.addEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_ERROR, faultHandler);
        this.ar.GetNextRecommendedText2(this.CurrentUserData.CurrentText.Text_id);
    }

    private currentCleverCode: string;
    public get CurrentCleverCode(): string {
        return this.currentCleverCode;
    }

    public set CurrentCleverCode(code: string) {
        this.currentCleverCode = code;
    }

    private currentClasslinkCode: string;
    public get CurrentClasslinkCode(): string {
        return this.currentClasslinkCode;
    }

    public set CurrentClasslinkCode(code: string) {
        this.currentClasslinkCode = code;
    }

    private sso: string;
    public get SSO(): string {
        return this.sso;
    }

    public set SSO(sso: string) {
        this.sso = sso;
    }

    private sig: string;
    public get Sig(): string {
        return this.sig;
    }

    public set Sig(sig: string) {
        this.sig = sig;
    }

    private return_sso_url: string;
    public get Return_sso_url(): string {
        return this.return_sso_url;
    }

    public set Return_sso_url(return_sso_url: string) {
        this.return_sso_url = return_sso_url;
    }
    
    /* private currentZohoDeskCode: string;
    public get CurrentZohoDeskCode(): string {
        return this.currentZohoDeskCode;
    }

    public set CurrentZohoDeskCode(code: string) {
        this.currentZohoDeskCode = code;
    } */

    public UpgradeCleverTrialAccount(activationCode: string, districtID: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(CleverEvent.CLEVER_TRIAL_UPGRADED, successHandler);
        this.ar.addEventListener(CleverEvent.CLEVER_TRIAL_UPGRADE_ERROR, faultHandler);
        this.ar.UpgradeCleverTrialAccount(activationCode, districtID);
    }

    public AdminUpdateOrganizationName(organizationID: number, newOrganizationName: string, isDistrict: boolean, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminEvent.ORGANIZATION_NAME_UPDATED, successHandler);
        this.ar.addEventListener(AdminEvent.ORGANIZATION_NAME_UPDATE_ERROR, faultHandler);
        this.ar.AdminUpdateOrganizationName(organizationID, newOrganizationName, isDistrict);
    }

    public AdminGetGroupLessonPlans(groupId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(GroupLessonPlanEvent.GROUP_LESSON_PLANS_RECEIVED, successHandler);
        this.ar.addEventListener(GroupLessonPlanEvent.GROUP_LESSON_PLANS_ERROR, faultHandler);
        this.ar.AdminGetGroupLessonPlans(groupId);
    }

    public AdminUpdateGroupLessonPlans(groupId: number, lessonPlanIds: number[], successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(GroupLessonPlanEvent.GROUP_LESSON_PLANS_RECEIVED, successHandler);
        this.ar.addEventListener(GroupLessonPlanEvent.GROUP_LESSON_PLANS_ERROR, faultHandler);
        this.ar.AdminUpdateGroupLessonPlans(groupId, lessonPlanIds);
    }

    public AdminGetGroupTypingTests(groupId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(TypingTestEvent.TYPING_TESTS_RECEIVED, successHandler);
        this.ar.addEventListener(TypingTestEvent.TYPING_TEST_ERROR, faultHandler);
        this.ar.AdminGetGroupTypingTests(groupId);
    }

    public AdminGetGroupTypingTasks(groupId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(TypingTaskEvent.TYPING_TASKS_RECEIVED, successHandler);
        this.ar.addEventListener(TypingTaskEvent.TYPING_TASK_ERROR, faultHandler);
        this.ar.AdminGetGroupTypingTasks(groupId);
    }

    public AdminGetGroupTypingTestsFromCache(groupId: number): TypingTest[] {
        return this.ar.AdminGetGroupTypingTestsFromCache(groupId);
    }

    public AdminGetTypingTestResults(typingTestId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(TypingTaskResultEvent.TYPING_TASK_RESULTS_RECEIVED, successHandler);
        this.ar.addEventListener(TypingTaskResultEvent.TYPING_TASK_RESULTS_ERROR, faultHandler);
        this.ar.AdminGetTypingTestResults(typingTestId);
    }

    public AdminGetTypingTaskResults(typingTaskId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(TypingTaskResultEvent.TYPING_TASK_RESULTS_RECEIVED, successHandler);
        this.ar.addEventListener(TypingTaskResultEvent.TYPING_TASK_RESULTS_ERROR, faultHandler);
        this.ar.AdminGetTypingTaskResults(typingTaskId);
    }

    public GetResultByID(testId: number): UserTypingTestResult {
        return this.ar.GetResultByID(testId);
    }

    public GetTaskResultByID(taskId: number): UserTypingTaskResult {
        return this.ar.GetTaskResultByID(taskId);
    }

    public AdminCreateTypingTest(typingTest: TypingTest, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(TypingTestEvent.TYPING_TEST_RECEIVED, successHandler);
        this.ar.addEventListener(TypingTestEvent.TYPING_TEST_ERROR, faultHandler);
        this.ar.AdminCreateTypingTest(typingTest);
    }

    public AdminUpdateTypingTest(typingTest: TypingTest, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void, isBackgroundCall: boolean = false) {
        this.ar.addEventListener(TypingTestEvent.TYPING_TEST_RECEIVED, successHandler);
        this.ar.addEventListener(TypingTestEvent.TYPING_TEST_ERROR, faultHandler);
        this.ar.AdminUpdateTypingTest(typingTest, isBackgroundCall);
    }

    public AdminCreateTypingTask(typingTask: TypingTask, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(TypingTaskEvent.TYPING_TASK_RECEIVED, successHandler);
        this.ar.addEventListener(TypingTaskEvent.TYPING_TASK_ERROR, faultHandler);
        this.ar.AdminCreateTypingTask(typingTask);
    }

    public AdminUpdateTypingTask(typingTask: TypingTask, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(TypingTaskEvent.TYPING_TASK_RECEIVED, successHandler);
        this.ar.addEventListener(TypingTaskEvent.TYPING_TASK_ERROR, faultHandler);
        this.ar.AdminUpdateTypingTask(typingTask);
    }

    public AdminDeleteTypingTest(typingTestId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(TypingTestEvent.TYPING_TEST_DELETED, successHandler);
        this.ar.addEventListener(TypingTestEvent.TYPING_TEST_ERROR, faultHandler);
        this.ar.AdminDeleteTypingTest(typingTestId);
    }

    public AdminDeleteTypingTask(typingTaskId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(TypingTaskEvent.TYPING_TASK_DELETED, successHandler);
        this.ar.addEventListener(TypingTaskEvent.TYPING_TASK_ERROR, faultHandler);
        this.ar.AdminDeleteTypingTask(typingTaskId);
    }

    public StoreUserTypingTestAttempt(testId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(TypingTaskResultEvent.TYPING_TASK_RESULTS_RECEIVED, successHandler);
        this.ar.addEventListener(TypingTaskResultEvent.TYPING_TASK_RESULTS_ERROR, faultHandler);
        this.ar.StoreUserTypingTestAttempt(testId);
    }

    public StoreUserTypingTestResult(testId: number, speed: number, accuracy: number, score: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(TypingTaskResultEvent.TYPING_TASK_RESULTS_RECEIVED, successHandler);
        this.ar.addEventListener(TypingTaskResultEvent.TYPING_TASK_RESULTS_ERROR, faultHandler);
        this.ar.StoreUserTypingTestResult(testId, speed, accuracy, score);
    }

    public StoreUserTypingTaskResult2(testId: number, speed: number, accuracy: number, score: number, errorCount: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(TypingTaskResultEvent.TYPING_TASK_RESULTS_RECEIVED, successHandler);
        this.ar.addEventListener(TypingTaskResultEvent.TYPING_TASK_RESULTS_ERROR, faultHandler);
        this.ar.StoreUserTypingTaskResult2(testId, speed, accuracy, score, errorCount);
    }

    public StoreUserTypingTaskResult3(testId: number, speed: number, accuracy: number, score: number, errorCount: number, textPercentage: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(TypingTaskResultEvent.TYPING_TASK_RESULTS_RECEIVED, successHandler);
        this.ar.addEventListener(TypingTaskResultEvent.TYPING_TASK_RESULTS_ERROR, faultHandler);
        this.ar.StoreUserTypingTaskResult3(testId, speed, accuracy, score, errorCount, textPercentage);
    }

    public AdminGetUserProgressReportData(userId: number, productId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(ProgressObjectEvent.USER_PROGRESS_REPORT_RECEIVED, successHandler);
        this.ar.addEventListener(ProgressObjectEvent.USER_PROGRESS_REPORT_ERROR, faultHandler);
        this.ar.AdminGetUserProgressReportData(userId, productId);
    }

    public get AuthenticationToken(): string {
        return this.ar.AuthenticationToken;
    }

    public get AuthenticationUserID(): number {
        return this.ar.AuthenticationUserID;
    }

    public AdminGoogleClassroomSync(googleToken: string, purchaseId: number, customerId: number, classroomCourseIds: number[], successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(UberApplicationEventTypes.GOOGLE_CLASSROOM_SYNCED, successHandler);
        this.ar.addEventListener(UberApplicationEventTypes.GOOGLE_CLASSROOM_SYNC_FAILED, faultHandler);
        this.ar.AdminGoogleClassroomSync(googleToken, purchaseId, customerId, classroomCourseIds);
    }

    public GetCleverSyncStatus(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminCleverSyncEvent.CLEVER_SYNC_STATUS_UPDATE, successHandler);
        this.ar.addEventListener(AdminCleverSyncEvent.CLEVER_SYNC_STATUS_UPDATE_ERROR, faultHandler);
        this.ar.GetCleverSyncStatus();
    }

    public AdminBulkUpdateGroupLessonPlans(groupIds: number[], lessonPlanIds: number[], successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(GroupLessonPlanEvent.GROUP_LESSON_PLANS_RECEIVED, successHandler);
        this.ar.addEventListener(GroupLessonPlanEvent.GROUP_LESSON_PLANS_ERROR, faultHandler);
        this.ar.AdminBulkUpdateGroupLessonPlans(groupIds,lessonPlanIds);
    }

    public GetEreflectAdminSchoolsList(successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void) {
        this.ar.addEventListener(AdminEvent.ADMIN_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(AdminEvent.ADMIN_DATA_ERROR, faultHandler);
        this.ar.AdminGetSchoolsList();
    }

    /**
     * @param taskName - Description of the task
     * @param taskSuccessFunction - The name of the function in the access remote responsible for handling a successful task
     * @param eventToDispatch - The event that will be dispatched in the taskSuccessFunction
     * @param taskSuccessHandler - The function in the calling class responsible for receiving data from access remote
     * @param serverFunctionName - The name of the function to be called from the server
     * @param serverFunctionParams - An array of parameters needed for the server function to be called
     * @param isBlockingTask - Set to true if you want to display the default blocking loading message, but with a loading progress
     */
    public StartATask(taskName: string, taskSuccessFunction: string, eventToDispatch: string, taskSuccessHandler:(event:UberApplicationEvent) => void, serverFunctionName: string, serverFunctionParams?: any[], isBlockingTask?: boolean): void {
        this.ar.addEventListener(eventToDispatch, taskSuccessHandler);
        this.ar.StartATask(taskName, taskSuccessFunction, serverFunctionName, serverFunctionParams, isBlockingTask);
    }

    public get UserNotifications(): UserNotification[] {
        return this.ar.UserNotifications;
    }

    public get UserTypingTaskResults(): UserTypingTaskResult[] {
        return this.ar.UserTypingTaskResults;
    }

    public get UserProxyTypingTasks(): ProxyTypingTask[] {
        return this.ar.UserProxyTypingTasks;
    }

    /* public GetTypingTaskById(typingTaskId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(TypingTaskEvent.TYPING_TASK_RECEIVED, successHandler);
        this.ar.addEventListener(TypingTaskEvent.TYPING_TASK_ERROR, faultHandler);
        this.ar.GetTypingTaskById(typingTaskId);
    } */

    public GetProxyActivityById(id: number): ProxyActivity {
        return this.ar.GetProxyActivityById(id);
    }

    public GetAllProxyActivities(): ProxyActivity[] {
        return this.ar.GetAllProxyActivities();
    }

    public GetKeyboardCompetency(userId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(CharacterCompetencyEvent.CHARACTER_COMPETENCY_RECEIVED, successHandler);
        this.ar.addEventListener(CharacterCompetencyEvent.CHARACTER_COMPETENCY_ERROR, faultHandler);
        this.ar.GetKeyboardCompetency(userId);
    }

    public StoreReview(surveyReview: SurveyReview, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(SurveyReviewEvent.STORE_REVIEW_SUCCESS, successHandler);
        this.ar.addEventListener(SurveyReviewEvent.STORE_REVIEW_ERROR, faultHandler);
        this.ar.StoreReview(surveyReview);
    }

    public GetLessonPlanInfo(lessonPlanId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(LessonPlanInfoEvent.LESSON_PLAN_INFO_RECEIVED, successHandler);
        this.ar.addEventListener(LessonPlanInfoEvent.LESSON_PLAN_INFO_ERROR, faultHandler);
        this.ar.GetLessonPlanInfo(lessonPlanId);
    }

    public AdminCreateGradingTemplate(gradingTemplate: Grading_Template, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(GradingTemplateEvent.GRADING_TEMPLATE_CREATED, successHandler);
        this.ar.addEventListener(GradingTemplateEvent.GRADING_TEMPLATE_ERROR, faultHandler);
        this.ar.AdminCreateGradingTemplate(gradingTemplate);
    }

    public AdminEditGradingTemplate(gradingTemplate: Grading_Template, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(GradingTemplateEvent.GRADING_TEMPLATE_CREATED, successHandler);
        this.ar.addEventListener(GradingTemplateEvent.GRADING_TEMPLATE_ERROR, faultHandler);
        this.ar.AdminEditGradingTemplate(gradingTemplate);
    }

    public AdminDeleteGradingTemplate(gradingTemplateID: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(GradingTemplateEvent.GRADING_TEMPLATE_DELETED, successHandler);
        this.ar.addEventListener(GradingTemplateEvent.GRADING_TEMPLATE_ERROR, faultHandler);
        this.ar.AdminDeleteGradingTemplate(gradingTemplateID);
    }

    public StoreUserTypingReplayData(replayData: any[], courseActivityId: number, typingTaskId: number): void {
        this.ar.StoreUserTypingReplayData(replayData, courseActivityId, typingTaskId);
    }

    public StoreUserTypingReplayData2(replayData: any[], courseActivityId: number, typingTaskId: number, startingPos: number, speed?: number, accuracy?: number): void {
        this.ar.StoreUserTypingReplayData2(replayData, courseActivityId, typingTaskId, startingPos, speed, accuracy);
    }

    public GetUserTypingReplayData(userId: number, courseActivityId: number, typingTaskId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(ReplayEvent.REPLAY_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(ReplayEvent.REPLAY_DATA_ERROR, faultHandler);
        this.ar.GetUserTypingReplayData(userId, courseActivityId, typingTaskId);
    }

    public GetUserCourseActivityTypingReplay(userId: number, courseActivityId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(ReplayEvent.REPLAY_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(ReplayEvent.REPLAY_DATA_ERROR, faultHandler);
        this.ar.GetUserCourseActivityTypingReplay(userId, courseActivityId);
    }

    public GetUserTypingTaskReplay(userId: number, typingTaskId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(ReplayEvent.REPLAY_DATA_RECEIVED, successHandler);
        this.ar.addEventListener(ReplayEvent.REPLAY_DATA_ERROR, faultHandler);
        this.ar.GetUserTypingTaskReplay(userId, typingTaskId);
    }

    public GetTypesyCourseActivity(courseActivityId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(TypesyCourseActivityEvent.TYPESY_COURSE_ACTIVITY_RECEIVED, successHandler);
        this.ar.addEventListener(TypesyCourseActivityEvent.TYPESY_COURSE_ACTIVITY_ERROR, faultHandler);
        this.ar.GetTypesyCourseActivity(courseActivityId);
    }

    public TypesyGetPublicProfile(userId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(TypesyPublicProfileEvent.TYPESY_PUBLIC_PROFILE_RECEIVED, successHandler);
        this.ar.addEventListener(TypesyPublicProfileEvent.TYPESY_PUBLIC_PROFILE_ERROR, faultHandler);
        this.ar.TypesyGetPublicProfile(userId);
    }

    public AdminGetSubscriptionData(currentSubscriptionId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminSubscriptionEvent.ADMIN_SUBSCRIPTION_RECEIVED, successHandler);
        this.ar.addEventListener(AdminSubscriptionEvent.ADMIN_SUBSCRIPTION_ERROR, faultHandler);
        this.ar.AdminGetSubscriptionData(currentSubscriptionId);
    }

    public AdminUpdateSubscription(currentSubscriptionId: number, purchaseData: PurchaseData, price: number, currency: string, numUsers: number, numYears: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(AdminSubscriptionEvent.ADMIN_SUBSCRIPTION_UPDATED, successHandler);
        this.ar.addEventListener(AdminSubscriptionEvent.ADMIN_SUBSCRIPTION_ERROR, faultHandler);
        this.ar.AdminUpdateSubscription(currentSubscriptionId, purchaseData, price, currency, numUsers, numYears);
    }

    /*public GetDefaultWordlists(productId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(WordlistCategoryEvent.WORDLIST_CATEGORIES_RECEIVED, successHandler);
        this.ar.addEventListener(WordlistCategoryEvent.WORDLIST_CATEGORIES_ERROR, faultHandler);
        this.ar.GetDefaultWordlists(productId);
    }*/

    public GetWordlistDataAsText(wordlistId: number, asVocabText: boolean, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        //this.ar.addEventListener(WordlistEvent.WORDLIST_DATA_RECEIVED, successHandler);
        //this.ar.addEventListener(WordlistEvent.WORDLIST_DATA_ERROR, faultHandler);
        this.ar.addEventListener(UberReaderTextEvent.TEXT_RETREIVED, successHandler);
        this.ar.addEventListener(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, faultHandler);
        this.ar.GetWordlistDataAsText(wordlistId, asVocabText);
    }

    public AdminUploadPurchaseOrder(existingPurchaseId: number, contactEmail: string, base64PurchaseOrder: string, filename: string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(UploadPurchaseOrderEvent.PURCHASE_ORDER_UPLOAD_SUCCESS, successHandler);
        this.ar.addEventListener(UploadPurchaseOrderEvent.PURCHASE_ORDER_UPLOAD_ERROR, faultHandler);
        this.ar.AdminUploadPurchaseOrder(existingPurchaseId, contactEmail, base64PurchaseOrder, filename);
    }

    public GetCategoryCertificateData(courseCategoryId: number, userId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(PrintCertificateEvent.CERTIFICATE_DETAILS_RECEIVED, successHandler);
        this.ar.addEventListener(PrintCertificateEvent.CERTIFICATE_ERROR, faultHandler);
        this.ar.GetCategoryCertificateData(courseCategoryId, userId);
    }

    public get TypesyStatusLevels(): TypesyStatusLevel[]
    {
        return this.ar.TypesyStatusLevels;
    }

    public get UserTypingCompetency(): number {
        return this.ar.UserTypingCompetency != null ? this.ar.UserTypingCompetency.Competency : 1;
    }

    public get UserStatusPoints(): number {
        return this.ar.UserStatusPoints;
    }

    public get PlacementTest(): PlacementTest {
        return this.ar.PlacementTest;
    }

    public StorePlacementTestResults(placementTestID: number, questionAnswers: string, speed?: number, accuracy?: number) {
        this.ar.StorePlacementTestResults(placementTestID, questionAnswers, speed, accuracy);
    }

    public GetUpgradeOffers(platform: string, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(UpgradeOfferEvent.UPGRADE_OFFERS_RECEIVED, successHandler);
        this.ar.addEventListener(UpgradeOfferEvent.UPGRADE_OFFERS_ERROR, faultHandler);
        this.ar.GetUpgradeOffers(platform);
    }

    public AdminRemoveUsersFromGroups(userIds: number[], purchaseId: number, successHandler:(event:UberApplicationEvent) => void, faultHandler:(event:UberApplicationEvent) => void): void {
        this.ar.addEventListener(UserGroupEvent.USERS_REMOVED_FROM_OTHER_GROUPS, successHandler);
        this.ar.addEventListener(UserGroupEvent.USERS_REMOVE_FROM_OTHER_GROUPS_ERROR, faultHandler);
        this.ar.AdminRemoveUsersFromGroups(userIds, purchaseId);
    }
}
