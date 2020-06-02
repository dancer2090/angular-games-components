import { ProxyCourse } from '../other/ProxyCourse';

export class Lesson_Plan_Course_Category {
    private lesson_plan_course_category_id: number;
    private lesson_plan_id: number;
    private course_category_id:number;

    public get Lesson_plan_course_category_id(): number {
        return this.lesson_plan_course_category_id;
    }

    public set Lesson_plan_course_category_id(value:number) {
        this.lesson_plan_course_category_id = value;
    }

    public get Lesson_plan_id(): number {
        return this.lesson_plan_id;
    }

    public set Lesson_plan_id(value:number) {
        this.lesson_plan_id = value;
    }

    public get Course_category_id():number {
        return this.course_category_id;
    }

    public set Course_category_id(value:number) {
        this.course_category_id = value;
    }

    public static fromJson(jsonObject:any):Lesson_Plan_Course_Category {
        let retVal:Lesson_Plan_Course_Category = new Lesson_Plan_Course_Category();
        retVal.Lesson_plan_course_category_id = jsonObject.Lesson_plan_course_category_id;
        retVal.Lesson_plan_id = jsonObject.Lesson_plan_id;
        retVal.Course_category_id = jsonObject.Course_category_id;        
        return retVal;
    }
}