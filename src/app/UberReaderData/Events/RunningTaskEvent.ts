import { UberApplicationEvent } from './UberApplicationEvent';

export class RunningTaskEvent extends UberApplicationEvent {
    public static RUNNING_TASK_OPEN: string = "runningTaskOpen";
    public static RUNNING_TASK_IN_PROGRESS: string = "runningTaskInProgress";
    public static RUNNING_TASK_FINISHED: string = "runningTaskFinished";
    public static RUNNING_TASK_ERROR: string = "runningTaskError";

    private errorMessage: string;
    private runningTaskID: number;
    private progress: number;
    private taskResult: any;

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    public get RunningTaskID(): number {
        return this.runningTaskID;
    }

    public get RunningTaskProgress(): number {
        return this.progress;
    }

    public get TaskResult(): any {
        return this.taskResult;
    }

    constructor(type: string, taskID: number, progress: number, result: any = null, errorMessage: string = null) {
        super(type);
        this.runningTaskID = taskID;
        this.progress = progress;
        this.taskResult = result;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new RunningTaskEvent(this.type, this.runningTaskID, this.progress, this.taskResult, this.errorMessage);
    }
}