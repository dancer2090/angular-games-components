export class AdminGroupReportData
{
    private _userId:number;
    public get User_id():number
    {
        return this._userId;
    }
    public set User_id(value:number)
    {
        this._userId = value;
    }

    private _first_name:string;
    public get First_name():string
    {
        return this._first_name;
    }
    public set First_name(value:string)
    {
        this._first_name = value;
    }

    private _last_name:string;
    public get Last_name():string
    {
        return this._last_name;
    }
    public set Last_name(value:string)
    {
        this._last_name = value;
    }
    
    private _values:number[];
    public get Values():number[]
    {
        return this._values;
    }
    public set Values(value:number[])
    {
        this._values = value;
    }

    private _curriculum_progress:number[];
    public get Curriculum_progress ():number[]
    {
        return this._curriculum_progress;
    }
    public set Curriculum_progress (value:number[])
    {
        this._curriculum_progress = value;
    }
    
    public static fromJson(jsonObject:any):AdminGroupReportData
    {
        var retVal:AdminGroupReportData = new AdminGroupReportData();
        retVal.User_id = jsonObject.User_id;
        retVal.Last_name = jsonObject.Last_name;
        retVal.First_name = jsonObject.First_name;
        retVal.Values = jsonObject.Values;
        retVal.Curriculum_progress = jsonObject.Curriculum_progress;
        
        return retVal;
    }
}