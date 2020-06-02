import { UberApplicationEvent } from './UberApplicationEvent';
import { DictionaryNumber } from '../Utils/Dictionary';

export class ChartDataEvent extends UberApplicationEvent
{
    public static CHART_DATA_RECEIVED:string = "chartDataReceived";
    public static CHART_DATA_ERROR:string = "chartDataError";

    public static USER_REPORT_DATA_RECEIVED:string = "userReportDataReceived";
    public static USER_REPORT_DATA_ERROR:string = "userReportDataError";

    public static GROUP_CHART_DATA_RECEIVED:string = "groupChartDataReceived";
    public static GROUP_CHART_DATA_ERROR:string = "groupChartDataError";
    
    public static MINI_CHART_DATA_RECEIVED:string = "miniChartDataReceived";
    public static MINI_CHART_DATA_ERROR:string = "miniChartDataError";
    
    private _chartResults:DictionaryNumber<any>;
    public get ChartResults():DictionaryNumber<any>
    {
        return this._chartResults;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, chartResults:DictionaryNumber<any>, errorMessage:string=null)
    {
        super(type);
        this._chartResults = chartResults;
        this._errorMessage = errorMessage;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new ChartDataEvent(this.type, this._chartResults, this._errorMessage);
    }
}