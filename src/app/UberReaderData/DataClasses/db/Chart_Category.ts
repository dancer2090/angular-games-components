import { Chart } from './Chart';

export class Chart_Category
{
    private _chart_category_id:number;
    public get Chart_category_id():number
    {
        return this._chart_category_id;
    }
    public set Chart_category_id(value:number)
    {
        this._chart_category_id = value;
    }
    
    private _category_name:string;
    public get Category_name():string
    {
        return this._category_name;
    }
    public set Category_name(value:string)
    {
        this._category_name = value;
    }		
    
    public get Label():string
    {
        return this._category_name;
    }

    private _user_report_category:boolean
    public get User_report_category():boolean
    {
        return this._user_report_category;
    }
    public set User_report_category(value:boolean)
    {
        this._user_report_category = value;
    }	
    
    private _charts:Chart[];
    public get Charts():Chart[]
    {
        return this._charts;
    }
    public set Charts(value:Chart[])
    {
        this._charts = value;
    }
    
    public static fromJson(jsonObject:any):Chart_Category
    {
        var retVal:Chart_Category = new Chart_Category();
        retVal.Chart_category_id = jsonObject.Chart_category_id;
        retVal.Category_name = jsonObject.Category_name;
        retVal.User_report_category = jsonObject.User_report_category;
        retVal.Charts = [];
        for  (var chartObject of jsonObject.Charts)
        {
            var chart:Chart = Chart.fromJson(chartObject);
            chart.chart_category = retVal;
            retVal.Charts.push(chart);
        }
        
        return retVal;
    }
}