import { UberApplication } from '../../UberApplication';

import { ISO8601Util } from '../../Utils/ISO8601Util';
import { StringUtils } from '../../Utils/StringUtils';
import { Word } from "./Word";

export class Wordlist_Word
{
    private _wordlist_word_id:number;
    public get Wordlist_word_id():number
    {
        return this._wordlist_word_id;
    }
    public set Wordlist_word_id(value:number)
    {
        this._wordlist_word_id = value;
    }
    
    private _wordlist_id:number;
    public get Wordlist_id():number
    {
        return this._wordlist_id;
    }
    public set Wordlist_id(value:number)
    {
        this._wordlist_id = value;
    }
    
    private _word_id:number;
    public get Word_id():number
    {
        return this._word_id;
    }
    public set Word_id(value:number)
    {
        this._word_id = value;
    }
    
    private _word_added:string;
    public get Word_added():string
    {
        if (this._word_added == null)
        {
            this._word_added = this.getWord().Word_text;
        }
        return this._word_added;
    }
    public set Word_added(value:string)
    {
        this._word_added = value;
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

    private _seen:boolean;
    public get Seen():boolean
    {
        return this._seen;
    }
    public set Seen(value:boolean)
    {
        this._seen = value;
    }
    
    public getWord():Word
    {
        return UberApplication.GetInstance().GetWordById(this._word_id);
    }
    
    public static fromJson(jsonObject:any):Wordlist_Word
    {
        var retVal:Wordlist_Word = new Wordlist_Word();
        retVal.Wordlist_word_id = jsonObject.Wordlist_word_id;
        retVal.Wordlist_id = jsonObject.Wordlist_id;
        retVal.Word_id = jsonObject.Word_id;
        retVal.Word_added = StringUtils.DecodeFromJSONUri(jsonObject.Word_added);
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        retVal.Deleted = jsonObject.Deleted;
        retVal.Seen = jsonObject.Seen;
        
        return retVal;
    }
}