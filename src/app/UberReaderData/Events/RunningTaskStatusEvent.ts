import { UberApplicationEvent } from './UberApplicationEvent';

export class RunningTaskStatusEvent extends UberApplicationEvent
{
    public static TASK_SUCESS:string = "taskSuccess";
    public static TASK_ERROR:string = "taskError";
    
    private _progress: number;
    public get Progress():number
    {
        return this._progress;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }

    constructor(type:string, progress: number, errorMessage:string=null)
    {
        super(type);
        this._progress = progress;
        this._errorMessage = errorMessage;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new RunningTaskStatusEvent(this.type, this._progress, this._errorMessage);
    }
}