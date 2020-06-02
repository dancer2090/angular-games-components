export enum SubscriptionType {
    Business = 'Business',
    Consumer = 'Consumer',
    Homeschool = 'Homeschool',
    EDU = 'EDU'
}

export class SubscriptionOffer {
    private subscription_title: string;
    private num_users: number;
    private subscription_type: string; // “Business”, “Consumer”, “Homeschool”, “EDU”
    private plan_price: number;
    private add_on_price: number;
    private billing_period: number;

    constructor (jsonObject: any) {
        this.Subscription_title = jsonObject.Subscription_title;
        this.Num_users = jsonObject.Num_users;
        this.Subscription_type = jsonObject.Subscription_type;
        this.Plan_price = jsonObject.Plan_price;
        this.Add_on_price = jsonObject.Add_on_price;
        this.Billing_period = jsonObject.Billing_period;
    }

    public get Subscription_title(): string {
        return this.subscription_title;
    }

    public set Subscription_title(value: string) {
        this.subscription_title = value;
    }

    public get Num_users(): number {
        return this.num_users;
    }

    public set Num_users(value: number) {
        this.num_users = value;
    }

    public get Subscription_type(): string {
        return this.subscription_type;
    }

    public set Subscription_type(value: string) {
        this.subscription_type = value;
    }

    public get Plan_price(): number {
        return this.plan_price;
    }

    public set Plan_price(value: number) {
        this.plan_price = value;
    }

    public get Add_on_price(): number {
        return this.add_on_price;
    }

    public set Add_on_price(value: number) {
        this.add_on_price = value;
    }

    public get Billing_period(): number {
        return this.billing_period;
    }
    
    public set Billing_period(value: number) {
        this.billing_period = value;
    }
}