import { Activity } from '../DataClasses/db/Activity';

import { UberApplicationEvent } from './UberApplicationEvent';

export class ActivityEvent extends UberApplicationEvent
{
    public static ACTVITY_DATA_RECEIVED:string = "activityDataReceived";
    public static ACTVITY_DATA_ERROR:string = "activityDataError";		
    
    private _activity:Activity;
    public get activity():Activity
    {
        return this._activity;
    }
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    constructor(type:string, activity:Activity, errorMsg:string)
    {
        super(type);
        this._activity = activity;
        this._errMsg = errorMsg;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new ActivityEvent(this.type, this._activity, this._errMsg);
    }
}