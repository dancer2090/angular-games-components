import { Word } from '../DataClasses/db/Word';

import { UberApplicationEvent } from './UberApplicationEvent';

export class WordEvent extends UberApplicationEvent
{
    public static WORD_TO_EDIT:string = "wordToEdit";
    public static WORD_CREATED:string = "wordCreated";
    public static WORD_CREATION_ERROR:string = "wordCreationError";
    public static WORD_FOUND:string = "wordFound";
    public static WORD_LOOKUP_ERROR:string = "wordLookupError";
    
    public static WORD_NOT_FOUND:string = "Word Not Found";
    
    public static WORD_INSERT_SUCCESS:string = "wordInsertedSuccess";
    public static WORD_INSERT_FAILED:string = "wordInsertedSuccess";
    
    private _word:Word;
    public get word():Word
    {
        return this._word;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    private _wordToSearch:string;
    public get WordToSearch():string
    {
        return this._wordToSearch;
    }
    public set WordToSearch(word:string)
    {
        this._wordToSearch = word;
    }
    
    constructor(type:string, word:Word, errorMessage:string=null, wordToSearch:string="")
    {
        super(type);
        this._word = word;
        this._errorMessage = errorMessage;
        this._wordToSearch = wordToSearch;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new WordEvent(this.type, this._word, this._errorMessage, this._wordToSearch);
    }
}