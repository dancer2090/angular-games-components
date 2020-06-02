import { UberApplicationEvent } from './UberApplicationEvent';
import { TypingTest } from '../DataClasses/db/Typing_Test';

export class NewTypingTestEvent extends UberApplicationEvent {
    public static FORCE_START_TYPING_TEST: string = "forceStartTypingTest";
    public static ACTIVE_TYPING_TEST: string = "newActiveTypingTest";
    public static REPEAT_TYPING_TEST: string = "repeatTypingTest"


    private typingTest: TypingTest;
    public get TypingTest(): TypingTest {
        return this.typingTest;
    }

    private errorMsg: string;
    public get ErrorMessage(): string {
        return this.errorMsg;
    }

    constructor(type: string, typingTest: TypingTest, errorMsg: string) {
        super(type);
        this.typingTest = typingTest;
        this.errorMsg = errorMsg;
    }

    public clone(): UberApplicationEvent {
        return new NewTypingTestEvent(this.type, this.typingTest, this.errorMsg);
    }
}