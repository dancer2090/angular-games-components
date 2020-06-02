import { StringUtils } from '../../Utils/StringUtils';

import { Word_Sense } from './Word_Sense';

export class Word_Pos
{
    private _pos:string;
    public set PoS(pos:string)
    {
        this._pos = pos;
    }
    public get PoS():string
    {
        return this._pos;
    }
    
    private _wordId:number;
    public set Word_id(id:number)
    {
        this._wordId = id;
    }
    public get Word_id():number
    {
        return this._wordId;
    }
    
    private _word_pos_id:number;
    public set Word_Pos_id(id:number)
    {
        this._word_pos_id = id;
    }
    public get Word_Pos_id():number
    {
        return this._word_pos_id;
    }
    
    private _wordSenses:Word_Sense[];
    public set WordSenses(senses:Word_Sense[])
    {
        this._wordSenses = senses;
    }
    public get WordSenses():Word_Sense[]
    {
        return this._wordSenses;
    }
    
    public static fromJson(jsonObject:any):Word_Pos
    {
        var retVal:Word_Pos = new Word_Pos();
        retVal.PoS = jsonObject.PoS;
        retVal.Word_id = jsonObject.Word_id;
        retVal.Word_Pos_id = jsonObject.Word_pos_id;
        retVal.WordSenses = [];
        
        for  (var wordSenseObject of jsonObject.Word_senses)
        {
            var wordSense:Word_Sense = Word_Sense.fromJson(wordSenseObject);
            //wordSense.Word_id = retVal.Word_id;
            retVal.WordSenses.push(wordSense);
        }			
        return retVal;
    }
}