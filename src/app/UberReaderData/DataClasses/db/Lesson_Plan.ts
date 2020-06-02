import { Lesson_Plan_Course_Category } from './Lesson_Plan_Course_Category';

export class Lesson_Plan {

    private lesson_plan_id: number;
    private topic_id: number;
    private product_id: number;
    private name: string;
    private description: string;
    private sequence: any;
    // private lesson_plan_course_categories: Lesson_Plan_Course_Category[];

    public get Lesson_plan_id(): number {
        return this.lesson_plan_id;
    }

    public set Lesson_plan_id(value:number) {
        this.lesson_plan_id = value;
    }
    
    public get Topic_id(): number {
        return this.topic_id;
    }

    public set Topic_id(value: number) {
        this.topic_id = value;
    }

    public get Product_id(): number {
        return this.product_id;
    }

    public set Product_id(value:number) {
        this.product_id = value;
    }

    public get Name(): string {
        return this.name;
    }

    public set Name(value: string) {
        this.name = value;
    }

    public get Description(): string {
        return this.description;
    }

    public set Description(value: string) {
        this.description = value;
    }
    
    public get Sequence(): any {
        return this.sequence;
    }

    public set Sequence(value:any) {
        this.sequence = value;
    }

    // public get Lesson_Plan_Course_Categories(): Lesson_Plan_Course_Category[] {
    //     return this.lesson_plan_course_categories;
    // }

    // public set Lesson_Plan_Course_Categories(value:Lesson_Plan_Course_Category[]) {
    //     this.lesson_plan_course_categories = value;
    // }
    
    public static fromJson(jsonObject:any): Lesson_Plan {
        console.log("LESSON PLAN OBJ: ", jsonObject);
        let retVal:Lesson_Plan = new Lesson_Plan();
        retVal.Lesson_plan_id = jsonObject.Lesson_plan_id;
        retVal.Topic_id = jsonObject.Topic_id;
        retVal.Product_id = jsonObject.Product_id;
        retVal.Name = jsonObject.Name;
        retVal.Description = jsonObject.Description;
        retVal.Sequence = jsonObject.Sequence;

        // let lesson_plan_course_categories: Lesson_Plan_Course_Category[] = [];
        // let categories = jsonObject.Lesson_Plan_Course_Category;
        // for(let category of categories) {
        //     lesson_plan_course_categories.push(Lesson_Plan_Course_Category.fromJson(category));
        // }
        // retVal.Lesson_Plan_Course_Categories = lesson_plan_course_categories;
        return retVal;
    }
}