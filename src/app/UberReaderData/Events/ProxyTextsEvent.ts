import { ProxyText } from '../DataClasses/other/ProxyText';

import { UberApplicationEvent } from './UberApplicationEvent';

export class ProxyTextsEvent extends UberApplicationEvent
{
    public static PROXY_TEXTS_RETRIEVED:string = "proxyTextsRetrieved";
    public static PROXY_TEXTS_RETRIEVAL_FAILED:string = "proxyTextsRetrievalFailed";
    
    public static PROXY_TEXT_DELETED:string = "proxyTextsDeleted";
    public static PROXY_TEXT_DELETE_FAILED:string = "proxyTextsDeleteFailed";
    
    private _texts:ProxyText[];
    public get Texts():ProxyText[]
    {
        return this._texts;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, texts:ProxyText[], errorMessage:string=null)
    {
        super(type);
        this._texts = texts;
        this._errorMessage = errorMessage;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new ProxyTextsEvent(this.type, this._texts, this._errorMessage);
    }
}