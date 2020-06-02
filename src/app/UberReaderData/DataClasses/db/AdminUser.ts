import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';

export class AdminUser {
    public static DISTRICT_ADMIN: string = "district_admin";
    public static SCHOOL_ADMIN: string = "school_admin";
    public static TEACHER: string = "teacher";
    public static STUDENT: string = "student";
    
    private _user_id: number;
    private _first_name: string;
    private _last_name: string;
    private _username: string;
    private _email: string;
    private _password_temp: string;
    private _user_password: string;
    private _last_login: Date;
    private _is_admin: boolean;
    private isSelected: boolean = false;
    private _profile_pic: string;
    private _user_type: string;

    public get User_id(): number {
        return this._user_id;
    }

    public set User_id(value: number) {
        this._user_id = value;
    }

    public get User_type(): string {
        return this._user_type;
    }

    public set User_type(value: string) {
        this._user_type = value;
    }

    public get First_name(): string {
        return this._first_name;
    }

    public set First_name(value: string) {
        this._first_name = value ? value : "";
    }

    public get Last_name(): string {
        return this._last_name;
    }

    public set Last_name(value: string) {
        this._last_name = value ? value : "";
    }

    public get Full_name(): string {
        return (this._first_name + " " + this._last_name).trim();
    }

    public get Username(): string {
        return this._username;
    }

    public set Username(value: string) {
        this._username = value;
    }

    public get Email(): string {
        return this._email;
    }

    public set Email(value: string) {
        this._email = value;
    }

    public get Password_temp(): string {
        return this._password_temp;
    }

    public set Password_temp(value: string) {
        this._password_temp = value;
    }

    public get Password(): string {
        return this._user_password;
    }

    public set Password(value: string) {
        this._user_password = value;
    }

    public get Last_login(): Date {
        return this._last_login;
    }

    public set Last_login(val: Date) {
        this._last_login = val;
    }

    public get Is_admin(): boolean {
        return this._is_admin;
    }

    public set Is_admin(value: boolean) {
        this._is_admin = value;
    }
    
    protected _is_clever_user:boolean;
    public get IsCleverUser():boolean
    {
        return this._is_clever_user;
    }

    public set IsCleverUser(value:boolean)
    {
        this._is_clever_user = value;
    }

    //TO DO CLASSLINK HERE
    protected _is_classlink_user:boolean;
    public get IsClasslinkUser():boolean
    {
        return this._is_classlink_user;
    }

    public set IsClasslinkUser(value:boolean)
    {
        this._is_classlink_user = value;
    }

    protected _is_google_user:boolean;
    public get IsGoogleUser():boolean
    {
        return this._is_google_user;
    }

    public set IsGoogleUser(value:boolean)
    {
        this._is_google_user = value;
    }

    public get Profile_pic(): string {
        return this._profile_pic;
    }

    public set Profile_pic(value: string) {
        this._profile_pic = value;
    }

    public Clone(): AdminUser {
        var retVal: AdminUser = new AdminUser();
        retVal.User_id = this.User_id;
        retVal.First_name = this.First_name;
        retVal.Last_name = this.Last_name;
        retVal.Username = this.Username;
        retVal.Email = this.Email;
        retVal.Password_temp = this.Password_temp;
        retVal.Last_login = this.Last_login;
        retVal.Is_admin = this.Is_admin;
        retVal.IsCleverUser = this.IsCleverUser;
        retVal.IsClasslinkUser = this.IsClasslinkUser;
        retVal.IsGoogleUser = this.IsGoogleUser;
        retVal.User_type = this.User_type;
        return retVal;
    }

    public static fromJson(jsonObject: any): AdminUser {
        let retVal: AdminUser = new AdminUser();
        retVal.User_id = jsonObject.User_Id;
        retVal.First_name = StringUtils.DecodeFromJSONUri(jsonObject.First_name);
        retVal.Last_name = StringUtils.DecodeFromJSONUri(jsonObject.Last_name);
        retVal.Username = StringUtils.DecodeFromJSONUri(jsonObject.Username);
        retVal.Email = StringUtils.DecodeFromJSONUri(jsonObject.Email);
        retVal.Password_temp = StringUtils.DecodeFromJSONUri(jsonObject.Password_temp);
        retVal.Last_login = ISO8601Util.parseDateTimeString(jsonObject.Last_login);
        retVal.Is_admin = jsonObject.Is_admin;
        retVal.Profile_pic = StringUtils.DecodeFromJSONUri(jsonObject.Profile_pic);
        retVal.IsCleverUser = jsonObject.Is_clever_user;
        retVal.IsClasslinkUser = jsonObject.Is_classlink_user;
        retVal.IsGoogleUser = jsonObject.Is_google_user;
        retVal.User_type = jsonObject.User_type;
        return retVal;
    }

    public toJson(): any {
        let jsonObject: any =
            {
                User_Id: this.User_id,
                First_name: StringUtils.EncodeToJSONUri(this.First_name),
                Last_name: StringUtils.EncodeToJSONUri(this.Last_name),
                Username: StringUtils.EncodeToJSONUri(this.Username),
                Email: StringUtils.EncodeToJSONUri(this.Email),
                Password_temp: StringUtils.EncodeToJSONUri(this.Password_temp),
                Password: StringUtils.EncodeToJSONUri(this._user_password),
                Last_login: this.Last_login ? this.Last_login.toDateString() : this.Last_login,
                Is_admin: this.Is_admin,
                Is_clever_user: this.IsCleverUser,
                Is_classlink_user: this.IsClasslinkUser,
                Is_google_user: this.IsGoogleUser,
                User_type: this.User_type
            };
        return jsonObject;
    }
}