import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';

export class User
{
    protected _user_id:number;
    public get User_id():number
    {
        return this._user_id;
    }
    public set User_id(value:number)
    {
        this._user_id = value;
    }
    
    protected _username:string;
    public get Username():string
    {
        return this._username;
    }
    public set Username(value:string)
    {
        this._username = value;
    }
    
    protected _email:string;
    public get Email():string
    {
        return this._email;
    }
    public set Email(value:string)
    {
        this._email = value;
    }
    
    protected _password:string;
    public get Password():string
    {
        return this._password;
    }
    public set Password(value:string)
    {
        this._password = value;
    }
    
    protected _first_name:string;
    public get First_name():string
    {
        return this._first_name;
    }
    public set First_name(value:string)
    {
        this._first_name = value;
    }
    
    protected _last_name:string;
    public get Last_name():string
    {
        return this._last_name;
    }
    public set Last_name(value:string)
    {
        this._last_name = value;
    }
    
    protected _is_admin:boolean;
    public get Is_admin():boolean
    {
        return this._is_admin;
    }
    public set Is_admin(value:boolean)
    {
        this._is_admin = value;
    }

    protected _is_ereflect_admin:boolean;
    public get Is_ereflect_admin():boolean
    {
        return this._is_ereflect_admin;
    }
    public set Is_ereflect_admin(value:boolean)
    {
        this._is_ereflect_admin = value;
    }

    protected _is_edu_user:boolean;
    public get IsEduUser():boolean
    {
        return this._is_edu_user;
    }
    public set IsEduUser(value:boolean)
    {
        this._is_edu_user = value;
    }
    
    protected _current_wordlist_id:number ;
    public get Current_wordlist_id():number
    {
        return this._current_wordlist_id;
    }
    public set Current_wordlist_id(value:number)
    {
        this._current_wordlist_id = value;
    }
    
    private _profile_pic:string;
    public get Profile_pic():string
    {
        return this._profile_pic;
    }
    
    public set Profile_pic(value:string)
    {
        this._profile_pic = value;
    }

    private _forcePasswordChange:boolean;
    public get Force_Password_Change():boolean
    {
        return this._forcePasswordChange;
    }
    
    public set Force_Password_Change(value:boolean)
    {
        this._forcePasswordChange = value;
    }
    
    private _facebookUser:boolean;
    public get FacebookUser():boolean
    {
        return this._facebookUser;
    }
    
    public set FacebookUser(value:boolean)
    {
        this._facebookUser = value;
    }
    
    private _facebookAccessToken:string;
    public get FacebookAccessToken():string
    {
        return this._facebookAccessToken;
    }
    
    public set FacebookAccessToken(value:string)
    {
        this._facebookAccessToken = value;
    }
    
    private _googleUser:boolean;
    public get GoogleUser():boolean
    {
        return this._googleUser;
    }
    
    public set GoogleUser(value:boolean)
    {
        this._googleUser = value;
    }
    
    private _cleverUser:boolean;
    public get CleverUser():boolean
    {
        return this._cleverUser;
    }
    
    public set CleverUser(value:boolean)
    {
        this._cleverUser = value;
    }

    private _classlinkUser:boolean;
    public get ClasslinkUser():boolean
    {
        return this._classlinkUser;
    }
    
    public set ClasslinkUser(value:boolean)
    {
        this._classlinkUser = value;
    }

    public get hasPassword():boolean
    {
        return  this._password != null && this._password.length > 0;
    }
    
    private _isTrial:boolean;
    public set Is_trial(value:boolean)
    {
        this._isTrial = value;
    }
    
    public get Is_trial():boolean
    {
        return this._isTrial;
    }
    
    private _anonymous_user:boolean = null;
    public get AnonymousUser():boolean
    {
        return this._anonymous_user;
    }
    public set AnonymousUser(val:boolean)
    {
        this._anonymous_user = val;
    }

    private _public_profile_web_url:string;
    public get Public_profile_web_url():string
    {
        return this._public_profile_web_url;
    }
    public set Public_profile_web_url(val:string)
    {
        this._public_profile_web_url = val;
    }
    
