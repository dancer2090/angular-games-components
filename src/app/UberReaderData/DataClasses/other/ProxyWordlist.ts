import { Wordlist } from '../db/Wordlist';
import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';

export class ProxyWordlist
{
    private _wordlist_id:number;
    public get Wordlist_id():number
    {
        return this._wordlist_id;
    }
    public set Wordlist_id(value:number)
    {
        this._wordlist_id = value;
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
    
    private _sequence:number;
    public get Sequence():number
    {
        return this._sequence;
    }
    public set Sequence(value:number)
    {
        this._sequence = value;
    }
    
    private _num_words:number;
    public get Number_of_words():number
    {
        return this._num_words;
    }
    public set Number_of_words(value:number)
    {
        this._num_words = value;
    }
    
    private _category_id:number;
    public get Category_id():number
    {
        return this._category_id;
    }
    public set Category_id(value:number)
    {
        this._category_id = value;
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
    
    public Clone():ProxyWordlist
    {
        var retVal:ProxyWordlist = new ProxyWordlist();
        retVal.Category_id = this.Category_id;
        retVal.Deleted = this.Deleted;
        retVal.Last_updated = this.Last_updated;
        retVal.Name = this.Name;
        retVal.Sequence = this.Sequence;
        retVal.Wordlist_id = this.Wordlist_id;
        return retVal;
    }
    
    public init(wordlist:Wordlist):void
    {
        this.Wordlist_id = wordlist.Wordlist_id;
        this.Name = wordlist.Name;
        this.Sequence = wordlist.Sequence;
        this.Category_id = wordlist.Category_id;
        this.Last_updated = wordlist.Last_updated;
        this.Deleted = wordlist.Deleted;
    }
    
    public static fromJson(jsonObject:any):ProxyWordlist
    {
        var retVal:ProxyWordlist = new ProxyWordlist();
        retVal.Wordlist_id = jsonObject.Wordlist_id;
        retVal.Name = StringUtils.DecodeFromJSONUri(jsonObject.Name);
        retVal.Sequence = jsonObject.Sequence;
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        retVal.Deleted = jsonObject.Deleted;
        retVal.Number_of_words = jsonObject.Number_of_words;
        
        return retVal;
    }
}