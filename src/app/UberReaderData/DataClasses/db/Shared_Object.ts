export class Shared_Object
{
    private _shared_object_id:number;
    public get Shared_object_id():number
    {
        return this._shared_object_id;
    }
    public set Shared_object_id(value:number)
    {
        this._shared_object_id = value;
    }
    
    private _wordlist_id:number ;
    public get Wordlist_id():number
    {
        return this._wordlist_id;
    }
    public set Wordlist_id(value:number)
    {
        this._wordlist_id = value;
    }
    
    private _text_id:number ;
    public get Text_id():number
    {
        return this._text_id;
    }
    public set Text_id(value:number)
    {
        this._text_id = value;
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
    
    private _group_id:number ;
    public get Group_id():number
    {
        return this._group_id;
    }
    public set Group_id(value:number)
    {
        this._group_id = value;
    }
    
    private _can_edit:boolean;
    public get Can_edit():boolean
    {
        return this._can_edit;
    }
    public set Can_edit(value:boolean)
    {
        this._can_edit = value;
    }
    
    public static fromJson(jsonObject:any):Shared_Object
    {
        var retVal:Shared_Object = new Shared_Object();
        retVal.Shared_object_id = jsonObject.Shared_object_id;
        retVal.Can_edit = jsonObject.Can_edit;
        if (jsonObject.Wordlist_id != null)
        {
            retVal.Wordlist_id = jsonObject.Wordlist_id;
        }
        if (jsonObject.Text_id != null)
        {
            retVal.Text_id = jsonObject.Text_id;
        }
        if (jsonObject.User_id != null)
        {
            retVal.User_id = jsonObject.User_id;
        }
        if (jsonObject.Group_id != null)
        {
            retVal.Group_id = jsonObject.Group_id;
        }
        
        return retVal;
    }
}