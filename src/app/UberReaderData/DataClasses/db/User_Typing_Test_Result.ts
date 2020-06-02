/** 
 * Author: Jomelyn Aldave
 * Date Created: May 10, 2018
 * Description: Represents the result that is given after a user takes a typing test
 **/

import { ISO8601Util } from '../../Utils/ISO8601Util';
import { StringUtils } from '../../Utils/StringUtils';

export class UserTypingTestResult {
    private userId: number;
    private typingTestId: number;    
    private dateCompleted: Date;
    private attempts: number;
    private speed: number;
    private accuracy: number;
    private adjustedSpeed: number;    

    public get UserId(): number {
        return this.userId;
    }

    public set UserId(value: number) {
        this.userId = value
    }

    public get TypingTestId(): number {
        return this.typingTestId;
    }

    public set TypingTestId(value: number) {
        this.typingTestId = value
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

    public static fromJson(jsonObject: any): UserTypingTestResult {
        let retVal: UserTypingTestResult = new UserTypingTestResult();
        retVal.UserId = jsonObject.User_id;
        retVal.TypingTestId = jsonObject.Typing_test_id;
        retVal.DateCompleted = ISO8601Util.parseDateTimeString(jsonObject.Date_completed);
        retVal.Attempts = jsonObject.Attempts;
        retVal.Speed = jsonObject.Speed;
        retVal.Accuracy = jsonObject.Accuracy;
        retVal.AdjustedSpeed = jsonObject.Adjusted_speed;
        return retVal;
    }

    public toJson(): any {
        let jsonObject: any = {
            User_id: this.UserId,
            Typing_test_id: this.TypingTestId,
            Date_completed: ISO8601Util.formatExtendedDateTime(this.DateCompleted),
            Attempts: this.Attempts,
            Speed: this.Speed,
            Accuracy: this.Accuracy,
            Adjusted_speed: this.AdjustedSpeed            
        };
        return jsonObject;
    }
}