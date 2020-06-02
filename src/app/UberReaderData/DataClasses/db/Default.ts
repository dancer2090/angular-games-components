export class Default
{
    private _default_id:number;
    public get Default_id():number
    {
        return this._default_id;
    }
    public set Default_id(value:number)
    {
        this._default_id = value;
    }
    
    private _key:string;
    public get Key():string
    {
        return this._key;
    }
    public set Key(value:string)
    {
        this._key = value;
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
    
    public static fromJson(jsonObject:any):Default
    {
        var retVal:Default = new Default();
        retVal.Default_id = jsonObject.Default_id;
        retVal.Key = jsonObject.Key;
        retVal.Value = jsonObject.Value;
        
        return retVal;
    }
}