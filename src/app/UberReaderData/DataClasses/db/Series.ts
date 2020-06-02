export class Series
{
    private _series_id:number;
    public get Series_id():number
    {
        return this._series_id;
    }
    public set Series_id(value:number)
    {
        this._series_id = value;
    }
    
    private _query_sql:string;
    public get Query_sql():string
    {
        return this._query_sql;
    }
    public set Query_sql(value:string)
    {
        this._query_sql = value;
    }
    
    private _series_name:string;
    public get Series_name():string
    {
        return this._series_name;
    }
    public set Series_name(value:string)
    {
        this._series_name = value;
    }
}