import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';

export class Result
{
    private _result_id:number;
    public get Result_id():number
    {
        return this._result_id;
    }
    public set Result_id(value:number)
    {
        this._result_id = value;
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
    
    private _date:Date;
    public get _Date():Date
    {
        return this._date;
    }
    public set _Date(value:Date)
    {
        
        this._date = value;
    }
    
    private _tag1:string;
    public get Tag1():string
    {
        return this._tag1;
    }
    public set Tag1(value:string)
    {
        this._tag1 = value;
    }
    
    private _tag2:string;
    public get Tag2():string
    {
        return this._tag2;
    }
    public set Tag2(value:string)
    {
        this._tag2 = value;
    }
    
    private _value:number;
    public get Value():number
    {
        return this._value;
    }
    public set Value(value:number)
    {
        this._value = value;
    }
    
    private _result_key:string;
    public get Result_key():string
    {
        return this._result_key;
    }
    public set Result_key(value:string)
    {
        this._result_key = value;
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
    
    private _current_wordlist_id:number ;
    public get Current_wordlist_id():number
    {
        return this._current_wordlist_id;
    }
    public set Current_wordlist_id(value:number)
    {
        this._current_wordlist_id = value;
    }
    
    private _product_id:number;
    public get Product_id():number
    {
        return this._product_id;
    }
    public set Product_id(value:number)
    {
        this._product_id = value;
    }

    private _question_id:number = null;
    public get Question_id():number
    {
        return this._question_id;
    }
    public set Question_id(value:number)
    {
        this._question_id = value;
    }
    
    public static fromJson(jsonObject:any):Result
    {
        var retVal:Result = new Result();
        retVal.Result_id = jsonObject.Result_id;
        retVal._Date = ISO8601Util.parseDateTimeString(jsonObject.Date);
        retVal.Activity_name = jsonObject.Activity_name;
        if (jsonObject.Current_wordlist_id != null)
        {
            retVal.Current_wordlist_id = jsonObject.Current_wordlist_id;
        }
        retVal.Product_id = jsonObject.Product_id;
        retVal.Result_key = StringUtils.DecodeFromJSONUri(jsonObject.Result_key);
        retVal.Tag1 = StringUtils.DecodeFromJSONUri(jsonObject.Tag1);
        retVal.Tag2 = StringUtils.DecodeFromJSONUri(jsonObject.Tag2);
        retVal.User_id = jsonObject.User_id;
        retVal.Value = jsonObject.Value;
        
        if (jsonObject.Question_id != null)
        {
            retVal.Question_id = jsonObject.Question_id;
        }

        return retVal;
    }
    
    public toJson():any
    {
        var jsonObject:any = 
            {
                Result_id: this.Result_id,
                Date: ISO8601Util.formatExtendedDateTime(this._Date),
                Activity_name: this.Activity_name,
                Current_wordlist_id: (this.Current_wordlist_id != null ? this.Current_wordlist_id : null),
                Product_id: this.Product_id,
                Result_key: StringUtils.EncodeToJSONUri(this.Result_key),
                Tag1: StringUtils.EncodeToJSONUri(this.Tag1),
                Tag2: StringUtils.EncodeToJSONUri(this.Tag2),
                User_id: this.User_id,
                Value: this.Value,
				Question_id: this.Question_id != null ? this.Question_id : null
            };
        return jsonObject;
    }
}