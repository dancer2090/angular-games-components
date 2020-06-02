import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserStatusService } from 'app/UberReaderClient/UberReaderComponents/Controls/status-points-control/user-status.service';
import { UberApplication } from 'app/UberReaderData/UberApplication';
import { UserProgressedEvent } from 'app/UberReaderData/Events/UserProgressedEvent';
import { ProxyCourse } from 'app/UberReaderData/DataClasses/other/ProxyCourse';
import { ProxyActivity } from 'app/UberReaderData/DataClasses/other/ProxyActivity';
import { TypesyStatusLevel } from 'app/UberReaderData/DataClasses/db/Typesy_Status_Level';
import { BuildSettings } from 'app/UberReaderClient/BuildSettings';
import { User_Course } from 'app/UberReaderData/DataClasses/db/User_Course';
import { ClosePopUpEvent } from 'app/UberReaderData/Events/ClosePopUpEvent';

@Component({
    selector: 'tile-item',
    styleUrls: ['./tile-item.component.css'],
    template: `
        <div #courseTile class="mdl-cell mdl-cell-2-col course-col" [class.disabled]="disabled"> <!--(mouseleave)="displayHoverGroup(false)">-->
            <mdl-card mdl-shadow="2" class="course-tile">
                <mdl-card-title mdl-card-expand class="course-image" [mdl-tooltip-large]="lvlTooltip"> <!--[mdl-tooltip-large]="ttDesc">-->
                    
                    <div class="card--button-wrap">
                        <div class="card--info-container" *ngIf="isCourse">
                            <div *ngIf="item.Num_video_lessons && item.Num_video_lessons != 0"><mdl-icon>play_circle_filled</mdl-icon>{{item.Num_video_lessons == 1 ? '1 Video Lesson' : item.Num_video_lessons + ' Video Lessons' }}</div>
                            <div *ngIf="item.Num_audio_lessons && item.Num_audio_lessons != 0"><mdl-icon>volume_down</mdl-icon>{{item.Num_audio_lessons == 1 ? '1 Audio Lesson' : item.Num_audio_lessons + ' Audio Lessons' }}</div>
                            <div *ngIf="item.Num_text_exercises && item.Num_text_exercises != 0"><mdl-icon>keyboard</mdl-icon>{{item.Num_text_exercises == 1 ? '1 Typing Drill' : item.Num_text_exercises + ' Typing Drills' }}</div>
                            <div *ngIf="item.Num_games && item.Num_games != 0"><mdl-icon>videogame_asset</mdl-icon>{{item.Num_games == 1 ? '1 Typing Game' : item.Num_games + ' Typing Games'}}</div>
                        </div>
                            
                        <div class="card--button-container" [class.hide]="!displayHoverDiv" [class.play-screen]="!isCourse">
                            <!-- <button #startButton (click)="start()" [class.hide]="disabled" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored="accent" class="button--primary button--primary-tile" [class.start-margin]="startButtonLbl == 'Start' || startButtonLbl == 'Play'">
                            {{ startButtonLbl }}
                            </button>
                            <button #clearButton *ngIf="displayClearBtn" (click)="clearCourse()" mdl-button class="flat-tile-button">
                                Clear
                            </button> -->
                            <button #startButton (click)="start()" [class.hide]="disabled" mat-raised-button class="button--primary" [class.start-margin]="startButtonLbl == 'Start' || startButtonLbl == 'Play'">
                            {{ startButtonLbl }}
                            </button>
                            <button #clearButton *ngIf="displayClearBtn" (click)="clearCourse()" mat-button class="button--mat-secondary flat-tile-button">
                                Clear
                            </button>
                        </div>
  					</div>
                
                    <img class="lock-img" *ngIf="!trialEnabled || disableSkippingCourses || disabled" src="{{ lockImg | resourceLoc }}">
                    <!-- <img #tileImage class="course-tile-img" [src]="tileIcon" (error)="tileImage.style.display = 'none'"> -->

                    <!-- <img #tileImage *ngIf="displayImage" class="course-tile-img" [src]="tileIconSrc" (error)="tileImageError()"> -->
                    <!-- <img #tileImage class="course-tile-img" [src]="(tileIconLocal | saferesourceurl) | default:tileIcon" (error)="tileImage.style.display = 'none'"> -->
                    <!-- <img #tileImage class="course-tile-img" [src]="(tileIconName | localResourceAsync:iconType) | async" (error)="tileImage.style.display = 'none'"> -->
                    <img imageLazyLoad #tileImage class="course-tile-img" [src]="(tileIconName | localResourceAsync:iconType) | async" (error)="tileImage.style.display = 'none'">
                </mdl-card-title>

                <mdl-card-supporting-text class="supporting-text-2">
                    <p class="mdl-typography--subhead mdl-typography--font-bold course-title">{{ tileName }}</p>
                    <p class="mdl-typography--subhead course-description" [class.hide]="tileDescription.length == 0">{{ tileDescription }}</p>

                       <mdl-card-actions>
                       <!--<div [class.card-buttons]="!displayHoverDiv">
                                <button #startButton (click)="start()" [class.hide]="disabled" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored="accent" class="button--primary button--primary-tile" [class.start-margin]="startButtonLbl == 'Start' || startButtonLbl == 'Play'">
                                    {{ startButtonLbl }}
                                </button>
                                <button #clearButton *ngIf="displayClearBtn" (click)="clearCourse()" mdl-button class="flat-tile-button">
                                    Clear
                                </button>
                            </div>-->
                    
                            <div class="progress-container-2 hide" *ngIf="percentFinished == 100 && item.Track_progress">
                                <mdl-icon class="check-mark">check_circle</mdl-icon>
                            </div>

                            <mdl-progress *ngIf="displayCourseProgress" [progress]="percentFinished"></mdl-progress>
                            <p *ngIf="displayCourseProgress" class="mdl-typography--subhead progress-description">{{ progressDescription }}</p>
                        </mdl-card-actions>
                </mdl-card-supporting-text>    
            </mdl-card>

            <!--<div class="courseProgress" *ngIf="displayCourseProgress">
                <round-progress-bar class="hide" #courseProgress size="50" [displayProgressLabel]="false"></round-progress-bar>
                <div #donutChart id="donutChart" class="hide"></div>
                <circular-progressbar class="hide" #courseProgress size="65" thickness="5" backgroundColor="#CCCCCC" fillColor="#34AD07" ></circular-progressbar>
                <span class="percentage-label">{{ percentFinished }}%</span>
            </div>-->
        </div>

        <!--<div id="mainContainer" #courseTile (mouseleave)="displayHoverGroup(false)">
            <div id="upperContainer">
                <img #tileImage [src]="tileIcon" (error)="tileImage.style.display = 'none'">
                <div id="hoverGroup" *ngIf="displayHoverDiv">
                    <button #startButton (click)="start()">{{ startButtonLbl }}</button>
                    <button #clearButton *ngIf="displayClearBtn" (click)="clearCourse()">Clear</button>
                </div>
            </div>
            <div id="lowerContainer">
                <label id="tileLabel" >{{ tileName }}</label>
                <div class="courseProgress" *ngIf="displayCourseProgress">
                    <round-progress-bar #courseProgress size="60" [displayProgressLabel]="false"></round-progress-bar>
                    <label>{{ percentFinished }}%</label>
                </div>
                <img class="courseProgress" src="{{ 'assets/icon/checkmark_32.png' | resourceLoc }}" *ngIf="percentFinished == 100 && item.Track_progress">
            </div>
        </div>
        <mdl-tooltip #ttDesc="mdlTooltip" [class.hide]="tileDescription.length == 0">{{ tileDescription }}</mdl-tooltip>-->
        <mdl-tooltip #lvlTooltip="mdlTooltip" [class.hide]="levelTooltip.length == 0">{{ levelTooltip }}</mdl-tooltip>
        
    `,
    providers: [UserStatusService]
})
export class TileItem implements OnInit {
    @Input('item') item:any;
    @Output() startEmitter = new EventEmitter();
    @Output() blockCourse = new EventEmitter();
    @Output() skipCourse = new EventEmitter();
    @ViewChild('courseTile', { static: true }) courseTile:any;
    ////@ViewChild('courseProgress') courseProgress:CircularProgressbar;
    //@ViewChild('courseProgress') courseProgress:RoundProgressBar;
    //@ViewChild('donutChart') donutChart: ElementRef;

