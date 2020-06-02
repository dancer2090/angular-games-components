import { ProxyText } from '../DataClasses/other/ProxyText';

import { UberApplicationEvent } from './UberApplicationEvent';

export class EditMyTextEvent extends UberApplicationEvent
{
    public static EDIT_TEXT:string = "editMyTextContent";
    public static DELETE_TEXT:string = "deleteMyTextContent";
    public static SHARE_TEXT:string = "shareMyText";
    
    private _proxyText:ProxyText;
    public get Proxy_Text():ProxyText
    {
        return this._proxyText;
    }		
    
    constructor(type:string, proxyText:ProxyText)
    {
        super(type);
        this._proxyText = proxyText;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new EditMyTextEvent(this.type, this._proxyText);
    }
    
}