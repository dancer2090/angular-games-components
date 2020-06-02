import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';

export class NewsItem
{
    private _icon_url:string;
    public get Icon_url():string
    {
        return this._icon_url;
    }
    public set Icon_url(value:string)
    {
        this._icon_url = value;
    }
    
    private _news_text:string;
    public get News_string():string
    {
        return this._news_text;
    }
    public set News_string(value:string)
    {
        this._news_text = value;
    }
    
    private _news_button_label:string;
    public get News_button_label():string
    {
        return this._news_button_label;
    }
    public set News_button_label(value:string)
    {
        this._news_button_label = value;
    }
    
    private _news_link:string;
    public get News_link():string
    {
        return this._news_link;
    }
    public set News_link(value:string)
    {
        this._news_link = value;
    }
    
    public static fromJson(jsonObject:any):NewsItem
    {
        var retVal:NewsItem = new NewsItem();
        retVal.Icon_url = StringUtils.DecodeFromJSONUri(jsonObject.Icon_url);
        retVal.News_string = StringUtils.DecodeFromJSONUri(jsonObject.News_string);
        retVal.News_button_label = jsonObject.News_button_label;
        retVal.News_link = StringUtils.DecodeFromJSONUri(jsonObject.News_link);
        
        return retVal;
    }
}