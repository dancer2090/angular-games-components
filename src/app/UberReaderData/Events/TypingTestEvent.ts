import { TypingTest } from '../DataClasses/db/Typing_Test';
import { UberApplicationEvent } from './UberApplicationEvent';

export class TypingTestEvent extends UberApplicationEvent {
    public static TYPING_TESTS_RECEIVED: string = "typingTestsReceived";
    public static TYPING_TEST_RECEIVED: string = "typingTestReceived";
    public static TYPING_TEST_DELETED: string = "typingTestDeleted";
    public static TYPING_TEST_ERROR: string = "typingTestsError";

    private groupTypingTests: TypingTest[] = [];
    private typingTest: TypingTest;
    private testToDelete: any;
    private errorMessage: string;

    public get GroupTypingTests(): TypingTest[] {
        return this.groupTypingTests;
    }

    public get TypingTest(): TypingTest {
        return this.typingTest;
    }

    public get TestToDelete(): any {
        return this.testToDelete;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, groupTypingTests: TypingTest[], typingTest: TypingTest = null, testToDelete: any = null, errorMessage: string = null) {
        super(type);
        this.groupTypingTests = groupTypingTests;
        this.typingTest = typingTest;
        this.testToDelete = testToDelete;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new TypingTestEvent(this.type, this.groupTypingTests, this.typingTest, this.errorMessage);
    }
}