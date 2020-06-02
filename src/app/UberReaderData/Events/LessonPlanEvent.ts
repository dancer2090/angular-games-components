import { Course_Category } from '../DataClasses/db/Course_Category';
import { UberApplicationEvent } from './UberApplicationEvent';
import { Lesson_Plan } from '../DataClasses/db/Lesson_Plan';

export class LessonPlanEvent extends UberApplicationEvent {
    public static LESSONPLAN_RECEIVED: string = "lessonPlanReceived";
    public static LESSONPLAN_ERROR: string = "lessonPlanError";
    
    private lessonPlan:Lesson_Plan;
    private courseCategories:Course_Category[] = [];

    public get LessonPlan(): Lesson_Plan {
        return this.lessonPlan;
    }

    public get CourseCategories(): Course_Category[] {
        return this.courseCategories;
    }

    constructor(type:string, lesson_plan:Lesson_Plan, courseCategories:Course_Category[]) {
        super(type);
        this.lessonPlan = lesson_plan;
        this.courseCategories = courseCategories;
    }
    
    public clone():UberApplicationEvent {
        return new LessonPlanEvent(this.type, this.lessonPlan, this.courseCategories);
    }
}