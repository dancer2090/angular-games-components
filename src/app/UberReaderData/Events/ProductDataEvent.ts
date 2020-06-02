import { UberApplicationEvent } from './UberApplicationEvent';

export class ProductDataEvent extends UberApplicationEvent
{
    public static PRODUCT_DATA_LOADED:string = "productDataLoaded";		
    
    private _products:string;
    public get ProductDataString():string
    {
        return this._products;
    }
    
    constructor(type:string, products:string)
    {
        super(type);
        this._products = products;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new ProductDataEvent(this.type, this._products);
    }
}