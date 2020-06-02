export class ProxyActivity
{
    private _activity_id:number;
    public get Activity_id():number
    {
        return this._activity_id;
    }
    public set Activity_id(value:number)
    {
        this._activity_id = value;
    }
    
    private _activity_name:string;
    public get Activity_name():string
    {
        return this._activity_name;
    }
    public set Activity_name(value:string)
    {
        this._activity_name = value;
    }
    
    private _activity_description:string;
    public get Activity_description():string
    {
        return this._activity_description;
    }
    public set Activity_description(value:string)
    {
        this._activity_description = value;
    }
    
    private _disabled_platforms:string;
    public get Disabled_platforms():string
    {
        return this._disabled_platforms;
    }
    public set Disabled_platforms(value:string)
    {
        this._disabled_platforms = value;
    }
    
    private _max_client_version:number;
    public get Max_client_version():number
    {
        return this._max_client_version;
    }
    public set Max_client_version(value:number)
    {
        this._max_client_version = value;
    }
    
    private _min_client_version:number;
    public get Min_client_version():number
    {
        return this._min_client_version;
    }
    public set Min_client_version(value:number)
    {
        this._min_client_version = value;
    }
    
    // public get Is_included():boolean
    // {
    //     var clientVersion:number = AppSettings.GetClientVersionCalculated();
    //     return ((this.Disabled_platforms == null || this.Disabled_platforms.toLowerCase().indexOf(AppSettings.GetClientTypeString().toLowerCase()) == -1)
    //                 && (this.Min_client_version == null || this.Min_client_version <= clientVersion)
    //                 && (this.Max_client_version == null || this.Max_client_version >= clientVersion));
    // }
    
    private _reader_activity:boolean;
    public set Reader_activity(val:boolean)
    {
        this._reader_activity = val;
    }		
    public get Reader_activity():boolean
    {
        return this._reader_activity;
    }

    private _suggest: boolean;
    public get Suggest(): boolean {
        return this._suggest;
    }
    
    public set Suggest(value: boolean) {
        this._suggest = value;
    }

    public static fromJson(jsonObject:any):ProxyActivity
    {
        var retVal:ProxyActivity = new ProxyActivity();
        retVal.Activity_id = jsonObject.Activity_id;
        retVal.Activity_description = jsonObject.Activity_description;
        retVal.Activity_name = jsonObject.Activity_name;
        retVal.Suggest = jsonObject.Suggest;
        
        if(jsonObject.Disabled_platforms != null)
        {
            retVal.Disabled_platforms = jsonObject.Disabled_platforms;
        }
        
        if(jsonObject.Max_client_version != null)
        {
            retVal.Max_client_version = jsonObject.Max_client_version;
        }
        
        if(jsonObject.Min_client_version != null)
        {
            retVal.Min_client_version = jsonObject.Min_client_version;
        }
        
        if(jsonObject.Reader_activity != null)
        {
            retVal.Reader_activity = jsonObject.Reader_activity;
        }
        
        return retVal;
    }
}