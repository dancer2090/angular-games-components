import { UberApplicationEvent } from './UberApplicationEvent';

export class DeleteWordEvent extends UberApplicationEvent
{
    public static WORDLIST_WORD_DELETE_SUCCESS:string = "wordlistWordsDeleteSuccessful";
    public static WORDLIST_WORD_DELETE_ERROR:string = "wordlistWordsDeleteError";
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    constructor(type:string, errorMsg:string="")
    {
        super(type);
        this._errMsg = errorMsg;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new DeleteWordEvent(this.type, this._errMsg);
    }
}