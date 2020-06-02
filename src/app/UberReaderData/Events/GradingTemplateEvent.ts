import { TypingTest } from '../DataClasses/db/Typing_Test';
import { UberApplicationEvent } from './UberApplicationEvent';
import { Grading_Template } from '../DataClasses/db/Grading_Template';

export class GradingTemplateEvent extends UberApplicationEvent {
    public static GRADING_TEMPLATE_CREATED: string = "gradingTemplateCreated";
    public static GRADING_TEMPLATE_EDITED: string = "gradingTemplateEdited";
    public static GRADING_TEMPLATE_DELETED: string = "gradingTemplateDeleted";
    public static GRADING_TEMPLATE_ERROR: string = "gradingTemplateError";

    private gradingTemplate: Grading_Template;
    private gradingTemplateID: number;
    private customerID: number;
    private errorMessage: string;
    
    public get GradingTemplate(): Grading_Template {
        return this.gradingTemplate;
    }

    public get GradingTemplateID(): number {
        return this.gradingTemplateID;
    }

    public get CustomerID(): number {
        return this.customerID;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, gradingTemplate: Grading_Template, templateID: number = null, customerID: number = null, errorMessage: string = null) {
        super(type);
        this.gradingTemplate = gradingTemplate;
        this.gradingTemplateID = templateID;
        this.customerID = customerID;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new GradingTemplateEvent(this.type, this.gradingTemplate, this.gradingTemplateID, this.customerID, this.errorMessage);
    }
}