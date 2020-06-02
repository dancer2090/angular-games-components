import { Word } from '../DataClasses/db/Word';

import { UberApplicationEvent } from './UberApplicationEvent';

export class AddWordToListEvent extends UberApplicationEvent
{
    
    public static ADD_WORD:string = "addWordToList";
    public static WORD_INSERT_SUCCESS:string = "wordInsertSuccess";
    public static WORD_INSERT_FAILED:string = "wordInsertFailed";
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    private _word:Word;
    public get word():Word
    {
        return this._word;
    }
    
    constructor(type:string, word:Word, errorMsg:string="")
    {
        super(type);
        this._word = word;
        this._errMsg = errorMsg;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new AddWordToListEvent(this.type, this.word, this._errMsg);
    }
}