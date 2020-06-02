import { ISO8601Util } from '../../Utils/ISO8601Util';

export class School_Trial_Info {
    private isSchoolTrial: boolean;
    private expiry_date: Date;    

    public get IsSchoolTrial(): boolean {
        return this.isSchoolTrial;
    }

    public set IsSchoolTrial(value: boolean) {
        this.isSchoolTrial = value
    }

    public get Expiry_date(): Date {
        return this.expiry_date;
    }

    public set Expiry_date(value: Date) {
        this.expiry_date = value
    }

    public static fromJson(jsonObject: any): School_Trial_Info {
        let retVal: School_Trial_Info = new School_Trial_Info();
        retVal.IsSchoolTrial = jsonObject.IsSchoolTrial;
        retVal.Expiry_date = ISO8601Util.parseDateTimeString(jsonObject.Expiry_date);
        return retVal;
    }
}