import { UberApplicationEvent } from './UberApplicationEvent';

export class UploadPurchaseOrderEvent extends UberApplicationEvent
{
    public static PURCHASE_ORDER_UPLOAD_SUCCESS:string = "purchaseOrderUploadSuccess";
    public static PURCHASE_ORDER_UPLOAD_ERROR:string = "purchaseOrderUploadError";
        

    private _errorMessage: string;
    public get ErrorMessage(): string 
    {
        return this._errorMessage;
    }

    constructor(type:string, errMsg?: string)
    {
        super(type);
        this._errorMessage = errMsg;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new UploadPurchaseOrderEvent(this.type, this._errorMessage);
    }
}