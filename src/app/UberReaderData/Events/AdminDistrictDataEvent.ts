import { UberApplicationEvent } from './UberApplicationEvent';
import { ProxySchool } from '../DataClasses/db/ProxySchool';
import { District } from '../DataClasses/db/District';

export class AdminDistrictDataEvent extends UberApplicationEvent {
    public static ADMIN_DISTRICT_DATA_RECEIVED: string = "adminDistrictDataReceived";
    public static ADMIN_DISTRICT_DATA_ERROR: string = "adminDistrictDataError";

    private _district: District;
    private errorMessage: string;
    private _proxySchools: ProxySchool[];

    public get District(): District {
        return this._district;
    }

    public get ProxySchools(): ProxySchool[] {
        return this._proxySchools;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, district: District, proxySchools: ProxySchool[], errMsg: string = "") {
        super(type);
        this._district = district;
        this._proxySchools = proxySchools;
        this.errorMessage = errMsg;        
    }
}