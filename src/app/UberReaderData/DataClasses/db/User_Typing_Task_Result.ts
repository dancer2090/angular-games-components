/** 
 * Author: Jomelyn Aldave
 * Date Created: May 10, 2018
 * Description: Represents the result that is given after a user takes a typing test
 **/

import { ISO8601Util } from '../../Utils/ISO8601Util';
import { StringUtils } from '../../Utils/StringUtils';

export class UserTypingTaskResult {
    private userId: number;
    private typingTaskId: number;    
    private dateCompleted: Date;
    private attempts: number;
    private speed: number;
    private accuracy: number;
    private adjustedSpeed: number;
    private score: number;
    private grade: string;    
    private errorCount: number;
    private textPercentage: number;
    private hasReplay: boolean;

    public get UserId(): number {
        return this.userId;
    }

    public set UserId(value: number) {
        this.userId = value
    }

    public get TypingTaskId(): number {
        return this.typingTaskId;
    }

    public set TypingTaskId(value: number) {
        this.typingTaskId = value
    }

    public get DateCompleted(): Date {
        return this.dateCompleted;
    }

    public set DateCompleted(value: Date) {
        this.dateCompleted = value
    }

    public get Attempts(): number {
        return this.attempts;
    }

    public set Attempts(value: number) {
        this.attempts = value
    }

    public get Speed(): number {
        return this.speed;
    }

    public set Speed(value: number) {
        this.speed = value
    }

    public get Accuracy(): number {
        return this.accuracy;
    }

    public set Accuracy(value: number) {
        this.accuracy = value
    }

    public get AdjustedSpeed(): number {
        return this.adjustedSpeed;
    }

    public set AdjustedSpeed(value: number) {
        this.adjustedSpeed = value
    }   

    public get Grade(): string {
        return this.grade;
    }

    public set Grade(value: string) {
        this.grade = value
    }

    public get Score(): number {
        return this.score;
    }

    public set Score(value: number) {
        this.score = value
    }

    public get ErrorCount(): number {
        return this.errorCount;
    }

    public set ErrorCount(value: number) {
        this.errorCount = value
    }

    public get TextPercentageOfCompletion(): number {
        return this.textPercentage;
    }

    public set TextPercentageOfCompletion(value: number) {
        this.textPercentage = value
    }

    public get HasReplay(): boolean {
        return this.hasReplay;
    }

    public set HasReplay(value: boolean) {
        this.hasReplay = value;
    }

    public static fromJson(jsonObject: any): UserTypingTaskResult {
        let retVal: UserTypingTaskResult = new UserTypingTaskResult();
        retVal.UserId = jsonObject.User_id;
        retVal.TypingTaskId = jsonObject.Typing_test_id;
        retVal.DateCompleted = ISO8601Util.parseDateTimeString(jsonObject.Date_completed);
        retVal.Attempts = jsonObject.Attempts;
        retVal.Speed = jsonObject.Speed;
        retVal.Accuracy = jsonObject.Accuracy;
        retVal.AdjustedSpeed = jsonObject.Adjusted_speed;
        retVal.Score = jsonObject.Score;
        retVal.ErrorCount = jsonObject.Error_count;
        retVal.TextPercentageOfCompletion = jsonObject.Percentage_complete;
        retVal.HasReplay = jsonObject.HasReplay;
        return retVal;
    }

    public toJson(): any {
        let jsonObject: any = {
            User_id: this.UserId,
            Typing_test_id: this.typingTaskId,
            Date_completed: ISO8601Util.formatExtendedDateTime(this.DateCompleted),
            Attempts: this.Attempts,
            Speed: this.Speed,
            Accuracy: this.Accuracy,
            Adjusted_speed: this.AdjustedSpeed,
            Score: this.Score,
            Error_count: this.ErrorCount,
            Percentage_complete: this.TextPercentageOfCompletion
        };
        return jsonObject;
    }
}