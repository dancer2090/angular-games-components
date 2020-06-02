import { UberApplication } from '../../UberApplication';
import { Word_Sense } from './Word_Sense';

import { ISO8601Util } from '../../Utils/ISO8601Util';
import { StringUtils } from '../../Utils/StringUtils';

export class Word_User
{
    
    private _word_user_id:number;
    public get Word_user_id():number
    {
        return this._word_user_id;
    }
    public set Word_user_id(value:number)
    {
        this._word_user_id = value;
    }
    
    private _word_id:number;
    public get Word_id():number
    {
        return this._word_id;
    }
    public set Word_id(value:number)
    {
        this._word_id = value;
    }
    
    private _user_id:number;
    public get User_id():number
    {
        return this._user_id;
    }
    public set User_id(value:number)
    {
        this._user_id = value;
    }
    
    private _mastered:boolean;
    public get Mastered():boolean
    {
        return this._mastered;
    }
    public set Mastered(value:boolean)
    {
        this._mastered = value;
    }
    
    private _notes:string = "";
    public get Notes():string
    {
        return this._notes;
    }
    public set Notes(value:string)
    {
        this._notes = value;
    }
    
    private _default_sense_id:number ;
    public get Default_sense_id():number
    {
        return this._default_sense_id;
    }
    public set Default_sense_id(value:number)
    {
        this._default_sense_id = value;
    }
    
    private _word_sense:Word_Sense;
    public get Word_sense():Word_Sense
    {
        return UberApplication.GetInstance().GetDefaultSense(this._word_id);
        //return _word_sense;
    }
    /*public function set Word_sense(value:Word_Sense):void
    {
        _word_sense = value;
    }*/
    
    private _last_updated:Date;
    public get Last_updated():Date
    {
        return this._last_updated;
    }
    public set Last_updated(value:Date)
    {
        this._last_updated = value;
    }
    
    public static fromJson(jsonObject:any):Word_User
    {
        var retVal:Word_User = new Word_User();
        retVal.Word_user_id = jsonObject.Word_user_id;
        retVal.Word_id = jsonObject.Word_id;
        retVal.User_id = jsonObject.User_id;
        retVal.Mastered = jsonObject.Mastered;
        retVal.Notes = StringUtils.DecodeFromJSONUri(jsonObject.Notes);
        if (jsonObject.Default_sense_id != null)
        {
            retVal.Default_sense_id = jsonObject.Default_sense_id;
        }
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        
        return retVal;
    }
    
    public toJson():any
    {
        var jsonObject:any = 
            {
                Word_user_id: this.Word_user_id,
                Word_id: this.Word_id,
                User_id: this.User_id,
                Mastered: this.Mastered,
                Notes: StringUtils.EncodeToJSONUri(this.Notes),
                Default_sense_id: (this.Default_sense_id != null ? this.Default_sense_id : null)
            };
        return jsonObject;
    }
}