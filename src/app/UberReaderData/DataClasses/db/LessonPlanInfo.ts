import { StringUtils } from '../../Utils/StringUtils';

export class LessonPlanInfo {

    private lesson_plan_id: number;
    private product_id: number;
    private name: string;
    private description: string;
    private section_title_1: string;
    private section_title_2: string;
    private section_title_3: string;
    private section_title_4: string;
    private section_title_5: string;
    private section_content_1: string;
    private section_content_2: string;
    private section_content_3: string;
    private section_content_4: string;
    private section_content_5: string;


    public get Lesson_plan_id(): number {
        return this.lesson_plan_id;
    }

    public set Lesson_plan_id(value:number) {
        this.lesson_plan_id = value;
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
    
    public get Section_title_1(): string {
        return this.section_title_1;
    }

    public set Section_title_1(value: string) {
        this.section_title_1 = value;
    }

    public get Section_title_2(): string {
        return this.section_title_2;
    }

    public set Section_title_2(value: string) {
        this.section_title_2 = value;
    }

    public get Section_title_3(): string {
        return this.section_title_3;
    }

    public set Section_title_3(value: string) {
        this.section_title_3 = value;
    }

    public get Section_title_4(): string {
        return this.section_title_4;
    }

    public set Section_title_4(value: string) {
        this.section_title_4 = value;
    }

    public get Section_title_5(): string {
        return this.section_title_5;
    }

    public set Section_title_5(value: string) {
        this.section_title_5 = value;
    }

    public get Section_content_1(): string {
        return this.section_content_1;
    }

    public set Section_content_1(value: string) {
        this.section_content_1 = value;
    }

    public get Section_content_2(): string {
        return this.section_content_2;
    }

    public set Section_content_2(value: string) {
        this.section_content_2 = value;
    }

    public get Section_content_3(): string {
        return this.section_content_3;
    }

    public set Section_content_3(value: string) {
        this.section_content_3 = value;
    }

    public get Section_content_4(): string {
        return this.section_content_4;
    }

    public set Section_content_4(value: string) {
        this.section_content_4 = value;
    }

    public get Section_content_5(): string {
        return this.section_content_5;
    }

    public set Section_content_5(value: string) {
        this.section_content_5 = value;
    }

    public static fromJson(jsonObject:any): LessonPlanInfo {
        let retVal:LessonPlanInfo = new LessonPlanInfo();

        retVal.Lesson_plan_id = jsonObject.Lesson_plan_id;
        retVal.Product_id = jsonObject.Product_id;
        retVal.Name = jsonObject.Name;
        retVal.Description = jsonObject.Description;

        retVal.Section_title_1 = StringUtils.DecodeFromJSONUri(jsonObject.Section_title_1);
        retVal.Section_title_2 = StringUtils.DecodeFromJSONUri(jsonObject.Section_title_2);
        retVal.Section_title_3 = StringUtils.DecodeFromJSONUri(jsonObject.Section_title_3);
        retVal.Section_title_4 = StringUtils.DecodeFromJSONUri(jsonObject.Section_title_4);
        retVal.Section_title_5 = StringUtils.DecodeFromJSONUri(jsonObject.Section_title_5);

        retVal.Section_content_1 = StringUtils.DecodeFromJSONUri(jsonObject.Section_content_1);
        retVal.Section_content_2 = StringUtils.DecodeFromJSONUri(jsonObject.Section_content_2);
        retVal.Section_content_3 = StringUtils.DecodeFromJSONUri(jsonObject.Section_content_3);
        retVal.Section_content_4 = StringUtils.DecodeFromJSONUri(jsonObject.Section_content_4);
        retVal.Section_content_5 = StringUtils.DecodeFromJSONUri(jsonObject.Section_content_5);

        return retVal;
    }
}