import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';

export class Grading_Template {
    public static AUTO_GRADER_TYPE: string = "Auto Grader";
    public static TEST_GRADER_TYPE: string = "Test Grader";
    public static ABSOLUTE_METHOD: string = "Absolute";
    public static PERCENTILE_METHOD: string = "Percentile";
    public static GRADE_ON_TYPING_COMPETENCY: string = "Typing Competency";
    public static GRADE_ON_ADJUSTED_SPEED: string = "Adjusted Speed";

    private templateID: number;
    private templateName: string;
    private description: string;
	private dateCreated: Date;
	private type: string;
    private method: string;
	private gradeOn: string;
	private requirement1: number;
    private requirement2: number;
    private requirement3: number;
    private requirement4: number;
    private requirement5: number;
    private requirement6: number;
    private grade1: string;
    private grade2: string;
    private grade3: string;
    private grade4: string;
    private grade5: string;
    private grade6: string;
    private customerID: number;
    private requirements: any[] = [];

    constructor() {
        for (let i = 0; i < 5; i++) {
            this.requirements[i] = {};
        }
    }

    public get TemplateID(): number {
        return this.templateID;
    }

    public set TemplateID(value: number) {
        this.templateID = value;
    }

    public get TemplateName(): string {
        return this.templateName;
    }
    
    public set TemplateName(value: string) {
        this.templateName = value;
    }

    public get Description(): string {
        return this.description;
    }
    
    public set Description(value: string) {
        this.description = value;
    }

    public get DateCreated(): Date {
        return this.dateCreated;
    }

    public set DateCreated(value: Date) {
        this.dateCreated = value;
    }

    public get Type(): string {
        return this.type;
    }

    public set Type(value: string) {
        this.type = value;
    }

    public get Method(): string {
        return this.method;
    }

    public set Method(value: string) {
        this.method = value;
    }

    public get GradeOn(): string {
        return this.gradeOn;
    }

    public set GradeOn(value: string) {
        this.gradeOn = value;
    }

    public get Requirement1(): number {
        return this.requirement1;
    }

    public set Requirement1(value: number) {
        this.requirement1 = value;
    }

    public get Requirement2(): number {
        return this.requirement2;
    }

    public set Requirement2(value: number) {
        this.requirement2 = value;
    }

    public get Requirement3(): number {
        return this.requirement3;
    }

    public set Requirement3(value: number) {
        this.requirement3 = value;
    }

    public get Requirement4(): number {
        return this.requirement4;
    }

    public set Requirement4(value: number) {
        this.requirement4 = value;
    }

    public get Requirement5(): number {
        return this.requirement5;
    }

    public set Requirement5(value: number) {
        this.requirement5 = value;
    }

    public get Requirement6(): number {
        return this.requirement6;
    }

    public set Requirement6(value: number) {
        this.requirement6 = value;
    }

    public get Grade1(): string {
        return this.grade1;
    }

    public set Grade1(value: string) {
        this.grade1 = value;
    }

    public get Grade2(): string {
        return this.grade2;
    }

    public set Grade2(value: string) {
        this.grade2 = value;
    }

    public get Grade3(): string {
        return this.grade3;
    }

    public set Grade3(value: string) {
        this.grade3 = value;
    }

    public get Grade4(): string {
        return this.grade4;
    }

    public set Grade4(value: string) {
        this.grade4 = value;
    }

    public get Grade5(): string {
        return this.grade5;
    }

    public set Grade5(value: string) {
        this.grade5 = value;
    }

    public get Grade6(): string {
        return this.grade6;
    }

    public set Grade6(value: string) {
        this.grade6 = value;
    }

    public get CustomerID(): number {
        return this.customerID
    }

    public set CustomerID(value: number) {
        this.customerID = value;
    }

    private assignRequirementsToArray(): void {
        this.requirements[0].value = this.requirement1;
        this.requirements[1].value = this.requirement2;
        this.requirements[2].value = this.requirement3;
        this.requirements[3].value = this.requirement4;
        this.requirements[4].value = this.requirement5;
        //this.requirements[5].value = this.requirement6;

        this.requirements[0].grade = this.grade1;
        this.requirements[1].grade = this.grade2;
        this.requirements[2].grade = this.grade3;
        this.requirements[3].grade = this.grade4;
        this.requirements[4].grade = this.grade5;
        //this.requirements[5].grade = this.grade6;
    }

    public get RequirementsSortAscending(): any[] {
        this.assignRequirementsToArray();
        this.requirements.sort((a, b) => a.requirement - b.requirement);
        return this.requirements;
    }
    public get RequirementsSortDescending(): any[] {
        this.assignRequirementsToArray();
        this.requirements.sort((a, b) => b.requirement - a.requirement);
        return this.requirements;
    }

    public static fromJson(jsonObject:any): Grading_Template {
        let retVal: Grading_Template = new Grading_Template();
        retVal.TemplateID = jsonObject.Grading_template_id;
        retVal.TemplateName = StringUtils.DecodeFromJSONUri(jsonObject.Template_name);
        retVal.Description = StringUtils.DecodeFromJSONUri(jsonObject.Description);
        retVal.DateCreated = ISO8601Util.parseDateTimeString(jsonObject.Date_created);
        retVal.Type = jsonObject.Type;
        retVal.Method = jsonObject.Method;
        retVal.GradeOn = jsonObject.Grade_on;
        retVal.Requirement1 = jsonObject.Requirement_1;
        retVal.Requirement2 = jsonObject.Requirement_2;
        retVal.Requirement3 = jsonObject.Requirement_3;
        retVal.Requirement4 = jsonObject.Requirement_4;
        retVal.Requirement5 = jsonObject.Requirement_5;
        retVal.Requirement6 = jsonObject.Requirement_6;
        retVal.Grade1 = jsonObject.Grade_1;
        retVal.Grade2 = jsonObject.Grade_2;
        retVal.Grade3 = jsonObject.Grade_3;
        retVal.Grade4 = jsonObject.Grade_4;
        retVal.Grade5 = jsonObject.Grade_5;
        retVal.Grade6 = jsonObject.Grade_6;
        retVal.CustomerID = jsonObject.Customer_id;
        return retVal;
    }

    public toJson(): any {
        let jsonObject: any = 
        {
            Grading_template_id: this.TemplateID,
            Template_name: StringUtils.EncodeToJSONUri(this.TemplateName),
            Description: StringUtils.EncodeToJSONUri(this.Description),
            Date_created: ISO8601Util.formatExtendedDateTime(this.DateCreated),
            Type: this.Type,
            Method: this.Method,
            Grade_on: this.GradeOn,
            Requirement_1: this.Requirement1,
            Requirement_2: this.Requirement2,
            Requirement_3: this.Requirement3,
            Requirement_4: this.Requirement4,
            Requirement_5: this.Requirement5,
            Requirement_6: this.Requirement6,
            Grade_1: this.Grade1,
            Grade_2: this.Grade2,
            Grade_3: this.Grade3,
            Grade_4: this.Grade4,
            Grade_5: this.Grade5,
            Grade_6: this.Grade6,
            Customer_id: this.CustomerID
        }
        return jsonObject;
    }
}