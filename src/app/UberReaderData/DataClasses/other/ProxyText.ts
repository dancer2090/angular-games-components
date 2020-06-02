import { Text } from '../db/Text';
import { IProxyText } from './IProxyText';
import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';
import { UberApplication } from '../../UberApplication';

export class ProxyText implements IProxyText
{
    
    private _Text_id:number;
    public get Text_id():number {return this._Text_id;}
    public set Text_id(value:number) {this._Text_id = value;}
    
    private _Title:string
    public get Title():string {return this._Title;}
    public set Title(value:string) {this._Title = value;}
    
    private _Author:string
    public get Author():string {return this._Author;}
    public set Author(value:string) {this._Author = value;}
    
    
    private _Genre:string
    public get Genre():string {return this._Genre;}
    public set Genre(value:string) {this._Genre = value;}
    
    private _Reading_level:string
    public get Reading_level():string {return this._Reading_level;}
    public set Reading_level(value:string) {this._Reading_level = value;}
    
    private _user_id:number;
    public get User_id():number {return this._user_id;}
    public set User_id(value:number) {this._user_id = value;}
    
    private _ComplexText:boolean
    public get ComplexText():boolean {return this._ComplexText;}
    public set ComplexText(value:boolean) {this._ComplexText = value;}
    
    private _deleted:boolean;
    public get Deleted():boolean
    {
        return this._deleted;
    }
    public set Deleted(value:boolean)
    {
        this._deleted = value;
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
    
    private _textType:string;
    public get TextType():string
    {
        return this._textType;
    }		
    public set TextType(type:string)
    {
        this._textType = type;
    }
    
    private _topic_id:number;
    public get Topic_id():number
    {
        return this._topic_id;
    }
    public set Topic_id(value:number)
    {
        this._topic_id = value;
    }
    
    private _content_length:number = 0;
    public get Content_length():number
    {
        return this._content_length;
    }
    public set Content_length(value:number)
    {
        this._content_length = value;
    }
    
    private _trialMode1:boolean;
    public get Trial_Mode1_Enabled():boolean{ return this._trialMode1; }		
    public set Trial_Mode1_Enabled(type:boolean){ this._trialMode1 = type; }
    
    private _trialMode2:boolean;
    public get Trial_Mode2_Enabled():boolean{ return this._trialMode2; }		
    public set Trial_Mode2_Enabled(type:boolean){ this._trialMode2 = type; }
            
    public init(text:Text):void
    {
        this.Text_id = text.Text_id;
        this.Title = text.Title;
        this.Author = text.Author;
        this.Genre = text.Genre;
        this.Reading_level = text.Reading_level;
        this.User_id = text.User_id;
        this.ComplexText = text.ComplexText;
        this._Date = text._Date;
        this.Deleted = text.Deleted;
    }
    
    public static fromJson(jsonObject:any):ProxyText
    {
        var retVal:ProxyText = new ProxyText();
        retVal.Text_id = jsonObject.Text_id;
        retVal.Title = StringUtils.DecodeFromJSONUri(jsonObject.Title);
        retVal._Date = ISO8601Util.parseDateTimeString(jsonObject.Date);
        retVal.Author = StringUtils.DecodeFromJSONUri(jsonObject.Author);
        retVal.Genre = StringUtils.DecodeFromJSONUri(jsonObject.Genre);
        retVal.Reading_level = jsonObject.Reading_level;
        retVal.ComplexText = jsonObject.ComplexText;
        retVal.Deleted = jsonObject.Deleted;
        retVal.Content_length = jsonObject.Content_length;
        
        if(jsonObject.Trial_mode1_enabled != null)
        {
            retVal.Trial_Mode1_Enabled = jsonObject.Trial_mode1_enabled;
        }
        
        if(jsonObject.Trial_mode2_enabled != null)
        {
            retVal.Trial_Mode2_Enabled = jsonObject.Trial_mode2_enabled;
        }			
        
        if (jsonObject.User_id != null)
        {
            retVal.User_id = jsonObject.User_id;
            retVal.TextType = UberApplication.GetInstance().GetUiTextByKey("USER_PROXY_TEXT_LABEL");
        }
        else
        {
            retVal.TextType = UberApplication.GetInstance().GetUiTextByKey("DEFAULT_PROXY_TEXT_LABEL");	
        }
        
        if (jsonObject.Topic_id != null)
        {
            retVal.Topic_id = jsonObject.Topic_id;
        }
        return retVal;
    }
    
    public static fromLibrary(jsonObject:Text):ProxyText
    {
        var retVal:ProxyText = new ProxyText();
        retVal.Text_id = jsonObject.Text_id;
        retVal.Title = jsonObject.Title;
        retVal._Date = jsonObject._Date;
        retVal.Author = StringUtils.DecodeFromJSONUri(jsonObject.Author);
        retVal.Genre = jsonObject.Genre;
        retVal.Reading_level = jsonObject.Reading_level;
        retVal.ComplexText = jsonObject.ComplexText;
        retVal.Deleted = jsonObject.Deleted;
        
        if(jsonObject.Content_length != null)
        {
            retVal.Content_length = jsonObject.Content_length;
        }
        
        if (jsonObject.Topic_id != null)
        {
            retVal.Topic_id = jsonObject.Topic_id;
        }
        
        if (jsonObject.User_id != null)
        {
            retVal.User_id = jsonObject.User_id;
            retVal.TextType = UberApplication.GetInstance().GetUiTextByKey("USER_PROXY_TEXT_LABEL");
        }
        else
        {
            retVal.TextType = UberApplication.GetInstance().GetUiTextByKey("DEFAULT_PROXY_TEXT_LABEL");	
        }
        return retVal;
    }
}