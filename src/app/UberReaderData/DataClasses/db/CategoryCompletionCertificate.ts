import { ISO8601Util } from '../../Utils/ISO8601Util';

export class CategoryCompletionCertificate {
    private category_name: string;
    private date_completed: Date;

    public get Category_name(): string {
        return this.category_name;
    }

    public set Category_name(value: string) {
        this.category_name = value;
    }

    public get Date_completed(): Date {
        return this.date_completed;
    }

    public set Date_completed(value: Date) {
        this.date_completed = value;
    }

    public static fromJson(jsonObject: any): CategoryCompletionCertificate {        
        let retVal: CategoryCompletionCertificate = new CategoryCompletionCertificate();

        retVal.Category_name = jsonObject.Category_name;
        retVal.Date_completed = ISO8601Util.parseDateTimeString(jsonObject.Date_Completed);

        return retVal;
    }
}