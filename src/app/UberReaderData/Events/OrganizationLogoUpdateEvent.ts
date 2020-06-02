import { UberApplicationEvent } from './UberApplicationEvent';
import { Customer } from '../DataClasses/db/Customer';

export class OrganizationLogoUpdateEvent extends UberApplicationEvent
{
    public static ORGRANIZATION_LOGO_UPDATED:string = "schoolLogoUpdated";
    public static ORGRANIZATION_LOGO_UPDATE_ERROR:string = "schoolLogoUpdateError";
    
    private _customer: Customer;
    public get Customer(): Customer
    {
        return this._customer;
    }
    
    constructor(type:string, customer: Customer)
    {
        super(type);
        this._customer = customer;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new OrganizationLogoUpdateEvent(this.type, this._customer);
    }
}