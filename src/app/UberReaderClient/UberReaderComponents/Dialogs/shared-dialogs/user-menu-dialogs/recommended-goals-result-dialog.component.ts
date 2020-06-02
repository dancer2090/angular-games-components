import { Component, Inject } from '@angular/core';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { ParentDialog } from '../../ParentDialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'recommended-goals-result-dialog',
    styleUrls: ['./recommended-goals-result-dialog.component.css'],
    template: `
     
                <h3 class="mdl-typography--headline mdl-color-text--grey-800 dialog-headline">Your Recommended Goals</h3>
                <button class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
                    <mdl-icon>close</mdl-icon>   
                </button>
             <div class="mdl-dialog__content">
                <div class="mdl-grid">
                    <div class="goals mdl-cell mdl-cell--9-col ">
                        <label class="mdl-typography--subhead mdl-typography--font-bold mdl-color-text--grey-800">Your speed is:</label>							<br/>
                    </div>
                    <div class="goals mdl-cell mdl-cell--3-col mdl-typography--text-right">
                        <label class="mdl-typography--subhead mdl-typography--font-bold mdl-color-text--grey-800">{{ userSpeed }}</label>
                    </div>
                    <div class="goals mdl-cell mdl-cell--9-col ">
                        <label class="mdl-typography--subhead mdl-typography--font-bold mdl-color-text--grey-800">Your recommended speed is:</label>							<br/>
                    </div>
                    <div class="goals mdl-cell mdl-cell--3-col mdl-typography--text-right">
                        <label class="mdl-typography--subhead mdl-typography--font-bold mdl-color-text--grey-800">{{ recommendedSpeed }}</label>
                    </div>
                </div>  
                <br/>

                <div class="mdl-grid">
                    <div class="goals mdl-cell mdl-cell--9-col ">
                        <label class="mdl-typography--subhead mdl-typography--font-bold mdl-color-text--grey-800">Your accuracy is:</label>							<br/>
                    </div>
                    <div class="goals mdl-cell mdl-cell--3-col mdl-typography--text-right">
                        <label class="mdl-typography--subhead mdl-typography--font-bold mdl-color-text--grey-800">{{ userAccuracy }}</label>
                    </div>
                    <div class="goals mdl-cell mdl-cell--9-col ">
                        <label class="mdl-typography--subhead mdl-typography--font-bold mdl-color-text--grey-800">Your recommended accuracy is:</label>							<br/>
                    </div>
                    <div class="goals mdl-cell mdl-cell--3-col mdl-typography--text-right">
                        <label class="mdl-typography--subhead mdl-typography--font-bold mdl-color-text--grey-800">{{ recommendedAccuracy }}</label>
                    </div>
                </div>
            </div>
            <div class="mdl-dialog__actions">
                <button mdl-button class="green-button login-button" (click)="setGoals()" mdl-button-type="raised" mdl-ripple>Set</button>
                <button mdl-button class="close" (click)="closeDialog()" mdl-button-type="raised" mdl-ripple>Cancel</button>
            </div>
        
    `
})
export class RecommendedGoalsResultDialog extends ParentDialog {
    public userSpeed: string;
    public userAccuracy: string;
    public recommendedSpeed: string;
    public recommendedAccuracy: string;
    
    private model: UberApplication;

    constructor(public dialogRef: MatDialogRef<RecommendedGoalsResultDialog>,
                @Inject(MAT_DIALOG_DATA) results: any) {
        super(dialogRef);
        this.model = UberApplication.GetInstance();
        this.init(results);
    }

    private init(results:any) {
        let howFast: number = results.howFast == null ? -1 : results.howFast;
        let howWell: number = results.howWell == null ? -1 : results.howWell;

        if (howWell >= 0) {
        }

        if (howFast >= 0) {
        }

        let params: any = results.status_points;
        this.userSpeed = howFast ? howFast.toString() + " WPM" : "0 WPM";

        let speed: number = 0;

        if (this.model.CurrentProduct.DoPreprocessing) {
            let maxValue: number = this.model.CurrentProduct.Goal_1_max != null ? this.model.CurrentProduct.Goal_1_max : 2000;
            let score: number = howFast;
            if (score <= (maxValue * .01)) {
                speed = (maxValue * .05);
            }
            else if (score <= (maxValue * .025)) {
                speed = (maxValue * .05) + (maxValue * .05) / (maxValue * .015) * (score - (maxValue * .01))
            }
            else if (score <= (maxValue * .1)) {
                speed = (maxValue * .1) + (maxValue * .2) / (maxValue * .075) * (score - (maxValue * .025));
            }
            else if (score <= (maxValue * .25)) {
                speed = (maxValue * .3) + (maxValue * .2) / (maxValue * .15) * (score - (maxValue * .1))
            }
            else if (score <= (maxValue * .5)) {
                speed = (maxValue * .5) + (score - (maxValue * .25))
            }
            else if (score <= (maxValue * .8)) {
                speed = (maxValue * .75) + (maxValue * .25) / (maxValue * .3) * (score - (maxValue * .5));
            }
            else {
                speed = maxValue;
            }

            if (speed < 250) {
                //recommendedGoal2.text = "90";
            }
            else if (speed >= 250 && speed <= 500) {
                //recommendedGoal2.text = "85";
            }
            else {
                //recommendedGoal2.text = "80";
            }

            speed = Math.min(speed, maxValue);
            speed = Math.round(speed / 10) * 10;
            //recommendedGoal1.text = speed.toString();
        }
        else {
            speed = Math.trunc(howFast / 10) * 10 + 20;
            this.recommendedSpeed = howFast ? speed.toString() : "30";
            this.recommendedSpeed = speed <= 300 ? speed.toString() : "300";

            this.userAccuracy = howWell ? howWell.toString() + "%" : "0%";

            let accuracy: number = Math.trunc(howWell / 10) + 90;
            this.recommendedAccuracy = howWell ? accuracy.toString() : "90";
            this.recommendedAccuracy = accuracy <= 100 ? this.recommendedAccuracy : "100";
        }
    }

    public setGoals(): void {
        if (this.model.CurrentProduct.Goal_1_default != null || this.model.CurrentProduct.Goal_2_default != null) {
            this.model.SetGoalsTarget(parseInt(this.recommendedSpeed), parseInt(this.recommendedAccuracy));
        }
        this.closeDialog();
    }
    
    public dispose() {}
}