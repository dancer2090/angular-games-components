import { ProxyWordlist } from '../DataClasses/other/ProxyWordlist';

import { UberApplicationEvent } from './UberApplicationEvent';

export class ProxyWordlistsEvent extends UberApplicationEvent
{
    public static PROXY_WORDLISTS_RETRIEVED:string = "proxyWordlistsRetrieved";
    public static PROXY_WORDLISTS_RETRIEVAL_FAILED:string = "proxyWordlistsRetrievalFailed";
    
    private _wordlists:ProxyWordlist[];
    public get Wordlists():ProxyWordlist[]
    {
        return this._wordlists;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, wordlists:ProxyWordlist[], errorMessage:string=null)
    {
        super(type);
        this._wordlists = wordlists;
        this._errorMessage = errorMessage;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new ProxyWordlistsEvent(this.type, this._wordlists, this._errorMessage);
    }
}