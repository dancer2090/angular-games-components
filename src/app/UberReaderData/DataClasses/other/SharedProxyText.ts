import { Shared_Object } from '../db/Shared_Object';
import { Text } from '../db/Text';
import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';
import { UberApplication } from '../../UberApplication';


export class SharedProxyText extends Shared_Object
{
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
    
    private _ComplexText:boolean
    public get ComplexText():boolean {return this._ComplexText;}
    public set ComplexText(value:boolean) {this._ComplexText = value;}
    
    private _Owner:string
    public get Owner():string {return this._Owner;}
    public set Owner(value:string) {this._Owner = value;}
            
    private _lastUpdated:Date;
    public get Last_updated():Date
    {
        return this._lastUpdated;
    }
    public set Last_updated(value:Date)
    {
        this._lastUpdated = value;
    }
    
    private _textType:string;
    public get TextType():string
    {
        if(this.Can_edit)
        {
            return this._textType + " (can edit)";
        }
        else
        {
            return this._textType + " (read only)";
        }
    }		
    public set TextType(type:string)
    {
        this._textType = type;
    }
    
    private _ownerUserId:number;
    public get Owner_user_id():number
    {
        return this._ownerUserId;
    }		
    public set Owner_user_id(id:number)
    {
        this._ownerUserId = id;
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
    
    public init(text:Text):void
    {
        this.Title = text.Title;
        this.Author = text.Author;
        this.Genre = text.Genre;
        this.Reading_level = text.Reading_level;
        this.User_id = text.User_id;
        this.ComplexText = text.ComplexText;
        this.Last_updated = text._Date
        
        this.Shared_object_id = text.Shared_object_id;
        this.Owner = text.Owner;
        this.Can_edit = text.Can_edit;			
    }
    
    public static fromJson(jsonObject:any):SharedProxyText
    {
        var retVal:SharedProxyText = new SharedProxyText();
        retVal.Text_id = jsonObject.Text_id;
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_Updated);
        retVal.Title = StringUtils.DecodeFromJSONUri(jsonObject.Title);
        retVal.Author = StringUtils.DecodeFromJSONUri(jsonObject.Author);
        retVal.Genre = StringUtils.DecodeFromJSONUri(jsonObject.Genre);
        retVal.Reading_level = jsonObject.Reading_level;
        retVal.ComplexText = jsonObject.ComplexText;
        retVal.Content_length = jsonObject.Content_length;
                    
        //shared stuff
        retVal.Shared_object_id = jsonObject.Shared_object_id;
        retVal.Owner = StringUtils.DecodeFromJSONUri(jsonObject.Owner);
        retVal.Can_edit = jsonObject.Can_edit;
        
        
        if(jsonObject.Owner_user_id != null)
        {
            retVal.Owner_user_id = jsonObject.Owner_user_id;
        }
        if (jsonObject.User_id != null)
        {
            retVal.User_id = jsonObject.User_id;
        }
        if (jsonObject.Group_id != null)
        {
            retVal.Group_id = jsonObject.Group_id;
        }
        
        retVal.TextType = retVal.TextType = UberApplication.GetInstance().GetUiTextByKey("SHARED_PROXY_TEXT_LABEL");
        
        return retVal;
    }
    
    public static fromLibrary(jsonObject:Text):SharedProxyText
    {
        var retVal:SharedProxyText = new SharedProxyText();
        retVal.Text_id = jsonObject.Text_id;
        retVal.Title = StringUtils.DecodeFromJSONUri(jsonObject.Title);
        retVal.Author = StringUtils.DecodeFromJSONUri(jsonObject.Author);
        retVal.Genre = StringUtils.DecodeFromJSONUri(jsonObject.Genre);
        retVal.Reading_level = jsonObject.Reading_level;
        retVal.ComplexText = jsonObject.ComplexText;
        
        //shared stuff
        retVal.Shared_object_id = jsonObject.Shared_object_id;
        retVal.Owner_user_id = jsonObject.User_id;
        retVal.Can_edit = jsonObject.Can_edit;
        
        retVal.TextType = retVal.TextType = UberApplication.GetInstance().GetUiTextByKey("SHARED_PROXY_TEXT_LABEL");
        
        return retVal;
    }
}