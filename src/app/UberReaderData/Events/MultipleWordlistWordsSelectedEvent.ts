import { Wordlist_Word } from '../DataClasses/db/Wordlist_Word';

import { UberApplicationEvent } from './UberApplicationEvent';

export class MultipleWordlistWordsSelectedEvent extends UberApplicationEvent
{
    public static MULTIPLE_WORDS_SELECTED:string = "multipleWordsSelected";
    public static WORDS_FOUND:string = "wordsFound";
    public static WORDS_LOOUP_ERROR:string = "wordsLookupError";
    
    
    private _wordlistWords:Wordlist_Word[];
    public get WordlistWords():Wordlist_Word[]
    {
        return this._wordlistWords;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, wordlistWords:Wordlist_Word[], errorMessage:string=null)
    {
        super(type);
        this._wordlistWords = wordlistWords;
        this._errorMessage = errorMessage;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new MultipleWordlistWordsSelectedEvent(this.type, this._wordlistWords, this._errorMessage);
    }
}