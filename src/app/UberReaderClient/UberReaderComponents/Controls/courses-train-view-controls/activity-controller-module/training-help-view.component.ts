import { Component, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Activity } from '../../../../../UberReaderData/DataClasses/db/Activity';
import { UberReader } from '../../../../UberReader';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';


@Component({
    selector: 'training-help-view',
    styleUrls: ['./training-help-view.component.css'],
    template: `
        <basic-intro-view [introImageSrc]="introImage" [title]="title" [bodyText]="description">
            <!--button mdl-button mdl-button-type="raised" mdl-colored="accent" mdl-ripple class="button--primary button--primary-continue button--centered" id="btnPlay"
                (click)="handleClickEvent()">{{ buttonLabel }}</button-->
                <button mat-raised-button class="button--primary button--primary-continue button--centered" id="btnPlay"
                (click)="handleClickEvent()">{{ buttonLabel }}</button>
        </basic-intro-view>
    `
})
export class TrainingHelpView implements OnDestroy {
    @ViewChild('startBtn', { static: true }) startBtn:any;
    @Output('showActivity') showActivity = new EventEmitter();

    public buttonLabel:string = "";
    public introImage:string = "";
    public title:string = "";
    public description:string = "";
    public continueActivity:boolean = false;

    public Init( activity:Activity, fromActivity:boolean=false ):void {
        this.title = activity.Activity_name;
        this.description = activity.Activity_description;
        this.introImage = AppSettings.getGameIntroIconSource(activity.Activity_id);
        this.continueActivity = fromActivity;
        window.addEventListener('keydown', this.onPlay, false);
        /*setTimeout( () => {
            this.startBtn.nativeElement.focus();
        },0);*/

        if(fromActivity)
            this.buttonLabel = UberApplication.GetInstance().GetUiTextByKey("BTN_CONTINUE_ACTIVITY").replace("{0}", this.title);
        else
            this.buttonLabel = UberApplication.GetInstance().GetUiTextByKey("BTN_START_ACTIVITY").replace("{0}", this.title);
    }

    public handleClickEvent() {
        window.removeEventListener('keydown', this.onPlay);
        this.showActivity.emit( this.continueActivity );
    }

    public onPlay = (event: KeyboardEvent) => {
      event.stopImmediatePropagation();
    }

    ngOnDestroy() {
        UberReader.GetInstance().titleHeader = "";
        window.removeEventListener('keydown', this.onPlay);
    }
}
