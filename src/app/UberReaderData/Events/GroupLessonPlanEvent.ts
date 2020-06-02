import { Course_Category } from '../DataClasses/db/Course_Category';
import { UberApplicationEvent } from './UberApplicationEvent';
import { Lesson_Plan } from '../DataClasses/db/Lesson_Plan';
import { Group_Lesson_Plan } from '../DataClasses/db/Group_Lesson_Plan';

export class GroupLessonPlanEvent extends UberApplicationEvent {
    public static GROUP_LESSON_PLANS_RECEIVED: string = "groupLessonPlansReceived";
    public static GROUP_LESSON_PLANS_ERROR: string = "groupLessonPlansError";
    
    private groupLessonPlans:Group_Lesson_Plan[] = [];
    private errorMessage: string;

    public get GroupLessonPlans(): Group_Lesson_Plan[] {
        return this.groupLessonPlans;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type:string, groupLessonPlans:Group_Lesson_Plan[], errorMessage: string = null) {
        super(type);
        this.groupLessonPlans = groupLessonPlans;
        this.errorMessage = errorMessage;
    }
    
    public clone():UberApplicationEvent {
        return new GroupLessonPlanEvent(this.type, this.groupLessonPlans, this.errorMessage);
    }
}