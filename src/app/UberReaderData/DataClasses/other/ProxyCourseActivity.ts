import { StringUtils } from '../../Utils/StringUtils';

export class ProxyCourseActivity
{
    private _course_activity_id:number;
    public get Course_activity_id():number
    {
        return this._course_activity_id;
    }
    public set Course_activity_id(value:number)
    {
        this._course_activity_id = value;
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
    
    private _question_id:number ;
    public get Question_id():number
    {
        return this._question_id;
    }
    public set Question_id(value:number)
    {
        this._question_id = value;
    }
    
    private _allow_in_preview:boolean ;
    public get Allow_in_preview():boolean
    {
        return this._allow_in_preview;
    }
    public set Allow_in_preview(value:boolean)
    {
        this._allow_in_preview = value;
    }
    
    private _course_step_name:string
    public get Course_step_name():string
    {
        return this._course_step_name;
    }
    public set Course_step_name(value:string)
    {
        this._course_step_name = value;
    }
    
    public static fromJson(jsonObject:any):ProxyCourseActivity
    {
        let retVal:ProxyCourseActivity = new ProxyCourseActivity();
        retVal.Course_activity_id = jsonObject.Course_activity_id;
        
        if (jsonObject.Allow_in_preview != null)
        {
            retVal.Allow_in_preview = jsonObject.Allow_in_preview
        }
        retVal.Sequence = jsonObject.Sequence;
        
        if (jsonObject.Question_id != null)
        {
            retVal.Question_id = jsonObject.Question_id;
        }
        
        if (jsonObject.Course_step_name != null)
        {
            retVal.Course_step_name = StringUtils.DecodeFromJSONUri(jsonObject.Course_step_name);
        }
        
        return retVal;
    }
}