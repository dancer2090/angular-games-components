import { ISO8601Util } from '../../Utils/ISO8601Util';

export class UserSubscription {
    private expiryDate: Date;
    private purchaseDate: Date;
    private licensesUsed: number;
    private totalLicenses: number;
    private transactionID: number;
    private isTrial: boolean;
    private active : boolean;

    public get ExpiryDate(): Date {
        return this.expiryDate;
    }

    public set ExpiryDate(value: Date) {
        this.expiryDate = value;
    }

    public get PurchaseDate(): Date {
        return this.purchaseDate;
    }

    public set PurchaseDate(value:Date) {
        this.purchaseDate = value;
    }

    public get Licenses_used(): number {
        return this.licensesUsed;
    }
    public set Licenses_used(value:number) {
        this.licensesUsed = value;
    }

    public get Licenses_remaining(): number {
        return this.totalLicenses - this.Licenses_used;
    }

    public get Total_licenses(): number {
        return this.totalLicenses;
    }

    public set Total_licenses(value: number) {
        this.totalLicenses = value;
    }

    public get TransactionId(): number {
        return this.transactionID;
    }

    public set TransactionId(value:number) {
        this.transactionID = value;
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
    
    public static fromJson(jsonObject:any): UserSubscription {        
        let retVal: UserSubscription = new UserSubscription();

        retVal.expiryDate = ISO8601Util.parseDateTimeString(jsonObject.ExpiryDate);
        retVal.purchaseDate = ISO8601Util.parseDateTimeString(jsonObject.PurchaseDate);
        
        retVal.totalLicenses = jsonObject.Total_licenses;
        retVal.transactionID = jsonObject.TransactionId;
        retVal.isTrial = jsonObject.IsTrial;
        retVal.Active = jsonObject.Active;
        
        return retVal;
    }
}