    private _name:string;
    public get Name():string
    {
        return this._name;
    }
    public set Name(val:string)
    {
        this._name = val;
    }

    private _exam_date:Date;
    public get Exam_date():Date
    {
        return this._exam_date;
    }
    public set Exam_date(val:Date)
    {
        this._exam_date = val;
    }
    
    public Clone():User
    {
        var retVal:User = new User();
        retVal.User_id = this.User_id;
        retVal.Email = this.Email;
        retVal.Username = this.Username;
        retVal.First_name = this.First_name;
        retVal.Last_name = this.Last_name;
        retVal.Password = this.Password;
        retVal.Is_admin = this.Is_admin;
        retVal.IsEduUser = this.IsEduUser;
        retVal.FacebookUser = this.FacebookUser;
        retVal.GoogleUser = this.GoogleUser;
        retVal.CleverUser = this.CleverUser;
        retVal.ClasslinkUser = this.ClasslinkUser;
        retVal.Is_trial = this.Is_trial;
        retVal.Is_ereflect_admin = this.Is_ereflect_admin;
        retVal.Public_profile_web_url = this.Public_profile_web_url;
        retVal.Exam_date = this.Exam_date;
        
        return retVal;
    }
    
    public static fromJson(jsonObject:any):User
    {
        let retVal:User = new User();
        retVal.User_id = jsonObject.User_Id;
        
        retVal.Username = StringUtils.DecodeFromJSONUri(jsonObject.Username);
        retVal.Email = StringUtils.DecodeFromJSONUri(jsonObject.Email);		
        retVal.First_name = StringUtils.DecodeFromJSONUri(jsonObject.First_name);
        retVal.Last_name = StringUtils.DecodeFromJSONUri(jsonObject.Last_name);
        retVal.Password = StringUtils.DecodeFromJSONUri(jsonObject.Password);
        retVal.Is_admin = jsonObject.Is_admin;
        retVal.Is_ereflect_admin = jsonObject.Is_EAdmin;
        retVal.IsEduUser = jsonObject.IsEduUser;
        retVal.Force_Password_Change = jsonObject.ForcePasswordChange;
        retVal.Profile_pic = StringUtils.DecodeFromJSONUri(jsonObject.Profile_pic);
        retVal.FacebookUser = false;
        retVal.GoogleUser = false;
        retVal.CleverUser = false;
        retVal.ClasslinkUser = false;
        retVal.Is_trial = jsonObject.Is_trial;
        retVal.FacebookAccessToken = jsonObject.FacebookAccessToken;
        retVal.Exam_date = ISO8601Util.parseDateTimeString(jsonObject.Exam_date);
        
        if(jsonObject.Anonymous_user != null)
        {
            retVal.AnonymousUser = jsonObject.Anonymous_user;
        }

        if(jsonObject.Public_profile_web_url != null)
        {
            retVal.Public_profile_web_url = jsonObject.Public_profile_web_url ;
        }

        if(jsonObject.Name != null)
        {
            retVal.Name = jsonObject.Name ;
        }
        
        return retVal;
    }
    
    public toJson():any
    {
        var jsonObject:any = 
            {
                User_Id: this.User_id, 
                Username: StringUtils.EncodeToJSONUri(this.Username),
                Email: StringUtils.EncodeToJSONUri(this.Email),
                First_name: StringUtils.EncodeToJSONUri(this.First_name),
                Last_name: StringUtils.EncodeToJSONUri(this.Last_name),
                Password: StringUtils.EncodeToJSONUri(this.Password),
                Is_admin: this.Is_admin,
                Is_ereflect_admin: this.Is_ereflect_admin,
                IsEduUser: this.IsEduUser,
                FacebookUser: this.FacebookUser,
                GoogleUser: this.GoogleUser,
                CleverUser: this.CleverUser,
                ClasslinkUser: this.ClasslinkUser,
                Is_trial: this.Is_trial,
                Public_profile_web_url: this.Public_profile_web_url,
                Exam_date: this.Exam_date ? this.Exam_date.toDateString() : this.Exam_date
            };        
        return jsonObject;
    }
}