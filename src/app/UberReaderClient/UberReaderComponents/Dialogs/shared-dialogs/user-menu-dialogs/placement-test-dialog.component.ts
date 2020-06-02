import { Component, OnDestroy, ViewChild } from '@angular/core';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { Question } from '../../../../../UberReaderData/DataClasses/db/Question';
import { ParentDialog } from '../../ParentDialog';
import { MatDialogRef } from '@angular/material';
import { Router, RouterOutlet } from '@angular/router';
import { ActivityService } from 'app/UberReaderActivities/activity.service';
import { Subscription } from 'rxjs';
import { PlacementTest } from 'app/UberReaderData/DataClasses/db/PlacementTest';

const DEFAULT_RECOMMENDED_SPEED: number = 30;
const DEFAULT_RECOMMENDED_ACCURACY: number = 95;

@Component({
    selector: 'placement-test-dialog',
    styleUrls: ['./placement-test-dialog.component.css'],
    templateUrl: './placement-test-dialog.component.html'
})
export class PlacementTestDialog extends ParentDialog implements OnDestroy {
    @ViewChild(RouterOutlet, { static: true }) recommendOutlet: RouterOutlet;

    public displayName: string;
    public screen: string = "welcome";
    public questions: Question[] = [];
    public questionIndex: number = 0;
    public processingAnswer: boolean = false;
    public answerValue: string = "";
    public userSpeed: number;
    public userAccuracy: number;
    public recommendedSpeed: number;
    public recommendedAccuracy: number;
    public hasPassed: boolean = false;
    public isEduUser: boolean = false;

    private model: UberApplication;
    private placementTest: PlacementTest;
    private score: number = 0;
    private answerTimeout: any;
    private finishEventSubscriber: Subscription;
    private questionAnswers: string = "";
    private outletCleared: boolean = false;

    constructor(public dialogRef: MatDialogRef<PlacementTestDialog>, private router: Router, private activityService: ActivityService) {
        super(dialogRef);
        this.model = UberApplication.GetInstance();
        this.displayName = this.model.CurrentUserData.DisplayName;
        this.placementTest = this.model.PlacementTest;
        this.questions = this.placementTest.Test.Questions;
        this.isEduUser = this.model.CurrentUser.IsEduUser;

        this.dialogRef.beforeClosed().subscribe(() => {         
            if (!this.outletCleared) this.router.navigate([{ outlets: { recommendOutlet: null }}], { skipLocationChange: true, replaceUrl: false});
        });
    }

    public submitAnswer(value: string): void {
        this.answerValue = value;
        this.questionAnswers += this.questionIndex == this.questions.length - 1? value : value + ";";
        this.processingAnswer = true;
        clearTimeout(this.answerTimeout);

        this.answerTimeout = setTimeout(() => {
            let correctAnswers = this.questions[this.questionIndex].Correct_answer.split(",");

            if (correctAnswers.indexOf(this.answerValue) != -1) {
                this.score++;
            }

            if (++this.questionIndex >= this.questions.length) {                
                if (this.score < this.questions.length && !this.isEduUser) {
                    this.screen = "results";
                    this.hasPassed = false;
                    this.calculateRecommendedGoals();                    
                    this.model.UpdateUserPref("can_touch_type", "false", true);
                    this.model.StorePlacementTestResults(this.placementTest.PlacementTestID, this.questionAnswers);
                    //this.model.UpdateUserPref("placement_test_results", this.placementTest.BeginnerLessonPlanID + "," + this.placementTest.BeginnerCourseCategoryID + "," + this.placementTest.BegginerCourseID, true);
                }
                else {
                    this.screen = "test";
                    this.activityService.ActivityOutlet = this.activityService.RECOMMEND_OUTLET;

                    if (this.finishEventSubscriber) this.finishEventSubscriber.unsubscribe();
                    this.finishEventSubscriber = this.activityService.finishedSubject.subscribe(results => this.activityFinished(results));

                    if (this.recommendOutlet) this.recommendOutlet.deactivate();
                    this.router.navigate([{ outlets: { recommendOutlet: ['recommend'] } }], { skipLocationChange: true, replaceUrl: false, queryParams: { updateHistory: 0 } });
                }
            }

            this.processingAnswer = false;
            this.answerValue = "";
        }, 1000);
    }

    public startRecommendedCourse(): void {
        this.outletCleared = true;
        if (this.hasPassed) {
            this.router.navigate([{outlets: {recommendOutlet: null, primary: 'courses'}}], {skipLocationChange: true, replaceUrl: false, queryParams: {updateHistory: 0, recommendedCurriculumID: this.placementTest.AdvancedLessonPlanID, recommendedCourseCateryID: this.placementTest.AdvancedCourseCategoryID, recommendedCourseID: this.placementTest.AdvancedCourseID}});
        }
        else {
            this.router.navigate([{outlets: {recommendOutlet: null, primary: 'courses'}}], {skipLocationChange: true, replaceUrl: false, queryParams: {updateHistory: 0, recommendedCurriculumID: this.placementTest.BeginnerLessonPlanID, recommendedCourseCateryID: this.placementTest.BeginnerCourseCategoryID, recommendedCourseID: this.placementTest.BegginerCourseID}});
        }        
        this.closeDialog();
    }

