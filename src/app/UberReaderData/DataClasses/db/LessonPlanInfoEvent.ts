
import { LessonPlanInfo } from './LessonPlanInfo';
import { UberApplicationEvent } from '../../Events/UberApplicationEvent';

export class LessonPlanInfoEvent extends UberApplicationEvent {
    public static LESSON_PLAN_INFO_RECEIVED: string = "lessonPlanInfoReceived";
    public static LESSON_PLAN_INFO_ERROR: string = "lessonPlanInfoError";

    private lessonPlanInfo: LessonPlanInfo;
    private errorMessage: string;

    public get LessonPlanInfo(): LessonPlanInfo {
        return this.lessonPlanInfo;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, lessonPlanInfo: LessonPlanInfo = null, errorMessage: string = null) {
        super(type);
        this.lessonPlanInfo = lessonPlanInfo;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new LessonPlanInfoEvent(this.type, this.lessonPlanInfo, this.errorMessage);
    }
}