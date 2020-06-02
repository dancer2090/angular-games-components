import { UberApplicationEvent } from './UberApplicationEvent';


export class SurveyReviewEvent extends UberApplicationEvent {
    public static STORE_REVIEW_SUCCESS: string = "storeReviewSuccess";
    public static STORE_REVIEW_ERROR: string = "storeReviewError";

    private errorMessage: string;

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, errorMessage: string = null) {
        super(type);
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new SurveyReviewEvent(this.type, this.errorMessage);
    }
}