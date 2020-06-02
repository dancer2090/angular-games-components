export class UserStatusPoints {
    private userID: number;
    private productID: number;
    private currentDayTotal: number;
    private currentWeekTotal: number;
    private yesterdayTotal: number;
    private lastWeekTotal: number;
    private total: number;

    public get UserID(): number {
        return this.userID;
    }

    public set UserID(value: number) {
        this.userID = value;
    }

    public get ProductID(): number {
        return this.productID;
    }

    public set ProductID(value: number) {
        this.productID = value;
    }

    public get CurrentDayTotal(): number {
        return this.currentDayTotal;
    }

    public set CurrentDayTotal(value: number) {
        this.currentDayTotal = value;
    }

    public get CurrentWeekTotal(): number {
        return this.currentWeekTotal;
    }

    public set CurrentWeekTotal(value: number) {
        this.currentWeekTotal = value;
    }

    public get YesterdayTotal(): number {
        return this.yesterdayTotal;
    }

    public set YesterdayTotal(value: number) {
        this.yesterdayTotal = value;
    }

    public get LastWeekTotal(): number {
        return this.lastWeekTotal;
    }

    public set LastWeekTotal(value: number) {
        this.lastWeekTotal = value;
    }

    public get Total(): number {
        return this.total;
    }

    public set Total(value: number) {
        this.total = value;
    }

    public static fromJson(jsonObject: any): UserStatusPoints {
        let retVal: UserStatusPoints = new UserStatusPoints();
        retVal.UserID = jsonObject.User_id;
        retVal.ProductID = jsonObject.Product_id;
        retVal.CurrentDayTotal = jsonObject.Current_day_total;
        retVal.CurrentWeekTotal = jsonObject.Current_week_total;
        retVal.YesterdayTotal = jsonObject.Yesterday_total;
        retVal.LastWeekTotal = jsonObject.Last_week_total;
        retVal.Total = jsonObject.Total;
        return retVal;
    }
}