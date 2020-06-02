import { UberApplicationEvent } from './UberApplicationEvent';
import { UserTypingTaskResult } from '../DataClasses/db/User_Typing_Task_Result';
import { Course_Activity } from '../DataClasses/db/Course_Activity';
import { TypingTask } from '../DataClasses/db/Typing_Task';
import { UserTypingReplayData } from '../DataClasses/db/UserTypingReplayData';
import { Text } from '../DataClasses/db/Text';

export class ReplayEvent extends UberApplicationEvent {
    public static REPLAY_DATA_STORED: string = "replayDataSaved";
    public static REPLAY_DATA_RECEIVED: string = "replayDataReceived";
    public static REPLAY_DATA_ERROR: string = "replayDataError";

    private courseActivity: Course_Activity;
    private courseText: Text;
    private typingTask: TypingTask;
    private userReplayData: UserTypingReplayData;
    private errorMsg: string;
    
    public get CourseActivity(): Course_Activity {
        return this.courseActivity;
    }

    public set CourseActivity(value: Course_Activity) {
        this.courseActivity = value;
    }

    public get CourseText(): Text {
        return this.courseText;
    }

    public set CourseText(value: Text) {
        this.courseText = value;
    }

    public get TypingTask(): TypingTask {
        return this.typingTask;
    }

    public set TypingTask(value: TypingTask) {
        this.typingTask = value;
    }

    public get UserReplayData(): UserTypingReplayData {
        return this.userReplayData;
    }

    public set UserReplayData(value: UserTypingReplayData) {
        this.userReplayData = value;
    }

    public get ErrorMessage(): string {
        return this.errorMsg;
    }

    public set ErrorMessage(value: string) {
        this.errorMsg = value;
    }

    constructor(type: string, serverResponseJsonObj: any, errMsg?: string) {
        super(type);
        if (serverResponseJsonObj != null) {
            if (serverResponseJsonObj.Course_Activity != null) {
                this.courseActivity = Course_Activity.fromJson(serverResponseJsonObj.Course_Activity);
                this.courseText = Text.fromJson(serverResponseJsonObj.Text);
            }
            
            if (serverResponseJsonObj.Typing_Task != null) {
                this.typingTask = TypingTask.fromJson(serverResponseJsonObj.Typing_Task);
            }
            
            this.userReplayData = UserTypingReplayData.fromJson(serverResponseJsonObj.User_Typing_Replay_Data);
        }
        this.errorMsg = errMsg;
    }
}