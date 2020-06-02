import { UberApplicationEvent } from './UberApplicationEvent';

export class QuestionSyncEvent extends UberApplicationEvent
{
    public static QUESTION_DATA_SYNC:string = "questionDataSync";
    
    private _refreshCourses:boolean;
    public get RefreshCourses():boolean
    {
        return this._refreshCourses;
    }

    public set RefreshCourses(value:boolean)
	{
		this._refreshCourses = value;
	}
    
    constructor(type:string, refreshCourses:boolean)
    {
        super(type);
        this._refreshCourses = refreshCourses;
    }
}