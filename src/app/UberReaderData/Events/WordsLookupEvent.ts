import { UberApplicationEvent } from './UberApplicationEvent';

export class WordsLookupEvent extends UberApplicationEvent
{
    public static WORDS_FOUND:string = "wordsFound";
    public static WORDS_LOOKUP_ERROR:string = "wordsLookupError";
    
    public static NO_WORDS_FOUND_ERROR:string = "noWordsFoundError";
    
    private _lookupString:string
    public get LookupString():string
    {
        return this._lookupString;
    }
    
    private _words:string[];
    public get Words():string[]
    {
        return this._words;
    }
    
    private _message:string;
    public get Message():string
    {
        return this._message;
    }
    
    constructor(type:string, lookupString:string, words:string[], message:string=null)
    {
        super(type);
        this._lookupString = lookupString;
        this._words = words;
        this._message = message;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new WordsLookupEvent(this.type, this._lookupString, this._words, this._message);
    }
}