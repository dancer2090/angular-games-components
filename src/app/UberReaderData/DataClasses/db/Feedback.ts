import { StringUtils } from '../../Utils/StringUtils';
	
export class Feedback
{
    private _user_id:number;
    public set User_id(value:number)
    {
        this._user_id = value;
    }
    
    private _facebook_user:boolean;
    public set Facebook_user(value:boolean)
    {
        this._facebook_user = value;
    }
    
    private _google_user:boolean;
    public set Google_user(value:boolean)
    {
        this._google_user = value;
    }
    
    private _product_id:number;
    public set Product_id(value:number)
    {
        this._product_id = value;
    }
    
    private _user_notes:string;
    public set User_notes(value:string)
    {
        this._user_notes = value;
    }
    
    private _feedback_type:string;
    public set Feedback_type(value:string)
    {
        this._feedback_type = value;
    }
    
    private _feedback_source:string;
    public set Feedback_source(value:string)
    {
        this._feedback_source = value;
    }
    
    private _client_OS:string;
    public set Client_OS(value:string)
    {
        this._client_OS = value;
    }
    
    private _client_type:string;
    public set Client_type(value:string)
    {
        this._client_type = value;
    }
    
    private _framework_version:string;
    public set Framework_version(value:string)
    {
        this._framework_version = value;
    }
    
    private _product_data_version:string;
    public set Product_data_version(value:string)
    {
        this._product_data_version = value;
    }
    
    private _course_id:number ;
    public get Course_id():number
    {
        return this._course_id;
    }
    public set Course_id(value:number)
    {
        this._course_id = value;
    }
    
    private _course_activity_id:number ;
    public get Course_activity_id():number
    {
        return this._course_activity_id;
    }
    public set Course_activity_id(value:number)
    {
        this._course_activity_id = value;
    }
    
    private _activity_id:number ;
    public get Activity_id():number
    {
        return this._activity_id;
    }
    public set Activity_id(value:number)
    {
        this._activity_id = value;
    }
    
    /*private var _current_wordlist_id:number ;
    public function get Current_wordlist_id():number
    {
        return _current_wordlist_id;
    }
    public function set Current_wordlist_id(value:number):void
    {
        _current_wordlist_id = value;
    }*/
    
    private _additional_data:string = "";
    public set Additional_data(value:string)
    {
        this._additional_data = value;
    }
    public addData(key:string, value:string):void
    {
        this._additional_data += key + ":\t\"" + value + "\"\n"
    }
    
    /*private var _localClientTime:Date;
    public function set LocalClientTime(value:Date):void
    {
        
        _localClientTime = value;
    }*/
    
    public toJson():any
    {
        var jsonObject:any = 
        {
            User_id: this._user_id,
            Facebook_user: this._facebook_user,
            Google_user: this._google_user,
            //LocalClientTime: ISO8601Util.formatExtendedDateTime(this.LocalClientTime),
            Product_id: this._product_id,
            User_notes: StringUtils.EncodeToJSONUri(this._user_notes),
            Feedback_type: this._feedback_type,
            Feedback_source: this._feedback_source,
            Client_OS: this._client_OS,
            Client_type: this._client_type,
            Framework_version: this._framework_version,
            Product_data_version: this._product_data_version,
            Activity_id: (this.Activity_id != null ? this.Activity_id : null),
            Course_id: (this.Course_id != null ? this.Course_id : null),
            Course_activity_id: (this.Course_activity_id != null ? this.Course_activity_id : null),
            Additional_data: StringUtils.EncodeToJSONUri(this._additional_data)
        };
        return jsonObject;
    }
}