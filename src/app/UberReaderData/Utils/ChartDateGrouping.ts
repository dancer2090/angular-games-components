export class ChartDateGrouping
{
    public static NONE:number = 0;
    public static DAY:number = 1;
    public static MONTH:number = 2;
    public static YEAR:number = 3;

    public static Parse(str:string):number
    {
        if (str == "None")
        {
            return ChartDateGrouping.NONE;
        }
        else if (str == "Day")
        {
            return ChartDateGrouping.DAY;
        }
        else if (str == "Month")
        {
            return ChartDateGrouping.MONTH;
        }
        else if (str == "Year")
        {
            return ChartDateGrouping.YEAR;
        }
        else
        {
            return ChartDateGrouping.NONE;
        }
    }
}
