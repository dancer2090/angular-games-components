import { UberApplicationEvent } from './UberApplicationEvent';
import { TypingTask } from '../DataClasses/db/Typing_Task';
import { UserTypingTaskResult } from '../DataClasses/db/User_Typing_Task_Result';
import { ProxyTypingTask } from '../DataClasses/other/ProxyTypingTask';

export class TypingTasksDataSyncEvent extends UberApplicationEvent {
    public static TASKS_DATA_SYNC_SUCCESS: string = "tasksDataSyncSuccess";
    public static TASKS_DATA_SYNC_ERROR: string = "tasksDataSyncError";
    public static USER_TASKS_DATA_SYNC: string = "userTasksDataSync";

    private typingTasks: any[] = []; /* TypingTask or ProxyTypingTask */
    private typingTaskResults: UserTypingTaskResult[] = [];
    private errorMessage: string;

    public get TypingTasks(): any[] {
        return this.typingTasks;
    }

    public get TypingTaskResults(): UserTypingTaskResult[] {
        return this.typingTaskResults;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, typingTests: any[], typingTaskResults: UserTypingTaskResult[], errorMessage: string = null) {
        super(type);
        this.typingTasks = typingTests;
        this.typingTaskResults = typingTaskResults;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new TypingTasksDataSyncEvent(this.type, this.typingTasks, this.typingTaskResults, this.errorMessage);
    }
}