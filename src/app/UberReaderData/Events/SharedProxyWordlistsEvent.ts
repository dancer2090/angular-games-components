import { SharedProxyWordlist } from '../DataClasses/other/SharedProxyWordlist';

import { UberApplicationEvent } from './UberApplicationEvent';

export class SharedProxyWordlistsEvent extends UberApplicationEvent
{
    public static SHARED_PROXY_WORDLISTS_RECEIEVED_SUCCESS:string = "sharedWordlistsReceived";
    public static SHARED_PROXY_WORDLISTS_RECEIEVED_FAILED:string = "sharedWordlistsError";	
    public static CURRENT_SELECTED:string = "sharedCurrentWordlist";	
    
    private _shared_proxy_wordlists:SharedProxyWordlist[];
    public get Shared_Proxy_WordLists():SharedProxyWordlist[]
    {
        return this._shared_proxy_wordlists;
    }
    
    constructor(type:string, wordLists:SharedProxyWordlist[])
    {
        super(type);
        this._shared_proxy_wordlists = wordLists;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new SharedProxyWordlistsEvent(this.type, this._shared_proxy_wordlists);
    }
}