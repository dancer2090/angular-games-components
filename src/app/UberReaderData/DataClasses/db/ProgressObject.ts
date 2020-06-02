import { StringUtils } from '../../Utils/StringUtils';
export class ProgressObject {
    private name: string;
    private lessonPlanId: number;
    private courseCategoryId: number;
    private courseId: number;
    private steps_completed: number;
    private total_steps: number;
    private percentage_completed: number;
    private children: ProgressObject[];
    private level: number;
    
    //4th level child
    private courseActivityId: number;
    private completed: boolean;
    private hasReplayData: boolean;

    public get Name(): string {
        return this.name;
    }

    public set Name(value: string) {
        this.name = value
    }

    public get Steps_completed(): number {
        return this.steps_completed;
    }

    public set Steps_completed(value: number) {
        this.steps_completed = value
    }

    public get Total_steps(): number {
        return this.total_steps;
    }

    public set Total_steps(value: number) {
        this.total_steps = value
    }

    public get Percentage_completed(): number {
        return this.percentage_completed;
    }

    public set Percentage_completed(value: number) {
        this.percentage_completed = value
    }

    public get Children(): ProgressObject[] {
        return this.children;
    }

    public set Children(value: ProgressObject[]) {
        this.children = value
    }

    public get Level(): number {
        return this.level;
    }

    public set Level(value: number) {
        this.level = value
    }

    public get ObjectID(): number {
        if (this.lessonPlanId != null) {
            return this.lessonPlanId;
        }
        
        if (this.courseCategoryId != null) {
            return this.courseCategoryId;
        }

        if (this.courseId != null) {
            return this.courseId;
        }

        if (this.courseActivityId != null) {
            return this.courseActivityId;
        }
    }

    public get Completed(): boolean {
        return this.completed;
    }

    public set Completed(value: boolean) {
        this.completed = value
    }

    public get HasReplayData(): boolean {
        return this.hasReplayData;
    }

    public set HasReplayData(value: boolean) {
        this.hasReplayData = value
    }

    public static fromJson(jsonObject: any): ProgressObject {
        let retVal: ProgressObject = new ProgressObject();
        retVal.Name = jsonObject.Name;
        retVal.Steps_completed = jsonObject.Steps_completed;
        retVal.Total_steps = jsonObject.Total_steps;
        retVal.Percentage_completed = jsonObject.Percentage_compelte;
        retVal.lessonPlanId = jsonObject.Lesson_plan_id;
        retVal.courseCategoryId = jsonObject.Course_category_id;
        retVal.courseId = jsonObject.Course_id;
        retVal.courseActivityId = jsonObject.Course_activity_id;
        retVal.Completed = jsonObject.Completed;
        retVal.HasReplayData = jsonObject.Has_replay_data;
        retVal.Children = [];

        if (jsonObject.Children != null) {
            for (let child of jsonObject.Children) {
                retVal.Children.push(ProgressObject.fromJson(child));
            }
        }

        return retVal;
    }

    public toJson(): any {
        let jsonObject: any = {
            
        };
        return jsonObject;
    }
}