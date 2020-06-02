export class StatusLevel
{		
    private _name:string;
    public get Name():string
    {
        return this._name;
    }
    
    public set Name(val:string)
    {
        this._name = val;
    }
    
    private _points_required:number;
    public get Points_required():number
    {
        return this._points_required;
    }
    
    public set Points_required(val:number)
    {
        this._points_required = val;
    }
    
    public static fromJson(jsonObject:any):StatusLevel
    {
        var retVal:StatusLevel = new StatusLevel();
        retVal.Name = jsonObject.Name;
        retVal.Points_required = jsonObject.Points_required as number;
        
        return retVal;
    }
}