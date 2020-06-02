import { UberApplicationEvent } from './UberApplicationEvent';
import { Group } from '../DataClasses/db/Group';
import { Customer } from '../DataClasses/db/Customer';
import { UserSubscription } from '../DataClasses/db/UserSubscription';

export class CleverEvent extends UberApplicationEvent {
    public static CLEVER_TRIAL_UPGRADED: string = "cleverTrialUpgraded";
    public static CLEVER_TRIAL_UPGRADE_ERROR: string = "cleverTrialUpgradeError";
    
    private customer: Customer;
    private subscription: UserSubscription;
    private errorMessage:string;

    public get Customer(): Customer {
        return this.customer;
    }
    
    public get Subscription(): UserSubscription {
        return this.subscription;
    }
    
    public get ErrorMessage():string
    {
        return this.errorMessage;
    }

    constructor(type: string, subscription: UserSubscription, customer: Customer, errorMessage: string = null) {
        super(type);     
        this.subscription = subscription;   
        this.customer = customer;     
        this.errorMessage = errorMessage;
    }
    
    public clone(): UberApplicationEvent {
        return new CleverEvent(this.type, this.subscription, this.customer, this.errorMessage);
    }
}