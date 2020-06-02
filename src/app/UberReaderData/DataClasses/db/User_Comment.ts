import { ISO8601Util } from '../../Utils/ISO8601Util';
import { StringUtils } from '../../Utils/StringUtils';
export class User_Comment
{
    private _user_id: number;
    public get User_id(): number
    {
        return this._user_id;
    }
    public set User_id(value: number)
    {
        this._user_id = value;
    }
    
    private _course_id: number;
    public get Course_id(): number
    {
        return this._course_id;
    }
    public set Course_id(value: number)
    {
        this._course_id = value;
    }

    private _prep_program_id: number;
    public get Prep_program_id(): number
    {
        return this._prep_program_id;
    }
    public set Prep_program_id(value: number)
    {
        this._prep_program_id = value;
    }
    
    private _rating: number;
    public get Rating(): number
    {        
        return this._rating;
    }
    public set Rating(value: number)
    {        
        this._rating = value;
    }
    
    private _comment:string;
    public get Comment():string
    {
        return this._comment;
    }
    public set Comment(value:string)
    {
        this._comment = value;
    }
    
    private _user_name:string;
    public get Username():string
    {
        return this._user_name;
    }
    public set Username(value:string)
    {
        this._user_name = value;
    }

    private_user_public_profile_url:string;
    public get User_public_profile_url():string
    {
        return this.private_user_public_profile_url;
    }
    public set User_public_profile_url(value:string)
    {
        this.private_user_public_profile_url = value;
    }

    private _user_profile_pic:string;
    public get User_profile_pic():string
    {
        return this._user_profile_pic;
    }
    public set User_profile_pic(value:string)
    {
        this._user_profile_pic = value;
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
    
    public static fromJson(jsonObject:any):User_Comment
    {
        var retVal:User_Comment = new User_Comment();
        retVal.User_id = jsonObject.User_id;
        retVal.Course_id = jsonObject.Course_id;
        retVal.Rating = jsonObject.Rating;
        retVal.Comment = jsonObject.Comment;
        retVal.Username = jsonObject.User_name;
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        retVal.User_profile_pic = StringUtils.DecodeFromJSONUri(jsonObject.User_profile_pic);
        retVal.User_public_profile_url = jsonObject.User_public_profile_url;
        
        if(jsonObject.Prep_program_id != null)
        {
             retVal.Prep_program_id = jsonObject.Prep_program_id;
        }

        if(jsonObject.CourseId != null)
        {
            retVal.Course_id = jsonObject.CourseId;
        }

        return retVal;
    }
}