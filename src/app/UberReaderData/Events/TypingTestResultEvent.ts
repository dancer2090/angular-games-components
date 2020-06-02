import { UberApplicationEvent } from './UberApplicationEvent';
import { UserTypingTestResult } from '../DataClasses/db/User_Typing_Test_Result';

export class TypingTestResultEvent extends UberApplicationEvent {
    public static TYPING_TEST_RESULTS_RECEIVED: string = "typingTestResultsReceived";
    public static TYPING_TEST_RESULTS_ERROR: string = "typingTestResultsError";

    private typingTestResults: UserTypingTestResult[] = [];
    private errorMessage: string;

    public get TypingTestResults(): UserTypingTestResult[] {
        return this.typingTestResults;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, typingTestResults: UserTypingTestResult[], errorMessage: string = null) {
        super(type);
        this.typingTestResults = typingTestResults;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new TypingTestResultEvent(this.type, this.typingTestResults, this.errorMessage);
    }
}