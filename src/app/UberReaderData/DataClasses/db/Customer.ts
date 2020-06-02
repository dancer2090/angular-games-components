import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from 'app/UberReaderData/Utils/ISO8601Util';

export class Customer {
    private customer_id: number;
    private organization_name: string;
    private organization_logo: string;
    private email: string;
    private is_clever_school: boolean;
    private is_classlink_school: boolean;
    private _last_sync: Date;

    public get Customer_id(): number {
        return this.customer_id;
    }

    public get Organization_name(): string {
        return this.organization_name;
    }

    public get Organization_logo(): string {
        return this.organization_logo;
    }

    public get Email(): string {
        return this.email;
    }

    public get Is_Clever_School(): boolean {
        return this.is_clever_school;
    }

    public get Is_classlink_school(): boolean {
        return this.is_classlink_school;
    }
    
    public get LastSync(): Date {
        return this._last_sync;
    }

    public set LastSync(value: Date) {
        this._last_sync = value;
    }

    public static fromJson(jsonObject:any): Customer {
        let retVal:Customer = new Customer();
        retVal.customer_id = jsonObject.Customer_id;
        retVal.organization_name = jsonObject.Organization_name != null ? jsonObject.Organization_name : "";
        retVal.organization_logo = jsonObject.Organization_logo != null ? jsonObject.Organization_logo : "";
        retVal.email = jsonObject.Email != null ? jsonObject.Email : "";
        retVal.is_clever_school = jsonObject.Is_clever_school != null ? jsonObject.Is_clever_school : false;
        retVal.is_classlink_school = jsonObject.Is_classlink_school != null ? jsonObject.Is_classlink_school : false;
        retVal.LastSync = ISO8601Util.parseDateTimeString(jsonObject.Last_sync);
        return retVal;
    }

    public toJson():any
    {
        var jsonObject:any = 
            {
                Customer_id: this.Customer_id, 
                Organization_name: this.Organization_name,
                Organization_logo: this.Organization_logo,
                Email: StringUtils.EncodeToJSONUri(this.Email),
                Is_clever_school: this.Is_Clever_School
            };
        return jsonObject;
    }
}