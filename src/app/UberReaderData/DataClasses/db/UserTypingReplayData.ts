import { ISO8601Util } from '../../Utils/ISO8601Util';

export class UserTypingReplayData {
    private userId: number;
    private courseActivityId: number;
    private typingTaskId: number;
    private dateRecorded: Date;
    private replayData: any[];
    private replayStartingPos: number;
    private speed: number;
    private accuracy: number;

    public get UserId(): number {
        return this.userId;
    }

    public set UserId(value: number) {
        this.userId = value;
    }

    public get CourseActivityId(): number {
        return this.courseActivityId;
    }

    public set CourseActivityId(value: number) {
        this.courseActivityId = value;
    }

    public get TypingTaskId(): number {
        return this.typingTaskId;
    }

    public set TypingTaskId(value: number) {
        this.typingTaskId = value;
    }

    public get DateRecorded(): Date {
        return this.dateRecorded;
    }

    public set DateRecorded(value: Date) {
        this.dateRecorded = value;
    }

    public get ReplayData(): any[] {
        return this.replayData;
    }

    public set ReplayData(value: any[]) {
        this.replayData = value;
    }

    public set ReplayStartingPos(value: number) {
        this.replayStartingPos = value;
    }

    public get ReplayStartingPos(): number {
        return this.replayStartingPos;
    }

    public set Speed(value: number) {
        this.speed = value;
    }

    public get Speed(): number {
        return this.speed;
    }

    public set Accuracy(value: number) {
        this.accuracy = value;
    }

    public get Accuracy(): number {
        return this.accuracy;
    }

    public static fromJson(jsonObject: any): UserTypingReplayData {        
        let retVal: UserTypingReplayData = new UserTypingReplayData();
        retVal.UserId = jsonObject.User_id;
        retVal.CourseActivityId= jsonObject.Course_activity_id;
        retVal.TypingTaskId = jsonObject.Typing_task_id;
        retVal.DateRecorded = ISO8601Util.parseDateTimeString(jsonObject.Date_recorded);
        retVal.ReplayData = jsonObject.Replay_data;
        retVal.ReplayStartingPos = jsonObject.Starting_position;
        retVal.Speed = jsonObject.Speed;
        retVal.Accuracy = jsonObject.Accuracy;
        return retVal;
    }
}