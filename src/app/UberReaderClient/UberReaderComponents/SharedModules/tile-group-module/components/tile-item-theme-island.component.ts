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
    selector: 'tile-item-theme-island',
    styleUrls: ['./tile-item-theme-island.component.css'],
    template: `
        <div class="course-col" [class.disabled]="disabled">
            <!--<div class="courseProgress" *ngIf="displayCourseProgress">
                <round-progress-bar class="hide" #courseProgress size="50" [displayProgressLabel]="false"></round-progress-bar>
                <div #donutChart id="donutChart" class="hide"></div>
                <circular-progressbar class="hide" #courseProgress size="65" thickness="5" backgroundColor="#CCCCCC" fillColor="#34AD07" ></circular-progressbar>
                <span class="percentage-label">{{ percentFinished }}%</span>
            </div>-->
            <img class="pipe-{{pipeType == '' ? 'top-straight' : pipeType == 'top-curved-' ? 'top-curve' : 'bottom-curve'}} {{pipeType != '' ? 'pipe-' + pipeType + pipeLayout : ''}}" src="{{ 'assets/img/courses-theme/island/' + pipeColor + '-' + pipeType + 'pipe.svg' | resourceLoc }}" *ngIf="isPipeVisible && (pipeType == 'top-curved-'  || (pipeType == '' && pipeDirection == 'top'))" />
            <div>
              <mdl-card mdl-shadow="2" id="course-tile" class="mdl-card-cLevels" [class.hide]="!displayCourseStatus" (mouseover)="displayCourseStatus= true" (mouseout)="displayCourseStatus = false">
                <mdl-card-supporting-text class="supporting-text-2">
                  <p class="mdl-typography--subhead mdl-typography--text-center mdl-typography--font-bold mdl-color-text--black">{{ tileName }}</p>

                  <div *ngIf="displayCourseProgress" class="mdl-typography--subhead mdl-typography--text-center mdl-typography--font-bold mdl-color-text--black">{{ progressDescription }}</div>
                  <mdl-card-actions>
                    <div [class.card-buttons]="!displayHoverDiv">
                      <button #startButton (click)="start()" mdl-button mdl-button class="flat-tile-button" style="font-weight: bold; font-size: 15px; color: #34ad07 !important;" [class.start-margin]="startButtonLbl == 'Start' || startButtonLbl == 'Play'">
                          {{ startButtonLbl }}
                      </button>
                      <button #clearButton *ngIf="displayClearBtn" (click)="clearCourse()" mdl-button class="flat-tile-button" style="font-weight: bold; font-size: 15px; color: black !important;">
                          Clear
                      </button>
                    </div>
                  </mdl-card-actions>
                </mdl-card-supporting-text>
              </mdl-card>
              <div #courseTile class="course-tile-container" (click)="displayHoverDiv == true ? start() : false" (mouseover)="displayCourseStatus = true" (mouseout)="displayCourseStatus = false">
                <img class="checkmark checkmark-{{ isColEven ? '2' : '1' }}" src="{{ 'assets/img/courses-theme/island/checkmark.svg' | resourceLoc }}" *ngIf="percentFinished === 100 && item.Track_progress" />
                <div class="round-progress round-progress-{{ isColEven ? '2' : '1' }}" [class.hide]="!displayCourseProgressMeter" *ngIf="percentFinished !== 100 && displayCourseProgress">
                  <svg version="1.1" x="0px" y="0px" viewBox="0 0 62 72"
                    style="enable-background: new 0 0 62 72;" xml:space="preserve">
                    <!-- Round progress meter outer border -->
                    <circle cx="31" cy="36" r="20" fill="none" stroke="url(#SVGID_1_)" stroke-width="19.5" />
                    <!-- Round progress meter inner border -->
                    <circle cx="31" cy="36" r="19" fill="none" stroke="url(#SVGID_2_)" stroke-width="17.5" />
                    <!-- Round progress meter container -->
                    <circle cx="31" cy="36" r="20" fill="none" stroke="#FFFFFF" stroke-width="15" />
                    <!-- Round progress meter dynamic fill
                          To set dasharray and dashoffset values,
                          it must be calculated to get the circumference of a circle
                          that refers from the circle's radius.
                          (OPTIONAL) You can search the keyword "pi" on google to bring up calculator to get accurate results.
                    -->
                    <circle cx="31" cy="36" r="20" fill="none" stroke="#34ad07" stroke-width="15"
                            stroke-dasharray="125.664"
                            [attr.stroke-dashoffset]="125.664 * (1 - (percentFinished / 100))" />

                    <defs>
                      <!-- Outer border -->
                      <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="1.5" y1="1192.5" x2="60.9989" y2="1192.5" gradientTransform="rotate(90)">
                        <stop offset="0.1917" style="stop-color:#CCCCCC"/>
                        <stop offset="0.5155" style="stop-color:#000000"/>
                        <stop offset="0.842" style="stop-color:#CCCCCC"/>
                      </linearGradient>
                      <!-- Inner border -->
                      <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="17.9" y1="1191.3" x2="44.4291" y2="1191.3" gradientTransform="rotate(90)">
                        <stop offset="0.1917" style="stop-color:#CCCCCC"/>
                        <stop offset="0.5155" style="stop-color:#000000"/>
                        <stop offset="0.842" style="stop-color:#CCCCCC"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <img class="blocky blocky-{{ isColEven ? '2' : '1' }}" src="{{ 'assets/img/courses-theme/island/blocky.svg' | resourceLoc }}" *ngIf="isBlockyVisible" />
                <img class="keyboard-key" src="{{ 'assets/img/courses-theme/island/black-key.svg' | resourceLoc }}" />
                <!--<img #courseTile
                      #toolTip="matTooltip"
                      matTooltip="{{ tileName }}&#13;&#13;{{ progressDescription }}&#13;"
                      matTooltipPosition="above"
                      matTooltipHideDelay="1500"
                      class="keyboard-key"
                      (click)="displayHoverDiv == true ? start() : false"
                      src="assets/img/courses-theme/island/black-key.svg" />!-->
              </div>
            </div>
            <img class="pipe-{{pipeType == '' ? 'bottom-straight' : pipeType == 'top-curved-' ? 'top-curve' : 'bottom-curve'}} {{pipeType != '' ? 'pipe-' + pipeType + pipeLayout : ''}}" src="{{ 'assets/img/courses-theme/island/' + pipeColor + '-' + pipeType + 'pipe.svg' | resourceLoc }}" *ngIf="isPipeVisible && (pipeType == 'bottom-curved-' || (pipeType == '' && pipeDirection == 'bottom'))" />
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
export class TileItemThemeIsland implements OnInit{
    @Input('item') item:any;
    @Input('isColEven') isColEven: boolean;
    @Output() startEmitter = new EventEmitter();
    @Output() blockCourse = new EventEmitter();
    @Output() skipCourse = new EventEmitter();
    @ViewChild('courseTile', { static: true }) courseTile:any;
    ////@ViewChild('courseProgress') courseProgress:CircularProgressbar;
    //@ViewChild('courseProgress') courseProgress:RoundProgressBar;
    //@ViewChild('donutChart') donutChart: ElementRef;

    public trialEnabled: boolean = true;
    // public displayImage = true;
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
    // public lockImg: string = 'assets/icon/lock.svg';
    public levelTooltip: string = "";
    public displayCourseStatus: boolean = false;
    public displayCourseProgressMeter: boolean = false;
    public isBlockyVisible: boolean = false;
    public isPipeVisible: boolean = false;
    // * Pipe types -> ('') > empty string for straight, top or bottom + '-curved-'.
    public pipeType: string = '';
    // * Pipe color -> white, green and gold.
    public pipeColor: string = '';
    // * Pipe direction -> starts with bottom direction in every island. Pipe direction will be top or bottom.
    public pipeDirection: string = '';
    // * Pipe layout -> Left to right or right to left pipe layout options
    public pipeLayout: string = '';

    private model: UberApplication;
    private locked: boolean = true;

    constructor(private userStatusService: UserStatusService) {
        this.model = UberApplication.GetInstance();
        this.model.addEventListener(UserProgressedEvent.USER_NAVIGATE_TO_COURSE, this.clearCourseProgress);
    }

    ngOnInit() {
        if(this.item instanceof ProxyCourse) {
            this.tileName = this.item.Course_name;

            this.tileIconName = this.item.Course_id + ".svg";
            this.iconType = "courseIcon";

            this.displayCourseProgressMeter = false;
            this.trialEnabled = !this.model.CurrentUser.Is_trial || (this.model.IsTrialCourseEnabled(this.item.Course_id) || this.model.IfTrialCourseStep1Locked(this.item.Course_id));
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

                    this.progressDescription = usercourse.Sequence_upto + 1 + ' of ' + this.item.Course_length + ' completed';
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
                        // this.lockImg = "assets/icon/lock-" + level.Name.toLowerCase() + ".svg";
                        this.levelTooltip = "You need to reach "  + level.Name + " level to unlock this game."
                        break;
                    }
                }
                if (!levelFound) {
                    // this.lockImg = "assets/icon/lock-diamond.svg";
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

                this.displayCourseProgressMeter = true;
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

    public set showBlocky(visible: boolean) {
      this.isBlockyVisible = visible;
    }

    public addPipe(pipeType: string, pipeDirection: string, pipeColor: string, pipeLayout: string) {
      this.pipeType = pipeType;
      this.pipeColor = pipeColor;

      this.pipeDirection = pipeDirection;

      this.pipeLayout = pipeLayout;

      // if (this.pipeType != '') {
      //   if (this.pipeType == 'top-curved-') {
      //     this.pipeDirection = 'bottom';
      //   } else {
      //     this.pipeDirection = 'top';
      //   }
      // }

      this.isPipeVisible = true;
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
