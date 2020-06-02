import { ProductInfo } from '../DataClasses/db/ProductInfo';

import { UberApplicationEvent } from './UberApplicationEvent';

export class ProductInfoEvent extends UberApplicationEvent
{
    public static STARTUP_DATA_RECEIVED:string = "startupDataReceived";
    public static STARTUP_DATA_ERROR:string = "startupDataError";

    public static UPDATE_REQUIRED:string = "updateRequiredEvent";
    
    
    private _productInfo:ProductInfo;
    public get productInfo():ProductInfo
    {
        return this._productInfo;
    }
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    constructor(type:string, course:ProductInfo, errorMsg:string)
    {
        super(type);
        this._productInfo = course;
        this._errMsg = errorMsg;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new ProductInfoEvent(this.type, this._productInfo, this._errMsg);
    }
}