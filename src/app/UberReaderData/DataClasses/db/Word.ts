import { UberApplication } from '../../UberApplication';

import { Word_PartOfSpeech } from '../other/Word_PartOfSpeech';
import { Word_Sense } from './Word_Sense';
import { Word_Pos } from './Word_Pos';
import { Word_User } from './Word_User';

//import Dictionary = flash.utils.Dictionary;

import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';
import { Indent } from '../../Utils/Indent';

import  { DictionaryString } from '../../Utils/Dictionary';

export class Word
{
    private _word_id:number;
    public get Word_id():number
    {
        return this._word_id;
    }
    public set Word_id(value:number)
    {
        this._word_id= value;
    }
    
    private _word_text:string;
    public get Word_text():string
    {
        return this._word_text;
    }
    public set Word_text(value:string)
    {
        this._word_text= value;
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
    
    //private var _wordSenses:Word_Sense[];
    /*public function get WordSenses():Word_Sense[]
    {
        var retVal:Word_Sense[];
        
        for (var wpos of WordPos)
        {
            retVal = retVal.concat(wpos.WordSenses);
        }
        
        return retVal;
        //return _wordSenses;
    }*/
    /*public function set WordSenses(value:Word_Sense[]):void
    {
        _wordSenses = value;
    }*/
    
    private _toBeDeleted:boolean;
    public get ToBeDeleted():boolean
    {
        return this._toBeDeleted;
    }
    
    public set ToBeDeleted(val:boolean)
    {
        this._toBeDeleted = val;
    }
    
    public GetWorksheetData():any
    {
        return {word: this._word_text, definition: this.DefaultDefinition, mastered:UberApplication.GetInstance().IsMastered(this.Word_id)};
    }
    
    public GetXml(indent:Indent, hidden:boolean):string
    {
        var xml:string = indent + "<word" ;
        
        if (UberApplication.GetInstance().IsMastered(this.Word_id))
        {
            xml += " mastered=\"true\"";
        }
        
        if (hidden)
        {
            xml += " hidden=\"true\"";
        }
        
        xml += ">";
        indent.Increase();
        xml += indent + "<word-text>" + StringUtils.CData(this.Word_text) + "</word-text>";
        
        for (var wpos of this.WordPos)
        {
            for (var sense of wpos.WordSenses)
            {
                xml += sense.GetXml(indent);
            }
        }
        /*for (sense:Word_Sense in WordSenses)
        {
            xml += sense.GetXml(indent);
        }*/
        indent.Decrease();
        xml += indent + "</word>";
        return xml;
    }
    
    /*private Stream GetWordSoundStream()
    {
        string ZIP_FILE_NAME = AppSettings.ExeDir + "//audio";
        
        if (!File.Exists(ZIP_FILE_NAME))
        {
            return null;
        }
        
        string filename = this.Word_text + ".ogg";
        ICSharpCode.SharpZipLib.Zip.ZipFile zipFile = new ZipFile(ZIP_FILE_NAME);
        ZipEntry entry = zipFile.GetEntry("final_ogg/" + filename);
        
        if (entry == null)
        {
            return null;
        }
        
        return zipFile.GetInputStream(entry);
        
    }*/
    
    /*public function get HasSound():boolean
    {
        Stream stream = GetWordSoundStream();
        return stream != null;
    }*/
    
    public get MostCommonSense():Word_Sense
    {
        var retVal:Word_Sense = null;
        
        //var wordSenses:Word_Sense[] = UberApplication.GetInstance().getAllWordSenseByWord(Word_id);
        
        for (var wpos of this.WordPos)
        {
            for (var ws of wpos.WordSenses)
            {
                if (retVal == null || ((ws.Frequency != null?ws.Frequency:0) > (retVal.Frequency != null?retVal.Frequency:0)))
                {
                    retVal = ws;
                }
            }
        }
        
        return retVal;
    }
    
    public get DefaultSense():Word_Sense
    {
        var retVal:Word_Sense = null;
        
        //var wordSenses:Word_Sense[] = UberApplication.GetInstance().getAllWordSenseByWord(Word_id);
        for (var wpos of this.WordPos)
        {
            for (var ws of wpos.WordSenses)
            {
                if (UberApplication.GetInstance().IsDefaultSense(this.Word_id, ws.Word_sense_id))
                {
                    return ws;
                }
                else if (retVal == null || ((ws.Frequency != null?ws.Frequency:0) > (retVal.Frequency != null?retVal.Frequency:0)))
                {
                    retVal = ws;
                }
            }
        }
        
        return retVal;
    }

    
    public getPronunciation():string
    {
        return UberApplication.GetInstance().GetUiTextByKey("WORD_NO_PRONUNCIATION");
    }
    
    public GetPosInOrder(wu:Word_User):Word_PartOfSpeech[]
    {
        let maxFrequencies:DictionaryString<any> = {};
        maxFrequencies[Word_PartOfSpeech.Adj.Type] = 0;
        maxFrequencies[Word_PartOfSpeech.Adv.Type] = 0;
        maxFrequencies[Word_PartOfSpeech.Noun.Type] = 0;
        maxFrequencies[Word_PartOfSpeech.Verb.Type] = 0;
        maxFrequencies[Word_PartOfSpeech.Preposition.Type] = 0;
        maxFrequencies[Word_PartOfSpeech.Conjunction.Type] = 0;
        
        // //get vector of word_pos and then get senses
        for (var wp of this.WordPos)
        {
            var wp_senses:Word_Sense[] = wp.WordSenses;
         
             for (var ws of wp_senses)
             {
                 var pos:Word_PartOfSpeech = Word_PartOfSpeech.getWordPartOfSpeech(wp.PoS);
                 if ((ws.Frequency != null && ws.Frequency > maxFrequencies[pos.Type]))
                 {
                     maxFrequencies[pos.Type] = ws.Frequency;
                 }
             }
         }
        
         if (wu != null && wu.Word_sense != null)
         {
             var posString:string;
             for (var wpos of this.WordPos)
             {
                 if(wpos.Word_Pos_id == wu.Word_sense.Word_pos_id)
                 {
                     posString = wpos.PoS;	
                     break;
                 }
             }
           
             //var activeSensePos:Word_PartOfSpeech = Word_PartOfSpeech.getWordPartOfSpeech(wu.Word_sense.Pos);
             var activeSensePos:Word_PartOfSpeech = Word_PartOfSpeech.getWordPartOfSpeech(posString);
             maxFrequencies[activeSensePos.Type] = Number.MAX_SAFE_INTEGER;
         }
        
         var list:any[] = [];
         for  (var key in maxFrequencies)
         {
             list.push({pos:Word_PartOfSpeech.getWordPartOfSpeech(key), frequency:maxFrequencies[key]});
         }
         list = list.sort(this.ComparePos);
        
        var retVal:Word_PartOfSpeech[] = [];
        
         for  (var val of list)
         {
             retVal.push(val.pos);
         }
        
        return retVal;
    }
    
    private ComparePos(objA:any, objB:any, fields:any[] = null):number
    {
        var valA:number = parseInt(objA["frequency"]);
        var valB:number = parseInt(objB["frequency"]);
        
        if (valA > valB)
        {
            return -1;
        }
        else if (valA < valB)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    
    public GetPos(pos:Word_PartOfSpeech):Word_Sense[]
    {
        var retVal:Word_Sense[] = [];
        
        for (var wpos of this.WordPos)
        {
            var currentPos:Word_PartOfSpeech = Word_PartOfSpeech.getWordPartOfSpeech(wpos.PoS);
            if(pos == currentPos)
            {
                retVal = wpos.WordSenses;
                break;
            }
        }
        
        retVal = retVal.sort(this.CompareWordSenseByFrequency);
        
        return retVal;
    }
    
    private CompareWordSenseByFrequency(x:Word_Sense, y:Word_Sense, fields:any[] = null):number
    {
        var xFrequency:number = x.Frequency != null ? x.Frequency : 0;
        var yFrequency:number = y.Frequency != null ? y.Frequency : 0;
        
        if (xFrequency > yFrequency)
        {
            return -1;
        }
        else if (xFrequency < yFrequency)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    
    public get MostCommonDefinition():string
    {
        var ws:Word_Sense = this.MostCommonSense;
        if (ws)
        {
            return ws.Definition;
        }
        else
        {
            // TODO should return null
            return "";
        }
    }
    
    public get DefaultDefinition():string
    {
        var ws:Word_Sense = this.DefaultSense;
        if (ws)
        {
            return ws.Definition;
        }
        else
        {
            // TODO should return null
            return "";
        }
    }
    
    private _wordPos:Word_Pos[];
    public set WordPos(pos:Word_Pos[])
    {
        this._wordPos = pos; 
    }
    public get WordPos():Word_Pos[]
    {
        return this._wordPos;
    }
    public GetWordPosById(id:number):Word_Pos
    {
        var retVal:Word_Pos = null;
        for (var wp of this.WordPos)
        {
            if(wp.Word_Pos_id == id)
            {
                retVal = wp;
                break;
            }
        }
            
        return retVal;
    }
    public GetWordPosBySenseId(senseId:number):Word_Pos
    {
        var retVal:Word_Pos = null;
        for (var wp of this.WordPos)
        {
            for (var ws of wp.WordSenses)
            {
                retVal = wp;
                break;
            }
            
            if(wp) break;
        }
        
        return retVal; 
    }
    
    public get AllWordSense():Word_Sense[]
    {
        var wordSenses:Word_Sense[] = null;
        
        if(this.WordPos != null && this.WordPos.length > 0)
        {
            wordSenses = [];
            
            for (var wpos of this.WordPos)
            {
                if(wpos.WordSenses && wpos.WordSenses.length > 0)
                {
                    wordSenses = wordSenses.concat(wpos.WordSenses);
                }
            }
        }

        return wordSenses;
    }
    
    public static fromJson(jsonObject:any):Word
    {
        var retVal:Word = new Word();
        retVal.Word_id = jsonObject.Word_id;
        retVal.Word_text = StringUtils.DecodeFromJSONUri(jsonObject.Word_text);
        if (jsonObject.User_id != null)
        {
            retVal.User_id = jsonObject.User_id;
        }
        
        retVal.WordPos = [];
        for  (var wordPosObject of jsonObject.Word_PoSs)
        {
            var wordPosInstance:Word_Pos = Word_Pos.fromJson(wordPosObject);
            retVal.WordPos.push(wordPosInstance);
        }
        
        retVal.ToBeDeleted = false;
        
        return retVal;
    }
}