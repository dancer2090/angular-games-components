export class ExamInfo
{
    public static PROFILE_MODE_DEEP_DIVE: string = 'deep_dive';
    public static PROFILE_MODE_NORMAL: string = 'normal';
   
    private _exam_name:string;
    public get Exam_name():string
    {
        return this._exam_name;
    }
    public set Exam_name(value:string)
    {
        this._exam_name = value;
    }
    
    private _profile_mode:string;
    public get Profile_mode():string
    {
        return this._profile_mode;
    }
    public set Profile_mode(value:string)
    {
        this._profile_mode = value;
    }
    
    public static fromJson(jsonObject:any):ExamInfo
    {
        var retVal:ExamInfo = new ExamInfo();
        retVal.Exam_name = jsonObject.Exam_name;
        retVal.Profile_mode = jsonObject.Profile_mode;
        
        return retVal;
    }
}