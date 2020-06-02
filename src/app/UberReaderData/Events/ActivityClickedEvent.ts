import { ProxyActivity } from '../DataClasses/other/ProxyActivity';

import { UberApplicationEvent } from './UberApplicationEvent';

export class ActivityClickedEvent extends UberApplicationEvent
{
    public static ACTIVITY_CLICKED:string = "activityClicked";
    
    
    private _activity:ProxyActivity;
    public get activity():ProxyActivity
    {
        return this._activity;
    }
    
    constructor(type:string, activity:ProxyActivity)
    {
        super(type);
        this._activity = activity;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new ActivityClickedEvent(this.type, this._activity);
    }
}