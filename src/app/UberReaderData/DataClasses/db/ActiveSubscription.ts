import { ISO8601Util } from '../../Utils/ISO8601Util';
import { SubscriptionOffer } from './SubscriptionOffer';

export class ActiveSubscription {
    private currentPeriodStartDate: Date;
    private currentPeriodEndDate: Date;
    private active : boolean;
    private nextBillingDate: Date;
    private nextBillingPeriodAmount: number;
    private currency: string;
    private paymentMethodType: string;
    private paymentMethodValue: string;
    private status: string;
    private subscriptionOffer: SubscriptionOffer;    

    public get CurrentPeriodStartDate(): Date {
        return this.currentPeriodStartDate;
    }

    public set CurrentPeriodStartDate(value: Date) {
        this.currentPeriodStartDate = value;
    }    

    public get CurrentPeriodEndDate(): Date {
        return this.currentPeriodEndDate;
    }

    public set CurrentPeriodEndDate(value: Date) {
        this.currentPeriodEndDate = value;
    }

    public get Active(): boolean {
        return this.active;
    }

    public set Active(value: boolean) {
        this.active = value;
    }

    public get NextBillingDate(): Date {
        return this.nextBillingDate;
    }

    public set NextBillingDate(value: Date) {
        this.nextBillingDate = value;
    }

    public get NextBillingPeriodAmount(): number {
        return this.nextBillingPeriodAmount;
    }

    public set NextBillingPeriodAmount(value: number) {
        this.nextBillingPeriodAmount = value;
    }

    public get Currency(): string {
        return this.currency;
    }

    public set Currency(value: string) {
        this.currency = value;
    }

    public get PaymentMethodType(): string {
        return this.paymentMethodType;
    }

    public set PaymentMethodType(value: string) {
        this.paymentMethodType = value;
    }

    public get PaymentMethodValue(): string {
        return this.paymentMethodValue;
    }

    public set PaymentMethodValue(value: string) {
        this.paymentMethodValue = value;
    }

    public get Status(): string {
        return this.status;
    }

    public set Status(value: string) {
        this.status = value;
    }

    public get SubscriptionOffer(): SubscriptionOffer {
        return this.subscriptionOffer;
    }

    public set SubscriptionOffer(value: SubscriptionOffer) {
        this.subscriptionOffer = value;
    }
    
    public static fromJson(jsonObject: any): ActiveSubscription {
        let retVal: ActiveSubscription = new ActiveSubscription();

        retVal.CurrentPeriodStartDate = ISO8601Util.parseDateTimeString(jsonObject.Current_period_start_date);
        retVal.CurrentPeriodEndDate = ISO8601Util.parseDateTimeString(jsonObject.Current_period_end_date);        
        retVal.Active = jsonObject.Active;
        retVal.NextBillingDate = ISO8601Util.parseDateTimeString(jsonObject.Next_billing_date);
        retVal.NextBillingPeriodAmount = jsonObject.Next_billing_period_amount;
        retVal.Currency = jsonObject.Currency;
        retVal.PaymentMethodType = jsonObject.Payment_method_type;
        retVal.PaymentMethodValue = jsonObject.Payment_method_value;
        retVal.Status = jsonObject.Status;
        retVal.SubscriptionOffer = new SubscriptionOffer(jsonObject.Subscription_Offer);
        
        return retVal;
    }
}