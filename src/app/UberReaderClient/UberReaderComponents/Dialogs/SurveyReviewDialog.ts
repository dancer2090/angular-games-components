import { Component, ViewChild } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { UberReaderDialog } from './UberReaderDialog';
import { UberApplication } from '../../../UberReaderData/UberApplication';
import { SurveyReview } from '../../../UberReaderData/DataClasses/db/SurveyReview';
import { AppSettings } from '../../../UberReaderData/AppSettings';
import { Http } from '@angular/http';
import { UrlLoaderService } from '../SharedModules/shared-components-module/services/UrlLoader.service';
import { SurveyReviewEvent } from '../../../UberReaderData/Events/SurveyReviewEvent';
import { StarRatingBar } from '../SharedModules/star-rating-module/components/StarRatingBar';

declare var MaterialDatetimePicker:any;

@Component({
    selector: 'survey-review-dialog',
    styleUrls: ['./SurveyReviewDialog.css'],
    template: `
        <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--12-col form-cell">     
                <h3 class="mdl-typography--headline mdl-color-text--grey-800 login-headline">{{ titles[currentStep - 1] }}</h3>
                <button class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
                    <mdl-icon>close</mdl-icon>
                </button>

                <!-- QUESTION 1 -->
                <div *ngIf="currentStep == 1">
                    <label class="labels mdl-typography--subhead">Would you mind taking 2 minutes to give us some quick feedback on Typesy?</label>
                    <div class="show-cbox-div">
                        <mdl-checkbox class="show-cbox" [mdl-ripple]="true" [(ngModel)]="dontShowAgain">
                            Don't show this again
                        </mdl-checkbox>
                    </div>

                    <button mdl-button class="green-button" (click)="continue_clickHandler()" mdl-button-type="raised" mdl-ripple>OK - I'LL HELP</button>
                    <button mdl-button (click)="notNow_clickHandler()">NOT NOW</button>
                </div>                

                <!-- QUESTION 2 -->
                <div *ngIf="currentStep == 2">
                    <div class="mdl-grid" style="margin-top: 30px;">
                        <div *ngFor="let gridItem of distributionChannelsGrid" class="mdl-cell mdl-cell--6-col">
                            <mdl-radio *ngFor="let item of gridItem"
                                        name="radioButtonGroup1"
                                        [value]="item.name"
                                        [(ngModel)]="reviewData.Purchase_source"
                                        (click)="channelRadioBtn_clickHandler(item)"
                                        mdl-ripple>{{ item.name }}</mdl-radio>
                        </div>
                    </div>
                </div>

                <!-- QUESTION 3 -->
                <div *ngIf="currentStep == 3">
                    <label class="labels mdl-typography--subhead">
                        Please rate Typesy below, and feel free to optionally provide additional feedback.
                    </label>

                    <div class="star-rating">
                        <star-rating #starRating [height]="40" enableRating="true"></star-rating>
                    </div>

                    <mdl-textfield class="review-box" label="Write a review..." [(ngModel)]="reviewData.Text_review" rows="3"></mdl-textfield>
                </div>
                
                <!-- QUESTION 4 -->
                <div *ngIf="currentStep == 4 && reviewData.Rating == 5">                
                    <label class="labels mdl-typography--subhead">
                        We are SO glad you liked Typesy! The team worked very hard to make Typesy
                        happen, and your feedback makes all the difference. We would also appreciate it greatly if you could provide us a quick
                        rating and review online. To do so, just click the link below. Thank you for your support!
                    </label>
                    
                    <button mdl-button class="green-button submit-button" (click)="submitOnlineReview_clickHandler()" mdl-button-type="raised" mdl-ripple>SUBMIT ONLINE REVIEW</button>    
                </div>
            </div>
        </div>     
        
        <div class="mdl-dialog__actions bottom-content">   
            <label *ngIf="currentStep != 4" id="progress-label" class="step-label ">Step {{ currentStep }} of {{ totalSteps }}</label>            
            <button *ngIf="currentStep == 2" mdl-button class="green-button login-button" (click)="nextButton_clickHandler()" mdl-button-type="raised" mdl-ripple [disabled]="reviewData.Purchase_source == null">Next</button>               
            <button *ngIf="currentStep == 3" mdl-button class="green-button login-button" (click)="submitButton_clickHandler()" mdl-button-type="raised" mdl-ripple [disabled]="starRating?.progress == 0">Submit</button>               
        </div>
    `
})

export class SurveyReviewDialog extends UberReaderDialog
{    
    @ViewChild('starRating', { static: false }) starRating: StarRatingBar;

    private _model: UberApplication;
    
    public titles: string[] = [
        'Can you help us out {firstname}?',
        'Where did you get Typesy?',
        'How would you rate Typesy?',
        'Can you do us one last favor {firstname}?'
    ];

    public currentStep:number = 1;
    public totalSteps:number = 4;
    public buttonLabel: string = "Next";
    public reviewData: SurveyReview;
    public dontShowAgain: boolean = false;
    public distributionChannels: any[] = [];
    public distributionChannelsGrid: any[] = [];
    public selectedDistributionChannel: any;    

    constructor(public dialogRef: MdlDialogReference, private http: Http, private urlLoaderService: UrlLoaderService) {
        super(dialogRef);
        
        this._model = UberApplication.GetInstance();        
        this.titles = this.titles.map(title => title.replace('{firstname}', this._model.CurrentUser.First_name));
        this.reviewData = new SurveyReview(this._model.CurrentUser.User_id, AppSettings.CurrentProductId);
    }

    ngOnInit() {
        this.init();
    }

    ngAfterViewInit() {

    }

    private init() {
                    
    }

    public channelRadioBtn_clickHandler(channel: any) {
        console.log('channelRadioBtn_clickHandler: ', channel);
        this.selectedDistributionChannel = channel;
    }

    public prevButton_clickHandler() {        

    }

    public nextButton_clickHandler() {
        this.currentStep++;
    }

    public submitButton_clickHandler() {
        this.currentStep++;
        this.reviewData.Rating = this.starRating.progress;
        this._model.StoreReview(this.reviewData, this.StoreReviewSuccess, this.StoreReviewError);

        if (this.reviewData.Rating < 5) {
            this.closeDialog();
        }
    }

    private StoreReviewSuccess = (event: SurveyReviewEvent) => {
        event.target.removeEventListener(SurveyReviewEvent.STORE_REVIEW_SUCCESS, this.StoreReviewSuccess);
        event.target.removeEventListener(SurveyReviewEvent.STORE_REVIEW_ERROR, this.StoreReviewError);

        this._model.UpdateUserPref('hide_typesy_review_dialog', "true", true);
    };

    private StoreReviewError = (event: SurveyReviewEvent) => {
        event.target.removeEventListener(SurveyReviewEvent.STORE_REVIEW_SUCCESS, this.StoreReviewSuccess);
        event.target.removeEventListener(SurveyReviewEvent.STORE_REVIEW_ERROR, this.StoreReviewError);

        this._model.showMdlAlertDialog(event.ErrorMessage, "Oops!", true);
    };

    public continue_clickHandler() {
        this.currentStep++;
    }

    public notNow_clickHandler() {
        console.log('notNow_clickHandler: ', this.dontShowAgain);
        this._model.UpdateUserPref('hide_typesy_review_dialog', this.dontShowAgain.toString(), true);
        this.closeDialog();
    }

    public submitOnlineReview_clickHandler() {
        this.urlLoaderService.OpenUrlNewWindow(this.selectedDistributionChannel.link1);
        this.closeDialog();
    }

    public closeDialog() {
        super.closeDialog();
    }

    public dispose() {}
}