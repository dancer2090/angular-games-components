import { UberApplicationEvent } from './UberApplicationEvent';

export class StatusPointsEvent extends UberApplicationEvent
{
    public static STATUS_POINTS_RECEIVED:string = "statusPointsReceived";
    public static STATUS_POINTS_RECEIVE_ERROR:string = "statusPointsReceiveError";
    public static STATUS_POINTS_ADDED:string = "statusPointsAdded";
    public static STATUS_POINTS_ADD_ERROR:string = "statusPointsAddError";
    public static UPDATE_STATUS_POINTS:string = "updateStatusPoints";		
    
    private _statusPoints:number;
    public get StatusPoints():number
    {
        return this._statusPoints;
    }
    
    constructor(type:string, statusPoints:number=0)
    {
        super(type);
        this._statusPoints = statusPoints;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new StatusPointsEvent(this.type, this._statusPoints);
    }
}