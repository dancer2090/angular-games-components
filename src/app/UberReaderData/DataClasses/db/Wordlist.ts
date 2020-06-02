import { UberApplication } from '../../UberApplication';
import { Wordlist_Word } from './Wordlist_Word';
import { Word } from './Word';

import { ISO8601Util } from '../../Utils/ISO8601Util';
import { StringUtils } from '../../Utils/StringUtils';
import { Indent } from '../../Utils/Indent';

export class Wordlist
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
    
    private _category_id:number ;
    public get Category_id():number
    {
        return this._category_id;
    }
    public set Category_id(value:number)
    {
        this._category_id = value;
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
    
    private _wordlistWords:Wordlist_Word[];
    public get WordlistWords():Wordlist_Word[]
    {
        return this._wordlistWords;
    }
    public set WordlistWords(value:Wordlist_Word[])
    {
        this._wordlistWords = value;
    }
    
    private _shared_object_id:number;
    public get Shared_object_id():number
    {
        return this._shared_object_id;
    }
    public set Shared_object_id(value:number)
    {
        this._shared_object_id = value;
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
    
    private _can_edit:boolean;
    public get Can_edit():boolean
    {
        return this._can_edit;
    }
    public set Can_edit(value:boolean)
    {
        this._can_edit = value;
    }

    private _is_public:boolean;
    public get Is_public():boolean
    {
        return this._is_public;
    }
    public set Is_public(value:boolean)
    {
        this._is_public = value;
    }
    
    public Clone():Wordlist
    {
        var retVal:Wordlist = new Wordlist();
        retVal.Category_id = this.Category_id;
        retVal.Deleted = this.Deleted;
        retVal.Last_updated = this.Last_updated;
        retVal.Name = this.Name;
        retVal.Sequence = this.Sequence;
        retVal.User_id = this.User_id;
        retVal.Wordlist_id = this.Wordlist_id;
        retVal.WordlistWords = this.WordlistWords;
        retVal.Shared_object_id = this.Shared_object_id;
        retVal.Owner = this.Owner;
        retVal.Num_Words = this.Num_Words;
        retVal.Can_edit = this.Can_edit;
        retVal.Can_Edit_String = this.Can_edit ? UberApplication.GetInstance().GetUiTextByKey("GEN_YES") : UberApplication.GetInstance().GetUiTextByKey("GEN_NO");
        retVal.Is_public = this._is_public;
        return retVal;
    }
    
    public GetWorksheetList():any[]
    {
        var retVal:any[] = [];
        var randomizedWordlist:Word[] = this.GetAllWordsRandomized();
        
        for (var word of randomizedWordlist)
        {
            retVal.push(word.GetWorksheetData());
        }
        return retVal;
    }
    
    private RandomizeWordIds():number[]
    {
        var originalVector:number[] = [];
        for (var wlw of this.WordlistWords)
        {
            originalVector.push(wlw.Word_id);
        }
        var finalList:number[] = [];
        
        while (originalVector.length > 0)
        {
            var randomPosition:number = Math.floor(Math.random() * originalVector.length);
            finalList.push(originalVector[randomPosition]);
            //originalVector.removeAt(randomPosition);
            //originalVector = originalVector.splice(randomPosition, 1);
            originalVector.splice(randomPosition, 1);
        }
        
        return finalList;
    }
    
    public GetXml(minWordsRequired:number):string
    {
        var indent:Indent = new Indent();
        var xml:string = "<wordlist name=\"" + this.Name + "\">";
        indent.Increase();
        
        var randomizedWordIds:number[] = this.RandomizeWordIds();
        
        for (var wordId of randomizedWordIds)
        {
            xml += UberApplication.GetInstance().GetWordById(wordId).GetXml(indent, false);
        }
        
        var wordlistWordCount:number = this.WordlistWords.length;
        
        var extraWordsRequired:number = minWordsRequired - wordlistWordCount;
        
        indent.Decrease();
        xml += indent + "</wordlist>";
        return xml;
    }
    
    /*public function GetXml(minWordsRequired:number):string
    {
        var indent:Indent = new Indent();
        var xml:string = "<wordlist name=\"" + Name + "\">";
        indent.Increase();
        
        var randomizedWordlist:Word[] = GetAllWordsRandomized();
        
        for (word:Word in randomizedWordlist)
        {
            xml += word.GetXml(indent, false);
        }
        
        var wordlistWordCount:int = UberApplication.CountWordlistWordWithWordList(Wordlist_id);
        
        var extraWordsRequired:int = minWordsRequired - wordlistWordCount;
        
        if (extraWordsRequired > 0)
        {
            var randomWordlist:Word[]  = UberApplication.GetInstance().GetRandomWordlist(extraWordsRequired);
            for (w:Word in randomWordlist)
            {
                xml += w.GetXml(indent, true);
            }
        }
        
        indent.Decrease();
        xml += indent + "</wordlist>";
        return xml;
    }*/
    
    public GetSimpleString():string
    {
        var randomizedWordlist:Word[] = this.GetAllWordsRandomized();
        var simpleString:string = "";
        for (var w of randomizedWordlist)
        {
            simpleString += w.Word_text + " ";
        }
        return simpleString;
    }
    
    public GetAllWordsRandomized():Word[]
    {
        var tempList:Word[] = UberApplication.GetInstance().getWordsByWordlist(this);
        var finalList:Word[] = [];
        
        while (tempList.length > 0)
        {
            var randomPosition:number = Math.floor(Math.random() * tempList.length);
            finalList.push(tempList[randomPosition]);
            //tempList.removeAt(randomPosition);
            tempList.splice(randomPosition, 1);
        }
        
        return finalList;
    }
    
    public static fromJson(jsonObject:any):Wordlist
    {
        var retVal:Wordlist = new Wordlist();
        retVal.Wordlist_id = jsonObject.Wordlist_id;
        retVal.Name = StringUtils.DecodeFromJSONUri(jsonObject.Name);
        retVal.Sequence = jsonObject.Sequence;
        
        if (jsonObject.Category_id != null)
        {
            retVal.Category_id = jsonObject.Category_id;
        }
        if (jsonObject.User_id != null)
        {
            retVal.User_id = jsonObject.User_id;
        }
        retVal.WordlistWords = [];
        for  (var wordlistWordObject of jsonObject.Wordlist_Words)
        {
            var wordlistWord:Wordlist_Word = Wordlist_Word.fromJson(wordlistWordObject);
            retVal.WordlistWords.push(wordlistWord);
        }
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        retVal.Deleted = jsonObject.Deleted;
        retVal.Shared_object_id = jsonObject.Shared_Object_id;
        retVal.Owner = StringUtils.DecodeFromJSONUri(jsonObject.Owner);
        retVal.Num_Words = jsonObject.Num_Words;
        retVal.Can_edit = jsonObject.Can_edit;
        retVal.Can_Edit_String = retVal.Can_edit ? UberApplication.GetInstance().GetUiTextByKey("GEN_YES") : UberApplication.GetInstance().GetUiTextByKey("GEN_NO");
        retVal.Is_public = jsonObject.Is_public;
        return retVal;
    }
    
    public toJson():any
    {
        var jsonObject:any = 
            {
                Wordlist_id: this.Wordlist_id, 
                Name: StringUtils.EncodeToJSONUri(this.Name),
                Sequence: this.Sequence,
                Category_id: (this.Category_id != null ? this.Category_id : null),
                User_id: (this.User_id != null ? this.User_id : null),
                Shared_object_id: this.Shared_object_id,
                Owner: StringUtils.DecodeFromJSONUri(this.Owner),
                Num_Words: this.Num_Words,
                Is_public: this.Is_public
            };
        return jsonObject;
    }
}