    public trialEnabled: boolean = true;
    public displayImage = true;
    public tileIconName:string = null;
    public iconType: string = null;
    //public tileIconLocal: string = null;
    //public tileIcon: string = null;
    //public tileIconSrc: string = null;

    public displayHoverDiv: boolean = false;
    public tileName: string = "";
    public startButtonLbl: string;
    public displayClearBtn: boolean = false;
    public percentFinished: number = 0;
    public displayCourseProgress: boolean = false;
    public disableSkippingCourses: boolean = false;
    public tileDescription: string = "";
    public progressDescription: string = "";
    public disabled: boolean = false;
    public lockImg: string = 'assets/icon/lock.svg';
    public levelTooltip: string = "";
    public isCourse: boolean = false;

    private model: UberApplication;
    private locked: boolean = true;

    constructor(private userStatusService: UserStatusService) {
        this.model = UberApplication.GetInstance();
        this.model.addEventListener(UserProgressedEvent.USER_NAVIGATE_TO_COURSE, this.clearCourseProgress);      
    }

    ngOnInit() {
        if(this.item instanceof ProxyCourse) {
            this.isCourse = true;
            this.tileName = this.item.Course_name;

            this.tileIconName = this.item.Course_id + ".svg";
            this.iconType = "courseIcon";

            this.trialEnabled = !this.model.CurrentUser.Is_trial || (this.model.IsTrialCourseEnabled(this.item.Course_id) || this.model.IfTrialCourseStep1Locked(this.item.Course_id));
            console.log('TRIAL TRIAL TRIAL?? ', this.item.Course_id, this.model.CurrentUser.Is_trial, this.model.IsTrialCourseEnabled(this.item.Course_id), this.model.IfTrialCourseStep1Locked(this.item.Course_id));
            console.log('this.trialEnabled:: ', this.item.Course_id, this.trialEnabled, this.disableSkippingCourses, this.disabled);
            this.percentFinished = Math.trunc(this.model.UserCoursePercent(this.item));
            this.displayCourseProgress = this.percentFinished > 0 && this.item.Track_progress;
            this.tileDescription = this.item.CourseDescription != null ? this.item.CourseDescription : "";            
            let usercourse = this.model.GetUserCourseByID(this.item.Course_id);

            setTimeout(() => {
                if(this.displayCourseProgress) {
                    //this.courseProgress.backgroundColor = "#CCCCCC";//"#C7DBED";
                    //this.courseProgress.fillColor = "#34AD07";//"#88BBEA";
                    ////this.courseProgress.progress(this.percentFinished);
                    //this.courseProgress.value = this.percentFinished;
                    //this.courseProgress.useLabel(false, false);
                    
                    this.progressDescription = usercourse.Sequence_upto + ' of ' + this.item.Course_length + ' completed';
                    this.progressDescription = this.percentFinished == 100 ? 'Completed' : this.progressDescription;
                    
                    //this.model.drawProgressChart(this.donutChart, this.percentFinished, usercourse.Sequence_upto, this.item.Course_length);
                }   
            }, 200); 
                   
            this.isTrialLocked();
        }
        else if(this.item instanceof ProxyActivity) {
            this.tileName = this.item.Activity_name;            
            this.tileIconName = this.item.Activity_id + ".svg";
            this.iconType = "activityIcon";

            this.trialEnabled = !this.model.CurrentUser.Is_trial || this.model.IsTrialActivityEnabled(this.item.Activity_id);
            //this.disabled = this.model.UserCurrentStatusLevel.Name != "Diamond" && this.model.UserCurrentStatusLevel.AvailableActivityIDs.indexOf(this.item.Activity_id.toString()) == -1;

            let userStatusData: any = this.userStatusService.update();
            this.disabled = userStatusData.currentLevel.Name != "Diamond" && userStatusData.currentLevel.AvailableActivityIDs.indexOf(this.item.Activity_id.toString()) == -1;
            
            if (this.disabled) {
                let statusLevels: TypesyStatusLevel[] = this.model.TypesyStatusLevels;
                let levelFound: boolean = false;
                for (let level of statusLevels) {
                    if (level.AvailableActivityIDs.indexOf(this.item.Activity_id.toString()) != -1) {
                        levelFound = true;
                        this.lockImg = "assets/icon/lock-" + level.Name.toLowerCase() + ".svg";
                        this.levelTooltip = "You need to reach "  + level.Name + " level to unlock this game."
                        break;
                    }
                }
                if (!levelFound) {
                    this.lockImg = "assets/icon/lock-diamond.svg";
                    this.levelTooltip = "You need to reach Diamond level to unlock this game."
                }
            }
            //this.courseTile.nativeElement.addEventListener("mouseover", this.displayHoverGroup);
            //this.courseTile.nativeElement.addEventListener("mouseleave", this.hideHoverDiv);
            this.displayHoverGroup();
        }
    }

