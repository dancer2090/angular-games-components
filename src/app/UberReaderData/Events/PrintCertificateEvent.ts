import { UberApplicationEvent } from './UberApplicationEvent';
import { ISO8601Util } from '../Utils/ISO8601Util';

export class PrintCertificateEvent extends UberApplicationEvent {
    public static CERTIFICATE_DETAILS_RECEIVED: string = "certificateDetailsReceived";
    public static CERTIFICATE_ERROR: string = "certificateError";

    private categoryName: string;
    private dateCompleted: Date;
    private goal1: number;
    private goal2: number;
    private errorMessage: string;

    public get CategoryName(): string {
        return this.categoryName;
    }

    public get DateCompleted(): Date {
        return this.dateCompleted;
    }

    public get Goal1(): number {
        return this.goal1;
    }

    public get Goal2(): number {
        return this.goal2;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, categoryName: string, date: any, goal1: number, goal2: number, errorMessage?: string) {
        super(type);
        this.categoryName = categoryName;
        this.dateCompleted = ISO8601Util.parseDateTimeString(date);
        this.goal1 = goal1;
        this.goal2 = goal2;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new PrintCertificateEvent(this.type, this.categoryName, this.dateCompleted, this.goal1, this.goal2, this.errorMessage);
    }
}