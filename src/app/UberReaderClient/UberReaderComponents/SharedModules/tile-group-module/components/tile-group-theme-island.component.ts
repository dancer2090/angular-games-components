import { Component, Input, OnInit, AfterContentInit, Output, EventEmitter, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { TileItemThemeIsland } from './tile-item-theme-island.component';
import { UberApplication } from 'app/UberReaderData/UberApplication';
import { User } from 'app/UberReaderData/DataClasses/db/User';
import { PrintService } from '../../shared-components-module/services/Print.service';
import { AppSettings } from 'app/UberReaderData/AppSettings';
import { UserSettingSyncEvent } from 'app/UberReaderData/Events/UserSettingSyncEvent';
import { Result } from 'app/UberReaderData/DataClasses/db/Result';
import { Course_Category } from 'app/UberReaderData/DataClasses/db/Course_Category';
import { Activity_Category } from 'app/UberReaderData/DataClasses/db/Activity_Category';
import { ProxyCourse } from 'app/UberReaderData/DataClasses/other/ProxyCourse';
import { User_Course } from 'app/UberReaderData/DataClasses/db/User_Course';

@Component({
    selector: 'tile-group-theme-island',
    styleUrls: ['./tile-group-theme-island.component.css'],
    template: `
        <div #mainContainer>
            <!--
            <label *ngIf="categoryItems.length > 0" class="mdl-typography--display-1 mdl-typography--font-light mdl-color-text--grey-600 course-header-title">{{ category?.Description }}</label>
            <mdl-icon *ngIf="showPrintCertificateBtn && !isIPAD" (click)="printCertificate()">print</mdl-icon>
            -->
            <div class="column-wrap">
                <div class="column1">
                    <h6 *ngIf="categoryItems.length > 0" class="mdl-typography--title mdl-typography--font-bold mdl-color-text--black-600 course-header-title">{{ category?.Description }}</h6>
                </div>
                <!--<div class="column1">!-->
                <!--mdl-icon  [mdl-tooltip]="tt1" *ngIf="showPrintCertificateBtn && !isIPAD" (click)="printCertificate()" id="print-icon">print</mdl-icon-->
                <!--<span [mdl-tooltip]="tt1" *ngIf="showPrintCertificateBtn && allowPrint" (click)="printCertificate()" id="print-icon" class="icon-print_outline"></span>
                <mdl-tooltip #tt1="mdlTooltip">Print certificate</mdl-tooltip>
                </div>!-->
            </div>
            <div class="mdl-grid keyboard-keys-container">
                <!--<img class="islands" src="assets/img/courses-theme/island/island{{ (categoryIndex + 1) % 2 == 0 ? 4 : 1 }}.svg" />!-->
                <!--<img class="islands" src="{{ 'assets/img/courses-theme/island/island' + ((categoryIndex + 1) % 4 == 0 ? '8' : ((categoryIndex + 1) % 3 == 0 ? ((categoryIndex + 1) % 2 == 0 ? '4' : '5') : ((categoryIndex + 1) % 2 == 0 ? '4' : '1'))) + '.svg' | resourceLoc }}" />!-->
                <img class="islands" src="{{ 'assets/img/courses-theme/island/island' + ((categoryIndex + 1) > 8 ? (categoryIndex + 1) - (numberToFloor((categoryIndex + 1) / 8) * 8) : categoryIndex + 1) + '.svg' | resourceLoc }}" />
                <div class="courses-flex-container-{{(categoryIndex + 1) % 2 == 0 ? 'rtl' : 'ltr'}}">
                  <ng-container *ngFor="let courseItem of courseItems; index as i">
                    <div *ngIf="(i + 1) % 2 != 0" class="course-items-flex-1">
                      <tile-item-theme-island *ngFor="let item of courseItem" [item]="item" [isColEven]="false" (startEmitter)="sectionItemClicked($event)" (blockCourse)="blockCourseHandler($event)" (skipCourse)="skipCourseHandler($event)"></tile-item-theme-island>
                      <div *ngIf="(i + 1 == courseItems.length) && courseItem.length < 3">
                        <img *ngIf="!isCourseCategoryCompleted" class="gKbd-key gold-keyboard-key" src="{{ 'assets/img/courses-theme/island/gold-key.svg' | resourceLoc }}" />
                        <img *ngIf="isCourseCategoryCompleted" class="gKbd-key-flag gold-keyboard-key-flag" src="{{ 'assets/img/courses-theme/island/gold-key-with-flag.svg' | resourceLoc }}" />
                      </div>
                    </div>
                    <div *ngIf="(i + 1) % 2 == 0" class="course-items-flex-{{ courseItems.length % 3 > (courseItems.length - (i + 1)) ? 'end' : '2' }}">
                    <!--<div *ngIf="(i + 1) % 2 == 0" class="course-items-flex-2">!-->
                      <tile-item-theme-island *ngFor="let item of courseItem" [item]="item" [isColEven]="true" (startEmitter)="sectionItemClicked($event)" (blockCourse)="blockCourseHandler($event)" (skipCourse)="skipCourseHandler($event)"></tile-item-theme-island>
                      <!-- TODO: !-->
                      <div *ngIf="(i + 1 == courseItems.length) && courseItem.length < 3">
                        <img *ngIf="!isCourseCategoryCompleted" class="gKbd-key gold-keyboard-key-{{ courseItem.length >= 2 ? '3' : '2' }}" src="{{ 'assets/img/courses-theme/island/gold-key.svg' | resourceLoc }}" />
                        <img *ngIf="isCourseCategoryCompleted" class="gKbd-key-flag gold-keyboard-key-flag-{{ courseItem.length >= 2 ? '3' : '2' }}" src="{{ 'assets/img/courses-theme/island/gold-key-with-flag.svg' | resourceLoc }}" />
                      </div>
                    </div>
                    <!--<div *ngIf="(i + 1) % 2 == 0 && (courseItems.length % 3 > (courseItems.length - (i + 1)))" class="course-items-flex-2">!-->
                    <div *ngIf="(i + 1 == courseItems.length) && (courseItem.length >= 3)" class="course-items-flex-end">
                      <img *ngIf="!isCourseCategoryCompleted" class="gKbd-key gold-keyboard-key-{{ (categoryIndex + 1) % 2 == 0 ? '5' : '4' }}{{ (isEdge === true) ? '-edge' : '' }}" src="{{ 'assets/img/courses-theme/island/gold-key.svg' | resourceLoc }}" />
                      <img *ngIf="isCourseCategoryCompleted" class="gKbd-key-flag gold-keyboard-key-flag-{{ (categoryIndex + 1) % 2 == 0 ? '5' : '4' }}{{ (isEdge === true) ? '-edge' : '' }}" src="{{ 'assets/img/courses-theme/island/gold-key-with-flag.svg' | resourceLoc }}" />
                    </div>
                  </ng-container>
                  <!--<img *ngIf="!isCourseCategoryCompleted" class="gold-keyboard-key" src="assets/img/courses-theme/island/gold-key.svg" />
                  <img *ngIf="isCourseCategoryCompleted" class="gold-keyboard-key" src="assets/img/courses-theme/island/gold-key-with-flag.svg" />
                  !-->
                </div>
            </div>
            <img *ngIf="categoryIndex < categoryLength - 1" class="{{categoryIndex % 2 == 0 ? 'bridge-right' : 'bridge-left'}}" src="{{ 'assets/img/courses-theme/island/bridge.svg' | resourceLoc }}" />
        </div>

        <!-- CERTIFICATE TEMPLATE
        <div [id]="certificateDivId" style="display: none;">
            <typesy-certificate-component
                [certificateOwner]="user.First_name + ' ' + user.Last_name"
                [certificateTitle]="category?.Description"
                [certificateSpeed]="currentGoal1"
                [certificateAccuracy]="currentGoal2">
            </typesy-certificate-component>
        </div> !-->
    `
})
export class TileGroupThemeIsland implements AfterContentInit {
    @Input('category') category:any;
    @Input('recommendedCourseID') recommendedCourseID: number;
    @Input('categoryIndex') categoryIndex: any;
    @Input('categoryLength') categoryLength: any;
    @Output() tileClicked = new EventEmitter();
    @Output() blockCourse = new EventEmitter();
    @Output() skipCourse = new EventEmitter();
    @ViewChildren(TileItemThemeIsland) tileItems:QueryList<TileItemThemeIsland>;
    @ViewChild('mainContainer', { static: true }) mainContainer: any;

    public certificateDivId:string;

    private model:UberApplication;
    private tileItemsArray:TileItemThemeIsland[] = [];

    public sectionTitle:string = "";
    public categoryItems:any[] = [];
    public courseItems: any[];
    public showPrintCertificateBtn: boolean = false;
    public user: User;
    public currentGoal1: number = 0;
    public currentGoal2: number = 0;
    public isIPAD: boolean = false;
    public isEdge: boolean = false;
    public allowPrint: boolean;
    public isCourseLockExisting: boolean = false;
    public isCourseCategoryCompleted: boolean = false;
    public registeredImageAssets: boolean[] = [false, false];
    public pipeDirection: string = 'bottom';
    public pipeLayout: string = 'ltr';
    //public display:boolean = true;

    constructor(private printService: PrintService) {
        this.model = UberApplication.GetInstance();
        this.isIPAD = AppSettings.ClientType == AppSettings.IPAD_ANGULAR;
        this.isEdge = navigator.userAgent.indexOf("Edge") != -1 ? true : false;
        this.allowPrint = this.model.AllowPrint;
        // this.model.addEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, () => this.ngAfterViewInit());
        this.user = this.model.CurrentUser;

        if (this.model.CurrentProduct.Goal_1_name != null) {
            let lastResult: Result = this.model.getLastResultForCurrentUser(this.model.CurrentProduct.Goal_1_key);
            this.currentGoal1 = lastResult == null ? 0 : lastResult.Value;
        }

        if (this.model.CurrentProduct.Goal_2_name != null) {
            let lastResult: Result = this.model.getLastResultForCurrentUser(this.model.CurrentProduct.Goal_2_key);
            this.currentGoal2 = lastResult == null ? 0 : lastResult.Value;
        }
    }

    ngAfterContentInit() {
        // console.log('TCL: categoryLength', this.categoryLength);
        if( this.category instanceof Course_Category ) {
            this.categoryItems = this.category.ProxyCourses;
            this.courseItems = [];

            for (let i = 0, j = 0; i < this.categoryItems.length; i++) {
              if ((i + 1) % 3 != 0) {
                if (this.courseItems[j] == null) {
                  this.courseItems[j] = [];
                }
                this.courseItems[j].push(this.categoryItems[i]);
              }
              else {
                this.courseItems[j++].push(this.categoryItems[i]);
              }
            }

            setTimeout(() => {
                this.tileItemsArray = this.tileItems.toArray();
                // console.log('TCL: ngOnInit -> this.tileItemsArray', this.tileItemsArray);
                this.unlockCourseCategoryButtons();
                // if (this.category.Uses_certificate && !this.user.IsEduUser) {
                    this.showPrintCertificateBtn = this.model.HasUserFinishedCategory(this.category);
                    this.certificateDivId = "cc_i_certificate_" + this.category.Course_category_id;
                // }
            },0);
        }
        else if( this.category instanceof Activity_Category ) {
            this.categoryItems = this.category.ProxyActivities;
            setTimeout(() => {
                this.tileItemsArray = this.tileItems.toArray();
            },0);
        }
    }

    public sectionItemClicked( tileItemID:string ):void {
        this.tileClicked.emit(tileItemID);
    }

    public blockCourseHandler( course:ProxyCourse ):void {
        this.blockCourse.emit(course);
    }

    public skipCourseHandler( course:ProxyCourse ):void {
        this.skipCourse.emit(course);
    }

    private unlockCourseCategoryButtons():void {
        //always activate first button
        let lastAvailableCourseIndex:number = 0;
        let buttonIndexer:number = 0;
        let prevCourseIsUntracked:Boolean = false;
        let isCurvePipeEnded: boolean = false;
        let pipeType: string = '';
        this.isCourseCategoryCompleted = false;

        if(this.category.Enable_preq) {
            for(let proxyCourse of this.category.ProxyCourses) {
                let userCourse:User_Course = this.model.GetUserCourseByID(proxyCourse.Course_id)
                if(userCourse != null && userCourse.Sequence_upto > 0) {
                    lastAvailableCourseIndex = buttonIndexer;
                }
                buttonIndexer++;
            }

            let numOfProxyCourses:number = this.category.ProxyCourses.length;
            for(let index = 0; index < numOfProxyCourses; index++)
            {
                let pc:ProxyCourse = this.category.ProxyCourses[index];

                if ((this.categoryIndex + 1) % 2 != 0) {
                  this.pipeLayout = 'ltr';
                } else {
                  this.pipeLayout = 'rtl';
                }

                if ((index + 1) % 3 == 0) {
                  if (!isCurvePipeEnded) {
                    pipeType = 'bottom-curved-'
                    this.pipeDirection = 'top';
                  } else {
                    pipeType = 'top-curved-'
                    this.pipeDirection = 'bottom';
                  }
                } else {
                  pipeType = '';
                }

                if(pc.Track_progress) {
                    this.tileItemsArray[index].LockTile = !prevCourseIsUntracked && index > lastAvailableCourseIndex;
                    // console.log('TCL: this.tileItemsArray', this.tileItemsArray);
                    // console.log('TCL: index', index);
                    prevCourseIsUntracked = false;
                    //TO DO group.updateButton(pc);

                    //unlock next available
                    let percentComplete:number = this.model.UserCoursePercent(pc);
                    if(index == lastAvailableCourseIndex && percentComplete == 100) {
                        if(index == numOfProxyCourses - 1) {
                            //do nothing as this is the last node of the course category
                            this.isCourseCategoryCompleted = true;
                            this.tileItemsArray[index].addPipe(pipeType, this.pipeDirection, 'gold', this.pipeLayout);
                            // console.log('TCL: gold  ONE');
                        }
                        else {
                            this.tileItemsArray[index].addPipe(pipeType, this.pipeDirection, 'white', this.pipeLayout);
                            this.tileItemsArray[index + 1].LockTile = false;
                            //TO DO group.updateButton(pc);
                        }
                    }

                    if (index != numOfProxyCourses - 1) {
                      this.tileItemsArray[index].addPipe(pipeType, this.pipeDirection, 'white', this.pipeLayout);
                    } else {
                      this.tileItemsArray[index].addPipe(pipeType, this.pipeDirection, 'gold', this.pipeLayout);
                      // this.tileItemsArray[index].addPipe((index + 1) % 3 == 0 ? (!isCurvePipeEnded ? 'bottom-curved-' : 'top-curved-') : '', 'white');
                    }

                    /* if (index == numOfProxyCourses - 1) {
                      this.tileItemsArray[index].addPipe((index + 1) % 3 == 0 ? (isCurvePipeEnded ? 'bottom-curved-' : 'top-curved-') : '', 'gold');
                      isCurvePipeEnded = !isCurvePipeEnded;
                    } else {
                      this.tileItemsArray[index].addPipe((index + 1) % 3 == 0 ? (isCurvePipeEnded ? 'bottom-curved-' : 'top-curved-') : '', 'white');
                      console.log('TCL: white   ONE');
                      isCurvePipeEnded = !isCurvePipeEnded;
                    } */
                }
                else {
                    prevCourseIsUntracked = true;
                    this.tileItemsArray[index].LockTile = false;
                    this.tileItemsArray[index].addPipe(pipeType, this.pipeDirection, 'white', this.pipeLayout);
                    // console.log('TCL: white   TWO');
                    // this.tileItemsArray[index].addPipe();
                }

                if (this.tileItemsArray[index].disableSkippingCourses === true && this.isCourseLockExisting === false) {
                  this.isCourseLockExisting = true;
                  this.tileItemsArray[index].showBlocky = true;
                  if ((index + 1) < numOfProxyCourses) {
                    this.tileItemsArray[index].addPipe(pipeType, this.pipeDirection, 'white', this.pipeLayout);
                    // console.log('TCL: white   THREE');
                  }
                }

                //! FIXME:
                if (this.tileItemsArray[index].percentFinished === 100 /*&& this.tileItemsArray[index + 1].percentFinished === 100*/) {
                  // this.tileItemsArray[index].addPipe('', 'green');
                  if ((index + 1) < numOfProxyCourses) {
                    this.tileItemsArray[index].addPipe(pipeType, this.pipeDirection, 'green', this.pipeLayout);
                  }
                  // this.tileItemsArray[index].isPipeVisible = false;
                }

                if ((index + 1) % 3 == 0) {
                  isCurvePipeEnded = !isCurvePipeEnded;
                }
            }
        }
        else {
            let numOfProxyCourses:number = this.category.ProxyCourses.length;
            for(let index = 0; index < numOfProxyCourses; index++) {
                this.tileItemsArray[index].LockTile = false;

                if ((this.categoryIndex + 1) % 2 != 0) {
                  this.pipeLayout = 'ltr';
                } else {
                  this.pipeLayout = 'rtl';
                }

                if ((index + 1) % 3 == 0) {
                  if (!isCurvePipeEnded) {
                    pipeType = 'bottom-curved-';
                    this.pipeDirection = 'top';
                  } else {
                    pipeType = 'top-curved-';
                    this.pipeDirection = 'bottom';
                  }
                } else {
                  pipeType = '';
                }

                if (index == numOfProxyCourses - 1) {
                  this.tileItemsArray[index].addPipe(pipeType, this.pipeDirection, 'gold', this.pipeLayout);
                  // console.log('TCL: gold  THREE');
                } else {
                  this.tileItemsArray[index].addPipe(pipeType, this.pipeDirection, 'white', this.pipeLayout);
                  // console.log('TCL: white   FOUR');
                }

                if ((index + 1) % 3 == 0) {
                  isCurvePipeEnded = !isCurvePipeEnded;
                }
            }
        }

    }

    public unlock(): void {
        for(let item of this.tileItemsArray) {
            item.trialEnabled = true;
            item.isTrialLocked();
        }
    }

    public printCertificate(): void {
        let printTitle = "Certicate of Completion";
        setTimeout( () => {
            let printStyling = `@page { size: 11.5in 8.5in; margin: 0px; padding: 0; }
            #certificateMainContainer { width: 1650px; height: 1075px; position: relative; }
            html { margin: 0; padding: 0; width: 100%; }
            body { margin: 0; padding: 0; }
            #contentContainer { width: 1300px; height: 700px; position: absolute; top: 280px; margin-left: -650px; left: 50%; }
            .certificateText { font-size: 35px; text-align: center; color: #212121; line-height: 50px; overflow: hidden; }
            .studentName { margin-top: 10px; margin-bottom: 10px; font-size: 90px; text-align: center; color: #212121; font-weight: bold;
                        height: 200px; display: flex; align-items: center; justify-content: center; line-height: 90px; overflow: hidden; }
            .courseTestName { font-weight: bold; }
            .skillLevelContainer { width: 1500px; height: 300px; margin-top: 40px; margin-left: 150px; position: relative; }
            .skillLevelContainer2 { width: 600px; height: auto; margin-top: 40px; position: relative; margin: 40px auto 0px; display: flex; align-items: center; justify-content: center; }
            .col { width: 300px; height: 180px; display: inline-block; background: #c5e3fa; border: 5px solid #4593cf; border-radius: 5px; margin: 5px 25px; position: relative; }
            .col img{ width: 300px; height: 180px; }
            .skillLevelHeadline { font-size: 25px; font-weight: bold; color: #212121; float: left; width: 100%; margin-top: 20px; }
            .skillLevel { font-size: 80px; font-weight: bold; color: #212121; float: left; width: 100%; margin-top: 70px; }
            .smallText { font-size: 30px;margin-left: -20px; }
            .smallText1 { font-size: 18px; margin-left: -20px; }
            .skillContent1 { position: absolute; top: 0px; right: 0px; left: 70px; }
            .skillContent2 { position: absolute; top: 0px; right: 0px; left: 55px; }
            .skillContent3 { position: absolute; top: 0px; width: 100%; }
            .hide { display: none; }

            @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
                #certificateMainContainer { margin-top: 20px; }
                .certificateText { font-size: 32px; line-height: 45px; }
                .skillLevelContainer { margin-top: 30px; }
                #contentContainer { top: 250px; width: 1150px; margin-left: -575px; }
            }

            @media only screen and (max-width: 1650px) {
                #certificateMainContainer { width: 1100px; height: 700px; }
                #contentContainer { width: 880px; height: 500px; top: 180px; margin-left: -440px; }
                .certificateText { font-size: 22px; line-height: 30px; }
                .studentName { font-size: 60px; height: 120px; line-height: 60px; }
                .skillLevelContainer { width: 700px; height: 200px; margin-top: 30px; margin-left: 50px; }
                .skillLevelContainer2 { margin-top: 30px; }
                .col, .col img { width: 220px; height: 150px; }
                .skillContent1 { left: 45px; }
                .skillContent2 { left: 30px; }
                .skillLevelHeadline { font-size: 20px; }
                .skillLevel { margin-top: 55px; font-size: 60px; }
                .smallText { font-size: 20px; margin-left: -10px; }
                .smallText1 { font-size: 15px; margin-left: -10px; }
            }

            @media only screen and (max-height: 920px)  {
                #certificateMainContainer { width: 1100px; height: 700px; }
                #contentContainer { width: 880px; height: 500px; top: 180px; margin-left: -440px; }
                .certificateText { font-size: 22px; line-height: 30px; }
                .studentName { font-size: 60px; height: 120px; line-height: 60px; }
                .skillLevelContainer { width: 700px; height: 200px; margin-top: 30px; margin-left: 50px; }
                .skillLevelContainer2 { margin-top: 30px; }
                .col, .col img{ width: 220px; height: 150px; }
                .skillContent1 { left: 45px; }
                .skillContent2 { left: 30px; }
                .skillLevelHeadline { font-size: 20px; }
                .skillLevel { margin-top: 55px; font-size: 60px; }
                .smallText { font-size: 20px; margin-left: -10px; }
                .smallText1 { font-size: 15px; margin-left: -10px; }
            }

            @media only screen and (max-height: 920px) and (max-width: 1650px) {
                #certificateMainContainer { width: 1100px; height: 700px; }
                #contentContainer { width: 880px; height: 500px; top: 180px; margin-left: -440px; }
                .certificateText { font-size: 22px; line-height: 30px; }
                .studentName { font-size: 60px; height: 120px; line-height: 60px; }
                .skillLevelContainer { width: 700px; height: 200px; margin-top: 30px; margin-left: 50px; }
                .skillLevelContainer2 { margin-top: 30px; }
                .col, .col img { width: 220px; height: 150px; }
                .skillContent1 { left: 45px; }
                .skillContent2 { left: 30px; }
                .skillLevelHeadline { font-size: 20px; }
                .skillLevel {  margin-top: 55px; font-size: 60px; }
                .smallText { font-size: 20px; margin-left: -10px; }
                .smallText1 { font-size: 15px; margin-left: -10px; }
            }

            @media only screen and  (max-width: 1100px)  {
                #certificateMainContainer {  width: 792px; height: 612px; }
                #contentContainer { width: 620px; height: 400px; margin-left: -310px; top: 130px; }
                .certificateText { font-size: 16px; line-height: 25px; }
                .studentName { font-size: 40px; height: 80px; line-height: 40px; }
                .skillLevelContainer { width: 450px; height: 150px; margin-top: 20px; margin-left: 20px; }
                .skillLevelContainer2 { margin-top: 20px; }
                .col, .col img { width: 160px; height: 95px; }
                .skillContent1 { left: 30px; }
                .skillContent2 { left: 15px; }
                .skillLevelHeadline { font-size: 16px; margin-top: 10px; }
                .skillLevel { margin-top: 25px; font-size: 40px; }
                .smallText1 { font-size: 12px; }
                .smallText { font-size: 18px; }
            }

            @media only screen and (max-height: 700px)   {
                #certificateMainContainer { width: 792px; height: 612px; }
                #contentContainer { width: 620px; height: 400px; margin-left: -310px; top: 130px; }
                .certificateText { font-size: 16px; line-height: 25px; }
                .studentName { font-size: 40px; height: 80px; line-height: 40px; }
                .skillLevelContainer { width: 450px; height: 150px; margin-top: 20px; margin-left: 20px; }
                .skillLevelContainer2 { margin-top: 20px; }
                .col, .col img { width: 160px; height: 95px; }
                .skillContent1 { left: 30px; }
                .skillContent2 { left: 15px; }
                .skillLevelHeadline { font-size: 16px; margin-top: 10px; }
                .skillLevel { margin-top: 25px; font-size: 40px; }
                .smallText1 { font-size: 12px; }
                .smallText { font-size: 18px; }
            }

            @media only screen and (max-height: 700px) and (max-width: 1100px) {
                #certificateMainContainer { width: 792px;height: 612px; }
                #contentContainer { width: 620px; height: 400px; margin-left: -310px; top: 130px;}
                .certificateText { font-size: 16px;line-height: 25px; }
                .studentName { font-size: 40px; height: 80px; line-height: 40px;
                .skillLevelContainer { width: 450px; height: 150px; margin-top: 20px; margin-left: 20px; }
                .skillLevelContainer2 { width: 450px; height: 150px; margin-top: 20px; }
                .col, .col img{ width: 160px; height: 95px; }
                .skillContent1 { left: 30px; }
                .skillContent2 { left: 15px; }
                .skillLevelHeadline { font-size: 16px; margin-top: 10px; }
                .skillLevel { margin-top: 25px; font-size: 40px; }
                .smallText1 { font-size: 12px; }
                .smallText { font-size: 18px; }
            }`;
            let printStyleSheetUrl = "https://code.getmdl.io/1.3.0/material.green-light_green.min.css";
            let printContents = document.getElementById(this.certificateDivId).innerHTML;

            this.printService.printDocument(printTitle, [printStyleSheetUrl], printStyling, printContents);
        }, 0);
    }

    public numberToFloor(value: number): number {
      return Math.floor(value);
    }

    ngOnDestroy() {
        // this.model.removeEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, () => this.ngAfterViewInit());
    }
}
