import { ISO8601Util } from '../../Utils/ISO8601Util';

export class User_Prep_Program
{
    private _user_prep_program_id:number;
    public set User_prep_program_id(val:number)
    {
        this._user_prep_program_id = val;
    }
    public get User_prep_program_id():number
    {
        return this._user_prep_program_id;
    }

    private _user_id:number;
    public set User_id(val:number)
    {
        this._user_id = val;
    }
    public get User_id():number
    {
        return this._user_id;
    }

    private _prep_program_id:number;
    public set Prep_program_id(val:number)
    {
        this._prep_program_id = val;
    }
    public get Prep_program_id():number
    {
        return this._prep_program_id;
    }

    private _last_updated:Date;
    public set Last_updated(val:Date)
    {
        this._last_updated = val;
    }
    public get Last_updated():Date
    {
        return this._last_updated;
    }

    private _on_wishlist:boolean;
    public set On_wishlist(val:boolean)
    {
        this._on_wishlist = val;
    }
    public get On_wishlist():boolean
    {
        return this._on_wishlist;
    }

    private _in_my_prep:boolean;
    public set In_my_prep(val:boolean)
    {
        this._in_my_prep = val;
    }
    public get In_my_prep():boolean
    {
        return this._in_my_prep;
    }

    private _seen:boolean;
    public set Seen(val:boolean)
    {
        this._seen = val;
    }
    public get Seen():boolean
    {
        return this._seen;
    }

    public static fromJson(jsonObject:any):User_Prep_Program
    {
        let retVal:User_Prep_Program = new User_Prep_Program();

        retVal.User_prep_program_id = jsonObject.User_prep_program_id;
        retVal.User_id = jsonObject.User_id;
        retVal.Prep_program_id = jsonObject.Prep_program_id;
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        retVal.On_wishlist = jsonObject.On_wishlist;
        retVal.In_my_prep = jsonObject.In_my_prep;

        if(jsonObject.Seen != null)
        {
            retVal.Seen = jsonObject.Seen;
        }
        return retVal;
    }
}