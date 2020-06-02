import { UberApplicationEvent } from './UberApplicationEvent';
import { ProxyLessonPlan } from '../DataClasses/other/ProxyLessonPlan';

export class LessonPlanSyncEvent extends UberApplicationEvent {
    public static LESSON_PLAN_SYNC: string = "lessonPlanSync";
    
    private lessonPlans:ProxyLessonPlan[];

    public get LessonPlans(): ProxyLessonPlan[] {
        return this.lessonPlans;
    }

    constructor(type: string, lessonPlans: ProxyLessonPlan[]) {
        super(type);
        this.lessonPlans = lessonPlans;
    }
    
    public clone():UberApplicationEvent {
        return new LessonPlanSyncEvent(this.type, this.lessonPlans);
    }
}