export class AControl_Activity
{
    private _control_activity_id:number;
    public get Control_activity_id():number
    {
        return this._control_activity_id;
    }
    public set Control_activity_id(value:number)
    {
        this._control_activity_id = value;
    }
    
    private _control_id:number;
    public get Control_id():number
    {
        return this._control_id;
    }
    public set Control_id(value:number)
    {
        this._control_id = value;
    }
    
    private _activity_id:number;
    public get Activity_id():number
    {
        return this._activity_id;
    }
    public set Activity_id(value:number)
    {
        this._activity_id = value;
    }
    
    public static fromJson(jsonObject:any):AControl_Activity
    {
        var retVal:AControl_Activity = new AControl_Activity();
        retVal.Control_activity_id = jsonObject.Control_activity_id;
        retVal.Activity_id = jsonObject.Activity_id;
        retVal.Control_id = jsonObject.Control_id;
        
        return retVal;
    }
}