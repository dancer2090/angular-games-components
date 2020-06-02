import { UberApplicationEvent } from './UberApplicationEvent';
import { UserTypingTestResult } from '../DataClasses/db/User_Typing_Test_Result';
import { TypingTest } from '../DataClasses/db/Typing_Test';

export class TypingTestsDataSyncEvent extends UberApplicationEvent {
    public static TESTS_DATA_SYNC_SUCCESS: string = "testsDataSyncSuccess";
    public static TESTS_DATA_SYNC_ERROR: string = "testsDataSyncError";

    private typingTests: TypingTest[] = [];
    private typingTestResults: UserTypingTestResult[] = [];
    private errorMessage: string;

    public get TypingTests(): TypingTest[] {
        return this.typingTests;
    }

    public get TypingTestResults(): UserTypingTestResult[] {
        return this.typingTestResults;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, typingTests: TypingTest[], typingTestResults: UserTypingTestResult[], errorMessage: string = null) {
        super(type);
        this.typingTests = typingTests;
        this.typingTestResults = typingTestResults;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new TypingTestsDataSyncEvent(this.type, this.typingTests, this.typingTestResults, this.errorMessage);
    }
}