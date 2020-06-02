import { Shared_Object } from '../db/Shared_Object';
import { Wordlist } from '../db/Wordlist';
import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';
import { UberApplication } from '../../UberApplication';

export class SharedProxyWordlist extends Shared_Object
{
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
    
    private _owner:string;
    public get Owner():string
    {
        return this._owner;
    }
    public set Owner(value:string)
    {
        this._owner = value;
    }
    
    private _num_words:number;
    public get Num_Words():number
    {
        return this._num_words;
    }
    public set Num_Words(value:number)
    {
        this._num_words = value;
    }
    
    private _can_edit_string:string;
    public get Can_Edit_String():string
    {
        return this._can_edit_string;
    }
    public set Can_Edit_String(value:string)
    {
        this._can_edit_string = value;
    }
    
    public Clone():SharedProxyWordlist
    {
        var retVal:SharedProxyWordlist = new SharedProxyWordlist();
        retVal.Category_id = this.Category_id;
        retVal.Deleted = this.Deleted;
        retVal.Last_updated = this.Last_updated;
        retVal.Name = this.Name;
        retVal.Sequence = this.Sequence;
        retVal.Wordlist_id = this.Wordlist_id;
        retVal.Shared_object_id = this.Shared_object_id;
        retVal.Owner = this.Owner;
        retVal.Num_Words = this.Num_Words;
        retVal.Can_edit = this.Can_edit;
        retVal.Can_Edit_String = this.Can_edit ? UberApplication.GetInstance().GetUiTextByKey("GEN_YES") : UberApplication.GetInstance().GetUiTextByKey("GEN_NO");
        return retVal;
    }
    
    public init(wordlist:Wordlist):void
    {
        //Wordlist_id = wordlist.Wordlist_id;
        this.Name = wordlist.Name;
        this.Sequence = wordlist.Sequence;
        this.Category_id = wordlist.Category_id;
        this.Last_updated = wordlist.Last_updated;
        this.Deleted = wordlist.Deleted;
        this.Shared_object_id = wordlist.Shared_object_id;
        this.Owner = wordlist.Owner;
        this.Num_Words = wordlist.Num_Words;
        this.Can_edit = wordlist.Can_edit;
        this.Can_Edit_String = wordlist.Can_Edit_String;
    }
    
    public static fromJson(jsonObject:any):SharedProxyWordlist
    {
        var retVal:SharedProxyWordlist = new SharedProxyWordlist();
        retVal.Wordlist_id = jsonObject.Wordlist_id;
        retVal.Name = StringUtils.DecodeFromJSONUri(jsonObject.Name);
        retVal.Sequence = jsonObject.Sequence;
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        retVal.Deleted = jsonObject.Deleted;
        retVal.Num_Words = jsonObject.Num_Words;
        
        //shared stuff
        retVal.Owner = StringUtils.DecodeFromJSONUri(jsonObject.Owner);
        retVal.Shared_object_id = jsonObject.Shared_object_id;			
        retVal.Can_edit = jsonObject.Can_edit;
        retVal.Can_Edit_String = retVal.Can_edit ? UberApplication.GetInstance().GetUiTextByKey("GEN_YES") : UberApplication.GetInstance().GetUiTextByKey("GEN_NO");	
        
        if (jsonObject.User_id != null)
        {
            retVal.User_id = jsonObject.User_id;
        }
        if (jsonObject.Group_id != null)
        {
            retVal.Group_id = jsonObject.Group_id;
        }
        
        return retVal;
    }
}