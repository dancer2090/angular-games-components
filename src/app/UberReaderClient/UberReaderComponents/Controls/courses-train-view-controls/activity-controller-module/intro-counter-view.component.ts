import { Component, Output, OnInit, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Course_Activity } from '../../../../../UberReaderData/DataClasses/db/Course_Activity';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { UberReader } from '../../../../UberReader';


@Component({
    selector: 'intro-counter-view',
    styleUrls: ['./intro-counter-view.component.css'],
    template: `
        <basic-intro-view [class.fade-in]="reset" [introImageSrc]="introImage" [title]="title" [bodyText]="description" [isIntroCounter]="true">
            <div *ngIf="counterLabel!=-1" class="countdown-text mdl-typography--font-thin">{{ counterLabel }}</div>
            <button mdl-button mdl-button-type="raised" mdl-colored="accent" mdl-ripple class="button--primary button--primary-continue button--centered"
                *ngIf="counterLabel==-1" (click)="handleClickEvent()" (enter)="handleClickEvent()">{{ buttonLabel }}</button>
        </basic-intro-view>
    `
})
export class IntroCounterView implements OnDestroy{
    @ViewChild('startBtn', { static: true }) startBtn:any;
    @Output('startActivity') startActivity = new EventEmitter();

    public introImage:string = "";
    public title:string = "";
    public description:string = "";
    public counterLabel:number = -1;
    public buttonLabel:string = "";
    public countDownTimer:any;
    public reset:boolean = false;

    public Init( courseActivity:Course_Activity, activityId:number, isVideo:boolean=false) {
        this.reset = true;
        /* DEPRECATED:
        ** Video Intro icons and Video screenshots are no longer needed due to new multi-media video lesson design
        if(activityId == 409 || activityId == 335) {
            //409 = Position Check Video ; 335 = Lesson Activity Intro (Key Guidance)
            //Screenshots for Position Check Video and Lesson Activity Intro are the same among all courses
            this.introImage = AppSettings.getCourseIntroIconSource(-1, activityId);
        }
        else if(isVideo) {
            //only one video screenshot is used throughout a single course
            this.introImage = AppSettings.getCourseIntroIconSource(courseActivity.Course_id, -1); 
        } 
        else {
            this.introImage = AppSettings.getCourseIntroIconSource(courseActivity.Course_id, activityId); 
        }*/
        
        if(activityId == 334 || isVideo) { //if Typing Lesson or a non-multi-media video lesson
            //intro icons for typing lessons and non-nulti-media videos are the same all throughout a single course
            this.introImage = AppSettings.getCourseIntroIconSource(courseActivity.Course_id + (isVideo ? "_video" : ""));
        }
        else {
            this.introImage = AppSettings.getCourseIntroIconSource(activityId.toString()); 
        }

        this.title = courseActivity.Intro_title;
        if (courseActivity.course) {
            UberReader.GetInstance().titleHeader = courseActivity.course.Course_name + " - " + this.title;
        }

        if(courseActivity.Uses_intro) {
            this.description = courseActivity.Intro_text;
            this.counterLabel = courseActivity.Intro_countdown != null ? courseActivity.Intro_countdown : -1;
            this.buttonLabel = courseActivity.Button_text;            

            if(this.counterLabel != -1) {
                this.countDownTimer = setInterval( () => this.startCountDown(), 1000);
            }   
        }
        else {
            this.startActivity.emit();
            //this.counterLabel = 2;
        }
        setTimeout(() => this.reset = false, 900);
    }

    private startCountDown():void {
        this.counterLabel--;
        
        if(this.counterLabel <= 0) {
            clearInterval(this.countDownTimer);
            this.startActivity.emit();
        }
    }

    public handleClickEvent():void {
        this.startActivity.emit();
    }

    public Stop():void {
        this.reset = false;
        clearInterval(this.countDownTimer);
    }

    ngOnDestroy() {
        this.reset = false;
        clearInterval(this.countDownTimer);
        UberReader.GetInstance().titleHeader = "";
    }
}