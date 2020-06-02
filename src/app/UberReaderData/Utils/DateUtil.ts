export class DateUtil
{
    public static millisecondsInDay:number = 1000 * 3600 * 24;

    public static MonthDifference(d1:Date, d2:Date):number
    {
        let months = Math.abs((d2.getFullYear() * 12 +  d2.getMonth()) -  (d1.getFullYear() * 12 +  d1.getMonth())) + 1;
        return months;
    }

    public static DayDifference(d1:Date, d2:Date):number
    {
        let differenceInMilliseconds = Math.abs(d2.getTime() - d1.getTime());
        let days = Math.ceil(differenceInMilliseconds / DateUtil.millisecondsInDay);
        return days;
    }
}