import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';

export class Purchase {

    private transactionId: number;
    private purchaseDate: Date;
    private expiryDate: Date;
    private total_licenses: number;
    private isTrial: boolean;
    private active : boolean;

    public get TransactionId(): number {
        return this.transactionId;
    }

    public set TransactionId(value:number) {
        this.transactionId = value;
    }
    
    public get PurchaseDate(): Date {
        return this.purchaseDate;
    }

    public set PurchaseDate(value:Date) {
        this.purchaseDate = value;
    }

    public get ExpiryDate(): Date {
        return this.expiryDate;
    }

    public set ExpiryDate(value: Date) {
        this.expiryDate = value;
    }

    public get Total_licenses(): number {
        return this.total_licenses;
    }

    public set Total_licenses(value: number) {
        this.total_licenses = value;
    }
    
    public get IsTrial(): boolean {
        return this.isTrial;
    }

    public set IsTrial(value: boolean) {
        this.isTrial = value;
    }

    public get Active(): boolean {
        return this.active;
    }

    public set Active(value: boolean) {
        this.active = value;
    }

    public static fromJson(jsonObject:any): Purchase {
        let retVal: Purchase = new Purchase();

        retVal.TransactionId = jsonObject.TransactionId;
        retVal.PurchaseDate = ISO8601Util.parseDateTimeString(jsonObject.PurchaseDate);
        retVal.ExpiryDate = ISO8601Util.parseDateTimeString(jsonObject.ExpiryDate);
        retVal.Total_licenses = jsonObject.Total_licenses;
        retVal.IsTrial = jsonObject.IsTrial;
        retVal.Active = jsonObject.Active;

        return retVal;
    }

    public toJson(): any {
        let jsonObject: any = {
            TransactionId: this.TransactionId,
            PurchaseDate: this.PurchaseDate != null ? ISO8601Util.formatExtendedDateTime(this.PurchaseDate) : null,
            ExpiryDate: this.ExpiryDate != null ? ISO8601Util.formatExtendedDateTime(this.ExpiryDate) : null,
            Total_licenses: this.Total_licenses,
            IsTrial: this.IsTrial,
            Active: this.Active,            
        };
        return jsonObject;
    }
}