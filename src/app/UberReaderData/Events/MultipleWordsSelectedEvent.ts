import { Word } from '../DataClasses/db/Word';

import { UberApplicationEvent } from './UberApplicationEvent';

export class MultipleWordsSelectedEvent extends UberApplicationEvent
{
    public static MULTIPLE_WORDS_SELECTED:string = "multipleWordsSelected";
    public static WORDS_FOUND:string = "wordsFound";
    public static WORDS_LOOUP_ERROR:string = "wordsLookupError";
    
    
    private _words:Word[];
    public get Words():Word[]
    {
        return this._words;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, words:Word[], errorMessage:string=null)
    {
        super(type);
        this._words = words;
        this._errorMessage = errorMessage;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new MultipleWordsSelectedEvent(this.type, this._words, this._errorMessage);
    }
}