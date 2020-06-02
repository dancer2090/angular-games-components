import { UberApplicationEvent } from './UberApplicationEvent';
import { TypingTask } from '../DataClasses/db/Typing_Task';

export class TypingTaskEvent extends UberApplicationEvent {
    public static TYPING_TASKS_RECEIVED: string = "typingTasksReceived";
    public static TYPING_TASK_RECEIVED: string = "typingTaskReceived";
    public static TYPING_TASK_DELETED: string = "typingTaskDeleted";
    public static TYPING_TASK_ERROR: string = "typingTaskError";

    private groupTypingTasks: TypingTask[] = [];
    private typingTask: TypingTask;
    private taskToDelete: any;
    private errorMessage: string;

    public get GroupTypingTasks(): TypingTask[] {
        return this.groupTypingTasks;
    }

    public get TypingTask(): TypingTask {
        return this.typingTask;
    }

    public get TaskToDelete(): any {
        return this.taskToDelete;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, groupTypingTasks: TypingTask[], typingTask: TypingTask = null, taskToDelete: any = null, errorMessage: string = null) {
        super(type);
        this.groupTypingTasks = groupTypingTasks;
        this.typingTask = typingTask;
        this.taskToDelete = taskToDelete;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new TypingTaskEvent(this.type, this.groupTypingTasks, this.typingTask, this.taskToDelete, this.errorMessage);
    }
}