import { Component, ViewChild } from '@angular/core';
import { UberReaderDialog } from './UberReaderDialog';
import { Router } from '@angular/router';
import { MdlDialogComponent } from '@angular-mdl/core';
import { ProxyCourseActivity } from '../../../UberReaderData/DataClasses/other/ProxyCourseActivity';
import { ProxyCourse } from '../../../UberReaderData/DataClasses/other/ProxyCourse';

@Component({
    selector: 'course-step-preview-dialog',
    styleUrls: ['./CourseStepPreviewDialog.css'],
    template: `
    <mdl-dialog #stepPreviewDialog 
            [mdl-dialog-config]="{
              classes: 'course-step-preview-dialog',
              isModal: true}">
        
              
            <mdl-layout mdl-layout-fixed-header class="mdl-js-layout">
                <mdl-layout-header mdl-shadow="4" class="dialog-header">
                    <mdl-layout-header-row class="preped-header-row">
                        <div id="headerTitleDiv"><h6 class="mdl-typography--title mdl-color-text--white header-title-main">{{courseName}}</h6></div>
                        <mdl-layout-spacer></mdl-layout-spacer>
                        <div class="dialog-description"><h6 class="mdl-typography--title mdl-color-text--white header-title-main">{{stepNumber}}</h6></div>

                        
                        <button class="x-button close" (click)="closePreviewDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
                            <mdl-icon class="mdl-color-text--white">close</mdl-icon>   
                        </button>
                    </mdl-layout-header-row>
                </mdl-layout-header>
                <mdl-layout-content>
                    <div class="mdl-grid login-form-grid">
                        <div class="mdl-cell mdl-cell--12-col login-form-cell">
                            <router-outlet name="previewOutlet"></router-outlet>                       
                        </div>
                    </div>
                </mdl-layout-content>
            </mdl-layout>

        <!-- <button class="x-button close" (click)="closePreviewDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
            <mdl-icon class="mdl-color-text--white">close</mdl-icon>   
        </button>

        <div class="mdl-grid login-form-grid">
            <div class="mdl-cell mdl-cell--12-col login-form-cell">
                 <router-outlet name="previewOutlet"></router-outlet>                       
            </div>
        </div> -->
    </mdl-dialog>
    `
})

export class CourseStepPreviewDialog extends UberReaderDialog
{
    @ViewChild('stepPreviewDialog', { static: true }) stepPreviewDialog: MdlDialogComponent;

    public courseName:string;
    public stepNumber:string;
    public stepPreviewVisible:boolean = false;

    private static _instance:CourseStepPreviewDialog;

    public static GetInstance():CourseStepPreviewDialog
    {
        return CourseStepPreviewDialog._instance;
    }

    constructor(private router:Router)
    {
        super();
        CourseStepPreviewDialog._instance = this;
    }

    // constructor(private _model:UberApplication, public dialog: MdlDialogReference, @Inject("data") data:any, private router:Router)
    // {
    //     super(dialog);
    //     //this.Init();
    //     this.courseName = data.courseActivityId;
    //     this.router.navigate([{ outlets: { previewOutlet: ['preview', data.courseActivityId] }}], { skipLocationChange: true });
    //     //this.router.navigate(['/prep', proxyCourseActivity.Course_activity_id]);
    //     //<a [routerLink]="[{ outlets: { 'extra': ['compose'] } }]">Component Aux</a>
    //     //UberApplication.GetInstance().GetCourseActivityPreview(data.courseActivityId, this.courseActivityPreviewSucceded, this.courseActivityPreviewFailed);
    // }
    // private courseActivityPreviewSucceded = (event:CourseActivityPreviewEvent) =>
    // {
    //     event.target.removeEventListener(CourseActivityPreviewEvent.COURSE_ACTIVITY_PREVIEW_RECEIVED, this.courseActivityPreviewSucceded);
    //     event.target.removeEventListener(CourseActivityPreviewEvent.COURSE_ACTIVITY_PREVIEW_ERROR, this.courseActivityPreviewFailed);
        
    //     UberReaderLoadingMessage.GetInstance().Hide();
    //     //UberReader.GetInstance().titleHeader = event.proxyCourse.Course_name;
    //     //UberReader.GetInstance().headerActionContent = (event.stepNumber + 1) + " of " + event.proxyCourse.Course_length;

    //     //this.courseProgressStep = (event.stepNumber + 1) + " of " + event.proxyCourse.Course_length;

    //     //this.courseName = event.proxyCourse.Course_name;        
    //     this.courseStepPreview.RestartView();
    //     this.courseStepPreview.Init(event.courseActivity);
    // }

    // private courseActivityPreviewFailed = (event:CourseActivityPreviewEvent) =>
    // {
    //     event.target.removeEventListener(CourseActivityPreviewEvent.COURSE_ACTIVITY_PREVIEW_RECEIVED, this.courseActivityPreviewSucceded);
    //     event.target.removeEventListener(CourseActivityPreviewEvent.COURSE_ACTIVITY_PREVIEW_ERROR, this.courseActivityPreviewFailed);
        
    //     UberReaderLoadingMessage.GetInstance().Hide();

    //     //DO SOMETHING HERE
    // }

    public Show(courseActivity:ProxyCourseActivity, proxyCourse:ProxyCourse):void
    {
        this.courseName = proxyCourse.Course_name;

        var stepNumber = proxyCourse.ProxyCourseActivities.indexOf(courseActivity);
        this.stepNumber = (stepNumber + 1) + " of " + proxyCourse.Course_length;

        this.router.navigate([{ outlets: { previewOutlet: ['preview', 'preview', courseActivity.Course_activity_id] }}],
                            { skipLocationChange: true, replaceUrl: false, queryParams: { updateHistory: 0 } });

        this.open();
        
        this.stepPreviewDialog.show();
    }

    public Hide():void
    {
        this.visible = false;
        this.stepPreviewDialog.close();
    }

    public closePreviewDialog():void 
    {
        this.router.navigate([{ outlets: { previewOutlet: null }}], { skipLocationChange: true, replaceUrl: false, queryParams: { updateHistory: 0 } });
        this.Hide();
    }

    public dispose():void
    {

    }
}