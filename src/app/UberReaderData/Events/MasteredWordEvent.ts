import { Word } from '../DataClasses/db/Word';

import { UberApplicationEvent } from './UberApplicationEvent';

export class MasteredWordEvent extends UberApplicationEvent
{
    public static MASTERED_CLICKED:string = "wordMastered";
    
    private _word:Word;
    public get word():Word
    {
        return this._word;
    }
    
    constructor(type:string, word:Word)
    {
        super(type);
        this._word = word;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new MasteredWordEvent(this.type, this._word);
    }
}