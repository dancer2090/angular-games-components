import { Component, Input, ViewChild, Output, EventEmitter, HostListener, OnDestroy, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { User_Course } from '../../../../../UberReaderData/DataClasses/db/User_Course';
import { Course_Activity } from '../../../../../UberReaderData/DataClasses/db/Course_Activity';
import { ActivityRecommendEvent } from '../../../../../UberReaderData/Events/ActivityRecommendEvent';
import { StatusPointsEvent } from '../../../../../UberReaderData/Events/StatusPointsEvent';
import { UberReader } from '../../../../UberReader';
import { MatDialog } from '@angular/material';
import { NewStatusLevelDialog } from './dialogs/new-status-level-dialog.component';
import { ExternalResourceLoaderService } from '../../../SharedModules/shared-components-module/services/ExternalResourceLoader.service';
import { Subscription } from 'rxjs';
import { UserStatusService } from '../../status-points-control/user-status.service';
import { BuildSettings } from 'app/UberReaderClient/BuildSettings';

@Component({
    selector: 'end-screen',
    styleUrls: ['./end-screen.component.css'],
    template: `
        <div class="page-content-outer">
            <div class="page-content">
                <mdl-card mdl-shadow="2" class="card--end-screen transparency--85">
                    <div id="container--animation">
                        <div id="container--inner-animation">
                            <img src="{{ 'assets/icon/big-star-01.svg' | resourceLoc }}"/>
                        </div>
                    </div>

                    <!-- Congratulatory Message -->
                    <div class="container--labels">
                        <label _ngcontent-c16="" class="mdl-typography--display-2 label--headline label--congrats">{{ endScreenHeader }}</label>
                    </div>

                    <!-- Course Finished Message -->
                    <div *ngIf="courseEndMsg != ''" class="container--labels">
						 <label _ngcontent-c16="" class="mdl-typography--headline mdl-typography--font-medium label--headline label--subheadline1">{{ courseEndMsg }}</label>
                    </div>

                    <!-- Game Finished Message -->
                    <div class="container--labels" [class.hide]="!hasTimeRecord">
						 <label _ngcontent-c16="" class="mdl-typography--headline mdl-typography--font-medium label--headline label--subheadline1">You completed {{ activityName }} in <div #secondsOdometer id="odometer1" class="odometer">0</div>seconds</label>
					</div>

                    <!-- Status Points Earned Message -->
                    <div class="container--labels" [class.hide]="!hasStatPoints || isPublic">
                        <label _ngcontent-c16="" class="mdl-typography--headline mdl-typography--font-medium label--headline label--subheadline1">You earned<div #statPointsOdometer id="odometer2" class="odometer">0</div>Typesy Points!</label>
                    </div>

                    <!-- Speed and Accuracy Message -->
                    <div class="container--labels" [class.hide]="!hasSpeedAndAccuracy">
                        <label _ngcontent-c16="" class="mdl-typography--headline mdl-typography--font-medium label--headline label--subheadline2">Your typing speed is <span><div #speedOdometer id="odometer3" class="odometer">0</div> <span class="sub">wpm</span></span> with accuracy of <span><div #accuracyOdometer id="odometer4" class="odometer">0</div><span class="sub">%</span></span></label>
                    </div>

                    <div *ngIf="!forCourse; else courseBtnGroup" class="container--option-buttons">
                        <!--button class="{{ isPublic ? 'mdl-button mdl-button--raised button--primary button--primary-courseRunnerEnd button--centered' : 'mdl-button mdl-button--raised mdl-js-button button--primary-courseRunnerEnd'}}" (click)="replayActivity()" [class.hide]="activityName == null">{{ "Replay " + activityName | uppercase}}</button>
						<button *ngIf="!isPublic" class="mdl-button mdl-js-button mdl-button--raised button--primary button--primary-courseRunnerEnd" [disabled]="!hasNextActivity" (click)="startNextActivity()">next recommended activity</button-->

                        <button  class="{{ isPublic ? 'button--mat-secondary button--primary-courseRunnerEnd mat-raised-button button--centered' : 'button--mat-secondary mat-raised-button button--primary-courseRunnerEnd'}}" (click)="replayActivity()" [class.hide]="activityName == null">{{ "Replay " + activityName | uppercase}}</button>
						<button  mat-raised-button *ngIf="!isPublic" class="button--primary button--primary-courseRunnerEnd" [disabled]="!hasNextActivity" (click)="startNextActivity()">Next recommended activity</button>
                    </div>
                    <ng-template #courseBtnGroup>
                        <div class="container--option-buttons">
                            <!--button *ngIf="showCourseCompleteBtn" class="mdl-button mdl-js-button button--primary-courseRunnerEnd" (click)="backToCourses()">Back to Courses</button>
                            <button *ngIf="showCourseCompleteBtn && !isLastCourse" class="mdl-button mdl-js-button mdl-button--raised button--primary button--primary-courseRunnerEnd" (click)="handleCourseComplete()">Continue to next course</button-->

                            <button *ngIf="showCourseCompleteBtn" mat-raised-button class="button--mat-secondary button--primary-courseRunnerEnd" (click)="backToCourses()">Back to Courses</button>
                            <button *ngIf="showCourseCompleteBtn && !isLastCourse" mat-raised-button  class="button--primary button--primary-courseRunnerEnd" (click)="handleCourseComplete()">Continue to next course</button>
                        </div>
                    </ng-template>
                </mdl-card><!--activity-card-->

                <!--<div class="end-screen-container">
                    <div class="icon-container">
                        <mdl-icon class="end-screen-icon">star</mdl-icon>
                    </div>
                    <p class="mdl-typography--display-3 mdl-color-text--grey-600 display-3-small">{{ endScreenHeader }}</p>
                    <label #bodyText class="mdl-typography--headline mdl-typography--font-medium mdl-color-text--grey-600 headline-small"></label>
                    <div *ngIf="!forCourse; else courseBtnGroup">
                        <button *ngIf="!isPublic" mdl-button mdl-button-type="raised" mdl-colored="accent" mdl-ripple class="button--primary button--primary-courseRunnerEnd button--centered"
                            [disabled]="!hasNextActivity" (click)="startNextActivity()">Next Recommended Activity</button>
                        <button class="{{ isPublic ? 'button--primary button--primary-courseRunnerEnd button--centered' : 'grey-btn replay-button'}}" mdl-button (click)="replayActivity()" [class.hide]="activityName == null">
                            {{ "Replay " + activityName | uppercase}}
                        </button>
                    </div>
                    <ng-template #courseBtnGroup>
                        <button class="button--primary-courseRunnerEnd button--centered mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                                *ngIf="showCourseCompleteBtn" (click)="backToCourses()">Back to courses</button>
                        <button style="margin-top:0px;" class="button--primary button--primary-courseRunnerEnd button--centered mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                                *ngIf="showCourseCompleteBtn && !isLastCourse" (click)="handleCourseComplete()">{{ courseCompleteBtnLabel }}</button>
                    </ng-template>
                </div>-->
        </div>
        <audio #success>
            <source src="{{'assets/audio/success.wav' | resourceLoc}}" type="audio/mpeg">
            Your browser does not support the audio tag.
        </audio>
    `,
    providers: [UserStatusService]
})
export class EndScreen implements OnDestroy{
    @Output() recommendedActivity = new EventEmitter();
    @Output() runActivityAgain = new EventEmitter();
    @Output() nextCourse = new EventEmitter();
    @Output() continueToNextStep = new EventEmitter();
    @Input() activityName:string = "";
    //@ViewChild('bodyText', { static: true }) bodyText:any;
    @ViewChild('statPointsOdometer', { static: true }) statPointsOdometer: ElementRef;
    @ViewChild('speedOdometer', { static: true }) speedOdometer: ElementRef;
    @ViewChild('accuracyOdometer', { static: true }) accuracyOdometer: ElementRef;
    @ViewChild('secondsOdometer', { static: true }) secondsOdometer: ElementRef;
    @ViewChild('success', { static: true }) success:any;

    private model:UberApplication;
    private nextRecommendedActivity:number = 0;
    private userCourse:User_Course;
    private endScreenVisible:boolean = false;
    private odometerLoader: Subscription;

    public hasNextActivity:boolean = false;
    public endScreenHeader:string = "";
    public forCourse:boolean = false;
    public isPublic: boolean = false;
    public showCourseCompleteBtn:boolean = false;
    public courseCompleteBtnLabel:string = "";
    public isLastCourse: boolean = false;
    public hasSpeedAndAccuracy: boolean = false;
    public hasTimeRecord: boolean = false;
    public hasStatPoints: boolean = false;
    public courseEndMsg: string = "";

    constructor(private router: Router, public matDialog: MatDialog, private externalResourceLoader: ExternalResourceLoaderService, private userStatusService: UserStatusService) {
        this.model = UberApplication.GetInstance();
        this.odometerLoader = this.externalResourceLoader.LoadOdometerFiles().subscribe(() => {});
    }

    public InitByCourse(userCourse:User_Course, statusPoints:number, state:string, is_last:boolean):void {
        console.log("InitByCourse ", statusPoints);
        setTimeout(() => this.endScreenVisible = true, 100);
        this.success.nativeElement.play();
        this.forCourse = true;
        this.userCourse = userCourse;
        this.showCourseCompleteBtn = true;
        this.isLastCourse = is_last;
        this.courseCompleteBtnLabel = is_last ? "Back to course selection" : "Continue to next course";
        this.endScreenHeader = this.model.GetUiTextByKey("END_SCREEN_HEADER_GREAT");
        this.endScreenHeader = this.endScreenHeader.replace("{0}", this.model.CurrentUserData.DisplayName);

        let courseName:string = userCourse.course.Course_name.replace("[display_name]", this.model.CurrentUserData.DisplayName);
        let message1:string = this.model.GetUiTextByKey("END_SCREEN_COURSE_COMPLETE_TEXT").replace("{0}", courseName);
        this.courseEndMsg = message1;
        let message2:string = "";

        if(statusPoints > 0) {
            message2 = statusPoints > 1 ? this.model.GetUiTextByKey("END_SCREEN_SCORE_NOPERC_TEXT_PLURAL") : this.model.GetUiTextByKey("END_SCREEN_SCORE_NOPERC_TEXT_SINGULAR");
            message2 = message2.replace("{1}", statusPoints.toString());
            setTimeout(() => {
                //this.model.AddStatusPoints(statusPoints, this.pointsAddedSuccessful, this.pointsAddedFailed);
                this.model.AddStatusPoints2(statusPoints, this.pointsAddedSuccessful, this.pointsAddedFailed);
            }, 1000);
        }
        else {
            setTimeout(() => {
                //this.model.GetTotalStatusPoints(this.pointsAddedSuccessful, this.pointsAddedFailed);
                this.model.GetUserStatusPoints(this.pointsAddedSuccessful, this.pointsAddedFailed);
            }, 1000);
        }

        this.setResults(statusPoints);
        //this.bodyText.nativeElement.innerHTML = message1 + "<br>" + message2;
    }

    public InitAsPublic(activity:Course_Activity, resultObj:any) { // initialization for public display of activity - used in nearpod integration
        this.success.nativeElement.play();
        let statusPoints:number = resultObj ? resultObj.status_points : 0;

        UberReader.GetInstance().titleHeader += " Complete";
        this.endScreenHeader = "Great Work!";
        this.isPublic = true;

        let message1:string = "";
        if(statusPoints > 0) {
            message1 = statusPoints > 1 ? this.model.GetUiTextByKey("END_SCREEN_SCORE_NOPERC_TEXT_PLURAL") : this.model.GetUiTextByKey("END_SCREEN_SCORE_NOPERC_TEXT_SINGULAR");
            message1 = message1.replace("{1}", statusPoints.toString());
        }

        let message2:string = "";
        if(resultObj && resultObj.howFast != null && resultObj.howWell != null && resultObj.howFast != -1 && resultObj.howWell != -1) {
            message2 = "Your typing speed is " + resultObj.howFast + " wpm with accuracy of " + resultObj.howWell + "%";
            this.setResults(statusPoints, resultObj.howFast, resultObj.howWell);
        }

        //this.bodyText.nativeElement.innerHTML = /* message1 + "<br>" +  */message2;
    }

    public InitByCourseActivity(activity:Course_Activity, resultObj:any):void {
        console.log("InitByCourseActivity ", resultObj);

        setTimeout(() => this.endScreenVisible = true, 100);
        this.success.nativeElement.play();
        let statusPoints:number = resultObj ? resultObj.status_points : 0;
        UberReader.GetInstance().titleHeader += " Complete";
        this.forCourse = true;
        this.showCourseCompleteBtn = false;

        //original scoring ranges: 0-20, 21-25, 26-34, 35+
        if(statusPoints <= 20 ) {
            //this.endScreenHeader = this.model.GetUiTextByKey("END_SCREEN_HEADER_COMPLETE").replace("{0}", this.activityName);
            this.endScreenHeader = "You are getting there {0}, keep practicing."
        }
        else if(statusPoints <= 25) {
            this.endScreenHeader = this.model.GetUiTextByKey("END_SCREEN_HEADER_IMPROVING");
        }
        else if(statusPoints < 35) {
            this.endScreenHeader = this.model.GetUiTextByKey("END_SCREEN_HEADER_GREAT");
        }
        else if(statusPoints >= 35) {
            this.endScreenHeader = this.model.GetUiTextByKey("END_SCREEN_HEADER_AMAZING");
        }
        this.endScreenHeader = this.endScreenHeader.replace("{0}", this.model.CurrentUserData.DisplayName);

        let message1:string = ""; //this.model.GetUiTextByKey("END_SCREEN_COURSE_ACTIVITY_TEXT").replace("{0}", activity.Intro_title);
        if(statusPoints > 0) {
            message1 = statusPoints > 1 ? this.model.GetUiTextByKey("END_SCREEN_SCORE_NOPERC_TEXT_PLURAL") : this.model.GetUiTextByKey("END_SCREEN_SCORE_NOPERC_TEXT_SINGULAR");
            message1 = message1.replace("{1}", statusPoints.toString());
            setTimeout(() => {
                //this.model.AddStatusPoints(statusPoints, this.pointsAddedSuccessful, this.pointsAddedFailed);
                this.model.AddStatusPoints2(statusPoints, this.pointsAddedSuccessful, this.pointsAddedFailed);
            }, 1000);
        }
        else {
            //message1 = this.model.GetUiTextByKey("END_SCREEN_SCORE_NOPERC_TEXT_SINGULAR");
            //message1 = message1.replace("{1}", "0");
            setTimeout(() => {
                //this.model.GetTotalStatusPoints(this.pointsAddedSuccessful, this.pointsAddedFailed);
                this.model.GetUserStatusPoints(this.pointsAddedSuccessful, this.pointsAddedFailed);
            }, 1000);
        }

        //WPM and ACCURACY
        let message2:string = "";
        if(resultObj && resultObj.howFast != null && resultObj.howWell != null && resultObj.howFast != -1 && resultObj.howWell != -1) {
            message2 = "Your typing speed is " + resultObj.howFast + " wpm with accuracy of " + resultObj.howWell + "%";
        }

        this.setResults(statusPoints, resultObj.howFast, resultObj.howWell);
        //this.bodyText.nativeElement.innerHTML = message1.replace("[display_name]", this.model.CurrentUserData.DisplayName) + "<br>" + message2;
    }

    public InitByActivity(resultObj:any, endTime:number=0, nextRecommendedActivityId:number=0):void {
        setTimeout(() => this.endScreenVisible = true, 100);
        this.success.nativeElement.play();
        UberReader.GetInstance().titleHeader += " Complete";
        this.forCourse = false;
        let sp:number = resultObj.status_points;
        let isPercent:boolean = resultObj.status_percent != null;
        this.hasNextActivity = nextRecommendedActivityId > 0;
        this.nextRecommendedActivity = nextRecommendedActivityId;

        //Congratulations message
        //original scoring ranges: 0-20, 21-25, 26-34, 35+
        if(sp <= 20 ) {
            //this.endScreenHeader = this.model.GetUiTextByKey("END_SCREEN_HEADER_COMPLETE").replace("{0}", this.activityName);
            this.endScreenHeader = "You are getting there {0}, keep practicing."
        }
        else if(sp <= 25) {
            this.endScreenHeader = this.model.GetUiTextByKey("END_SCREEN_HEADER_IMPROVING")
        }
        else if(sp < 35) {
            this.endScreenHeader = this.model.GetUiTextByKey("END_SCREEN_HEADER_GREAT");
        }
        else if(sp >= 35) {
            this.endScreenHeader = this.model.GetUiTextByKey("END_SCREEN_HEADER_AMAZING");
        }
        this.endScreenHeader = this.endScreenHeader.replace("{0}", this.model.CurrentUserData.DisplayName);

        //Total time activity was completed
        let timeString:string = "";
        let totalTime:number = endTime > 0 ? endTime : 1;
        let message1:string = this.model.GetUiTextByKey("END_SCREEN_SCORE_COMPLETE_TEXT").replace("{0}", this.activityName);

        if(totalTime >= 60) {
            timeString += Math.trunc(totalTime / 60) + ( Math.trunc(totalTime / 60) > 1 ? " " + this.model.GetUiTextByKey("LBL_MINUTES") : " " + this.model.GetUiTextByKey("LBL_MINUTE") );
        }

        if(totalTime % 60 > 0) {
            timeString += timeString.length > 0 ? " " : "";
            timeString += Math.trunc(totalTime % 60) + ( totalTime % 60 > 1 ? " " + this.model.GetUiTextByKey("LBL_SECONDS") : " " + this.model.GetUiTextByKey("LBL_SECOND") );
        }
        message1 = message1.replace("{1}", timeString).replace("{2}", this.model.CurrentUserData.DisplayName) + "<br>";

        //Points earned
        let message2:string = "";

        if(isPercent) {
            message2 = sp > 1 ? this.model.GetUiTextByKey("END_SCREEN_SCORE_PERC_TEXT_PLURAL") : this.model.GetUiTextByKey("END_SCREEN_SCORE_PERC_TEXT_SINGULAR");
            message2 = message2.replace("{0}", sp + "%");
        }
        else {
            message2 = sp > 1 ? this.model.GetUiTextByKey("END_SCREEN_SCORE_NOPERC_TEXT_PLURAL") : this.model.GetUiTextByKey("END_SCREEN_SCORE_NOPERC_TEXT_SINGULAR");
        }
        message2 = message2.replace("{1}", sp.toString()).replace("{2}", this.model.CurrentUserData.DisplayName) + "<br>";

        //WPM and ACCURACY
        let message3:string = "";
        if(resultObj.howFast && resultObj.howWell) {
            message1 = "";
            message3 = "Your typing speed is " + resultObj.howFast + " wpm with accuracy of " + resultObj.howWell + "%";
            this.setResults(sp, resultObj.howFast, resultObj.howWell);
        }
        else {
            this.setResults(sp, resultObj.howFast, resultObj.howWell, totalTime);
        }
        //this.bodyText.nativeElement.innerHTML = message1 + message2 + message3;

        if(nextRecommendedActivityId == 0) {
            //this.model.GetNextRecommendedActivity(resultObj.ActivityId, this.recommendedActivityReceived, this.recommendedActivityFailed);
            this.nextRecommendedActivity = this.model.GetNextRecommendedActivity(resultObj.ActivityId);
            this.hasNextActivity = this.nextRecommendedActivity > 0;
        }

        setTimeout(() => {
            //this.model.AddStatusPoints(resultObj.status_points, this.pointsAddedSuccessful, this.pointsAddedFailed);
            this.model.AddStatusPoints2(resultObj.status_points, this.pointsAddedSuccessful, this.pointsAddedFailed);
        }, 1000);

        //TO DO !!! ADD KEYBOARD EVENT: ACCEPT ENTER callLater(addEnterEvent);
    }

    private recommendedActivityReceived = (event:ActivityRecommendEvent) => {
        event.target.removeEventListener(ActivityRecommendEvent.ACTVITY_RECOMMEND_RECEIVED, this.recommendedActivityReceived);
        event.target.removeEventListener(ActivityRecommendEvent.ACTVITY_RECOMMEND_FAILED, this.recommendedActivityFailed);
        this.nextRecommendedActivity = event.ActivityId;
        this.hasNextActivity = this.nextRecommendedActivity > 0;
    }

    private recommendedActivityFailed = (event:ActivityRecommendEvent)=> {
        event.target.removeEventListener(ActivityRecommendEvent.ACTVITY_RECOMMEND_RECEIVED, this.recommendedActivityReceived);
        event.target.removeEventListener(ActivityRecommendEvent.ACTVITY_RECOMMEND_FAILED, this.recommendedActivityFailed);
        this.hasNextActivity = false;
    }

    private pointsAddedSuccessful = (event:StatusPointsEvent) => {
        if(event) {
            event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_ADDED, this.pointsAddedSuccessful);
            event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_ADD_ERROR, this.pointsAddedFailed);
            event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVED, this.pointsAddedSuccessful);
            event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVE_ERROR, this.pointsAddedFailed);
        }

        console.log("pointsAddedSuccessful ", event);
        let userStatusData: any = this.userStatusService.update();
        if (userStatusData.newFeatures) { //|| BuildSettings.isLocalBuild) {
            let newStatLevelDialog = this.matDialog.open(NewStatusLevelDialog, {
                data: userStatusData,
                width: '1100px',
                panelClass: 'status-level-increase-dialog'
            });

            if (!this.showCourseCompleteBtn) {
                newStatLevelDialog.afterClosed().subscribe( () => {
                    this.continueToNextStep.emit();
                });
            }
        }
        else if (!this.showCourseCompleteBtn) {
            this.continueToNextStep.emit();
        }
        //TO DO !!! UberReaderAccessor.GetUberReader().CheckForRatingNag();
    }

    private pointsAddedFailed = (event:StatusPointsEvent) => {
        if(event) {
            event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_ADDED, this.pointsAddedSuccessful);
            event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_ADD_ERROR, this.pointsAddedFailed);
            event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVED, this.pointsAddedSuccessful);
            event.target.removeEventListener(StatusPointsEvent.STATUS_POINTS_RECEIVE_ERROR, this.pointsAddedFailed);
        }
        this.continueToNextStep.emit();
        //TO DO !!! something - show sorry message
    }

    public startNextActivity():void {
        this.endScreenVisible = false;
        this.recommendedActivity.emit(this.nextRecommendedActivity);
    }

    public replayActivity():void {
        this.endScreenVisible = false;
        this.runActivityAgain.emit();
    }

    public backToCourses(): void {
        this.endScreenVisible = false;
        this.router.navigate(['/courses', this.model.CurrentLessonPlan.Name.toLowerCase().replace(new RegExp(" ", "ig"), "-")]);
    }

    public handleCourseComplete():void {
        this.endScreenVisible = false;
        if(this.courseCompleteBtnLabel.indexOf("Continue") != -1) {
            this.courseEndMsg = "";
            this.nextCourse.emit(this.userCourse);
        }
        else {
            this.router.navigate(['/courses', this.model.CurrentLessonPlan.Name.toLowerCase().replace(new RegExp(" ", "ig"), "-")]);
        }
    }

    public Reset(): void {
        setTimeout(() => {
            this.statPointsOdometer.nativeElement.innerHTML = 0;
            this.speedOdometer.nativeElement.innerHTML = 0;
            this.accuracyOdometer.nativeElement.innerHTML = 0;
            this.secondsOdometer.nativeElement.innerHTML = 0;
        }, 2000);
    }

    private setResults(statPoints: number, speed?: number, accuracy?: number, seconds?: number) {
        if (statPoints > 0) {
            this.hasStatPoints = true;
        }
        else {
            this.hasStatPoints = false;
        }

        if (speed != null && accuracy != null) {
            this.hasSpeedAndAccuracy = true;
        }
        else {
            this.hasSpeedAndAccuracy = false;
        }

        if (seconds != null) {
            this.hasTimeRecord = true;
        }
        else {
            this.hasTimeRecord = false;
        }

        setTimeout(() => {
            this.statPointsOdometer.nativeElement.innerHTML = statPoints;
            if (speed != null) this.speedOdometer.nativeElement.innerHTML = speed;
            if (accuracy != null) this.accuracyOdometer.nativeElement.innerHTML = accuracy;
            if (seconds != null) this.secondsOdometer.nativeElement.innerHTML = seconds;
            let resultScreenContainer: HTMLElement = document.getElementsByClassName('card--end-screen')[1] as HTMLElement;
            if (resultScreenContainer) { resultScreenContainer.click(); }
        }, 2500);
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if(event.keyCode == 13 && this.endScreenVisible) {
            this.endScreenVisible = false;
            event.preventDefault();
            if(this.forCourse) {
                if(this.courseCompleteBtnLabel.indexOf("Continue") != -1 && this.showCourseCompleteBtn) {
                    this.nextCourse.emit(this.userCourse);
                    this.courseEndMsg = "";
                }
            }
            else {
                this.recommendedActivity.emit(this.nextRecommendedActivity);
            }
        }
    }

    ngOnDestroy() {
        this.endScreenVisible = false;
        if (this.odometerLoader) this.odometerLoader.unsubscribe();
    }
}
