import { Chart_Series } from './Chart_Series';
import { Chart_Category } from './Chart_Category';

export class Chart
{
    private _chart_id:number;
    public get Chart_id():number
    {
        return this._chart_id;
    }
    public set Chart_id(value:number)
    {
        this._chart_id = value;
    }
    
    private _chart_title:string;
    public get Chart_title():string
    {
        return this._chart_title;
    }
    public set Chart_title(value:string)
    {
        this._chart_title = value;
    }
    
    public get Label():string
    {
        return this._chart_title;
    }
    public set Label(value:string)
    {
        this._chart_title = value;
    }
    
    private _x_axis_is_date:boolean;
    public get X_axis_is_date():boolean
    {
        return this._x_axis_is_date;
    }
    public set X_axis_is_date(value:boolean)
    {
        this._x_axis_is_date = value;
    }
    
    private _default_grouping:string;
    public get Default_grouping():string
    {
        return this._default_grouping;
    }
    public set Default_grouping(value:string)
    {
        this._default_grouping = value;
    }
    
    private _filter_by_wordlist:boolean;
    public get Filter_by_wordlist():boolean
    {
        return this._filter_by_wordlist;
    }
    public set Filter_by_wordlist(value:boolean)
    {
        this._filter_by_wordlist = value;
    }
    
    private _auto_range:boolean;
    public get Auto_range():boolean
    {
        return this._auto_range;
    }
    public set Auto_range(value:boolean)
    {
        this._auto_range = value;
    }
    
    private _chart_series:Chart_Series[];
    public get chart_series():Chart_Series[]
    {
        return this._chart_series;
    }
    public set chart_series(value:Chart_Series[])
    {
        this._chart_series = value;
    }
    
    private _is_report:boolean;
    public get Is_report():boolean
    {
        return this._is_report;
    }
    public set Is_report(value:boolean)
    {
        this._is_report = value;
    }

    private _chart_category:Chart_Category;
    public get chart_category():Chart_Category
    {
        return this._chart_category;
    }
    public set chart_category(value:Chart_Category)
    {
        this._chart_category = value;
    }

    public static fromJson(jsonObject:any):Chart
    {
        var retVal:Chart = new Chart();
        retVal.Chart_id = jsonObject.Chart_id;
        retVal.Auto_range = jsonObject.Auto_range;
        retVal.Chart_title = jsonObject.Chart_title;
        retVal.Default_grouping = jsonObject.Default_grouping;
        retVal.Filter_by_wordlist = jsonObject.Filter_by_wordlist;
        retVal.X_axis_is_date = jsonObject.X_axis_is_date;
        retVal.Is_report = jsonObject.Is_report;
        retVal.chart_series = [];
        for  (var chartSeriesObject of jsonObject.ChartSeries)
        {
            var chartSeries:Chart_Series = Chart_Series.fromJson(chartSeriesObject);
            retVal.chart_series.push(chartSeries);
        }
        
        return retVal;
    }
}