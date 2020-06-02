import { UberApplicationEvent } from './UberApplicationEvent';

export class UploadEvent extends UberApplicationEvent
{
    public static UPLOAD_START:string = "uploadStart";
    public static UPLOAD_PROGRESS:string = "uploadProgress";
    public static UPLOAD_END:string = "uploadEnd";
    public static UPLOAD_ERROR:string = "uploadError";
    
    private _progress: number;
    public get Progress():number
    {
        return this._progress;
    }

    private _running_task_id: number;
    public get Running_task_id():number
    {
        return this._running_task_id;
    }

    private _filename: string;
    public get filename(): string
    {
        return this._filename;
    }

    private _errorMessage: string;
    public get ErrorMessage(): string 
    {
        return this._errorMessage;
    }

    constructor(type:string, progress?: number, running_task_id?: number, filename?: string, errMsg?: string)
    {
        super(type);
        this._progress = progress;
        this._running_task_id = running_task_id;
        this._filename = filename;
        this._errorMessage = errMsg;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new UploadEvent(this.type, this._progress, this._running_task_id, this._filename, this._errorMessage);
    }
}