    public startBeginnerCourse(): void {
        this.outletCleared = true;
        this.router.navigate([{outlets: {recommendOutlet: null, primary: 'courses'}}], {skipLocationChange: true, replaceUrl: false, queryParams: {updateHistory: 0, recommendedCurriculumID: this.placementTest.BeginnerLessonPlanID, recommendedCourseCateryID: this.placementTest.BeginnerCourseCategoryID, recommendedCourseID: this.placementTest.BegginerCourseID}});
        this.closeDialog();
    }

    public setGoals(): void {
        if (this.model.CurrentProduct.Goal_1_default != null || this.model.CurrentProduct.Goal_2_default != null) {
            this.model.SetGoalsTarget(this.recommendedSpeed, this.recommendedAccuracy);
        }
        this.closeDialog(true);
    }

    private activityFinished(results: any): void {
        if (this.finishEventSubscriber) this.finishEventSubscriber.unsubscribe();
        if (this.recommendOutlet) this.recommendOutlet.deactivate();
        this.activityService.ActivityOutlet = "";

        this.screen = "results";
        this.userSpeed = results.howFast;
        this.userAccuracy = results.howWell;        

        if (this.score < this.questions.length) {    
            this.hasPassed = false;   
            this.model.UpdateUserPref("can_touch_type", "false", true);
        }
        else {
            if (this.userSpeed >= this.placementTest.RequiredSpeed && this.userAccuracy >= this.placementTest.RequiredAccuracy) {
                this.hasPassed = true;
                this.model.UpdateUserPref("can_touch_type", "true", true);
                //this.model.UpdateUserPref("placement_test_results", this.placementTest.AdvancedLessonPlanID + "," + this.placementTest.AdvancedCourseCategoryID + "," + this.placementTest.AdvancedCourseID, true);
            }
            else {
                this.hasPassed = false;
                this.model.UpdateUserPref("can_touch_type", "false", true);
                //this.model.UpdateUserPref("placement_test_results", this.placementTest.BeginnerLessonPlanID + "," + this.placementTest.BeginnerCourseCategoryID + "," + this.placementTest.BegginerCourseID, true);
            }
        }

        if(results.overall && results.overall.length > 0) {      
            let overallResults: any[] = results.overall;
            if(results.howWell  != null && results.howWell  >= 0) {
                let howWellResult = {tag1: null, tag2: null, key: "how_well", value: results.howWell, storeVocabValues: false};
                overallResults.push(howWellResult);
            }
            
            if(results.howFast  != null && results.howFast  >= 0) {
                let howFastResult = {tag1: null, tag2: null, key: "how_fast", value: results.howFast, storeVocabValues: false};									
                overallResults.push(howFastResult);
            }
            this.model.StoreResults(overallResults);     
        }

        this.calculateRecommendedGoals(this.userSpeed, this.userAccuracy);
        this.model.StorePlacementTestResults(this.placementTest.PlacementTestID, this.questionAnswers, this.userSpeed, this.userAccuracy);
    }

    private calculateRecommendedGoals(userSpeed?: number, userAccuracy?: number): void {
        if (userSpeed != null) {
            this.recommendedSpeed = Math.min(Math.trunc(userSpeed / 10) * 10 + 20, 300);
        }
        else {
            this.recommendedSpeed = DEFAULT_RECOMMENDED_SPEED;
        }

        if (userAccuracy != null) {
            this.recommendedAccuracy = Math.min(Math.trunc(userAccuracy / 10) + 90, 100);
        }
        else {
            this.recommendedAccuracy = DEFAULT_RECOMMENDED_ACCURACY;
        }
    }

    /**     
     * @param data - boolean; set to true if test was completed, otherwise set to false
     */
    public closeDialog(data?: any) {
        super.closeDialog(data);
        if (data == null) return;
        
        if (data) {
            this.model.showMdlAlertDialog("Initial Test is complete. You can redo this anytime via the user menu on the right.");
        }
        else {
            this.model.showMdlAlertDialog("You can restart the initial test from the user menu on the right.");
        }
    }

    ngOnDestroy() {
        if (!this.outletCleared) this.router.navigate([{ outlets: { recommendOutlet: null }}], { skipLocationChange: true, replaceUrl: false});
        if (this.finishEventSubscriber) this.finishEventSubscriber.unsubscribe();
        if (this.recommendOutlet) this.recommendOutlet.deactivate();        
    }
}