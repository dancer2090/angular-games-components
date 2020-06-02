import { ISO8601Util } from 'app/UberReaderData/Utils/ISO8601Util';

export class District {
    private _distric_id: number;
    private _distric_name: string;
    private _last_sync: Date;

    constructor(jsonObject: any) {
        this.DistrictID = jsonObject.District_id;
        this.DistrictName = jsonObject.Name;
        this.LastSync = ISO8601Util.parseDateTimeString(jsonObject.Last_sync);
    }

    public get DistrictID(): number {
        return this._distric_id;
    }

    public set DistrictID(value: number) {
        this._distric_id = value;
    }

    public get DistrictName(): string {
        return this._distric_name;
    }

    public set DistrictName(value: string) {
        this._distric_name = value ? value : "";
    }

    public get LastSync(): Date {
        return this._last_sync;
    }

    public set LastSync(value: Date) {
        this._last_sync = value;
    }
}