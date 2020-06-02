import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { TypingTask } from 'app/UberReaderData/DataClasses/db/Typing_Task';
import { Course_Activity } from '../UberReaderData/DataClasses/db/Course_Activity';

//@Injectable()
export class ActivityService {
    TIMER_PERIOD: number = 33;
    CHARS_PER_WORD: number = 6;
    RECOMMEND_OUTLET: string = "recommend";
    TYPING_TEST_OUTLET: string = "typingTest";
    TYPING_TASK_PREVIEW: string = "typingTaskPreview";
    TYPING_TASK_REPLAY: string = "typingTaskReplay";
    COURSE_STEP_REPLAY: string = "courseStepReplay";

    public emptyResultSubject: Subject<any> = new Subject();
    public notFinishedSubject: Subject<any> = new Subject();
    public finishedSubject: Subject<any> = new Subject();
    public pausedSubject: Subject<boolean> = new Subject();
    public forceStopSubject: Subject<any> = new Subject();
    public preferencesChangedSubject: Subject<any> = new Subject();
    public showTrainingHelpSubject: Subject<boolean> = new Subject();
    public skipToNextRecommendedActivity: Subject<any> = new Subject();
    public goToNextRecommendedExercise: Subject<any> = new Subject();
    public goToNextRecommendedExercise2: Subject<any> = new Subject();

    public typingTaskId: number;
    private activityResults: any;
    private resultsPerChar: any[] = [];
    private replayData: any[] = [];
    private replayStartingPosition: number = -1;
    private wpmReplayData: any[] = [];
    private activityOutlet: string = "";
    private hasActivityRef: boolean = false;
    private activityIsPaused: boolean = false;
    private activityToPreview: TypingTask;
    private courseStepReplayData: any;
    private isActivityView: boolean = false;
    private activityRef: any;
    public callbacks:any[] = [];

    public get ActivityRef(): any {
        return this.activityRef;
    }

    public set ActivityRef(value: any) {
        this.activityRef = value;
    }

    public set ActivityResults(activityResults: any) {
        this.activityResults = activityResults;
        this.activityResults.overall = this.resultsPerChar;
    }

    public get ActivityResults(): any {
        return this.activityResults;
    }

    public get ActivityToPreview(): TypingTask {
        return this.activityToPreview;
    }

    public set ActivityToPreview(value: TypingTask) {
        this.activityToPreview = value;
    }

    public set CourseStepReplayData(value: any) {
        this.courseStepReplayData = value;
    }

    public get CourseStepReplayData(): any {
        return this.courseStepReplayData;
    }

    public get ActivityOutlet(): string {
        return this.activityOutlet
    }

    public set ActivityOutlet(outlet: string) {
        this.activityOutlet = outlet;
    }

    public set ReplayData(replayData: any[]) {
        this.replayData = replayData;
    }

    public get ReplayData(): any[] {
        return this.replayData;
    }

    public set ReplayStartingPos(value: number) {
        this.replayStartingPosition = value;
    }

    public get ReplayStartingPos(): number {
        return this.replayStartingPosition;
    }

    public pushResultPerChar(result: any): void {
        let resultObject1 = {
            tag1: result.tag1,
            tag2: null,
            key: "how_fast",
            value: result.howFast,
            storeVocabValues: true
        };

        let resultObject2 = {
            tag1: result.tag1,
            tag2: result.tag2,
            key: "how_well",
            value: result.howWell,
            storeVocabValues: true
        };

        this.resultsPerChar.push(resultObject1);
        this.resultsPerChar.push(resultObject2);
    }

    public addReplayData(time: number, pressedKeyObj: any) {
        this.replayData.push([time, pressedKeyObj.char, pressedKeyObj.keyCode, pressedKeyObj.charCode])
    }

    public addWPMReplayData(wpm: number) {
        this.wpmReplayData.push(wpm)
    }

    public sendResults(activityResults: any, isFinished: boolean): void {
        this.activityResults = activityResults;
        this.activityResults.overall = this.resultsPerChar;
        this.activityResults.replayData = this.replayData;
        this.activityResults.replayData.push(this.wpmReplayData);

        if (isFinished) {
            this.finishedSubject.next(this.activityResults);
        }
        else {
            this.notFinishedSubject.next(this.activityResults);
        }
    }

    public sendEmptyResult(activityResults: any): void {
        this.emptyResultSubject.next(activityResults);
    }

    public pause(value: boolean): void {
        if (this.hasActivityRef) {
            this.pausedSubject.next(value);
        }
    }

    public get ActivityIsPaused(): boolean {
        return this.activityIsPaused;
    }

    public set ActivityIsPaused(value: boolean) {
        this.activityIsPaused = value;
    }

    public set HasActivityRef(value: boolean) {
        this.hasActivityRef = value;
        this.isActivityView = value;
    }

    public get IsActivityView(): boolean {
        return this.isActivityView;
    }

    public set IsActivityView(value: boolean) {
        this.isActivityView = value;
    }

    public resetData(): void {
        this.activityResults = {};
        this.resultsPerChar = [];
        this.wpmReplayData = [];
    }
}
