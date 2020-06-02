import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';

export class Word_Discover
{
    private _word_discover_id:number;
    public get Word_discover_id():number
    {
        return this._word_discover_id;
    }
    public set Word_discover_id(value:number)
    {
        this._word_discover_id = value;
    }
    
    private _name:string;
    public get Name():string
    {
        return this._name;
    }
    public set Name(value:string)
    {
        this._name = value;
    }
    
    private _url:string;
    public get Url():string
    {
        return this._url;
    }
    public set Url(value:string)
    {
        this._url = value;
    }
    
    private _search_word:string;
    public get Search_word():string
    {
        return this._search_word;
    }
    public set Search_word(value:string)
    {
        this._search_word = value;
    }
    
    private _activated:boolean;
    public get Activated():boolean
    {
        return this._activated;
    }
    public set Activated(value:boolean)
    {
        this._activated = value;
    }
    
    private _seq:number;
    public get Seq():number
    {
        return this._seq;
    }
    public set Seq(value:number)
    {
        this._seq = value;
    }
    
    private _use_for_images:boolean;
    public get Use_for_images():boolean
    {
        return this._use_for_images;
    }
    public set Use_for_images(value:boolean)
    {
        this._use_for_images = value;
    }
    
    private _user_id:number ;
    public get User_id():number
    {
        return this._user_id;
    }
    public set User_id(value:number)
    {
        this._user_id = value;
    }
    
    private _highlight_word:boolean;
    public get Highlight_word():boolean
    {
        return this._highlight_word;
    }
    public set Highlight_word(value:boolean)
    {
        this._highlight_word = value;
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
    
    private _last_updated:Date;
    public get Last_updated():Date
    {
        return this._last_updated;
    }
    public set Last_updated(value:Date)
    {
        this._last_updated = value;
    }
    
    private _deleted:boolean;
    public get Deleted():boolean
    {
        return this._deleted;
    }
    public set Deleted(value:boolean)
    {
        this._deleted = value;
    }
    
    public toString():string
    {
        return this._name;
    }
    
    public getWebsiteUrl(word:string):string
    {
        try
        {
            /* we want to be sure to only replace the 
            * last instance of the word here otherwise
            * we might inadventantly change
            * */
            //int lastPositionOfSearchWord = _Url.LastIndexOf(this.Search_word);
            //int endOfSearchWord = lastPositionOfSearchWord + this.Search_word.Length;
            
            //string bitBeforeWord = _Url.Substring(0, lastPositionOfSearchWord);
            //string bitAfterWord = _Url.Substring(endOfSearchWord, _Url.Length - endOfSearchWord);
            //string result = bitBeforeWord + word + bitAfterWord;
            return StringUtils.ReplaceAll(this.Url, this.Search_word, word);
        }
        catch (Error)
        {
            /*System.Windows.Forms.MessageBox.Show("There was a problem displaying the resource. Please check the settings for " + this.Name);*/
            
        }
        return "";
    }
    
    public GetStatusData():any
    {
        var statusData:any =
            {
                Word_discover_id: this.Word_discover_id,
                Seq: this.Seq,
                Activated: this.Activated
            };
        return statusData;
    }
    
    public static fromJson(jsonObject:any):Word_Discover
    {
        var retVal:Word_Discover = new Word_Discover();
        retVal.Word_discover_id = jsonObject.Word_discover_id;
        retVal.Name = StringUtils.DecodeFromJSONUri(jsonObject.Name);
        if (jsonObject.User_id != null)
        {
            retVal.User_id = jsonObject.User_id;
        }
        retVal.Product_id = jsonObject.Product_id;
        retVal.Url = StringUtils.DecodeFromJSONUri(jsonObject.Url);
        retVal.Search_word = StringUtils.DecodeFromJSONUri(jsonObject.Search_word);
        retVal.Seq = jsonObject.Seq;
        retVal.Use_for_images = jsonObject.Use_for_images;
        retVal.Highlight_word = jsonObject.Highlight_word;
        retVal.Activated = jsonObject.Activated;
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        retVal.Deleted = jsonObject.Deleted;
        
        return retVal;
    }
    
    public toJson():any
    {
        var jsonObject:any = 
            {
                Word_discover_id: this.Word_discover_id, 
                Product_id: this.Product_id,
                User_id: (this.User_id != null ? this.User_id : null),
                Name: StringUtils.EncodeToJSONUri(this.Name),
                Url: StringUtils.EncodeToJSONUri(this.Url),
                Search_word: StringUtils.EncodeToJSONUri(this.Search_word),
                Seq: this.Seq,
                Activated: this.Activated,
                Use_for_images: this.Use_for_images,
                Highlight_word: this.Highlight_word
            };
        return jsonObject;
    }
}