import { SharedProxyText } from '../DataClasses/other/SharedProxyText';

import { UberApplicationEvent } from './UberApplicationEvent';

export class SharedProxyTextsEvent extends UberApplicationEvent
{
    public static SHARED_PROXY_TEXTS_RECEIEVED_SUCCESS:string = "sharedTextReceived";
    public static SHARED_PROXY_TEXTS_RECEIEVED_FAILED:string = "sharedTextError";	
    public static CURRENT_SELECTED:string = "sharedCurrentText";	
    
    private _shared_proxy_texts:SharedProxyText[];
    public get Shared_Proxy_Texts():SharedProxyText[]
    {
        return this._shared_proxy_texts;
    }
    
    constructor(type:string, texts:SharedProxyText[])
    {
        super(type);
        this._shared_proxy_texts = texts;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new SharedProxyTextsEvent(this.type, this._shared_proxy_texts);
    }
}