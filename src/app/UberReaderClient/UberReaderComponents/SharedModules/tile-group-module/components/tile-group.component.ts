import { Component, Input, OnInit, Output, EventEmitter, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { TileItem } from './tile-item.component';
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
    selector: 'tile-group',
    styleUrls: ['./tile-group.component.css'],
    template: `
        <div #mainContainer>
            <!--
            <label *ngIf="categoryItems.length > 0" class="mdl-typography--display-1 mdl-typography--font-light mdl-color-text--grey-600 course-header-title">{{ category?.Description }}</label>
            <mdl-icon *ngIf="showPrintCertificateBtn && allowPrint" (click)="printCertificate()">print</mdl-icon>
            -->
            <div class="column-wrap">
                <div class="column1">
                    <label *ngIf="categoryItems.length > 0" class="mdl-typography--display-1 mdl-typography--font-light mdl-color-text--grey-600 course-header-title">{{ category?.Description }}</label>
                </div>
                <div class="column1">
                <!--mdl-icon  [mdl-tooltip]="tt1" *ngIf="showPrintCertificateBtn && allowPrint" (click)="printCertificate()" id="print-icon">print</mdl-icon-->
                <span [mdl-tooltip]="tt1" *ngIf="showPrintCertificateBtn && allowPrint" (click)="printCertificate()" id="print-icon" class="icon-print_outline"></span>
                <mdl-tooltip #tt1="mdlTooltip">Print certificate</mdl-tooltip>
                </div>
            </div>

            <div class="mdl-grid">
                <tile-item *ngFor="let item of categoryItems" [item]="item" id="{{ item.Course_id == recommendedCourseID? 'recommendedCourse' : '' }}" (startEmitter)="sectionItemClicked($event)" (blockCourse)="blockCourseHandler($event)" (skipCourse)="skipCourseHandler($event)"></tile-item>
            </div>
        </div>

        <!-- CERTIFICATE TEMPLATE -->
        <div [id]="certificateDivId" style="display: none;">
            <typesy-certificate-component
                [certificateOwner]="user.First_name + ' ' + user.Last_name" 
                [certificateTitle]="category?.Description"
                [certificateSpeed]="currentGoal1"
                [certificateAccuracy]="currentGoal2">
            </typesy-certificate-component>
        </div>
    `
})
export class TileGroup implements OnInit {
    @Input('category') category:any;
    @Input('recommendedCourseID') recommendedCourseID:number;
    @Output() tileClicked = new EventEmitter();
    @Output() blockCourse = new EventEmitter();
    @Output() skipCourse = new EventEmitter();
    @ViewChildren(TileItem) tileItems:QueryList<TileItem>;
    @ViewChild('mainContainer', { static: true }) mainContainer: any;

    public certificateDivId:string;

    private model:UberApplication;
    private tileItemsArray:TileItem[] = [];

    public sectionTitle:string = "";
    public categoryItems:any[] = [];
    public showPrintCertificateBtn: boolean = false;
    public user: User;
    public currentGoal1: number = 0;
    public currentGoal2: number = 0;    
    public allowPrint: boolean;
    //public display:boolean = true;

    constructor(private printService: PrintService) {
        this.model = UberApplication.GetInstance();        
        this.allowPrint = this.model.AllowPrint;
        this.model.addEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, () => this.ngOnInit());
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

    ngOnInit() {
        if( this.category instanceof Course_Category ) {
            this.categoryItems = this.category.ProxyCourses;
            setTimeout(() => {
                this.tileItemsArray = this.tileItems.toArray();
                this.unlockCourseCategoryButtons();
                //if (this.category.Uses_certificate && !this.user.IsEduUser) {
                    this.showPrintCertificateBtn = this.model.HasUserFinishedCategory(this.category);
                    this.certificateDivId = "cc_certificate_" + this.category.Course_category_id;
                //}
            },0);            
        }
        else if( this.category instanceof Activity_Category ) {
            this.categoryItems = this.category.ProxyActivities;
            /* if (this.model.IsMacintosh) {
                let idx = this.category.ProxyActivities.findIndex(activity => activity.Activity_name == 'Clumsy Bird Typing');
                if (idx > -1) {
                    this.categoryItems.splice(idx, 1);
                }
            } */
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
                
                if(pc.Track_progress) {
                    this.tileItemsArray[index].LockTile = !prevCourseIsUntracked && index > lastAvailableCourseIndex;
                    prevCourseIsUntracked = false;
                    //TO DO group.updateButton(pc);

                    //unlock next available
                    let percentComplete:number = this.model.UserCoursePercent(pc);
                    if(index == lastAvailableCourseIndex && percentComplete == 100) {
                        if(index == numOfProxyCourses - 1) {
                            //do nothing as this is the last node of the course category
                        }
                        else {
                            this.tileItemsArray[++index].LockTile = false;
                            //TO DO group.updateButton(pc);
                        }
                    }
                }
                else {
                    prevCourseIsUntracked = true;
                    this.tileItemsArray[index].LockTile = false;
                }
            }
        }
        else {
            let numOfProxyCourses:number = this.category.ProxyCourses.length;
            for(let index = 0; index < numOfProxyCourses; index++) {
                this.tileItemsArray[index].LockTile = false;
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

    ngOnDestroy() {
        this.model.removeEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, () => this.ngOnInit());
    }
}