    // if local image failed to laod, then load from server
    // public tileImageError()
    // {
    //     if (this.tileIconSrc != this.tileIcon)
    //     {
    //         this.tileIconSrc = this.tileIcon;
    //     }
    //     else
    //     {
    //         this.displayImage = false;
    //     }
    // }    
    
    public isTrialLocked():void {
        if(this.trialEnabled) {
            if(this.item instanceof ProxyCourse) {    
                this.courseTile.nativeElement.removeEventListener("click", this.displayHoverGroup);
                this.courseTile.nativeElement.removeEventListener("mouseover", this.displayHoverGroup);
                this.courseTile.nativeElement.removeEventListener("mouseleave", this.hideHoverDiv);
    
                if(this.locked) {                
                    this.courseTile.nativeElement.addEventListener("click", this.displayHoverGroup);
                }
                else {
                    this.displayHoverGroup();
                }
            }
        }
        else {
            this.courseTile.nativeElement.addEventListener("mouseover", this.displayHoverGroup);
            this.courseTile.nativeElement.addEventListener("mouseleave", this.hideHoverDiv);
        }
    }

    /*private isLocked():void {
        if(this.item instanceof ProxyCourse) {
            if(this.locked) {                
                this.courseTile.nativeElement.removeEventListener("mouseover", this.displayHoverGroup);
                this.courseTile.nativeElement.addEventListener("click", this.displayHoverGroup);
            }
            else {
                this.courseTile.nativeElement.addEventListener("mouseover", this.displayHoverGroup);
                this.courseTile.nativeElement.removeEventListener("click", this.displayHoverGroup);
            }
        }
    }*/

