import { UberApplication } from '../../UberApplication';
import { Word_PartOfSpeech } from '../other/Word_PartOfSpeech';
import { Word_Pos } from './Word_Pos';

import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';
import { Indent } from '../../Utils/Indent';

export class Word_Sense
{
    
    
    private _word_sense_id:number;
    public get Word_sense_id():number
    {
        return this._word_sense_id;
    }
    public set Word_sense_id(value:number)
    {
        this._word_sense_id = value;
    }
    
    private _word_pos_id:number;
    public get Word_pos_id():number
    {
        return this._word_pos_id;
    }
    public set Word_pos_id(value:number)
    {
        this._word_pos_id = value;
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
    
    private _definition:string;
    public get Definition():string
    {
        return this._definition;
    }
    public set Definition(value:string)
    {
        this._definition = value;
    }
    
    private _synonyms:string;
    public get Synonyms():string
    {
        return this._synonyms;
    }
    public set Synonyms(value:string)
    {
        this._synonyms = value;
    }
    
    private _antonyms:string;
    public get Antonyms():string
    {
        return this._antonyms;
    }
    public set Antonyms(value:string)
    {
        this._antonyms = value;
    }
    
    private _frequency:number ;
    public get Frequency():number
    {
        return this._frequency;
    }
    public set Frequency(value:number)
    {
        this._frequency = value;
    }
    
    private _example_1:string;
    public get Example_1():string
    {
        return this._example_1;
    }
    public set Example_1(value:string)
    {
        
        this._example_1 = value;
    }
    
    private _example_2:string;
    public get Example_2():string
    {
        return this._example_2;
    }
    public set Example_2(value:string)
    {
        this._example_2 = value;
    }
    
    private _example_3:string;
    public get Example_3():string
    {
        return this._example_3;
    }
    
    public set Example_3(value:string)
    {
        this._example_3 = value;
    }
    
    private _example_4:string;
    public get Example_4():string
    {
        return this._example_4;
    }
    public set Example_4(value:string)
    {
        this._example_4 = value;
    }
    
    /*private var _pos:string;
    public function get Pos():string
    {
        return _pos;
    }
    public function set Pos(value:string):void
    {
        _pos = value;
    }*/
    
    public get SpelledPos():string
    {
        var wordPos:Word_Pos = UberApplication.GetInstance().GetWordPosByIds(this.Word_pos_id);	
        return Word_PartOfSpeech.getWordPartOfSpeech(wordPos.PoS).Type;
    }
    
    /*private var _word_id:number;
    public function get Word_id():int
    {
        return _word_id;
    }
    public function set Word_id(value:number):void
    {
        _word_id = value;
    }*/
    
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
    
    public GetXml(indent:Indent):string
    {
        var freqency:number = 0;
        if (this.Frequency != null)
        {
            freqency = this.Frequency;
        }
        
        var wordPos:Word_Pos = UberApplication.GetInstance().GetWordPosByIds(this.Word_pos_id);
        var xml:string = indent + "<sense frequency=\"" + freqency + "\" pos=\"" + wordPos.PoS + "\"";
        if (UberApplication.GetInstance().IsDefaultSense(wordPos.Word_id, this.Word_sense_id))
        {
            xml += " default=\"true\"";
        }
        
        
        xml += ">";
        
        
        indent.Increase();
        xml += indent + "<definition>" + StringUtils.CData(this.Definition) + "</definition>";
        
        if(this.Synonyms != null && this.Synonyms.length > 0)
            xml += indent + "<synonyms>" + StringUtils.CData(this.Synonyms) + "</synonyms>";
        if(this.Antonyms != null && this.Antonyms.length > 0)
            xml += indent + "<antonyms>" + StringUtils.CData(this.Antonyms) + "</antonyms>";
        
        if(this.Example_1 != null && this.Example_1.length > 0)
            xml += indent + "<example>" + StringUtils.CData(this.Example_1) + "</example>";
        
        if (this.Example_2 != null && this.Example_2.length > 0)
            xml += indent + "<example>" + StringUtils.CData(this.Example_2) + "</example>";
        
        if (this.Example_3 != null && this.Example_3.length > 0)
            xml += indent + "<example>" + StringUtils.CData(this.Example_3) + "</example>";
        
        if (this.Example_4 != null && this.Example_4.length > 0)
            xml += indent + "<example>" + StringUtils.CData(this.Example_4) + "</example>";
        indent.Decrease();
        xml += indent + "</sense>";
        return xml;
    }
    
    public get SynonymList():string[]
    {
        var retVal:string[] = [];
        if (this.Synonyms != null && this.Synonyms.length > 0)
        {
            var synonymsSplit:any[] = this.Synonyms.split(",");
            for (var syn of synonymsSplit)
            {
                retVal.push(syn.trim());
            }
        }
        return retVal;
    }
    
    public get AntonymList():string[]
    {
        var retVal:string[] = [];
        if (this.Antonyms != null && this.Antonyms.length > 0)
        {
            var antonymsSplit:any[] = this.Antonyms.split(",");
            for (var ant of antonymsSplit)
            {
                retVal.push(ant.trim());
            }
        }
        return retVal;
    }
    
    public get Examples():string[]
    {
        var retVal:string[] = [];
        if (this.Example_1 != null && this.Example_1.length > 0)
        {
            retVal.push(this.Example_1);
        }
        if (this.Example_2 != null && this.Example_2.length > 0)
        {
            retVal.push(this.Example_2 );
        }
        if (this.Example_3 != null && this.Example_3.length > 0)
        {
            retVal.push(this.Example_3);
        }
        if (this.Example_4 != null && this.Example_4.length > 0)
        {
            retVal.push(this.Example_4);
        }
        return retVal;
    }
    
    /*private var _old_word_pos_id:number ;
    public function set Old_word_pos_id(val:number):void
    {
        _old_word_pos_id = val;
    }
    public function get Old_word_pos_id():number
    {
        return _old_word_pos_id;
    }*/
    
    private _old_word_pos_id:number;
    public get Old_Word_Pos_id():number
    {
        return this._old_word_pos_id;
    }		
    public set Old_Word_Pos_id(val:number)
    {
        this._old_word_pos_id = val;
    }
    
    public static fromJson(jsonObject:any):Word_Sense
    {
        var retVal:Word_Sense = new Word_Sense();
        retVal.Word_sense_id = jsonObject.Word_sense_id;
        retVal.Word_pos_id = jsonObject.Word_pos_id;
        if (jsonObject.User_id != null)
        {
            retVal.User_id = jsonObject.User_id;
        }
        retVal.Definition = StringUtils.DecodeFromJSONUri(jsonObject.Definition);
        //retVal.Pos = jsonObject.Pos;
        if (jsonObject.Frequency != null)
        {
            retVal.Frequency = jsonObject.Frequency;
        }
        retVal.Synonyms = StringUtils.DecodeFromJSONUri(jsonObject.Synonyms);
        retVal.Antonyms = StringUtils.DecodeFromJSONUri(jsonObject.Antonyms);
        retVal.Example_1 = StringUtils.DecodeFromJSONUri(jsonObject.Example_1);
        retVal.Example_2 = StringUtils.DecodeFromJSONUri(jsonObject.Example_2);
        retVal.Example_3 = StringUtils.DecodeFromJSONUri(jsonObject.Example_3);
        retVal.Example_4 = StringUtils.DecodeFromJSONUri(jsonObject.Example_4);
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        retVal.Deleted = jsonObject.Deleted;
        
        retVal.Old_Word_Pos_id = jsonObject.Word_pos_id;
        /*if(jsonObject.Old_word_pos_id != null)
        {
            retVal.Old_word_pos_id = jsonObject.Old_word_pos_id;
        }*/
        
        return retVal;
    }
    
    public toJson():any
    {
        var jsonObject:any = 
            {
                Word_sense_id: this.Word_sense_id,
                Word_pos_id: this.Word_pos_id,
                //Word_id: this.Word_id,
                User_id: (this.User_id != null ? this.User_id : null),
                Definition: StringUtils.EncodeToJSONUri(this.Definition),
                Synonyms: StringUtils.EncodeToJSONUri(this.Synonyms),
                Antonyms: StringUtils.EncodeToJSONUri(this.Antonyms),
                Frequency: (this.Frequency != null ? this.Frequency : null),
                Example_1: StringUtils.EncodeToJSONUri(this.Example_1),
                Example_2: StringUtils.EncodeToJSONUri(this.Example_2),
                Example_3: StringUtils.EncodeToJSONUri(this.Example_3),
                Example_4: StringUtils.EncodeToJSONUri(this.Example_4),
                //Pos: this.Pos
            };
        return jsonObject;
    }
}