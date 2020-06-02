import { ProxyWordlist } from '../DataClasses/other/ProxyWordlist';

import { UberApplicationEvent } from './UberApplicationEvent';

export class ProxyWordlistEvent extends UberApplicationEvent
{
    public static RENAME_WORDLIST:string = "renameWordlist";
    public static DELETE_WORDLIST:string = "deleteWordlist";
    public static SHARE_WORDLIST:string = "shareWordlist";
    
    public static WORDLIST_RENAMED:string = "wordlistRenamed";
    public static WORDLIST_RENAME_ERROR:string = "wordlistRenameError";
    
    private _wordlist:ProxyWordlist;
    public get Wordlist():ProxyWordlist
    {
        return this._wordlist;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, wordlist:ProxyWordlist, errorMessage:string=null)
    {
        super(type);
        this._wordlist = wordlist;
        this._errorMessage = errorMessage;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new ProxyWordlistEvent(this.type, this._wordlist, this._errorMessage);
    }
}