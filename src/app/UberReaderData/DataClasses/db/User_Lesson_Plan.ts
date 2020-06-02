import { ISO8601Util } from 'app/UberReaderData/Utils/ISO8601Util';

export class UserLessonPlan {
    private userLessonPlanID: number;
    private userID: number;
    private lessonPlanID: number;
    private stepsCompleted: number;
    private enabled: boolean;
    private lastUpdated: Date;

    public get UserLessonPlanID(): number {
        return this.userLessonPlanID;
    }

    public set UserLessonPlanID(value: number) {
        this.userLessonPlanID = value;
    }

    public get UserID(): number {
        return this.userID;
    }

    public set UserID(value: number) {
        this.userID = value;
    }

    public get LessonPlanID(): number {
        return this.lessonPlanID;
    }

    public set LessonPlanID(value: number) {
        this.lessonPlanID = value;
    }

    public get StepsCompleted(): number {
        return this.stepsCompleted;
    }

    public set StepsCompleted(value: number) {
        this.stepsCompleted = value;
    }

    public get Enabled(): boolean {
        return this.enabled;
    }

    public set Enabled(value: boolean) {
        this.enabled = value;
    }

    public get LastUpdated(): Date {
        return this.lastUpdated;
    }

    public set LastUpdated(value: Date) {
        this.lastUpdated = value;
    }

    public static fromJson(jsonObject: any): UserLessonPlan {
        let retVal: UserLessonPlan = new UserLessonPlan;
        retVal.UserLessonPlanID = jsonObject.User_lesson_plan_id;
        retVal.UserID = jsonObject.User_id;
        retVal.LessonPlanID = jsonObject.Lesson_plan_id;
        retVal.StepsCompleted = jsonObject.Steps_completed;
        retVal.Enabled = jsonObject.Enabled;
        retVal.LastUpdated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        return retVal;
    }

    public toJson(): any {
        let jsonObject: any =
        {
            User_lesson_plan_id: this.UserLessonPlanID,
            User_id: this.UserID,
            Lesson_plan_id: this.LessonPlanID,
            Steps_completed: this.StepsCompleted,
            Enabled: this.Enabled,
            Last_updated: ISO8601Util.formatExtendedDateTime(this.LastUpdated),
        };

        return jsonObject;
    }
}