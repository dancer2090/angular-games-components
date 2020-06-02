export class AControl
{
    private _control_id:number;
    public get Control_id():number
    {
        return this._control_id;
    }
    public set Control_id(value:number)
    {
        this._control_id = value;
    }
    
    private _function_name:string;
    public get Function_name():string
    {
        return this._function_name;
    }
    public set Function_name(value:string)
    {
        this._function_name = value;
    }
    
    private _label:string;
    public get Label():string
    {
        return this._label;
    }
    public set Label(value:string)
    {
        this._label = value;
    }
    
    private _type_id:number;
    public get Type_id():number
    {
        return this._type_id;
    }
    public set Type_id(value:number)
    {
        this._type_id = value;
    }
    
    private _min_value:number;
    public get Min_value():number
    {
        return this._min_value;
    }
    public set Min_value(value:number)
    {
        this._min_value = value;
    }
    
    private _max_value:number;
    public get Max_value():number
    {
        return this._max_value;
    }
    public set Max_value(value:number)
    {
        this._max_value = value;
    }
    
    private _control_ref:string;
    public get Control_ref():string
    {
        return this._control_ref;
    }
    public set Control_ref(value:string)
    {
        this._control_ref = value;
    }
    
    private _group_name:string;
    public get Group_name():string
    {
        return this._group_name;
    }
    public set Group_name(value:string)
    {
        this._group_name = value;
    }
    
    private _visible:boolean;
    public get Visible():boolean
    {
        return this._visible;
    }
    public set Visible(value:boolean)
    {
        this._visible = value;
    }
    
    private _ddl_values:string;
    public get Ddl_values():string
    {
        return this._ddl_values;
    }
    public set Ddl_values(value:string)
    {
        this._ddl_values = value;
    }
    
    private _user_setting:boolean;
    public get User_setting():boolean
    {
        return this._user_setting;
    }
    public set User_setting(value:boolean)
    {
        this._user_setting = value;
    }
    
    private _requires_restart:boolean;
    public get Requires_restart():boolean
    {
        return this._requires_restart;
    }
    public set Requires_restart(value:boolean)
    {
        this._requires_restart = value;
    }
    
    private _description:string;
    public get Description():string
    {
        return this._description;
    }
    public set Description(value:string)
    {
        this._description = value;
    }
    
    public static fromJson(jsonObject:any):AControl
    {
        var retVal:AControl = new AControl();
        retVal.Control_id = jsonObject.Control_id;
        retVal.Control_ref = jsonObject.Control_ref;
        retVal.Ddl_values = jsonObject.Ddl_values;
        retVal.Function_name = jsonObject.Function_name;
        retVal.Group_name = jsonObject.Group_name;
        retVal.Label = jsonObject.Label;
        retVal.Max_value = jsonObject.Max_value;
        retVal.Min_value = jsonObject.Min_value;
        retVal.Type_id = jsonObject.Type_id;
        retVal.User_setting = jsonObject.User_setting;
        retVal.Visible = jsonObject.Visible;
        retVal.Requires_restart = jsonObject.Requires_restart;
        retVal.Description = jsonObject.Description;
        
        return retVal;
    }
}