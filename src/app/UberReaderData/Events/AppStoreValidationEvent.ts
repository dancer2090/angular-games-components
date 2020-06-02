import { UberApplicationEvent } from './UberApplicationEvent';

export class AppStoreValidationEvent extends UberApplicationEvent
{
    public static RECEIPT_DATA_RECEIVED:string = "receiptDataReceived";
    public static RECEIPT_DATA_ERROR:string = "receiptDataError";
    public static INVALID_RECEIPT:string = "invalidReceipt";
    
    private _receipt:string;
    public get Receipt():string
    {
        return this._receipt;
    }
    
    private _errMsg:string;
    public get ErrorMsg():string
    {
        return this._errMsg;
    }
    
    constructor(type:string, receipt:string, errorMsg:string="")
    {
        super(type);
        this._receipt = receipt;
        this._errMsg = errorMsg;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new AppStoreValidationEvent(this.type, this._receipt, this._errMsg);
    }
}