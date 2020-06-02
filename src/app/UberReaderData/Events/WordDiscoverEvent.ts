import { Word_Discover } from '../DataClasses/db/Word_Discover';

import { UberApplicationEvent } from './UberApplicationEvent';

export class WordDiscoverEvent extends UberApplicationEvent
{
    public static WORD_DISCOVER_SELECTED:string = "wordDiscoverSelected";
    public static WORD_DISCOVER_CANCELLED:string = "wordDiscoverCancelled";
    public static WORD_DISCOVER_INSERTED:string = "wordDiscoverInserted";
    public static WORD_DISCOVER_INSERT_ERROR:string = "wordDiscoverInsertError";
    public static WORD_DISCOVER_UPDATED:string = "wordDiscoverUpdated";
    public static WORD_DISCOVER_UPDATE_ERROR:string = "wordDiscoverUpdateError";
    
    private _wordDiscover:Word_Discover;
    public get wordDiscover():Word_Discover
    {
        return this._wordDiscover;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, wordDiscover:Word_Discover, errorMessage:string=null)
    {
        super(type);
        this._wordDiscover = wordDiscover;
        this._errorMessage = errorMessage;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new WordDiscoverEvent(this.type, this._wordDiscover, this._errorMessage);
    }
}