import { UberApplicationEvent } from './UberApplicationEvent';
import { UserSubscription } from '../DataClasses/db/UserSubscription';
import { ActiveSubscription } from '../DataClasses/db/ActiveSubscription';

export class AdminSubscriptionEvent extends UberApplicationEvent {
    public static ADMIN_SUBSCRIPTION_RECEIVED: string = "adminSubscriptionReceived";
    public static ADMIN_SUBSCRIPTION_UPDATED: string = "adminSubscriptionUpdated";
    public static ADMIN_SUBSCRIPTION_ERROR: string = "adminSubscriptionError";

    private active_subscription: UserSubscription;
    //private purchases: UserSubscription[];
    private subscriptionInfo: ActiveSubscription;
    private subscriptionDaysRemaining: number;
    private subscriptionMonthsRemaining: number;
    private errorMessage: string;

    public get Active_Subscription(): UserSubscription {
        return this.active_subscription;
    }

    /* public get Purchases(): UserSubscription[] {
        return this.purchases;
    } */

    public get SubscriptionInfo(): ActiveSubscription {
        return this.subscriptionInfo;
    }

    public get SubscriptionDaysRemaining(): number {
        return this.subscriptionDaysRemaining;
    }

    public get SubscriptionMonthsRemaining(): number {
        return this.subscriptionMonthsRemaining;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, active_subscription: UserSubscription, subscriptionInfo: ActiveSubscription, subscriptionDaysRemaining: number = null, subscriptionMonthsRemaining: number = null, errorMessage: string = null) {
        super(type);
        this.active_subscription = active_subscription;
        this.subscriptionInfo = subscriptionInfo;
        this.subscriptionDaysRemaining = subscriptionDaysRemaining;
        this.subscriptionMonthsRemaining = subscriptionMonthsRemaining;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new AdminSubscriptionEvent(this.type, this.active_subscription, this.subscriptionInfo, this.subscriptionDaysRemaining, this.SubscriptionMonthsRemaining, this.errorMessage);
    }
}