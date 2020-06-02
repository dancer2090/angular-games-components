import { ISO8601Util } from '../../Utils/ISO8601Util';

export class User_Text
{	
    private _user_text_id:number;
    public set User_text_id(value:number)
    {
        this._user_text_id = value;
    }
    public get User_text_id():number
    {
        return this._user_text_id;
    }
    
    private _user_id:number;
    public set User_id(value:number)
    {
        this._user_id = value;
    }
    public get User_id():number
    {
        return this._user_id;
    }
    
    private _text_id:number;
    public set Text_id(value:number)
    {
        this._text_id = value;
    }
    public get Text_id():number
    {
        return this._text_id;
    }
    
    private _bookmark:number;
    public set Bookmark(value:number)
    {
        this._bookmark = value;
    }
    public get Bookmark():number
    {
        return this._bookmark;
    }
    
    private _finished:boolean;
    public set Finished(value:boolean)
    {
        this._finished = value;
    }
    public get Finished():boolean
    {
        return this._finished;
    }
    
    private _last_update:Date;
    public set Last_updated(value:Date)
    {
        this._last_update = value;
    }
    public get Last_updated():Date
    {
        return this._last_update;
    }
    
    private _show_in_library:boolean ;
    public set Show_in_library(value:boolean)
    {
        this._show_in_library = value;
    }
    public get Show_in_library():boolean
    {
        return this._show_in_library;
    }
            
    public static fromJson(jsonObject:any):User_Text
    {
        var retVal:User_Text = new User_Text();
        retVal.User_text_id = jsonObject.User_text_id;
        retVal.User_id = jsonObject.User_id;
        retVal.Text_id = jsonObject.Text_id;
        retVal.Bookmark = jsonObject.Bookmark;
        retVal.Finished = jsonObject.Finished;
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        
        if(jsonObject.Show_in_library != null)
        {
            retVal.Show_in_library = jsonObject.Show_in_library;
        }
        
        return retVal;
    }
    
    public toJson():any
    {
        var jsonObject:any = 
            {
                User_text_id: this.User_text_id,
                User_id: this.User_id,
                Text_id: this.Text_id,
                Bookmark: this.Bookmark,
                Finished: this.Finished,					
                Last_updated: ISO8601Util.formatExtendedDateTime(this.Last_updated),
                Show_in_library: (this.Show_in_library != null ? this.Show_in_library : false)
            };
        return jsonObject;
    }
}