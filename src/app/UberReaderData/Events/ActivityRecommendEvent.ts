import { UberApplicationEvent } from './UberApplicationEvent';

export class ActivityRecommendEvent extends UberApplicationEvent
{
    public static ACTVITY_RECOMMEND_RECEIVED:string = "activityRecommendReceived";
    public static ACTVITY_RECOMMEND_FAILED:string = "activityRecommendFailed";		
    
    private _activityId:number;
    public get ActivityId():number
    {
        return this._activityId;
    }
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    constructor(type:string, activityId:number, errorMsg:string=null)
    {
        super(type);
        this._activityId = activityId;
        this._errMsg = errorMsg;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new ActivityRecommendEvent(this.type, this._activityId, this._errMsg);
    }
}