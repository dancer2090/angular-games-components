import { UberApplicationEvent } from './UberApplicationEvent';
import { ProgressObject } from '../DataClasses/db/ProgressObject';

export class ProgressObjectEvent extends UberApplicationEvent {
    public static USER_PROGRESS_REPORT_RECEIVED: string = "userProgressReportReceived";
    public static USER_PROGRESS_REPORT_ERROR: string = "userProgressReportError";

    private progressObjects: ProgressObject[] = [];
    private errorMessage: string;

    public get ProgressObjects(): ProgressObject[] {
        return this.progressObjects;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, progressObjects: ProgressObject[], errorMessage: string = null) {
        super(type);
        this.progressObjects = progressObjects;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new ProgressObjectEvent(this.type, this.progressObjects, this.errorMessage);
    }
}