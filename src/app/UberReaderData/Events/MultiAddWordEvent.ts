import { UberApplicationEvent } from './UberApplicationEvent';

export class MultiAddWordEvent extends UberApplicationEvent
{
    public static WORDS_ADDED:string = "multipleWordsAdded";
    public static MULTI_ADD_WORD_ERROR:string = "multiAddWordError";
    
    private _wordInsertResults:any[];
    public get WordInsertResults():any[]
    {
        return this._wordInsertResults;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, wordInsertResults:any[], errorMessage:string=null)
    {
        super(type);
        this._wordInsertResults = wordInsertResults;
        this._errorMessage = errorMessage;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new MultiAddWordEvent(this.type, this._wordInsertResults, this._errorMessage);
    }
}