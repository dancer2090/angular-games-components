import { StringUtils } from '../../Utils/StringUtils';

export class UI_Text
{
    private _key:string;
    public get Key():string
    {
        return this._key;
    }
    
    /*private var _language_id:number;
    public function get Language_id():int
    {
        return _language_id;
    }
    
    private var _text_id:number;
    public function get Text_id():int
    {
        return _text_id;
    }*/
    
    private _value:string;
    public get Value():string
    {
        return this._value;
    }
    
    public static fromJson(jsonObject:any):UI_Text
    {
        var retVal:UI_Text = new UI_Text();
        retVal._key = jsonObject.Key;
        /*retVal._language_id = jsonObject.Language_id;
        retVal._text_id = jsonObject.Ui_text_id;*/
        retVal._value = StringUtils.DecodeFromJSONUri(jsonObject.Value);
    
        return retVal;
    }
}