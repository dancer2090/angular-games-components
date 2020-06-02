// Age_group (sttring)
// Num_course_categories (int)
// Num_courses (int)
// Num_course_activities (int)
// Estimated_time (int)
export class ProxyLessonPlan {
    private lesson_plan_id: number;
    private topic_id: number;
    private product_id: number;
    private name: string;
    private description: string;
    private sequence: any;
    private age_group: string;    
    private num_course_categories: number;
    private num_courses: number;
    private num_course_activities: number;
    private estimated_time: number;

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

    public get AgeGroup(): string {
        return this.age_group;
    }

    public set AgeGroup(value: string) {
        this.age_group = value;
    }

    public get NumCourseCategories(): number {
        return this.num_course_categories;
    }

    public set NumCourseCategories(value: number) {
        this.num_course_categories = value;
    }

    public get NumCourses(): number {
        return this.num_courses;
    }

    public set NumCourses(value: number) {
        this.num_courses = value;
    }

    public get NumCourseActivities(): number {
        return this.num_course_activities;
    }

    public set NumCourseActivities(value: number) {
        this.num_course_activities = value;
    }

    public get EstimatedTime(): number {
        return this.estimated_time;
    }

    public set EstimatedTime(value: number) {
        this.estimated_time = value;
    }

    public static fromJson(jsonObject:any): ProxyLessonPlan {
        let retVal: ProxyLessonPlan = new ProxyLessonPlan();
        retVal.Lesson_plan_id = jsonObject.Lesson_plan_id;
        retVal.Topic_id = jsonObject.Topic_id;
        retVal.Product_id = jsonObject.Product_id;
        retVal.Name = jsonObject.Name;
        retVal.Description = jsonObject.Description;
        retVal.Sequence = jsonObject.Sequence;
        retVal.AgeGroup = jsonObject.Age_group;
        retVal.NumCourseCategories = jsonObject.Num_course_categories;
        retVal.NumCourses = jsonObject.Num_courses;
        retVal.NumCourseActivities = jsonObject.Num_course_activities;
        retVal.EstimatedTime = jsonObject.Estimated_time;
        return retVal;
    }
}