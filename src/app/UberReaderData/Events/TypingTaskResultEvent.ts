import { UberApplicationEvent } from './UberApplicationEvent';
import { UserTypingTaskResult } from '../DataClasses/db/User_Typing_Task_Result';

export class TypingTaskResultEvent extends UberApplicationEvent {
    public static TYPING_TASK_RESULTS_RECEIVED: string = "typingTaskResultsReceived";
    public static TYPING_TASK_RESULTS_ERROR: string = "typingTaskResultsError";

    private typingTaskResults: UserTypingTaskResult[] = [];
    private errorMessage: string;

    public get TypingTaskResults(): UserTypingTaskResult[] {
        return this.typingTaskResults;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, typingTaskResults: UserTypingTaskResult[], errorMessage: string = null) {
        super(type);
        this.typingTaskResults = typingTaskResults;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new TypingTaskResultEvent(this.type, this.typingTaskResults, this.errorMessage);
    }
}