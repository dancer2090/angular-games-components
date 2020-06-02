export class Group_Lesson_Plan {

    private group_lesson_plan_id: number;
    private lesson_plan_id: number;
    private group_id: number;

    public get Group_Lesson_Plan_id(): number {
        return this.group_lesson_plan_id;
    }

    public set Group_Lesson_Plan_id(value:number) {
        this.group_lesson_plan_id = value;
    }

    public get Lesson_plan_id(): number {
        return this.lesson_plan_id;
    }

    public set Lesson_plan_id(value:number) {
        this.lesson_plan_id = value;
    }
    
    public get Group_id(): number {
        return this.group_id;
    }

    public set Group_id(value:number) {
        this.group_id = value;
    }
    
    public static fromJson(jsonObject:any): Group_Lesson_Plan {
        let retVal:Group_Lesson_Plan = new Group_Lesson_Plan();
        retVal.Group_Lesson_Plan_id = jsonObject.Group_lesson_plan_id;
        retVal.Lesson_plan_id = jsonObject.Lesson_plan_id;
        retVal.Group_id = jsonObject.Group_id;
        return retVal;
    }
}