    public set LockTile(lock:boolean) {
        this.locked = lock; 
        if (this.locked) {
            let lock_courses = this.model.GetUserPref("lock_courses");
            if (lock_courses == "" && this.model.CurrentUser.IsEduUser) {
                this.disableSkippingCourses = true;
            }
            else {
                this.disableSkippingCourses = this.model.GetUserPref("lock_courses").toLowerCase() == "true"; //? true : false;
            }
        }
        this.isTrialLocked();
    }

    public displayHoverGroup = () => {
        //if(this.displayHoverDiv != display) {
            //this.displayHoverDiv = display;
            if(this.item != null) {
                //show the upgrade button only
                if(!this.trialEnabled) {
                    this.startButtonLbl = "Upgrade";
                    this.displayClearBtn = false;
                    this.displayHoverDiv = true;
                    return;
                }

                if(this.item instanceof ProxyCourse) {
                    //do not show buttons if locked
                    if(this.locked) {
                        this.displayHoverDiv = false;
                        if(this.disableSkippingCourses && !BuildSettings.isLocalBuild) {
                            this.blockCourse.emit(this.item);
                        }
                        else {
                            this.skipCourse.emit(this.item);
                        }
                        return;
                    }

                    let percentComplete:number = 0;
                    percentComplete = this.model.UserCoursePercent(this.item);
                    if(percentComplete == 0 || !this.item.Track_progress) {
                        this.startButtonLbl = "Start";
                        this.displayClearBtn = false;
                    }
                    else if(percentComplete > 0 && percentComplete < 100) {
                        this.startButtonLbl = "Continue";
                        this.displayClearBtn = true;
                    }
                    else {
                        this.startButtonLbl = "Review";
                        this.displayClearBtn = true;
                    }
                    this.displayHoverDiv = true;  
                }
                else {
                    this.startButtonLbl = "Play";
                    this.displayHoverDiv = true;
                }    
            }            
        //}
    }

    private hideHoverDiv = () => {
        this.displayHoverDiv = false;
    }

    public start():void {
        if(this.item instanceof ProxyCourse) {
            this.startEmitter.emit(this.item.Course_id);
        }
        else if(this.item instanceof ProxyActivity){
            this.startEmitter.emit(this.item.Activity_name);
        }
    }

    public clearCourse():void {
        let user_course:User_Course = this.model.GetUserCourseByID(this.item.Course_id);

        this.model.showMdlConfirmDialog(this.model.GetUiTextByKey("WARNING_CLEAR_PROGRESS_MESSAGE").replace("{0}", this.item.Course_name), 
            this.model.GetUiTextByKey("WARNING_CLEAR_PROGRESS_TITLE"), this.model.GetUiTextByKey("GEN_NO"), this.model.GetUiTextByKey("GEN_YES"), this.clearProgressResult);
    }

    private clearProgressResult = (event:ClosePopUpEvent) => {
        if(event.detail == ClosePopUpEvent.OK) {
            //stop course runner UberReaderAccessor.GetUberReader().StopCourseRunner();
            let user_course:User_Course = this.model.GetUserCourseByID(this.item.Course_id);
            user_course.Step_position = 0;
            this.model.ClearProgress(this.item.Course_id);
            this.model.UpdateUserPref("courseIncomplete" + this.item.Course_id, "true", false);
            this.displayCourseProgress = false;
            this.percentFinished = 0;
            this.isTrialLocked();
        }
    }

    private clearCourseProgress = (event:UserProgressedEvent) => {
        if(event.CurretnCourseId == this.item.Course_id) {
            this.displayCourseProgress = false;
            this.percentFinished = 0;
            this.isTrialLocked();
        }
    }
}