import { ProxyText } from '../DataClasses/other/ProxyText';

import { UberApplicationEvent } from './UberApplicationEvent';

export class ProxyTextSelectedEvent extends UberApplicationEvent
{
    private _proxyText:ProxyText;
    public get _ProxyText():ProxyText
    {
        return this._proxyText;
    }
    
    public static PROXY_TEXT_SELECTED:string = "proxtTextSelected";
    
    constructor(type:string, proxyText:ProxyText)
    {
        super(type);
        this._proxyText = proxyText;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new ProxyTextSelectedEvent(this.type, this._proxyText);
    }
}