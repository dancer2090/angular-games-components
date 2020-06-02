import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';

export class User_Notes
{
    private _user_notes_id:number;
    public set User_notes_id(val:number)
    {
        this._user_notes_id = val;
    }
    public get User_notes_id():number
    {
        return this._user_notes_id;
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

    private _course_activity_id:number;
    public set Course_activity_id(val:number)
    {
        this._course_activity_id = val;
    }
    public get Course_activity_id():number
    {
        return this._course_activity_id;
    }

    private _notes:string;
    public set Notes(val:string)
    {
        this._notes = val;
    }
    public get Notes():string
    {
        return this._notes;
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

    private _course_id:number;
    public set Course_id(val:number)
    {
        this._course_id = val;
    }
    public get Course_id():number
    {
        return this._course_id;
    }

    private _course_step_num:number;
    public set Course_step_num(val:number)
    {
        this._course_step_num = val;
    }
    public get Course_step_num():number
    {
        return this._course_step_num;
    }

    private _seen:boolean = null;
    public get Seen():boolean
    {
        return this._seen;
    }
    public set Seen(val:boolean)
    {
        this._seen = val;
    }

    public static clone(val:User_Notes):User_Notes {
        var retVal:User_Notes = new User_Notes();
        
        retVal.User_notes_id = val.User_notes_id;
        retVal.User_id = val.User_id;
        retVal.Course_activity_id = val.Course_activity_id;
        retVal.Notes = val.Notes;
        retVal.Last_updated = val.Last_updated;
        retVal.Course_id = val.Course_id;
        retVal.Course_step_num = val.Course_step_num;
        retVal.Seen = val.Seen;

        return retVal;
    }

    public static fromJson(jsonObject:any):User_Notes
    {
        var retVal:User_Notes = new User_Notes();
        retVal.User_notes_id = jsonObject.User_notes_id;
        retVal.User_id = jsonObject.User_id;
        retVal.Course_activity_id = jsonObject.Course_activity_id;
        retVal.Notes = StringUtils.DecodeFromJSONUri(jsonObject.Notes);
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        retVal.Course_id = jsonObject.Course_id;
        retVal.Course_step_num = jsonObject.Course_step_num;
        retVal.Seen = jsonObject.Seen;

        return retVal;
    }

    public toJson():any
    {
        var jsonObject:any = 
            {
                User_notes_id: this.User_notes_id,
                User_id: this.User_id,
                Course_activity_id: this.Course_activity_id,
                Notes: StringUtils.EncodeToJSONUri(this.Notes),
                Last_updated: ISO8601Util.formatExtendedDateTime(this.Last_updated),
                Course_id: this.Course_id,
                Course_step_num: this.Course_step_num,
                Seen: this.Seen
            };

        return jsonObject;
    }
}