export class Chart_Series
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
    
    private _series_id:number;
    public get Series_id():number
    {
        return this._series_id;
    }
    public set Series_id(value:number)
    {
        this._series_id = value;
    }
    
    private _series_type_id:number;
    public get Series_type_id():number
    {
        return this._series_type_id;
    }
    public set Series_type_id(value:number)
    {
        this._series_type_id = value;
    }
    
    private _chart_series_id:number;
    public get Chart_series_id():number
    {
        return this._chart_series_id;
    }
    public set Chart_series_id(value:number)
    {
        this._chart_series_id = value;
    }
    
    private _sequence:number;
    public get Sequence():number
    {
        return this._sequence;
    }
    public set Sequence(value:number)
    {
        this._sequence = value;
    }
    
    private _y_axis_min:number ;
    public get Y_axis_min():number
    {
        return this._y_axis_min;
    }
    public set Y_axis_min(value:number)
    {
        this._y_axis_min = value;
    }
    
    private _y_axis_max:number ;
    public get Y_axis_max():number
    {
        return this._y_axis_max;
    }
    public set Y_axis_max(value:number)
    {
        this._y_axis_max = value;
    }
    
    private _y_axis_visible:boolean;
    public get Y_axis_visible():boolean
    {
        return this._y_axis_visible;
    }
    public set Y_axis_visible(value:boolean)
    {
        this._y_axis_visible = value;
    }

    private _y_axis_reverse:boolean;
    public get Y_axis_reverse():boolean
    {
        return this._y_axis_reverse;
    }
    public set Y_axis_reverse(value:boolean)
    {
        this._y_axis_reverse = value;
    }
    
    public static fromJson(jsonObject:any):Chart_Series
    {
        var retVal:Chart_Series = new Chart_Series();
        retVal.Chart_series_id = jsonObject.Chart_series_id;
        retVal.Chart_id = jsonObject.Chart_id;
        retVal.Sequence = jsonObject.Sequence;
        retVal.Series_id = jsonObject.Series_id;
        retVal.Series_type_id = jsonObject.Series_type_id;
        retVal.Y_axis_visible = jsonObject.Y_axis_visible;

        //NULLABLE FIELDS
        retVal.Y_axis_max = jsonObject.Y_axis_max;
        retVal.Y_axis_min = jsonObject.Y_axis_min;
        retVal.Y_axis_reverse = jsonObject.Y_axis_reverse;
        
        return retVal;
    }
}