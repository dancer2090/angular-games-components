export class Setting
{
    private _setting_id:number;
    public get Setting_id():number
    {
        return this._setting_id;
    }
    public set Setting_id(value:number)
    {
        this._setting_id = value;
    }
    
    private _value:string;
    public get Value():string
    {
        return this._value;
    }
    public set Value(value:string)
    {
        this._value = value;
    }
    
    private _user_id:number ;
    public get User_id():number
    {
        return this._user_id;
    }
    public set User_id(value:number)
    {
        this._user_id = value;
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
    
    private _function_name:string;
    public get Function_name():string
    {
        return this._function_name;
    }
    public set Function_name(value:string)
    {
        this._function_name = value;
    }
    
    private _product_id:number ;
    public get Product_id():number
    {
        return this._product_id;
    }
    public set Product_id(value:number)
    {
        this._product_id = value;
    }
    
    private _group_id:number ;
    public get Group_id():number
    {
        return this._group_id;
    }
    public set Group_id(value:number)
    {
        this._group_id = value;
    }
    
    public get CombinedKey():string
    {
        return this._control_ref + ":" + this._function_name;
    }
    
    public ToString():string
    {
        return this.CombinedKey + " " + this._value;
    }
    
    private _force_setting:boolean ;
    public get Force_setting():boolean
    {
        return this._force_setting;
    }
    public set Force_setting(value:boolean)
    {
        this._force_setting = value;
    }
    
    public static fromJson(jsonObject:any):Setting
    {
        var retVal:Setting = new Setting();
        retVal.Setting_id = jsonObject.Setting_id;
        retVal.Control_ref = jsonObject.Control_ref;
        retVal.Function_name = jsonObject.Function_name;
        
        //nullable
        retVal.Product_id = jsonObject.Product_id;
        retVal.User_id = jsonObject.User_id;
        retVal.Group_id = jsonObject.Group_id;
        retVal.Value = jsonObject.Value;
        retVal.Force_setting = jsonObject.Force_setting;
        
        //retVal.UserId = jsonObject.UserId;

        return retVal;
    }
    
    public toJson():any
    {
        var jsonObject:any = 
            {
                Setting_id: this.Setting_id,
                Control_ref: this.Control_ref,
                Function_name: this.Function_name,
                Force_setting: this.Force_setting,
                Product_id: (this.Product_id != null ? this.Product_id : null),
                User_id: (this.User_id != null ? this.User_id : null),
                Value: this.Value
            };
        return jsonObject;
    }
}