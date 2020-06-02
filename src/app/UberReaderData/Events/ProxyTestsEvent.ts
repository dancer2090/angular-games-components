import { ProxyTest } from '../DataClasses/other/ProxyTest';

import { UberApplicationEvent } from './UberApplicationEvent';

export class ProxyTestsEvent extends UberApplicationEvent
{
    public static PROXY_TESTS_RETRIEVED:string = "proxyTestsRetrieved";
    public static PROXY_TEST_RETRIEVAL_FAILED:string = "proxyTestRetrievalFailed";
    
    private _proxyTests:ProxyTest[];
    public get ProxyTests():ProxyTest[]
    {
        return this._proxyTests;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, proxyTests:ProxyTest[], errorMessage:string=null)
    {
        super(type);
        this._proxyTests = proxyTests;
        this._errorMessage = errorMessage;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new ProxyTestsEvent(this.type, this._proxyTests, this._errorMessage);
    }
}