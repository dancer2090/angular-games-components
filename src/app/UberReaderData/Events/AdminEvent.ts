import { UberApplicationEvent } from './UberApplicationEvent';
import { Group } from '../DataClasses/db/Group';
import { Customer } from '../DataClasses/db/Customer';
import { UserSubscription } from '../DataClasses/db/UserSubscription';
import { District } from '../DataClasses/db/District';
import { Grading_Template } from '../DataClasses/db/Grading_Template';
import { ActiveSubscription } from '../DataClasses/db/ActiveSubscription';
import { Assignment_Type } from '../DataClasses/db/Assignment_Type';

export class AdminEvent extends UberApplicationEvent {
    public static ADMIN_DATA_RECEIVED: string = "adminDataReceived";
    public static ADMIN_SYNC_DATA_RECEIVED: string = "adminSyncDataReceived";
    public static ADMIN_DATA_ERROR: string = "adminDataError";
    public static ORGANIZATION_NAME_UPDATED: string = "organizationNameUpdated";
    public static ORGANIZATION_NAME_UPDATE_ERROR: string = "organizationNameUpdateError"

    private customer: Customer;
    private customers: Customer[];
    private classes: Group[];
    private subscription: UserSubscription;
    private subscriptionInfo: ActiveSubscription;
    private district: District;
    private errorMessage: string;
    private currentUserType: string;
    private gradingTemplates: Grading_Template[];
    private assignmentTypes: Assignment_Type[];
    public Sync_status: string;

    public get Customer(): Customer {
        return this.customer;
    }

    public get Customers(): Customer[] {
        return this.customers;
    }

    public get Classes(): Group[] {
        return this.classes;
    }

    public get Subscription(): UserSubscription {
        return this.subscription;
    }

    public get SubscriptionInfo(): ActiveSubscription {
        return this.subscriptionInfo;
    }

    public get District(): District {
        return this.district;
    }

    public get CurrentUserType(): string {
        return this.currentUserType;
    }

    public get GradingTemplates(): Grading_Template[] {
        return this.gradingTemplates;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    public get AssignmentTypes(): Assignment_Type[] {
        return this.assignmentTypes;
    }

    constructor(type: string, customer: Customer, customers: Customer[], classes: Group[], subscription: UserSubscription, subscriptionInfo: ActiveSubscription, district: District, userType: string, gradingTemplates: Grading_Template[], assignmentTypes: Assignment_Type[], errorMessage: string = null, sync_status?: string) {
        super(type);
        this.customer = customer;
        this.customers = customers;
        this.subscription = subscription;
        this.subscriptionInfo = subscriptionInfo;
        this.classes = classes;
        this.district = district;
        this.currentUserType = userType;
        this.gradingTemplates = gradingTemplates;
        this.errorMessage = errorMessage;
        this.Sync_status = sync_status;
        this.assignmentTypes = assignmentTypes;
    }

    public clone(): UberApplicationEvent {
        return new AdminEvent(this.type, this.customer, this.customers, this.classes, this.subscription, this.subscriptionInfo, this.district, this.currentUserType, this.gradingTemplates, this.assignmentTypes, this.errorMessage);
    }
}