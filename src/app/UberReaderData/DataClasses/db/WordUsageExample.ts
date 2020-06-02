import { StringUtils } from '../../Utils/StringUtils';

export class WordUsageExample
{
    private _example:string;
    public set Example(val:string)
    {
        this._example = val;
    }
    public get Example():string
    {
        return this._example;
    }
    
    private _genre:string;
    public set Genre(val:string)
    {
        this._genre = val;
    }
    public get Genre():string
    {
        return this._genre;
    }
    
    private _source_title:string;
    public set Source_title(val:string)
    {
        this._source_title = val;
    }
    public get Source_title():string
    {
        return this._source_title;
    }
    
    private _sub_genre_id:number ;
    public set Sub_genre_id(val:number)
    {
        this._sub_genre_id = val;
    }
    public get Sub_genre_id():number
    {
        return this._sub_genre_id;
    }
    
    private _text_title:string;
    public set Text_title(val:string)
    {
        this._text_title = val;
    }
    public get Text_title():string
    {
        return this._text_title;
    }
    
    private _word_pos_id:number;
    public set Word_Pos_id(val:number)
    {
        this._word_pos_id = val;
    }
    public get Word_Pos_id():number
    {
        return this._word_pos_id;
    }
    
    private _word_usage_example_id:number;
    public set Word_usage_example_id(val:number)
    {
        this._word_usage_example_id = val;
    }
    public get Word_usage_example_id():number
    {
        return this._word_usage_example_id;
    }
    
    private _year:number ;
    public set Year(val:number)
    {
        this._year = val;
    }
    public get Year():number
    {
        return this._year;
    }
    
    public static fromJson(jsonObject:any):WordUsageExample
    {
        var retVal:WordUsageExample = new WordUsageExample();
        retVal.Example = StringUtils.DecodeFromJSONUri(jsonObject.Example);
        retVal.Genre = jsonObject.Genre;
        
        if(jsonObject.Source_title != null)
        {
            retVal.Source_title = StringUtils.DecodeFromJSONUri(jsonObject.Source_title);
        }
        
        if(jsonObject.Sub_genre_id != null)
        {
            retVal.Sub_genre_id = jsonObject.Sub_genre_id;
        }
        
        if(jsonObject.Text_title != null)
        {
            retVal.Text_title = StringUtils.DecodeFromJSONUri(jsonObject.Text_title);
        }
        
        retVal.Word_Pos_id = jsonObject.Word_pos_id;
        retVal.Word_usage_example_id = jsonObject.Word_usage_example_id;
        
        if(jsonObject.Year != null)
        {
            retVal.Year = jsonObject.Year;
        }
        
        return retVal;
    }
}