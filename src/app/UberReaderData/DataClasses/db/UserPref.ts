import { ISO8601Util } from '../../Utils/ISO8601Util';
export class UserPref
{
    private _userPrefId:number;
    public get UserPrefId():number
    {
        return this._userPrefId;
    }
    public set UserPrefId(value:number)
    {
        this._userPrefId = value;
    }
    
    private _userId:number ;
    public get UserId():number
    {
        return this._userId;
    }
    public set UserId(value:number)
    {
        this._userId = value;
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
    
    /*private var _language_id:number;
    public function get Language_id():int
    {
        return _language_id;
    }
    public function set Language_id(language_id:number):void
    {
        _language_id = language_id;
    }*/
    
    private _groupId:number ;
    public get Group_id():number
    {
        return this._groupId;
    }
    public set Group_id(value:number)
    {
        this._groupId = value;
    }
    
    private _force_user_pref:boolean ;
    public get Force_user_pref():boolean
    {
        return this._force_user_pref;
    }
    public set Force_user_pref(value:boolean)
    {
        this._force_user_pref = value;
    }
    
    private _last_updated:Date;
    public get Last_updated():Date
    {
        return this._last_updated;
    }
    public set Last_updated(value:Date)
    {
        this._last_updated = value;
    }

    public static fromJson(jsonObject:any):UserPref
    {
        var retVal:UserPref = new UserPref();
        retVal.UserPrefId = jsonObject.UserPrefId;
        if (jsonObject.Product_id != null)
        {
            retVal.Product_id = jsonObject.Product_id;
        }
        if (jsonObject.UserId != null)
        {
            retVal.UserId = jsonObject.UserId;
        }
        if (jsonObject.Group_id != null)
        {
            retVal.Group_id = jsonObject.Group_id;
        }
        if (jsonObject.Force_userPref != null)
        {
            retVal.Force_user_pref = jsonObject.Force_userPref;
        }
        if(jsonObject.Last_updated != null) 
        {
            retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        }
        retVal.Key = jsonObject.Key;
        retVal.Value = jsonObject.Value;
        return retVal;
    }
    
    public toJson():any
    {
        var jsonObject:any = 
            {
                UserPrefId: this.UserPrefId,
                Product_id: (this.Product_id != null ? this.Product_id : null),
                UserId: (this.UserId != null ? this.UserId : null),
                Key: this.Key,
                Value: this.Value,
                Group_id: (this.Group_id != null ? this.Group_id : null),
                Force_userPref: (this.Force_user_pref != null ? this.Force_user_pref : null),
                Last_updated: (this.Last_updated != null ? ISO8601Util.formatExtendedDateTime(this.Last_updated) : null)
            };
        return jsonObject;
    }
}