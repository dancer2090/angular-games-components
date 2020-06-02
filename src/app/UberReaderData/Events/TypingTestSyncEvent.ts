import { UberApplicationEvent } from './UberApplicationEvent';
import { ProxyTypingTest } from '../DataClasses/other/ProxyTypingTest';
import { UserTypingTestResult } from '../DataClasses/db/User_Typing_Test_Result';

export class TypingTestSyncEvent extends UberApplicationEvent {
    public static TEST_DATA_SYNC: string = "testDataSync";

    private typingTests: ProxyTypingTest[] = [];
    private typingTestResults: UserTypingTestResult[] = [];

    public get TypingTest(): ProxyTypingTest[] {
        return this.typingTests;
    }

    public get TypingTestResults(): UserTypingTestResult[] {
        return this.typingTestResults;
    }

    constructor(type: string, typingTests: ProxyTypingTest[], typingTestResults: UserTypingTestResult[]) {
        super(type);
        this.typingTests = typingTests;
        this.typingTestResults = typingTestResults;
    }

    public clone(): UberApplicationEvent {
        return new TypingTestSyncEvent(this.type, this.typingTests, this.typingTestResults);
    }
}