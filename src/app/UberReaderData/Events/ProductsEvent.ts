import { ProductInfo } from '../DataClasses/db/ProductInfo';

import { UberApplicationEvent } from './UberApplicationEvent';

export class ProductsEvent extends UberApplicationEvent
{
    public static PRODUCT_DATA_RECEIVED:string = "productDataReceived";		
    public static PRODUCT_CALL_FAILED:string = "productCallFailed";
    
    private _products:ProductInfo[];
    public get Products():ProductInfo[]
    {
        return this._products;
    }
    
    private errorMessage:string;
    public get ErrorMessage():string
    {
        return this.errorMessage;
    }
    
    constructor(type:string, products:ProductInfo[], errMsg:string)
    {
        super(type);
        this._products = products;
        this.errorMessage = errMsg;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new ProductsEvent(this.type, this._products, this.errorMessage);
    }
}